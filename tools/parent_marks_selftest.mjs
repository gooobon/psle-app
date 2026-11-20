// Self-test for "parent marks count in the paper score" (issue #62). Run: node tools/parent_marks_selftest.mjs
// Pure score maths + the settle step against an in-memory Supabase stand-in (no network, no database) + static checks on the migration.
import { register } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
register("./exam_loader.mjs", import.meta.url);
const X = await import("../src/lib/examScore.js");
let n = 0, bad = 0;
const ok = async (name, fn) => { n++; try { await fn(); console.log("PASS", name); } catch (e) { bad++; console.log("FAIL", name, "\n ", String(e.message).split("\n")[0]); } };

await ok("nothing marked: score stays the auto score and the open items are pending", () => {
  const s = X.attemptScore({ score: 2, total: 36, open_total: 4 });
  assert.deepEqual([s.score, s.total, s.pending, s.settled], [2, 36, 4, false]);
  assert.equal(X.scoreText({ score: 2, total: 36, open_total: 4 }), "2/36 + 4 awaiting parent marking");
});
await ok("each mark adds 1 to the total, and 1 to the score if correct", () => {
  const s = X.attemptScore({ score: 2, total: 36, open_total: 4, parent_marked: 2, parent_right: 1 });
  assert.deepEqual([s.score, s.total, s.pending, s.settled], [3, 38, 2, false]);
  assert.equal(X.scoreText({ score: 2, total: 36, open_total: 4, parent_marked: 2, parent_right: 1 }), "3/38 + 2 awaiting parent marking");
});
await ok("all marked: final score and percentage", () => {
  const s = X.attemptScore({ score: 2, total: 36, open_total: 4, parent_marked: 4, parent_right: 3 });
  assert.deepEqual([s.score, s.total, s.pending, s.settled, s.pct], [5, 40, 0, true, 13]);
  assert.equal(X.scoreText({ score: 2, total: 36, open_total: 4, parent_marked: 4, parent_right: 3 }), "5/40");
});
await ok("a paper with no open-ended items is settled at hand-in", () => {
  const s = X.attemptScore({ score: 30, total: 40, open_total: 0 });
  assert.deepEqual([s.score, s.total, s.pending, s.settled, s.pct], [30, 40, 0, true, 75]);
});
await ok("counters can never exceed the paper (bad data is clamped)", () => {
  const s = X.attemptScore({ score: 1, total: 2, open_total: 2, parent_marked: 9, parent_right: 9 });
  assert.deepEqual([s.score, s.total, s.pending], [3, 4, 0]);
});
await ok("API shape (camelCase) reads the same as the row", () => {
  const s = X.attemptScore({ autoScore: 2, autoTotal: 36, openTotal: 4, parentMarked: 4, parentRight: 4 });
  assert.deepEqual([s.score, s.total], [6, 40]);
});

// ── settleAttempt against an in-memory database ────────────────────────────────────────────────────────────────────────────
function fakeDb(seed) {
  const t = JSON.parse(JSON.stringify(seed)); const log = [];
  class Q {
    constructor(name) { this.name = name; this.f = []; this.op = "select"; this.patch = null; }
    select() { return this; } eq(k, v) { this.f.push((r) => r[k] === v); return this; } is(k, v) { this.f.push((r) => (r[k] ?? null) === v); return this; }
    update(p) { this.op = "update"; this.patch = p; return this; } upsert(rows) { this.op = "upsert"; this.rows = rows; return this; }
    rows_() { return (t[this.name] || []).filter((r) => this.f.every((f) => f(r))); }
    run() {
      if (this.op === "update") { const hit = this.rows_(); hit.forEach((r) => Object.assign(r, this.patch)); log.push(["update", this.name, this.patch]); return { data: hit, error: null }; }
      if (this.op === "upsert") { t[this.name] = t[this.name] || []; for (const r of this.rows) t[this.name].push({ ...r }); log.push(["upsert", this.name, this.rows.length]); return { data: null, error: null }; }
      return { data: this.rows_(), error: null };
    }
    maybeSingle() { const r = this.run(); return Promise.resolve({ data: (r.data || [])[0] || null, error: r.error }); }
    then(res, rej) { return Promise.resolve(this.run()).then(res, rej); }
  }
  return { t, log, from: (n2) => new Q(n2), rpc: async (name, args) => { log.push(["rpc", name, args]); return { data: { awarded: true }, error: null }; } };
}
const AID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", SID = "22222222-2222-2222-2222-222222222222";
const seed = () => ({
  exam_attempts: [{ id: AID, student_id: SID, subject: "English", paper_id: "p1", status: "submitted", score: 2, total: 36, open_total: 4, parent_marked: 0, parent_right: 0, settled_at: null, sgt_day: "2026-11-21", counts: true, submitted_at: "2026-11-21T03:00:00Z", grade: "P3" }],
  exam_answers: ["q1", "q2", "q3", "q4"].map((q) => ({ attempt_id: AID, question_id: q, correct: null, parent_correct: null })).concat([{ attempt_id: AID, question_id: "q0", correct: true, parent_correct: null }]),
  learning_trials: [],
});
// Real settle code with the reward and trial writers replaced by recorders (they are covered by exam_selftest.mjs).
const src = fs.readFileSync(new URL("../src/lib/examPostSubmit.js", import.meta.url), "utf8");
const i = src.indexOf("export async function settleAttempt");
const body = src.slice(i).replace("export async function settleAttempt", "async function settleAttempt");
const calls = { trials: 0, rewards: [] };
const settle = new Function("attemptScore", "recordMockTrials", "awardPaperReward", body + "\nreturn settleAttempt;")(
  X.attemptScore, async (_a, _b, g) => { calls.trials++; calls.rows = g.rows; return { recorded: g.rows.length }; }, async (_a, o) => { calls.rewards.push(o); return { awarded: true }; });
