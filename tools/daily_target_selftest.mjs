// Pure checks for the student daily-target merge. No network, no student data.
import { dailyGoalMet, dailySetGoal, pickParentDailyTarget, resolveDailyTarget } from "../src/lib/activity.js";

let failed = 0;
function eq(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) { failed++; console.error("FAIL", name, "\n  got ", a, "\n  want", e); }
  else console.log("ok", name);
}

eq("missing raw is 1 per subject", resolveDailyTarget(null), { English: 1, Chinese: 1, Math: 1, Science: 1 });
eq("partial override keeps the other defaults", resolveDailyTarget({ English: 3, Chinese: "2" }), { English: 3, Chinese: 2, Math: 1, Science: 1 });
eq("zero is kept", resolveDailyTarget({ English: 0 }).English, 0);
eq("clamp 0 to 10", resolveDailyTarget({ English: 99, Chinese: -4 }).English, 10);
eq("clamp floor", resolveDailyTarget({ Chinese: -4 }).Chinese, 0);
eq("junk subject is ignored", resolveDailyTarget({ English: "nope" }).English, 1);
eq("round half up", resolveDailyTarget({ Math: 1.5 }).Math, 2);
eq("unknown goal is 1", dailySetGoal(undefined), 1);
eq("explicit zero goal", dailySetGoal(0), 0);
eq("one set met", dailyGoalMet(1, 1), true);
eq("one set not met", dailyGoalMet(0, 1), false);
eq("zero target is not marked done", dailyGoalMet(0, 0), false);
eq("three sets need three", [dailyGoalMet(2, 3), dailyGoalMet(3, 3)], [false, true]);

const early = { parent_id: "p-early", created_at: "2026-01-01T00:00:00Z" };
const late = { parent_id: "p-late", created_at: "2026-06-01T00:00:00Z" };
eq("no parents uses the default", pickParentDailyTarget([], []).English, 1);
eq("earliest parent wins", pickParentDailyTarget(
  [late, early],
  [{ parent_id: "p-late", daily_target: { English: 4 } }, { parent_id: "p-early", daily_target: { English: 2, Chinese: 3 } }],
), { English: 2, Chinese: 3, Math: 1, Science: 1 });
eq("skip a parent with no settings row", pickParentDailyTarget(
  [early, late],
  [{ parent_id: "p-late", daily_target: { English: 5 } }],
).English, 5);

if (failed) { console.error(failed + " failed"); process.exit(1); }
console.log("ALL PASS");
