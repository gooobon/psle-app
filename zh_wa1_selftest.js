/* Self-test for zh_wa1_validate.js
   1) a fully valid mini practice set must yield 0 failures
   2) each seeded corruption must be caught by exactly the expected rule */
'use strict';
const { validatePracticeSets } = require('./zh_wa1_validate.js');

function mkExplain(nOpts) {
  return {
    why: 'context clue: drinking juice needs the mouth radical',
    distractors: Array.from({ length: nOpts }, (_, i) => 'option ' + (i + 1) + ' fails because of radical/meaning mismatch'),
    trapType: 'xingjinzi',
    memoryTip: 'xi = mouth + ji; drinking uses the mouth',
  };
}

function validSet() {
  const mcq = (id, topic) => ({
    id, topic,
    sentence: '\u59b9\u59b9\u559c\u6b22\u7528______\u7ba1\u559d\u679c\u6c41\u3002',
    options: ['\u7ea7', '\u5438', '\u6781', '\u573e'],
    answer: 1,
    explanation: 'composed text',
    explain: mkExplain(4),
    lesson: 1, skill: 'xingjinzi',
  });
  return {
    setId: 'ZS01', theme: 'school life', track: 'HCL', band: 'easy',
    seedSources: ['rulang_2024_wa1'],
    plan: [
      { type: 'HanziMcq', marks: 2, items: [mcq('ZS01_A_1', 'HanziMcq'), mcq('ZS01_A_2', 'HanziMcq')] },
      { type: 'PinyinMcq', marks: 1, items: [mcq('ZS01_B_1', 'PinyinMcq')] },
      { type: 'VocabMcq', marks: 1, variant: 'mcq4', items: [mcq('ZS01_C_1', 'VocabMcq')] },
      { type: 'VocabMatch', marks: 2, items: [{
        id: 'ZS01_D', instruction: 'choose the best match',
        pool: ['\u6563\u6b65', '\u5468\u56f4', '\u8d77\u70b9'],
        items: [
          { num: 1, stem: '\u51fa\u5916\uff08\u3000\uff09', answer: 0, explain: mkExplain(3), lesson: 2, skill: 'dapei' },
          { num: 2, stem: '\uff08\u3000\uff09\u62c7\u6307', answer: 2, explain: mkExplain(3), lesson: 2, skill: 'dapei' },
        ],
      }] },
      { type: 'SentenceCraft', marks: 4, items: [{
        id: 'ZS01_E_1', subtype: 'combine', connector: '\u53ea\u8981\u2026\u2026\u5c31',
        sentenceA: '\u6211\u505a\u5b8c\u529f\u8bfe\u3002', sentenceB: '\u6211\u80fd\u53bb\u6e38\u6cf3\u3002',
        instruction: 'combine with the connective', answer: '\u53ea\u8981\u6211\u505a\u5b8c\u529f\u8bfe\uff0c\u5c31\u80fd\u53bb\u6e38\u6cf3\u3002',
        marks: 2, lesson: 3, skill: 'lianci',
        explanation: 'composed craft explanation',
        explain: { why: 'the paired connective marks a sufficient condition', distractors: [],
          trapType: 'lianci', memoryTip: 'zhi yao sets the condition, jiu marks the result' },
      }] },
      { type: 'PassageCloze', marks: 2, items: [{
        id: 'ZS01_F',
        passage: '\u5c0f\u4e50 (1) ___ \u56de\u5bb6\uff0c\u7136\u540e (2) ___ \u4f11\u606f\u3002',
        wordBank: ['\u5df2\u7ecf', '\u8fde\u5fd9', '\u6446\u52a8'],
        blanks: [
          { num: 1, answer: '\u5df2\u7ecf', hint: 'time word', explain: mkExplain(3), lesson: 1, skill: 'vocab_in_context' },
          { num: 2, answer: '\u8fde\u5fd9', hint: 'speed word', explain: mkExplain(3), lesson: 1, skill: 'vocab_in_context' },
        ],
      }] },
      { type: 'ReadingMcq', marks: 2, items: [{
        id: 'ZS01_G',
        passage: '\u661f\u671f\u5929\u65e9\u4e0a\uff0c\u6211\u4eec\u4e00\u5bb6\u4eba\u5230\u5496\u5561\u5e97\u5403\u4e86\u65e9\u9910\u540e\uff0c\u4e00\u8d77\u53bb\u516c\u56ed\u6563\u6b65\u3002\u6765\u5230\u4e00\u68f5\u5927\u6811\u4e0b\uff0c\u6211\u4eec\u770b\u5230\u6709\u4e00\u53ea\u957f\u5f97\u5f88\u53ef\u7231\u7684\u5c0f\u732b\uff0c\u4e00\u52a8\u4e5f\u4e0d\u52a8\u3002\u6211\u4eec\u8d70\u4e0a\u524d\u4e00\u770b\uff0c\u539f\u6765\u5c0f\u732b\u7684\u53f3\u811a\u53d7\u4f24\u4e86\u3002',
        questions: [{
          id: 'ZS01_G_1', format: 'mcq', marks: 1,
          stem: 'where did they find the cat',
          options: ['park', 'cafe', 'home'], answer: 0,
          explain: mkExplain(3), lesson: 2, skill: 'detail',
        }],
      }] },
      { type: 'ReadingOpen', marks: 4, items: [{
        id: 'ZS01_H',
        passage: '\u888b\u9f20\u521a\u642c\u5230\u6e56\u8fb9\u7684\u5c71\u6d1e\u91cc\u3002\u5b83\u5f88\u4e45\u6ca1\u770b\u89c1\u597d\u670b\u53cb\u718a\u732b\u548c\u5c71\u7f8a\u4e86\uff0c\u60f3\u8bf7\u5b83\u4eec\u6765\u5e86\u795d\u5b83\u7684\u751f\u65e5\u3002\u888b\u9f20\u5c31\u753b\u4e86\u4e00\u5f20\u5361\u7247\u548c\u5730\u56fe\u5bc4\u7ed9\u5b83\u4eec\u3002',
        questions: [
          { id: 'ZS01_H_1', format: 'open_sentence', marks: 2,
            stem: 'why did it invite friends', answer: 'because it wanted to celebrate its birthday' },
          { id: 'ZS01_H_2', format: 'fill_word', marks: 1, stem: 'find the word meaning to celebrate',
            answer: '\u5e86\u795d' },
          { id: 'ZS01_H_3', format: 'sequence', marks: 1, stem: 'order the events',
            sequenceItems: ['moved in', 'sent cards', 'friends set off'], answer: [0, 1, 2] },
        ],
      }] },
    ],
  };
}

