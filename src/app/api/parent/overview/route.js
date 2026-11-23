// Parent Overview totals for one linked child, read from the server (works from the parent's own device).
// Sessions = sum of sets_completed in daily_activity; average = correct / questions answered. Read-only.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { SUBJECT_KEYS } from "@/lib/activity";
import { summarizeActivity } from "@/lib/overviewSummary.mjs";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const child = new URL(request.url).searchParams.get("child") || "";
  if (!UUID.test(child)) return jerr("bad child", 400);
  const admin = adminClient();
  const { data: link } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id).eq("child_id", child).maybeSingle();
  if (!link) return jerr("not linked", 403);
  const { data: rows, error } = await admin.from("daily_activity").select("subject,sets_completed,questions_answered,correct").eq("user_id", child);
  if (error) return jerr("could not load", 500);
  return jok({ subjects: summarizeActivity(rows || [], SUBJECT_KEYS) });
}
