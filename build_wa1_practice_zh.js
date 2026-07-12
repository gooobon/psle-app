/* ============================================================
   build_wa1_practice_zh.js  (P3 Chinese WA1 - Step 3, Part B)
   Convert / emit / round-trip verifier - the Chinese counterpart
   of build_wa1_practice.js. It is NOT a generator: input is the
   already-generated wa1_zh_complete.json (from generate_wa1_zh.js).

   Pipeline:
     1. read wa1_zh_complete.json (array of ZhPracticeSet)
     2. validate ALL sets with zh_wa1_validate.js
        (requireExplain: true, expectSetCount: sets.length)
     3. emit src/data/p3/chinese/wa1_practice.ts
     4. round-trip: re-read the emitted file from disk, parse the
        embedded JSON, and re-validate every invariant; also compare
        item counts before/after emit.

   Usage (from repo root):
     node build_wa1_practice_zh.js
     node build_wa1_practice_zh.js --in wa1_zh_complete.json --out src/data/p3/chinese/wa1_practice.ts
     node build_wa1_practice_zh.js --expect 60      (enforce a set count)

   ASCII-only source. Reuses zh_wa1_validate.js; never re-implements checks.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const { validatePracticeSets } = require('./zh_wa1_validate.js');

function arg(name, dflt) {
  const i = process.argv.indexOf('--' + name);
  if (i === -1) return dflt;
  const v = process.argv[i + 1];
  return (v === undefined || v.startsWith('--')) ? true : v;
}
const IN_FILE = String(arg('in', 'wa1_zh_complete.json'));
const OUT_FILE = String(arg('out', path.join('src', 'data', 'p3', 'chinese', 'wa1_practice.ts')));
const EXPECT = arg('expect', null) ? parseInt(String(arg('expect', null)), 10) : null;

const MARK_BEGIN = '/* WA1_ZH_JSON_BEGIN */';
const MARK_END = '/* WA1_ZH_JSON_END */';

function fail(msg) { console.error('FAIL: ' + msg); process.exit(1); }

/* 1. read */
if (!fs.existsSync(IN_FILE)) fail(IN_FILE + ' not found. Run generate_wa1_zh.js first.');
const sets = JSON.parse(fs.readFileSync(IN_FILE, 'utf8'));
if (!Array.isArray(sets) || !sets.length) fail(IN_FILE + ' is empty or not an array');
console.log('input: ' + sets.length + ' set(s) from ' + IN_FILE);

/* 2. validate all */
const expectCount = EXPECT != null ? EXPECT : sets.length;
const pre = validatePracticeSets(sets, { requireExplain: true, expectSetCount: expectCount });
if (pre.fails.length) {
  console.error('pre-emit validation FAILED (' + pre.fails.length + '):');
  pre.fails.forEach(f => console.error('  ' + f));
  process.exit(1);
}
console.log('pre-emit validation PASS  counts=' + JSON.stringify(pre.counts));

/* 3. emit TS */
const json = JSON.stringify(sets, null, 1);
const ts = [
  '// ============================================================',
  '// wa1_practice.ts (P3 Chinese WA1) - GENERATED FILE, DO NOT EDIT',
  '// emitted by build_wa1_practice_zh.js on ' + new Date().toISOString().slice(0, 10),
  '// sets: ' + sets.length + '  source: ' + path.basename(IN_FILE),
  '// ============================================================',
  'import type { ZhPracticeSet } from "./schema";',
  '',
  'export const WA1_ZH_PRACTICE: ZhPracticeSet[] =',
  MARK_BEGIN,
  json,
  MARK_END,
  ';',
  '',
  'export default WA1_ZH_PRACTICE;',
  '',
].join('\n');
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, ts, 'utf8');
console.log('emitted: ' + OUT_FILE + ' (' + ts.length + ' chars)');

/* 4. round-trip from disk */
const back = fs.readFileSync(OUT_FILE, 'utf8');
const a = back.indexOf(MARK_BEGIN); const b = back.indexOf(MARK_END);
if (a === -1 || b === -1 || b <= a) fail('round-trip: markers not found in emitted file');
let parsed;
try { parsed = JSON.parse(back.slice(a + MARK_BEGIN.length, b).trim()); }
catch (e) { fail('round-trip: emitted JSON does not parse: ' + e.message); }
const post = validatePracticeSets(parsed, { requireExplain: true, expectSetCount: expectCount });
if (post.fails.length) {
  console.error('round-trip validation FAILED (' + post.fails.length + '):');
  post.fails.forEach(f => console.error('  ' + f));
  process.exit(1);
}
const same = JSON.stringify(pre.counts) === JSON.stringify(post.counts);
if (!same) fail('round-trip: counts changed pre=' + JSON.stringify(pre.counts) + ' post=' + JSON.stringify(post.counts));
console.log('round-trip validation PASS  counts=' + JSON.stringify(post.counts));
console.log('\nOK: ' + parsed.length + ' set(s) emitted and re-verified from disk.');
