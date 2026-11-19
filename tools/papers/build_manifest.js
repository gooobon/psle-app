/* Phase 0 of docs/design/mock-exams-v1.md: past-paper manifest + defect report.
   Reads (never writes) src/data/p3/{english,chinese}/papers/**.ts and writes
     src/data/papers/manifest.json   (GENERATED, DO NOT EDIT)
     docs/papers/manifest-report.md  (GENERATED, DO NOT EDIT)
   Regenerate: node tools/papers/build_manifest.js
   Check only: node tools/papers/validate_manifest.js */
const fs = require('fs');
const path = require('path');
const { ROOT, readAll, str } = require('./lib');

const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'papers', 'manifest.json');
const REPORT_PATH = path.join(ROOT, 'docs', 'papers', 'manifest-report.md');

function typeOf(text) {
  const t = str(text);
  let m = t.match(/\b(?:wa|weighted assessment)\s*([123])\b/i);
  if (m) return 'wa' + m[1];
  if (/\b(eoy|end[- ]of[- ]year|sa2)\b/i.test(t)) return 'eoy';
  return '';
}

function schoolKey(name) {
  return str(name).toLowerCase().replace(/\([^)]*\)/g, (g) => (/junior/.test(g) ? ' junior ' : ' '))
    .replace(/[^a-z ]+/g, ' ').replace(/\b(school|primary|the|public|presbyterian|girls|girl|s)\b/g, ' ')
    .replace(/\bst\b/g, 'saint').replace(/\s+/g, ' ').trim();
}

function declaredSchool(p) {
  if (str(p.meta.school)) return { value: str(p.meta.school), from: 'meta.school' };
  const src = str(p.meta.source);
  if (src) {
    const first = src.split(/\s[·|]\s/)[0].replace(/\s*\([^)]*[一-鿿][^)]*\)/g, '').trim();
    if (first) return { value: first, from: 'meta.source (free text)' };
  }
  if (p.headerSchool) return { value: p.headerSchool, from: 'header comment only' };
  return { value: '', from: '' };
}

function declaredYear(p) {
  if (p.declaredYear) return { value: p.declaredYear, from: 'meta.year' };
  const m = str(p.meta.source).match(/\b(20[12]\d)\b/);
  if (m) return { value: Number(m[1]), from: 'meta.source (free text)' };
  if (p.headerYears.length === 1) return { value: p.headerYears[0], from: 'header comment only' };
  return { value: null, from: '' };
}

function declaredType(p) {
  const raw = str(p.meta.examType) || str(p.meta.exam) || str(p.meta.assessment) || str(p.meta.term) || str(p.meta.paperType);
  return { raw, normalised: typeOf(raw) };
}

function sectionsOf(p) {
  const order = [];
  const by = new Map();
  p.questions.forEach((q) => {
    const k = q.section || q.topic || '(none)';
    if (!by.has(k)) { by.set(k, { name: k, questions: 0, marks: 0 }); order.push(k); }
    const s = by.get(k); s.questions += 1; s.marks += q.marks || 0;
  });
  return order.map((k) => by.get(k));
}

function answerKeyNote(src) {
  const head = src.split('\n').slice(0, 30).filter((l) => /^\s*(\/\/|\/\*|\*)/.test(l)).join('\n');
  if (/NO printed answer key|no answer key|answers? (?:are )?(?:derived|unverified|inferred)|\(derived\)/i.test(head)) return 'derived';
  if (/printed ANSWER KEY|answer key/i.test(head)) return 'printed';
  return 'unknown';
}

/* Position of each English paper file in the runtime pool (flattenEnglishPool() = wa1, wa2, wa3, eoy in
   index.ts order). The exam engine joins manifest rows to runtime papers with this. Read from index.ts only. */
