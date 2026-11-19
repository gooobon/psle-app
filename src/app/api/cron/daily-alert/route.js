// Vercel Cron target (vercel.json: 0 12 * * * UTC = 20:00 Asia/Singapore). Vercel sends
// "Authorization: Bearer $CRON_SECRET". Idempotent per parent per day via alert_log.
import { adminClient, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { safeEqual } from "@/lib/adminSession";
import { runDailyAlerts } from "@/lib/dailyAlert";
import { finalizeCredits } from "@/lib/rewardsServer";
import { sgtDate } from "@/lib/activity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const secret = process.env.CRON_SECRET;
  const got = request.headers.get("authorization") || "";
  if (!secret || !safeEqual(got, `Bearer ${secret}`)) return jerr("unauthorized", 401); // fail closed
  const admin = adminClient();
  // Settle pending credits for every child (days that ended are forfeited/confirmed). Idempotent; independent of the email flag.
  const credits = await finalizeCredits(admin, null, sgtDate());
  const summary = await runDailyAlerts(admin);
  return jok({ summary, creditsFinalized: credits });
}
