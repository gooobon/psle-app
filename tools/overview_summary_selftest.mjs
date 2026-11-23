// Offline check for the parent Overview server summary. Run: node tools/overview_summary_selftest.mjs
import assert from "node:assert/strict";
import { summarizeActivity } from "../src/lib/overviewSummary.mjs";
const K = ["English", "Chinese", "Math"];
let n = 0; const ok = (name, fn) => { fn(); n++; console.log("PASS", name); };
ok("sums sets and computes average per subject", () => {
  const r = summarizeActivity([
    { subject: "English", sets_completed: 1, questions_answered: 20, correct: 15 },
    { subject: "English", sets_completed: 2, questions_answered: 40, correct: 30 },
    { subject: "Chinese", sets_completed: 1, questions_answered: 10, correct: 5 },
  ], K);
  assert.deepEqual(r.English, { sessions: 3, questions: 60, correct: 45, average: 75 });
  assert.equal(r.Chinese.average, 50);
});
ok("no rows: zero sessions, null average (no divide by zero)", () => {
  const r = summarizeActivity([], K); assert.equal(r.Math.sessions, 0); assert.equal(r.Math.average, null);
  assert.equal(summarizeActivity(null, K).English.sessions, 0);
});
ok("unknown subjects and bad numbers ignored", () => {
  const r = summarizeActivity([{ subject: "Art", sets_completed: 5 }, { subject: "English", sets_completed: "x", questions_answered: null, correct: undefined }], K);
  assert.equal(r.English.sessions, 0); assert.equal(r.Art, undefined);
});
console.log(`ALL PASS (${n} checks)`);
