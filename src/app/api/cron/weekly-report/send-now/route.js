// Owner trial: POST /api/cron/weekly-report/send-now with "Authorization: Bearer $CRON_SECRET" and a JSON body
//   { "parentId": "<uuid>" }  or  { "email": "<parent email>" }   (body, not URL, so addresses stay out of request logs)
//   optional "dryRun": false   (default TRUE: render + log, no email, no alert_log row)
// Exactly ONE parent per call. A real trial send additionally requires ALERT_TEST_RECIPIENTS to be set and the parent's address on it,
// and EMAIL_ALERTS_ENABLED=true. It is logged under a separate alert_log channel, so it never burns the week's real claim.
import { adminClient, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { trialForParent, bearerOk } from "@/lib/notify/weeklyReport.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
const UUID = /^[0-9a-f-]{36}$/i;

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  if (!bearerOk(request.headers.get("authorization"), process.env.CRON_SECRET)) return jerr("unauthorized", 401); // fail closed
  const b = await readJson(request);
  const parentId = b.parentId ? String(b.parentId) : "";
  const email = b.email ? String(b.email) : "";
  if ((!parentId && !email) || (parentId && !UUID.test(parentId))) return jerr("parentId or email required (one parent only)", 400);
  const result = await trialForParent(adminClient(), { parentId, email, dryRun: b.dryRun !== false });
  return jok({ result });
}
