// Read-only dump of the items the PR #57 browser run will sit. No network, no writes.
// Run: node tools/e2e/pr57-targets.mjs
import { register } from "node:module";
import fs from "node:fs";
register("../exam_loader.mjs", import.meta.url);
const B = await import("../../src/lib/p3PaperBridge.js");
const S = await import("../../src/lib/examServer.js");
const E = await import("../../src/lib/examEngine.js");
const D = await import("../../src/lib/dataEngine.js");
const L = await import("../../src/lib/learningGrade.js");

const punct = (s) => /^[^A-Za-z0-9]+$/.test(String(s || "").trim()) && String(s || "").trim() !== "";
const snippet = (s, n = 140) => String(s || "").replace(/\s+/g, " ").slice(0, n);

const pool = B.flattenEnglishPool();
const offered = JSON.parse(fs.readFileSync(new URL("../../src/data/papers/manifest.json", import.meta.url), "utf8")).papers.filter(E.isFullPaper);

function scanPaper(paper, row) {
  const plan = B.englishPaperExamPlan(paper);
  const raw = new Map((paper.questions || []).filter((q) => q && q.id).map((q) => [q.id, q]));
  const out = { id: row && row.id, label: row && E.paperLabel(row), minutes: row && E.minutesAllowed(row), mapMcq: [], cloze: [], editing: [], punct: [], open: [], noPassage: [], fill: [] };
  for (const sec of plan) {
    if (sec.type.endsWith("MCQ")) {
      for (const it of sec.items) {
        const r = raw.get(it.id);
        if (r && r.options && typeof r.options === "object" && !Array.isArray(r.options) && (it.options || []).length >= 2) {
          out.mapMcq.push({ id: it.id, section: sec.type, sentence: snippet(it.sentence), options: it.options, answer: it.answer, keyText: it.options[it.answer] });
        }
      }
    } else if (sec.type.endsWith("Cloze")) {
      for (const s of sec.items) {
        const blanks = (s.blanks || []).filter((b) => b && String(b.answer || "").trim());
        if (!blanks.length) continue;
        out.cloze.push({
          section: sec.type, setId: s.id, label: s.setLabel, passage: snippet(s.passage, 220),
          wordBank: Array.isArray(s.wordBank) ? s.wordBank.slice(0, 12) : s.wordBank,
          blanks: blanks.slice(0, 6).map((b) => ({ num: b.num, answer: b.answer, choices: b.choices || null })),
          blankCount: blanks.length,
        });
      }
    } else if (sec.type === "Editing") {
      for (const s of sec.items) for (const q of s.items || []) {
        const rowE = { id: q.id, setId: s.id, sentence: snippet(q.sentence, 180), wrongWord: q.wrongWord || "", answer: q.answer, options: q.options || [] };
        if (punct(q.answer)) out.punct.push(rowE);
        else if (String(q.answer || "").trim()) out.editing.push(rowE);
      }
    } else if (sec.type === "Comprehension") {
      for (const s of sec.items) {
        const qs = s.questions || [];
        const opens = qs.filter((q) => L.getFormat(q) === "open_sentence");
        const fills = qs.filter((q) => L.getFormat(q) === "fill_blank" || L.getFormat(q) === "fill_word");
        if (s.noPassage && opens.length) out.noPassage.push({ setId: s.id, label: s.setLabel, n: opens.length, q: snippet(opens[0].stem || opens[0].question), answer: snippet(opens[0].answer, 80), id: opens[0].id });
        if (opens.length) out.open.push({ setId: s.id, label: s.setLabel, noPassage: !!s.noPassage, passageLen: String(s.passage || "").length, n: opens.length, id: opens[0].id, q: snippet(opens[0].stem || opens[0].question), answer: snippet(Array.isArray(opens[0].answer) ? opens[0].answer.join(" ") : opens[0].answer, 80) });
        if (fills.length) out.fill.push({ setId: s.id, id: fills[0].id, answer: fills[0].answer, q: snippet(fills[0].stem || fills[0].question) });
      }
    }
  }
  return out;
}

