// Fails if emoji / pictographic characters or U+FE0F appear in UI source.
// Scanned: src/components, src/app, src/lib (js/jsx/ts/tsx/mjs). Comments are stripped first.
// Allowed plain-text marks: check, cross, bullet, big dot, arrows, copyright, registered.
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['src/components', 'src/app', 'src/lib'];
const EXT = /\.(js|jsx|ts|tsx|mjs)$/;
const ALLOW = new Set([...'✓✗•⬤→←↑↓©®']);
const PICT = /\p{Extended_Pictographic}|️/u;
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
export function findEmoji(text, ext = '.js') {
  const hits = [];
  stripComments(text, ext).split('\n').forEach((l, i) => {
    for (const ch of l) if ((PICT.test(ch)) && !ALLOW.has(ch)) { hits.push([i + 1, l.trim().slice(0, 100)]); break; }
  });
  return hits;
}
function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p); else if (EXT.test(e.name)) yield p;
  }
}
let pass = 0, fail = 0;
const t = (name, ok) => { if (ok) pass++; else { fail++; console.log('FAIL', name); } };
t('detects emoji', findEmoji('const a = "\u{1F600}";').length === 1);
t('detects star', findEmoji('const a = "⭐";').length === 1);
t('detects FE0F', findEmoji('const a = "✏️";').length === 1);
t('allows marks', findEmoji('const a = "✓ ✗ • ⬤ → ©";').length === 0);
t('ignores comments', findEmoji('// \u{1F600}\nconst a = 1;').length === 0);
let hits = 0, n = 0;
for (const d of DIRS) {
  const dir = path.join(root, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of walk(dir)) {
    n++;
    const h = findEmoji(fs.readFileSync(f, 'utf8'), path.extname(f));
    if (h.length) { fail++; hits += h.length; for (const [ln, s] of h) console.log(`${path.relative(root, f)}:${ln}: ${s}`); } else pass++;
  }
}
console.log(`no_emoji_selftest: ${pass} pass / ${fail} fail (${n} files scanned, ${hits} lines with emoji)`);
process.exit(fail ? 1 : 0);
