// Pure checks for "delayed transfer only" homework mastery (issue #32). No network. Run: node tools/homework_mastery_selftest.mjs
import { homeworkMasteryWeight, qualifyingHomeworkResults, HOMEWORK_WEIGHT, DAILY_SET_WEIGHT, mistakeDayYmd } from "../src/lib/homeworkMastery.js";
import { recordTrials, MODE } from "../src/lib/trialLedger.js";

let failed = 0;
function eq(name, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) { failed++; console.error("FAIL", name, "\n  got ", a, "\n  want", e); } else console.log("ok", name);
}
const near = (name, a, b) => eq(name, Math.abs(a - b) < 1e-9, true);

const MISTAKE = { id: "Q1", skill: "jinyici", date: "19 Nov 2026" };
const NEXT_DAY = "2026-11-20", SAME_DAY = "2026-11-19";
eq("weights are documented constants", [DAILY_SET_WEIGHT, HOMEWORK_WEIGHT], [1, 0.5]);
eq("mistake date label parses as SGT", mistakeDayYmd(MISTAKE), "2026-11-19");

const w = (item, today, seen = []) => homeworkMasteryWeight({ item, source: MISTAKE, seenIds: seen, todayYmd: today });
// Redoing the SAME question never affects mastery
eq("same question redo: no mastery", w({ id: "Q1", skill: "jinyici" }, NEXT_DAY).counts, false);
eq("same question redo: reason", w({ id: "Q1", skill: "jinyici" }, NEXT_DAY).reason, "same-question");
// Unseen similar question the NEXT day counts at half weight
eq("unseen similar, next day: counts at 0.5", w({ id: "Q2", skill: "jinyici" }, NEXT_DAY), { counts: true, weight: 0.5, reason: "delayed-transfer" });
eq("unseen similar, a week later: counts", w({ id: "Q2", skill: "jinyici" }, "2026-11-26").counts, true);
// Same-day similar question does not count
eq("similar question the SAME day: no mastery", w({ id: "Q2", skill: "jinyici" }, SAME_DAY).counts, false);
// Everything else does not touch mastery
eq("different skill: no mastery", w({ id: "Q3", skill: "liangci" }, NEXT_DAY).counts, false);
eq("already seen item: no mastery", w({ id: "Q2", skill: "jinyici" }, NEXT_DAY, ["Q2"]).counts, false);
eq("unknown mistake date fails closed", homeworkMasteryWeight({ item: { id: "Q2", skill: "jinyici" }, source: { id: "Q1", skill: "jinyici" }, seenIds: [], todayYmd: NEXT_DAY }).counts, false);
eq("no source fails closed", homeworkMasteryWeight({ item: { id: "Q2", skill: "jinyici" }, source: null, seenIds: [], todayYmd: NEXT_DAY }).counts, false);

// End to end on the ledger: a homework round with a redo, an unseen similar item (right), and one unseen similar item (wrong)
let prog = { trials: [{ itemId: "Q1" }], skillLedger: {}, mistakes: [MISTAKE] };
const round = [
  { id: "Q1", correct: true, skill: "jinyici", sectionType: "S" },   // same-question redo
  { id: "Q2", correct: true, skill: "jinyici", sectionType: "S" },   // unseen similar, right
  { id: "Q4", correct: false, skill: "jinyici", sectionType: "S" },  // unseen similar, wrong (also half weight)
  { id: "Q5", correct: true, skill: "liangci", sectionType: "S" },   // different skill
];
const qual = qualifyingHomeworkResults(prog, round, () => MISTAKE, NEXT_DAY, (r) => r.skill);
eq("only different, unseen, same-skill items qualify", qual.map((r) => r.id), ["Q2", "Q4"]);
const after = recordTrials(prog, qual, { mode: MODE.HOMEWORK, sessionNum: 5, setId: "PARENT_HW" });
const L = after.skillLedger.jinyici;
near("correct homework answer adds 0.5 first-try-correct", L.ftc, 0.5);
near("wrong homework answer adds 0.5 fail", L.fail, 0.5);
near("attempts = 2 x 0.5", L.att, 1);
eq("same-question redo left no ledger trace", after.skillLedger.liangci, undefined);
eq("trials carry the weight", after.trials.filter((t) => t.mode === "homework").map((t) => t.weight), [0.5, 0.5]);

// A normal daily-set answer keeps full weight and the identical theta step (regression guard for the locked ledger)
const daily = recordTrials({ trials: [], skillLedger: {} }, [{ id: "D1", correct: true, skill: "jinyici", sectionType: "S" }], { mode: MODE.EXAM, sessionNum: 1 });
near("daily answer: att 1, ftc 1", daily.skillLedger.jinyici.att + daily.skillLedger.jinyici.ftc, 2);
near("daily answer: theta 0.5 + 0.15*0.5", daily.skillLedger.jinyici.theta, 0.575);
const hwOnly = recordTrials({ trials: [], skillLedger: {} }, [{ id: "H1", correct: true, skill: "jinyici", sectionType: "S", weight: 0.5 }], { mode: MODE.HOMEWORK, sessionNum: 1 });
near("homework answer: half the theta step", hwOnly.skillLedger.jinyici.theta, 0.5 + 0.5 * 0.15 * 0.5);
// A stray weight on a non-homework mode is ignored
const stray = recordTrials({ trials: [], skillLedger: {} }, [{ id: "D2", correct: true, skill: "jinyici", weight: 0.1 }], { mode: MODE.EXAM, sessionNum: 1 });
near("weight is ignored outside homework mode", stray.skillLedger.jinyici.att, 1);

if (failed) { console.error(failed + " FAILED"); process.exit(1); }
console.log("ALL PASS");
