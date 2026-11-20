// Wrong-answer notebook v1 (roadmap step 7): cause tagging + "Try 3 similar".
// Pure helpers. No React, no storage, no network. All fields are ADDITIVE on a mistake record:
//   cause (one of CAUSES), cause_at (ISO), resolved_at (ISO), retries[] ({at, ids, correct, total}).
// Old records without these fields stay valid. Records are never deleted by anything here.
// Taxonomy ids are used as data only; no taxonomy names are hard-coded.
//
// `value` is what is stored on the mistake and what public.wrong_answers.cause allows.
// `id` is the taxonomy id (cause.*). Labels are English. The app does not show another language.

import { skillIdsOf } from './similarItemsCore.js';

export const SIMILAR_COUNT = 3; // TODO(owner): confirm 3 (owner decision on #21); change here only.

// Values match the CHECK constraint on public.wrong_answers.cause.
export const CAUSES = [
  { id: 'cause.concept_unknown', value: 'concept_unknown', label: "Didn't know the concept" },
  { id: 'cause.misread_question', value: 'misread', label: 'Misread the question' },
  { id: 'cause.calculation_slip', value: 'calculation', label: 'Calculation slip' },
  { id: 'cause.fell_for_trap', value: 'trap', label: 'Fell for a trap' },
  { id: 'cause.ran_out_of_time', value: 'time', label: 'Ran out of time' },
  { id: 'cause.guessed', value: 'guessed', label: 'Guessed' },
];
export const CAUSE_VALUES = CAUSES.map((c) => c.value);
export const isCause = (v) => CAUSE_VALUES.indexOf(v) !== -1;
export function causeLabel(value) {
  const row = CAUSES.find((c) => c.value === value || c.id === value);
  return row ? row.label : '';
}

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
//   tagIndex: buildTagIndex(...) over practice questions, plus paper seeds in byId
//   runnableIndex: indexSets(...) result; only ids present there can be re-run in ExamSession
//   -> { ids, reason }  reason: 'ok' | 'no_tags' | 'no_skill' | 'few'
// A leaf skill matches across sections. An uncertain section is not a reason to return nothing.
// If the item has no leaf skill, traps are used. Fewer than SIMILAR_COUNT matches => reason 'few'.
export function pickSimilar(tagIndex, runnableIndex, mistake, similarQuestionsFn, count) {
  const want = count || SIMILAR_COUNT;
  const seed = mistake && tagIndex && tagIndex.byId && tagIndex.byId[mistake.id];
  if (!seed) return { ids: [], reason: 'no_tags' };
  const skills = skillIdsOf(seed.conceptIds);
  const traps = Array.isArray(seed.trapIds) ? seed.trapIds : [];
  if (!skills.length && !traps.length) {
    return { ids: [], reason: (seed.conceptIds && seed.conceptIds.length) ? 'no_skill' : 'no_tags' };
  }
  const runnable = (runnableIndex && runnableIndex.byId) || {};
  // Uncertain-section items stay in the pool. similarQuestions matches a leaf
  // skill across formats, and uses a trap only when the skill is unknown.
  // Only ids the session can actually run are returned.
  const pool = { byConcept: {}, byTrap: {}, byId: {} };
  const keep = (list) => (list || []).filter((r) => r && runnable[r.id]);
  Object.keys(tagIndex.byConcept || {}).forEach((k) => { pool.byConcept[k] = keep(tagIndex.byConcept[k]); });
  Object.keys(tagIndex.byTrap || {}).forEach((k) => { pool.byTrap[k] = keep(tagIndex.byTrap[k]); });
  const rows = similarQuestionsFn(pool, seed, { limit: want });
  const ids = rows.map((r) => r.id);
  return { ids, reason: ids.length >= want ? 'ok' : 'few' };
}

// Counts for the student notebook. Causes are what the student picked.
// Traps come from the question's tags (one count per mistake per trap id).
export function patternSummary(mistakes, tagIndex) {
  const causeCounts = {};
  const trapCounts = {};
  for (const m of mistakes || []) {
    if (!m) continue;
    if (isCause(m.cause)) causeCounts[m.cause] = (causeCounts[m.cause] || 0) + 1;
    const row = tagIndex && tagIndex.byId && m.id != null ? tagIndex.byId[m.id] : null;
    const seen = new Set();
    for (const id of (row && row.trapIds) || []) {
      if (!id || seen.has(id)) continue;
      seen.add(id);
      trapCounts[id] = (trapCounts[id] || 0) + 1;
    }
  }
  const rank = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
  return { causes: rank(causeCounts), traps: rank(trapCounts) };
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
  if (m.attemptKey) return String(m.attemptKey); // mock-paper entries carry 'exam-<attemptId>' (additive field)
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
