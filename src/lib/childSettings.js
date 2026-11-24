// One shared settings record per child (issue #32). Pure helpers, no React/storage/network.
// Any linked parent may edit it. A change never applies mid-day: it is written as a NEW version with effective_from = tomorrow (SGT),
// and the version in force on day D is the one with the greatest effective_from <= D (same pattern as reward_rule_versions).
// A version is a COMPLETE snapshot, so two parents editing different fields merge instead of overwriting each other.
import { SUBJECT_KEYS, resolveDailyTarget, sgtDate } from "./activity.js";
import { parseRuleVersion, ruleForDate, addDays, DEFAULT_RULES, cashoutFromRow } from "./rewards.js";
// Same bounds as src/lib/homework.js (default 3 similar questions per mistake, abuse bound 100). Duplicated on purpose so this module
// stays importable by plain-node selftests (homework.js uses the "@/" alias).
const HOMEWORK_PER_MISTAKE = 3, HOMEWORK_MAX = 100;
const clampHomeworkCount = (v) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.max(1, Math.min(HOMEWORK_MAX, n)) : HOMEWORK_PER_MISTAKE; };

export const DEFAULT_SETTING = {
  dailyTarget: resolveDailyTarget(null), homeworkPerMistake: HOMEWORK_PER_MISTAKE, rule: { ...DEFAULT_RULES },
};

export const tomorrowSgt = (todayYmd = sgtDate()) => addDays(todayYmd, 1);

export function settingFromRow(r) {
  if (!r) return { ...DEFAULT_SETTING, effectiveFrom: null };
  return {
    effectiveFrom: r.effective_from,
    dailyTarget: resolveDailyTarget(r.daily_target),
    homeworkPerMistake: clampHomeworkCount(r.homework_per_mistake),
    rule: {
      enabled: !!r.enabled, ...cashoutFromRow(r),
      dailyTiers: Array.isArray(r.daily_tiers) ? r.daily_tiers : [],
      weeklyUnit: r.weekly_unit === "sgd" ? "sgd" : "credits", weeklyAmounts: r.weekly_amounts || {},
      paperUnit: r.paper_unit === "sgd" ? "sgd" : "credits", paperAmounts: r.paper_amounts || {}, paperCheckOff: r.paper_check_off === true,
      effectiveFrom: r.effective_from,
    },
  };
}

// Setting in force on `ymd`. versions: child_setting_versions rows. No version yet => defaults (rewards off).
export const settingForDate = (versions, ymd) => settingFromRow(ruleForDate(versions, ymd));

// Rule in force on `ymd`, or null when rewards are off (what the credit routes use).
export function ruleInForce(versions, ymd) {
  const s = settingForDate(versions, ymd);
  return s.rule && s.rule.enabled ? s.rule : null;
}

// opts.paper: include the paper_* columns (migration 20261130000000_paper_rewards.sql). Off (the default) = the row is exactly what it was
// before mock exams phase 2, so saving settings never depends on that migration while the mock-exam flag is off.
// opts.cashout: include credits_per_sgd / cashout_* (migration 20261208000000_rewards_cashout_settings.sql). Off = the legacy row.
export const settingToRow = (childId, s, updatedBy, nowIso, opts) => ({
  child_id: childId, effective_from: s.effectiveFrom, daily_target: s.dailyTarget, homework_per_mistake: s.homeworkPerMistake,
  enabled: !!s.rule.enabled, sgd_per_credit: Math.min(1000, Math.round((Number(s.rule.sgdPerCredit) || 0) * 100) / 100), daily_tiers: s.rule.dailyTiers,
  weekly_unit: s.rule.weeklyUnit, weekly_amounts: s.rule.weeklyAmounts, updated_by: updatedBy, updated_at: nowIso,
  ...(opts && opts.cashout ? { credits_per_sgd: s.rule.creditsPerSgd > 0 ? s.rule.creditsPerSgd : null, cashout_min_sgd: s.rule.cashoutMinSgd || 0, cashout_limit_sgd: s.rule.cashoutLimitSgd || 0, cashout_limit_period: s.rule.cashoutLimitPeriod === "week" ? "week" : "month" } : {}),
  ...(opts && opts.paper ? { paper_unit: s.rule.paperUnit || "credits", paper_amounts: s.rule.paperAmounts || {}, paper_check_off: !!s.rule.paperCheckOff } : {}),
});

