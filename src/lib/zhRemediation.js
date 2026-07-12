// ============================================================
// zhRemediation.js  (P3 Chinese WA1 - remediation)
// Turns the student's recorded mistakes (each carrying a `skill`/
// `trapType` tag propagated by ExamSession result builders) into:
//   1) a ranked trap-type PRIORITY QUEUE, and
//   2) a NEXT-SET selector that biases the next WA1 mock toward the
//      sets richest in the student's weakest traps.
// Pure, side-effect-free, ASCII-only. Additive: does not touch the
// English adaptive engine (dataEngine.buildZhPlan) or its section-level
// advice; this is trap-type (skill) granularity and complements it.
// ============================================================
'use strict';

// Wrap an index into [0, n) safely (handles negatives / out-of-range).
function clampIdx(i, sets) {
  const n = (sets && sets.length) || 1;
  const x = Math.trunc(Number(i) || 0);
  return ((x % n) + n) % n;
}

// Rank the traps the student misses most.
// Input:  mistakes[] where each entry may carry .skill (or .trapType) and .date.
// Output: [{ skill, count, lastSeen }] sorted by count desc, then most-recent,
//         then skill name (deterministic). Entries without a skill are ignored.
function aggregateTrapPriority(mistakes) {
  const map = Object.create(null);
  (mistakes || []).forEach(function (m) {
    if (!m) return;
    const skill = (typeof m.skill === 'string' && m.skill) ||
      (typeof m.trapType === 'string' && m.trapType) || '';
    if (!skill) return;
    if (!map[skill]) map[skill] = { skill: skill, count: 0, lastSeen: '' };
    map[skill].count += 1;
    const d = m.date || '';
    if (d > map[skill].lastSeen) map[skill].lastSeen = d;
  });
  return Object.keys(map).map(function (k) { return map[k]; }).sort(function (a, b) {
    if (b.count !== a.count) return b.count - a.count;
    if (a.lastSeen !== b.lastSeen) return a.lastSeen > b.lastSeen ? -1 : 1;
    return a.skill < b.skill ? -1 : 1;
  });
}

// Collect every skill tag present in a practice set, walking all section
// shapes: MCQ/craft items carry .skill directly; VocabMatch/PassageCloze/
// Reading carry nested arrays (.items/.blanks/.questions) whose leaves do.
function collectSetSkills(set) {
  const skills = [];
  const NESTED = ['items', 'blanks', 'questions'];
  ((set && set.plan) || []).forEach(function (sec) {
    (sec.items || []).forEach(function (it) {
      if (it && typeof it.skill === 'string') skills.push(it.skill);
      NESTED.forEach(function (key) {
        if (it && Array.isArray(it[key])) {
          it[key].forEach(function (sub) {
            if (sub && typeof sub.skill === 'string') skills.push(sub.skill);
          });
        }
      });
    });
  });
  return skills;
}

// Choose the index of the next WA1 set to serve.
// Bias toward the set richest in the student's weak traps (weighted by how
// often each trap was missed). Ties and the no-mistakes case fall back to
// sequential progression starting at `fallbackIdx`, so the mock still moves
// forward when there is nothing to remediate.
function pickNextWa1Set(sets, mistakes, fallbackIdx) {
  if (!Array.isArray(sets) || !sets.length) return 0;
  const start = clampIdx(fallbackIdx, sets);
  const queue = aggregateTrapPriority(mistakes);
  if (!queue.length) return start;
  const weight = Object.create(null);
  queue.forEach(function (e) { weight[e.skill] = e.count; });
  const n = sets.length;
  let best = start, bestScore = -1;
  for (let step = 0; step < n; step++) {
    const i = (start + step) % n;               // scan forward from fallback
    const skills = collectSetSkills(sets[i]);
    let score = 0;
    skills.forEach(function (s) { if (weight[s]) score += weight[s]; });
    if (score > bestScore) { bestScore = score; best = i; } // strict > keeps earliest on ties
  }
  return best;
}

// Flatten every auto-graded MCQ-family item (HanziMcq/PinyinMcq/VocabMcq)
// across the corpus, tagged with its section topic. These items are
// self-contained (no shared passage/pool), so they can be re-served
// individually in a drill. Cloze/Reading questions are intentionally
// excluded here because a single blank/question needs its passage context.
const DRILL_MCQ_TYPES = ['HanziMcq', 'PinyinMcq', 'VocabMcq'];

function collectMcqItems(sets) {
  const out = [];
  (sets || []).forEach(function (set) {
    (set.plan || []).forEach(function (sec) {
      if (DRILL_MCQ_TYPES.indexOf(sec.type) === -1) return;
      (sec.items || []).forEach(function (it) {
        if (it && it.id) out.push({ topic: sec.type, item: it });
      });
    });
  });
  return out;
}

// Build an item-level remediation mini-drill from the corpus.
// Strategy: (1) re-serve the exact MCQ items the student got wrong
// (precise "don't miss it next time"), then (2) top up with fresh items
// sharing the student's weakest trap types, ordered by trap priority.
// Returns a synthetic set { setId:'ZS_DRILL', plan:[...] } consumable by
// ExamSessionScreen, or null when there is nothing to remediate.
function buildRemediationDrill(sets, mistakes, opts) {
  opts = opts || {};
  const maxItems = opts.maxItems || 15;
  const pool = collectMcqItems(sets);
  if (!pool.length) return null;

  const missedIds = Object.create(null);
  (mistakes || []).forEach(function (m) { if (m && m.id) missedIds[m.id] = true; });
  const weak = aggregateTrapPriority(mistakes);

  const seen = Object.create(null);
  const chosen = [];
  // pass 1: exact missed MCQ items (re-serve the precise traps)
  pool.forEach(function (rec) {
    if (chosen.length >= maxItems) return;
    if (missedIds[rec.item.id] && !seen[rec.item.id]) { seen[rec.item.id] = true; chosen.push(rec); }
  });
  // pass 2: fresh items sharing the weakest traps, in priority order
  weak.forEach(function (e) {
    pool.forEach(function (rec) {
      if (chosen.length >= maxItems) return;
      if (seen[rec.item.id]) return;
      if (rec.item.skill === e.skill) { seen[rec.item.id] = true; chosen.push(rec); }
    });
  });
  if (!chosen.length) return null;

  const bucket = Object.create(null);
  chosen.forEach(function (rec) { (bucket[rec.topic] = bucket[rec.topic] || []).push(rec.item); });
  const plan = [];
  DRILL_MCQ_TYPES.forEach(function (t) {
    if (bucket[t] && bucket[t].length) plan.push({ type: t, marks: bucket[t].length, items: bucket[t] });
  });

  return {
    setId: 'ZS_DRILL', theme: 'remediation drill', track: 'HCL', band: 'mid',
    seedSources: ['remediation'], plan: plan,
  };
}

export { aggregateTrapPriority, collectSetSkills, pickNextWa1Set, clampIdx, collectMcqItems, buildRemediationDrill };