let pass = 0, fail = 0;
function expect(name, res, want) {
  const got = res.fails.length;
  const ok = want === 'zero' ? got === 0 : got > 0;
  if (ok) { pass++; console.log('PASS ' + name + (want === 'zero' ? '' : '  -> ' + res.fails[0])); }
  else { fail++; console.log('FAIL ' + name + ' fails=' + JSON.stringify(res.fails)); }
}

const v = s => validatePracticeSets([s], { requireExplain: true });

expect('valid set has zero failures', v(validSet()), 'zero');

let s = validSet(); s.plan[0].items[0].options = ['a', 'b']; // too few options
expect('options length 2 rejected', v(s), 'nonzero');

s = validSet(); s.plan[0].items[0].answer = 4;
expect('answer index out of range rejected', v(s), 'nonzero');

s = validSet(); s.plan[0].items[0].lesson = 6;
expect('lesson outside WA1 range rejected', v(s), 'nonzero');

s = validSet(); s.plan[0].items[0].explain.distractors = ['only one'];
expect('distractors/options length mismatch rejected', v(s), 'nonzero');

s = validSet(); s.plan[3].items[0].items[1].answer = 0; // reuse pool entry
expect('pool entry reuse rejected', v(s), 'nonzero');

s = validSet(); s.plan[5].items[0].passage = 'no markers here';
expect('cloze marker/blank mismatch rejected', v(s), 'nonzero');

s = validSet(); s.plan[6].items[0].questions[0].format = 'open_sentence';
expect('non-mcq inside ReadingMcq rejected', v(s), 'nonzero');

s = validSet(); s.plan[7].items[0].questions[2].answer = [0, 0, 2];
expect('sequence non-permutation rejected', v(s), 'nonzero');

s = validSet(); [s.plan[0], s.plan[1]] = [s.plan[1], s.plan[0]];
expect('section order violation rejected', v(s), 'nonzero');

