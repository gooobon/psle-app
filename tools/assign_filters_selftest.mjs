// Pure checks for parent "assign practice" filters and exclusions. No network. Run: node tools/assign_filters_selftest.mjs
import { levelFromRate, itemLevel, planAssignments, recentMissedSkills, clampPerSkill, toRequestItems, aggregateTrialStats, stemPreview } from "../src/lib/assignFilters.js";

let failed = 0;
function eq(name, a, e) {
  const x = JSON.stringify(a), y = JSON.stringify(e);
  if (x !== y) { failed++; console.error("FAIL", name, "\n  got ", x, "\n  want", y); } else console.log("ok", name);
}

eq("rate 0.8 easier", levelFromRate(0.8), "easier");
eq("rate 0.79 same", levelFromRate(0.79), "same");
eq("rate 0.5 same", levelFromRate(0.5), "same");
eq("rate 0.49 harder", levelFromRate(0.49), "harder");
eq("rate missing", levelFromRate(undefined), null);
eq("clamp low/high/default", [clampPerSkill(0), clampPerSkill(99), clampPerSkill("x")], [1, 10, 3]);

const stats = { items: { a: { n: 12, rate: 0.9 }, b: { n: 3, rate: 0.1 } }, concepts: { k: { n: 40, rate: 0.6 } } };
eq("tag wins, not estimated", itemLevel({ id: "a", difficulty: "stretch" }, ["k"], stats), { level: "harder", estimated: false });
eq("item rate with >=10 attempts", itemLevel({ id: "a" }, ["k"], stats), { level: "easier", estimated: true });
eq("item <10 attempts uses concept", itemLevel({ id: "b" }, ["k"], stats), { level: "same", estimated: true });
eq("no data unrated", itemLevel({ id: "z" }, ["q"], stats), { level: null, estimated: true });

const agg = aggregateTrialStats([
  { item_id: "x", skill: "k", first_try: true }, { item_id: "x", skill: "k", first_try: false },
  { item_id: "y", skill: "k", first_try: true },
]);
eq("aggregate", [agg.items.x, agg.concepts.k], [{ n: 2, rate: 0.5 }, { n: 3, rate: 2 / 3 }]);

const now = Date.parse("2026-11-24T00:00:00Z");
const ms = [
  { id: "m1", s: ["k"], sessionDate: "2026-11-20T00:00:00Z" },
  { id: "m2", s: ["old"], sessionDate: "2026-10-01T00:00:00Z" },
  { id: "m3", s: ["k", "j"], sessionDate: "2026-11-23T00:00:00Z" },
];
eq("recent missed skills (14d)", recentMissedSkills(ms, (m) => m.s, now, 14), ["k", "j"]);

const pool = [
  { id: "p1", skills: ["k"], level: "easier", estimated: true, stem: "one" },
  { id: "p2", skills: ["k"], level: "harder", estimated: false, stem: "two" },
  { id: "p3", skills: ["k"], level: "same", estimated: true, stem: "three" },
  { id: "p4", skills: ["k"], level: "same", estimated: true, stem: "four" },
  { id: "p5", skills: ["j"], level: "same", estimated: true, stem: "five" },
  { id: "m1", skills: ["k"], level: "same", estimated: true, stem: "source itself" },
];
const sources = [{ id: "m1", skills: ["k"] }, { id: "m3", skills: ["j"] }];
const base = { skills: ["k", "j"], difficulty: "mixed", perSkill: 2 };
eq("per-skill count + source", planAssignments(pool, sources, base).rows.map((r) => [r.id, r.source, r.skill]),
  [["p1", "m1", "k"], ["p2", "m1", "k"], ["p5", "m3", "j"]]);
eq("difficulty filter", planAssignments(pool, sources, { ...base, difficulty: "same" }).rows.map((r) => r.id), ["p3", "p4", "p5"]);
eq("exclude solved + pending", planAssignments(pool, sources, { ...base, solved: ["p1"], pending: new Set(["p2"]) }).rows.map((r) => r.id), ["p3", "p4", "p5"]);
eq("never the source mistake", planAssignments(pool, sources, { ...base, perSkill: 10 }).rows.some((r) => r.id === "m1"), false);
const capd = planAssignments(pool, sources, { ...base, perSkill: 10, total: 2 });
eq("total cap", [capd.rows.length, capd.capped], [2, true]);
eq("skill without a source mistake skipped", planAssignments(pool, sources, { skills: ["nope"], perSkill: 3 }).rows, []);
eq("request items", toRequestItems([{ id: "p1", source: "m1" }], "English"), [{ subject: "English", question_id: "p1", source_question_id: "m1" }]);
eq("stem preview 60 chars", stemPreview("x".repeat(80)).length, 63);

if (failed) { console.error(failed + " failed"); process.exit(1); }
console.log("assign_filters_selftest: all pass");
