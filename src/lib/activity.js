// Shared helpers for the daily activity log (server + client safe, no secrets).
export const SGT = "Asia/Singapore";
export const SUBJECT_KEYS = ["English", "Chinese", "Math", "Science"];
export const DEFAULT_TARGET = { English: 1, Chinese: 1, Math: 1, Science: 1 };

// Singapore-local YYYY-MM-DD for a Date (default now), optionally shifted by whole days.
export function sgtDate(d = new Date(), shiftDays = 0) {
  const t = new Date(d.getTime() + shiftDays * 86400000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: SGT, year: "numeric", month: "2-digit", day: "2-digit" }).format(t);
}
export function lastNDates(n, now = new Date()) { // oldest -> newest, ends today (SGT)
  return Array.from({ length: n }, (_, i) => sgtDate(now, i - (n - 1)));
}
