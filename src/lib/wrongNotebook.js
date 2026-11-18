// Wrong-answer notebook v1 (roadmap step 7): cause tagging + "Try 3 similar".
// Pure helpers. No React, no storage, no network. All fields are ADDITIVE on a mistake record:
//   cause (one of CAUSES), cause_at (ISO), resolved_at (ISO), retries[] ({at, ids, correct, total}).
// Old records without these fields stay valid. Records are never deleted by anything here.
// Taxonomy ids are used as data only; no taxonomy names are hard-coded.

export const SIMILAR_COUNT = 3; // TODO(owner): confirm 3 (owner decision on #21); change here only.

// Values match the CHECK constraint on public.wrong_answers.cause.
export const CAUSES = [
  { value: 'concept_unknown', en: "Didn't know the concept", ko: '개념 모름' },
  { value: 'misread', en: 'Misread the question', ko: '문제 잘못 읽음' },
  { value: 'calculation', en: 'Calculation slip', ko: '계산 실수' },
  { value: 'trap', en: 'Fell for a trap', ko: '함정에 걸림' },
  { value: 'time', en: 'Ran out of time', ko: '시간 부족' },
  { value: 'guessed', en: 'Guessed', ko: '찍음' },
];
export const CAUSE_VALUES = CAUSES.map((c) => c.value);
export const isCause = (v) => CAUSE_VALUES.indexOf(v) !== -1;

// A tag set is "confident" when it has concept ids and is not flagged uncertain.
export function isConfidentRow(row) {
  return !!row && Array.isArray(row.conceptIds) && row.conceptIds.length > 0 && row.taxonomyStatus !== 'uncertain';
}

// Taxonomy ids to send to the server for a question: only when confident, else null.
export function confidentTaxonomyIds(tagIndex, id) {
  const row = tagIndex && tagIndex.byId && tagIndex.byId[id];
  if (!isConfidentRow(row)) return null;
  return row.conceptIds.concat(row.trapIds || []).slice(0, 10);
}

// pickSimilar(tagIndex, runnableIndex, mistake, similarQuestionsFn)
//   tagIndex: buildTagIndex(...) over ALL known questions
//   runnableIndex: indexSets(...) result; only ids present there can be re-run in ExamSession
//   -> { ids, reason }  reason: 'ok' | 'no_tags' | 'uncertain' | 'few'
// Fewer than SIMILAR_COUNT confident matches => returns what exists (reason 'few'); never pads/guesses.
export function pickSimilar(tagIndex, runnableIndex, mistake, similarQuestionsFn, count) {
  const want = count || SIMILAR_COUNT;
  const seed = mistake && tagIndex && tagIndex.byId && tagIndex.byId[mistake.id];
  if (!seed || !seed.conceptIds || !seed.conceptIds.length) return { ids: [], reason: 'no_tags' };
  if (!isConfidentRow(seed)) return { ids: [], reason: 'uncertain' };
  const byId = (runnableIndex && runnableIndex.byId) || {};
  const confidentIdx = { byConcept: {}, byTrap: {}, byId: {} };
  const keep = (list) => (list || []).filter((r) => isConfidentRow(r) && byId[r.id]);
  Object.keys(tagIndex.byConcept || {}).forEach((k) => { confidentIdx.byConcept[k] = keep(tagIndex.byConcept[k]); });
  Object.keys(tagIndex.byTrap || {}).forEach((k) => { confidentIdx.byTrap[k] = keep(tagIndex.byTrap[k]); });
  const rows = similarQuestionsFn(confidentIdx, seed, { limit: want });
  const ids = rows.map((r) => r.id);
  return { ids, reason: ids.length >= want ? 'ok' : 'few' };
}

// Additive update of one mistake in prog.mistakes (by array index). Returns a new prog; never removes records.
function patchMistake(prog, idx, patch) {
  const list = Array.isArray(prog && prog.mistakes) ? prog.mistakes : [];
  if (idx < 0 || idx >= list.length) return prog;
  const next = list.slice();
  next[idx] = { ...list[idx], ...patch };
  return { ...prog, mistakes: next };
}
export function setMistakeCause(prog, idx, cause, nowIso) {
  if (!isCause(cause)) return prog;
  return patchMistake(prog, idx, { cause, cause_at: nowIso });
}
// results: graded results of the similar retry. Resolves only when ALL `ids` were answered correctly.
export function applySimilarRetry(prog, idx, ids, results, nowIso) {
  const byId = {}; (results || []).forEach((r) => { if (r && r.id != null) byId[r.id] = r; });
  const correct = ids.filter((id) => byId[id] && byId[id].correct === true).length;
  const m = (prog.mistakes || [])[idx] || {};
  const retries = (Array.isArray(m.retries) ? m.retries : []).concat([{ at: nowIso, ids: ids.slice(), correct, total: ids.length }]);
  const resolved = ids.length >= SIMILAR_COUNT && correct === ids.length; // fewer than 3 available: practise only, no resolve (TODO(owner))
  const patch = { retries };
  if (resolved && !m.resolved_at) patch.resolved_at = nowIso;
  return { prog: patchMistake(prog, idx, patch), resolved, correct };
}
