#!/usr/bin/env node
/* READ-ONLY audit of the Chinese past papers for mock-exam readiness (issue #134).
   Run: node tools/papers/chinese_readiness.js [--json]
   Reads src/data/p3/chinese/papers/**; never writes. A paper is "complete" when it declares a total
   (header "(N分)"), every question has an answer, and the marks printed on its questions add up to the declared total. */
const fs = require('fs'), path = require('path'), vm = require('vm'), ts = require('typescript');
const ROOT = path.join(__dirname, '..', '..');
const DIR = path.join(ROOT, 'src', 'data', 'p3', 'chinese', 'papers');
const manifest = require('../../src/data/papers/manifest.json');

function walk(d, a = []) { for (const n of fs.readdirSync(d).sort()) { const f = path.join(d, n); fs.statSync(f).isDirectory() ? walk(f, a) : /\.ts$/.test(n) && !/^(index|types|schema)\.ts$/.test(n) && a.push(f); } return a; }
function load(f) {
  const out = ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: 1, target: 7 } }).outputText;
  const m = { exports: {} }; vm.runInNewContext(out, { module: m, exports: m.exports, require: () => ({}) }, { timeout: 10000 }); return m.exports;
}
const has = (v) => v !== undefined && v !== null && (typeof v !== 'string' || v.trim() !== '') && (!Array.isArray(v) || v.length > 0);
const printedMarks = (q) => { const m = /[（(]\s*(\d{1,2})\s*分\s*[）)]/.exec(String(q.q || q.question || q.stem || '')); return m ? +m[1] : null; };

function leaves(v, ctx, out, seen) {
  if (!v || typeof v !== 'object' || seen.has(v)) return; seen.add(v);
  if (Array.isArray(v)) { v.forEach((x) => leaves(x, ctx, out, seen)); return; }
  const topic = typeof v.topic === 'string' ? v.topic : ctx.topic;
  if (Array.isArray(v.questions) && v.questions.length && typeof v.questions[0] === 'object') { v.questions.forEach((q) => leaves(q, { topic, set: v }, out, seen)); return; }
  if (Array.isArray(v.items) && v.items.length && typeof v.items[0] === 'object' && !v.answer) { v.items.forEach((q) => leaves(q, { topic, set: v }, out, seen)); return; }
  if (typeof v.id === 'string' && ('answer' in v || 'q' in v || 'options' in v || 'sentences' in v || 'tiles' in v)) { out.push({ q: v, topic, set: ctx.set }); return; }
  Object.keys(v).forEach((k) => typeof v[k] === 'object' && leaves(v[k], ctx, out, seen));
}
function kindOf(l) {
  const q = l.q, opts = q.options || (l.set && l.set.wordBank) || [];
  if (q.tiles || q.targetSentence || l.topic === 'JuZi') return 'rearrange';
  if (l.topic === 'ZuJu' || q.sentences) return 'order_sentences';
  if (l.topic === 'PeiDui' || (l.set && l.set.wordBank && !q.options)) return 'matching';
  if (l.topic === 'YueReadOpen' || q.type === 'OpenEnded') return 'open_ended';
  if (Array.isArray(q.options) && q.options.length >= 2) return 'mcq';
  return 'other';
}

const rows = [];
for (const f of walk(DIR)) {
  let ex; try { ex = load(f); } catch (e) { rows.push({ file: path.relative(ROOT, f), error: String(e.message).slice(0, 80) }); continue; }
  const rel = path.relative(ROOT, f);
  const man = manifest.papers.find((p) => p.subject === 'Chinese' && p.file === rel) || {};
  const out = []; leaves(ex, { topic: '' }, out, new Set());
  const kinds = {}; let missingAns = 0, printed = 0, printedSum = 0, noPrint = 0;
  for (const l of out) {
    const k = kindOf(l); kinds[k] = (kinds[k] || 0) + 1;
    const a = k === 'rearrange' ? (l.q.targetSentence || l.q.answer) : k === 'order_sentences' ? (l.q.correctOrder || l.q.answer) : l.q.answer;
    if (!has(a) && !(l.set && has(l.set.correctOrder))) missingAns++;
    const pm = printedMarks(l.q); if (pm) { printed++; printedSum += pm; } else noPrint++;
  }
  const declared = man.marks == null ? null : man.marks;
  const obj = (kinds.mcq || 0);
  rows.push({ id: man.id || path.basename(f, '.ts'), file: rel, bucket: man.bucket, declared, questions: out.length, kinds, missingAnswers: missingAns,
    questionsWithPrintedMarks: printed, printedMarksSum: printedSum, questionsWithoutPrintedMarks: noPrint,
    complete: declared != null && missingAns === 0 && noPrint === 0 && printedSum === declared, mcqOnlyAutoGradable: obj });
}
if (process.argv.includes('--json')) console.log(JSON.stringify(rows, null, 1));
else for (const r of rows) console.log([r.id, r.bucket, 'declared=' + r.declared, 'q=' + r.questions, JSON.stringify(r.kinds), 'noAns=' + r.missingAnswers, 'printed=' + r.printedMarksSum + '/' + r.questionsWithPrintedMarks, 'unprinted=' + r.questionsWithoutPrintedMarks, r.complete ? 'COMPLETE' : 'incomplete'].join(' | '));
