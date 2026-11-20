// Fails if Hangul (U+AC00-D7AF, U+1100-11FF, U+3130-318F) appears in user-facing code or data.
// Scanned: src/**, public/**, supabase/**, and data JSON used by the app. Code comments (// and /* */)
// in JS/TS/CSS/SQL are stripped before scanning, so developer comments may stay.
// Excluded (not user-facing): docs/, *.md, root one-off Python/JS tooling (fix_*.py, zs01_*.py, ...),
// tools/, tests/, node_modules, .next, .git, public/*-demo.html (checked in a separate gate below).
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
export const HANGUL = /[가-힯ᄀ-ᇿ㄰-㆏]/;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIRS = ['src', 'public', 'supabase'];
const SCAN_ROOT_FILES = /^(seed_.*|wa1_zh_.*|zh_.*|20260622_WA1_complete|comp60_.*|duoyinzi_cursor)\.json$/;
const EXT = /\.(js|jsx|ts|tsx|mjs|cjs|json|sql|html|css)$/;
// Remove // and /* */ comments while respecting string literals.
export function stripComments(src, ext) {
  if (ext === '.json' ) return src;
  let out = '', i = 0, q = null;
  const sqlLike = ext === '.sql';
  while (i < src.length) {
    const c = src[i], n = src[i + 1];
    if (q) {
      out += c;
      if (c === '\\' && q !== "'" || (c === '\\' && !sqlLike)) { out += n ?? ''; i += 2; continue; }
      if (c === q) q = null;
      i++; continue;
    }
    if (!sqlLike && (c === '"' || c === "'" || c === '`')) { q = c; out += c; i++; continue; }
    if (sqlLike && c === "'") { q = c; out += c; i++; continue; }
    if ((c === '/' && n === '/' && !(src[i - 1] === ':')) || (sqlLike && c === '-' && n === '-')) { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*') { i += 2; while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') out += '\n'; i++; } i += 2; continue; }
    out += c; i++;
  }
  return out;
}
export function findHangul(text, ext) {
  const hits = [];
  stripComments(text, ext).split('\n').forEach((l, i) => { if (HANGUL.test(l)) hits.push([i + 1, l.trim().slice(0, 100)]); });
  return hits;
}
function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p); else if (EXT.test(e.name)) yield p;
  }
}
const files = [];
for (const d of SCAN_DIRS) if (fs.existsSync(path.join(root, d))) files.push(...walk(path.join(root, d)));
for (const f of fs.readdirSync(root)) if (SCAN_ROOT_FILES.test(f)) files.push(path.join(root, f));
let pass = 0, fail = 0;
// 1. detector self-checks
const t = (name, ok) => { if (ok) pass++; else { fail++; console.log('FAIL', name); } };
t('detects hangul', findHangul('const a = "persevere는";', '.js').length === 1);
t('ignores line comment', findHangul('// 한국어\nconst a = 1;', '.js').length === 0);
t('ignores block comment', findHangul('/* 한국어 */ const a = 1;', '.ts').length === 0);
t('keeps strings with //', findHangul('const u = "http://x/한";', '.js').length === 1);
t('ignores CJK', findHangul('const a = "你好こんにちは";', '.js').length === 0);
t('detects jamo', findHangul('"ㅋㅋ"', '.js').length === 1);
// 2. repo scan
let hits = 0;
for (const f of files) {
  const rel = path.relative(root, f);
  const h = findHangul(fs.readFileSync(f, 'utf8'), path.extname(f));
  if (h.length) { hits += h.length; fail++; console.log(`FAIL ${rel}: ${h.length} line(s), first L${h[0][0]}: ${h[0][1]}`); } else pass++;
}
console.log(`no_korean_selftest: ${pass} pass / ${fail} fail (${files.length} files scanned, ${hits} Hangul lines)`);
process.exit(fail ? 1 : 0);
