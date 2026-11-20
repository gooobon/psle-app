// Admin-only dry run: GET /api/admin/alert-preview?email=parent@example.com  (admin cookie required).
// Renders THIS WEEK's report (the weekly template) for that parent. Never sends and never writes alert_log.
import { adminClient, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/adminSession";
import { previewWeekly } from "@/lib/notify/weeklyReport.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  if (!isAdminRequest(request)) return jerr("admin login required", 401);
  const email = String(new URL(request.url).searchParams.get("email") || "").trim().toLowerCase();
  if (!email) return jerr("email query parameter required", 400);
  const admin = adminClient();
  const { data: parent } = await admin.from("profiles").select("id,display_name,email").eq("role", "parent").eq("email", email).maybeSingle();
  if (!parent) return jerr("no parent with that email", 404);
  return jok(await previewWeekly(admin, parent));
}
