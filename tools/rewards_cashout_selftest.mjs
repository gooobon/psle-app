// Issue #133: rewards rate / cash-out settings. Pure checks + role-play for two people using the REAL payout route, the REAL settings save and the
// REAL rewardsServer loaders on an in-memory fake database. No network, no Supabase. Run: node tools/rewards_cashout_selftest.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as R from "../src/lib/rewards.js";
import * as CS from "../src/lib/childSettings.js";
import * as SR from "../src/lib/setRewards.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
let failed = 0;
const ok = (name, fn) => { try { fn(); console.log("ok", name); } catch (e) { failed++; console.error("FAIL", name, "\n ", e.message); } };
const aok = async (name, fn) => { try { await fn(); console.log("ok", name); } catch (e) { failed++; console.error("FAIL", name, "\n ", e.message); } };
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
function loadSource(file, mods, tail) {
  let src = fs.readFileSync(path.join(ROOT, file), "utf8");
  src = src.replace(/^import\s*\{([^}]*)\}\s*from\s*"([^"]+)";?/gm, (_, names, from) => `const {${names}} = __m[${JSON.stringify(from)}];`);
  assert.ok(!/^import /m.test(src), file + ": every import must be stubbed");
  src = src.replace(/^export (const|async function|function)/gm, "$1");
  return new AsyncFunction("__m", src + "\n" + tail)(mods);
}

