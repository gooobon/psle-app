// Rewards (roadmap step 9): stickers, Saturday weekly review, parent credit ledger. Pure helpers, no React/storage.
// Whole feature is behind NEXT_PUBLIC_REWARDS_ENABLED (default off) + NEXT_PUBLIC_SERVER_AUTH.
// The ledger is RECORD ONLY: the app never moves real money.
import { SUBJECT_KEYS, sgtDate, dailySetGoal, isLiveSubject } from "./activity.js";

// TODO(owner): default reward numbers. Rules ship empty/disabled; nothing accrues until a parent enables them.
// paper* = the Saturday past-paper reward (mock exams phase 2, docs/design/mock-exams-v1.md decisions 8 and 9). Separate from the daily and
// weekly-review rules. Default: nothing (amount 0 = no credit), and the anti-gaming check is ON (paperCheckOff false).
export const DEFAULT_RULES = { enabled: false, sgdPerCredit: 0, dailyTiers: [], weeklyUnit: "credits", weeklyAmounts: {}, paperUnit: "credits", paperAmounts: {}, paperCheckOff: false };

// TODO(owner): if a child has several subjects with target > 0, the daily sticker needs ALL live subjects met (issue wording).
// Stickers are unchanged (daily sticker once per day, weekly sticker once per week). CREDITS are per subject (issue #29):
//   daily credits  = tier for the FIRST set of each subject that day (highest matching minPct wins; below all = 0)
//   weekly credits = one award per subject whose Saturday review is done (one subject = one bonus, two = two)
// Owner decision (#32): ONE shared setting per child (src/lib/childSettings.js), editable by any linked parent, effective from the
//   next SGT day. pickRewardParent() below is legacy (kept for its selftest) and is no longer used at runtime.
// Owner decision (#32): homework mastery is "delayed transfer only" (src/lib/homeworkMastery.js).

const dow = (ymd) => new Date(ymd + "T00:00:00Z").getUTCDay(); // 0 Sun .. 6 Sat
const addDays = (ymd, n) => new Date(new Date(ymd + "T00:00:00Z").getTime() + n * 86400000).toISOString().slice(0, 10);

export const isSaturday = (ymd) => dow(ymd) === 6;
// Monday of the week containing ymd (weeks run Mon..Sun; the review week is Mon..Sat).
export const weekStart = (ymd) => addDays(ymd, -((dow(ymd) + 6) % 7));
export const weekDates = (ymd) => Array.from({ length: 6 }, (_, i) => addDays(weekStart(ymd), i)); // Mon..Sat

