// Self-test for cloze numbering and keys (issue #62). Run: node tools/cloze_selftest.mjs
// 1. Boxes carry the passage's own numbers ((21)-(24), not (1)-(4)).  2. The stored key is the word, never a bare letter,
// when a word bank (array, letter map, or "(G) at" instructions) exists.  3. Whole bank: every cloze blank in every paper.
import { register } from "node:module";
register("./exam_loader.mjs", import.meta.url);
const B = await import("../src/lib/p3PaperBridge.js");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL:", m); } };

// --- unit: the shapes found in the data -----------------------------------------------------------------------
const passage = "I looked (21) __________ and saw it. It slept (22) __________ the water. Frozen (23) ______ the ground, part of (24) ______ body.";
const bankMap = { A: "at", B: "down", C: "in", D: "into", E: "its", F: "it's", G: "to", H: "up" };
let set = B.englishPaperExamPlan({ meta: { school: "X" }, questions: [{ id: "s", topic: "GrammarCloze", passage, wordBank: bankMap,
  questions: [{ answer: "B" }, { answer: "C" }, { answer: "G" }, { answer: "E" }] }] });
let cz = set.find((s) => s.type === "GrammarCloze").items[0];
ok(cz.blanks.map((b) => b.num).join() === "21,22,23,24", "letter-map set: boxes use passage numbers " + cz.blanks.map((b) => b.num));
ok(cz.blanks.map((b) => b.answer).join() === "down,in,to,its", "letter-map set: keys are words " + cz.blanks.map((b) => b.answer));
ok(Array.isArray(cz.wordBank) && cz.wordBank.join() === Object.values(bankMap).join(), "word bank is a plain word array");

const nh = B.normaliseClozeBank(["(G) at", "(H) before", "(J) during", "(K) in"]);
ok(nh.byLetter.H === "before" && nh.byLetter.J === "during" && nh.words[0] === "at", "printed letters (G..K) are kept");
ok(B.clozeKeyToWord("H", nh.byLetter) === "before", "letter key -> word when the table has the letter");
ok(B.clozeKeyToWord("before", nh.byLetter) === "before", "a word key stays a word");
ok(B.clozeKeyToWord("a", { A: "at" }) === "a", "a lower-case word 'a' is never read as letter A");
ok(B.clozeKeyToWord("B", {}) === "B", "no table: nothing to translate");
ok(B.passageBlankNumbers("x (3) ____ y (4) ____").join() === "3,4", "passageBlankNumbers");
ok(B.passageBlankNumbers("no blanks (here)").length === 0, "no markers");

// flat items: answerText / word beat a letter key
const flat = B.englishPaperExamPlan({ meta: { school: "X" }, questions: [
  { id: "f1", topic: "GrammarCloze", qNumber: 19, question: "Andrew jumped (19) ______ the water.", answer: "D", answerText: "into" },
  { id: "f2", topic: "GrammarCloze", qNumber: 20, question: "He swam (20) ______ the lake.", answer: "C", answerText: "across" }] });
const fz = flat.find((s) => s.type === "GrammarCloze").items[0];
ok(fz.blanks.map((b) => b.answer).join() === "into,across" && fz.blanks.map((b) => b.num).join() === "19,20", "flat items: answerText used, printed numbers kept");

// --- whole bank ------------------------------------------------------------------------------------------------
let sets = 0, blanks = 0, letters = 0, numMismatch = 0;
for (const p of B.flattenEnglishPool()) {
  for (const s of B.englishPaperExamPlan(p)) {
    if (!/Cloze/.test(s.type)) continue;
    for (const it of s.items) {
      sets++;
      const printed = B.passageBlankNumbers(it.passage);
      const nums = it.blanks.map((b) => b.num);
      if (printed.length === nums.length && printed.join() !== nums.join()) { numMismatch++; console.log("number mismatch", p.meta.school, p.meta.year, nums.join(), "vs", printed.join()); }
      ok(Array.isArray(it.wordBank), "word bank is an array: " + p.meta.school + " " + p.meta.year);
      for (const b of it.blanks) { blanks++; if (/^[A-H]$/.test(String(b.answer).trim())) { letters++; console.log("letter key", p.meta.school, p.meta.year, b.num, b.answer); } }
    }
  }
}
ok(numMismatch === 0, "every cloze set numbers its boxes like the passage");
ok(letters === 0, "no cloze blank keeps a bare letter as its key");
ok(sets > 100 && blanks > 400, "bank was really scanned (" + sets + " sets, " + blanks + " blanks)");
console.log(`cloze_selftest: ${pass} pass / ${fail} fail (${sets} cloze sets, ${blanks} blanks, ${letters} letter keys, ${numMismatch} numbering mismatches)`);
process.exit(fail ? 1 : 0);
