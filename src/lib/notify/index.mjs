// Alert channel interface shared by email and WhatsApp.
//
// A channel is { type, isEnabled(env), format(payload) -> message, send(target, message, {env, fetchImpl}) }.
// A parent's settings hold a LIST of channels (parent_settings.alert_channels), so email and whatsapp
// can both be active. dispatchAlert() formats for every enabled channel and sends via each provider.
// Called by the weekly parent report (src/lib/notify/weeklyReport.mjs). Email needs EMAIL_ALERTS_ENABLED; WhatsApp is shipped OFF.
// Channels that are switched off still render, and come back as status "dry-run".
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { emailChannel } from "./email.mjs";
import { whatsappChannel } from "./whatsapp.mjs";

// Local capture only. Set ALERT_DRY_RUN_LOG to a file path. Nothing is sent, and the address is not written.
function logDryRun(env, entry) {
  const file = env && env.ALERT_DRY_RUN_LOG;
  if (!file) return;
  try {
    mkdirSync(dirname(file), { recursive: true });
    appendFileSync(file, JSON.stringify({ ...entry, at: new Date().toISOString() }) + "\n");
  } catch (e) {
    console.error("[notify] dry-run log failed", String(e && e.message || e));
  }
}

export const E164_RE = /^\+[1-9]\d{7,14}$/;
export const isE164 = (s) => E164_RE.test(String(s || ""));

export const CHANNELS = { email: emailChannel, whatsapp: whatsappChannel };

// payload: { parentName, childName, date, subjects: [{name, sets, target}], questions, accuracy|null }
// `formats` (optional) = { email: fn } overrides ch.format for one-off notices (e.g. a settings change) without touching the daily alert.
export async function dispatchAlert(channelList, payload, { env = process.env, fetchImpl, dryRun = false, formats } = {}) {
  const out = [];
  for (const c of Array.isArray(channelList) ? channelList : []) {
    const ch = CHANNELS[c?.type];
    if (!ch || !c.enabled) continue;
    const message = formats && formats[ch.type] ? formats[ch.type](payload) : ch.format(payload);
    // A channel whose own switch is off (EMAIL_ALERTS_ENABLED / WHATSAPP_ENABLED) is rendered but never sent.
    if (dryRun || !ch.isEnabled(env)) {
      logDryRun(env, { type: ch.type, status: "dry-run", subject: message && message.subject, text: message && message.text });
      out.push({ type: ch.type, status: "dry-run", message });
      continue;
    }
    try { out.push({ type: ch.type, ...(await ch.send(c, message, { env, fetchImpl })) }); }
    catch (e) { out.push({ type: ch.type, status: "error", error: String(e?.message || e) }); }
  }
  return out;
}
