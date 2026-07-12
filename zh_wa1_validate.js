/* ============================================================
   zh_wa1_validate.js  (P3 Chinese WA1 - Step 1)
   Shared invariant checker used by:
     - Step 2 seed extraction QA   (opts.requireExplain=false)
     - Step 3 generator round-trip (opts.requireExplain=true, expectSetCount=60)
   Pure CommonJS, no dependencies. ASCII-only source.
   ============================================================ */
'use strict';

const ZH_SECTION_ORDER = [
  'HanziMcq', 'PinyinMcq', 'VocabMcq', 'VocabMatch',
  'SentenceCraft', 'PassageCloze', 'ReadingMcq', 'ReadingOpen',
];
const PHASE1 = ['HanziMcq', 'PinyinMcq', 'VocabMcq', 'VocabMatch', 'PassageCloze', 'ReadingMcq'];
// Full pedagogical ordering across ALL section types (canonical 8 + phase 2/3).
// Used only for the relative-order check so phase 2/3 sections (e.g. SentenceOrder)
// may appear in a plan without tripping the order rule. Required-section checks
// still use ZH_SECTION_ORDER / PHASE1.
const ZH_FULL_ORDER = [
  'HanziMcq', 'PinyinMcq', 'VocabMcq', 'VocabMatch',
  'SentenceMcq', 'SentenceCraft', 'SentenceOrder', 'ErrorCorrection', 'CharWrite',
  'PassageCloze', 'ReadingMcq', 'ReadingOpen',
  'PictureVocabMcq', 'PictureComposition', 'StrokeOrder',
];
const COMP_FORMATS = ['mcq', 'sequence', 'fill_word', 'open_sentence', 'fill_table'];
const SKILLS = [
  'xingjinzi', 'tongyinzi', 'duoyinzi', 'shengdiao', 'shengmu_yunmu',
  'dapei', 'jinyici', 'lianci', 'liangci', 'yufa',
  'detail', 'inference', 'sequence', 'main_idea', 'vocab_in_context',
];
const CRAFT_SUBTYPES = ['combine', 'expand', 'rewrite', 'make_sentence'];
const LESSON_MIN = 1, LESSON_MAX = 4;

function isNonEmptyString(s) { return typeof s === 'string' && s.trim().length > 0; }

function checkExplain(ex, optionsLen, id, fails, required) {
  if (!ex) { if (required) fails.push(id + ': explain missing'); return; }
  if (!isNonEmptyString(ex.why)) fails.push(id + ': explain.why empty');
  if (!isNonEmptyString(ex.memoryTip)) fails.push(id + ': explain.memoryTip empty');
  if (!SKILLS.includes(ex.trapType)) fails.push(id + ': explain.trapType invalid: ' + ex.trapType);
  if (!Array.isArray(ex.distractors)) fails.push(id + ': explain.distractors not array');
  else {
    if (optionsLen != null && ex.distractors.length !== optionsLen)
      fails.push(id + ': distractors length ' + ex.distractors.length + ' != options ' + optionsLen);
    ex.distractors.forEach((d, i) => {
      if (!isNonEmptyString(d)) fails.push(id + ': distractors[' + i + '] empty');
    });
  }
}

function checkLessonSkill(item, id, fails) {
  if (!Number.isInteger(item.lesson) || item.lesson < LESSON_MIN || item.lesson > LESSON_MAX)
    fails.push(id + ': lesson out of WA1 range: ' + item.lesson);
  if (!SKILLS.includes(item.skill)) fails.push(id + ': skill invalid: ' + item.skill);
}

function checkMcqItem(q, fails, counts, opts) {
  const id = q.id || '(no id)';
  if (!isNonEmptyString(q.sentence)) fails.push(id + ': empty sentence');
  if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4)
    fails.push(id + ': options length must be 3..4');
  else if (!q.options.every(isNonEmptyString)) fails.push(id + ': option empty');
  if (!Number.isInteger(q.answer) || q.answer < 0 || !q.options || q.answer >= q.options.length)
    fails.push(id + ': answer index out of range');
  checkLessonSkill(q, id, fails);
  checkExplain(q.explain, Array.isArray(q.options) ? q.options.length : null, id, fails, opts.requireExplain);
  if (opts.requireExplain && !isNonEmptyString(q.explanation))
    fails.push(id + ': composed explanation string missing');
  counts.mcq++;
}

