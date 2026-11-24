// Role-play selftest for issue #131 (pure logic only; no network, nothing is written anywhere).
// Student: answers wrong on purpose for different causes. Parent: opens a mistake and sees the question, the child's answer,
// the correct answer and the cause tag, then sees concept-level weak spots. Run: node tools/parent_detail_selftest.mjs
import fs from "node:fs";
import { weakSpots, attemptSummary, answerShown, timeTakenText, isParentCause, parentCauseLabel, PARENT_CAUSES, NOT_RECORDED, DAY_MS } from "../src/lib/parentDetail.js";

let failed = 0;
function eq(name, a, e) {
  const x = JSON.stringify(a), y = JSON.stringify(e);
  if (x !== y) { failed++; console.error("FAIL", name, "\n  got ", x, "\n  want", y); } else console.log("ok", name);
}
const NOW = Date.parse("2026-12-01T04:00:00Z");
const at = (daysAgo, i = 0) => new Date(NOW - daysAgo * DAY_MS - i * 60000).toISOString();

// --- Student: intentional wrong answers with different causes (careless / concept / vocabulary) ---
const SVA = "en.grammar.subject_verb_agreement", PAST = "en.grammar.past_tense_irregular", VOC = "en.vocab.in_context";
const student = [];
const wrong = (skill, item, answer, d, i) => student.push({ skill, item_id: item, first_try: false, answer_text: answer, attempted_at: at(d, i) });
const right = (skill, item, d, i) => student.push({ skill, item_id: item, first_try: true, attempted_at: at(d, i) });
// careless: knows the rule, slips (subject-verb agreement, 1 of 5 right)
wrong(SVA, "q-sva-1", "The dogs barks", 1, 1); wrong(SVA, "q-sva-2", "She go to school", 2, 2); wrong(SVA, "q-sva-3", "He have a pen", 3, 3);
wrong(SVA, "q-sva-1", "The dogs barks", 4, 4); right(SVA, "q-sva-4", 5, 5);
// concept: does not know irregular past tense (0 of 4)
wrong(PAST, "q-past-1", "runned", 1, 6); wrong(PAST, "q-past-2", "goed", 2, 7); wrong(PAST, "q-past-3", "eated", 3, 8); wrong(PAST, "q-past-4", "swimmed", 4, 9);
// vocabulary: only 3 attempts -> below the 4-attempt minimum, must NOT appear
wrong(VOC, "q-voc-1", "ancient", 1, 10); wrong(VOC, "q-voc-2", "fragile", 2, 11); right(VOC, "q-voc-3", 3, 12);
// older window (15-28 days ago): SVA was 100%, PAST had 4 attempts at 50%
for (let i = 0; i < 4; i++) right(SVA, "q-sva-old" + i, 16 + i, 20 + i);
right(PAST, "q-past-o1", 20, 30); right(PAST, "q-past-o2", 21, 31); wrong(PAST, "q-past-o3", "flied", 22, 32); wrong(PAST, "q-past-o4", "buyed", 23, 33);
// too old to count at all
wrong(VOC, "q-voc-ancient", "x", 40, 40);

// --- Parent: weak spots ---
const spots = weakSpots(student, NOW);
eq("only skills with >= 4 attempts in 14 days", spots.map((s) => s.skill), [PAST, SVA]);
const past = spots[0], sva = spots[1];
eq("concept skill 0% first try, 4 attempts", [past.firstTryPct, past.attempts], [0, 4]);
eq("concept skill vs previous 14 days (50%) is down", [past.prevPct, past.trend], [50, "down"]);
eq("SVA first-try 20%, trend down from 100%", [sva.firstTryPct, sva.prevPct, sva.trend], [20, 100, "down"]);
eq("2 examples, different items, with the child's exact words", past.examples.map((e) => e.answerText), ["runned", "goed"]);
eq("SVA examples skip the repeated item", sva.examples.map((e) => e.itemId), ["q-sva-1", "q-sva-2"]);
eq("new skill has no earlier data", weakSpots(student.filter((r) => r.skill === PAST && Date.parse(r.attempted_at) > NOW - 14 * DAY_MS), NOW)[0].trend, "new");
eq("steady within 5 points", weakSpots([...Array(4)].map((_, i) => ({ skill: "k", item_id: "a" + i, first_try: i < 2, attempted_at: at(1, i) })).concat([...Array(4)].map((_, i) => ({ skill: "k", item_id: "b" + i, first_try: i < 2, attempted_at: at(20, i) }))), NOW)[0].trend, "flat");

