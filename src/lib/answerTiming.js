// Answer timing helpers (issue #128). Pure, no DOM access except the optional browser binding in createActiveTimer.
// Active time excludes (a) time the tab is hidden and (b) any visible stretch beyond IDLE_CAP_MS inside one interval (counted as idle).
export const IDLE_CAP_MS = 60000;
export const MCQ_GUESS_MS = 3000;
const MAX_MS = 3600000;
const CONF = ["sure", "not_sure"];

export function splitInterval(visibleMs, cap = IDLE_CAP_MS) {
  const v = Math.max(0, Math.round(Number(visibleMs) || 0));
  return { activeMs: Math.min(v, cap), idleMs: Math.max(0, v - cap) };
}

// Clock with injectable now(). lap() returns the active/idle time since the previous lap, never counting hidden time.
export function createActiveTimer(now = Date.now) {
  let last = now(), hiddenSince = null, hiddenAcc = 0, activeTotal = 0, idleTotal = 0;
  const visibleSince = () => {
    const t = now();
    const hid = hiddenAcc + (hiddenSince != null ? t - hiddenSince : 0);
    return Math.max(0, t - last - hid);
  };
  return {
    setHidden(h) {
      if (h && hiddenSince == null) hiddenSince = now();
      else if (!h && hiddenSince != null) { hiddenAcc += now() - hiddenSince; hiddenSince = null; }
    },
    lap() {
      const r = splitInterval(visibleSince());
      activeTotal += r.activeMs; idleTotal += r.idleMs;
      last = now(); hiddenAcc = 0; if (hiddenSince != null) hiddenSince = last;
      return r;
    },
    totals() { const r = splitInterval(visibleSince()); return { activeMs: activeTotal + r.activeMs, idleMs: idleTotal + r.idleMs }; },
  };
}
// Browser binding: wires visibilitychange to a timer; returns a detach function.
export function bindVisibility(timer, doc = typeof document !== "undefined" ? document : null) {
  if (!doc || !doc.addEventListener) return () => {};
  const f = () => timer.setHidden(doc.visibilityState === "hidden");
  f(); doc.addEventListener("visibilitychange", f);
  return () => doc.removeEventListener("visibilitychange", f);
}

// Guess by time: MCQ answered in under 3 s. Other formats are never flagged by time alone.
export function isTimeGuess(elapsedMs, format) {
  return format === "mcq" && Number.isFinite(elapsedMs) && elapsedMs >= 0 && elapsedMs < MCQ_GUESS_MS;
}
// Final flag = the existing antiGuess flag OR the time rule.
export function combineGuess(existingFlag, elapsedMs, format) { return !!existingFlag || isTimeGuess(elapsedMs, format); }

export function answerText(v) {
  if (v == null) return null;
  const s = Array.isArray(v) ? v.map((x) => (x == null ? "" : String(x))).join(" | ") : String(v);
  return s.slice(0, 500) || null;
}

// Per-trial answer fields (#128). One trial row per item: answerText is the answer the child ended on (the retry when one was
// made, else the first answer), attemptNo is the attempt that produced it (1 first try, 2 after a hint/retry, 3+ if more were made).
// The graded `answer` / first_try stay based on the FIRST attempt, so mastery is unchanged. options maps an MCQ index to its text.
export function attemptFields(first, retry, retried, options, extraAttempts = 0) {
  const useRetry = !!retried && retry != null;
  const v = useRetry ? retry : first;
  const t = typeof v === "number" && Array.isArray(options) ? options[v] : v;
  const text = answerText(t);
  const n = useRetry ? 2 + Math.max(0, Math.min(18, Math.floor(extraAttempts) || 0)) : 1;
  return { ...(text ? { answerText: text } : {}), attemptNo: n };
}

// Server-side validation: returns only fields that are valid; everything else is null (never throws).
export function cleanTimingFields(it) {
  const o = it || {};
  const e = Number(o.elapsedMs);
  return {
    elapsed_ms: Number.isFinite(e) && e >= 0 ? Math.min(MAX_MS, Math.round(e)) : null,
    guessed: typeof o.guessed === "boolean" ? o.guessed : null,
    confidence: CONF.includes(o.confidence) ? o.confidence : null,
    answer_text: answerText(typeof o.answerText === "string" || Array.isArray(o.answerText) ? o.answerText : null),
    attempt_no: Number.isInteger(o.attemptNo) && o.attemptNo >= 1 && o.attemptNo <= 20 ? o.attemptNo : null,
    session_id: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(o.sessionId || "")) ? String(o.sessionId).toLowerCase() : null,
  };
}
export const TIMING_COLS = ["elapsed_ms", "guessed", "confidence", "answer_text", "attempt_no", "session_id"];
export const stripTiming = (rows) => rows.map((r) => { const c = { ...r }; TIMING_COLS.forEach((k) => delete c[k]); return c; });
// Postgres "undefined column" (42703) or PostgREST schema-cache miss => the SQL is not applied yet.
export function isMissingColumnError(err) {
  const m = String((err && (err.message || err.details)) || "") + " " + String((err && err.code) || "");
  return /42703|PGRST204|42P01|PGRST205|does not exist|schema cache|Could not find/i.test(m);
}

// Parent view of one practice_sessions row (first_try_correct / guessed_count / item_count / active_ms are the stored columns).
export function summarizeSessionRow(row) {
  const r = row || {}, n = Number(r.item_count) || 0, ft = Number(r.first_try_correct) || 0, g = Number(r.guessed_count) || 0;
  return {
    items: n, firstTryCorrect: ft, guessedCount: g,
    firstTryRate: n ? Math.round((ft / n) * 100) : null,
    activeMin: Number.isFinite(Number(r.active_ms)) && r.active_ms != null ? Math.round(Number(r.active_ms) / 60000) : null,
  };
}

export function summarizeSession(rows) {
  const r = rows || [];
  const t = r.map((x) => x.elapsed_ms).filter((x) => Number.isFinite(x));
  return {
    items: r.length,
    avgMs: t.length ? Math.round(t.reduce((a, b) => a + b, 0) / t.length) : null,
    fastCount: r.filter((x) => x.guessed === true).length,
    slowCount: t.filter((x) => x >= 30000).length,
  };
}