function checkMatchSet(set, fails, counts, opts) {
  const id = set.id || '(no id)';
  if (!Array.isArray(set.pool) || !set.pool.every(isNonEmptyString))
    fails.push(id + ': pool bad');
  if (!Array.isArray(set.items) || set.items.length === 0)
    { fails.push(id + ': items empty'); return; }
  if (set.pool.length < set.items.length)
    fails.push(id + ': pool smaller than items');
  const used = new Set();
  for (const it of set.items) {
    const iid = id + '#' + it.num;
    if (!isNonEmptyString(it.stem)) fails.push(iid + ': empty stem');
    if (!Number.isInteger(it.answer) || it.answer < 0 || it.answer >= set.pool.length)
      fails.push(iid + ': answer not a pool index');
    else if (used.has(it.answer)) fails.push(iid + ': pool entry reused');
    else used.add(it.answer);
    checkLessonSkill(it, iid, fails);
    checkExplain(it.explain, set.pool.length, iid, fails, opts.requireExplain);
    counts.match++;
  }
}

function checkClozeSet(set, fails, counts, opts) {
  const id = set.id || '(no id)';
  if (!isNonEmptyString(set.passage)) fails.push(id + ': empty passage');
  if (!Array.isArray(set.wordBank) || !set.wordBank.every(isNonEmptyString))
    fails.push(id + ': wordBank bad');
  const markers = [...String(set.passage || '').matchAll(/\((\d+)\)\s*_{3,}/g)].map(m => +m[1]);
  if (!Array.isArray(set.blanks)) { fails.push(id + ': blanks missing'); return; }
  if (markers.length !== set.blanks.length)
    fails.push(id + ': passage markers ' + markers.length + ' != blanks ' + set.blanks.length);
  for (const b of set.blanks) {
    const bid = id + '#' + b.num;
    if (!isNonEmptyString(b.answer)) fails.push(bid + ': empty answer');
    else if (!set.wordBank.includes(b.answer)) fails.push(bid + ': answer not in wordBank');
    checkLessonSkill(b, bid, fails);
    checkExplain(b.explain, null, bid, fails, opts.requireExplain);
    counts.cloze++;
  }
}

function checkCompSet(set, sectionType, fails, counts, opts) {
  const id = set.id || '(no id)';
  if (!isNonEmptyString(set.passage) || set.passage.length < 30)
    fails.push(id + ': passage too short');
  if (!Array.isArray(set.questions) || set.questions.length === 0)
    { fails.push(id + ': no questions'); return; }
  for (const q of set.questions) {
    const qid = id + '/' + (q.id || q.questionNo || '?');
    if (!COMP_FORMATS.includes(q.format)) { fails.push(qid + ': bad format ' + q.format); continue; }
    if (!isNonEmptyString(q.stem)) fails.push(qid + ': empty stem');
    if (sectionType === 'ReadingMcq' && (q.format === 'open_sentence' || q.format === 'fill_table'))
      fails.push(qid + ': ReadingMcq must be auto-graded (mcq/sequence/fill_word), not ' + q.format);
    if (q.format === 'mcq') {
      if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4)
        fails.push(qid + ': mcq options length must be 3..4');
      if (!Number.isInteger(q.answer) || q.answer < 0 || !q.options || q.answer >= q.options.length)
        fails.push(qid + ': mcq answer index bad');
      checkExplain(q.explain, Array.isArray(q.options) ? q.options.length : null, qid, fails, opts.requireExplain);
      counts.compAuto++;
    } else if (q.format === 'sequence') {
      if (!Array.isArray(q.sequenceItems) || q.sequenceItems.length < 3)
        fails.push(qid + ': sequenceItems bad');
      if (!Array.isArray(q.answer) || !q.sequenceItems
          || q.answer.length !== q.sequenceItems.length
          || [...q.answer].sort().join() !== q.sequenceItems.map((_, i) => i).sort().join())
        fails.push(qid + ': sequence answer not a permutation');
      counts.compAuto++;
    } else if (q.format === 'fill_word') {
      if (!isNonEmptyString(q.answer)) fails.push(qid + ': fill_word empty answer');
      else if (!String(set.passage).includes(q.answer))
        fails.push(qid + ': fill_word answer not found in passage');
      counts.compAuto++;
    } else if (q.format === 'fill_table') {
      if (!Array.isArray(q.statements) || q.statements.length < 2)
        fails.push(qid + ': fill_table statements bad');
      if (!Array.isArray(q.answer) || !q.statements || q.answer.length !== q.statements.length)
        fails.push(qid + ': fill_table answer rows != statements');
      counts.compAuto++;
    } else { // open_sentence
      if (!isNonEmptyString(q.answer)) fails.push(qid + ': open model answer empty');
      counts.open++;
    }
  }
}