// ---------- pure: validation ----------
ok("rate must be a whole number 1-1000", () => {
  for (const bad of [0.5, 1001, -3, "abc"]) assert.ok(R.parseCashout({ creditsPerSgd: bad }, true).error, "rate " + bad);
  assert.equal(R.parseCashout({ creditsPerSgd: 100 }, true).value.creditsPerSgd, 100);
  assert.ok(R.parseCashout({}, true).error, "credits on without a rate is refused");
  assert.equal(R.parseCashout({}, false).value.creditsPerSgd, 0, "off + no rate is fine");
});
ok("minimum 0-500, limit 0-1000, minimum cannot exceed limit, clear text", () => {
  assert.match(R.parseCashout({ creditsPerSgd: 100, cashoutMinSgd: 501 }, true).error, /0 to 500/);
  assert.match(R.parseCashout({ creditsPerSgd: 100, cashoutLimitSgd: 1001 }, true).error, /0 to 1000/);
  assert.match(R.parseCashout({ creditsPerSgd: 100, cashoutMinSgd: 30, cashoutLimitSgd: 20 }, true).error, /minimum cannot be higher/);
  assert.equal(R.parseCashout({ creditsPerSgd: 100, cashoutLimitPeriod: "week" }, true).value.cashoutLimitPeriod, "week");
  assert.equal(R.parseCashout({ creditsPerSgd: 100, cashoutLimitPeriod: "year" }, true).value.cashoutLimitPeriod, "month");
});
ok("recommended = 100 credits = SGD 1, min SGD 5, limit SGD 20 per month; never enables by itself", () => {
  const r = R.applyRecommended(R.DEFAULT_RULES);
  assert.deepEqual([r.creditsPerSgd, r.cashoutMinSgd, r.cashoutLimitSgd, r.cashoutLimitPeriod, r.enabled], [100, 5, 20, "month", false]);
  assert.equal(R.DEFAULT_RULES.enabled, false);
  assert.equal(R.DEFAULT_RULES.creditsPerSgd, 0);
});
ok("wallet shows real SGD from the rate", () => {
  const rule = { creditsPerSgd: 100 };
  const w = R.walletView(R.creditTotals([{ credits: 250, status: "confirmed" }, { credits: 40, status: "pending" }], 50), rule);
  assert.deepEqual([w.balanceCredits, w.balanceSgd, w.pendingSgd, w.rate], [200, 2, 0.4, 100]);
  assert.equal(R.walletView({ balance: 10 }, { creditsPerSgd: 0 }).balanceSgd, 0, "no rate -> 0, never a guess");
  assert.equal(R.walletView({ balance: 10 }, { sgdPerCredit: 0.5 }).balanceSgd, 5, "legacy rule still values the wallet");
});
ok("rate drives credits earned in SGD-unit rewards", () => {
  const r = R.parseRuleVersion({ enabled: true, creditsPerSgd: 100, weeklyUnit: "sgd", weeklyAmounts: { English: 0.5 } }, "2026-11-24").rule;
  assert.equal(R.weeklySubjectCredits(r, "English"), 50);
});
ok("checkPayout: minimum and limit (week and month), no limit when 0", () => {
  const rule = { cashoutMinSgd: 5, cashoutLimitSgd: 20, cashoutLimitPeriod: "month" };
  const prior = [{ amount_sgd: 12, paid_on: "2026-11-03" }, { amount_sgd: 50, paid_on: "2026-10-30" }];
  assert.equal(R.checkPayout({ amountSgd: 4.99, paidOn: "2026-11-24", rule, payouts: prior }).code, "minimum");
  assert.equal(R.checkPayout({ amountSgd: 8, paidOn: "2026-11-24", rule, payouts: prior }).ok, true);
  const over = R.checkPayout({ amountSgd: 8.01, paidOn: "2026-11-24", rule, payouts: prior });
  assert.deepEqual([over.code, over.left], ["limit", 8]);
  assert.equal(R.checkPayout({ amountSgd: 20, paidOn: "2026-12-01", rule, payouts: prior }).ok, true, "new month, October payout does not count");
  const wk = { cashoutMinSgd: 0, cashoutLimitSgd: 10, cashoutLimitPeriod: "week" };
  const p2 = [{ amount_sgd: 6, paid_on: "2026-11-23" }]; // Monday of the week of Tue 24 Nov
  assert.equal(R.checkPayout({ amountSgd: 5, paidOn: "2026-11-24", rule: wk, payouts: p2 }).code, "limit");
  assert.equal(R.checkPayout({ amountSgd: 5, paidOn: "2026-11-30", rule: wk, payouts: p2 }).ok, true, "next Monday starts a new week");
  assert.equal(R.checkPayout({ amountSgd: 9999, paidOn: "2026-11-24", rule: { cashoutLimitSgd: 0, cashoutMinSgd: 0 }, payouts: p2 }).ok, true);
});
ok("settings edit keeps old data: legacy rule round-trips, diff lines are plain", () => {
  const legacy = CS.settingFromRow({ effective_from: "2026-11-01", enabled: true, sgd_per_credit: 0.5, daily_tiers: [], weekly_unit: "credits", weekly_amounts: {}, daily_target: {}, homework_per_mistake: 3 });
  assert.deepEqual([legacy.rule.creditsPerSgd, legacy.rule.cashoutMinSgd, legacy.rule.cashoutLimitSgd], [2, 0, 0]);
  const e = CS.applySettingEdit(legacy, { creditsPerSgd: 100, cashoutMinSgd: 5, cashoutLimitSgd: 20, cashoutLimitPeriod: "month" }, "2026-11-24");
  assert.ok(!e.error, e.error);
  const lines = CS.diffSettings(legacy, e.setting).join(" | ");
  assert.match(lines, /100 credits per SGD 1/); assert.match(lines, /cash-out minimum to S\$5\.00/); assert.match(lines, /limit to S\$20\.00 per month/);
  const row = CS.settingToRow("c", e.setting, "p", "t", { cashout: true });
  assert.deepEqual([row.credits_per_sgd, row.cashout_min_sgd, row.cashout_limit_sgd, row.cashout_limit_period, row.sgd_per_credit], [100, 5, 20, "month", 0.01]);
  assert.ok(!("credits_per_sgd" in CS.settingToRow("c", e.setting, "p", "t")), "without the migration the row is the legacy shape");
});
ok("result lines: Thread +N and Credits +N, no emoji, zero hidden, flags respected", () => {
  assert.deepEqual(SR.setRewardLines({ thread: 7, credits: 3 }).map((l) => l.text), ["Thread +7", "Credits +3"]);
  assert.deepEqual(SR.setRewardLines({ thread: 0, credits: 3 }).map((l) => l.text), ["Credits +3"]);
  assert.deepEqual(SR.setRewardLines({ thread: 2.5, credits: 0 }).map((l) => l.text), ["Thread +2.5"]);
  assert.deepEqual(SR.setRewardLines({ thread: 7, credits: 3 }, { thread: false, credits: false }), []);
  assert.equal(SR.creditsFromClaim({ credits: [{ credits: 3, newlyAwarded: true }, { credits: 5, newlyAwarded: false }] }), 3, "a repeat claim adds nothing");
  for (const f of ["src/lib/setRewards.js", "src/components/SetRewards.js"]) assert.ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(fs.readFileSync(path.join(ROOT, f), "utf8")), f + " has no emoji");
});
ok("migration is additive only", () => {
  const sql = fs.readFileSync(path.join(ROOT, "supabase/migrations/20261208000000_rewards_cashout_settings.sql"), "utf8");
  assert.ok(!/\b(drop|delete|truncate|rename)\b/i.test(sql.replace(/--.*$/gm, "")), "no destructive statement");
  assert.equal((sql.match(/add column if not exists/g) || []).length, 4);
});

