/* node --experimental-detect-module tools/taxonomy/selftest.js */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import {
  readItemTags,
  collectQuestions,
  buildTagIndex,
  questionsWithConcept,
  questionsWithTrap,
  similarQuestions,
  isSkillConcept,
} from '../../src/lib/similarItemsCore.js';
import { PARENT_CONCEPT_IDS } from '../../src/data/taxonomy/parents.js';
import { pickSimilar, patternSummary, CAUSES } from '../../src/lib/wrongNotebook.js';

const require = createRequire(import.meta.url);
const tax = require('../../src/data/taxonomy/taxonomy.json');
const { tagEnglish, tagChineseItem } = require('../../tools/taxonomy/tagItem.js');

const a = { id: 'a', sentence: 'one', answer: 1, conceptIds: ['en.grammar.pronoun'], taxonomyStatus: 'certain' };
const b = { id: 'b', sentence: 'two', answer: 0, conceptIds: ['en.grammar.pronoun'], trapIds: ['trap.lookalike'], taxonomyStatus: 'certain' };
const c = { id: 'c', sentence: 'three', answer: 0, conceptIds: ['en.grammar.pronoun'], taxonomyStatus: 'uncertain' };
const d = { id: 'd', sentence: 'four', answer: 0, conceptIds: ['en.vocab.idiom'], trapIds: ['trap.literal_idiom'], taxonomyStatus: 'certain' };
const e = { id: 'e', sentence: 'five', answer: 0, conceptIds: ['zh.hanzi.tongyinzi'], trapIds: ['trap.lookalike'], taxonomyStatus: 'certain' };
const blank = { num: 2, answer: 'on', conceptIds: ['en.grammar.preposition'], taxonomyStatus: 'certain' };
const set = { id: 'S01_C', blanks: [blank], passage: 'x' };

const collected = collectQuestions({ plan: [{ items: [a, b, c, d, e, set] }] });
const ids = collected.map((row) => row.id);
assert.deepEqual(ids.filter((id) => id === 'S01_C_2'), ['S01_C_2']);
assert.ok(ids.includes('a') && ids.includes('e'));
assert.ok(!ids.includes('S01_C'), 'container set is not a question');

const index = buildTagIndex(collected, {});
const same = questionsWithConcept(index, 'en.grammar.pronoun');
assert.equal(same.length, 3);
assert.equal(same[0].taxonomyStatus, 'certain');
assert.equal(same[2].taxonomyStatus, 'uncertain');

const three = similarQuestions(index, a, { limit: 3 });
assert.equal(three.length, 2, 'only two other pronoun items exist');
assert.ok(three.every((row) => row.id !== 'a'));
assert.deepEqual(three.map((row) => row.id), ['b', 'c']);

const idiomLike = similarQuestions(index, d, { limit: 3 });
assert.equal(idiomLike.length, 0, 'no second idiom, and trap fill only uses trap matches');

const lookalikes = questionsWithTrap(index, 'trap.lookalike', { excludeIds: ['b'] });
assert.deepEqual(lookalikes.map((row) => row.id), ['e']);

const overlay = { paper1: { conceptIds: ['math.number.ratio'], taxonomyStatus: 'uncertain' } };
const paperItem = { id: 'paper1', question: 'ratio of red to blue', answer: '2:3' };
const tagged = readItemTags(paperItem, overlay);
assert.deepEqual(tagged.conceptIds, ['math.number.ratio']);
const ownWins = readItemTags({ id: 'paper1', conceptIds: ['math.number.fractions'], answer: 1 }, overlay);
assert.deepEqual(ownWins.conceptIds, ['math.number.fractions']);

const paperIndex = buildTagIndex(collectQuestions([paperItem, { id: 'paper2', question: 'q', answer: 1, conceptIds: ['math.number.ratio'], taxonomyStatus: 'certain' }]), overlay);
const similarRatio = similarQuestions(paperIndex, paperItem, { limit: 3, overlayById: overlay });
assert.equal(similarRatio.length, 1);
assert.equal(similarRatio[0].id, 'paper2');
assert.equal(similarQuestions(paperIndex, { id: 'lonely', sentence: 'x', answer: 1 }, { limit: 3 }).length, 0);

const parents = new Set(tax.concepts.map((c) => c.parent).filter(Boolean));
assert.deepEqual([...parents].sort(), [...PARENT_CONCEPT_IDS].sort());
assert.equal(tax.status, 'APPROVED');
assert.equal(tax.approvedOn, '2026-11-19');
assert.ok(tax.concepts.some((c) => c.id === 'en.reading.fact_finding'));
assert.ok(tax.concepts.filter((c) => c.subject === 'math' || c.subject === 'science').every((c) => c.inScope === false));
assert.equal(CAUSES.length, 6);
for (const cause of CAUSES) {
  const row = tax.notebookCauses.find((c) => c.id === cause.id);
  assert.equal(row.label, cause.label);
  assert.equal(row.storedValue, cause.value);
  assert.equal(cause.ko, undefined);
}
assert.equal(isSkillConcept('en.grammar.simple_past'), true);
assert.equal(isSkillConcept('en.language.editing'), false);
assert.equal(isSkillConcept('zh.hanzi'), false);
assert.equal(isSkillConcept('zh.writing.picture'), true);

