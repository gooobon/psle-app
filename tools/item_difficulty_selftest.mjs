// Offline check for item difficulty levels. Run: node tools/item_difficulty_selftest.mjs
import assert from "node:assert/strict";
import { levelFromTag, levelFromRate, itemLevel, levelReport, easyWarning } from "../src/lib/itemDifficulty.js";
let n = 0; const ok = (name, fn) => { fn(); n++; console.log("PASS", name); };
ok("tags map to levels", () => { assert.equal(levelFromTag("foundation"), "easy"); assert.equal(levelFromTag("Core"), "medium"); assert.equal(levelFromTag("stretch"), "hard"); assert.equal(levelFromTag("x"), null); });
ok("rate thresholds 80 / 50", () => { assert.equal(levelFromRate(80), "easy"); assert.equal(levelFromRate(79), "medium"); assert.equal(levelFromRate(50), "medium"); assert.equal(levelFromRate(49), "hard"); assert.equal(levelFromRate(null), null); });
ok("tag wins and is not estimated", () => { const r = itemLevel({ tag: "stretch", itemStat: { attempts: 50, first_try: 50 } }); assert.deepEqual(r, { level: "hard", estimated: false, source: "tag" }); });
ok("item stat used at 10+ attempts, marked estimated", () => { const r = itemLevel({ itemStat: { attempts: 10, first_try: 9 } }); assert.equal(r.level, "easy"); assert.equal(r.estimated, true); });
ok("falls back to skill under 10 attempts", () => { const r = itemLevel({ itemStat: { attempts: 9, first_try: 9 }, skillStat: { attempts: 100, first_try: 40 } }); assert.equal(r.level, "hard"); assert.equal(r.source, "skill"); });
ok("no data: unrated", () => { assert.equal(itemLevel({}).level, null); });
ok("report counts by level and skill", () => {
  const rows = [{ item_id: "a", skill: "s1", first_try: true }, { item_id: "a", skill: "s1", first_try: false }, { item_id: "b", skill: "s2", first_try: true }, { item_id: "z", skill: "s2", first_try: true }];
  const r = levelReport(rows, { a: { attempts: 20, first_try: 18 }, b: { attempts: 20, first_try: 5 } }, {});
  assert.deepEqual(r.overall.easy, { n: 2, firstTry: 50 }); assert.deepEqual(r.overall.hard, { n: 1, firstTry: 100 }); assert.equal(r.unrated, 1); assert.equal(r.estimated, true);
});
ok("easy-only high score triggers warning", () => {
  const rows = Array.from({ length: 10 }, (_, i) => ({ item_id: "i" + i, skill: "s", first_try: true, tag: i < 9 ? "foundation" : "stretch" }));
  assert.equal(levelReport(rows).warning, true);
});
ok("no warning when easy share <= 70 or accuracy < 85", () => {
  assert.equal(easyWarning({ easy: { n: 7, firstTry: 100 }, medium: { n: 3, firstTry: 100 }, hard: { n: 0, firstTry: null } }), false);
  assert.equal(easyWarning({ easy: { n: 9, firstTry: 80 }, medium: { n: 1, firstTry: 100 }, hard: { n: 0, firstTry: null } }), false);
  assert.equal(easyWarning({ easy: { n: 0, firstTry: null }, medium: { n: 0, firstTry: null }, hard: { n: 0, firstTry: null } }), false);
});
console.log(`ALL PASS (${n} checks)`);
