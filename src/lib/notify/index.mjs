// Alert channel interface shared by email and WhatsApp.
//
// A channel is { type, isEnabled(env), format(payload) -> message, send(target, message, {env, fetchImpl}) }.
// A parent's settings hold a LIST of channels (parent_settings.alert_channels), so email and whatsapp
// can both be active. dispatchAlert() formats for every enabled channel and sends via each provider.
// Nothing here is called by a scheduler yet (daily alert job = a later PR); WhatsApp is shipped OFF.
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
    if (dryRun) { out.push({ type: ch.type, status: "dry-run", message }); continue; }
    try { out.push({ type: ch.type, ...(await ch.send(c, message, { env, fetchImpl })) }); }
    catch (e) { out.push({ type: ch.type, status: "error", error: String(e?.message || e) }); }
  }
  return out;
}