// ---------- role-play: fake database ----------
const PARENT = "11111111-1111-1111-1111-111111111111", KID = "22222222-2222-2222-2222-222222222222";
function fakeDb({ migrated }) {
  const t = { parent_child: [{ parent_id: PARENT, child_id: KID, created_at: "2026-01-01" }], child_setting_versions: [], child_setting_audit: [], reward_payouts: [], reward_credits: [], stickers: [], weekly_reviews: [], profiles: [{ id: KID, display_name: "Kid" }] };
  const NEW = ["credits_per_sgd", "cashout_min_sgd", "cashout_limit_sgd", "cashout_limit_period"];
  class Q {
    constructor(n) { this.n = n; this.f = []; this.op = "select"; }
    select(c) { if (this.op === "select") { this.cols = c; } return this; }
    eq(k, v) { this.f.push([k, v]); return this; } in() { return this; } order() { return this; } limit() { return this; }
    insert(p) { this.op = "insert"; this.p = p; return this; }
    upsert(p, o) { this.op = "upsert"; this.p = p; this.o = o; return this; }
    maybeSingle() { this.one = true; return this; }
    run() {
      const rows = t[this.n];
      if (this.op === "select") {
        if (!migrated && this.n === "child_setting_versions" && NEW.some((c) => String(this.cols).includes(c))) return { data: null, error: { message: "column does not exist" } };
        const out = rows.filter((r) => this.f.every(([k, v]) => r[k] === v));
        return { data: this.one ? out[0] || null : out, error: null };
      }
      const list = Array.isArray(this.p) ? this.p : [this.p];
      for (const p of list) {
        if (!migrated && NEW.some((c) => c in p)) return { data: null, error: { message: "column does not exist" } };
        const hit = this.op === "upsert" ? rows.find((r) => r.child_id === p.child_id && r.effective_from === p.effective_from) : null;
        if (hit) Object.assign(hit, p); else rows.push({ ...p });
      }
      return { data: null, error: null };
    }
    then(a, b) { return Promise.resolve(this.run()).then(a, b); }
  }
  return {
    t, from: (n) => new Q(n),
    rpc: async (name, a) => {
      if (name === "finalize_credits") return { data: 0, error: null };
      if (name === "record_payout") { // mirrors the SQL: balance check, then insert
        const earned = t.reward_credits.filter((r) => r.status === "confirmed").reduce((s, r) => s + r.credits, 0), paid = t.reward_payouts.reduce((s, r) => s + r.credits, 0);
        if (a.p_credits > earned - paid) return { data: { ok: false, error: "balance", balance: earned - paid }, error: null };
        t.reward_payouts.push({ child_id: a.p_child, credits: a.p_credits, amount_sgd: a.p_amount, paid_on: a.p_paid_on });
        return { data: { ok: true, balance: earned - paid - a.p_credits }, error: null };
      }
      return { data: null, error: null };
    },
  };
}
const TODAY = "2026-11-24";
const server = async (db) => {
  const common = { "@/lib/supabase/server": { adminClient: () => db, currentUser: async () => ({ profile: { id: PARENT, role: "parent", display_name: "Parent" } }), serverAuthEnabled: () => true,
    jerr: (m, s) => ({ error: m, status: s }), jok: (o) => ({ ok: true, ...(o || {}) }), readJson: async (r) => r.body },
    "@/lib/supabase/config": { REWARDS: true, MOCK_EXAMS_ENABLED: false }, "@/lib/rateLimit": { rateLimit: () => true, clientIp: () => "1" },
    "@/lib/activity": { ...(await import("../src/lib/activity.js")), sgtDate: () => TODAY }, "@/lib/rewards": R, "@/lib/childSettings": CS, "@/lib/dailyAlert": { notifyCoParents: async () => {} } };
  const RS = await loadSource("src/lib/rewardsServer.js", { "@/lib/rewards": R, "@/lib/childSettings": CS, "@/lib/supabase/config": common["@/lib/supabase/config"] }, "return { loadSettingVersions, loadChildSetting, SETTING_COLUMNS };");
  const SS = await loadSource("src/lib/childSettingsServer.js", { ...common, "@/lib/rewardsServer": RS }, "return { saveChildSetting };");
  const Pay = await loadSource("src/app/api/parent/rewards/payout/route.js", { ...common, "@/lib/rewardsServer": RS }, "return { POST };");
  const Rw = await loadSource("src/app/api/parent/rewards/route.js", { ...common, "@/lib/rewardsServer": { ...RS, finalizeCredits: async () => 0 }, "@/lib/childSettingsServer": SS }, "return { GET, PUT };");
  return { Pay, Rw };
};
const pay = async (S, o) => { // the route answers 422 with a real Response (code + text), others with the jerr / jok stubs
  const r = await S.Pay.POST({ body: { child: KID, credits: o.credits, amountSgd: o.amount, paidOn: o.on || TODAY } });
  return typeof r.json === "function" ? { ...(await r.json()), status: r.status } : r;
};

