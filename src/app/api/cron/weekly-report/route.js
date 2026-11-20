// Vercel Cron target, FALLBACK ONLY (vercel.json: 0 13 * * * UTC = 21:00 Asia/Singapore, the one daily cron the Hobby plan allows).
// The happy-path weekly report is sent by an event (Saturday weekly review / Saturday paper), not by this route. This route:
//   1. settles pending credits (daily, independent of any email flag), then
//   2. runs the weekly-report fallback, which no-ops unless it is Saturday >= 21:00 SGT or Sunday (catch-up). One report per parent per week.
// Vercel sends "Authorization: Bearer $CRON_SECRET". Fails closed.
import { adminClient, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { runFallback, bearerOk } from "@/lib/notify/weeklyReport.mjs";
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
  const summary = await runFallback(admin);
  return jok({ summary, creditsFinalized: credits });
}
