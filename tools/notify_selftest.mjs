// Dry-run check of alert formatting + the WhatsApp gate. Run: node tools/notify_selftest.mjs
import assert from "node:assert/strict";
import { dispatchAlert, isE164 } from "../src/lib/notify/index.mjs";
import { buildRequest } from "../src/lib/notify/whatsapp.mjs";

const payload = { parentName: "Mrs Lee", childName: "Mei Lin", date: "2026-11-19",
  subjects: [{ name: "English", sets: 1, target: 1 }, { name: "Chinese", sets: 0, target: 1 }], questions: 40, accuracy: 85 };
const chans = [{ type: "email", enabled: true, address: "a@b.co" }, { type: "whatsapp", enabled: true, address: "+6591234567", opt_in: true }];
let n = 0; const ok = (name, fn) => { fn(); n++; console.log("PASS", name); };
const calls = []; const fakeFetch = async (u, i) => { calls.push([u, i]); return { ok: true, status: 200 }; };

ok("E.164 validation", () => { assert(isE164("+6591234567")); assert(!isE164("91234567")); assert(!isE164("+0123")); });
const dry = await dispatchAlert(chans, payload, { dryRun: true });
ok("dry-run formats both channels", () => {
  assert.equal(dry.length, 2);
  const wa = dry.find((d) => d.type === "whatsapp").message;
  assert.equal(wa.params.length, 5);
  assert(wa.preview.includes("✅ English 1/1") && wa.preview.includes("❌ Chinese 0/1") && wa.preview.includes("85% correct"));
  assert(dry.find((d) => d.type === "email").message.text.includes("❌ Chinese"));
});
const off = await dispatchAlert(chans, payload, { env: {}, fetchImpl: fakeFetch });
ok("disabled => no-op, no network", () => { assert.equal(off.find((d) => d.type === "whatsapp").status, "noop"); assert.equal(calls.length, 0); });
const env = { WHATSAPP_ENABLED: "true", WHATSAPP_PHONE_NUMBER_ID: "123", WHATSAPP_ACCESS_TOKEN: "t" };
const noOpt = await dispatchAlert([{ type: "whatsapp", enabled: true, address: "+6591234567", opt_in: false }], payload, { env, fetchImpl: fakeFetch });
ok("enabled but no opt-in => skipped", () => { assert.equal(noOpt[0].status, "skipped"); assert.equal(calls.length, 0); });
ok("request shape (fake fetch only)", async () => {
  const r = buildRequest("+6591234567", dry.find((d) => d.type === "whatsapp").message, env);
  const body = JSON.parse(r.init.body);
  assert.equal(body.to, "6591234567"); assert.equal(body.type, "template");
  assert.equal(body.template.components[0].parameters.length, 5);
});
console.log(`ALL PASS (${n} checks)`);