// split a connector like "zhi yao ...... jiu ......" into its required parts.
function connectorParts(conn) {
  return String(conn).split(/\u2026\u2026|\u2026|\.\.\./).map(s => s.trim()).filter(Boolean);
}
function checkCraftItem(q, fails, counts, opts) {
  const id = q.id || '(no id)';
  if (!CRAFT_SUBTYPES.includes(q.subtype)) fails.push(id + ': bad subtype ' + q.subtype);
  if (!isNonEmptyString(q.sentenceA)) fails.push(id + ': empty sentenceA');
  if (q.subtype === 'combine' && !isNonEmptyString(q.sentenceB))
    fails.push(id + ': combine requires sentenceB');
  if (!isNonEmptyString(q.instruction)) fails.push(id + ': empty instruction');
  if (!isNonEmptyString(q.answer)) fails.push(id + ': empty model answer');
  if (!Number.isInteger(q.marks) || q.marks <= 0) fails.push(id + ': marks bad');
  if (!Number.isInteger(q.lesson) || q.lesson < LESSON_MIN || q.lesson > LESSON_MAX)
    fails.push(id + ': lesson out of WA1 range: ' + q.lesson);
  if (q.skill != null && !SKILLS.includes(q.skill))
    fails.push(id + ': skill invalid: ' + q.skill);
  // Connective-usage gate: when a connector is specified (guanlian ci zao ju),
  // the model answer must actually use every part of it. This is what makes the
  // item a real lianci-training item, so it is a hard rule here, not a warning.
  if (isNonEmptyString(q.connector) && isNonEmptyString(q.answer)) {
    const missing = connectorParts(q.connector).filter(p => !q.answer.includes(p));
    if (missing.length) fails.push(id + ': model answer missing connector part(s): ' + missing.join(','));
  }
  // Pedagogy: under requireExplain, craft items carry a full explain (why the
  // model answer works + memoryTip). No options, so distractors is optional.
  if (opts && opts.requireExplain) {
    const ex = q.explain;
    if (!ex) { fails.push(id + ': explain missing'); }
    else {
      if (!isNonEmptyString(ex.why)) fails.push(id + ': explain.why empty');
      if (!isNonEmptyString(ex.memoryTip)) fails.push(id + ': explain.memoryTip empty');
      if (!SKILLS.includes(ex.trapType)) fails.push(id + ': explain.trapType invalid: ' + ex.trapType);
      if (ex.distractors != null &&
          (!Array.isArray(ex.distractors) || !ex.distractors.every(isNonEmptyString)))
        fails.push(id + ': explain.distractors present but malformed');
    }
    if (!isNonEmptyString(q.explanation))
      fails.push(id + ': composed explanation string missing');
  }
  counts.craft++;
}

function checkOrderSet(set, fails, counts, opts) {
  // SentenceOrder (zu ju cheng duan): order N shuffled sentences into a coherent paragraph.
  // No options, so ZhExplain.distractors is optional here; pedagogy rides on
  // why (the ordering logic) + memoryTip. trapType is normally 'sequence'.
  const id = set.id || '(no id)';
  if (!isNonEmptyString(set.instruction)) fails.push(id + ': empty instruction');
  if (!Array.isArray(set.sentences) || set.sentences.length < 3) {
    fails.push(id + ': sentences must be an array of >= 3'); counts.order++; return;
  }
  if (!set.sentences.every(isNonEmptyString)) fails.push(id + ': sentence empty');
  const n = set.sentences.length;
  const idPerm = set.sentences.map((_, i) => i).sort((a, b) => a - b).join();
  if (!Array.isArray(set.answer) || set.answer.length !== n
      || [...set.answer].sort((a, b) => a - b).join() !== idPerm)
    fails.push(id + ': answer not a permutation of sentence indexes');
  if (!Number.isInteger(set.lesson) || set.lesson < LESSON_MIN || set.lesson > LESSON_MAX)
    fails.push(id + ': lesson out of WA1 range: ' + set.lesson);
  // Optional integrity guard: when the source keeps both the exam-style
  // answerKey (1-based position per displayed sentence) and answer (reading
  // order as sentence indexes), cross-check they agree, catching conversion
  // slips. Relationship: answer[answerKey[i] - 1] === i for every i.
  if (Array.isArray(set.answerKey)) {
    if (set.answerKey.length !== n) {
      fails.push(id + ': answerKey length ' + set.answerKey.length + ' != sentences ' + n);
    } else if (Array.isArray(set.answer) && set.answer.length === n) {
      for (let i = 0; i < n; i++) {
        const pos = set.answerKey[i];
        if (!Number.isInteger(pos) || pos < 1 || pos > n || set.answer[pos - 1] !== i) {
          fails.push(id + ': answerKey and answer disagree at sentence ' + i);
          break;
        }
      }
    }
  }
  if (opts.requireExplain) {
    const ex = set.explain;
    if (!ex) { fails.push(id + ': explain missing'); }
    else {
      if (!isNonEmptyString(ex.why)) fails.push(id + ': explain.why empty');
      if (!isNonEmptyString(ex.memoryTip)) fails.push(id + ': explain.memoryTip empty');
      if (!SKILLS.includes(ex.trapType)) fails.push(id + ': explain.trapType invalid: ' + ex.trapType);
      if (ex.distractors != null &&
          (!Array.isArray(ex.distractors) || !ex.distractors.every(isNonEmptyString)))
        fails.push(id + ': explain.distractors present but malformed');
    }
    if (!isNonEmptyString(set.explanation))
      fails.push(id + ': composed explanation string missing');
  }
  counts.order++;
}

