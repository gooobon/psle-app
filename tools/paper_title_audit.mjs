// Audit: does each past-paper file's school (file name, header comment, meta.school / title / id) agree?
// Static (reads source text only). Exit 1 when a disagreement is found. Run: node tools/paper_title_audit.mjs
import fs from "node:fs";
import path from "node:path";
const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "src", "data", "p3");
const KEYS = [
  ["acsj", /acsj|anglo[- ]chinese.{0,12}junior|acs\s*\(?junior/i],
  ["acsp", /acsp|acsprimary|anglo[- ]chinese.{0,12}primary|anglo_chinese_primary/i],
  ["plmgs", /plmgs|paya[ -]?lebar/i],
  ["mgs", /\bmgs\b|mgs_|methodist[ _]girls/i],
  ["aitong", /ai[ _]?tong|\bait_/i],
  ["chij_toapayoh", /chijtp|toa payoh/i],
  ["chij_stnicholas", /chij.{0,3}st[ _.]?nicholas|chij_st_nicholas|chijsng|stnicholas|st nicholas|chijstnicholas|(^|[_/])chij[_.]/i],
  ["catholichigh", /catholic[ _]?high|chsp|gongjiao|公教/i],
  ["henrypark", /henry[ _]?park/i],
  ["mahabodhi", /maha[ _]?bodhi|mahab_|bodhischool|puti/i],
  ["rafflesgirls", /raffles|rgps/i],
  ["nanhua", /nan[ _]?hua/i],
  ["nanyang", /nanyang/i],
  ["taonan", /tao[ _]?nan/i],
  ["redswastika", /red[ _]?swastika/i],
  ["rosyth", /rosyth/i],
  ["rulang", /rulang/i],
  ["scgs", /scgs|singapore chinese girls/i],
  ["sji", /\bsji\b|_sji_|st\.? joseph/i],
  ["sthildas", /st\.?[ _]?hilda|sthilda/i],
  ["peihwa", /pei[ _]?hwa/i],
  ["peichun", /pei[ _]?chun|peiqun/i],
];
const keyOf = (t) => { for (const [k, re] of KEYS) if (re.test(t)) return k; return null; };
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.ts$/.test(f.name) && f.name !== "index.ts" && p.includes(`${path.sep}papers${path.sep}`)) files.push(p); } })(ROOT);
let bad = 0, checked = 0, noKey = [];
for (const f of files.sort()) {
  const txt = fs.readFileSync(f, "utf8");
  const head = txt.split("\n").slice(0, 8).filter((l) => l.startsWith("//") || l.startsWith("/*") || l.startsWith(" *")).join(" ");
  const meta = (txt.match(/\bmeta:\s*\{[\s\S]{0,700}?\n\s{2}\}/) || [""])[0];
  const metaSchool = (meta.match(/\bschool(?:En)?:\s*['"`]([^'"`]+)/) || [])[1] || "";
  const metaTitle = (meta.match(/\b(?:title|id|source):\s*['"`]([^'"`]+)/) || [])[1] || "";
  const rel = path.relative(ROOT, f);
  const sources = { file: keyOf(path.basename(f)), header: keyOf(head.replace(/Genius Project/gi, "")), metaSchool: keyOf(metaSchool), metaTitle: keyOf(metaTitle) };
  const vals = Object.entries(sources).filter(([, v]) => v);
  checked++;
  if (!vals.length) { noKey.push(rel); continue; }
  if (new Set(vals.map(([, v]) => v)).size > 1) { bad++; console.log("MISMATCH", rel, JSON.stringify(sources), "| meta.school:", metaSchool); }
}
console.log(`${checked} paper files checked, ${bad} mismatches, ${noKey.length} with no recognisable school (${noKey.slice(0, 6).join(", ")}${noKey.length > 6 ? ", ..." : ""})`);
process.exit(bad ? 1 : 0);