function poolIndexByFile() {
  const dir = path.join(ROOT, 'src', 'data', 'p3', 'english', 'papers');
  const src = fs.readFileSync(path.join(dir, 'index.ts'), 'utf8');
  const ident = new Map(); // local identifier -> file (repo-relative)
  const rel = (spec) => path.relative(ROOT, path.join(dir, spec + '.ts')).split(path.sep).join('/');
  for (const m of src.matchAll(/^import\s+(.+?)\s+from\s+'(\.\/[^']+)';/gm)) {
    const clause = m[1], file = rel(m[2]);
    const def = clause.match(/^([A-Za-z0-9_$]+)\s*(?:,|$)/);
    if (def) ident.set(def[1], file);
    for (const n of clause.matchAll(/([A-Za-z0-9_$]+)(?:\s+as\s+([A-Za-z0-9_$]+))?\s*(?=[,}])/g)) {
      if (clause.indexOf('{') !== -1 && n.index > clause.indexOf('{')) ident.set(n[2] || n[1], file);
    }
  }
  const out = new Map();
  let idx = 0;
  for (const bucket of ['p3EnglishWA1Papers', 'p3EnglishWA2Papers', 'p3EnglishWA3Papers', 'p3EnglishEOYPapers']) {
    const body = (src.match(new RegExp('export const ' + bucket + '[^=]*=\\s*\\[([\\s\\S]*?)\\n\\];')) || [])[1] || '';
    for (const call of body.split('normalizePaper(').slice(1)) {
      const ids = (call.split('),')[0].match(/[A-Za-z_][A-Za-z0-9_$]*/g) || []).filter((x) => ident.has(x));
      if (ids.length) out.set(ident.get(ids[0]), idx);
      idx += 1;
    }
  }
  return out;
}

function build() {
  const papers = readAll();
  const poolIdx = poolIndexByFile();
  const rows = papers.map((p) => {
    const school = declaredSchool(p);
    const year = declaredYear(p);
    const type = declaredType(p);
    const unanswered = p.questions.filter((q) => !q.answered).map((q) => q.id);
    const note = answerKeyNote(p.src);
    const declaredMarks = typeof p.meta.totalMarks === 'number' ? p.meta.totalMarks : null;
    return {
      id: p.id || path.basename(p.filename, '.ts'),
      declaredId: p.id || null,
      subject: p.subject,
      file: p.file,
      poolIndex: p.subject === 'English' && poolIdx.has(p.file) ? poolIdx.get(p.file) : null,
      bucket: p.bucket,
      school: school.value || null,
      schoolFrom: school.from || null,
      year: year.value,
      yearFrom: year.from || null,
      filenameYear: p.fnYear,
      headerYears: p.headerYears,
      type: type.raw || null,
      typeNormalised: type.normalised || null,
      marks: declaredMarks,
      questionMarksSum: p.marksSum || null,
      minutes: p.minutes,
      sections: sectionsOf(p),
      questionCount: p.questions.length,
      hasAnswerKey: p.questions.length > 0 && unanswered.length === 0,
      answerKeyNote: note,
      notAutoGraded: unanswered,
      _stems: p.questions.map((q) => q.stemHash).filter(Boolean),
      _ids: p.questions.map((q) => q.id),
    };
  });
  rows.sort((a, b) => a.subject.localeCompare(b.subject) || a.bucket.localeCompare(b.bucket) || a.file.localeCompare(b.file));

  // Suspected duplicates (suspicion only; nothing is merged or removed).
  const dupes = new Map(rows.map((r) => [r.file, []]));
  const add = (a, b, why, tier = 'strong') => { dupes.get(a.file).push({ file: b.file, why, tier }); dupes.get(b.file).push({ file: a.file, why, tier }); };
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      const a = rows[i], b = rows[j];
      if (a.subject !== b.subject) continue;
      if (a.declaredId && a.declaredId === b.declaredId) add(a, b, 'same paper id');
      if (/ \(\d\)\.ts$/.test(a.file) || / \(\d\)\.ts$/.test(b.file)) {
        const base = (f) => f.replace(/ \(\d\)(?=\.ts$)/, '');
        if (base(a.file) === base(b.file)) add(a, b, 'filename is a "(n)" copy');
      }
      const sa = new Set(a._stems), sb = new Set(b._stems);
      if (Math.min(sa.size, sb.size) >= 5) {
        let inter = 0; sa.forEach((h) => { if (sb.has(h)) inter += 1; });
        const frac = inter / Math.min(sa.size, sb.size);
        if (frac >= 0.5) add(a, b, `${Math.round(frac * 100)}% of question stems identical`, frac >= 0.8 ? 'strong' : 'weak');
      }
      const ia = new Set(a._ids), ib = new Set(b._ids);
      if (Math.min(ia.size, ib.size) >= 5) {
        let inter = 0; ia.forEach((h) => { if (ib.has(h)) inter += 1; });
        const frac = inter / Math.min(ia.size, ib.size);
        if (frac >= 0.5) add(a, b, `${Math.round(frac * 100)}% of question ids shared`, frac >= 0.8 ? 'strong' : 'weak');
      }
      if (a.school && b.school && a.year && schoolKey(a.school) === schoolKey(b.school) && a.year === b.year
          && (a.typeNormalised || a.bucket) === (b.typeNormalised || b.bucket) && a.marks && a.marks === b.marks) {
        add(a, b, 'same school + year + type + marks', 'weak');
      }
    }
  }
  rows.forEach((r) => {
    const merged = new Map();
    dupes.get(r.file).forEach((d) => {
      const m = merged.get(d.file) || { why: [], tier: 'weak' };
      m.why.push(d.why); if (d.tier === 'strong') m.tier = 'strong';
      merged.set(d.file, m);
    });
    r.suspectedDuplicates = [...merged.entries()].map(([file, m]) => ({ file, tier: m.tier, why: [...new Set(m.why)] }));
    delete r._stems; delete r._ids;
  });
  return rows;
}

