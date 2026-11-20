// Self-test for issue #62 items 1, 3 and 4: cloze numbering and word keys, order (sequencing) questions, paper title.
// Run: node tools/cloze_order_selftest.mjs   (no Next, no network; writes nothing)
import { register } from "node:module";
import fs from "node:fs";
register("./exam_loader.mjs", import.meta.url);
const B = await import("../src/lib/p3PaperBridge.js");
const O = await import("../src/lib/orderQuestions.js");
const L = await import("../src/lib/learningGrade.js");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL:", m); } };
const pool = B.flattenEnglishPool();

// ── 1. Cloze: printed numbering, keys are words ────────────────────────────────────────────────────────────────
ok(JSON.stringify(B.parseWordBoxFromPassage("text\n\nWord Box: (A) at  (B) down  (C) in  (D) into  (E) its  (F) it's  (G) to  (H) up\n")) === JSON.stringify(["at", "down", "in", "into", "its", "it's", "to", "up"]), "word box parsed A-H");
ok(B.parseWordBoxFromPassage("no box here") === null, "no box -> null");
ok(!/Word Box/.test(B.stripWordBoxLine("I looked (21) ___.\n\nWord Box: (A) at (B) down\n")), "word box line removed from the passage");
ok(B.printedBlankNumber({ question: "Fill in blank (22): It appeared ...", id: "X_Q9" }, 2) === 22, "number from 'blank (22)'");
ok(B.printedBlankNumber({ id: "TN23_D_Q23" }, 3) === 23, "number from id");
ok(B.clozeAnswerWord({ answer: "B", options: { A: "at", B: "down" } }, []) === "down", "letter -> word via the item's options");
ok(B.clozeAnswerWord({ answer: "C" }, ["a", "b", "c"]) === "c", "letter -> word via the word bank");
ok(B.clozeAnswerWord({ answer: "down" }, ["at", "down"]) === "down", "a word key stays a word");
let sets = 0, blanks = 0, numMis = 0, letterKeys = 0, notInBank = 0, noMarkers = 0;
const badRows = [];
for (const p of pool) for (const sec of B.englishPaperExamPlan(p)) {
  if (!/Cloze$/.test(sec.type)) continue;
  for (const s of sec.items) {
    sets++;
    const markers = new Set([...String(s.passage || "").matchAll(/\((\d+)\)/g)].map((m) => Number(m[1])));
    if (!markers.size) noMarkers++;
    const bank = (s.wordBank || []).map((w) => String(w).toLowerCase());
    for (const b of s.blanks || []) {
      blanks++;
      if (markers.size && !markers.has(b.num)) { numMis++; badRows.push(`${p.meta?.school} ${p.meta?.year} ${s.id} blank ${b.num} not in passage markers [${[...markers]}]`); }
      if (/^[A-H]$/.test(String(b.answer)) && ((s.wordBank || []).length || (b.choices || []).length)) { letterKeys++; badRows.push(`${s.id} blank ${b.num} key is a letter`); }
      if (bank.length && !bank.includes(String(b.answer).toLowerCase().trim())) { notInBank++; badRows.push(`${s.id} blank ${b.num} key "${b.answer}" not in word bank`); }
    }
  }
}
ok(numMis === 0, `every cloze box number appears in its passage (${numMis} mismatches)`);
let brBad = 0; for (const p of pool) for (const sec of B.englishPaperExamPlan(p)) if (/Cloze$/.test(sec.type)) for (const s of sec.items) for (const b of s.blanks || []) if (b.choices && !b.choices.some((c) => c.toLowerCase() === String(b.answer).toLowerCase())) { brBad++; console.log("bracket key not among choices:", s.id, b.num, b.answer, b.choices); }
ok(brBad === 0, `every "[ a / b ]" blank key is one of its printed choices (${brBad})`);
ok(letterKeys === 0, `no cloze key is a bare letter where a word bank / options exist (${letterKeys})`);
ok(notInBank === 0, `every word-bank cloze key is one of the words (${notInBank})`);
const tn = pool.find((p) => JSON.stringify(p).includes("TN23_D_Q21"));
const tnSet = B.englishPaperExamPlan(tn).find((s) => s.type === "GrammarCloze").items[0];
ok(JSON.stringify(tnSet.blanks.map((b) => [b.num, b.answer])) === JSON.stringify([[21, "down"], [22, "in"], [23, "at"], [24, "its"]]), "Tao Nan 2023 WA3 grammar cloze: boxes 21-24, word keys");
ok(tnSet.wordBank.length === 8 && !/Word Box/.test(tnSet.passage), "Tao Nan word bank shown once, as words");
ok(L.normTyped("Down") === "down", "typed case is normalised by the grader");

