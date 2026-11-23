// Myth-item level ladder per subject island. Pure: no I/O. Config lives in CLEWQUEST.levels.
// Level = highest rung whose thread threshold AND accuracy gate (last-2-week average) are met. It never goes down:
// callers pass the highest level already reached (`floor`), and `settleLevel` keeps the larger one.
import { CLEWQUEST } from "./config.js";

const toNum = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0);
// History dates are stored like "23 Nov 2026" (sessionUtils.todayStr); ISO "2026-11-23" also parses. Day-level, UTC-normalised.
const dayMs = (s) => { const t = Date.parse(String(s) + (/^\d{4}-\d{2}-\d{2}$/.test(String(s)) ? "T00:00:00Z" : " UTC")); return Number.isNaN(t) ? null : Math.floor(t / 86400000); };

// Average totalPct of sessions dated within the last `days` days (today included). null when there are none.
export function recentAverage(history, today, days = CLEWQUEST.levelWindowDays) {
  const end = dayMs(today); if (end == null) return null;
  const rows = (history || []).filter((h) => { const d = h && typeof h.totalPct === "number" ? dayMs(h.date) : null; return d != null && d <= end && d > end - days; });
  if (!rows.length) return null;
  return Math.round(rows.reduce((a, h) => a + h.totalPct, 0) / rows.length);
}

const meets = (L, threads, avg) => threads >= L.threads && (L.minAvg == null || (avg != null && avg >= L.minAvg));

// -> { level, current, next, floor }  next = null at the top
export function levelFor({ threads, avg, floor = 1 }, ladder = CLEWQUEST.levels) {
  const t = Math.max(0, toNum(threads));
  const a = avg == null || !Number.isFinite(Number(avg)) ? null : Number(avg);
  let level = 1;
  for (const L of ladder) if (meets(L, t, a)) level = L.lv; else break;
  level = Math.max(level, Math.min(Math.max(1, toNum(floor)), ladder.length)); // never decreases
  const current = ladder.find((L) => L.lv === level) || ladder[0];
  const next = ladder.find((L) => L.lv === level + 1) || null;
  return { level, current, next };
}

// Progress to the next rung. -> null at the top. `needAvg` is set when threads are enough but the accuracy gate is not.
export function levelProgress({ threads, avg, floor = 1 }, ladder = CLEWQUEST.levels) {
  const { level, current, next } = levelFor({ threads, avg, floor }, ladder);
  if (!next) return null;
  const t = Math.max(0, toNum(threads));
  const span = Math.max(1, next.threads - current.threads);
  const pct = Math.max(0, Math.min(100, Math.round(((t - current.threads) / span) * 100)));
  const threadsLeft = Math.max(0, next.threads - t);
  const needAvg = threadsLeft === 0 && next.minAvg != null && !(avg != null && avg >= next.minAvg) ? next.minAvg : null;
  return { level, next, pct, threadsLeft, needAvg };
}

export const settleLevel = (computed, stored) => Math.max(toNum(computed), toNum(stored), 1);

// Returns a list of problems (empty = valid).
export function validateLevels(ladder = CLEWQUEST.levels, assetKeys = null) {
  const bad = [];
  if (!Array.isArray(ladder) || ladder.length < 1) return ["levels missing"];
  const keys = new Set();
  ladder.forEach((L, i) => {
    if (L.lv !== i + 1) bad.push(`level ${i + 1} out of order`);
    if (!L.name || /[^\x20-\x7E]/.test(L.name)) bad.push(`level ${L.lv} needs an English name`);
    if (keys.has(L.key)) bad.push(`duplicate level key ${L.key}`); keys.add(L.key);
    if (!Number.isFinite(L.threads) || L.threads < 0) bad.push(`level ${L.lv} bad threshold`);
    if (i > 0 && !(L.threads > ladder[i - 1].threads)) bad.push("level thresholds must increase");
    if (L.minAvg != null && !(L.minAvg > 0 && L.minAvg <= 100)) bad.push(`level ${L.lv} bad accuracy gate`);
    if (!L.icon) bad.push(`level ${L.lv} needs an icon key`);
    else if (assetKeys && assetKeys.has && !assetKeys.has(L.icon)) { /* art not committed yet: fallback badge is used, not an error */ }
  });
  if (ladder[0] && ladder[0].threads !== 0) bad.push("level 1 must unlock at 0 threads");
  return bad;
}

// Highest level reached, remembered per subject in a NEW clewquest_* key (never a genius_* key).
const key = (uid, subject) => `clewquest_level_v1_${uid}_${subject}`;
export function readFloor(uid, subject) { try { return Number(localStorage.getItem(key(uid, subject))) || 1; } catch { return 1; } }
export function writeFloor(uid, subject, level) { try { if (level > readFloor(uid, subject)) localStorage.setItem(key(uid, subject), String(level)); } catch {} }