function mdTable(head, body) {
  return [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...body.map((r) => `| ${r.join(' | ')} |`)].join('\n');
}
const base = (f) => f.split('/').pop();

function report(rows) {
  const L = [];
  const W = (s = '') => L.push(s);
  const total = rows.length;
  W('<!-- GENERATED by tools/papers/build_manifest.js — DO NOT EDIT. Regenerate with `node tools/papers/build_manifest.js`. -->');
  W('# Past-paper manifest — defect report (phase 0)');
  W();
  W('Source: `src/data/p3/{english,chinese}/papers/**` (read-only) → `src/data/papers/manifest.json`. Nothing in the paper files was changed. Each item below is a **suspicion for the owner to confirm**, not a fix.');
  W();
  const en = rows.filter((r) => r.subject === 'English').length;
  W(`${total} paper files (${en} English, ${total - en} Chinese). ` +
    `${rows.filter((r) => r.hasAnswerKey).length} have an answer on every question; ` +
    `${rows.reduce((a, r) => a + r.notAutoGraded.length, 0)} questions have no answer (“not auto-graded”). ` +
    `${rows.filter((r) => r.minutes === null).length} have no minutes.`);
  W();

  // 1. year mismatches
  const declHdr = rows.filter((r) => r.year && r.headerYears.length && !r.headerYears.includes(r.year));
  const declFn = rows.filter((r) => r.year && r.filenameYear && r.year !== r.filenameYear);
  W('## 1. Year mismatches');
  W();
  W(`**1a. Declared year ≠ year printed in the file’s header comment (${declHdr.length}) — most likely real errors:**`);
  W();
  W(declHdr.length ? mdTable(['File', 'Declared', 'Header says', 'Filename'], declHdr.map((r) => [`\`${base(r.file)}\``, `${r.year}`, r.headerYears.join(', '), `${r.filenameYear ?? '—'}`])) : '_None._');
  W();
  const fnOnly = declFn.filter((r) => !declHdr.includes(r));
  W(`**1b. Declared year ≠ year in the filename, header agrees with declared (${fnOnly.length}):** filename is probably a batch tag; the UI must use the declared year. Confirm and no action needed.`);
  W();
  W(fnOnly.length ? fnOnly.map((r) => `\`${base(r.file)}\` (${r.year})`).join(', ') : '_None._');
  W();

  // 2. duplicates
  W('## 2. Suspected duplicates');
  W();
  const seenPair = new Set();
  const dRows = [];
  let weak = 0;
  rows.forEach((r) => r.suspectedDuplicates.forEach((d) => {
    if (d.tier !== 'strong') { weak += 1; return; }
    const key = [r.file, d.file].sort().join('|');
    if (seenPair.has(key)) return; seenPair.add(key);
    dRows.push([`\`${base(r.file)}\``, `\`${base(d.file)}\``, d.why.join('; ')]);
  }));
  W(`${dRows.length} likely pairs (same id, a “(n)” copy, or ≥ 80% of questions identical). Confirm which to keep; none have been merged or deleted. A further ${weak / 2} weaker pairs (50–79% overlap, or only same school/year/marks) are listed under \`suspectedDuplicates\` with \`tier: "weak"\` in the manifest; they are mostly sibling papers (Paper 1 vs 2) or WA papers reusing a practice paper’s questions.\n`);
  if (dRows.length) W(mdTable(['A', 'B', 'Why'], dRows));
  W();

  // 3. missing metadata
  W('## 3. Missing or weak metadata');
  W();
  const miss = (label, pred) => {
    const f = rows.filter(pred);
    W(`- **${label}: ${f.length}**${f.length && f.length <= 8 ? ' — ' + f.map((r) => `\`${base(r.file)}\``).join(', ') : ''}`);
  };
  miss('no declared year (no `year`, no year in `source`, no single year in the header)', (r) => !r.year);
  miss('school only in free-text `source` or a header comment, not a `school` field', (r) => r.schoolFrom !== 'meta.school' && r.school);
  miss('year only in free-text `source` or a header comment, not a `year` field', (r) => r.yearFrom !== 'meta.year' && r.year);
  miss('no school at all', (r) => !r.school);
  miss('no declared exam type', (r) => !r.type);
  miss('declared type disagrees with folder (wa1/wa2/wa3/eoy)', (r) => r.typeNormalised && r.bucket && r.typeNormalised !== r.bucket);
  miss('no minutes', (r) => r.minutes === null);
  miss('no `totalMarks`', (r) => r.marks === null);
  miss('`totalMarks` ≠ sum of question marks (marks may be missing on questions)', (r) => r.marks !== null && r.questionMarksSum !== null && r.marks !== r.questionMarksSum);
  miss('file header says answers are derived, not from a printed key', (r) => r.answerKeyNote === 'derived');
  W();
  const noMin = rows.filter((r) => r.minutes === null);
  W(`Minutes missing by group: ${['English', 'Chinese'].map((s) => `${s} ${noMin.filter((r) => r.subject === s).length}/${rows.filter((r) => r.subject === s).length}`).join(', ')}. Phase 1 needs an owner rule for these (design decision 3).`);
  W();

  W('## 4. Questions with no answer (“not auto-graded”)');
  W();
  const na = rows.filter((r) => r.notAutoGraded.length);
  W(na.length ? mdTable(['File', 'Count', 'Ids'], na.map((r) => [`\`${base(r.file)}\``, `${r.notAutoGraded.length}`, r.notAutoGraded.slice(0, 5).join(', ') + (r.notAutoGraded.length > 5 ? ', …' : '')])) : '_None found: every question parsed from every file has a non-empty answer value. This checks that an answer exists, not that it is correct._');
  W();

  W('## Owner checklist');
  W();
  W(`- [ ] 1a: confirm the correct year for ${declHdr.length} file(s)`);
  W(`- [ ] 2: pick the file to keep for ${dRows.length} suspected duplicate pair(s)`);
  W('- [ ] 3: decide the minutes rule for papers without a time');
  W('- [ ] 3: confirm papers whose answers are “derived” are acceptable for auto-grading');
  return L.join('\n') + '\n';
}

function main() {
  const rows = build();
  const manifest = {
    _generated: 'GENERATED by tools/papers/build_manifest.js — DO NOT EDIT. Regenerate: node tools/papers/build_manifest.js',
    count: rows.length,
    papers: rows,
  };
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  fs.writeFileSync(REPORT_PATH, report(rows));
  console.log(`wrote ${path.relative(ROOT, MANIFEST_PATH)} (${rows.length} papers) and ${path.relative(ROOT, REPORT_PATH)}`);
}

if (require.main === module) main();
module.exports = { build, report, MANIFEST_PATH, REPORT_PATH };