// Build the new full setting from a parent's PARTIAL edit. `base` = the setting that will be in force tomorrow (it already includes
// an edit another parent made earlier today). effectiveFrom is ALWAYS tomorrow: any client-sent date is ignored.
// body keys (all optional): dailyTarget{subject:n}, homeworkPerMistake, enabled, sgdPerCredit, dailyTiers[], weeklyUnit, weeklyAmounts{}.
// Returns { setting } or { error }.
export function applySettingEdit(base, body, todayYmd = sgtDate()) {
  const b = body || {};
  const eff = tomorrowSgt(todayYmd);
  const cur = base || DEFAULT_SETTING;
  const dailyTarget = { ...resolveDailyTarget(cur.dailyTarget) };
  if (b.dailyTarget && typeof b.dailyTarget === "object") {
    for (const s of SUBJECT_KEYS) {
      if (b.dailyTarget[s] == null || b.dailyTarget[s] === "") continue;
      const n = Number(b.dailyTarget[s]);
      if (!Number.isFinite(n)) return { error: "Daily sets must be a number from 0 to 10." };
      dailyTarget[s] = Math.max(0, Math.min(10, Math.round(n)));
    }
  }
  let homeworkPerMistake = cur.homeworkPerMistake;
  if (b.homeworkPerMistake != null && b.homeworkPerMistake !== "") {
    if (!Number.isFinite(Number(b.homeworkPerMistake))) return { error: "Homework count must be a number." };
    homeworkPerMistake = clampHomeworkCount(b.homeworkPerMistake);
  }
  const r0 = cur.rule || DEFAULT_RULES;
  const has = (k) => Object.prototype.hasOwnProperty.call(b, k);
  const p = parseRuleVersion({
    effectiveFrom: eff,
    enabled: has("enabled") ? b.enabled : r0.enabled,
    // creditsPerSgd wins over a legacy sgdPerCredit; an edit of the legacy field alone clears the integer so the two never disagree.
    creditsPerSgd: has("creditsPerSgd") ? b.creditsPerSgd : (has("sgdPerCredit") ? "" : r0.creditsPerSgd),
    sgdPerCredit: has("sgdPerCredit") ? b.sgdPerCredit : r0.sgdPerCredit,
    cashoutMinSgd: has("cashoutMinSgd") ? b.cashoutMinSgd : r0.cashoutMinSgd,
    cashoutLimitSgd: has("cashoutLimitSgd") ? b.cashoutLimitSgd : r0.cashoutLimitSgd,
    cashoutLimitPeriod: has("cashoutLimitPeriod") ? b.cashoutLimitPeriod : r0.cashoutLimitPeriod,
    dailyTiers: has("dailyTiers") ? b.dailyTiers : r0.dailyTiers,
    weeklyUnit: has("weeklyUnit") ? b.weeklyUnit : r0.weeklyUnit,
    weeklyAmounts: has("weeklyAmounts") ? { ...r0.weeklyAmounts, ...b.weeklyAmounts } : r0.weeklyAmounts,
    paperUnit: has("paperUnit") ? b.paperUnit : r0.paperUnit,
    paperAmounts: has("paperAmounts") ? { ...r0.paperAmounts, ...b.paperAmounts } : r0.paperAmounts,
    paperCheckOff: has("paperCheckOff") ? b.paperCheckOff : r0.paperCheckOff,
  }, todayYmd);
  if (p.error) return { error: p.error };
  return { setting: { effectiveFrom: eff, dailyTarget, homeworkPerMistake, rule: p.rule } };
}

const unitWord = (u) => (u === "sgd" ? "SGD" : "credits");
const money = (n) => "S$" + (Number(n) || 0).toFixed(2);

