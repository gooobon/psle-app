// The logged-in student's daily set goal, copied from the linked parent's parent_settings.daily_target.
// The child id is the session user. The route never accepts an id from the client.
// parent_settings stays parent-only under RLS: it also holds alert email and phone, so this
// route returns daily_target only, after checking the caller is that student.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { pickParentDailyTarget } from "@/lib/activity";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
    const me = await currentUser();
    if (!me || me.profile.role !== "student") return jerr("student login required", 401);
    const admin = adminClient();
    const { data: links, error: linkErr } = await admin
      .from("parent_child")
      .select("parent_id, created_at")
      .eq("child_id", me.profile.id);
    if (linkErr) return jerr("could not load target", 500);
    const parentIds = [...new Set((links || []).map((l) => l.parent_id).filter(Boolean))];
    if (!parentIds.length) return jok({ dailyTarget: pickParentDailyTarget([], []) });
    const { data: rows, error } = await admin
      .from("parent_settings")
      .select("parent_id, daily_target")
      .in("parent_id", parentIds);
    if (error) return jerr("could not load target", 500);
    return jok({ dailyTarget: pickParentDailyTarget(links, rows) });
  } catch {
    return jerr("could not load target", 500);
  }
}
