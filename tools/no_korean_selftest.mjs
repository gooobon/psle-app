// Fails when Hangul (U+AC00-D7AF, U+1100-11FF, U+3130-318F) appears in user-facing app files or data.
// Scanned:  src/** (.js .jsx .ts .tsx .mjs .json .css), public/** (text files), supabase/** (.sql), root *.json data files.
// Excluded: code comments (// , /* */, SQL --, HTML <!-- -->), docs/**, *.md, root authoring scripts (*.py, fix_*.js, ...),
//           tools/**, tests/**, node_modules, .next, binary files (png, ico, woff2, pdf).
// Run: node tools/no_korean_selftest.mjs
import fs from "node:fs";
import path from "node:path";
const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힯]/;
const CODE = /\.(js|jsx|ts|tsx|mjs|cjs)$/, TEXT = /\.(json|css|html|txt|svg|webmanifest|sql)$/;
const scanDirs = ["src", "public", "supabase"];
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next" || e.name.startsWith(".git")) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (CODE.test(e.name) || TEXT.test(e.name)) files.push(p);
  }
}
for (const d of scanDirs) if (fs.existsSync(path.join(ROOT, d))) walk(path.join(ROOT, d));
for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) if (e.isFile() && e.name.endsWith(".json")) files.push(path.join(ROOT, e.name));

// Returns the text of `src` with comments blanked out (strings are kept, so Hangul in a string value is still caught).
export function stripComments(src, kind) {
  let out = "", i = 0, q = null, block = false;
  const n = src.length;
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (block) { if (kind === "html" ? src.startsWith("-->", i) : (c === "*" && d === "/")) { block = false; i += kind === "html" ? 3 : 2; } else { if (c === "\n") out += c; i++; } continue; }
    if (q) { out += c; if (c === "\\" && kind !== "sql") { out += d ?? ""; i += 2; continue; } if (c === q || (c === "\n" && q !== "`")) q = null; i++; continue; }
    if (kind === "html") { if (src.startsWith("<!--", i)) { block = true; i += 4; continue; } out += c; i++; continue; }
    if (kind === "sql") { if (c === "-" && d === "-") { while (i < n && src[i] !== "\n") i++; continue; } if (c === "/" && d === "*") { block = true; i += 2; continue; } if (c === "'") q = c; out += c; i++; continue; }
    if (kind === "code") {
      if (c === "/" && d === "/") { while (i < n && src[i] !== "\n") i++; continue; }
      if (c === "/" && d === "*") { block = true; i += 2; continue; }
      if (c === '"' || c === "'" || c === "`") q = c;
    }
    out += c; i++;
  }
  return out;
}
const kindOf = (f) => CODE.test(f) ? "code" : f.endsWith(".sql") ? "sql" : f.endsWith(".html") ? "html" : "text";

export function findHangul(text, kind) {
  const hits = [];
  stripComments(text, kind).split("\n").forEach((l, i) => { if (HANGUL.test(l)) hits.push([i + 1, l.trim().slice(0, 120)]); });
  return hits;
}

// Self-check of the scanner itself.
let pass = 0, fail = 0;
const check = (name, ok) => { if (ok) pass++; else { fail++; console.log("FAIL", name); } };
check("comment ignored", findHangul("// 한국\nconst a = 1;", "code").length === 0);
check("block comment ignored", findHangul("/* 한국\n */ const a = 1;", "code").length === 0);
check("trailing comment ignored", findHangul("const a = 1; // 한국", "code").length === 0);
check("string caught", findHangul("const a = '한국';", "code").length === 1);
check("string with // caught", findHangul("const a = 'http://x'; const b = '한';", "code").length === 1);
check("jamo caught", findHangul("const a = 'ㄱ';", "code").length === 1);
check("template caught", findHangul("const a = `x\n한`;", "code").length === 1);
check("sql comment ignored", findHangul("-- 한\nselect 1;", "sql").length === 0);
check("html comment ignored", findHangul("<!-- 한 -->ok", "html").length === 0);
check("html text caught", findHangul("<p>한</p>", "html").length === 1);
check("Chinese is not Hangul", findHangul("const a = '中文';", "code").length === 0);

let bad = 0;
for (const f of files) {
  const hits = findHangul(fs.readFileSync(f, "utf8"), kindOf(f));
  for (const [ln, t] of hits) { bad++; console.log(`HANGUL ${path.relative(ROOT, f)}:${ln}: ${t}`); }
}
console.log(`no_korean_selftest: scanner ${pass} pass / ${fail} fail; ${files.length} files scanned, ${bad} Hangul lines in user-facing content`);
process.exit(fail || bad ? 1 : 0);
