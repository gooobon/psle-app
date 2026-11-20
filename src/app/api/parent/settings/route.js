// Parent alert settings: alert channel list (email now, whatsapp opt-in later). Per-parent only.
// The daily target and homework count moved to the child's ONE shared setting: /api/parent/child-settings (issue #32).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { isE164 } from "@/lib/notify/index.mjs";
import { isHHMM, quietFrom } from "@/lib/notify/eventAlerts.mjs";

export const runtime = "nodejs";

async function guard() {
  if (!serverAuthEnabled()) return { err: jerr("server auth disabled", 404) };
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return { err: jerr("parent login required", 401) };
  return { me };
}
const view = (row) => ({
  channels: Array.isArray(row?.alert_channels) ? row.alert_channels : [],
  quiet: quietFrom(row), // real-time alert quiet hours (SGT); messages inside the window are delayed, not dropped
});
// Quiet-hours columns need supabase/migrations/20261201000000_event_alerts.sql; before it is applied fall back to channels only.
async function readSettings(admin, id) {
  const full = await admin.from("parent_settings").select("alert_channels,quiet_enabled,quiet_start,quiet_end").eq("parent_id", id).maybeSingle();
  if (!full.error) return full.data;
  return (await admin.from("parent_settings").select("alert_channels").eq("parent_id", id).maybeSingle()).data;
}

export async function GET() {
  const g = await guard(); if (g.err) return g.err;
  return jok(view(await readSettings(adminClient(), g.me.profile.id)));
}

// Body: { email?: { enabled: boolean }, whatsapp?: { number: "+65...", optIn: boolean } }
export async function POST(request) {
  const g = await guard(); if (g.err) return g.err;
  const b = await readJson(request);
  const admin = adminClient();
  const { data: cur } = await admin.from("parent_settings").select("alert_channels,alert_email").eq("parent_id", g.me.profile.id).maybeSingle();
  const patch = { updated_at: new Date().toISOString() };
  if (b.email && typeof b.email === "object" && typeof b.email.enabled === "boolean") {
    // Opt out / back in. Address falls back to the account email; stored per parent in alert_channels.
    const list = Array.isArray(cur?.alert_channels) ? cur.alert_channels : [];
    const old = list.find(c => c.type === "email");
    const addr = old?.address || cur?.alert_email || g.me.profile.email || null;
    // No entry yet (older account) = enabled by default, but only for a confirmed address. Explicit false is always stored.
    let enabled = b.email.enabled;
    if (!old && enabled) {
      const { data: u } = await admin.auth.admin.getUserById(g.me.profile.id);
      enabled = !!u?.user?.email_confirmed_at;
    }
    patch.alert_channels = [...list.filter(c => c.type !== "email"), { type: "email", enabled, address: addr }];
  }
  if (b.whatsapp && typeof b.whatsapp === "object") {
    const number = String(b.whatsapp.number || "").trim();
    const optIn = !!b.whatsapp.optIn;
    if (number && !isE164(number)) return jerr("WhatsApp number must be in international format, e.g. +6591234567", 400);
    if (optIn && !number) return jerr("enter a WhatsApp number to opt in", 400);
    const rest = (Array.isArray(patch.alert_channels) ? patch.alert_channels : Array.isArray(cur?.alert_channels) ? cur.alert_channels : []).filter(c => c.type !== "whatsapp");
    // Stored even while WHATSAPP_ENABLED is off; nothing is sent until the owner enables the provider.
    rest.push({ type: "whatsapp", enabled: optIn, address: number || null, opt_in: optIn });
    patch.alert_channels = rest;
  }
  // Body: quiet?: { enabled: boolean, start: "HH:MM", end: "HH:MM" } (Singapore time)
  if (b.quiet && typeof b.quiet === "object") {
    if (!isHHMM(b.quiet.start) || !isHHMM(b.quiet.end)) return jerr("quiet hours must be HH:MM, e.g. 21:30", 400);
    Object.assign(patch, { quiet_enabled: b.quiet.enabled !== false, quiet_start: b.quiet.start, quiet_end: b.quiet.end });
  }
  const { error } = cur
    ? await admin.from("parent_settings").update(patch).eq("parent_id", g.me.profile.id)
    : await admin.from("parent_settings").insert({ parent_id: g.me.profile.id, ...patch });
  if (error) return jerr("could not save", 500);
  return jok(view(await readSettings(admin, g.me.profile.id)));
}
