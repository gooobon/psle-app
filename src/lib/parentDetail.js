// Parent wrong-answer detail and concept-level weak spots (issue #131). Pure functions: no React, no storage, no network.
export const DAY_MS = 86400000;
export const WEAK_WINDOW_DAYS = 14;
export const WEAK_MIN_ATTEMPTS = 4;   // first-try attempts needed in the current window
export const TREND_DELTA = 5;         // percentage points that count as a real change
export const NOT_RECORDED = "Answer not recorded";

// Parent cause tags (stored in public.parent_cause_tags).
export const PARENT_CAUSES = [
  { value: "careless", label: "Careless" },
  { value: "concept", label: "Concept" },
  { value: "vocabulary", label: "Vocabulary" },
];
export const isParentCause = (v) => PARENT_CAUSES.some((c) => c.value === v);
export const parentCauseLabel = (v) => (PARENT_CAUSES.find((c) => c.value === v) || {}).label || "";

// Exact answer text for display: the stored wrong-answer text first, then learning_trials.answer_text, else a plain note.
export function answerShown(wrongAnswerText, trialAnswerText) {
  for (const v of [wrongAnswerText, trialAnswerText]) {
    if (v != null && String(v).trim() !== "") return String(v);
  }
  return NOT_RECORDED;
}

const ts = (r) => Date.parse(r && r.attempted_at);
const wt = (r) => { const n = Number(r && r.weight); return n > 0 ? Math.min(1, n) : 1; };
function rate(rows) {
  let tot = 0, ok = 0;
  for (const r of rows) { tot += wt(r); if (r.first_try) ok += wt(r); }
  return tot ? Math.round((ok / tot) * 100) : null;
}

// Skills with >= minAttempts first-try attempts in the last 14 days, weakest first.
// trials: learning_trials rows {skill, item_id, first_try, weight?, attempted_at, answer_text?, elapsed_ms?}.
// Each result: {skill, attempts, firstTryPct, prevPct, delta, trend, examples:[{itemId, at, answerText|null}]}; trend is
// "up" / "down" / "flat" / "new" (no earlier attempts to compare with). Examples are up to 2 different missed items, newest first.
export function weakSpots(trials, nowMs, opts) {
  const now = nowMs == null ? Date.now() : nowMs;
  const min = (opts && opts.minAttempts) || WEAK_MIN_ATTEMPTS;
  const span = WEAK_WINDOW_DAYS * DAY_MS;
  const cur = {}, prev = {};
  for (const r of trials || []) {
    if (!r || !r.skill) continue;
    const at = ts(r); if (Number.isNaN(at)) continue;
    const age = now - at;
    if (age < 0 || age > 2 * span) continue;
    ((age <= span ? cur : prev)[r.skill] = (age <= span ? cur : prev)[r.skill] || []).push(r);
  }
  const out = [];
  for (const skill of Object.keys(cur)) {
    const rows = cur[skill];
    if (rows.length < min) continue;
    const pct = rate(rows);
    const prevRows = prev[skill] || [];
    const prevPct = prevRows.length ? rate(prevRows) : null;
    const delta = prevPct == null ? null : pct - prevPct;
    const trend = delta == null ? "new" : delta >= TREND_DELTA ? "up" : delta <= -TREND_DELTA ? "down" : "flat";
    const seen = new Set(), examples = [];
    for (const r of rows.filter((x) => !x.first_try).sort((a, b) => ts(b) - ts(a))) {
      if (seen.has(r.item_id)) continue;
      seen.add(r.item_id);
      examples.push({ itemId: r.item_id, at: r.attempted_at, answerText: r.answer_text == null || r.answer_text === "" ? null : String(r.answer_text) });
      if (examples.length === 2) break;
    }
    out.push({ skill, attempts: rows.length, firstTryPct: pct, prevPct, delta, trend, examples });
  }
  return out.sort((a, b) => (a.firstTryPct - b.firstTryPct) || (b.attempts - a.attempts));
}

// Time taken text: "Time taken: N s" when elapsed_ms is a positive number, else "Time taken: not recorded".
export function timeTakenText(ms) {
  const n = ms == null || ms === "" ? NaN : Number(ms);
  if (!Number.isFinite(n) || n <= 0) return "Time taken: not recorded";
  const s = n / 1000;
  return "Time taken: " + (s >= 10 ? Math.round(s) : Math.round(s * 10) / 10) + " s";
}

// Count how many times each item was tried (all trial rows) and map item -> latest recorded answer text.
export function attemptSummary(trials) {
  const attempts = {}, answers = {}, elapsed = {};
  const sorted = (trials || []).slice().sort((a, b) => ts(b) - ts(a));
  for (const r of sorted) {
    if (!r || !r.item_id) continue;
    attempts[r.item_id] = (attempts[r.item_id] || 0) + 1;
    if (!(r.item_id in answers) && !r.first_try && r.answer_text != null && r.answer_text !== "") answers[r.item_id] = String(r.answer_text);
    if (!r.first_try && !(r.item_id in elapsed) && Number(r.elapsed_ms) > 0) elapsed[r.item_id] = Number(r.elapsed_ms);
  }
  return { attempts, answers, elapsed };
}