// --- Fail soft: answer column missing (no answer_text anywhere) ---
const noCol = weakSpots(student.map(({ answer_text, ...r }) => r), NOW);
eq("weak spots still work without answer_text", noCol.map((s) => s.skill), [PAST, SVA]);
eq("examples show null answer when not recorded", noCol[0].examples.map((e) => e.answerText), [null, null]);
eq("answerShown: wrong_answers text wins", answerShown("goed", "other"), "goed");
eq("answerShown: falls back to trial answer", answerShown("", "runned"), "runned");
eq("answerShown: nothing recorded", answerShown(null, null), NOT_RECORDED);
eq("answerShown text is Answer not recorded", NOT_RECORDED, "Answer not recorded");

// --- Parent opens a mistake: attempts and the recorded answer ---
const sum = attemptSummary(student);
eq("attempts for a repeated item", sum.attempts["q-sva-1"], 2);
eq("latest wrong answer text for an item", sum.answers["q-past-1"], "runned");
eq("empty input is fine", attemptSummary(null), { attempts: {}, answers: {}, elapsed: {} });

// --- Time taken (learning_trials.elapsed_ms from #143; column may be missing or null) ---
const timed = [
  { skill: "k", item_id: "t1", first_try: false, elapsed_ms: 12400, attempted_at: at(1) },
  { skill: "k", item_id: "t2", first_try: false, elapsed_ms: 4250, attempted_at: at(1, 1) },
  { skill: "k", item_id: "t3", first_try: false, elapsed_ms: null, attempted_at: at(1, 2) },
  { skill: "k", item_id: "t4", first_try: false, attempted_at: at(1, 3) },
];
const ts2 = attemptSummary(timed);
eq("elapsed kept for items that have it", ts2.elapsed, { t1: 12400, t2: 4250 });
eq("time shown in seconds (>= 10 s rounded)", timeTakenText(ts2.elapsed.t1), "Time taken: 12 s");
eq("time shown with one decimal under 10 s", timeTakenText(ts2.elapsed.t2), "Time taken: 4.3 s");
eq("null elapsed is not recorded", timeTakenText(ts2.elapsed.t3), "Time taken: not recorded");
eq("missing column is not recorded", [timeTakenText(undefined), timeTakenText(0), timeTakenText("x")], ["Time taken: not recorded", "Time taken: not recorded", "Time taken: not recorded"]);
eq("student data without elapsed_ms gives empty map", attemptSummary(student).elapsed, {});

// --- Parent cause tag: careless / concept / vocabulary only ---
eq("cause list", PARENT_CAUSES.map((c) => c.label), ["Careless", "Concept", "Vocabulary"]);
const tags = {}; // the parent tags the three intentional mistakes
for (const [id, cause] of [["wa1", "careless"], ["wa2", "concept"], ["wa3", "vocabulary"]]) if (isParentCause(cause)) tags[id] = cause;
eq("tags accepted", tags, { wa1: "careless", wa2: "concept", wa3: "vocabulary" });
eq("label shown to the parent", parentCauseLabel(tags.wa2), "Concept");
eq("unknown cause rejected", [isParentCause("lazy"), isParentCause(""), isParentCause(null)], [false, false, false]);

// --- Guards by reading the source files (checks the files, not behaviour) ---
const cfg = fs.readFileSync(new URL("../src/lib/supabase/config.js", import.meta.url), "utf8");
eq("flag defaults OFF (needs the literal string true)", /PARENT_DETAIL = process\.env\.NEXT_PUBLIC_PARENT_DETAIL_ENABLED === "true"/.test(cfg), true);
const sql = fs.readFileSync(new URL("../supabase/migrations/20261210000000_parent_detail.sql", import.meta.url), "utf8");
eq("migration is additive (no drop table/column, delete, truncate, rename)", /\b(drop\s+table|drop\s+column|delete\s+from|truncate|rename)\b/i.test(sql), false);

if (failed) { console.error(failed + " FAILED"); process.exit(1); }
console.log("parent_detail selftest: all passed");