// Same label the app stores in history[].date / mistakes[].date (sessionUtils.todayStr).
const label = (ymd) => new Date(ymd + "T12:00:00+08:00").toLocaleDateString("en-SG", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Singapore" });

// Mistake ids from this week's (Mon..Sat) rounds that are not yet mastered. Reads prog only; never writes.
// Not mastered = not marked resolved in the notebook AND no later exam/mock/drill first-try-correct trial on that item.
export function weeklyReviewIds(prog, todayYmd = sgtDate()) {
  const days = new Set(weekDates(todayYmd).map(label));
  const resolved = new Set(((prog && prog.mistakes) || []).filter((m) => m && m.resolved_at).map((m) => m.id));
  const trials = (prog && prog.trials) || [];
  const ids = [];
  for (const h of (prog && prog.history) || []) {
    if (!h || !days.has(h.date)) continue;
    for (const m of h.mistakes || []) {
      if (!m || m.id == null || ids.includes(m.id) || resolved.has(m.id)) continue;
      const later = trials.some((t) => t && t.itemId === m.id && t.firstTry && t.correct && (t.mode === "exam" || t.mode === "mock" || t.mode === "drill") && (t.sessionNum || 0) > (h.sessionNum || 0));
      if (!later) ids.push(m.id);
    }
  }
  return ids;
}

// Server: did the child meet today's target? rows = daily_activity rows for today. Only live subjects with goal > 0 count.
// Returns { met, required: [{subject, goal, sets}] }. Nothing required (all goals 0) is never "met".
export function dailyTargetStatus(grade, target, rows) {
  const required = [];
  for (const s of SUBJECT_KEYS) {
    if (!isLiveSubject(grade, s)) continue;
    const goal = dailySetGoal(target && target[s]);
    if (goal <= 0) continue;
    const r = (rows || []).find((x) => x.subject === s);
    required.push({ subject: s, goal, sets: (r && r.sets_completed) || 0 });
  }
  return { met: required.length > 0 && required.every((x) => x.sets >= x.goal), required };
}

// ---- Parent-configured tiers, homework gate, exchange rate (issue #29). All pure: no network, no storage. ----

// Same tie-break as pickParentDailyTarget(): earliest created link wins (then parent id). Only parents in `ids` qualify.
export function pickRewardParent(links, ids) {
  const has = new Set(ids || []);
  const ordered = [...(links || [])].sort((a, b) => {
    const c = String(a?.created_at || "").localeCompare(String(b?.created_at || ""));
    return c || String(a?.parent_id || "").localeCompare(String(b?.parent_id || ""));
  });
  const hit = ordered.find((l) => l && has.has(l.parent_id));
  return hit ? hit.parent_id : null;
}

// Rule version in force on `ymd`: greatest effective_from <= ymd. Rows: {effective_from, ...}. null if none.
export function ruleForDate(versions, ymd) {
  let best = null;
  for (const v of versions || []) {
    if (!v || !v.effective_from || String(v.effective_from) > ymd) continue;
    if (!best || String(v.effective_from) > String(best.effective_from)) best = v;
  }
  return best;
}

// Whole-number percentage of the first set (rounded down so 79.9% never reaches an 80% tier). null = no usable score.
// New rows carry first_set_*; rows from before the migration have NULL there and, if only one set was done, the totals ARE the first set.
export function firstSetScore(row) {
  if (!row) return null;
  let q = row.first_set_questions, c = row.first_set_correct;
  if (q == null || c == null) {
    if ((row.sets_completed || 0) !== 1) return null;
    q = row.questions_answered; c = row.correct;
  }
  q = Number(q); c = Number(c);
  if (!(q > 0) || !(c >= 0)) return null;
  return Math.floor((Math.min(c, q) / q) * 100);
}

// Highest matching tier wins; below every tier = 0. tiers: [{minPct, credits}].
export function tierCredits(tiers, pct) {
  if (pct == null) return 0;
  let best = null;
  for (const t of tiers || []) {
    if (t && pct >= t.minPct && (!best || t.minPct > best.minPct)) best = t;
  }
  return best ? best.credits : 0;
}

// SGD -> credits at the rate of the rule in force when awarded: round(sgd / rate). No rate (0) => 0 credits, never a guess.
// Rounded (not floored) to the nearest whole credit; the credit snapshot is then fixed even if the rate changes later.
export function sgdToCredits(sgd, rate) {
  const s = Number(sgd), r = Number(rate);
  if (!(s > 0) || !(r > 0)) return 0;
  return Math.round(s / r);
}

// Saturday review credits for ONE subject under `rule` (unit credits|sgd).
export function weeklySubjectCredits(rule, subject) {
  if (!rule || !rule.enabled) return 0;
  const a = Number(rule.weeklyAmounts && rule.weeklyAmounts[subject]) || 0;
  return rule.weeklyUnit === "sgd" ? sgdToCredits(a, rule.sgdPerCredit) : Math.max(0, Math.floor(a));
}

// Saturday past-paper credits for ONE subject under `rule` (unit credits|sgd). Same unit mechanics as weeklySubjectCredits; 0 = nothing configured.
export function paperSubjectCredits(rule, subject) {
  if (!rule || !rule.enabled) return 0;
  const a = Number(rule.paperAmounts && rule.paperAmounts[subject]) || 0;
  return rule.paperUnit === "sgd" ? sgdToCredits(a, rule.sgdPerCredit) : Math.max(0, Math.floor(a));
}

// Does a submitted paper earn the Saturday paper reward? Pure; the server calls it and the client never decides.
//   attempt: { status, sgtDay, counts }  (counts = the existing anti-gaming verdict: >= 50% of the time used OR >= 80% answered)
//   rule: the rule in force that day (null = rewards off). A parent can turn the check off (rule.paperCheckOff); then any SUBMITTED paper
//   qualifies. A paper that was never submitted (in progress / abandoned) never qualifies. One reward per child per subject per Saturday is
//   enforced by the ledger's unique key, not here.
// Returns { eligible, reason } with reason one of: ok | not_submitted | not_saturday | too_little | rewards_off
export function paperRewardEligibility({ attempt, rule }) {
  const a = attempt || {};
  if (a.status !== "submitted" && a.status !== "auto_submitted") return { eligible: false, reason: "not_submitted" };
  if (!a.sgtDay || !isSaturday(a.sgtDay)) return { eligible: false, reason: "not_saturday" };
  if (!rule || !rule.enabled) return { eligible: false, reason: "rewards_off" };
  if (!rule.paperCheckOff && a.counts !== true) return { eligible: false, reason: "too_little" };
  return { eligible: true, reason: "ok" };
}

// Daily credits per subject: one entry per subject that has a first-set score. rows = today's daily_activity rows.
export function dailyCreditPlan(rule, rows) {
  if (!rule || !rule.enabled) return [];
  const out = [];
  for (const s of SUBJECT_KEYS) {
    const row = (rows || []).find((x) => x.subject === s);
    const pct = firstSetScore(row);
    if (pct == null) continue;
    out.push({ subject: s, pct, credits: tierCredits(rule.dailyTiers, pct) });
  }
  return out;
}

// Homework gate. rows = parent_homework rows for the child for ONE SGT day (all parents, all subjects).
// Eligible only when every assigned question is solved. NOTHING assigned => eligible (owner-visible rule, documented).
// Solved means answered, right or wrong: the gate is about doing the homework, not about the score.
export function homeworkGate(rows) {
  const assigned = (rows || []).length;
  const remaining = (rows || []).filter((r) => !r.solved_at).length;
  return { eligible: remaining === 0, assigned, remaining };
}

// ---- Pending credits (issue #32). Server-side only; the client never decides. ----
// A credit is created 'pending' with gate_day = the SGT day whose homework condition applies (the claim day).
//   confirmed : counts toward balance / payouts
//   forfeited : kept as a record, never deleted, never counted
// Decision for ONE pending credit, given that day's homework rows (see homeworkGate) and today's SGT date:
//   homework assigned and all solved            -> confirmed now (even before the day ends)
//   homework assigned, some unsolved, day over   -> forfeited
//   nothing assigned, day over                   -> confirmed
//   otherwise (day still open)                   -> pending (parent may still assign homework later today)
// Mirrors SQL finalize_credits() in migration 20261126000000. Idempotent: only 'pending' rows are ever decided.
export function creditStatusFor(gate, gateDay, todayYmd) {
  const assigned = (gate && gate.assigned) || 0, remaining = (gate && gate.remaining) || 0;
  const dayOver = String(gateDay) < String(todayYmd);
  if (assigned > 0 && remaining === 0) return "confirmed";
  if (!dayOver) return "pending";
  return assigned > 0 ? "forfeited" : "confirmed";
}

// Apply creditStatusFor to ledger rows. hwByDay: { 'YYYY-MM-DD': parent_homework rows }. Returns NEW rows; only 'pending' rows change.
export function finalizeCreditRows(rows, hwByDay, todayYmd) {
  return (rows || []).map((r) => {
    if (!r || r.status !== "pending") return r;
    const day = r.gate_day || r.period;
    const status = creditStatusFor(homeworkGate((hwByDay || {})[day] || []), day, todayYmd);
    return status === r.status ? r : { ...r, status };
  });
}

// Ledger totals. Only CONFIRMED credits count toward the balance; pending/forfeited are shown separately.
export function creditTotals(rows, paid = 0) {
  const sum = (st) => (rows || []).filter((r) => (r.status || "confirmed") === st).reduce((a, r) => a + (Number(r.credits) || 0), 0);
  const confirmed = sum("confirmed");
  return { confirmed, pending: sum("pending"), forfeited: sum("forfeited"), paid, balance: confirmed - paid };
}

// What a STUDENT may see of the wallet: credit counts only, never a dollar value or rate (S$ is for parent screens). Pure.
export function studentCredits(rows) {
  const list = rows || [];
  return {
    ...creditTotals(list, 0), pendingNote: PENDING_NOTE,
    pendingRows: list.filter((r) => r.status === "pending").slice(0, 20).map(({ kind, period, subject, credits, status, gate_day }) => ({ kind, period, subject, credits, status, gate_day })),
  };
}
export const PENDING_NOTE = "Pending: finish today's homework";

// DB row <-> app shape.
export const ruleFromRow = (r) => r ? ({
  enabled: !!r.enabled, sgdPerCredit: Number(r.sgd_per_credit) || 0, dailyTiers: Array.isArray(r.daily_tiers) ? r.daily_tiers : [],
  weeklyUnit: r.weekly_unit === "sgd" ? "sgd" : "credits", weeklyAmounts: r.weekly_amounts || {}, effectiveFrom: r.effective_from,
  paperUnit: r.paper_unit === "sgd" ? "sgd" : "credits", paperAmounts: r.paper_amounts || {}, paperCheckOff: r.paper_check_off === true,
}) : null;

// Validate a parent-submitted rule. Returns { rule } or { error }. effectiveFrom must be today (SGT) or later, max one year ahead,
// so already-awarded days are never re-ruled.
export function parseRuleVersion(b, todayYmd = sgtDate()) {
  const bad = (error) => ({ error });
  const eff = String((b && b.effectiveFrom) || todayYmd);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eff) || Number.isNaN(Date.parse(eff + "T00:00:00Z"))) return bad("Enter a valid effective date.");
  if (eff < todayYmd) return bad("The effective date cannot be in the past.");
  if (eff > addDays(todayYmd, 365)) return bad("The effective date is too far ahead.");
  const rate = Math.round(Number(b && b.sgdPerCredit) * 100) / 100;
  if (!Number.isFinite(rate) || rate < 0 || rate > 1000) return bad("Enter a valid SGD value for 1 credit.");
  const rawTiers = Array.isArray(b && b.dailyTiers) ? b.dailyTiers : [];
  if (rawTiers.length > 10) return bad("At most 10 score tiers.");
  const tiers = [];
  for (const t of rawTiers) {
    const p = Number(t && t.minPct), c = Number(t && t.credits);
    if (!Number.isInteger(p) || p < 0 || p > 100 || !Number.isInteger(c) || c < 0 || c > 1000) return bad("Each tier needs a score from 0 to 100 and whole credits from 0 to 1000.");
    if (tiers.some((x) => x.minPct === p)) return bad("Two tiers have the same score.");
    tiers.push({ minPct: p, credits: c });
  }
  tiers.sort((a, z) => a.minPct - z.minPct);
  const unit = b && b.weeklyUnit === "sgd" ? "sgd" : "credits";
  const amounts = {};
  for (const s of SUBJECT_KEYS) {
    const v = Number(b && b.weeklyAmounts && b.weeklyAmounts[s] != null && b.weeklyAmounts[s] !== "" ? b.weeklyAmounts[s] : 0);
    const n = unit === "sgd" ? Math.round(v * 100) / 100 : v;
    if (!Number.isFinite(n) || n < 0 || n > (unit === "sgd" ? 10000 : 1000) || (unit === "credits" && !Number.isInteger(n))) return bad("Weekly amounts must be 0 or more (whole credits, or SGD up to 2 decimals).");
    amounts[s] = n;
  }
  // Saturday past-paper reward: same validation as the weekly amounts. Absent keys fall back to "nothing" (amount 0, check on).
  const punit = b && b.paperUnit === "sgd" ? "sgd" : "credits";
  const pamounts = {};
  for (const s of SUBJECT_KEYS) {
    const v = Number(b && b.paperAmounts && b.paperAmounts[s] != null && b.paperAmounts[s] !== "" ? b.paperAmounts[s] : 0);
    const n = punit === "sgd" ? Math.round(v * 100) / 100 : v;
    if (!Number.isFinite(n) || n < 0 || n > (punit === "sgd" ? 10000 : 1000) || (punit === "credits" && !Number.isInteger(n))) return bad("Saturday paper amounts must be 0 or more (whole credits, or SGD up to 2 decimals).");
    pamounts[s] = n;
  }
  return { rule: { enabled: !!(b && b.enabled), sgdPerCredit: rate, dailyTiers: tiers, weeklyUnit: unit, weeklyAmounts: amounts, paperUnit: punit, paperAmounts: pamounts, paperCheckOff: !!(b && b.paperCheckOff), effectiveFrom: eff } };
}

export { addDays };
