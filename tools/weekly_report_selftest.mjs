// Weekly parent report (issue #55): allow-list, weekly dedupe, fallback window, send-now auth, dry-run claim, content. Run: node tools/weekly_report_selftest.mjs
// Fake in-memory Supabase-ish admin + fake dispatch: no network, no real addresses (example.test only).
import assert from "node:assert/strict";
import { sendPolicy, recipientDecision, parseAllowList, fallbackWindow, weekKey, bearerOk, deliverWeekly, runFallback, sendForChild, trialForParent, summariseChild, daysSoFar } from "../src/lib/notify/weeklyReport.mjs";
import { renderWeeklyEmail } from "../src/lib/notify/emailTemplate.mjs";

let n = 0; const ok = async (name, fn) => { await fn(); n++; console.log("PASS", name); };
const SAT_EVENING = new Date("2026-11-21T14:00:00Z"); // Sat 21 Nov 2026 22:00 SGT
const SAT_NOON = new Date("2026-11-21T04:00:00Z");    // Sat 12:00 SGT
const SUN_AM = new Date("2026-11-21T23:30:00Z");      // Sun 22 Nov 07:30 SGT
const WED = new Date("2026-11-18T13:00:00Z");         // Wed 21:00 SGT
const NEXT_SAT = new Date("2026-11-28T04:00:00Z");
const SUN_EVE = new Date("2026-11-22T12:30:00Z");     // Sun 22 Nov 20:30 SGT (the send time since #116)
const NEXT_SUN_EVE = new Date("2026-11-29T12:30:00Z");

// Fake admin: tables as arrays. Supports the handful of query shapes weeklyReport.mjs uses.
function fakeAdmin({ parents, links = {}, settings = {}, confirmedIds }) {
  const alert = [];
  const q = (table, rowsFn) => {
    const f = []; let upd = null;
    const api = {
      select: () => api, eq: (c, v) => { f.push((r) => r[c] === v); return api; },
      maybeSingle: async () => ({ data: rowsFn().filter((r) => f.every((x) => x(r)))[0] || null }),
      then: (res) => res({ data: rowsFn().filter((r) => f.every((x) => x(r))) }),
    };
    return api;
  };
  return {
    alert,
    from(t) {
      if (t === "profiles") return q(t, () => parents);
      if (t === "parent_settings") return q(t, () => Object.entries(settings).map(([parent_id, alert_channels]) => ({ parent_id, alert_channels })));
      if (t === "parent_child") return q(t, () => Object.entries(links).flatMap(([p, cs]) => cs.map((c) => ({ parent_id: p, child_id: c }))));
      if (t === "alert_log") return {
        insert: async (row) => (alert.find((a) => a.parent_id === row.parent_id && a.date === row.date && a.channel === row.channel) ? { error: { code: "23505" } } : (alert.push({ ...row }), { error: null })),
        upsert: async (row) => { const i = alert.findIndex((a) => a.parent_id === row.parent_id && a.date === row.date && a.channel === row.channel); if (i < 0) alert.push({ ...row }); return { error: null }; },
        update: (patch) => { const f = []; const api = { eq: (c, v) => { f.push((r) => r[c] === v); return api; }, select: async () => { const hit = alert.filter((r) => f.every((x) => x(r))); hit.forEach((r) => Object.assign(r, patch)); return { data: hit }; }, then: (res) => { alert.filter((r) => f.every((x) => x(r))).forEach((r) => Object.assign(r, patch)); return res({ error: null }); } }; return api; },
      };
      throw new Error("unexpected table " + t);
    },
    auth: { admin: { getUserById: async (id) => ({ data: { user: { email_confirmed_at: confirmedIds.includes(id) ? "x" : null } } }) } },
  };
}
const P = (id, email) => ({ id, display_name: "P" + id, email, role: "parent" });
const parents = [P("p1", "owner@example.test"), P("p2", "other@example.test"), P("p3", "third@example.test")];
const mk = () => fakeAdmin({ parents, links: { p1: ["c1"], p2: ["c1"], p3: ["c2"] },
  settings: Object.fromEntries(parents.map((p) => [p.id, [{ type: "email", enabled: true }]])), confirmedIds: ["p1", "p2", "p3"] });