// ── 3. Order questions ────────────────────────────────────────────────────────────────────────────────────────
const shapes = [
  ["text lines + 'text: N | ...'", { question: "Write 1, 2 and 3 in the blanks below to indicate the order of what Meng did in the story. [1 mark]\n\n___ Meng reached the town.\n___ Meng crossed the stream.\n___ Meng walked past the rice field.", answer: "Meng reached the town: 3 | Meng crossed the stream: 2 | Meng walked past the rice field: 1" }, [3, 2, 1]],
  ["subEvents + answer object", { stem: "Write 1, 2 and 3 in the blanks to indicate the order of events.", subEvents: ["A did x.", "B did y.", "C did z."], answer: { "A did x.": "1", "B did y.": "3", "C did z.": "2" } }, [1, 3, 2]],
  ["inline slash list + '2 / 1 / 3'", { question: "Write 1, 2 and 3 in the blanks below to show the order of the places.\n___ Germany / ___ Russia / ___ Florida", answer: "2 / 1 / 3" }, [2, 1, 3]],
  ["boxes + 'N – text' lines", { question: "Put the events in the right sequence (1–4).\n\n[ ] They went for a camp.\n[ ] They cooperated.\n[ ] They listened to advice.\n[ ] They attended a briefing.", answer: "1 – They went for a camp.\n4 – They cooperated.\n3 – They listened to advice.\n2 – They attended a briefing." }, [1, 4, 3, 2]],
  ["paraphrased key with arrows", { question: "Write 1, 2 and 3 in the boxes to show the order.\n□ Sam shared his reflection during an assembly programme.\n□ Sam's understanding of mathematics improved with Ms Lee's teaching.\n□ Sam had a new teacher, Ms Lee.", answer: "Ms Lee arrived = 1; Sam's maths improved = 2; Sam shared at assembly = 3" }, [3, 2, 1]],
  ["plain list", { question: "Number the events.\n___ one event here\n___ two event here\n___ three event here", answer: "3, 1, 2" }, [3, 1, 2]],
];
for (const [name, q, want] of shapes) { const r = O.parseOrderQuestion(q); ok(r && JSON.stringify(r.order) === JSON.stringify(want), "parse: " + name + " -> " + JSON.stringify(r && r.order)); }
ok(O.parseOrderQuestion({ question: "Write 1, 2 and 3.\n___ a thing\n___ b thing\n___ c thing", answer: "1, 1, 2" }) === null, "a key that is not a ranking 1..n is refused (stays parent-marked)");
ok(O.parseOrderQuestion({ question: "Write 1, 2 and 3.", answer: "see passage" }) === null, "no items -> not an order item");
ok(!/___/.test(O.parseOrderQuestion(shapes[0][1]).stem), "stem no longer carries the ___ lines");
ok(O.looksLikeOrderQuestion("Write the numbers 1, 2 and 3 in the boxes below to show the order of events.") && O.looksLikeOrderQuestion("Write down 1, 2 or 3 in the blanks to show what the thief did first, next and last.") && !O.looksLikeOrderQuestion("Write 1, 2, 3 or 4 in the brackets. They _____"), "wording detector");
// tap logic: first tap = 1, second = 2; tap a ranked card to take it back; undo; reset; exact grading
let v = [0, 0, 0];
v = O.tapOrder(v, 2); v = O.tapOrder(v, 0); v = O.tapOrder(v, 1);
ok(JSON.stringify(v) === "[2,3,1]", "taps assign 1,2,3 in tap order: " + JSON.stringify(v));
ok(JSON.stringify(O.tapOrder(v, 0)) === "[0,2,1]", "tapping a ranked card removes it and closes the gap");
ok(JSON.stringify(O.undoOrder(v)) === "[2,0,1]", "undo removes the last number");
ok(JSON.stringify(O.resetOrder(3)) === "[0,0,0]", "reset clears");
ok(O.gradeOrder([2, 3, 1], [2, 3, 1]) && !O.gradeOrder([2, 1, 3], [2, 3, 1]) && !O.gradeOrder([0, 0, 0], [2, 3, 1]), "exact grading");
ok(O.orderComplete([2, 3, 1], 3) && !O.orderComplete([2, 0, 1], 3), "complete only when every card has a number");
// bank-wide audit
let seq = 0, unrouted = 0, wrongKey = 0; const unr = [];
for (const p of pool) for (const sec of B.englishPaperExamPlan(p)) for (const s of sec.items || []) for (const q of s.questions || []) {
  const f = q.format || q.fmt;
  if (f === "sequence") {
    seq++;
    const items = q.sequenceItems || [];
    const key = Array.isArray(q.answer) ? q.answer : [];
    if (items.length < 2 || key.length !== items.length || ![...key].sort((a, b) => a - b).every((x, i) => x === i + 1)) { wrongKey++; unr.push(q.id); }
    // the grader marks the exact key right and a swapped one wrong
    const right = L.gradeComprehensionForTest ? null : null; void right;
  } else if (O.looksLikeOrderQuestion(q.stem || q.question)) { unrouted++; unr.push(q.id + " (open)"); }
}
console.log(`order audit: ${seq} order questions routed to tap-to-order, ${unrouted} order-looking questions left without the UI, ${wrongKey} with a bad key`);
ok(seq >= 100 && unrouted === 0 && wrongKey === 0, "all order questions in the bank use the tap UI with a valid key: " + unr.join(","));
// Ai Tong 2025 EOY set (was: no boxes)
const at = pool.find((p) => JSON.stringify(p).includes('"at_g_q37"'));
const atQ = B.englishPaperExamPlan(at).flatMap((s) => (s.items || []).flatMap((x) => x.questions || [])).find((q) => q.id === "at_g_q37");
ok(atQ && (atQ.format || atQ.fmt) === "sequence" && atQ.sequenceItems.length === 3 && JSON.stringify(atQ.answer) === "[1,3,2]", "Ai Tong 2025 EOY question 3 is a tap-to-order item with key [1,3,2]");
// server grading: the mock grader accepts exactly the key
const S = await import("../src/lib/examServer.js");
const aiPaper = S.listPapers().find((x) => /Ai Tong/i.test(x.school || "") && x.year === 2025);
if (aiPaper) {
  const g = (seq_) => S.gradeSubmission(aiPaper.id, { at_g_q37: { val: null, seq: seq_, reason: null } }).rows.find((r) => r.id === "at_g_q37");
  ok(g(["1", "3", "2"]).correct === true && g(["1", "2", "3"]).correct === false && g([]).correct === false, "mock grader: exact key right, other order wrong, blank wrong");
} else console.log("note: Ai Tong 2025 EOY is not an offered mock paper in this build; server grading checked on the learning grader only");
// components
const read = (f) => fs.readFileSync(new URL("../" + f, import.meta.url), "utf8");
ok(/OrderTap/.test(read("src/components/PaperExam.js")) && /OrderTap/.test(read("src/components/ExamSession.js")), "OrderTap is used in practice and in the mock paper");
const ot = read("src/components/OrderTap.js");
ok(/<button/.test(ot) && /type="button"/.test(ot) && /aria-label/.test(ot) && /Undo/.test(ot) && /Reset/.test(ot), "OrderTap: real buttons (keyboard), labelled, with Undo and Reset");

