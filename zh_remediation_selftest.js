/* Self-test for src/lib/zhRemediation.js
   Loads the real ESM source, strips the `export { ... }` line, and evaluates
   it in a CommonJS sandbox so `node zh_remediation_selftest.js` works without
   a bundler. Zero external deps; tests the actual shipped functions. */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = path.join('src', 'lib', 'zhRemediation.js');
let code = fs.readFileSync(SRC, 'utf8').replace(/export\s*\{[^}]*\};?/g, '');
const factory = new Function(
  'module', 'exports',
  code + '\nmodule.exports={aggregateTrapPriority,collectSetSkills,pickNextWa1Set,clampIdx,collectMcqItems,buildRemediationDrill};'
);
const mod = { exports: {} };
factory(mod, mod.exports);
const { aggregateTrapPriority, collectSetSkills, pickNextWa1Set, clampIdx, collectMcqItems, buildRemediationDrill } = mod.exports;

let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log('PASS ' + name); }
  else { fail++; console.log('FAIL ' + name); }
}

// --- aggregateTrapPriority ---
const mistakes = [
  { skill: 'duoyinzi', correct: false, date: '2026-07-01' },
  { skill: 'duoyinzi', correct: false, date: '2026-07-05' },
  { skill: 'duoyinzi', correct: false, date: '2026-07-03' },
  { skill: 'dapei', correct: false, date: '2026-07-02' },
  { trapType: 'shengdiao', correct: false, date: '2026-07-06' }, // trapType fallback
  { correct: false, date: '2026-07-06' },                        // no skill -> ignored
];
const q = aggregateTrapPriority(mistakes);
ok('ranks by count desc (duoyinzi first, count 3)', q[0].skill === 'duoyinzi' && q[0].count === 3);
ok('lastSeen is most-recent for duoyinzi', q[0].lastSeen === '2026-07-05');
ok('trapType fallback counted (shengdiao present)', q.some(e => e.skill === 'shengdiao'));
ok('entries without skill ignored', q.reduce((s, e) => s + e.count, 0) === 5);
ok('empty mistakes -> empty queue', aggregateTrapPriority([]).length === 0);

// --- collectSetSkills across all section shapes ---
const set = { setId: 'T', plan: [
  { type: 'HanziMcq', items: [{ skill: 'xingjinzi' }, { skill: 'tongyinzi' }] },
  { type: 'PinyinMcq', items: [{ skill: 'duoyinzi' }] },
  { type: 'VocabMatch', items: [{ items: [{ skill: 'dapei' }, { skill: 'dapei' }] }] },
  { type: 'PassageCloze', items: [{ blanks: [{ skill: 'vocab_in_context' }] }] },
  { type: 'ReadingMcq', items: [{ questions: [{ skill: 'detail' }, { skill: 'inference' }] }] },
  { type: 'SentenceCraft', items: [{ skill: 'lianci' }] },
] };
const skills = collectSetSkills(set);
ok('collectSetSkills finds MCQ leaf skills', skills.includes('xingjinzi') && skills.includes('duoyinzi'));
ok('collectSetSkills finds nested match/cloze/reading', skills.includes('dapei') && skills.includes('vocab_in_context') && skills.includes('detail'));
ok('collectSetSkills finds craft skill', skills.includes('lianci'));
ok('collectSetSkills counts duplicates (dapei x2)', skills.filter(s => s === 'dapei').length === 2);

// --- pickNextWa1Set ---
const mk = (id, sk) => ({ setId: id, plan: [{ type: 'PinyinMcq', items: sk.map(s => ({ skill: s })) }] });
const sets = [
  mk('S0', ['detail', 'detail']),
  mk('S1', ['dapei']),
  mk('S2', ['duoyinzi', 'duoyinzi', 'duoyinzi']), // richest in the weak trap
  mk('S3', ['xingjinzi']),
];
const weak = [{ skill: 'duoyinzi', date: '2026-07-05' }, { skill: 'duoyinzi', date: '2026-07-06' }];
ok('picks the set richest in the weak trap (S2 idx 2)', pickNextWa1Set(sets, weak, 0) === 2);
ok('no mistakes -> sequential fallback idx', pickNextWa1Set(sets, [], 1) === 1);
ok('empty sets -> 0', pickNextWa1Set([], weak, 3) === 0);
ok('fallback out-of-range wraps', pickNextWa1Set(sets, [], 7) === 3); // 7 % 4 = 3

