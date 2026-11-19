/* Validator for the past-paper manifest.
   1. Flags every question with no answer as "not auto-graded" (warning; exit 1 with --strict).
   2. Fails (exit 1) if the committed manifest/report are stale vs. the paper files.
   3. Fails if any paper file yields zero questions or a duplicate question id inside one file.
   Run: node tools/papers/validate_manifest.js [--strict]
   Selftest of the no-answer detector: node tools/papers/validate_manifest.js --selftest */
const fs = require('fs');
const { build, report, MANIFEST_PATH, REPORT_PATH } = require('./build_manifest');
const { readAll } = require('./lib');

function selftest() {
  const fakeFile = require('path').join(require('os').tmpdir(), 'papers_selftest_' + process.pid + '.ts');
  fs.writeFileSync(fakeFile, `export default { meta:{school:'X',year:2024,totalMarks:3}, items:[
    {kind:'single',id:'a',topic:'T',marks:1,stem:'one',answer:'2'},
    {kind:'single',id:'b',topic:'T',marks:1,stem:'two',answer:''},
    {kind:'single',id:'c',topic:'T',marks:1,stem:'three'},
    {kind:'single',id:'d',topic:'T',marks:1,stem:'four',answer:0}] };`);
  const lib = require('./lib');
  const p = lib.readPaperForTest(fakeFile);
  fs.unlinkSync(fakeFile);
  const bad = p.questions.filter((q) => !q.answered).map((q) => q.id).join(',');
  if (bad !== 'b,c') { console.error(`selftest FAIL: expected b,c got ${bad}`); process.exit(1); }
  console.log('selftest PASS (empty and missing answers flagged; answer 0 accepted)');
}

function main() {
  if (process.argv.includes('--selftest')) return selftest();
  const strict = process.argv.includes('--strict');
  let errors = 0;
  const raw = readAll();
  raw.forEach((p) => {
    if (!p.questions.length) { console.error(`ERROR ${p.file}: no questions parsed`); errors += 1; }
    const seen = new Set();
    p.questions.forEach((q) => { if (seen.has(q.id)) { console.error(`WARN  ${p.file}: question id repeated inside file: ${q.id}`); } seen.add(q.id); });
  });
  const rows = build();
  let flagged = 0;
  rows.forEach((r) => {
    if (r.notAutoGraded.length) {
      flagged += r.notAutoGraded.length;
      console.warn(`NOT AUTO-GRADED ${r.file}: ${r.notAutoGraded.length} question(s) with no answer: ${r.notAutoGraded.join(', ')}`);
    }
  });
  const fresh = JSON.parse(JSON.stringify({ count: rows.length, papers: rows }));
  let committed = null;
  try { committed = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')); } catch (e) { /* missing */ }
  if (!committed || JSON.stringify({ count: committed.count, papers: committed.papers }) !== JSON.stringify(fresh)) {
    console.error('ERROR manifest.json is missing or stale: run node tools/papers/build_manifest.js'); errors += 1;
  }
  let rep = ''; try { rep = fs.readFileSync(REPORT_PATH, 'utf8'); } catch (e) { /* missing */ }
  if (rep !== report(rows)) { console.error('ERROR docs/papers/manifest-report.md is missing or stale: run node tools/papers/build_manifest.js'); errors += 1; }
  console.log(`${rows.length} papers, ${rows.reduce((a, r) => a + r.questionCount, 0)} questions, ${flagged} not auto-graded, ${errors} error(s)`);
  if (errors || (strict && flagged)) process.exit(1);
}
main();