const mark = (db, q, v) => { db.t.exam_answers.find((r) => r.question_id === q).parent_correct = v; };

await ok("first marks update the counters; nothing settles, no trials, no credit yet", async () => {
  const db = fakeDb(seed()); mark(db, "q1", true); mark(db, "q2", false);
  const r = await settle(db, AID);
  const a = db.t.exam_attempts[0];
  assert.ok(r.ok && !r.settledNow && r.pending === 2);
  assert.deepEqual([a.parent_marked, a.parent_right, a.settled_at, a.final_score], [2, 1, null, undefined]);
  assert.equal(calls.trials, 0); assert.equal(calls.rewards.length, 0);
});
await ok("the last mark settles once: final score 5/40, trials for every item, credit from the final percentage", async () => {
  const db = fakeDb(seed()); mark(db, "q1", true); mark(db, "q2", true); mark(db, "q3", true); mark(db, "q4", false);
  const r = await settle(db, AID);
  const a = db.t.exam_attempts[0];
  assert.ok(r.ok && r.settledNow);
  assert.deepEqual([a.parent_marked, a.parent_right, a.final_score, a.final_total], [4, 3, 5, 40]);
  assert.ok(a.settled_at);
  assert.equal(calls.trials, 1);
  assert.deepEqual(calls.rows.map((x) => [x.id, x.correct]).sort().join(), "q0,true,q1,true,q2,true,q3,true,q4,false");
  assert.equal(calls.rewards.length, 1); assert.equal(calls.rewards[0].scorePct, 13); assert.equal(calls.rewards[0].day, "2026-11-21");
});
await ok("changing a mark afterwards updates the final score but never repeats trials or the credit", async () => {
  const db = fakeDb(seed()); ["q1", "q2", "q3", "q4"].forEach((q) => mark(db, q, false));
  await settle(db, AID);
  const before = [calls.trials, calls.rewards.length];
  mark(db, "q4", true);
  const r = await settle(db, AID);
  const a = db.t.exam_attempts[0];
  assert.ok(r.ok && !r.settledNow);
  assert.deepEqual([a.final_score, a.final_total], [3, 40]);
  assert.deepEqual([calls.trials, calls.rewards.length], before);
});
await ok("a paper with no open items is never touched by settle (it settled at hand-in)", async () => {
  const s0 = seed(); s0.exam_attempts[0].open_total = 0; s0.exam_answers = [];
  const db = fakeDb(s0); const b = [calls.trials, calls.rewards.length];
  const r = await settle(db, AID);
  assert.ok(r.ok && !r.settledNow); assert.deepEqual([calls.trials, calls.rewards.length], b);
});

await ok("migration is a new additive file after 20261201 and never edits older files", () => {
  const f = "supabase/migrations/20261202000000_parent_marks_score.sql";
  const sql = fs.readFileSync(new URL("../" + f, import.meta.url), "utf8");
  assert.ok(/add column if not exists parent_marked/.test(sql) && /add column if not exists parent_right/.test(sql) && /add column if not exists settled_at/.test(sql) && /final_score/.test(sql) && /final_total/.test(sql));
  assert.ok(!/drop (table|column)|delete from|truncate/i.test(sql.replace(/--.*$/gm, "")), "nothing is dropped or deleted");
  const files = fs.readdirSync(new URL("../supabase/migrations/", import.meta.url)).sort();
  assert.equal(files[files.length - 1], "20261202000000_parent_marks_score.sql");
});
await ok("wiring: student hand-in defers trials/credit while items are open; parent route settles after each mark", () => {
  const s = fs.readFileSync(new URL("../src/app/api/student/exam/route.js", import.meta.url), "utf8");
  assert.ok(/const waiting = g\.ungraded > 0/.test(s) && /awaiting_parent_marking/.test(s));
  const p = fs.readFileSync(new URL("../src/app/api/parent/exam/route.js", import.meta.url), "utf8");
  assert.ok(/settleAttempt\(admin, attemptId\)/.test(p) && /attemptScore\(a\)/.test(p));
});
console.log(`\nparent_marks_selftest: ${n - bad} pass / ${bad} fail`);
process.exit(bad ? 1 : 0);
