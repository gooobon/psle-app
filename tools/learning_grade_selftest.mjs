// Server grading: practice items and past-paper items. The grade result never carries the answer.
// Run: npx tsx tools/learning_grade_selftest.mjs
import { buildPastPaperPlan, DEFAULT_SETTINGS } from "../src/lib/dataEngine.js";
import { WA1_PRACTICE_SETS } from "../src/data/p3/english/wa1_practice.ts";
import { indexSets } from "../src/lib/reviewRounds.js";
import { resolveItem, resolveSubmitted } from "../src/lib/learningGrade.js";

let failed = 0;
function eq(name, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) { failed++; console.error("FAIL", name, "\n  got ", a, "\n  want", e); }
  else console.log("ok", name);
}

const practice = indexSets(WA1_PRACTICE_SETS).byId;
const s01 = WA1_PRACTICE_SETS.find((s) => s.setId === "S01");
const mcq = s01.plan.find((s) => s.type === "GrammarMCQ").items[0];
const rec = resolveSubmitted(practice, mcq.id, null);
eq("practice item resolves", !!rec, true);
const right = rec.grade({ val: mcq.answer });
eq("practice right answer", right, { scored: true, correct: true });
eq("grade result has no answer key", Object.keys(right).sort(), ["correct", "scored"]);
eq("practice wrong answer", rec.grade({ val: mcq.answer === 0 ? 1 : 0 }).correct, false);
eq("unknown id is dropped", resolveSubmitted(practice, "forged-perfect", null), null);
eq("unknown paper key is dropped", resolveSubmitted(practice, mcq.id, "paper:not-a-paper"), null);

const plan = buildPastPaperPlan(DEFAULT_SETTINGS, "E2E Primary", 3);
const paperSet = "paper:" + plan.paperKey;
let graded = 0, missed = 0;
for (const sec of plan) {
  for (const item of sec.items || []) {
    const rows = [];
    if (item.blanks) for (const b of item.blanks) rows.push({ id: item.id + "_" + b.num, payload: { val: b.answer } });
    else if (item.questions) for (const q of item.questions) rows.push({ id: q.id, payload: payloadFor(q), open: q.format === "open_sentence" || q.format === "open" });
    else if (item.items) for (const it of item.items) rows.push({ id: it.id, payload: { val: it.answer } });
    else rows.push({ id: item.id, payload: { val: item.answer } });
    for (const row of rows) {
      const got = resolveSubmitted(practice, row.id, paperSet);
      if (row.open) { if (got) { failed++; console.error("FAIL open item was graded", row.id); } continue; }
      if (!got) { missed++; console.error("MISS", sec.type, row.id); continue; }
      const g = got.grade(row.payload);
      if (!g.scored || !g.correct) { failed++; console.error("FAIL paper grade", row.id, JSON.stringify(g)); }
      else graded++;
      if (Object.keys(g).some((k) => k !== "scored" && k !== "correct")) { failed++; console.error("FAIL key leak", row.id); }
    }
  }
}
eq("past-paper plan items grade from the paper key", missed, 0);
console.log("ok graded past-paper items", graded);

// The shared comprehension id must be graded against the paper, not S29.
const clash = resolveSubmitted(practice, "q28_44", paperSet);
const asPractice = resolveItem(practice, "q28_44");
eq("paper q28_44 is the paper's answer", clash.grade({ val: "snapped" }).correct, true);
eq("practice q28_44 is not the paper's answer", asPractice.grade({ val: "snapped" }).correct, false);

if (failed || missed) { console.error("FAILED", failed, "missed", missed); process.exit(1); }
console.log("ALL PASS");

function payloadFor(q) {
  const fmt = q.format || "";
  if (fmt === "sequence") return { val: null, seq: q.answer };
  if (fmt === "true_false") return { val: q.answer };
  return { val: q.answer };
}
