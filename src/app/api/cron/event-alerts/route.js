// Vercel Cron target (06:35 Asia/Singapore, once a day: Hobby plan limit). Sends deferred alerts whose quiet hours ended.
// Also flushed opportunistically on every new event. No-op unless WHATSAPP_ENABLED=true. Fails closed without CRON_SECRET.
import { adminClient, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { safeEqual } from "@/lib/adminSession";
import { flushDeferred } from "@/lib/notify/eventAlerts.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const secret = process.env.CRON_SECRET;
  if (!secret || !safeEqual(request.headers.get("authorization") || "", `Bearer ${secret}`)) return jerr("unauthorized", 401);
  return jok({ summary: await flushDeferred(adminClient()) });
}