const scans = [];
let excluded = 0, graded = 0, parent = 0;
for (const row of offered) {
  const paper = pool[row.poolIndex];
  const g = S.gradeSubmission(row.id, {});
  for (const x of g.rows) { if (x.excluded) excluded++; else if (x.correct === null) parent++; else graded++; }
  const sc = scanPaper(paper, row);
  if (sc.mapMcq.length && sc.cloze.length && (sc.editing.length || sc.punct.length) && sc.open.length) scans.push(sc);
}

const practice = D.buildPastPaperPlan(D.DEFAULT_SETTINGS, "E2E Primary", 1);
const practiceSummary = (practice || []).map((sec) => {
  const items = sec.items || [];
  if (sec.type.endsWith("MCQ")) {
    return { type: sec.type, n: items.length, sample: items.slice(0, 4).map((q) => ({ id: q.id, sentence: snippet(q.sentence), options: q.options, answer: q.answer, nOpt: (q.options || []).length })) };
  }
  if (sec.type.endsWith("Cloze")) {
    const s = items[0] || {};
    return { type: sec.type, label: s.setLabel, passage: snippet(s.passage, 180), wordBank: s.wordBank || null, blanks: (s.blanks || []).slice(0, 8).map((b) => ({ num: b.num, answer: b.answer })) };
  }
  if (sec.type === "Editing") {
    const s = items[0] || {};
    return { type: sec.type, label: s.setLabel, items: (s.items || []).slice(0, 8).map((q) => ({ id: q.id, sentence: snippet(q.sentence, 160), wrongWord: q.wrongWord, answer: q.answer, nOpt: (q.options || []).length })) };
  }
  if (sec.type === "Comprehension") {
    const s = items[0] || {};
    return { type: sec.type, label: s.setLabel, passageLen: String(s.passage || "").length, noPassage: !!s.noPassage, questions: (s.questions || []).slice(0, 6).map((q) => ({ id: q.id, fmt: L.getFormat(q), stem: snippet(q.stem || q.question), options: q.options, answer: q.answer })) };
  }
  return { type: sec.type, n: items.length };
});

const best = scans.sort((a, b) => (b.mapMcq.length + b.punct.length + b.noPassage.length) - (a.mapMcq.length + a.punct.length + a.noPassage.length))[0];
const compact = (sc) => sc && ({
  id: sc.id, label: sc.label, minutes: sc.minutes,
  mapMcq: sc.mapMcq.slice(0, 3),
  cloze: sc.cloze.slice(0, 2),
  editing: sc.editing.slice(0, 3),
  punct: sc.punct.slice(0, 3),
  open: sc.open.slice(0, 2),
  noPassage: sc.noPassage.slice(0, 2),
  fill: sc.fill.slice(0, 2),
  counts: { map: sc.mapMcq.length, clozeSets: sc.cloze.length, editing: sc.editing.length, punct: sc.punct.length, openSets: sc.open.length, noPassage: sc.noPassage.length },
});

const out = {
  offered: offered.length,
  excluded, graded, parent,
  practicePaper: practice && practice.paperLabel,
  practiceKey: practice && practice.paperKey,
  practiceSummary,
  candidates: scans.slice(0, 8).map((s) => ({ id: s.id, label: s.label, map: s.mapMcq.length, cloze: s.cloze.length, ed: s.editing.length, punct: s.punct.length, open: s.open.length, noPass: s.noPassage.length })),
  best: compact(best),
};
fs.mkdirSync("tests/e2e/.state", { recursive: true });
fs.writeFileSync("tests/e2e/.state/pr57-targets.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify({ offered: out.offered, excluded, graded, parent, practicePaper: out.practicePaper, candidates: out.candidates.slice(0, 5), best: out.best && out.best.id }, null, 2));