// Human-readable list of what changed between two settings (old -> new). Empty list = nothing changed.
export function diffSettings(a, b) {
  const out = [];
  const A = a || DEFAULT_SETTING, B = b || DEFAULT_SETTING;
  for (const s of SUBJECT_KEYS) {
    const x = A.dailyTarget[s], y = B.dailyTarget[s];
    if (x !== y) out.push(`${s} daily sets from ${x} to ${y}`);
  }
  if (A.homeworkPerMistake !== B.homeworkPerMistake) out.push(`homework questions per mistake from ${A.homeworkPerMistake} to ${B.homeworkPerMistake}`);
  const ra = A.rule || DEFAULT_RULES, rb = B.rule || DEFAULT_RULES;
  if (!!ra.enabled !== !!rb.enabled) out.push(rb.enabled ? "credits turned on" : "credits turned off");
  if (Number(ra.sgdPerCredit) !== Number(rb.sgdPerCredit) || (ra.creditsPerSgd || 0) !== (rb.creditsPerSgd || 0)) out.push(rb.creditsPerSgd > 0 ? `exchange rate to ${rb.creditsPerSgd} credits per SGD 1` : `exchange rate to ${money(rb.sgdPerCredit)} per credit`);
  if ((Number(ra.cashoutMinSgd) || 0) !== (Number(rb.cashoutMinSgd) || 0)) out.push(`cash-out minimum to ${money(rb.cashoutMinSgd)}`);
  if ((Number(ra.cashoutLimitSgd) || 0) !== (Number(rb.cashoutLimitSgd) || 0) || (ra.cashoutLimitPeriod || "month") !== (rb.cashoutLimitPeriod || "month")) out.push(rb.cashoutLimitSgd > 0 ? `cash-out limit to ${money(rb.cashoutLimitSgd)} per ${rb.cashoutLimitPeriod === "week" ? "week" : "month"}` : "cash-out limit removed");
  const ta = new Map((ra.dailyTiers || []).map((t) => [t.minPct, t.credits]));
  const tb = new Map((rb.dailyTiers || []).map((t) => [t.minPct, t.credits]));
  for (const [pct, c] of tb) {
    if (!ta.has(pct)) out.push(`added ${pct}%+ tier: ${c} credits`);
    else if (ta.get(pct) !== c) out.push(`${pct}%+ tier to ${c} credits`);
  }
  for (const pct of ta.keys()) if (!tb.has(pct)) out.push(`removed ${pct}%+ tier`);
  if (ra.weeklyUnit !== rb.weeklyUnit) out.push(`Saturday reward unit to ${unitWord(rb.weeklyUnit)}`);
  for (const s of SUBJECT_KEYS) {
    const x = Number((ra.weeklyAmounts || {})[s]) || 0, y = Number((rb.weeklyAmounts || {})[s]) || 0;
    if (x !== y) out.push(`${s} Saturday reward to ${y} ${unitWord(rb.weeklyUnit)}`);
  }
  if ((ra.paperUnit || "credits") !== (rb.paperUnit || "credits")) out.push(`Saturday paper reward unit to ${unitWord(rb.paperUnit || "credits")}`);
  for (const s of SUBJECT_KEYS) {
    const x = Number((ra.paperAmounts || {})[s]) || 0, y = Number((rb.paperAmounts || {})[s]) || 0;
    if (x !== y) out.push(`${s} Saturday paper reward to ${y} ${unitWord(rb.paperUnit || "credits")}`);
  }
  if (!!ra.paperCheckOff !== !!rb.paperCheckOff) out.push(rb.paperCheckOff ? "the Saturday paper effort check turned off" : "the Saturday paper effort check turned on");
  return out;
}

// One audit line per change: "Dad changed 90%+ tier to 15 credits, effective tomorrow".
export const auditLine = (who, change, effectiveFrom, todayYmd = sgtDate()) =>
  `${who || "A parent"} changed ${change}, effective ${effectiveFrom === tomorrowSgt(todayYmd) ? "tomorrow" : effectiveFrom}`;

export const auditLines = (who, changes, effectiveFrom, todayYmd) => (changes || []).map((c) => auditLine(who, c, effectiveFrom, todayYmd));