await aok("PARENT role-play: sets all four values, Use recommended, payout under the minimum and over the limit, then a valid payout", async () => {
  const db = fakeDb({ migrated: true }); const S = await server(db);
  db.t.reward_credits.push({ child_id: KID, status: "confirmed", credits: 5000, kind: "daily", period: "2026-11-20", sgd_per_credit: 0.01 });
  // 1. "Use recommended" only fills the form; credits stay off until the parent saves with the toggle on.
  const form = R.applyRecommended(CS.settingFromRow(null).rule);
  assert.equal(form.enabled, false);
  // 2. Parent saves: toggle on + the four values (recommended ones, then edited).
  const r1 = await S.Rw.PUT({ body: { child: KID, enabled: true, creditsPerSgd: form.creditsPerSgd, cashoutMinSgd: form.cashoutMinSgd, cashoutLimitSgd: form.cashoutLimitSgd, cashoutLimitPeriod: form.cashoutLimitPeriod } });
  assert.ok(r1.ok, JSON.stringify(r1));
  const row = db.t.child_setting_versions[0];
  assert.deepEqual([row.enabled, row.credits_per_sgd, row.cashout_min_sgd, row.cashout_limit_sgd, row.cashout_limit_period, row.effective_from], [true, 100, 5, 20, "month", "2026-11-25"]);
  const r2 = await S.Rw.PUT({ body: { child: KID, creditsPerSgd: 50, cashoutMinSgd: 4, cashoutLimitSgd: 10, cashoutLimitPeriod: "week" } });
  assert.ok(r2.ok, JSON.stringify(r2));
  assert.deepEqual([row.credits_per_sgd, row.cashout_min_sgd, row.cashout_limit_sgd, row.cashout_limit_period, row.enabled], [50, 4, 10, "week", true]);
  // Bad values are refused with text.
  for (const [body, re] of [[{ creditsPerSgd: 1001 }, /1 to 1000/], [{ creditsPerSgd: 2.5 }, /whole number/], [{ cashoutMinSgd: 501 }, /0 to 500/], [{ cashoutLimitSgd: 1001 }, /0 to 1000/]]) {
    const e = await S.Rw.PUT({ body: { child: KID, ...body } }); assert.equal(e.status, 400); assert.match(e.error, re);
  }
  assert.equal((await S.Rw.PUT({ body: { child: KID, enabled: true, creditsPerSgd: "" } })).status, 400, "cannot turn credits on without a rate");
  // The new setting applies from tomorrow, so for today's payouts use the version in force today: make it effective now for the test.
  row.effective_from = "2026-11-01";
  // 3. Payouts. Minimum SGD 4, limit SGD 10 per week (Mon 23 Nov..Sun 29 Nov).
  const low = await pay(S, { credits: 100, amount: 3.99 }); assert.equal(low.status, 422); assert.equal(low.code, "minimum"); assert.match(low.error, /minimum is SGD 4\.00/);
  const first = await pay(S, { credits: 300, amount: 6 }); assert.ok(first.ok, JSON.stringify(first));
  const over = await pay(S, { credits: 250, amount: 5 }); assert.equal(over.status, 422); assert.equal(over.code, "limit"); assert.match(over.error, /at most SGD 4\.00/);
  const rest = await pay(S, { credits: 200, amount: 4 }); assert.ok(rest.ok);
  assert.equal(db.t.reward_payouts.length, 2, "rejected payouts were never recorded");
  const next = await pay(S, { credits: 200, amount: 4, on: TODAY }); assert.equal(next.code, "limit", "week is now full");
  // 4. Wallet shows real values.
  const g = await S.Rw.GET(new Request("http://x/api/parent/rewards?child=" + KID));
  assert.ok(g.ok, JSON.stringify(g));
  assert.deepEqual([g.wallet.rate, g.wallet.balanceSgd], [50, (5000 - 500) / 50]);
  assert.equal(g.cashoutReady, true);
});