// ---------------- SentenceOrder self-tests ----------------
function mkOrder(over) {
  return Object.assign({
    id: 'T_SO', instruction: 'pai yi pai',
    sentences: ['s1', 's2', 's3', 's4', 's5', 's6'],
    answer: [0, 1, 2, 3, 4, 5], lesson: 2,
    explanation: 'order by time and cause',
    explain: { why: 'events run in time/cause order', distractors: [],
      trapType: 'sequence', memoryTip: 'watch time words and pronoun reference' },
  }, over);
}
function soSet(o) {
  return { setId: 'TSO', theme: 't', track: 'HCL', band: 'easy', seedSources: ['x'],
    plan: [{ type: 'SentenceOrder', marks: 5, items: [o] }] };
}
const vSO = o => validatePracticeSets([soSet(o)], { requireExplain: true, seedMode: true });

expect('SentenceOrder valid set has zero failures', vSO(mkOrder()), 'zero');
expect('SentenceOrder non-permutation rejected', vSO(mkOrder({ answer: [0, 0, 2, 3, 4, 5] })), 'nonzero');
expect('SentenceOrder answer length mismatch rejected', vSO(mkOrder({ answer: [0, 1, 2] })), 'nonzero');
expect('SentenceOrder too few sentences rejected', vSO(mkOrder({ sentences: ['a', 'b'], answer: [0, 1] })), 'nonzero');
expect('SentenceOrder lesson out of range rejected', vSO(mkOrder({ lesson: 9 })), 'nonzero');
expect('SentenceOrder missing explain rejected', vSO(mkOrder({ explain: undefined, explanation: undefined })), 'nonzero');
expect('SentenceOrder bad trapType rejected', vSO(mkOrder({ explain: { why: 'x', memoryTip: 'y', trapType: 'nope', distractors: [] } })), 'nonzero');
expect('SentenceOrder empty instruction rejected', vSO(mkOrder({ instruction: '' })), 'nonzero');

expect('SentenceOrder answerKey inconsistent rejected', vSO(mkOrder({ answerKey: [2,1,3,4,5,6] })), 'nonzero'); // answerKey cross-check (swapped -> disagrees with answer [0..5])
expect('SentenceOrder answerKey consistent passes', vSO(mkOrder({ answerKey: [1,2,3,4,5,6], answer: [0,1,2,3,4,5] })), 'zero');

// ---------------- SentenceCraft self-tests ----------------
function mkCraft(over) {
  return Object.assign({
    id: 'T_SC', subtype: 'combine', connector: '\u56e0\u4e3a',
    sentenceA: 'a', sentenceB: 'b', instruction: 'combine',
    answer: '\u56e0\u4e3a a b', marks: 2, lesson: 2, skill: 'lianci',
    explanation: 'x', explain: { why: 'w', distractors: [], trapType: 'lianci', memoryTip: 'm' },
  }, over);
}
function scSet(o) {
  return { setId: 'TSC', theme: 't', track: 'HCL', band: 'easy', seedSources: ['x'],
    plan: [{ type: 'SentenceCraft', marks: 2, items: [o] }] };
}
const vSC = o => validatePracticeSets([scSet(o)], { requireExplain: true, seedMode: true });

expect('SentenceCraft valid lianci set has zero failures', vSC(mkCraft()), 'zero');
expect('SentenceCraft connector not used in answer rejected', vSC(mkCraft({ answer: 'a b' })), 'nonzero');
expect('SentenceCraft paired connector partial use rejected', vSC(mkCraft({ connector: '\u53ea\u8981\u2026\u2026\u5c31', answer: '\u53ea\u8981 a b' })), 'nonzero');
expect('SentenceCraft bad skill rejected', vSC(mkCraft({ skill: 'nope' })), 'nonzero');
expect('SentenceCraft lesson out of range rejected', vSC(mkCraft({ lesson: 9 })), 'nonzero');
expect('SentenceCraft missing explain rejected', vSC(mkCraft({ explain: undefined, explanation: undefined })), 'nonzero');
expect('SentenceCraft combine without sentenceB rejected', vSC(mkCraft({ sentenceB: undefined })), 'nonzero');

console.log('\nRESULT: ' + pass + ' pass / ' + fail + ' fail');
process.exit(fail ? 1 : 0);
