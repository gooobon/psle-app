// Daily parent WhatsApp (issue #116): payload content, flag-off dry run, dedupe, opt-in, quiet hours. Run: node tools/daily_whatsapp_selftest.mjs
// Fake admin + fake dispatch: no network, no real numbers or addresses.
import assert from "node:assert/strict";
import { summariseDay, deliverDaily, runDaily, DAILY_CHANNEL } from "../src/lib/notify/dailyWhatsApp.mjs";
import { formatDailyWhatsApp, buildRequest } from "../src/lib/notify/whatsapp.mjs";

let n = 0; const ok = async (name, fn) => { await fn(); n++; console.log("PASS", name); };
const DAY = "2026-11-24", NOW = new Date("2026-11-24T12:00:00Z"); // 20:00 SGT
const profile = { display_name: "Kid", grade: "P3" };
const studied = summariseDay({
  profile, date: DAY,
  activity: [
    { date: DAY, subject: "English", sets_completed: 2, questions_answered: 20, correct: 15, minutes: 14, first_set_questions: 10, first_set_correct: 8 },
    { date: DAY, subject: "Chinese", sets_completed: 1, questions_answered: 10, correct: 5, minutes: 11, first_set_questions: 10, first_set_correct: 5 },
  ],
  homework: [{ solved_at: "x" }, { solved_at: null }, { solved_at: "y" }],
});
const none = summariseDay({ profile: { display_name: "Sib", grade: "P3" }, date: DAY, activity: [], homework: [] });

await ok("summariseDay: studied day uses first_set_*, homework, minutes", () => {
  assert.equal(studied.studied, true); assert.equal(studied.minutes, 25);
  assert.deepEqual(studied.homework, { assigned: 3, solved: 2 });
  assert.deepEqual(studied.subjects.find((s) => s.name === "English"), { name: "English", done: true, score: { correct: 8, total: 10, pct: 80 } });
  assert.equal(studied.subjects.find((s) => s.name === "Chinese").score.pct, 50);
  assert.equal(studied.subjects.some((s) => s.name === "Math"), false); // not live for P3
});
await ok("summariseDay: no activity => no study", () => {
  assert.equal(none.studied, false); assert.equal(none.minutes, 0);
  assert(none.subjects.every((s) => !s.done && s.score === null));
});
await ok("format: studied day", () => {
  const m = formatDailyWhatsApp({ parentName: "P", date: DAY, children: [studied] });
  assert.equal(m.params.length, 5);
  assert(m.params[2].includes("2 of 3 done")); assert(m.params[3].includes("English 8/10 (80%)") && m.params[3].includes("Chinese 5/10 (50%)")); assert(m.params[4].includes("25 min"));
  assert(m.params.every((p) => !/[\n\t]/.test(p)));
});
await ok("format: no-study day and two children", () => {
  const m = formatDailyWhatsApp({ parentName: "P", date: DAY, children: [none] });
  assert(m.params[3].includes("no study today")); assert(m.params[2].includes("none assigned")); assert(m.params[4].includes("not recorded"));
  const two = formatDailyWhatsApp({ parentName: "P", date: DAY, children: [studied, none] });
  assert(two.params[3].includes("Kid English 8/10") && two.params[3].includes("Sib no study today"));
});
await ok("buildRequest uses the daily template env override", () => {
  const msg = formatDailyWhatsApp({ parentName: "P", date: DAY, children: [none] });
  const r = buildRequest("+10000000000", msg, { WHATSAPP_PHONE_NUMBER_ID: "1", WHATSAPP_ACCESS_TOKEN: "t", WHATSAPP_TEMPLATE_DAILY: "custom_daily" });
  assert.equal(JSON.parse(r.init.body).template.name, "custom_daily");
  assert.equal(JSON.parse(buildRequest("+10000000000", msg, {}).init.body).template.name, "daily_study_summary");
});

