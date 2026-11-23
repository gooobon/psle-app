// Pure: turns the answers a student reported for a marked round into award candidates. The SERVER grades every answer
// against the bank; nothing the client says about correctness or hints is trusted.
//   first answer correct                        -> correct, may still be 0.5 if a hint reveal was recorded server-side
//   first answer wrong + retry graded correct   -> correct after a hint (0.5): in the exam flow a retry is only offered
//                                                  after the hint box was shown
//   first answer wrong + retry wrong / no retry -> nothing
// A retry is only considered when the server-graded FIRST answer is wrong, so a client cannot claim a retry to change a
// first-try result.
const str = (v, n) => String(v == null ? "" : v).slice(0, n);
export function cleanAnswer(v) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") return v.slice(0, 500);
  if (Array.isArray(v)) return v.slice(0, 20).map((x) => (typeof x === "number" && Number.isFinite(x) ? x : typeof x === "string" ? x.slice(0, 500) : null));
  return null;
}

// items: client-reported [{ itemId, answer, answerSeq, answerReason, retryAnswer }]
// resolve(itemId) -> record with .grade({ val, seq, reason }) -> { scored, correct } (learningGrade.resolveSubmitted), or null
// -> [{ itemId, correct, afterRetry }] (only scored items, first occurrence of each id)
export function planCandidates(items, resolve, maxItems = 300) {
  const out = [], seen = new Set();
  for (const it of (Array.isArray(items) ? items : []).slice(0, maxItems)) {
    const itemId = str(it && it.itemId, 200);
    if (!itemId || seen.has(itemId)) continue;
    const rec = resolve(itemId);
    if (!rec) continue;
    const first = rec.grade({ val: cleanAnswer(it.answer), seq: cleanAnswer(it.answerSeq), reason: cleanAnswer(it.answerReason) });
    if (!first || !first.scored) continue;
    seen.add(itemId);
    if (first.correct === true) { out.push({ itemId, correct: true, afterRetry: false }); continue; }
    const retryVal = cleanAnswer(it.retryAnswer);
    const hasFirst = cleanAnswer(it.answer) !== null;
    const retry = hasFirst && retryVal !== null ? rec.grade({ val: retryVal, seq: null, reason: null }) : null;
    out.push({ itemId, correct: !!(retry && retry.scored && retry.correct === true), afterRetry: !!(retry && retry.correct === true) });
  }
  return out;
}

// fresh: candidates not seen before (first sight only). hinted: Set of itemIds with a server-recorded hint reveal.
// -> ledger entries [{ itemId, usedHint }] for the correct ones.
export function threadEntries(fresh, hinted) {
  return (fresh || []).filter((c) => c.correct).map((c) => ({ itemId: c.itemId, usedHint: c.afterRetry || !!(hinted && hinted.has(c.itemId)) }));
}