const edit = { id: 'edit1', sentence: 'goed', answer: 'went', conceptIds: ['en.grammar.simple_past'], taxonomyStatus: 'certain', section: 'Editing' };
const mcq = { id: 'mcq1', sentence: 'Yesterday she ___ home.', answer: 0, conceptIds: ['en.grammar.simple_past'], taxonomyStatus: 'certain', section: 'GrammarMCQ' };
const otherSkill = { id: 'other', sentence: 'x', answer: 0, conceptIds: ['en.grammar.pronoun'], taxonomyStatus: 'certain', section: 'GrammarMCQ' };
const cross = buildTagIndex([edit, mcq, otherSkill], {});
assert.deepEqual(similarQuestions(cross, edit, { limit: 3 }).map((r) => r.id), ['mcq1']);
assert.deepEqual(pickSimilar(cross, { byId: { mcq1: {}, edit1: {} } }, { id: 'edit1' }, similarQuestions).ids, ['mcq1']);

const bianzi = { id: 'paper-bianzi', sentence: '字', answer: 0, conceptIds: ['zh.hanzi'], trapIds: ['trap.lookalike'], taxonomyStatus: 'uncertain', section: 'BianZi' };
const xing = { id: 'zh-xing', sentence: '形', answer: 1, conceptIds: ['zh.hanzi.xingjinzi'], trapIds: ['trap.lookalike'], taxonomyStatus: 'certain', section: 'HanziMcq' };
const readParent = { id: 'paper-read', q: '问', answer: 0, conceptIds: ['zh.reading'], taxonomyStatus: 'uncertain', section: 'YueReadMCQ' };
const readDetail = { id: 'zh-detail', q: '细节', answer: 0, conceptIds: ['zh.reading.detail'], taxonomyStatus: 'certain' };
const k1 = { id: 'k1', q: '图', answer: 0, conceptIds: ['zh.writing.picture'], taxonomyStatus: 'uncertain', section: 'KanTu' };
const k2 = { id: 'k2', q: '图2', answer: 0, conceptIds: ['zh.writing.picture'], taxonomyStatus: 'uncertain', section: 'KanTu' };
const zhIdx = buildTagIndex([bianzi, xing, readParent, readDetail, k1, k2], {});
assert.deepEqual(similarQuestions(zhIdx, bianzi, { limit: 3 }).map((r) => r.id), ['zh-xing']);
assert.deepEqual(similarQuestions(zhIdx, readParent, { limit: 3 }).map((r) => r.id), []);
assert.deepEqual(similarQuestions(zhIdx, k1, { limit: 3 }).map((r) => r.id), ['k2']);
assert.deepEqual(pickSimilar(zhIdx, { byId: { 'zh-xing': {} } }, { id: 'paper-bianzi' }, similarQuestions).ids, ['zh-xing']);
const pickedKan = pickSimilar(zhIdx, { byId: { k2: {} } }, { id: 'k1' }, similarQuestions);
assert.deepEqual(pickedKan.ids, ['k2']);
assert.equal(pickSimilar(zhIdx, { byId: { 'zh-detail': {} } }, { id: 'paper-read' }, similarQuestions).reason, 'no_skill');

const why = tagEnglish({ section: 'Comprehension', format: 'open_sentence', stem: 'Why do you think the elderly woman was surprised?', solution: { tip: 'Think about what is unusual or unexpected.' } });
assert.deepEqual(why.conceptIds, ['en.reading.inference']);
assert.equal(why.taxonomyStatus, 'certain');
const listed = tagEnglish({ section: 'Comprehension', format: 'open_sentence', stem: 'Why are seahorses in danger today?', solution: { tip: 'List all three reasons given in paragraph 5.' } });
assert.deepEqual(listed.conceptIds, ['en.reading.fact_finding']);
assert.equal(listed.taxonomyStatus, 'certain');
const thin = tagEnglish({ section: 'Comprehension', format: 'open_sentence', stem: 'Why did she stop?', solution: { tip: 'Answer the question.' } });
assert.equal(thin.taxonomyStatus, 'uncertain');
assert.equal(thin.conceptIds[0], 'en.reading.inference');

const tone = tagChineseItem({ topic: 'PinYin', stem: '选拼音', method: 'Identifying the tones — 跌 (1st tone)' });
assert.deepEqual(tone.conceptIds, ['zh.pinyin.shengdiao']);
assert.equal(tone.taxonomyStatus, 'certain');
const coarse = tagChineseItem({ topic: 'BianZi', stem: '选字', method: 'Action verb from context' });
assert.deepEqual(coarse.conceptIds, ['zh.hanzi']);
assert.equal(coarse.taxonomyStatus, 'uncertain');
assert.ok(coarse.trapIds.includes('trap.lookalike'));
const inferred = tagChineseItem({ topic: 'YueReadMCQ', stem: '河水干了，给大家带来什么不便？', method: 'Inferring details: use clues in the passage.' });
assert.deepEqual(inferred.conceptIds, ['zh.reading.inference']);
assert.equal(inferred.taxonomyStatus, 'certain');
const ownSkill = tagChineseItem({ topic: 'BianZi', stem: '字', skill: 'tongyinzi', method: 'ignored' });
assert.deepEqual(ownSkill.conceptIds, ['zh.hanzi.tongyinzi']);

const patterns = patternSummary([
  { id: 'zh-xing', cause: 'trap' },
  { id: 'k1', cause: 'misread' },
  { id: 'k2', cause: 'trap' },
], zhIdx);
assert.deepEqual(patterns.causes[0], ['trap', 2]);
assert.deepEqual(patterns.traps[0], ['trap.lookalike', 1]);

console.log('similarItems selftest OK');
