// Shared helpers for the daily activity log (server + client safe, no secrets).
export const SGT = "Asia/Singapore";
export const SUBJECT_KEYS = ["English", "Chinese", "Math", "Science"];
export const DEFAULT_TARGET = { English: 1, Chinese: 1, Math: 1, Science: 1 };

// Same 0–10 clamp as POST /api/parent/settings. Non-numeric values are ignored (null).
export function clampDailyCount(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(10, Math.round(n)));
}

// Fill any missing subject from the default of 1. A stored 0 is kept (parent asked for no set).
export function resolveDailyTarget(raw) {
  const out = { ...DEFAULT_TARGET };
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  for (const s of SUBJECT_KEYS) {
    if (raw[s] == null || raw[s] === "") continue;
    const n = clampDailyCount(raw[s]);
    if (n == null) continue;
    out[s] = n;
  }
  return out;
}

// LEGACY (kept for its selftest, no longer used at runtime): daily_target used to be stored per parent. Since issue #32 the child has
// ONE shared setting (src/lib/childSettings.js, table child_setting_versions) that any linked parent may edit, effective next SGT day.
export function pickParentDailyTarget(links, rows) {
  const ordered = [...(links || [])].sort((a, b) => {
    const c = String(a?.created_at || "").localeCompare(String(b?.created_at || ""));
    return c || String(a?.parent_id || "").localeCompare(String(b?.parent_id || ""));
  });
  const byId = new Map();
  for (const r of rows || []) {
    if (r && r.parent_id != null && !byId.has(r.parent_id)) byId.set(r.parent_id, r.daily_target);
  }
  for (const link of ordered) {
    if (link && byId.has(link.parent_id)) return resolveDailyTarget(byId.get(link.parent_id));
  }
  return resolveDailyTarget(null);
}

// Sets required today. A missing value is the default of 1. 0 means the parent required none.
export function dailySetGoal(target) {
  if (target == null || target === "") return DEFAULT_TARGET.English;
  const n = clampDailyCount(target);
  return n == null ? DEFAULT_TARGET.English : n;
}

// Target 0 is never "done": nothing was required, so the card stays available for extra practice.
export function dailyGoalMet(completed, target) {
  const goal = dailySetGoal(target);
  return goal > 0 && Number(completed) >= goal;
}

// Singapore-local YYYY-MM-DD for a Date (default now), optionally shifted by whole days.
export function sgtDate(d = new Date(), shiftDays = 0) {
  const t = new Date(d.getTime() + shiftDays * 86400000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: SGT, year: "numeric", month: "2-digit", day: "2-digit" }).format(t);
}
export function lastNDates(n, now = new Date()) { // oldest -> newest, ends today (SGT)
  return Array.from({ length: n }, (_, i) => sgtDate(now, i - (n - 1)));
}

// Subjects with live content per grade (server-safe copy of LIVE_CONTENT in components/Dashboard.js; keep in sync).
// Used so alerts do not report "Coming Soon" subjects as "not done".
const LIVE = { P3_English: true, P3_Chinese: true };
export const isLiveSubject = (grade, subject) => !!LIVE[`${grade || "P3"}_${subject}`];
