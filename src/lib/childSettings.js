// One shared settings record per child (issue #32). Pure helpers, no React/storage/network.
// Any linked parent may edit it. A change never applies mid-day: it is written as a NEW version with effective_from = tomorrow (SGT),
// and the version in force on day D is the one with the greatest effective_from <= D (same pattern as reward_rule_versions).
// A version is a COMPLETE snapshot, so two parents editing different fields merge instead of overwriting each other.
import { SUBJECT_KEYS, resolveDailyTarget, sgtDate } from "./activity.js";
import { parseRuleVersion, ruleForDate, addDays, DEFAULT_RULES } from "./rewards.js";
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
      enabled: !!r.enabled, sgdPerCredit: Number(r.sgd_per_credit) || 0,
      dailyTiers: Array.isArray(r.daily_tiers) ? r.daily_tiers : [],
      weeklyUnit: r.weekly_unit === "sgd" ? "sgd" : "credits", weeklyAmounts: r.weekly_amounts || {},
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

export const settingToRow = (childId, s, updatedBy, nowIso) => ({
  child_id: childId, effective_from: s.effectiveFrom, daily_target: s.dailyTarget, homework_per_mistake: s.homeworkPerMistake,
  enabled: !!s.rule.enabled, sgd_per_credit: s.rule.sgdPerCredit, daily_tiers: s.rule.dailyTiers,
  weekly_unit: s.rule.weeklyUnit, weekly_amounts: s.rule.weeklyAmounts, updated_by: updatedBy, updated_at: nowIso,
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
    sgdPerCredit: has("sgdPerCredit") ? b.sgdPerCredit : r0.sgdPerCredit,
    dailyTiers: has("dailyTiers") ? b.dailyTiers : r0.dailyTiers,
    weeklyUnit: has("weeklyUnit") ? b.weeklyUnit : r0.weeklyUnit,
    weeklyAmounts: has("weeklyAmounts") ? { ...r0.weeklyAmounts, ...b.weeklyAmounts } : r0.weeklyAmounts,
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
  if (Number(ra.sgdPerCredit) !== Number(rb.sgdPerCredit)) out.push(`exchange rate to ${money(rb.sgdPerCredit)} per credit`);
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
  return out;
}

// One audit line per change: "Dad changed 90%+ tier to 15 credits, effective tomorrow".
export const auditLine = (who, change, effectiveFrom, todayYmd = sgtDate()) =>
  `${who || "A parent"} changed ${change}, effective ${effectiveFrom === tomorrowSgt(todayYmd) ? "tomorrow" : effectiveFrom}`;

export const auditLines = (who, changes, effectiveFrom, todayYmd) => (changes || []).map((c) => auditLine(who, c, effectiveFrom, todayYmd));
