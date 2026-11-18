// Rewards (roadmap step 9): stickers, Saturday weekly review, parent credit ledger. Pure helpers, no React/storage.
// Whole feature is behind NEXT_PUBLIC_REWARDS_ENABLED (default off) + NEXT_PUBLIC_SERVER_AUTH.
// The ledger is RECORD ONLY: the app never moves real money.
import { SUBJECT_KEYS, sgtDate, dailySetGoal, isLiveSubject } from "@/lib/activity";

// TODO(owner): default reward numbers. Rules ship empty/disabled; nothing accrues until a parent enables them.
export const DEFAULT_RULES = { enabled: false, creditsPerDay: 0, creditsPerWeekly: 0, sgdPerCredit: 0 };

// TODO(owner): if a child has several subjects with target > 0, the daily sticker needs ALL live subjects met (issue wording).
// TODO(owner): weekly bonus is once per week; it is earned by finishing the review in ANY one subject (not each subject).

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

// Validate parent-submitted rules. Returns { rules } or { error }.
export function parseRules(b) {
  const int = (v) => { const n = Number(v); return Number.isInteger(n) && n >= 0 && n <= 1000 ? n : null; };
  const d = int(b && b.creditsPerDay), w = int(b && b.creditsPerWeekly);
  const g = Math.round(Number(b && b.sgdPerCredit) * 100) / 100;
  if (d == null || w == null || !Number.isFinite(g) || g < 0 || g > 1000) return { error: "Enter whole credits from 0 to 1000 and a valid SGD value." };
  return { rules: { enabled: !!(b && b.enabled), creditsPerDay: d, creditsPerWeekly: w, sgdPerCredit: g } };
}
