// Self-test for the paper bridge (issue #54): object-map options, flat cloze / editing / comprehension items, and the practice-route grader.
// Run: node tools/p3_reclass_selftest.mjs   (uses tools/exam_loader.mjs; no Next, no network; writes nothing)
import { register } from "node:module";
register("./exam_loader.mjs", import.meta.url);
const B = await import("../src/lib/p3PaperBridge.js");
const L = await import("../src/lib/learningGrade.js");
const S = await import("../src/lib/examServer.js");
const E = await import("../src/lib/examEngine.js");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL:", m); } };
const pool = B.flattenEnglishPool();

// 1. Plan-wide counts and shape checks
let mcqUnder2 = 0, mapItems = 0, mapOk = 0, questions = 0;
const byType = {};
for (const paper of pool) {
  const plan = B.englishPaperExamPlan(paper);
  const raw = new Map((paper.questions || []).filter((q) => q && q.id).map((q) => [q.id, q]));
  for (const sec of plan) {
    byType[sec.type] = (byType[sec.type] || 0) + sec.items.length;
    if (sec.type.endsWith("MCQ")) for (const it of sec.items) {
      questions++;
      if ((it.options || []).length < 2) mcqUnder2++;
      const r = raw.get(it.id);
      if (r && r.options && typeof r.options === "object" && !Array.isArray(r.options)) {
        mapItems++;
        const keys = Object.keys(r.options).sort((a, b) => a - b);
        const want = r.options[keys[Number(r.answer) - 1]];
        if (it.options.length >= 2 && it.options[it.answer] === want) mapOk++;
      }
    }
    if (sec.type === "Editing") for (const s of sec.items) for (const q of s.items) {
      ok(typeof q.answer === "string" || q.options.length >= 2, "editing item has a typed answer or options: " + q.id);
      if (q.options.length === 0 && typeof q.answer === "string") ok(!!q.answer, "editing answer not empty: " + q.id);
    }
  }
}
ok(mcqUnder2 === 0, "MCQ-bucket items with < 2 options: " + mcqUnder2);
ok(mapItems === 105 && mapOk === 105, `object-map MCQ items readable with correct key: ${mapOk}/${mapItems}`);
console.log("MCQ under 2 options:", mcqUnder2, "| object-map MCQ ok:", mapOk + "/" + mapItems, "| items by section:", JSON.stringify(byType));

// 2. The wrapped types: typed key resolves, open-ended is not auto-graded, nothing is an always-wrong MCQ
const rows = JSON.parse((await import("node:fs")).readFileSync(new URL("../src/data/papers/manifest.json", import.meta.url), "utf8")).papers.filter(E.isFullPaper);
let graded = 0, parent = 0, excluded = 0, mapGraded = 0;
for (const r of rows) {
  const g = S.gradeSubmission(r.id, {});
  if (!g) { ok(false, "no grade for " + r.id); continue; }
  for (const x of g.rows) { if (x.excluded) excluded++; else if (x.correct === null) parent++; else graded++; }
}
ok(excluded === 0, "no offered-paper item is excluded: " + excluded);
console.log("offered papers:", rows.length, "| auto-graded:", graded, "| parent-marked:", parent, "| excluded:", excluded);

// 3. Perfect submission on one paper with object-map options scores every auto-graded item right
{
  const id = "wa3_catholichigh_practicepaper2_2023";
  const pub = S.publicPaper(id);
  ok(!!pub, "publicPaper " + id);
  const man = rows.find((r) => r.id === id);
  const paper = pool[man.poolIndex];
  const plan = B.englishPaperExamPlan(paper);
  const answers = {};
  for (const sec of plan) {
    if (sec.type.endsWith("MCQ")) for (const q of sec.items) answers[q.id] = { val: q.answer };
    else if (sec.type.endsWith("Cloze")) for (const s of sec.items) for (const b of s.blanks) answers[s.id + "_" + b.num] = { val: b.answer };
    else if (sec.type === "Editing") for (const s of sec.items) for (const q of s.items) answers[q.id] = { val: q.answer };
  }
  const g = S.gradeSubmission(id, answers);
  // Comprehension answers are not filled in here (formats vary), so only the other sections are checked.
  const wrong = g.rows.filter((x) => x.correct === false && x.section !== "Comprehension").length;
  ok(wrong === 0, "perfect answers score 0 wrong on " + id + " (wrong=" + wrong + ")");
  // Answer key never reaches the student paper
  ok(!JSON.stringify(pub).includes('"answer"'), "public paper carries no answer field");
}

// 4. Practice route: an MCQ with < 2 options is not graded (was always-wrong); a real MCQ still is
{
  const bad = { q1: { leaf: { id: "q1", answer: 0, options: [] }, sectionType: "GrammarMCQ", setId: "s" } };
  ok(L.resolveItem(bad, "q1") === null, "resolveItem: MCQ with 0 options is not auto-graded");
  const good = { q2: { leaf: { id: "q2", answer: 1, options: ["a", "b", "c"] }, sectionType: "GrammarMCQ", setId: "s" } };
  const rec = L.resolveItem(good, "q2");
  ok(rec && rec.grade({ val: 1 }).correct === true && rec.grade({ val: 0 }).correct === false, "resolveItem: real MCQ still graded");
}
console.log(`${pass} pass / ${fail} fail`);
process.exit(fail ? 1 : 0);
