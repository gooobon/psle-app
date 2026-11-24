// Vercel Cron target (vercel.json: 0 12 * * * UTC = 20:00 Asia/Singapore). One daily job:
//   1. settles pending credits (daily, independent of any flag),
//   2. sends the daily parent WhatsApp summary (dry-run unless WHATSAPP_ENABLED=true; one per parent per SGT day),
//   3. runs the weekly EMAIL, which no-ops unless it is Sunday >= 20:00 SGT (one report per parent per week).
// Vercel sends "Authorization: Bearer $CRON_SECRET". Fails closed.
import { adminClient, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { runFallback, bearerOk } from "@/lib/notify/weeklyReport.mjs";
import { runDaily } from "@/lib/notify/dailyWhatsApp.mjs";
import { finalizeCredits } from "@/lib/rewardsServer";
import { sgtDate } from "@/lib/activity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  if (!bearerOk(request.headers.get("authorization"), process.env.CRON_SECRET)) return jerr("unauthorized", 401); // fail closed
  const admin = adminClient();
  const credits = await finalizeCredits(admin, null, sgtDate());
  let daily; try { daily = await runDaily(admin); } catch (e) { console.error("[daily-whatsapp] failed", String(e?.message || e)); daily = { error: true }; }
  const summary = await runFallback(admin);
  return jok({ daily, summary, creditsFinalized: credits });
}