/* ---------- entry point ---------- */
function validatePracticeSets(sets, optsIn) {
  const opts = Object.assign({ expectSetCount: null, requireExplain: true, phase1Only: false, seedMode: false }, optsIn);
  const fails = [], warns = [];
  const counts = { mcq: 0, match: 0, cloze: 0, compAuto: 0, open: 0, craft: 0, order: 0 };

  if (!Array.isArray(sets)) return { fails: ['root: not an array'], warns, counts };
  if (opts.expectSetCount != null && sets.length !== opts.expectSetCount)
    fails.push('root: set count ' + sets.length + ' != ' + opts.expectSetCount);

  const seenIds = new Set();
  for (const ps of sets) {
    const sid = ps.setId || '(no setId)';
    if (seenIds.has(sid)) fails.push(sid + ': duplicate setId'); else seenIds.add(sid);
    if (!isNonEmptyString(ps.theme)) fails.push(sid + ': empty theme');
    if (ps.track !== 'HCL') fails.push(sid + ': track must be HCL');
    if (!['easy', 'mid', 'hard'].includes(ps.band)) fails.push(sid + ': band invalid');
    if (!Array.isArray(ps.seedSources) || ps.seedSources.length === 0)
      fails.push(sid + ': seedSources empty');
    if (!Array.isArray(ps.plan)) { fails.push(sid + ': plan missing'); continue; }

    const expected = opts.phase1Only ? PHASE1 : ZH_SECTION_ORDER;
    const types = ps.plan.map(s => s.type);
    const filtered = ZH_FULL_ORDER.filter(t => types.includes(t));
    if (types.join() !== filtered.join())
      fails.push(sid + ': plan order violates ZH_SECTION_ORDER');
    if (!opts.seedMode) {
      for (const t of expected) if (!types.includes(t))
        fails.push(sid + ': missing section ' + t);
    }

    for (const sec of ps.plan) {
      if (!Number.isFinite(sec.marks) || sec.marks <= 0)
        fails.push(sid + '/' + sec.type + ': marks not positive');
      const items = sec.items || [];
      switch (sec.type) {
        case 'HanziMcq': case 'PinyinMcq': case 'VocabMcq': case 'SentenceMcq':
          if (sec.type === 'VocabMcq' && sec.variant === 'pool')
            items.forEach(s => checkMatchSet(s, fails, counts, opts));
          else
            items.forEach(q => checkMcqItem(q, fails, counts, opts));
          break;
        case 'VocabMatch':
          items.forEach(s => checkMatchSet(s, fails, counts, opts)); break;
        case 'PassageCloze':
          items.forEach(s => checkClozeSet(s, fails, counts, opts)); break;
        case 'ReadingMcq': case 'ReadingOpen':
          items.forEach(s => checkCompSet(s, sec.type, fails, counts, opts)); break;
        case 'SentenceCraft':
          items.forEach(q => checkCraftItem(q, fails, counts, opts)); break;
        case 'SentenceOrder':
          items.forEach(s => checkOrderSet(s, fails, counts, opts)); break;
        default:
          warns.push(sid + '/' + sec.type + ': no validator yet (phase 2/3 type)');
      }
    }
  }
  return { fails, warns, counts };
}

module.exports = { validatePracticeSets, ZH_SECTION_ORDER, ZH_FULL_ORDER, PHASE1, COMP_FORMATS, SKILLS };
