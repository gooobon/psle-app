// ============================================================
// trialLedger.js  (Step 1 - measurement foundation)
// Single entry point for recording graded results into progress.
// Pure functions: take a progress object, return a NEW progress object.
// Adds two fields to progress (backward compatible, additive only):
//   trials[]      - one row per graded item, every mode
//   skillLedger{} - per-skill aggregates used by later KPI / tickets
// Nothing here changes how scores are displayed today.
// ASCII-only. No React, no storage access.
// ============================================================

// Modes. KPI "exam-style first-try score" counts EXAM + MOCK only.
// REVIEW (re-solving the same items) and GATE (vocab quiz) never
// feed mastery; DRILL feeds tickets later (Step 7).
export const MODE = {
  EXAM: 'exam',     // daily WA1 set (fixed 60-set track)
  MOCK: 'mock',     // flagged mock / past paper
  DRILL: 'drill',   // remediation drill
  REVIEW: 'review', // re-solve of a past round's wrong items
  GATE: 'gate',     // end-of-session vocab gate
};

// Modes whose first-try results may count toward mastery / KPI.
export const MASTERY_MODES = [MODE.EXAM, MODE.MOCK, MODE.DRILL];

function emptyLedgerRow() {
  return {
    att: 0,            // attempts (mastery modes only)
    ftc: 0,            // first-try correct, not guessed, not after hint
    fail: 0,           // first-try wrong (includes solved-after-hint)
    guessed: 0,        // correct but flagged as a guess
    hinted: 0,         // solved after hint (counted as fail above)
    lastFailSes: null,
    lastSeenSes: null,
    retryTotal: 0,     // served again after a prior fail, on a DIFFERENT item
    retryFail: 0,      // ...and failed again  -> re-error rate
    delayedTotal: 0,   // retry that happened >= 1 session after the fail
    delayedOk: 0,
    transferTotal: 0,  // served in a sectionType different from prior successes
    transferOk: 0,
    itemsSeen: [],     // distinct itemIds served (capped)
    failedItems: [],   // itemIds failed at least once (capped)
    sections: [],      // sectionTypes with at least one first-try success
    theta: 0.5,        // placeholder for Step 9 scheduler; not updated yet
  };
}

const CAP = 200;
function pushCapped(arr, v) {
  if (arr.indexOf(v) === -1) { arr.push(v); if (arr.length > CAP) arr.shift(); }
}

// Explicit first-try rule (Step 3 will surface this on screen):
//   correct        = first answer matched, no hint, no retry
//   solvedAfterHint = first answer wrong, retry correct -> still a FAIL
//   guessed        = correct but burst-tapped -> score keeps it, mastery does not
export function isFirstTryCorrect(r) {
  return !!r && r.correct === true && !r.solvedAfterHint && !r.guessed;
}

// Skill key: item skill tag when present (Chinese 60-set track), else the
// section type (English items carry no skill tag yet - see P18). A section-
// level key still yields per-section first-try / re-error rates.
export function skillKeyOf(r) {
  if (!r) return null;
  if (typeof r.skill === 'string' && r.skill) return r.skill;
  if (typeof r.trapType === 'string' && r.trapType && r.trapType.length <= 24) return r.trapType;
  return r.sectionType ? 'sec:' + r.sectionType : null;
}

export function normalizeTrial(r, meta) {
  return {
    itemId: r.id,
    skill: skillKeyOf(r),
    sectionType: r.sectionType || null,
    setId: meta.setId || null,
    correct: r.correct === true,
    guessed: !!r.guessed,
    solvedAfterHint: !!r.solvedAfterHint,
    firstTry: isFirstTryCorrect(r),
    attempts: typeof r.attempts === 'number' ? r.attempts : null,
    timeTaken: typeof r.timeTaken === 'number' ? r.timeTaken : null,
    mode: meta.mode,
    sessionNum: meta.sessionNum,
    ts: meta.ts || Date.now(),
  };
}

