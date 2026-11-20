// Student reports that they started solving. Sends the "practice started" alert (WhatsApp, email fallback) to both linked parents,
// at most once per child per SGT day (event_alert_log key started:<child>:<day>). Does nothing unless WHATSAPP_ENABLED=true.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { SUBJECT_KEYS } from "@/lib/activity";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { notifyEvent } from "@/lib/notify/eventAlerts.mjs";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const b = await readJson(request);
  const subject = String(b.subject || "");
  if (!SUBJECT_KEYS.includes(subject)) return jerr("bad request", 400);
  if (process.env.WHATSAPP_ENABLED !== "true") return jok({ alert: "off" });
  if (!rateLimit(`started:${me.profile.id}:${clientIp(request)}`, { max: 20, windowMs: 60_000 })) return jerr("too many requests", 429);
  const r = await notifyEvent(adminClient(), { type: "started", childId: me.profile.id, subject });
  return jok({ alert: "on", duplicate: r.duplicate, deferred: r.deferred });
}