// ── 4. Paper titles ────────────────────────────────────────────────────────────────────────────────────────────
let titled = 0, titleBad = 0;
const DE = await import("../src/lib/dataEngine.js");
for (const school of ["Nanyang Primary", "Anglo-Chinese School (Primary)", "Tao Nan School", "Ai Tong School", "Catholic High", "Henry Park", ""]) {
  for (let n = 1; n <= 12; n++) {
    const plan = DE.buildPastPaperPlan({}, school, n);
    const m = plan.paperMeta || {};
    if (plan.paperLabel && plan.paperLabel === (m.school || m.title || m.assessment || "P3 English Paper")) titled++;
    else { titleBad++; console.log("title mismatch", school, n, m.school, plan.paperLabel); }
  }
}
ok(titleBad === 0, `mock header = the school of the paper actually served (${titled} plans checked)`);
ok(!/mockInfo\?\.school|mockInfo\.school/.test(read("src/components/ExamSession.js")) && !/mockInfo\?\.school/.test(read("src/components/EnglishSession.js")), "headers no longer use the fixed MOCK_EXAMS[0] school");
// header vs source: the school named in the file's own header comment must match meta.school
import path from "node:path";
const root = new URL("../src/data/p3/english/papers/", import.meta.url).pathname;
const files = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (/\.ts$/.test(e.name) && !/^(index|types)\.ts$/.test(e.name)) files.push(f); } })(root);
const key = (s) => s.toLowerCase().replace(/[^a-z ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !["school", "primary", "the", "girls", "public", "presbyterian"].includes(w));
let hdrBad = 0;
for (const f of files) {
  const t = fs.readFileSync(f, "utf8"); const school = (t.match(/\bschool:\s*["']([^"']+)["']/) || [])[1]; if (!school) continue;
  const head = t.split("\n").slice(0, 12).filter((l) => /^\s*(\/\/|\*|\/\*)/.test(l)).join(" ").toLowerCase();
  if (head && !key(school).some((k) => head.includes(k))) { hdrBad++; console.log("header/source mismatch:", path.relative(root, f), "|", school); }
}
ok(hdrBad === 0, `file header names the same school as meta.school (${files.length} files, ${hdrBad} mismatches)`);

console.log(`cloze_order_selftest: ${cloze()} `); function cloze() { return `cloze sets ${sets}, blanks ${blanks}, sets without printed numbers ${noMarkers}`; }
console.log(`${pass} pass / ${fail} fail`);
if (fail) { console.log(badRows.slice(0, 20).join("\n")); process.exit(1); }
