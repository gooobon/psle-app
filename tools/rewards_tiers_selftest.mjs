// Pure checks for parent-configured reward tiers, homework gate, SGD conversion and per-subject weekly bonus (issue #29).
// No network, no student data. Run: node tools/rewards_tiers_selftest.mjs
import { firstSetScore, tierCredits, dailyCreditPlan, homeworkGate, sgdToCredits, weeklySubjectCredits, ruleForDate, parseRuleVersion, pickRewardParent } from "../src/lib/rewards.js";

let failed = 0;
function eq(name, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) { failed++; console.error("FAIL", name, "\n  got ", a, "\n  want", e); } else console.log("ok", name);
}
const tiers = [{ minPct: 70, credits: 1 }, { minPct: 80, credits: 2 }, { minPct: 90, credits: 4 }];

// Threshold tiers
eq("highest matching tier wins (95%)", tierCredits(tiers, 95), 4);
eq("exactly on a threshold (80%)", tierCredits(tiers, 80), 2);
eq("between tiers (85%)", tierCredits(tiers, 85), 2);
eq("below all tiers = 0", tierCredits(tiers, 69), 0);
eq("no tiers = 0", tierCredits([], 100), 0);
eq("no score = 0", tierCredits(tiers, null), 0);
eq("79.9% rounds down, misses the 80% tier", firstSetScore({ first_set_questions: 1000, first_set_correct: 799 }), 79);

// First-set score is not changed by a later set (aggregates grow, first_set_* stay)
const afterFirst = { subject: "English", sets_completed: 1, questions_answered: 10, correct: 9, first_set_questions: 10, first_set_correct: 9 };
const afterSecond = { ...afterFirst, sets_completed: 2, questions_answered: 20, correct: 9 }; // bad second set
eq("first-set score 90", firstSetScore(afterFirst), 90);
eq("later set cannot change first-set score", firstSetScore(afterSecond), 90);
eq("legacy row, single set: totals are the first set", firstSetScore({ sets_completed: 1, questions_answered: 10, correct: 8 }), 80);
eq("legacy row, several sets: unknown, no credit", firstSetScore({ sets_completed: 2, questions_answered: 20, correct: 18 }), null);
eq("zero questions: no score", firstSetScore({ first_set_questions: 0, first_set_correct: 0, sets_completed: 1 }), null);
const rule = { enabled: true, sgdPerCredit: 0.5, dailyTiers: tiers, weeklyUnit: "credits", weeklyAmounts: { English: 3, Chinese: 2 } };
eq("daily plan is per subject with the first-set tier",
  dailyCreditPlan(rule, [afterSecond, { subject: "Chinese", sets_completed: 1, first_set_questions: 10, first_set_correct: 7 }]),
  [{ subject: "English", pct: 90, credits: 4 }, { subject: "Chinese", pct: 70, credits: 1 }]);
eq("disabled rule gives nothing", dailyCreditPlan({ ...rule, enabled: false }, [afterFirst]), []);

// Effective-date versions
const vers = [{ effective_from: "2026-11-20", n: 1 }, { effective_from: "2026-11-25", n: 2 }];
eq("before first version: none", ruleForDate(vers, "2026-11-19"), null);
eq("between versions: earlier one", ruleForDate(vers, "2026-11-24").n, 1);
eq("on effective day: new one", ruleForDate(vers, "2026-11-25").n, 2);
eq("past effective date rejected", !!parseRuleVersion({ effectiveFrom: "2026-11-18", sgdPerCredit: 1 }, "2026-11-19").error, true);
eq("today accepted", parseRuleVersion({ effectiveFrom: "2026-11-19", sgdPerCredit: 1, dailyTiers: [{ minPct: 80, credits: 2 }, { minPct: 50, credits: 1 }] }, "2026-11-19").rule.dailyTiers.map((t) => t.minPct), [50, 80]);
eq("duplicate tier rejected", !!parseRuleVersion({ sgdPerCredit: 1, dailyTiers: [{ minPct: 80, credits: 1 }, { minPct: 80, credits: 2 }] }, "2026-11-19").error, true);

// Homework gate
eq("unfinished homework blocks", homeworkGate([{ solved_at: "t" }, { solved_at: null }]), { eligible: false, assigned: 2, remaining: 1 });
eq("finished homework allows (wrong answers still count as done)", homeworkGate([{ solved_at: "t", correct: false }, { solved_at: "t", correct: true }]), { eligible: true, assigned: 2, remaining: 0 });
eq("none assigned = eligible", homeworkGate([]), { eligible: true, assigned: 0, remaining: 0 });

// Exchange rate
eq("S$1 at S$0.50/credit = 2", sgdToCredits(1, 0.5), 2);
eq("S$1.20 at S$0.50 rounds to 2", sgdToCredits(1.2, 0.5), 2);
eq("no rate set = 0 credits", sgdToCredits(5, 0), 0);
eq("Saturday reward in SGD converts at the rate", weeklySubjectCredits({ ...rule, weeklyUnit: "sgd", weeklyAmounts: { English: 3 } }, "English"), 6);
eq("Saturday reward in credits is used as is", weeklySubjectCredits(rule, "English"), 3);
eq("subject with no amount = 0", weeklySubjectCredits(rule, "Math"), 0);
eq("disabled rule = 0", weeklySubjectCredits({ ...rule, enabled: false }, "English"), 0);

// Weekly per-subject bonus, idempotent. Mirrors the DB unique (parent, child, kind, period, subject).
function award(ledger, subject, wk) {
  const credits = weeklySubjectCredits(rule, subject);
  const key = ["p", "c", "weekly", wk, subject].join("|");
  if (credits <= 0 || ledger.has(key)) return false;
  ledger.set(key, credits); return true;
}
const ledger = new Map();
eq("first subject earns its bonus", award(ledger, "English", "2026-11-16"), true);
eq("repeat of the same subject is a no-op", award(ledger, "English", "2026-11-16"), false);
eq("second subject earns a second bonus", award(ledger, "Chinese", "2026-11-16"), true);
eq("total is the sum of both subjects", [...ledger.values()].reduce((a, b) => a + b, 0), 5);
eq("next week is a new period", award(ledger, "English", "2026-11-23"), true);

// Parent choice (same rule as pickParentDailyTarget): earliest link with a rule
eq("earliest link with a rule wins", pickRewardParent([{ parent_id: "b", created_at: "2026-01-02" }, { parent_id: "a", created_at: "2026-01-03" }], ["a", "b"]), "b");
eq("link without a rule is skipped", pickRewardParent([{ parent_id: "b", created_at: "2026-01-02" }, { parent_id: "a", created_at: "2026-01-03" }], ["a"]), "a");

if (failed) { console.error(failed + " FAILED"); process.exit(1); }
console.log("ALL PASS");
