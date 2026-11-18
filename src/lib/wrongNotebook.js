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

// Stable identity for a mistake record. New records carry `mid` (written once, never changed).
// Legacy records (no mid) get a derived key id|sessionNum|date plus an ordinal among identical legacy keys;
// the list is append-only, so that ordinal does not move when other entries are added. Nothing is rewritten.
export function mistakeKeys(list) {
  const seen = {};
  return (list || []).map((m) => {
    if (m && m.mid) return String(m.mid);
    const base = 'legacy|' + (m && m.id) + '|' + (m && m.sessionNum != null ? m.sessionNum : '') + '|' + ((m && m.date) || '');
    seen[base] = (seen[base] || 0) + 1;
    return base + '|' + seen[base];
  });
}
export function newMistakeId(sessionNum, id, n) {
  return sessionNum + '|' + id + '|' + n + '|' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
export function findMistake(prog, key) {
  const list = Array.isArray(prog && prog.mistakes) ? prog.mistakes : [];
  const i = mistakeKeys(list).indexOf(key);
  return i < 0 ? null : { idx: i, m: list[i] };
}
// Server attempt_key ('set-N') of a mistake: its own sessionNum, else the history entry (same date, contains the id). null if unknown.
export function attemptKeyFor(prog, m) {
  if (!m) return null;
  if (m.sessionNum != null) return 'set-' + m.sessionNum;
  const h = ((prog && prog.history) || []).find((e) => e && e.date === m.date && (e.mistakes || []).some((x) => x && x.id === m.id));
  return h && h.sessionNum != null ? 'set-' + h.sessionNum : null;
}

// Additive update of one mistake in prog.mistakes, found by stable key. Returns a new prog; never removes records.
function patchMistake(prog, key, patch) {
  const f = findMistake(prog, key);
  if (!f) return prog;
  const next = prog.mistakes.slice();
  next[f.idx] = { ...f.m, ...patch };
  return { ...prog, mistakes: next };
}
export function setMistakeCause(prog, key, cause, nowIso) {
  if (!isCause(cause)) return prog;
  return patchMistake(prog, key, { cause, cause_at: nowIso });
}
// results: graded results of the similar retry. Resolves only when ALL `ids` were answered correctly.
export function applySimilarRetry(prog, key, ids, results, nowIso) {
  const byId = {}; (results || []).forEach((r) => { if (r && r.id != null) byId[r.id] = r; });
  const correct = ids.filter((id) => byId[id] && byId[id].correct === true).length;
  const m = (findMistake(prog, key) || {}).m || {};
  const retries = (Array.isArray(m.retries) ? m.retries : []).concat([{ at: nowIso, ids: ids.slice(), correct, total: ids.length }]);
  const resolved = ids.length >= SIMILAR_COUNT && correct === ids.length; // fewer than 3 available: practise only, no resolve (TODO(owner))
  const patch = { retries };
  if (resolved && !m.resolved_at) patch.resolved_at = nowIso;
  return { prog: patchMistake(prog, key, patch), resolved, correct };
}