await aok("PARENT: nothing limits a payout when min and limit are 0 (existing parents are not auto-enabled)", async () => {
  const db = fakeDb({ migrated: true }); const S = await server(db);
  db.t.reward_credits.push({ child_id: KID, status: "confirmed", credits: 9000, kind: "daily", period: "2026-11-20" });
  assert.ok((await pay(S, { credits: 5000, amount: 50 })).ok);
  assert.equal(db.t.child_setting_versions.length, 0, "no setting row was created or enabled by anything above");
});

await aok("fail soft BEFORE the SQL is applied: rate saves, min/limit refused with text, payouts still work", async () => {
  const db = fakeDb({ migrated: false }); const S = await server(db);
  db.t.reward_credits.push({ child_id: KID, status: "confirmed", credits: 1000, kind: "daily", period: "2026-11-20" });
  const a = await S.Rw.PUT({ body: { child: KID, enabled: true, creditsPerSgd: 100 } });
  assert.ok(a.ok, JSON.stringify(a));
  assert.equal(db.t.child_setting_versions[0].sgd_per_credit, 0.01);
  assert.ok(!("credits_per_sgd" in db.t.child_setting_versions[0]));
  const b = await S.Rw.PUT({ body: { child: KID, cashoutMinSgd: 5 } }); assert.equal(b.status, 409); assert.match(b.error, /database update/);
  const g = await S.Rw.GET(new Request("http://x/api/parent/rewards?child=" + KID));
  assert.ok(g.ok && g.cashoutReady === false && g.wallet.rate === 100, JSON.stringify(g.wallet));
  assert.ok((await pay(S, { credits: 100, amount: 1 })).ok, "payout with no min/limit stored");
});

// ---------- role-play: student ----------
await aok("STUDENT role-play: finishes a set, result screen lines are Thread +N and Credits +N; parent wallet shows SGD, student wallet stays credits only", () => {
  const store = new Map(); const listeners = [];
  globalThis.sessionStorage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
  globalThis.window = { dispatchEvent: (e) => listeners.forEach((f) => f(e)) };
  SR.startSetRewards();                                         // reportActivity starts the record for this set
  SR.addSetRewards({ thread: 8 });                              // /api/clewquest/award answered { added: 8 }
  SR.addSetRewards({ credits: SR.creditsFromClaim({ ok: true, credits: [{ subject: "English", pct: 90, credits: 12, newlyAwarded: true }] }) }); // claim response
  assert.deepEqual(SR.setRewardLines(SR.readSetRewards()).map((l) => l.text), ["Thread +8", "Credits +12"]);
  SR.startSetRewards();                                         // next set starts clean
  assert.deepEqual(SR.setRewardLines(SR.readSetRewards()), []);
  const credits = R.studentCredits([{ credits: 12, status: "confirmed" }]);
  assert.equal(credits.balance, 12);
  assert.ok(!/sgd|S\$/i.test(JSON.stringify(credits)), "student wallet never carries money");
  assert.equal(R.walletView(R.creditTotals([{ credits: 12, status: "confirmed" }], 0), { creditsPerSgd: 100 }).balanceSgd, 0.12, "the SGD total is on the parent wallet");
  delete globalThis.sessionStorage; delete globalThis.window;
});

ok("ExamSession.js and answerTiming.js are untouched by this change (PR #143 owns them)", () => {
  for (const f of ["src/components/ExamSession.js", "src/lib/answerTiming.js"].filter((x) => fs.existsSync(path.join(ROOT, x)))) assert.ok(!/setRewards|SetRewards/.test(fs.readFileSync(path.join(ROOT, f), "utf8")), f);
});

if (failed) { console.error(failed + " FAILED"); process.exit(1); }
console.log("ALL PASS");
