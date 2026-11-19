// Mock exam engine, pure rules (issue #44, docs/design/mock-exams-v1.md). No storage, no network, no data imports:
// the server route and the self-test (tools/exam_selftest.mjs) use the same functions. Nothing here knows an answer key.

export const FULL_PAPER_MIN_MARKS = 45;     // decision 2: a "full paper" declares at least 45 marks and has a complete key
export const MINUTES_PER_MARK = 1.5;        // decision 3: default timer when the file prints no time
export const MIN_MINUTES = 5;               // same bounds as exam_attempts.minutes_allowed
export const MAX_MINUTES = 240;
export const COUNT_MIN_TIME_FRACTION = 0.5; // decision 9: used >= 50% of the allowed time ...
export const COUNT_MIN_ANSWERED_FRACTION = 0.8; // ... OR answered >= 80% of the questions
export const SUBMIT_GRACE_SECONDS = 20;     // network slack when the client auto-submits at 0:00
export const WARN_MINUTES = [10, 1];        // visual warnings only

// Marks used to decide "full paper": the declared total, else the sum of the question marks.
export function paperMarks(row) {
  const m = row && (typeof row.marks === "number" ? row.marks : row.questionMarksSum);
  return typeof m === "number" && isFinite(m) && m > 0 ? m : 0;
}

// Minutes allowed: the paper's printed time when it has one, else 1.5 minutes per mark (rounded up), always within bounds.
export function minutesAllowed(row) {
  const printed = row && typeof row.minutes === "number" && isFinite(row.minutes) && row.minutes > 0 ? row.minutes : 0;
  const raw = printed || Math.ceil(paperMarks(row) * MINUTES_PER_MARK);
  return Math.max(MIN_MINUTES, Math.min(MAX_MINUTES, Math.round(raw)));
}
export function minutesRule(row) {
  const printed = row && typeof row.minutes === "number" && row.minutes > 0;
  return printed ? "Printed time on the paper" : `${MINUTES_PER_MARK} min per mark (no printed time)`;
}

// Flags are kept in the manifest data; the UI turns them into small neutral notes. Nothing here excludes a paper.
export function paperFlags(row) {
  const flags = [];
  if (!row) return flags;
  if (row.year && Array.isArray(row.headerYears) && row.headerYears.length && !row.headerYears.includes(row.year)) flags.push("year_mismatch");
  if ((row.suspectedDuplicates || []).some((d) => d && d.tier === "strong")) flags.push("duplicate_suspect");
  if (row.answerKeyNote === "derived") flags.push("key_estimated");
  return flags;
}
export const FLAG_NOTES = {
  key_estimated: "This paper's answer key was worked out by us, not copied from a printed key.",
  year_mismatch: "The year on this paper may be different from the label.",
  duplicate_suspect: "This paper looks similar to another one in the list.",
};

// Eligible = English, >= 45 marks, a complete answer key, and mapped to a runtime paper. Flagged papers stay IN (owner decision 2026-11-19).
export function isFullPaper(row) {
  return !!row && row.subject === "English" && row.hasAnswerKey === true && paperMarks(row) >= FULL_PAPER_MIN_MARKS && Number.isInteger(row.poolIndex);
}

// Display label: the DECLARED school and year, never the filename.
export function paperLabel(row) {
  const bits = [row.school || "Past paper", row.year || null, (row.typeNormalised || row.bucket || "").toUpperCase() || null];
  return bits.filter(Boolean).join(" ");
}

// Wall-clock deadline: started + allowed. A refresh or sleeping device cannot extend it.
export function deadlineMs(startedAtMs, minutes) { return startedAtMs + minutes * 60_000; }
export function remainingSeconds(deadline, nowMs) { return Math.max(0, Math.ceil((deadline - nowMs) / 1000)); }
export function isExpired(deadline, nowMs) { return nowMs >= deadline; }
export function elapsedSeconds(startedAtMs, endMs, deadline) { return Math.max(0, Math.round((Math.min(endMs, deadline) - startedAtMs) / 1000)); }

// Anti-gaming (decision 9). A blank "open and submit" paper counts for nothing.
export function countsAsAttempt({ elapsedSeconds: used, allowedMinutes, answered, total }) {
  const timeFrac = allowedMinutes > 0 ? used / (allowedMinutes * 60) : 0;
  const ansFrac = total > 0 ? answered / total : 0;
  const byTime = timeFrac >= COUNT_MIN_TIME_FRACTION;
  const byAnswers = ansFrac >= COUNT_MIN_ANSWERED_FRACTION;
  return { counts: byTime || byAnswers, byTime, byAnswers, timeFraction: timeFrac, answeredFraction: ansFrac };
}

// "Answered" = a non-empty value (0 is an answer). Arrays count when any slot is filled.
export function isAnswered(a) {
  if (!a || typeof a !== "object") return false;
  const filled = (v) => (v === 0 ? true : typeof v === "number" ? true : typeof v === "string" ? v.trim() !== "" : false);
  if (filled(a.val)) return true;
  if (Array.isArray(a.val) && a.val.some(filled)) return true;
  if (Array.isArray(a.seq) && a.seq.some(filled)) return true;
  return false;
}

// Score summary. rows: [{ section, correct: true|false|null }] (null = not auto-graded, shown to the parent to mark).
export function summarize(rows) {
  const sections = [];
  const by = new Map();
  let score = 0, total = 0, ungraded = 0;
  for (const r of rows) {
    if (!by.has(r.section)) { const s = { section: r.section, score: 0, total: 0 }; by.set(r.section, s); sections.push(s); }
    const s = by.get(r.section);
    if (r.correct === null || r.correct === undefined) { ungraded += 1; continue; }
    s.total += 1; total += 1;
    if (r.correct) { s.score += 1; score += 1; }
  }
  return { score, total, ungraded, sections };
}

// Score tiers: a paper is the daily set but never feeds the daily first-set tier score (decision 10).
// Kept as a named rule so the route and the self-test agree.
export const PAPER_FEEDS_SCORE_TIERS = false;

// Attempt status shown to the child/parent.
export function statusAfterSubmit({ auto, nowMs, deadline }) {
  return auto || nowMs >= deadline ? "auto_submitted" : "submitted";
}
// Server rule: the client may say "auto" only at/after the deadline (minus grace); otherwise it is an ordinary submit.
export function acceptSubmitTime({ nowMs, deadline }) { return nowMs <= deadline + SUBMIT_GRACE_SECONDS * 1000 ? "on_time" : "late"; }

// Pick the next paper: own school first, never repeat a paper already submitted until all are used, then oldest first.
export function pickPaper(rows, { school, attempts }) {
  const done = new Map(); // id -> last submitted ms
  for (const a of attempts || []) if (a.status !== "in_progress" && a.status !== "abandoned") done.set(a.paperId, Math.max(done.get(a.paperId) || 0, a.at || 0));
  const norm = (x) => String(x || "").toLowerCase().replace(/[^a-z ]+/g, " ").replace(/\b(school|primary|the|public)\b/g, " ").replace(/\s+/g, " ").trim();
  const mine = norm(school);
  const own = (r) => (mine && norm(r.school) && (norm(r.school).includes(mine) || mine.includes(norm(r.school))) ? 0 : 1);
  const fresh = rows.filter((r) => !done.has(r.id));
  const pool = fresh.length ? fresh : rows;
  return [...pool].sort((a, b) => own(a) - own(b) || (done.get(a.id) || 0) - (done.get(b.id) || 0) || a.id.localeCompare(b.id))[0] || null;
}
