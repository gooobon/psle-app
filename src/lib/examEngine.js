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

// Marks printed on a question: "(2 marks)", "[2 marks]", "(1 mark)", "[3m]". Returns an integer 1..20, or null when none is printed.
// Printed text wins over a stored default, so a "(2 marks)" question is worth 2 even when the data row says marks: 1.
export function parseMarks(text) {
  const m = /[(\[]\s*(\d{1,2})\s*(?:marks?|mks?|m)\s*[)\]]/i.exec(String(text == null ? "" : text));
  if (!m) return null;
  const n = Number(m[1]);
  return n >= 1 && n <= 20 ? n : null;
}
// Marks one question is worth: printed in its text, else a numeric `marks` field, else 1. q: any item/question/blank object.
export function marksOf(q) {
  if (!q || typeof q !== "object") return 1;
  for (const t of [q.stem, q.question, q.sentence, q.text]) { const p = parseMarks(t); if (p) return p; }
  const n = Number(q.marks);
  return Number.isInteger(n) && n >= 1 && n <= 20 ? n : 1;
}

// Score summary. rows: [{ section, correct: true|false|null, marks?: number }] (marks defaults to 1 per item). (null = not auto-graded, shown to the parent to mark).
export function summarize(rows) {
  const sections = [];
  const by = new Map();
  let score = 0, total = 0, ungraded = 0;
  for (const r of rows) {
    if (r.excluded) continue; // cannot be answered (no options in the paper data): not scored, not "open"
    if (!by.has(r.section)) { const s = { section: r.section, score: 0, total: 0 }; by.set(r.section, s); sections.push(s); }
    const s = by.get(r.section);
    if (r.correct === null || r.correct === undefined) { ungraded += 1; continue; }
    const w = Number.isInteger(r.marks) && r.marks > 0 ? r.marks : 1;
    s.total += w; total += w;
    if (r.correct) { s.score += w; score += w; }
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

// ── Phase 2: wrong-answer notebook, review, reward (issue #48) ───────────────────────────────────────────────────────
// Design risk (c): a long paper must not dump dozens of items into the notebook at once. CHOICE: at most 20 items per paper
// sitting enter the notebook. Wrong ANSWERED items come first (printed order), then unanswered ones, so the cap drops the items that
// teach least (a blank is usually time, not a misconception). Items past the cap are still listed on the paper's review screen.
export const MAX_NOTEBOOK_PER_PAPER = 20;
export const notebookAttemptKey = (attemptId) => "exam-" + attemptId; // wrong_answers.attempt_key (design section 6)

// rows: [{ id, answered, correct }] in printed order. Only auto-graded WRONG items (correct === false) qualify; open-ended items
// (correct null) never do. Returns the chosen rows (at most `cap`) and how many were left out.
export function pickNotebookRows(rows, cap = MAX_NOTEBOOK_PER_PAPER) {
  const wrong = (rows || []).filter((r) => r && r.correct === false);
  const ordered = [...wrong.filter((r) => r.answered), ...wrong.filter((r) => !r.answered)];
  const picked = ordered.slice(0, Math.max(0, cap));
  return { picked, skipped: wrong.length - picked.length };
}

// The cause the review screen pre-suggests (never stored by itself): "Ran out of time" for an item left blank at an auto-submit.
export function suggestedCause({ answered, status }) {
  return !answered && status === "auto_submitted" ? "time" : null;
}

// Review is only ever shown for the student's OWN, finished attempt. in_progress / abandoned attempts never expose a key.
export function canReview({ attempt, studentId }) {
  return !!attempt && !!studentId && attempt.student_id === studentId && (attempt.status === "submitted" || attempt.status === "auto_submitted");
}

// ── Parent marks count toward the score (issue #62) ─────────────────────────────────────────────────────────────
// Unit = one item (the same unit summarize() already uses for the auto-graded part). At hand-in the auto-graded items give
// autoScore / autoTotal and every open-ended item is PENDING. Each parent mark adds 1 to the total, and 1 to the score when "correct".
// Pure: the parent route, the self-test and the weekly report all use this. marks: array of true | false | null (null = not marked yet).
// openWeights (optional): marks each open item is worth, same order as openMarks; missing = 1. Score and total count marks, `pending` counts items.
export function combineMarks({ autoScore, autoTotal, openMarks, sections, openSections, openWeights }) {
  const marks = Array.isArray(openMarks) ? openMarks : [];
  const wt = (i) => { const w = openWeights && openWeights[i]; return Number.isInteger(w) && w > 0 ? w : 1; };
  const marked = marks.filter((m) => m === true || m === false);
  const pScore = marks.reduce((n, m, i) => n + (m === true ? wt(i) : 0), 0);
  const pTotal = marks.reduce((n, m, i) => n + (m === true || m === false ? wt(i) : 0), 0);
  const pending = marks.length - marked.length;
  const secs = (sections || []).map((s) => ({ ...s }));
  (openSections || []).forEach((sec, i) => {
    const m = marks[i];
    if (m !== true && m !== false) return;
    let s = secs.find((x) => x.section === sec);
    if (!s) { s = { section: sec, score: 0, total: 0 }; secs.push(s); }
    s.total += wt(i); if (m === true) s.score += wt(i);
  });
  return { score: (autoScore || 0) + pScore, total: (autoTotal || 0) + pTotal, parentScore: pScore, parentTotal: pTotal, pending, settled: pending === 0, sections: secs };
}
export const percentOf = (score, total) => (total > 0 ? Math.round((score / total) * 100) : null);
// "2/36 + 4 awaiting parent marking" while open items are unmarked; "6/40" once settled.
export function scoreLine({ score, total, pending }) {
  const base = `${score == null ? 0 : score}/${total == null ? 0 : total}`;
  const p = Number(pending) || 0;
  return p > 0 ? `${base} + ${p} awaiting parent marking` : base;
}
// Is the settle step (reward, milestone, weekly report) due? Only when nothing is waiting for the parent and it has not run yet.
export const readyToSettle = ({ pending, settledAt }) => (Number(pending) || 0) === 0 && !settledAt;
