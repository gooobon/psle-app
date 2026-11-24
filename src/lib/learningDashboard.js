// Learning dashboard maths (issue #42). Pure functions: no React, no storage, no network.
// Input rows are server `learning_trials` rows ({skill, mode, first_try, weight, session_num, attempted_at})
// and `wrong_answers` rows ({cause, attempted_at}). Nothing here writes or deletes anything.
//
// Mastery weight: a qualifying similar-question homework answer carries weight 0.5 (homeworkMastery.js, #33);
// every other mastery answer carries 1. The rate is sum(weight where first try) / sum(weight).
export const DAY_MS = 86400000;
export const TREND_SESSIONS = 4;       // last 4 sessions vs the 4 before
export const TREND_DELTA = 5;          // percentage points that count as a real change
export const KPI_MODES = ["exam", "mock"]; // same modes as trialLedger.firstTryStats
export const CAUSE_WINDOW_DAYS = 14;

const SGT_FMT = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" });
export const sgtDay = (ts) => SGT_FMT.format(new Date(ts));
const t = (r) => Date.parse(r.attempted_at);
const w = (r) => (typeof r.weight === "number" || typeof r.weight === "string") && Number(r.weight) > 0 ? Math.min(1, Number(r.weight)) : 1;

function rate(rows) {
  let tot = 0, ok = 0;
  for (const r of rows) { tot += w(r); if (r.first_try) ok += w(r); }
  return { n: tot, rate: tot ? Math.round(ok / tot * 100) : null };
}

// Per skill: mastery now (all answers so far) and 7 days ago (answers up to then). delta is null without a baseline.
export function masteryBySkill(trials, nowMs) {
  const now = nowMs == null ? Date.now() : nowMs;
  const cut = now - 7 * DAY_MS;
  const by = {};
  for (const r of trials || []) { if (r && r.skill && !Number.isNaN(t(r))) (by[r.skill] = by[r.skill] || []).push(r); }
  return Object.keys(by).map((skill) => {
    const cur = rate(by[skill]);
    const prev = rate(by[skill].filter((r) => t(r) <= cut));
    return { skill, n: cur.n, now: cur.rate, weekAgo: prev.rate, delta: cur.rate != null && prev.rate != null ? cur.rate - prev.rate : null };
  }).sort((a, b) => (a.now - b.now) || (b.n - a.n));
}

// Counts of wrong-answer causes in the last 14 days, split into the latest 7 and the 7 before. Untagged rows are "untagged".
export function causeTrend(wrongs, nowMs) {
  const now = nowMs == null ? Date.now() : nowMs;
  const out = {};
  for (const r of wrongs || []) {
    const at = t(r); if (Number.isNaN(at)) continue;
    const age = now - at;
    if (age < 0 || age > CAUSE_WINDOW_DAYS * DAY_MS) continue;
    const c = r.cause || "untagged";
    const row = out[c] || (out[c] = { cause: c, total: 0, thisWeek: 0, lastWeek: 0 });
    row.total += 1;
    if (age <= 7 * DAY_MS) row.thisWeek += 1; else row.lastWeek += 1;
  }
  return Object.values(out).sort((a, b) => b.total - a.total);
}

// Monday (SGT) of the week containing ts, as YYYY-MM-DD.
export function weekStart(ts) {
  const d = sgtDay(ts);
  const dow = new Date(d + "T00:00:00Z").getUTCDay(); // 0 = Sunday
  return sgtDay(Date.parse(d + "T00:00:00Z") - ((dow + 6) % 7) * DAY_MS + 8 * 3600000);
}

// Weekly first-attempt score (exam + mock only, as the KPI card). Oldest first.
export function weeklyScores(trials) {
  const by = {};
  for (const r of trials || []) {
    if (KPI_MODES.indexOf(r.mode) === -1 || Number.isNaN(t(r))) continue;
    (by[weekStart(t(r))] = by[weekStart(t(r))] || []).push(r);
  }
  return Object.keys(by).sort().map((week) => ({ week, ...rate(by[week]) }));
}

// improving / flat / slipping from the first-try rate of the last 4 sessions vs the 4 before (exam + mock).
// "not_enough" when there is no earlier session to compare with.
export function trendWord(trials) {
  const sess = new Map();
  for (const r of trials || []) {
    if (KPI_MODES.indexOf(r.mode) === -1 || Number.isNaN(t(r))) continue;
    const key = r.session_num != null ? "s" + r.session_num : "d" + sgtDay(t(r));
    const e = sess.get(key) || { at: 0, rows: [] };
    e.at = Math.max(e.at, t(r)); e.rows.push(r); sess.set(key, e);
  }
  const ordered = [...sess.values()].sort((a, b) => a.at - b.at);
  if (ordered.length < 2) return { word: "not_enough", recent: null, before: null, sessions: ordered.length };
  const recentSes = ordered.slice(-TREND_SESSIONS);
  const beforeSes = ordered.slice(-TREND_SESSIONS * 2, -TREND_SESSIONS);
  const recent = rate(recentSes.flatMap((s) => s.rows)).rate;
  if (!beforeSes.length) {
    // Fewer than 5 sessions: compare the newest half with the older half so a new child still gets a read.
    const half = Math.floor(ordered.length / 2);
    const a = rate(ordered.slice(0, half).flatMap((s) => s.rows)).rate;
    const b = rate(ordered.slice(half).flatMap((s) => s.rows)).rate;
    return { word: judge(b, a), recent: b, before: a, sessions: ordered.length };
  }
  const before = rate(beforeSes.flatMap((s) => s.rows)).rate;
  return { word: judge(recent, before), recent, before, sessions: ordered.length };
}
function judge(recent, before) {
  if (recent == null || before == null) return "not_enough";
  if (recent - before >= TREND_DELTA) return "improving";
  if (before - recent >= TREND_DELTA) return "slipping";
  return "flat";
}

// Three weakest skills over the last 7 days with at least FOCUS_MIN_ATTEMPTS attempts (weighted like the mastery list).
export const FOCUS_MIN_ATTEMPTS = 4;
export function focusSkills(trials, nowMs) {
  const now = nowMs == null ? Date.now() : nowMs;
  const by = {};
  for (const r of trials || []) {
    if (!r || !r.skill) continue;
    const at = t(r); if (Number.isNaN(at)) continue;
    const age = now - at; if (age < 0 || age > 7 * DAY_MS) continue;
    (by[r.skill] = by[r.skill] || []).push(r);
  }
  return Object.keys(by).map((skill) => {
    const cur = rate(by[skill]);
    return { skill, n: cur.n, now: cur.rate, attempts: by[skill].length };
  }).filter((x) => x.attempts >= FOCUS_MIN_ATTEMPTS && x.now != null)
    .sort((a, b) => (a.now - b.now) || (b.n - a.n)).slice(0, 3);
}

export function buildLearning(trials, wrongs, nowMs) {
  return {
    focus: focusSkills(trials, nowMs),
    trend: trendWord(trials),
    weekly: weeklyScores(trials),
    skills: masteryBySkill(trials, nowMs),
    causes: causeTrend(wrongs, nowMs),
  };
}
