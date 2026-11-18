/* node --experimental-detect-module tools/taxonomy/selftest.js */
import assert from 'node:assert/strict';
import {
  readItemTags,
  collectQuestions,
  buildTagIndex,
  questionsWithConcept,
  questionsWithTrap,
  similarQuestions,
} from '../../src/lib/similarItemsCore.js';

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

console.log('similarItems selftest OK');
