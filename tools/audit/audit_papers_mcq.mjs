// READ-ONLY data audit (issue #50). Writes nothing; prints JSON to stdout.
// Run: node tools/audit/audit_papers_mcq.mjs   (uses tools/exam_loader.mjs, same as tools/exam_selftest.mjs)
import { register } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
register("../exam_loader.mjs", import.meta.url);
const B = await import("../../src/lib/p3PaperBridge.js");
const S = await import("../../src/lib/examServer.js");
const E = await import("../../src/lib/examEngine.js");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/papers/manifest.json"), "utf8"));
const pool = B.flattenEnglishPool();

// ---- Part 1: papers ----
const rows = manifest.papers.map((r) => {
  const flags = E.paperFlags(r);
  const marks = E.paperMarks(r);
  const reasons = [];
  if (!r.hasAnswerKey) reasons.push("no_answer_key");
  if (r.subject !== "English") reasons.push("not_english");
  else if (!Number.isInteger(r.poolIndex)) reasons.push("no_runtime_paper");
  if (marks < E.FULL_PAPER_MIN_MARKS) reasons.push(marks ? "under_45_marks" : "no_marks");
  const eligible = E.isFullPaper(r);
  return { id: r.id, subject: r.subject, bucket: r.bucket, school: r.school, year: r.year, marks: r.marks, questionMarksSum: r.questionMarksSum,
    hasAnswerKey: r.hasAnswerKey, answerKeyNote: r.answerKeyNote, flags, reasons, eligible,
    strongDup: (r.suspectedDuplicates || []).filter((d) => d.tier === "strong").map((d) => path.basename(d.file)) };
});

// ---- Part 2: MCQ items with < 2 options, using the real runtime normaliser ----
const mcq = [];
const planOf = B.englishPaperExamPlan;
manifest.papers.filter((r) => r.subject === "English" && Number.isInteger(r.poolIndex)).forEach((r) => {
  const paper = pool[r.poolIndex];
  const plan = planOf(paper);
  const raw = new Map(); // raw item by id for answer-shape inspection
  (paper.questions || []).forEach((q) => q && q.id && raw.set(q.id, q));
  for (const sec of plan) {
    if (!sec.type.endsWith("MCQ")) continue;
    sec.items.forEach((it) => {
      const n = (it.options || []).length;
      if (n >= 2) return;
      const q = raw.get(it.id) || {};
      const a = q.answer;
      const shape = typeof a === "number" ? "number" : typeof a === "string" ? (/^[A-Da-d]$/.test(a.trim()) ? "letter" : /^[1-4]$/.test(a.trim()) ? "digit_string" : a.trim() === "" ? "empty" : "text") : a == null ? "missing" : typeof a;
      mcq.push({ paper: r.id, section: sec.type, id: it.id, optionCount: n, answerShape: shape, answerSample: String(a).slice(0, 40),
        rawOptions: q.options === undefined ? "absent" : Array.isArray(q.options) ? "array" + q.options.length : typeof q.options,
        stemHasInlineOptions: /\(\s*[A-D1-4]\s*\)|\b[A-D]\.\s/.test(String(it.sentence || "")),
        rawTopic: String(q.topic || ""), rawKind: String(q.kind || q.type || ""), hasWordBank: Array.isArray(q.wordBank) && q.wordBank.length > 0,
        hasPassage: !!(q.passage || q.passageText),
        category: (q.options && typeof q.options === "object" && !Array.isArray(q.options)) ? "options_as_object_map"
          : (q.wordBank && q.wordBank.length) ? "cloze_with_word_bank"
          : /Editing/.test(String(q.topic || "")) ? "editing_item"
          : (q.passage || q.passageText) ? "passage_item(cloze/editing/comprehension)"
          : /\b(Comprehension|Synthesis|Combin|WordOrder|Transform)/i.test(String(q.topic || "")) ? "comprehension_or_synthesis"
          : "other",
        stemHasBlank: /_{2,}|\(\s*\)/.test(String(it.sentence || "")), eligible: E.isFullPaper(r), subject: "English", bucket: r.bucket });
    });
  }
});
// Does the real mock-exam grader treat the item as auto-graded? gradeSubmission(paper, {}) gives correct=false for graded items, null for not-auto-graded.
const gradedCache = new Map();
for (const x of mcq) {
  if (!x.eligible) { x.graded = "n/a (paper not in exam catalogue)"; continue; }
  if (!gradedCache.has(x.paper)) { const g = S.gradeSubmission(x.paper, {}); gradedCache.set(x.paper, g ? new Map(g.rows.map((r) => [r.id, r.correct])) : new Map()); }
  const c = gradedCache.get(x.paper).get(x.id);
  x.graded = c === undefined ? "not_in_rows" : c === null ? "excluded(null)" : "graded";
}
const count = (arr, f) => arr.reduce((m, x) => { const k = f(x); m[k] = (m[k] || 0) + 1; return m; }, {});
if (process.argv.includes("--md-papers")) { // markdown table of every paper with a flag or exclusion reason
  const bad = rows.filter((x) => x.flags.length || x.reasons.length);
  const cell = (v) => (v === null || v === undefined || v === "" ? "?" : String(v).replace(/\|/g, "/"));
  const behaviour = (x) => (x.eligible ? (x.flags.length ? "included (note shown)" : "included") : "excluded from mock-exam picker");
  console.log("| id | subject | school | year | marks | key | flags | not-eligible reasons | behaviour |\n|---|---|---|---|---|---|---|---|---|");
  for (const x of bad.sort((a, b) => a.subject.localeCompare(b.subject) || a.id.localeCompare(b.id)))
    console.log(`| \`${x.id}\` | ${x.subject} | ${cell(x.school)} | ${cell(x.year)} | ${cell(x.marks ?? (x.questionMarksSum ? x.questionMarksSum + " (sum)" : null))} | ${x.hasAnswerKey ? (x.answerKeyNote === "derived" ? "derived" : "yes") : "NO"} | ${x.flags.join(", ") || "-"} | ${x.reasons.join(", ") || "-"} | ${behaviour(x)} |`);
  process.exit(0);
}
console.log(JSON.stringify({ papers: rows, mcq, summary: {
  papersTotal: rows.length, bySubject: count(rows, (x) => x.subject), eligible: rows.filter((x) => x.eligible).length,
  mcqTotal: mcq.length, mcqByShape: count(mcq, (x) => x.answerShape), mcqBySection: count(mcq, (x) => x.section),
  mcqByPaper: count(mcq, (x) => x.paper), mcqInEligiblePapers: mcq.filter((x) => x.eligible).length,
  mcqByCategory: count(mcq, (x) => x.category), mcqByCategoryAndShape: count(mcq, (x) => x.category + " | " + x.answerShape), mcqByTopic: count(mcq, (x) => x.rawTopic), mcqGradedStatus: count(mcq, (x) => x.graded), mcqGradedByCategory: count(mcq.filter((x)=>x.eligible), (x) => x.category + " | " + x.graded), mcqInlineOptions: mcq.filter((x) => x.stemHasInlineOptions).length, mcqWithBlank: mcq.filter((x) => x.stemHasBlank).length,
  rawOptions: count(mcq, (x) => x.rawOptions) } }, null, 1));
