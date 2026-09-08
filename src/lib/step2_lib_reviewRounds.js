// ============================================================
// reviewRounds.js  (Step 2 - per-round wrong-item review)
// Pure helpers. Rebuilds the items a student got wrong in one past
// round (history[i].mistakes) into a plan ExamSessionScreen can run.
//
// Pedagogy: this is RECOGNITION review (same items again). Results go
// to trials[] with mode "review" only - never to history/mistakes/score
// and never to mastery. Mastery on a skill is earned later on DIFFERENT
// items (Step 7 tickets). ASCII-only; no React, no storage.
// ============================================================

// MCQ-family sections: items are self-contained leaves.
const MCQ_TYPES = ['GrammarMCQ', 'VocabMCQ', 'HanziMcq', 'PinyinMcq', 'VocabMcq'];
// Container sections: one set per section; sub-items need the container.
const CONTAINER_TYPES = ['GrammarCloze', 'VocabCloze', 'PassageCloze', 'VocabMatch',
  'Editing', 'Comprehension', 'ReadingMcq', 'ReadingOpen'];
// Not auto-graded (scored:false) -> never in mistakes -> never reviewed here.
const SKIP_TYPES = ['Synthesis', 'SentenceCraft'];

export const REVIEW_SET_ID = 'ROUND_REVIEW';

// Result-id rules mirrored from ExamSession.js result builders:
//   MCQ      -> q.id
//   Cloze    -> set.id + "_" + blank.num
//   Match    -> set.id + "_" + item.num
//   Editing  -> item.id            (container = set with items[])
//   Comp     -> question.id        (container = set with questions[])
function registerContainer(index, container, sectionType, setId, order) {
  const cid = container && container.id;
  if (!cid) return;
  const entry = { containerId: cid, container, sectionType, setId, order };
  index[cid] = entry;
  (container.blanks || []).forEach((b) => { index[cid + '_' + b.num] = entry; });
  (container.items || []).forEach((it) => {
    if (it && it.num != null) index[cid + '_' + it.num] = entry;
    if (it && it.id) index[it.id] = entry;
  });
  (container.questions || []).forEach((q) => { if (q && q.id) index[q.id] = entry; });
}

// indexSets(sets) -> { byId, order }
//   byId[resultId] = { leaf?, containerId?, container?, sectionType, setId, order }
//   order = canonical section order seen in the first set (for plan sorting)
export function indexSets(sets) {
  const byId = Object.create(null);
  let order = [];
  (sets || []).forEach((set, si) => {
    const plan = (set && set.plan) || [];
    if (si === 0) order = plan.map((s) => s.type);
    plan.forEach((sec, secOrder) => {
      const t = sec.type;
      if (MCQ_TYPES.indexOf(t) !== -1) {
        (sec.items || []).forEach((q) => {
          if (q && q.id) byId[q.id] = { leaf: q, sectionType: t, setId: set.setId, order: secOrder };
        });
      } else if (CONTAINER_TYPES.indexOf(t) !== -1) {
        (sec.items || []).forEach((c) => registerContainer(byId, c, t, set.setId, secOrder));
      }
    });
  });
  return { byId, order };
}

// Per-round stats from a history entry (mistakes carry the result objects).
export function roundStats(entry) {
  const m = (entry && entry.mistakes) || [];
  let hinted = 0, guessed = 0;
  m.forEach((r) => { if (r.solvedAfterHint) hinted += 1; if (r.guessed) guessed += 1; });
  return { wrong: m.length, hinted, guessed };
}

// buildRoundReviewPlan(entry, index) -> { plan, resolved, unresolved }
//   plan: ExamSession-shaped sections containing only this round's wrong
//         items (MCQ) or the containers that hold them (cloze/reading/...).
//   unresolved: ids not found in the 60-set track (e.g. past-paper sessions).
export function buildRoundReviewPlan(entry, index) {
  const mistakes = (entry && entry.mistakes) || [];
  const byId = (index && index.byId) || {};
  const sections = Object.create(null); // sectionType -> { type, order, items:[], seen:Set }
  const unresolved = [];
  let resolved = 0;
  mistakes.forEach((r) => {
    const id = r && r.id;
    const hit = id && byId[id];
    if (!hit) { if (id) unresolved.push(id); return; }
    if (SKIP_TYPES.indexOf(hit.sectionType) !== -1) return;
    resolved += 1;
    const t = hit.sectionType;
    const sec = sections[t] || (sections[t] = { type: t, order: hit.order, items: [], seen: Object.create(null) });
    if (hit.leaf) {
      if (!sec.seen[id]) { sec.seen[id] = true; sec.items.push(hit.leaf); }
    } else if (hit.container) {
      if (!sec.seen[hit.containerId]) { sec.seen[hit.containerId] = true; sec.items.push(hit.container); }
    }
  });
  const plan = Object.keys(sections)
    .map((t) => sections[t])
    .sort((a, b) => a.order - b.order)
    // ExamSessionScreen renders one container per section; split multi-container
    // sections (e.g. two cloze sets wrong across drills) into repeated sections.
    .flatMap((sec) => {
      if (MCQ_TYPES.indexOf(sec.type) !== -1) return [{ type: sec.type, marks: sec.items.length, items: sec.items }];
      return sec.items.map((c) => ({ type: sec.type, marks: countMarks(c), items: [c] }));
    });
  return { plan, resolved, unresolved };
}

function countMarks(c) {
  if (!c) return 0;
  if (Array.isArray(c.blanks)) return c.blanks.length;
  if (Array.isArray(c.questions)) return c.questions.length;
  if (Array.isArray(c.items)) return c.items.length;
  return 1;
}

// Which past rounds can be reviewed at all (have >=1 resolvable wrong item).
export function listReviewableRounds(history, index) {
  return (history || []).map((entry) => {
    const built = buildRoundReviewPlan(entry, index);
    return {
      sessionNum: entry.sessionNum,
      date: entry.date,
      totalPct: entry.totalPct,
      isMockExam: !!entry.isMockExam,
      stats: roundStats(entry),
      reviewable: built.plan.length > 0,
      unresolved: built.unresolved.length,
    };
  });
}

// Record that a round was reviewed. Additive: prog.reviewedRounds[sessionNum].
// Does NOT touch history / mistakes / nextSession / score.
export function markRoundReviewed(prog, sessionNum, results, dateStr) {
  const graded = (results || []).filter((r) => r && r.scored !== false);
  const correct = graded.filter((r) => r.correct === true && !r.solvedAfterHint && !r.guessed).length;
  const prev = (prog && prog.reviewedRounds) || {};
  const rec = prev[sessionNum] || { times: 0 };
  const next = {
    ...prev,
    [sessionNum]: { times: rec.times + 1, lastDate: dateStr || '', correct, total: graded.length },
  };
  return { ...(prog || {}), reviewedRounds: next };
}

export const REVIEW_TYPES = { MCQ_TYPES, CONTAINER_TYPES, SKIP_TYPES };
