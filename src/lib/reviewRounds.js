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
  const wrongIn = Object.create(null); // containerId -> Set of wrong result ids
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
      (wrongIn[hit.containerId] || (wrongIn[hit.containerId] = Object.create(null)))[id] = true;
    }
  });
  const plan = Object.keys(sections)
    .map((t) => sections[t])
    .sort((a, b) => a.order - b.order)
    // ExamSessionScreen renders one container per section; split multi-container
    // sections (e.g. two cloze sets wrong across drills) into repeated sections.
    .flatMap((sec) => {
      if (MCQ_TYPES.indexOf(sec.type) !== -1) return [{ type: sec.type, marks: sec.items.length, items: sec.items }];
      return sec.items.map((c) => {
        const narrowed = narrowContainer(c, wrongIn[c.id] || {});
        return { type: sec.type, marks: countMarks(narrowed), items: [narrowed] };
      });
    });
  return { plan, resolved, unresolved };
}

// Keep only the wrong sub-items of a container so the student re-solves
// exactly what was missed. Correct cloze blanks are written back into the
// passage as plain text (context stays readable, nothing to answer).
// Renderers are untouched: they simply see a smaller container.
function narrowContainer(c, wrongIds) {
  const cid = c.id;
  const has = (rid) => !!wrongIds[rid];
  const out = { ...c };
  if (Array.isArray(c.blanks)) {
    const keep = c.blanks.filter((b) => has(cid + '_' + b.num));
    const keepNum = Object.create(null); keep.forEach((b) => { keepNum[b.num] = true; });
    const ansOf = Object.create(null); c.blanks.forEach((b) => { ansOf[b.num] = b.answer; });
    out.blanks = keep.length ? keep : c.blanks;
    if (keep.length && typeof c.passage === 'string') {
      out.passage = c.passage.replace(/\((\d+)\)\s*_{3,}/g, (m0, n) => (keepNum[Number(n)] ? m0 : String(ansOf[Number(n)] || m0)));
    }
    return out;
  }
  if (Array.isArray(c.questions)) {
    const keep = c.questions.filter((q) => q && has(q.id));
    out.questions = keep.length ? keep : c.questions;
    return out;
  }
  if (Array.isArray(c.items)) {
    const keep = c.items.filter((it) => it && (has(cid + '_' + it.num) || has(it.id)));
    out.items = keep.length ? keep : c.items;
    return out;
  }
  return out;
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

// ---------------------------------------------------------------------------
// describeMistake(m, index) -> m + display fields the Mistakes log expects:
//   q, options, yourAnswer, correctAnswer, explanation, explanation_en,
//   hint, passage. Results from ExamSession only carry ids + indices, so the
//   item content is resolved from the 60-set index here (read-only).
// ---------------------------------------------------------------------------
function optText(options, v) {
  if (!Array.isArray(options)) return v == null ? null : String(v);
  if (typeof v === 'number') return options[v] != null ? String(options[v]) : null;
  return v == null ? null : String(v);
}
function snippet(passage, num) {
  if (typeof passage !== 'string') return null;
  const re = new RegExp('\\(' + num + '\\)\\s*_{3,}');
  const i = passage.search(re);
  if (i < 0) return null;
  const a = Math.max(0, i - 60), b = Math.min(passage.length, i + 60);
  return (a > 0 ? '...' : '') + passage.slice(a, b) + (b < passage.length ? '...' : '');
}
export function describeMistake(m, index) {
  if (!m || m.q) return m;                       // legacy shape already has content
  const byId = (index && index.byId) || {};
  const hit = m.id && byId[m.id];
  if (!hit) return m;
  const d = { ...m };
  if (hit.leaf) {                                 // MCQ family
    const q = hit.leaf;
    d.q = q.sentence || q.stem || q.question || m.id;
    d.options = q.options || null;
    d.yourAnswer = optText(q.options, m.userAnswer);
    d.correctAnswer = optText(q.options, q.answer);
    d.explanation = q.explanation || null; d.explanation_en = q.explanation_en || null;
    d.hint = (q.hints && q.hints[0]) || q.hint || null;
    return d;
  }
  const c = hit.container; const cid = hit.containerId;
  if (Array.isArray(c.blanks)) {                 // cloze blank
    const num = Number(String(m.id).slice(cid.length + 1));
    const b = c.blanks.find((x) => x.num === num);
    if (!b) return d;
    d.q = snippet(c.passage, num) || ('(' + num + ')');
    d.options = c.wordBank || null;
    d.yourAnswer = m.userAnswer == null ? null : String(m.userAnswer);
    d.correctAnswer = String(b.answer);
    d.explanation = b.explanation || null; d.explanation_en = b.explanation_en || null;
    d.hint = b.hint || null;
    return d;
  }
  if (Array.isArray(c.questions)) {              // reading question
    const q = c.questions.find((x) => x && x.id === m.id);
    if (!q) return d;
    d.q = q.stem || q.question || m.id;
    d.options = q.options || null;
    d.yourAnswer = optText(q.options, m.userAnswer);
    d.correctAnswer = optText(q.options, q.answer);
    d.explanation = q.explanation || null; d.explanation_en = q.explanation_en || null;
    d.passage = c.passage || null;
    return d;
  }
  if (Array.isArray(c.items)) {                  // match item / editing item
    const num = Number(String(m.id).slice(cid.length + 1));
    const it = c.items.find((x) => x && (x.num === num || x.id === m.id));
    if (!it) return d;
    d.q = it.stem || it.sentence || m.id;
    d.options = c.pool || null;
    d.yourAnswer = optText(c.pool, m.userAnswer);
    d.correctAnswer = c.pool ? optText(c.pool, it.answer) : String(it.answer != null ? it.answer : (it.correction || ''));
    d.explanation = it.explanation || null; d.explanation_en = it.explanation_en || null;
    return d;
  }
  return d;
}
export function enrichMistakes(list, index) {
  if (!index) return list || [];
  return (list || []).map((m) => describeMistake(m, index));
}


// ---------------------------------------------------------------------------
// roundVocabCandidates(entry, index, limit) -> ordered unique word list for the
// round's vocab quiz: for each wrong item, the correct answer word first, then
// its curated keywords (keywords[].w). Deterministic (mistake order), capped.
// The caller filters by dictionary coverage and builds quiz entries.
// ---------------------------------------------------------------------------
// Sections whose answers are VOCABULARY (grammar forms like did/fly/feeding are
// skill errors, not words, and never enter the word quiz). Reading/craft items
// contribute curated keywords only, plus fill_word answers.
const VOCAB_SECTIONS = {
  en: { answer: ['VocabMCQ', 'VocabCloze', 'Editing'], fillWord: ['Comprehension'], keywordsOnly: [] },
  zh: { answer: ['HanziMcq', 'VocabMcq', 'VocabMatch', 'PassageCloze'], fillWord: ['ReadingMcq', 'ReadingOpen'],
        keywordsOnly: ['SentenceCraft', 'ReadingMcq', 'ReadingOpen'] },
};
export function roundVocabCandidates(entry, index, limit, lang) {
  const cap = limit || 10;
  const L = lang || ((entry && (entry.mistakes || [])[0] && /^ZS/.test(String(entry.mistakes[0].id))) ? 'zh' : 'en');
  const rules = VOCAB_SECTIONS[L] || VOCAB_SECTIONS.en;
  const seen = Object.create(null); const out = [];
  const clean = (w) => (w == null ? '' : String(w).replace(/[.,!?'"\u3002\uFF0C\uFF01\uFF1F]/g, '').trim());
  const push = (w, gloss, itemId) => {
    const t = L === 'en' ? clean(w).toLowerCase() : clean(w);
    if (!t || seen[t]) return; seen[t] = true; out.push({ w: t, gloss: gloss || null, itemId: itemId || null });
  };
  const byId = (index && index.byId) || {};
  ((entry && entry.mistakes) || []).forEach((m) => {
    const hit = m && m.id && byId[m.id];
    if (!hit) return;
    const st = hit.sectionType;
    let leaf = hit.leaf;
    if (!leaf && hit.container) {
      const c = hit.container, cid = hit.containerId;
      const num = Number(String(m.id).slice(cid.length + 1));
      leaf = (c.blanks || []).find((b) => b.num === num) || (c.questions || []).find((q) => q && q.id === m.id)
        || (c.items || []).find((it) => it && (it.num === num || it.id === m.id)) || null;
    }
    const d = describeMistake(m, index);
    if (rules.answer.indexOf(st) !== -1 && d && d.correctAnswer) push(d.correctAnswer, null, m.id);
    else if (rules.fillWord.indexOf(st) !== -1 && leaf && String(leaf.format || '') === 'fill_word' && d && d.correctAnswer) push(d.correctAnswer, null, m.id);
    if (rules.answer.indexOf(st) !== -1 || rules.fillWord.indexOf(st) !== -1 || rules.keywordsOnly.indexOf(st) !== -1) {
      ((leaf && leaf.keywords) || []).forEach((k) => push(k && k.w, k && k.en, m.id));
    }
  });
  return out.slice(0, cap * 3); // over-collect; caller keeps the first `cap` found in the dictionary
}

export const REVIEW_TYPES = { MCQ_TYPES, CONTAINER_TYPES, SKIP_TYPES };