// Update one ledger row from one normalized trial (mastery modes only).
function applyToLedger(ledger, t) {
  if (!t.skill) return;
  const L = ledger[t.skill] || (ledger[t.skill] = emptyLedgerRow());
  const seenBefore = L.itemsSeen.indexOf(t.itemId) !== -1;
  // prior fail on a DIFFERENT item exists (re-error definition)
  const hadPriorFail = L.failedItems.some((id) => id !== t.itemId);

  L.att += 1;
  L.lastSeenSes = t.sessionNum;
  if (t.firstTry) L.ftc += 1;
  if (t.guessed) L.guessed += 1;
  if (t.solvedAfterHint) L.hinted += 1;
  if (!t.firstTry && !t.guessed) L.fail += 1;

  // Re-error: this skill failed earlier on a different item, now served again.
  if (hadPriorFail && !seenBefore) {
    L.retryTotal += 1;
    if (!t.firstTry) L.retryFail += 1;
    if (L.lastFailSes != null && t.sessionNum - L.lastFailSes >= 1) {
      L.delayedTotal += 1;
      if (t.firstTry) L.delayedOk += 1;
    }
  }
  // Transfer: first-try success on a sectionType not yet succeeded in.
  if (L.sections.length > 0 && L.sections.indexOf(t.sectionType) === -1) {
    L.transferTotal += 1;
    if (t.firstTry) L.transferOk += 1;
  }
  if (t.firstTry && t.sectionType) pushCapped(L.sections, t.sectionType);

  if (!t.firstTry && !t.guessed) { L.lastFailSes = t.sessionNum; pushCapped(L.failedItems, t.itemId); }
  pushCapped(L.itemsSeen, t.itemId);
}

// ---- the single entry point -------------------------------------------
// recordTrials(prog, results, { mode, sessionNum, setId })
// - results: ExamSession result objects (scored===false rows are skipped)
// - returns a new prog with trials[] appended and skillLedger updated
// - does NOT touch history / mistakes / nextSession (callers keep doing that)
export function recordTrials(prog, results, meta) {
  const base = prog || {};
  const trials = Array.isArray(base.trials) ? base.trials.slice() : [];
  const ledger = JSON.parse(JSON.stringify(base.skillLedger || {}));
  const m = { mode: meta.mode || MODE.EXAM, sessionNum: meta.sessionNum || 0, setId: meta.setId || null, ts: meta.ts };
  const mastery = MASTERY_MODES.indexOf(m.mode) !== -1;
  (results || []).forEach((r) => {
    if (!r || r.scored === false || !r.id) return;
    const t = normalizeTrial(r, m);
    trials.push(t);
    if (mastery) applyToLedger(ledger, t);
  });
  // keep localStorage bounded
  const MAX_TRIALS = 5000;
  const trimmed = trials.length > MAX_TRIALS ? trials.slice(trials.length - MAX_TRIALS) : trials;
  return { ...base, trials: trimmed, skillLedger: ledger };
}

// Backfill for getProgress(): guarantee the two new fields exist.
export function ensureLedgerFields(p) {
  if (!p) return p;
  if (!Array.isArray(p.trials)) p.trials = [];
  if (!p.skillLedger || typeof p.skillLedger !== 'object') p.skillLedger = {};
  return p;
}

// Headline KPIs from trials (exam/mock modes only). Used by the Mistakes log
// header instead of the old "(1 - filtered/total) accuracy" pseudo-metric.
export function firstTryStats(prog, opts) {
  const trials = (prog && prog.trials) || [];
  const modes = (opts && opts.modes) || [MODE.EXAM, MODE.MOCK];
  const since = (opts && opts.sinceSession) || 0;
  let n = 0, ft = 0, hinted = 0, guessed = 0, wrong = 0;
  trials.forEach((t) => {
    if (modes.indexOf(t.mode) === -1 || (t.sessionNum || 0) < since) return;
    n += 1;
    if (t.firstTry) ft += 1;
    else if (t.solvedAfterHint) hinted += 1;
    else if (t.guessed && t.correct) guessed += 1;
    else wrong += 1;
  });
  return { n, firstTry: ft, hinted, guessed, wrong, firstTryRate: n ? Math.round(ft / n * 100) : null };
}

// Read-only summary for a future KPI card (Step 6). Safe to call now.
export function ledgerSummary(prog) {
  const ledger = (prog && prog.skillLedger) || {};
  const out = {};
  Object.keys(ledger).forEach((k) => {
    const L = ledger[k];
    out[k] = {
      firstTryRate: L.att ? L.ftc / L.att : null,
      reErrorRate: L.retryTotal ? L.retryFail / L.retryTotal : null,
      delayedOkRate: L.delayedTotal ? L.delayedOk / L.delayedTotal : null,
      transferOkRate: L.transferTotal ? L.transferOk / L.transferTotal : null,
      att: L.att,
    };
  });
  return out;
}
