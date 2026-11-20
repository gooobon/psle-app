// Self-test for order / sequencing questions (issue #62). Run: node tools/order_selftest.mjs
// Every order question in the bank must reach the student as tap-to-order cards with a numeric key in event order, or (key unreadable)
// as an explicit parent-marked open question. None may be left with no way to answer. Also unit-tests the key reader and the grader.
import { register } from "node:module";
register("./exam_loader.mjs", import.meta.url);
const B = await import("../src/lib/p3PaperBridge.js");
const L = await import("../src/lib/learningGrade.js");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL:", m); } };
const items3 = ["The boys fed Koko.", "The boys taught Koko tricks.", "The boys treated Koko's injured paw."];

// --- key reader: every shape found in the data -------------------------------------------------------------------
ok(B.sequenceKey([2, 1, 3], items3).join() === "2,1,3", "array key");
ok(B.sequenceKey("2 / 1 / 3", items3).join() === "2,1,3", "slash key");
ok(B.sequenceKey("2, 3, 1", items3).join() === "2,3,1", "comma key");
ok(B.sequenceKey("2 – 3 – 1", items3).join() === "2,3,1", "dash key");
ok(B.sequenceKey({ [items3[0]]: "1", [items3[1]]: "3", [items3[2]]: "2" }, items3).join() === "1,3,2", "object key (strings)");
ok(B.sequenceKey({ [items3[0]]: 2, [items3[1]]: 1, [items3[2]]: 3 }, items3).join() === "2,1,3", "object key (numbers)");
ok(B.sequenceKey("The boys fed Koko: 1\nThe boys taught Koko tricks: 3\nThe boys treated Koko's injured paw: 2", items3).join() === "1,3,2", "labelled lines");
ok(B.sequenceKey("The boys fed Koko → 1\nThe boys taught Koko tricks → 3\nThe boys treated Koko's injured paw → 2", items3).join() === "1,3,2", "arrow-labelled");
ok(B.sequenceKey("1, 1, 2", items3) === null, "not a permutation -> null");
ok(B.sequenceKey("2, 1", items3) === null, "wrong length -> null");
ok(B.sequenceKey("something else", items3) === null, "unreadable -> null");

// --- grader: the real server grader, every sequence item of every offered paper -----------------------------------------
const S = await import("../src/lib/examServer.js");
const E = await import("../src/lib/examEngine.js");
const fs = await import("node:fs");
const rows = JSON.parse(fs.readFileSync(new URL("../src/data/papers/manifest.json", import.meta.url), "utf8")).papers.filter(E.isFullPaper);
const pool = B.flattenEnglishPool();
let gradedRight = 0, gradedWrong = 0;
for (const r of rows) {
  const plan = B.englishPaperExamPlan(pool[r.poolIndex]);
  const right = {}, wrong = {}, ids = [];
  for (const sec of plan) if (sec.type === "Comprehension") for (const set of sec.items) for (const q of set.questions || []) if (q.format === "sequence") {
    right[q.id] = { seq: q.answer };
    wrong[q.id] = { seq: q.answer.map((x) => (x % q.answer.length) + 1) }; // every card shifted by one: never equal to the key
    ids.push(q.id);
  }
  if (!ids.length) continue;
  const gr = S.gradeSubmission(r.id, right), gw = S.gradeSubmission(r.id, wrong);
  for (const id of ids) {
    const a = gr.rows.find((x) => x.id === id), b = gw.rows.find((x) => x.id === id);
    if (a && a.correct === true) gradedRight++; else if (a && !a.excluded) ok(false, "right order not scored right: " + r.id + " " + id);
    if (b && b.correct === false) gradedWrong++; else if (b && !b.excluded) ok(false, "wrong order not scored wrong: " + r.id + " " + id);
  }
}
ok(gradedRight > 30 && gradedWrong > 30, "server grader exercised: " + gradedRight + " right / " + gradedWrong + " wrong");

// --- tap-to-order UI logic (tap, take back, undo, reset) -----------------------------------------------------------
const O = await import("../src/lib/orderTap.js");
{
  let v = [0, 0, 0];
  v = O.nextOrderValue(v, 1, 3); ok(v.join() === "0,1,0", "first tap is 1");
  v = O.nextOrderValue(v, 2, 3); ok(v.join() === "0,1,2", "second tap is 2");
  v = O.nextOrderValue(v, 0, 3); ok(v.join() === "3,1,2", "third tap is 3");
  v = O.nextOrderValue(v, 1, 3); ok(v.join() === "2,0,1", "tapping a numbered card takes its number back and closes the gap");
  v = O.undoOrderValue(v, 3); ok(v.join() === "0,0,1", "undo removes the highest number");
  v = O.undoOrderValue(v, 3); ok(v.join() === "0,0,0", "undo again empties");
  ok(O.nextOrderValue(["", 2, null], 0, 3).join() === "3,2,0", "stored blanks and nulls are read as empty");
}

// --- whole bank ----------------------------------------------------------------------------------------------------
const kinds = { cards: 0, open: 0, nothing: 0, total: 0 };
const bad = [];
const TEXT = /(write|put|number|arrange)[^\n]{0,80}\b1\b[^\n]{0,12}\b2\b|\b(order|sequence)\b/i;
for (const p of B.flattenEnglishPool()) {
  for (const s of B.englishPaperExamPlan(p)) {
    if (s.type !== "Comprehension") continue;
    for (const set of s.items) for (const q2 of set.questions || []) {
      const t = String(q2.question || "");
      const looksOrder = B.sequenceItemsOf(q2) && TEXT.test(t) || q2.format === "sequence";
      if (!looksOrder && !(q2.sequenceItems && q2.sequenceItems.length)) continue;
      kinds.total++;
      if (q2.format === "sequence") {
        const n = (q2.sequenceItems || []).length;
        const perm = Array.isArray(q2.answer) && q2.answer.length === n && [...q2.answer].sort((a, b) => a - b).every((x, i) => x === i + 1);
        if (n >= 2 && perm) kinds.cards++; else { kinds.nothing++; bad.push([p.meta.school, p.meta.year, q2.id, "sequence without items or key"]); }
      } else if (q2.format === "open" || q2.format === "open_multi" || q2.format === "open_sentence") { kinds.open++; bad.push([p.meta.school, p.meta.year, q2.id, "key unreadable -> parent-marked"]); }
      else { kinds.nothing++; bad.push([p.meta.school, p.meta.year, q2.id, "format " + q2.format]); }
    }
  }
}
for (const b of bad) console.log("  note:", b.join(" | "));
ok(kinds.nothing === 0, "no order question is left without cards or a parent-marked box");
ok(kinds.total >= 80, "bank really scanned: " + kinds.total);
console.log(`order_selftest: ${pass} pass / ${fail} fail. Order questions in the bank: ${kinds.total} -> tap-to-order cards ${kinds.cards}, parent-marked (key unreadable) ${kinds.open}, unanswerable ${kinds.nothing}`);
process.exit(fail ? 1 : 0);
