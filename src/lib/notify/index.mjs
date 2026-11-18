// Alert channel interface shared by email and WhatsApp.
//
// A channel is { type, isEnabled(env), format(payload) -> message, send(target, message, {env, fetchImpl}) }.
// A parent's settings hold a LIST of channels (parent_settings.alert_channels), so email and whatsapp
// can both be active. dispatchAlert() formats for every enabled channel and sends via each provider.
// Called by /api/cron/daily-alert (Vercel Cron, 20:00 SGT). Email needs EMAIL_ALERTS_ENABLED; WhatsApp is shipped OFF.
// Channels that are switched off still render, and come back as status "dry-run".
import { emailChannel } from "./email.mjs";
import { whatsappChannel } from "./whatsapp.mjs";

export const E164_RE = /^\+[1-9]\d{7,14}$/;
export const isE164 = (s) => E164_RE.test(String(s || ""));

export const CHANNELS = { email: emailChannel, whatsapp: whatsappChannel };

// payload: { parentName, childName, date, subjects: [{name, sets, target}], questions, accuracy|null }
export async function dispatchAlert(channelList, payload, { env = process.env, fetchImpl, dryRun = false } = {}) {
  const out = [];
  for (const c of Array.isArray(channelList) ? channelList : []) {
    const ch = CHANNELS[c?.type];
    if (!ch || !c.enabled) continue;
    const message = ch.format(payload);
    // A channel whose own switch is off (EMAIL_ALERTS_ENABLED / WHATSAPP_ENABLED) is rendered but never sent.
    if (dryRun || !ch.isEnabled(env)) { out.push({ type: ch.type, status: "dry-run", message }); continue; }
    try { out.push({ type: ch.type, ...(await ch.send(c, message, { env, fetchImpl })) }); }
    catch (e) { out.push({ type: ch.type, status: "error", error: String(e?.message || e) }); }
  }
  return out;
}
