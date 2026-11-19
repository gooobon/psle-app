/* Shared reader for the hand/OCR-authored past papers under
   src/data/p3/{english,chinese}/papers. READ-ONLY: never writes to those files.
   Files come in ~10 shapes, so this transpiles each .ts file in a sandbox and
   normalises whatever it exports. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const ts = require('typescript');

const ROOT = path.join(__dirname, '..', '..');
const P3 = path.join(ROOT, 'src', 'data', 'p3');
const SUBJECTS = [
  { subject: 'English', dir: path.join(P3, 'english', 'papers') },
  { subject: 'Chinese', dir: path.join(P3, 'chinese', 'papers') },
];
const BUCKETS = ['wa1', 'wa2', 'wa3', 'eoy'];

function walk(dir, acc) {
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith('.ts') && !['index.ts', 'types.ts', 'schema.ts'].includes(name)) acc.push(full);
  }
  return acc;
}

function loadModule(file) {
  const src = fs.readFileSync(file, 'utf8');
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const m = { exports: {} };
  vm.runInNewContext(out, { module: m, exports: m.exports, require: () => ({}) }, { timeout: 10000 });
  return { src, exports: m.exports };
}

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
const str = (v) => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : '');
const num = (v) => (typeof v === 'number' && isFinite(v) ? v : null);
const CONTAINERS = ['questions', 'items', 'sections', 'blanks', 'subQuestions', 'parts'];
const LEAF_HINTS = ['answer', 'answers', 'options', 'stem', 'q', 'question', 'sentence', 'wrongWord', 'prompt'];

function hasAnswer(v) {
  if (v === undefined || v === null) return false;
  if (typeof v === 'string') return v.trim() !== '';
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'object') return Object.keys(v).length > 0;
  return true; // numbers incl. 0
}

/* Walk every export (deduped by identity) and collect question leaves. */
function collectLeaves(value, ctx, out, seen) {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) { value.forEach((v) => collectLeaves(v, ctx, out, seen)); return; }
  const nested = CONTAINERS.filter((k) => Array.isArray(value[k]) && value[k].length && isObj(value[k][0]));
  const topic = str(value.topic) || str(value.type && value.type.length > 2 ? value.type : '') || ctx.topic;
  const sec = str(value.name) || str(value.title) || str(value.setLabel) || ctx.section;
  const own = str(value.id) || str(value.qid);
  const no = str(value.questionNo) || str(value.questionNumber) || str(value.no);
  const id = own || (no ? `${ctx.parentId || 'q'}#${no}` : '');
  const looksLeaf = id && LEAF_HINTS.some((k) => k in value);
  if (looksLeaf && !nested.some((k) => k !== 'blanks' || value.blanks.every((b) => isObj(b) && b.id))) {
    out.push({ node: value, id, topic: topic || ctx.topic, section: ctx.section });
    return;
  }
  if (looksLeaf && nested.length === 1 && nested[0] === 'blanks') {
    out.push({ node: value, id, topic: topic || ctx.topic, section: ctx.section });
    return;
  }
  for (const k of Object.keys(value)) {
    const child = value[k];
    if (child && typeof child === 'object') {
      collectLeaves(child, { parentId: own || ctx.parentId, topic: topic || ctx.topic, section: CONTAINERS.includes(k) || k === 'sections' ? sec || ctx.section : ctx.section }, out, seen);
    }
  }
}

function leafAnswered(node) {
  if (['answer', 'answers', 'correctAnswer', 'modelAnswer', 'sampleAnswer'].some((k) => hasAnswer(node[k]))) return true;
  if (Array.isArray(node.blanks) && node.blanks.length && node.blanks.every((b) => isObj(b) && hasAnswer(b.answer))) return true;
  return false;
}

function stemOf(node) {
  return str(node.stem) || str(node.q) || str(node.question) || str(node.sentence) || str(node.prompt) || str(node.text);
}

/* Meta can live on the default export, a `meta` / `paperMeta*` export, or a
   top-level paper object. Take the first object that declares school/year/marks. */
