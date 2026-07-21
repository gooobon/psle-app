// ---------------------------------------------------------------------------
//  P5 anti-guessing (찍기방지) — shared, framework-agnostic detection logic.
//
//  DESIGN PRIORITY (locked by product decision): a student who actually solved
//  the question must feel NOTHING. Zero extra friction, zero annoyance. We only
//  ever catch the blatant case — answers tapped faster than a child could
//  physically read them (rapid mashing / pre-decided taps). Everything here is
//  tuned so false positives are the rarest possible event; when in doubt we do
//  NOT flag. A flagged item is never punished on score — its word is simply
//  routed into the end-of-session review so a lucky tap isn't mistaken for
//  mastery. No mid-question interruption is ever added by this module.
//
//  Because the exam shows several items on one page at once, per-item reading
//  time is not observable. The one reliable, near-zero-false-positive signal is
//  the GAP BETWEEN consecutive answer taps: a real solver reads the next stem
//  and its options before committing (seconds); only mashing produces sub-second
//  gaps. We flag a correct answer only when it was committed in such a burst.
// ---------------------------------------------------------------------------

// Single, conservative config. Dial these DOWN (smaller) to flag even less.
export const GUESS_CFG = {
  enabled: true,
  onlyCorrect: true,    // wrong answers already get reviewed; only lucky-correct matters
  burstMs: 700,         // consecutive answers < this apart = faster than readable
  firstTapFloorMs: 600, // first answer on a page committed < this after load = impossible
  minItemsOnPage: 2,    // never run on a single-item page (no gap to measure)
};

// entries: [{ id, correct, answeredAt }] where answeredAt = ms since the page
// appeared (null/undefined if the item was left blank). Returns an array of
// flagged item ids (the lucky-fast ones). Pure — no side effects.
export function flagFastGuesses(entries, cfg = GUESS_CFG) {
  if (!cfg || !cfg.enabled) return [];
  const answered = (entries || [])
    .filter((e) => e && e.answeredAt != null)
    .sort((a, b) => a.answeredAt - b.answeredAt);
  if (answered.length < (cfg.minItemsOnPage || 2)) return [];
  const flagged = [];
  let prev = null;
  for (const e of answered) {
    const gap = prev == null ? e.answeredAt : e.answeredAt - prev.answeredAt;
    const floor = prev == null ? cfg.firstTapFloorMs : cfg.burstMs;
    const tooFast = gap < floor;
    if (tooFast && (!cfg.onlyCorrect || e.correct)) flagged.push(e.id);
    prev = e;
  }
  return flagged;
}

// Convenience: given the raw answer timestamps map {id: ms} and a correctness
// map {id: bool}, return the flagged id Set. `ids` fixes iteration to the page's
// items (blanks/questions included).
export function detectPageGuesses(ids, answeredAt, correct, cfg = GUESS_CFG) {
  const entries = (ids || []).map((id) => ({
    id,
    correct: !!(correct && correct[id]),
    answeredAt: answeredAt ? answeredAt[id] : null,
  }));
  return new Set(flagFastGuesses(entries, cfg));
}