// tie-break: two sets equally weak -> earliest at/after fallback wins
const tie = [mk('A', ['duoyinzi']), mk('B', ['duoyinzi'])];
ok('tie -> earliest from fallback (fallback 0 -> A idx 0)', pickNextWa1Set(tie, [{ skill: 'duoyinzi' }], 0) === 0);
ok('tie -> starts scan at fallback (fallback 1 -> B idx 1)', pickNextWa1Set(tie, [{ skill: 'duoyinzi' }], 1) === 1);

// --- clampIdx ---
ok('clampIdx wraps negative', clampIdx(-1, sets) === 3);
ok('clampIdx wraps large', clampIdx(9, sets) === 1);

// --- buildRemediationDrill (item-level) ---
const mcq = (id, sk) => ({ id: id, skill: sk, options: ['a', 'b', 'c', 'd'], answer: 0, explain: { trapType: sk } });
const drillSets = [
  { setId: 'ZS01', plan: [
    { type: 'HanziMcq', items: [mcq('ZS01_A1', 'xingjinzi'), mcq('ZS01_A2', 'tongyinzi')] },
    { type: 'PinyinMcq', items: [mcq('ZS01_B1', 'duoyinzi'), mcq('ZS01_B2', 'shengdiao')] },
    { type: 'VocabMcq', items: [mcq('ZS01_C1', 'vocab_in_context')] },
    { type: 'PassageCloze', items: [{ id: 'ZS01_F', blanks: [{ skill: 'vocab_in_context' }] }] }, // excluded
    { type: 'ReadingMcq', items: [{ id: 'ZS01_G', questions: [{ skill: 'detail' }] }] },            // excluded
  ] },
  { setId: 'ZS02', plan: [
    { type: 'PinyinMcq', items: [mcq('ZS02_B1', 'duoyinzi'), mcq('ZS02_B2', 'xingjinzi')] },
  ] },
];

ok('collectMcqItems excludes cloze/reading (7 MCQ items total)', collectMcqItems(drillSets).length === 7);

const drill = buildRemediationDrill(drillSets, [{ id: 'ZS01_B1', skill: 'duoyinzi', date: '2026-07-06' }], { maxItems: 10 });
const drillIds = [];
drill.plan.forEach(sec => sec.items.forEach(it => drillIds.push(it.id)));
ok('drill re-serves the exact missed item (ZS01_B1)', drillIds[0] === 'ZS01_B1');
ok('drill tops up same-trap fresh item (ZS02_B1 duoyinzi)', drillIds.indexOf('ZS02_B1') !== -1);
ok('drill excludes cloze/reading ids', !drillIds.some(id => id === 'ZS01_F' || id === 'ZS01_G'));
ok('drill sections are MCQ types only', drill.plan.every(s => ['HanziMcq', 'PinyinMcq', 'VocabMcq'].includes(s.type)));
ok('drill setId is ZS_DRILL', drill.setId === 'ZS_DRILL');
ok('drill ids unique', drillIds.length === new Set(drillIds).size);

const capped = buildRemediationDrill(drillSets, [
  { id: 'ZS01_B1', skill: 'duoyinzi' }, { id: 'ZS02_B1', skill: 'duoyinzi' },
  { id: 'ZS01_A1', skill: 'xingjinzi' },
], { maxItems: 2 });
const cappedCount = capped.plan.reduce((n, s) => n + s.items.length, 0);
ok('drill respects maxItems cap', cappedCount === 2);

ok('no mistakes -> no drill (null)', buildRemediationDrill(drillSets, []) === null);
ok('empty corpus -> null', buildRemediationDrill([], [{ id: 'x', skill: 'duoyinzi' }]) === null);

console.log('\nRESULT: ' + pass + ' pass / ' + fail + ' fail');
process.exit(fail ? 1 : 0);
