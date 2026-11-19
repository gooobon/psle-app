// Parent alert settings: daily target + alert channel list (email now, whatsapp opt-in later).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { SUBJECT_KEYS, DEFAULT_TARGET } from "@/lib/activity";
import { clampHomeworkCount, HOMEWORK_PER_MISTAKE } from "@/lib/homework";
import { isE164 } from "@/lib/notify/index.mjs";

export const runtime = "nodejs";

async function guard() {
  if (!serverAuthEnabled()) return { err: jerr("server auth disabled", 404) };
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return { err: jerr("parent login required", 401) };
  return { me };
}
const view = (row) => ({
  dailyTarget: { ...DEFAULT_TARGET, ...(row?.daily_target || {}) },
  channels: Array.isArray(row?.alert_channels) ? row.alert_channels : [],
  homeworkPerMistake: row?.homework_per_mistake ?? HOMEWORK_PER_MISTAKE,
});

export async function GET() {
  const g = await guard(); if (g.err) return g.err;
  const { data } = await adminClient().from("parent_settings").select("daily_target,alert_channels,homework_per_mistake").eq("parent_id", g.me.profile.id).maybeSingle();
  return jok(view(data));
}

// Body: { dailyTarget?: {English:1,...}, email?: { enabled: boolean }, whatsapp?: { number: "+65...", optIn: boolean } }
export async function POST(request) {
  const g = await guard(); if (g.err) return g.err;
  const b = await readJson(request);
  const admin = adminClient();
  const { data: cur } = await admin.from("parent_settings").select("daily_target,alert_channels,alert_email").eq("parent_id", g.me.profile.id).maybeSingle();
  const patch = { updated_at: new Date().toISOString() };
  if (b.dailyTarget && typeof b.dailyTarget === "object") {
    const t = { ...DEFAULT_TARGET, ...(cur?.daily_target || {}) };
    for (const s of SUBJECT_KEYS) if (b.dailyTarget[s] != null) t[s] = Math.max(0, Math.min(10, Math.round(Number(b.dailyTarget[s]) || 0)));
    patch.daily_target = t;
  }
  if (b.homeworkPerMistake != null) patch.homework_per_mistake = clampHomeworkCount(b.homeworkPerMistake);
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
  const { error } = cur
    ? await admin.from("parent_settings").update(patch).eq("parent_id", g.me.profile.id)
    : await admin.from("parent_settings").insert({ parent_id: g.me.profile.id, ...patch });
  if (error) return jerr("could not save", 500);
  const { data } = await admin.from("parent_settings").select("daily_target,alert_channels,homework_per_mistake").eq("parent_id", g.me.profile.id).maybeSingle();
  return jok(view(data));
}
