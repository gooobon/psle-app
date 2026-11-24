// Offline check for generated English item levels and the Assign practice filters on real data. No network, no database.
// Run: node tools/english_levels_selftest.mjs
import { register } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
register("./exam_loader.mjs", import.meta.url);
const { WA1_PRACTICE_SETS } = await import("../src/data/p3/english/wa1_practice.ts");
const { indexSets } = await import("../src/lib/reviewRounds.js");
const { getTagIndex } = await import("../src/lib/taxonomyLookup.js");
const { skillIdsOf } = await import("../src/lib/similarItemsCore.js");
const { itemLevel, planAssignments, emptyReason } = await import("../src/lib/assignFilters.js");
const { buildLevels, distribution } = await import("./difficulty/english_levels.mjs");
const LEVELS = JSON.parse(fs.readFileSync(new URL("../src/data/p3/english/difficulty.json", import.meta.url), "utf8"));
let n = 0; const ok = (name, fn) => { fn(); n++; console.log("PASS", name); };

ok("committed difficulty.json matches the generator", () => assert.deepEqual(buildLevels(WA1_PRACTICE_SETS), LEVELS));
ok("spread is roughly 30/45/25", () => {
  const d = distribution(LEVELS), t = Object.keys(LEVELS).length;
  assert.ok(Math.abs(d.foundation / t - 0.30) < 0.02 && Math.abs(d.core / t - 0.45) < 0.02 && Math.abs(d.stretch / t - 0.25) < 0.02, JSON.stringify(d));
});

const runnable = indexSets(WA1_PRACTICE_SETS).byId, idx = getTagIndex();
const pool = [];
for (const id of Object.keys(idx.byId)) {
  if (!runnable[id]) continue;
  const row = idx.byId[id], sk = skillIdsOf(row.conceptIds);
  if (!sk.length) continue;
  const lv = itemLevel(row.item, row.conceptIds, { items: {}, concepts: {} }, null, LEVELS[id]);
  pool.push({ id, skills: sk, level: lv.level, estimated: lv.estimated, stem: id });
}
ok("pool is non-trivial", () => assert.ok(pool.length > 1000, String(pool.length)));
ok(">= 95% of runnable English items have a level (no stats at all)", () => {
  const rated = pool.filter((p) => p.level).length;
  assert.ok(rated / pool.length >= 0.95, `${rated}/${pool.length}`);
});
ok("content levels are not marked estimated", () => assert.ok(pool.every((p) => p.estimated === false)));
ok("real first-try rate beats content level", () => {
  const id = pool[0].id;
  assert.equal(itemLevel({ id }, [], { items: { [id]: { n: 12, rate: 0.1 } }, concepts: {} }, null, "foundation").level, "harder");
  assert.equal(itemLevel({ id }, [], { items: { [id]: { n: 3, rate: 0.1 } }, concepts: {} }, null, "foundation").level, "easier");
});
// A sample skill that has all three levels; the source mistake is a different item of that skill.
const bySkill = {};
pool.forEach((p) => p.skills.forEach((s) => ((bySkill[s] = bySkill[s] || []).push(p))));
const skill = Object.keys(bySkill).find((s) => ["easier", "same", "harder"].every((l) => bySkill[s].filter((p) => p.level === l).length >= 2));
ok("a sample skill has all three levels", () => assert.ok(skill));
for (const d of ["easier", "same", "harder"]) {
  ok(`${d} returns at least 1 English item for ${skill}`, () => {
    const src = bySkill[skill][0];
    const r = planAssignments(pool, [{ id: src.id, skills: [skill] }], { skills: [skill], difficulty: d, perSkill: 3 });
    assert.ok(r.rows.length >= 1 && r.rows.every((x) => x.level === d));
  });
}
ok("empty reasons name the cause", () => {
  assert.match(emptyReason({ skill: 0 }, "same"), /No other runnable/);
  assert.match(emptyReason({ skill: 5, afterSolved: 0 }, "same"), /solved correctly/);
  assert.match(emptyReason({ skill: 5, afterSolved: 5, afterPending: 0 }, "same"), /already assigned/);
  assert.match(emptyReason({ skill: 5, afterSolved: 5, afterPending: 5, afterDifficulty: 0 }, "harder"), /rated Harder/);
  const src = bySkill[skill][0];
  const r = planAssignments(pool, [{ id: src.id, skills: [skill] }], { skills: [skill], difficulty: "easier", solved: pool.map((p) => p.id) });
  assert.equal(r.rows.length, 0);
  assert.match(emptyReason(r.funnel, "easier"), /solved correctly/);
});
console.log(`english_levels_selftest: ${n} passed`);