const sent = []; const deps = {
  buildPayload: async (_a, p) => ({ parentName: p.display_name, weekStart: "2026-11-16", weekEnd: "2026-11-22", dashboardUrl: "https://example.test/", children: [{ name: "K", subjects: [], wrong: { total: 0, untagged: 0, byCause: {} } }] }),
  dispatch: async (ch, payload, o) => { if (o.dryRun) return [{ type: "email", status: "dry-run" }]; sent.push(ch[0].address); return [{ type: "email", status: "sent" }]; },
};
const ON = { EMAIL_ALERTS_ENABLED: "true" };
const resetSent = () => { sent.length = 0; };

await ok("allow-list parsing: trims, lowercases, drops junk", () => {
  const s = parseAllowList(" A@Example.test, bad ,b@example.test;;"); assert.deepEqual([...s].sort(), ["a@example.test", "b@example.test"]);
});
await ok("precedence: flag off => dry run for everyone when no list; list still filters", () => {
  assert.equal(recipientDecision(sendPolicy({}), "x@example.test").allowed, true);
  assert.equal(recipientDecision(sendPolicy({ ALERT_TEST_RECIPIENTS: "a@example.test" }), "x@example.test").allowed, false);
});
await ok("precedence: flag on + no list + no allow-all => fail closed", () => {
  assert.equal(recipientDecision(sendPolicy(ON), "x@example.test").reason, "no_allow_list_fail_closed");
  assert.equal(recipientDecision(sendPolicy({ ...ON, ALERT_TEST_RECIPIENTS: "" }), "x@example.test").allowed, false); // set but empty = nobody
  assert.equal(recipientDecision(sendPolicy({ ...ON, ALERT_ALLOW_ALL_PARENTS: "true" }), "x@example.test").allowed, true);
});
await ok("allow-list: only listed parent is emailed, others skipped (cron fallback)", async () => {
  resetSent(); const a = mk();
  const env = { ...ON, ALERT_TEST_RECIPIENTS: "Owner@example.test" };
  const sum = await runFallback(a, { env, now: SUN_EVE, deps });
  assert.deepEqual(sent, ["owner@example.test"].map((x) => x)); // channel address falls back to profile email
  assert.equal(sum.sent, 1); assert.equal(sum.skippedAllowList, 2); assert.deepEqual(sum.skippedAllowListParentIds.sort(), ["p2", "p3"]);
  assert.equal(a.alert.length, 1); // skipped parents get no claim, so a later list change can still send
});
await ok("Saturday event trigger is a no-op (weekly email is Sunday evening)", async () => {
  resetSent(); const a = mk();
  const sum = await sendForChild(a, "c1", { env: { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" }, now: SAT_NOON, deps });
  assert.equal(sum.noop, true); assert.equal(sent.length, 0); assert.equal(a.alert.length, 0);
});
await ok("weekly dedupe: Saturday events + Sunday evening runs + retry => ONE send per parent", async () => {
  resetSent(); const a = mk(); const env = { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" };
  await sendForChild(a, "c1", { env, now: SAT_NOON, deps });
  await runFallback(a, { env, now: SAT_EVENING, deps });          // Saturday night: too early, no-op
  await runFallback(a, { env, now: SUN_EVE, deps });
  await runFallback(a, { env, now: new Date(SUN_EVE.getTime() + 600000), deps }); // retry
  assert.equal(sent.length, 1);
  assert.equal(a.alert.filter((r) => r.channel === "email_weekly").length, 1);
  assert.equal(a.alert[0].date, "2026-11-16"); // keyed by Monday of the SGT week
  await runFallback(a, { env, now: NEXT_SUN_EVE, deps });         // next week sends again
  assert.equal(sent.length, 2);
});
await ok("failed send (status error) can be retried by the fallback", async () => {
  resetSent(); const a = mk(); const env = { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" };
  const bad = { ...deps, dispatch: async () => [{ type: "email", status: "error", error: "provider HTTP 500" }] };
  await runFallback(a, { env, now: SUN_EVE, deps: bad });
  assert.equal(a.alert[0].status, "error");
  await runFallback(a, { env, now: SUN_EVE, deps });
  assert.equal(sent.length, 1); assert.equal(a.alert[0].status, "sent");
});
await ok("fallback no-ops on the wrong day/time", async () => {
  for (const d of [WED, SAT_NOON, SAT_EVENING, SUN_AM, new Date("2026-11-16T13:00:00Z")]) { // Wed, Sat, Sun 07:30 (too early), Mon
    const a = mk(); resetSent();
    const sum = await runFallback(a, { env: { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" }, now: d, deps });
    assert.equal(sum.noop, true); assert.equal(sent.length, 0); assert.equal(a.alert.length, 0);
  }
  assert.equal(fallbackWindow(SUN_EVE).window, "sunday_evening");
});
await ok("event trigger no-ops off Saturday", async () => {
  resetSent(); const sum = await sendForChild(mk(), "c1", { env: { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" }, now: WED, deps });
  assert.equal(sum.noop, true); assert.equal(sent.length, 0);
});
await ok("flag off: dry run, nothing sent, NO alert_log claim, later real send still goes out", async () => {
  resetSent(); const a = mk();
  const off = await runFallback(a, { env: {}, now: SUN_EVE, deps });
  assert.equal(off.dryRun, 3); assert.equal(sent.length, 0); assert.equal(a.alert.length, 0);
  const real = await deliverWeekly(a, parents[0], { env: { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" }, now: SUN_EVE, deps });
  assert.equal(real.status, "sent");
});
await ok("explicit dryRun with flag on: no claim", async () => {
  resetSent(); const a = mk();
  const r = await deliverWeekly(a, parents[0], { env: { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" }, now: SAT_NOON, dryRun: true, deps });
  assert.equal(r.status, "dry-run"); assert.equal(a.alert.length, 0); assert.equal(sent.length, 0);
});
await ok("send-now: real trial needs allow-list; uses trial channel, never the real week claim", async () => {
  resetSent(); const a = mk();
  assert.equal((await trialForParent(a, { parentId: "p1", dryRun: false }, { env: ON, now: WED, deps })).reason, "trial_send_requires_allow_list");
  const env = { ...ON, ALERT_TEST_RECIPIENTS: "owner@example.test" };
  assert.equal((await trialForParent(a, { parentId: "p2", dryRun: false }, { env, now: WED, deps })).reason, "not_on_allow_list");
  assert.equal((await trialForParent(a, { parentId: "p1" }, { env, now: WED, deps })).status, "dry-run"); // default is dry run
  assert.equal(sent.length, 0);
  assert.equal((await trialForParent(a, { email: "OWNER@example.test", dryRun: false }, { env, now: WED, deps })).status, "sent");
  assert.deepEqual(a.alert.map((r) => r.channel), ["email_weekly_trial"]);
  assert.equal((await runFallback(a, { env, now: SUN_EVE, deps })).sent, 1); // the real weekly claim is untouched
  assert.equal((await trialForParent(a, { parentId: "nope" }, { env, deps })).reason, "no_such_parent");
});
await ok("send-now / cron auth: Bearer, fail closed", () => {
  assert.equal(bearerOk("Bearer s3cret", "s3cret"), true);
  assert.equal(bearerOk("Bearer wrong", "s3cret"), false);
  assert.equal(bearerOk("s3cret", "s3cret"), false);
  assert.equal(bearerOk("", "s3cret"), false);
  assert.equal(bearerOk("Bearer ", ""), false);        // secret unset => always 401
  assert.equal(bearerOk("Bearer undefined", undefined), false);
});
await ok("week key / days", () => {
  assert.equal(weekKey(SAT_EVENING), "2026-11-16"); assert.equal(weekKey(SUN_AM), "2026-11-16");
  assert.equal(daysSoFar(WED).length, 3);
});
await ok("summariseChild: sets vs target, accuracy, causes (no invention), homework, credits, paper", () => {
  const days = daysSoFar(SAT_EVENING);
  const c = summariseChild({
    profile: { display_name: "K", grade: "P3" }, days,
    activity: [{ date: "2026-11-16", subject: "English", sets_completed: 1, questions_answered: 10, correct: 8, minutes: 12, first_set_questions: 10, first_set_correct: 8 }, { date: "2026-11-17", subject: "English", sets_completed: 2, questions_answered: 20, correct: 10, minutes: 20, first_set_questions: 10, first_set_correct: 6 }],
    wrong: [{ cause: "misread" }, { cause: "misread" }, { cause: null }],
    homework: [{ solved_at: "x" }, { solved_at: null }],
    credits: [{ status: "confirmed", credits: 10, sgd_per_credit: 0.5 }, { status: "pending", credits: 2 }, { status: "forfeited", credits: 3 }],
    papers: [{ status: "submitted", paper_label: "Paper A", score: 30, total: 40, counts: true, open_total: 2 }, { status: "in_progress", paper_label: "B" }],
  });
  const en = c.subjects.find((s) => s.name === "English");
  assert.deepEqual([en.sets, en.target, en.daysMet, en.daysTracked], [3, 6, 2, 6]);
  assert.deepEqual(en.firstAttempt, { days: 2, avgPct: 70 }); // first-attempt scores by subject: (80 + 60) / 2
  assert.equal(c.subjects.find((x) => x.name === "Chinese").firstAttempt, null);
  assert.equal(c.activeDays, 2); assert.equal(c.minutes, 32);
  assert.equal(c.accuracy, 60); assert.deepEqual(c.wrong, { total: 3, untagged: 1, byCause: { misread: 2 } });
  assert.deepEqual(c.homework, { assigned: 2, solved: 1, notDone: 1 }); assert.deepEqual(c.credits, { confirmed: 10, pending: 2, forfeited: 3, sgd: 5 });
  assert.equal(c.papers.length, 1);
  assert.equal(c.subjects.some((s) => s.name === "Math"), false); // not live for P3
});
await ok("template: causes shown only when tagged; honest fallbacks; no paper => says so", () => {
  const base = { name: "K", grade: "P3", subjects: [{ name: "English", sets: 3, target: 6, daysMet: 2, daysTracked: 6 }], questions: 30, accuracy: 60, minutes: 32, activeDays: 2, daysTracked: 6,
    homework: { assigned: 0, solved: 0, notDone: 0 }, credits: { confirmed: 0, pending: 0, forfeited: 0, sgd: 0 }, papers: [] };
  const mail = (wrong) => renderWeeklyEmail({ parentName: "P", weekStart: "2026-11-16", weekEnd: "2026-11-22", dashboardUrl: "https://example.test/", children: [{ ...base, wrong }] });
  assert(mail({ total: 0, untagged: 0, byCause: {} }).text.includes("so no pattern can be shown"));
  assert(mail({ total: 4, untagged: 4, byCause: {} }).text.includes("not guessing a pattern"));
  const t = mail({ total: 4, untagged: 1, byCause: { misread: 3 } });
  assert(t.text.includes("Misread the question: 3") && t.text.includes("1 more not tagged yet"));
  assert(t.text.includes("No mock exam or past paper handed in this week.") && t.text.includes("Homework: none assigned"));
  assert(mail({ total: 0, untagged: 0, byCause: {} }).text.includes("no scored first attempt"));
  assert(renderWeeklyEmail({ parentName: "P", weekStart: "2026-11-16", weekEnd: "2026-11-22", dashboardUrl: "https://example.test/", children: [{ ...base, subjects: [{ ...base.subjects[0], firstAttempt: { days: 2, avgPct: 70 } }], wrong: { total: 0, untagged: 0, byCause: {} } }] }).text.includes("first attempt of the day: 70% average over 2 days"));
  assert(t.subject.startsWith("Weekly report (") && t.html.includes("<h3"));
});
console.log(`ALL PASS (${n} checks)`);