function findMeta(exportsObj) {
  const cands = [];
  const seen = new Set();
  const push = (o) => { if (isObj(o) && !seen.has(o)) { seen.add(o); cands.push(o); } };
  const d = exportsObj.default;
  if (isObj(d)) { if (isObj(d.meta)) push(d.meta); push(d); }
  for (const [k, v] of Object.entries(exportsObj)) {
    if (isObj(v) && isObj(v.meta)) push(v.meta);
    if (/meta/i.test(k)) push(v);
  }
  for (const v of Object.values(exportsObj)) push(v);
  return cands.find((o) => 'school' in o || 'year' in o || 'totalMarks' in o) || {};
}

function parseMinutes(meta) {
  const n = num(meta.durationMins) ?? num(meta.timeMinutes) ?? num(meta.minutes);
  if (n !== null) return n;
  const d = meta.duration;
  if (typeof d === 'number') return d;
  if (typeof d === 'string') {
    let total = 0, hit = false;
    const h = d.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hour)/i); if (h) { total += parseFloat(h[1]) * 60; hit = true; }
    const m = d.match(/(\d+)\s*(?:m|min)/i); if (m) { total += parseInt(m[1], 10); hit = true; }
    if (!hit) { const bare = d.match(/^\s*(\d+)\s*$/); if (bare) return parseInt(bare[1], 10); }
    return hit ? total : null;
  }
  return null;
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9一-鿿]+/g, ' ').trim();
const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);

function headerYears(src) {
  const head = src.split('\n').slice(0, 25).filter((l) => /^\s*(\/\/|\/\*|\*)/.test(l)).join('\n');
  return [...new Set((head.match(/\b20[12]\d\b/g) || []).map(Number))];
}

function schoolFromHeader(src) {
  const head = src.split('\n').slice(0, 25).filter((l) => /^\s*(\/\/|\/\*|\*)/.test(l));
  for (const l of head) {
    const m = l.match(/([A-Z][A-Za-z'’.\- ]{3,60}(?:School|Institution|Primary|Secondary))/);
    if (m) return m[1].trim();
  }
  return '';
}

function readPaper(file, subject) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const bucket = path.basename(path.dirname(file)).toLowerCase();
  const filename = path.basename(file);
  const { src, exports: ex } = loadModule(file);
  const meta = findMeta(ex);
  const leaves = [];
  const seen = new Set();
  for (const v of Object.values(ex)) {
    collectLeaves(v, { parentId: '', topic: '', section: '' }, leaves, seen);
  }
  const d = ex.default;
  const id = str(meta.id) || str(isObj(d) && d.id) || str(isObj(d) && d.meta && d.meta.id) || '';
  const sectionsDecl = []
  const addSec = (arr) => Array.isArray(arr) && arr.forEach((s) => { if (isObj(s)) sectionsDecl.push({ name: str(s.name) || str(s.title) || str(s.id) || str(s.topic), marks: num(s.marks) ?? num(s.totalMarks) }); else if (typeof s === 'string') sectionsDecl.push({ name: s, marks: null }); });
  addSec(meta.sections); if (isObj(d)) addSec(d.sections);
  const topics = {};
  for (const l of leaves) { const t = l.topic || l.section || '(none)'; topics[t] = (topics[t] || 0) + 1; }
  const marksSum = leaves.reduce((a, l) => a + (num(l.node.marks) ?? 0), 0);
  const fnYear = (filename.match(/(20[12]\d)/g) || []).map(Number).pop() ?? null;
  const rawYear = meta.year;
  const declaredYear = typeof rawYear === 'number' ? rawYear : /^\d{4}$/.test(str(rawYear)) ? Number(rawYear) : null;
  const questions = leaves.map((l, i) => {
    const stem = stemOf(l.node);
    return {
      id: l.id, topic: l.topic || '', marks: num(l.node.marks), answered: leafAnswered(l.node),
      stemHash: stem ? hash(norm(stem)) : null, order: i,
    };
  });
  return {
    subject, file: rel, filename, bucket: BUCKETS.includes(bucket) ? bucket : '', meta, id, src, questions,
    topics, marksSum, fnYear, declaredYear, sectionsDecl, minutes: parseMinutes(meta),
    headerYears: headerYears(src), headerSchool: schoolFromHeader(src), rawYear,
  };
}

function readAll() {
  const papers = [];
  for (const { subject, dir } of SUBJECTS) {
    for (const f of walk(dir, [])) papers.push(readPaper(f, subject));
  }
  return papers;
}

module.exports = { ROOT, readAll, readPaperForTest: (f) => readPaper(f, "Test"), str, num, norm };
