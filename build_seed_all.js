// Merges individual seed files into seed_zh_all.json and validates each
// as a ZhPracticeSet (seedMode, requireExplain). Also emits per-seed counts.
const fs = require('fs');
const { validatePracticeSets } = require('./zh_wa1_validate.js');

const SEED_FILES = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!SEED_FILES.length) { console.error('usage: node build_seed_all.js seed_a.json seed_b.json ...'); process.exit(1); }

function mcqItems(items, seedId, prefix, topic) {
  return items.map(q => ({
    id: `${seedId}_${prefix}${q.num}`, topic,
    sentence: q.sentence, options: q.options, answer: q.answer0,
    lesson: q.lesson, skill: q.skill,
    explain: q.explain, explanation: q.explain ? q.explain.why + ' ' + q.explain.memoryTip : undefined,
  }));
}
function matchSet(sec, seedId, sid) {
  return {
    id: `${seedId}_${sid}`, instruction: sec.instruction || 'match', pool: sec.pool,
    items: sec.items.map(it => ({
      num: it.num, stem: it.stem, answer: it.answer0, lesson: it.lesson, skill: it.skill,
      explain: it.explain, explanation: it.explain ? it.explain.why : undefined,
    })),
  };
}
function orderSet(sec, seedId, sid) {
  // raw SentenceOrder convention: instruction, sentences[], answerKey (1-based
  // position per displayed sentence), answer0 (reading order as 0-based indexes),
  // explain, lesson. The validator consumes `answer` = reading order indexes.
  return {
    id: `${seedId}_${sid}`, instruction: sec.instruction,
    sentences: sec.sentences, answer: sec.answer0, answerKey: sec.answerKey, lesson: sec.lesson,
    explain: sec.explain,
    explanation: sec.explain ? sec.explain.why + ' ' + sec.explain.memoryTip : undefined,
  };
}
function craftItems(items, seedId) {
  return items.map(q => ({
    id: `${seedId}_E${q.num}`, subtype: q.subtype, connector: q.connector,
    sentenceA: q.sentenceA, sentenceB: q.sentenceB, starter: q.starter,
    instruction: q.instruction, answer: q.answer, answerSimple: q.answerSimple,
    hint: q.hint, marks: q.marks, lesson: q.lesson, skill: q.skill,
    explain: q.explain,
    explanation: q.explain ? q.explain.why + ' ' + q.explain.memoryTip : undefined,
  }));
}
function toPlan(seed) {
  const S = seed.sections, plan = [];
  if (S.HanziMcq)  plan.push({ type: 'HanziMcq', marks: S.HanziMcq.items.length, variant: undefined, items: mcqItems(S.HanziMcq.items, seed.seedId, 'A', 'HanziMcq') });
  if (S.HanziMcqB) { const b = plan.find(p=>p.type==='HanziMcq'); const extra = mcqItems(S.HanziMcqB.items, seed.seedId, 'Ab', 'HanziMcq'); if (b){ b.items=b.items.concat(extra); b.marks+=extra.length;} else plan.push({type:'HanziMcq',marks:extra.length,items:extra}); }
  if (S.PinyinMcq) plan.push({ type: 'PinyinMcq', marks: S.PinyinMcq.items.length, items: mcqItems(S.PinyinMcq.items, seed.seedId, 'B', 'PinyinMcq') });
  // VocabMcq: list-variant items OR pool-variant (VocabMcqPool)
  if (S.VocabMcq)  plan.push({ type: 'VocabMcq', variant: 'mcq4', marks: S.VocabMcq.items.length, items: mcqItems(S.VocabMcq.items, seed.seedId, 'C', 'VocabMcq') });
  if (S.VocabMcqPool) plan.push({ type: 'VocabMcq', variant: 'pool', marks: S.VocabMcqPool.items.length, items: [matchSet(S.VocabMcqPool, seed.seedId, 'Cp')] });
  if (S.VocabMatch) plan.push({ type: 'VocabMatch', marks: S.VocabMatch.items.length, items: [matchSet(S.VocabMatch, seed.seedId, 'D')] });
  if (S.SentenceCraft) plan.push({ type: 'SentenceCraft', marks: S.SentenceCraft.items.reduce((a,b)=>a+(b.marks||0),0), items: craftItems(S.SentenceCraft.items, seed.seedId) });
  if (S.SentenceOrder) plan.push({ type: 'SentenceOrder', marks: S.SentenceOrder.sentences.length, items: [orderSet(S.SentenceOrder, seed.seedId, 'SO')] });
  if (S.PassageCloze) plan.push({ type: 'PassageCloze', marks: S.PassageCloze.blanks.length, items: [{
    id: `${seed.seedId}_F`, passage: S.PassageCloze.passage, wordBank: S.PassageCloze.wordBank,
    blanks: S.PassageCloze.blanks.map(b => ({ num: b.num, answer: b.answer, lesson: b.lesson, skill: b.skill, explain: b.explain, explanation: b.explain ? b.explain.why : undefined })),
  }] });
  if (S.ReadingMcq) plan.push({ type: 'ReadingMcq', marks: S.ReadingMcq.questions.length, items: [{
    id: `${seed.seedId}_G`, passage: S.ReadingMcq.passage,
    questions: S.ReadingMcq.questions.map((q, i) => { const base = { id: `${seed.seedId}_G${i+1}`, format: q.format || 'mcq', stem: q.stem, explain: q.explain, lesson: q.lesson, skill: q.skill }; if ((q.format||'mcq')==='mcq') { base.options=q.options; base.answer=q.answer0; } else if (q.format==='sequence') { base.sequenceItems=q.sequenceItems; base.answer=q.answer; } else if (q.format==='fill_word') { base.answer=q.answer; } else if (q.format==='fill_table') { base.statements=q.statements; base.answer=q.answer; } return base; }),
  }] });
  if (S.ReadingOpen) plan.push({ type: 'ReadingOpen', marks: S.ReadingOpen.questions.reduce((a, q) => a + (q.marks || 1), 0), items: [{
    id: `${seed.seedId}_H`, passage: S.ReadingOpen.passage,
    questions: S.ReadingOpen.questions.map((q, i) => { const base = { id: `${seed.seedId}_H${i+1}`, format: q.format || 'open_sentence', stem: q.stem, marks: q.marks, explain: q.explain, lesson: q.lesson, skill: q.skill }; if (q.format === 'mcq') { base.options=q.options; base.answer=q.answer0; } else if (q.format==='sequence') { base.sequenceItems=q.sequenceItems; base.answer=q.answer; } else if (q.format==='fill_table') { base.statements=q.statements; base.answer=q.answer; } else { base.answer=q.answer; } return base; }),
  }] });
  // enforce canonical order
  const ORDER = ['HanziMcq','PinyinMcq','VocabMcq','VocabMatch','SentenceMcq','SentenceCraft','SentenceOrder','ErrorCorrection','CharWrite','PassageCloze','ReadingMcq','ReadingOpen'];
  plan.sort((a,b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type));
  return plan;
}

