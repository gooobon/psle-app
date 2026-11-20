// Offline checks for real-time parent alerts (issue #56). In-memory fake database + fake fetch; no network, no real numbers.
// Run: node tools/event_alerts_selftest.mjs
import assert from "node:assert/strict";
import { notifyEvent, flushDeferred, inQuietHours, quietEndsAt, sgtDay, DEFAULT_QUIET } from "../src/lib/notify/eventAlerts.mjs";
import { buildRequest, formatWhatsAppEvent } from "../src/lib/notify/whatsapp.mjs";

function makeDb({ settings = {}, confirmed = true } = {}) {
  const t = {
    parent_child: [{ parent_id: "p1", child_id: "c1" }, { parent_id: "p2", child_id: "c1" }],
    profiles: [{ id: "c1", display_name: "Kid" }, { id: "p1", display_name: "Parent One", email: "one@example.test" }, { id: "p2", display_name: "Parent Two", email: "two@example.test" }],
    parent_settings: [
      { parent_id: "p1", alert_channels: [{ type: "whatsapp", enabled: true, address: "+6590000001", opt_in: true }, { type: "email", enabled: true }], ...(settings.p1 || {}) },
      { parent_id: "p2", alert_channels: [{ type: "whatsapp", enabled: true, address: "+6590000002", opt_in: true }, { type: "email", enabled: true }], ...(settings.p2 || {}) },
    ],
    event_alert_log: [],
  };
  const q = (name) => {
    let rows = () => t[name], filt = [], op = null, patch = null, lim = Infinity;
    const run = () => {
      const m = rows().filter((r) => filt.every((f) => f(r)));
      if (op === "update") { m.forEach((r) => Object.assign(r, patch)); return { data: m.map((r) => ({ ...r })), error: null }; }
      return { data: m.slice(0, lim).map((r) => ({ ...r })), error: null };
    };
    const b = {
      select: () => b, eq: (k, v) => (filt.push((r) => r[k] === v), b), lte: (k, v) => (filt.push((r) => r[k] != null && r[k] <= v), b), limit: (n) => (lim = n, b),
      maybeSingle: async () => ({ data: run().data[0] || null, error: null }),
      insert: async (row) => {
        if (name === "event_alert_log" && t.event_alert_log.some((r) => r.parent_id === row.parent_id && r.event_key === row.event_key)) return { error: { code: "23505" } };
        t[name].push({ ...row }); return { error: null };
      },
      update: (p) => (op = "update", patch = p, b),
      then: (res, rej) => Promise.resolve(run()).then(res, rej),
    };
    return b;
  };
  return { t, from: q, auth: { admin: { getUserById: async () => ({ data: { user: { email_confirmed_at: confirmed ? "x" : null } }, error: null }) } } };
}
const ENV = { WHATSAPP_ENABLED: "true", WHATSAPP_PHONE_NUMBER_ID: "123", WHATSAPP_ACCESS_TOKEN: "tok" };
const fetchLog = () => { const calls = []; return { calls, fetchImpl: async (u, i) => { calls.push({ u, body: JSON.parse(i.body || "{}") }); return { ok: true, status: 200 }; } }; };
// 2026-11-20 10:00 SGT = 02:00 UTC (outside quiet hours); 23:00 SGT = 15:00 UTC (inside).
const DAY = new Date("2026-11-20T02:00:00Z"), NIGHT = new Date("2026-11-20T15:00:00Z"), MORNING = new Date("2026-11-20T23:00:00Z"); // 07:00 SGT 21 Nov
let n = 0; const ok = async (name, fn) => { await fn(); n++; console.log("PASS", name); };

await ok("quiet hours helpers (wrap midnight, default 21:30-06:30)", () => {
  assert(inQuietHours(NIGHT, DEFAULT_QUIET)); assert(!inQuietHours(DAY, DEFAULT_QUIET));
  assert(inQuietHours(new Date("2026-11-20T22:00:00Z"), DEFAULT_QUIET)); // 06:00 SGT
  assert(!inQuietHours(NIGHT, { ...DEFAULT_QUIET, enabled: false }));
  assert.equal(quietEndsAt(NIGHT, DEFAULT_QUIET).toISOString(), "2026-11-20T22:30:00.000Z"); // 06:30 SGT next day
  assert.equal(sgtDay(NIGHT), "2026-11-20"); assert.equal(sgtDay(new Date("2026-11-20T17:00:00Z")), "2026-11-21");
});

