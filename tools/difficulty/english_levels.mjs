// Build-time, read-only: assigns every runnable English practice item a content level (foundation | core | stretch)
// from signals in the repo (section/format, concept, stem and passage length, word length, option count and closeness,
// position in the set). Writes ONLY src/data/p3/english/difficulty.json (id -> level). No network, no database.
// Run: node tools/difficulty/english_levels.mjs        (add --check to verify the committed file is up to date)
import { register } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
register("../exam_loader.mjs", import.meta.url);
const { WA1_PRACTICE_SETS } = await import("../../src/data/p3/english/wa1_practice.ts");
const { indexSets } = await import("../../src/lib/reviewRounds.js");
const OUT = path.join(ROOT, "src", "data", "p3", "english", "difficulty.json");
export const TARGET = { foundation: 0.30, core: 0.45, stretch: 0.25 };

const words = (s) => String(s || "").toLowerCase().match(/[a-z']+/g) || [];
const clamp = (x) => Math.max(0, Math.min(1, x));
const scale = (x, lo, hi) => clamp((x - lo) / (hi - lo));
const longShare = (ws) => (ws.length ? ws.filter((w) => w.length >= 8).length / ws.length : 0);
const avgLen = (ws) => (ws.length ? ws.reduce((a, w) => a + w.length, 0) / ws.length : 0);

// 0 = very different options, 1 = near-identical options (harder to tell apart).
function closeness(opts) {
  const o = (opts || []).map((x) => String(typeof x === "string" ? x : (x && x.text) || x).toLowerCase());
  if (o.length < 2) return 0;
  let tot = 0, n = 0;
  for (let i = 0; i < o.length; i++) for (let j = i + 1; j < o.length; j++) {
    const a = o[i], b = o[j]; let p = 0;
    while (p < a.length && p < b.length && a[p] === b[p]) p++;
    let s = 0;
    while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
    tot += (p + s) / Math.max(a.length, b.length, 1); n++;
  }
  return clamp(tot / n);
}
// Concept weight: reasoning and figurative skills are harder than recall of a form.
function conceptWeight(ids) {
  const s = (ids || []).join(" ");
  if (/inference|main_idea|purpose|figurative|idiom|phrasal|conditional|reported|passive|perfect|synthesis|sequence/.test(s)) return 0.75;
  if (/tense|agreement|subject_verb|connector|conjunction|relative|comparative|modal/.test(s)) return 0.5;
  if (/detail|spelling|article|preposition|pronoun|plural|noun|adjective|adverb/.test(s)) return 0.3;
  return 0.45;
}
const FORMAT_W = { mcq: 0.25, fill_word: 0.4, fill_blank: 0.45, ab_circle: 0.3, true_false: 0.5, sequence: 0.6, tf_reason: 0.7, open_sentence: 0.9 };
const SECTION_BASE = { VocabMCQ: 0.4, GrammarMCQ: 0.35, GrammarCloze: 0.4, VocabCloze: 0.5, Editing: 0.55, Comprehension: 0.6 };

// Raw signals -> { section, score in [0,1] } for one result id.
function scoreOne(id, hit) {
  const sec = hit.sectionType;
  const c = hit.container || {};
  if (hit.leaf) {
    const q = hit.leaf, sw = words(q.sentence);
    const opts = q.options || [];
    const pos = Number(String(q.id).match(/(\d+)$/)?.[1] || 1);
    return { sec, score:
      0.22 * scale(sw.length, 8, 28) + 0.18 * scale(avgLen(sw), 3.5, 5.5) + 0.12 * longShare(sw) * 3 +
      0.2 * closeness(opts) + 0.08 * scale(opts.length, 3, 5) + 0.2 * conceptWeight(q.conceptIds) + 0.0 * pos };
  }
  if (Array.isArray(c.blanks)) {
    const num = Number(id.slice(String(hit.containerId).length + 1));
    const b = c.blanks.find((x) => x.num === num) || {};
    const pw = words(c.passage), bank = c.wordBank || [];
    const total = c.blanks.length || 1;
    return { sec, score:
      0.2 * scale(pw.length, 60, 160) + 0.2 * scale(String(b.answer || "").length, 2, 9) + 0.15 * scale(bank.length, 6, 12) +
      0.15 * (num - 1) / Math.max(total - 1, 1) + 0.1 * longShare(pw) * 3 + 0.2 * conceptWeight(b.conceptIds) };
  }
  if (Array.isArray(c.items)) { // Editing
    const it = c.items.find((x) => x.id === id) || {};
    const sw = words(it.sentence), total = c.items.length || 1;
    const idx = Math.max(0, c.items.findIndex((x) => x.id === id));
    return { sec, score:
      0.25 * scale(sw.length, 8, 24) + 0.2 * scale(avgLen(sw), 3.5, 5.5) + 0.15 * scale(String(it.answer || "").length, 2, 9) +
      0.15 * idx / Math.max(total - 1, 1) + 0.25 * conceptWeight(it.conceptIds) };
  }
  if (Array.isArray(c.questions)) { // Comprehension
    const qs = c.questions, qi = Math.max(0, qs.findIndex((x) => x && x.id === id)), q = qs[qi] || {};
    const pw = words(c.passage), st = words(q.stem);
    return { sec, score:
      0.2 * scale(pw.length, 120, 260) + 0.15 * scale(st.length, 6, 28) + 0.25 * (FORMAT_W[q.format] ?? 0.5) +
      0.1 * scale(Number(q.marks) || 1, 1, 3) + 0.15 * qi / Math.max(qs.length - 1, 1) + 0.15 * conceptWeight(q.conceptIds) };
  }
  return { sec, score: 0.5 };
}
const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; };

export function buildLevels(sets) {
  const byId = indexSets(sets).byId;
  const rows = Object.keys(byId).map((id) => ({ id, ...scoreOne(id, byId[id]) }));
  // Within-section percentile (so every section spreads) blended with the section base (so Comprehension skews harder).
  const bySec = {};
  rows.forEach((r) => (bySec[r.sec] = bySec[r.sec] || []).push(r));
  Object.values(bySec).forEach((g) => {
    g.sort((a, b) => a.score - b.score || hash(a.id) - hash(b.id));
    g.forEach((r, i) => { r.blend = 0.7 * (i / Math.max(g.length - 1, 1)) + 0.3 * (SECTION_BASE[r.sec] ?? 0.45) + hash(r.id) * 1e-6; });
  });
  rows.sort((a, b) => a.blend - b.blend || (a.id < b.id ? -1 : 1));
  const n = rows.length, cutF = Math.round(n * TARGET.foundation), cutC = cutF + Math.round(n * TARGET.core);
  const out = {};
  rows.forEach((r, i) => { out[r.id] = i < cutF ? "foundation" : i < cutC ? "core" : "stretch"; });
  return Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k]]));
}

export function distribution(levels) {
  const d = { foundation: 0, core: 0, stretch: 0 };
  Object.values(levels).forEach((l) => d[l]++);
  return d;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const levels = buildLevels(WA1_PRACTICE_SETS);
  const text = JSON.stringify(levels, null, 0).replace(/,"/g, ',\n"').replace(/^\{/, "{\n").replace(/\}$/, "\n}") + "\n";
  if (process.argv.includes("--check")) {
    const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
    if (cur !== text) { console.error("difficulty.json is out of date: run node tools/difficulty/english_levels.mjs"); process.exit(1); }
  } else fs.writeFileSync(OUT, text);
  const d = distribution(levels), n = Object.keys(levels).length;
  console.log(`items: ${n}`);
  for (const k of Object.keys(d)) console.log(`${k}: ${d[k]} (${(d[k] / n * 100).toFixed(1)}%)`);
}