const all = { generatedAt: new Date().toISOString().slice(0,10), seeds: [] };
let grand = { mcq:0, match:0, cloze:0, compAuto:0, open:0, craft:0, order:0 };
let anyFail = false;

for (const f of SEED_FILES) {
  const seed = JSON.parse(fs.readFileSync(f, 'utf8'));
  const plan = toPlan(seed);
  const ps = { setId: seed.seedId, theme: `${seed.school} ${seed.year}`, track: 'HCL', band: 'mid', seedSources: [seed.seedId], plan };
  const res = validatePracticeSets([ps], { requireExplain: true, seedMode: true, expectSetCount: 1 });
  const status = res.fails.length ? 'FAIL' : 'PASS';
  if (res.fails.length) anyFail = true;
  for (const k in grand) grand[k] += res.counts[k];
  console.log(`${status}  ${seed.seedId.padEnd(28)} [${plan.map(p=>p.type).join(',')}]  ${JSON.stringify(res.counts)}`);
  if (res.fails.length) console.log('   ' + res.fails.join('\n   '));
  all.seeds.push({ seedId: seed.seedId, school: seed.school, year: seed.year, track: seed.track, raw: seed });
}

fs.writeFileSync('seed_zh_all.json', JSON.stringify(all, null, 1), 'utf8');
console.log('\nseed_zh_all.json written: ' + all.seeds.length + ' seed(s)');
console.log('grand Phase-1 auto-graded items:', grand);
process.exit(anyFail ? 1 : 0);