await ok("no send when WhatsApp is off (even with email on): no network, no DB writes", async () => {
  const db = makeDb(); const f = fetchLog();
  const r = await notifyEvent(db, { type: "milestone", childId: "c1", subject: "English", key: "set-1", score: 1, total: 2 }, { env: { EMAIL_ALERTS_ENABLED: "true", RESEND_API_KEY: "k", ALERT_FROM_EMAIL: "a@b.co" }, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(r.enabled, false); assert.equal(f.calls.length, 0); assert.equal(db.t.event_alert_log.length, 0);
});

await ok("both parents notified on a milestone, with the result", async () => {
  const db = makeDb(); const f = fetchLog();
  const r = await notifyEvent(db, { type: "milestone", childId: "c1", subject: "English", key: "set-12", label: "daily set 12", score: 17, total: 20 }, { env: ENV, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(r.sent, 2); assert.equal(f.calls.length, 2);
  assert.deepEqual(f.calls.map((c) => c.body.to).sort(), ["6590000001", "6590000002"]);
  const params = f.calls[0].body.template.components[0].parameters.map((p) => p.text);
  assert.equal(f.calls[0].body.template.name, "milestone_done");
  assert(params.includes("Kid") && params.includes("English") && params.some((p) => p.includes("17 of 20 correct (85%)")));
});

await ok("milestone dedupe: double submit sends once per parent", async () => {
  const db = makeDb(); const f = fetchLog(); const ev = { type: "milestone", childId: "c1", subject: "English", key: "set-12", score: 1, total: 2 };
  await notifyEvent(db, ev, { env: ENV, now: DAY, fetchImpl: f.fetchImpl });
  const r2 = await notifyEvent(db, ev, { env: ENV, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(r2.duplicate, 2); assert.equal(f.calls.length, 2);
  await notifyEvent(db, { ...ev, key: "set-13" }, { env: ENV, now: DAY, fetchImpl: f.fetchImpl }); // a different milestone still sends
  assert.equal(f.calls.length, 4);
});

await ok("started: once per child per SGT day (second subject / reopen dedupes), new day sends again", async () => {
  const db = makeDb(); const f = fetchLog();
  await notifyEvent(db, { type: "started", childId: "c1", subject: "English" }, { env: ENV, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(f.calls.length, 2); assert.equal(f.calls[0].body.template.name, "practice_started");
  await notifyEvent(db, { type: "started", childId: "c1", subject: "Chinese" }, { env: ENV, now: new Date(DAY.getTime() + 3600000), fetchImpl: f.fetchImpl });
  await notifyEvent(db, { type: "started", childId: "c1", subject: "English" }, { env: ENV, now: new Date(DAY.getTime() + 7200000), fetchImpl: f.fetchImpl });
  assert.equal(f.calls.length, 2);
  await notifyEvent(db, { type: "started", childId: "c1", subject: "English" }, { env: ENV, now: new Date(DAY.getTime() + 86400000), fetchImpl: f.fetchImpl });
  assert.equal(f.calls.length, 4);
});

await ok("quiet hours: delayed (not dropped), sent after they end, still deduped", async () => {
  const db = makeDb(); const f = fetchLog(); const ev = { type: "milestone", childId: "c1", subject: "Chinese", key: "set-5", score: 9, total: 10 };
  const r = await notifyEvent(db, ev, { env: ENV, now: NIGHT, fetchImpl: f.fetchImpl });
  assert.equal(r.deferred, 2); assert.equal(f.calls.length, 0);
  assert(db.t.event_alert_log.every((x) => x.status === "deferred" && x.send_after === "2026-11-20T22:30:00.000Z"));
  assert.equal((await flushDeferred(db, { env: ENV, now: new Date("2026-11-20T20:00:00Z"), fetchImpl: f.fetchImpl })).sent, 0); // 04:00 SGT: still quiet
  const fl = await flushDeferred(db, { env: ENV, now: MORNING, fetchImpl: f.fetchImpl });
  assert.equal(fl.sent, 2); assert.equal(f.calls.length, 2);
  await flushDeferred(db, { env: ENV, now: MORNING, fetchImpl: f.fetchImpl }); // idempotent
  const dup = await notifyEvent(db, ev, { env: ENV, now: MORNING, fetchImpl: f.fetchImpl }); // dedupe after delay
  assert.equal(dup.duplicate, 2); assert.equal(f.calls.length, 2);
});

await ok("quiet hours are per parent and configurable (parent 2 disabled quiet hours)", async () => {
  const db = makeDb({ settings: { p2: { quiet_enabled: false } } }); const f = fetchLog();
  const r = await notifyEvent(db, { type: "milestone", childId: "c1", subject: "English", key: "set-2", score: 1, total: 1 }, { env: ENV, now: NIGHT, fetchImpl: f.fetchImpl });
  assert.equal(r.deferred, 1); assert.equal(r.sent, 1);
});

await ok("stale deferred 'started' is dropped; deferred milestone is not", async () => {
  const db = makeDb(); const f = fetchLog();
  await notifyEvent(db, { type: "started", childId: "c1", subject: "English" }, { env: ENV, now: NIGHT, fetchImpl: f.fetchImpl });
  const fl = await flushDeferred(db, { env: ENV, now: MORNING, fetchImpl: f.fetchImpl });
  assert.equal(fl.sent, 0); assert.equal(fl.skipped, 2); assert.equal(f.calls.length, 0);
});

await ok("email fallback: no opt-in / bad number / missing credentials / provider error", async () => {
  const mail = { EMAIL_ALERTS_ENABLED: "true", RESEND_API_KEY: "k", ALERT_FROM_EMAIL: "from@example.test" };
  const ev = (key) => ({ type: "milestone", childId: "c1", subject: "English", key, score: 1, total: 2 });
  // no opt-in on p1, invalid number on p2
  let db = makeDb({ settings: { p1: { alert_channels: [{ type: "whatsapp", enabled: true, address: "+6590000001", opt_in: false }, { type: "email", enabled: true }] }, p2: { alert_channels: [{ type: "whatsapp", enabled: true, address: "91234567", opt_in: true }, { type: "email", enabled: true }] } } });
  let f = fetchLog(); let r = await notifyEvent(db, ev("a"), { env: { ...ENV, ...mail }, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(r.sent, 2); assert(f.calls.every((c) => c.u.includes("resend.com")));
  // missing credentials
  db = makeDb(); f = fetchLog(); r = await notifyEvent(db, ev("b"), { env: { WHATSAPP_ENABLED: "true", ...mail }, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(r.sent, 2); assert(f.calls.every((c) => c.u.includes("resend.com")));
  // provider error
  db = makeDb(); const calls = []; r = await notifyEvent(db, ev("c"), { env: { ...ENV, ...mail }, now: DAY, fetchImpl: async (u) => { calls.push(u); return u.includes("graph.facebook") ? { ok: false, status: 500 } : { ok: true, status: 200 }; } });
  assert.equal(r.sent, 2); assert.equal(calls.filter((u) => u.includes("resend")).length, 2);
  // email off (EMAIL_ALERTS_ENABLED unset) => dry-run, nothing real sent
  db = makeDb(); f = fetchLog(); r = await notifyEvent(db, ev("d"), { env: { ...ENV, WHATSAPP_ACCESS_TOKEN: "" }, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(r.dryRun, 2); assert.equal(f.calls.length, 0);
});

await ok("email fallback honours ALERT_TEST_RECIPIENTS (others skipped)", async () => {
  const env = { WHATSAPP_ENABLED: "true", EMAIL_ALERTS_ENABLED: "true", RESEND_API_KEY: "k", ALERT_FROM_EMAIL: "from@example.test", ALERT_TEST_RECIPIENTS: "ONE@example.test" };
  const db = makeDb(); const f = fetchLog(); // no WhatsApp credentials => fallback
  const r = await notifyEvent(db, { type: "milestone", childId: "c1", subject: "English", key: "z", score: 1, total: 1 }, { env, now: DAY, fetchImpl: f.fetchImpl });
  assert.equal(r.sent, 1); assert.equal(r.skipped, 1); assert.deepEqual(f.calls[0].body.to, ["one@example.test"]);
});

await ok("templates: stable positional params, env-var template names, no free-form text", () => {
  const m = formatWhatsAppEvent({ kind: "milestone", parentName: "P", childName: "K", subject: "Math", label: "daily set 1", score: 3, total: 4 });
  assert.equal(m.params.length, 5); assert(m.preview.includes("75%"));
  const s = formatWhatsAppEvent({ kind: "started", parentName: "P", childName: "K", subject: "Math", time: "16:05" });
  assert.equal(s.params.length, 4);
  const req = JSON.parse(buildRequest("+6590000001", s, { ...ENV, WHATSAPP_TEMPLATE_STARTED: "custom_started" }).init.body);
  assert.equal(req.type, "template"); assert.equal(req.template.name, "custom_started");
  assert.equal(JSON.parse(buildRequest("+6590000001", m, ENV).init.body).template.name, "milestone_done");
});
console.log(`ALL PASS (${n} checks)`);