function fakeAdmin({ channels, quiet = {}, parents = [{ id: "p1", display_name: "P" }] }) {
  const alert = [];
  const tbl = (t) => { const f = []; const api = {
    select: () => api, eq: (c, v) => { f.push([c, v]); return api; },
    maybeSingle: async () => ({ data: t === "parent_settings" ? { alert_channels: channels, ...quiet } : null }),
    then: (res) => res({ data: t === "profiles" ? parents : [] }),
    insert: async (row) => { if (alert.some((a) => a.parent_id === row.parent_id && a.date === row.date && a.channel === row.channel)) return { error: { code: "23505" } }; alert.push({ ...row }); return {}; },
    update: (u) => { const g = []; const up = { eq: (c, v) => { g.push([c, v]); return up; }, select: async () => ({ data: [] }),
      then: (res) => { for (const a of alert) if (g.every(([c, v]) => a[c] === v)) Object.assign(a, u); res({}); } }; return up; },
  }; return api; };
  return { alert, from: tbl };
}
const wa = { type: "whatsapp", enabled: true, opt_in: true, address: "+10000000000" };
let sent = []; const deps = { buildPayload: async () => ({ parentName: "P", date: DAY, children: [studied, none] }),
  dispatch: async (chs, payload, o) => { const r = o.formats.whatsapp(payload); if (o.dryRun) return [{ type: "whatsapp", status: "dry-run", message: r }]; sent.push(r); return [{ type: "whatsapp", status: "sent" }]; } };

await ok("flag off: dry run, nothing sent, no alert_log row", async () => {
  sent = []; const a = fakeAdmin({ channels: [wa] });
  const r = await deliverDaily(a, { id: "p1" }, { env: {}, now: NOW, deps });
  assert.equal(r.status, "dry-run"); assert.equal(sent.length, 0); assert.equal(a.alert.length, 0); assert(r.message.params[3].includes("no study today"));
});
await ok("flag on: sends once per parent per day (retry is a no-op)", async () => {
  sent = []; const a = fakeAdmin({ channels: [wa] }); const env = { WHATSAPP_ENABLED: "true" };
  assert.equal((await deliverDaily(a, { id: "p1" }, { env, now: NOW, deps })).status, "sent");
  assert.equal((await deliverDaily(a, { id: "p1" }, { env, now: NOW, deps })).status, "already-sent");
  assert.equal(sent.length, 1); assert.equal(a.alert[0].channel, DAILY_CHANNEL); assert.equal(a.alert[0].date, DAY); assert.equal(a.alert[0].status, "sent");
});
await ok("no opt-in / disabled channel / bad number / quiet hours are skipped", async () => {
  const env = { WHATSAPP_ENABLED: "true" };
  for (const [chs, reason, quiet] of [
    [[{ ...wa, opt_in: false }], "no_whatsapp_opt_in"], [[{ ...wa, enabled: false }], "no_whatsapp_opt_in"], [[], "no_whatsapp_opt_in"],
    [[{ ...wa, address: "12345" }], "invalid_number"], [[wa], "quiet_hours", { quiet_enabled: true, quiet_start: "19:00", quiet_end: "07:00" }],
  ]) {
    sent = []; const a = fakeAdmin({ channels: chs, quiet });
    const r = await deliverDaily(a, { id: "p1" }, { env, now: NOW, deps });
    assert.equal(r.status, "skipped"); assert.equal(r.reason, reason); assert.equal(sent.length, 0); assert.equal(a.alert.length, 0);
  }
});
await ok("runDaily tallies", async () => {
  sent = []; const a = fakeAdmin({ channels: [wa], parents: [{ id: "p1" }, { id: "p2" }] });
  const s = await runDaily(a, { env: {}, now: NOW, deps });
  assert.equal(s.parents, 2); assert.equal(s.dryRun, 2);
});
console.log(`ALL PASS (${n} checks)`);
