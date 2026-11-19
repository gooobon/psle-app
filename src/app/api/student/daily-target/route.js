// The logged-in student's daily set goal: the child's ONE shared setting in force today (any linked parent may edit it; edits apply from
// the next SGT day, so the target never changes mid-day). The child id is the session user; the route never accepts an id from the client.
// parent_settings stays parent-only under RLS (alert email / phone); this route returns the daily target only.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { sgtDate } from "@/lib/activity";
import { loadChildSetting } from "@/lib/rewardsServer";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
    const me = await currentUser();
    if (!me || me.profile.role !== "student") return jerr("student login required", 401);
    const r = await loadChildSetting(adminClient(), me.profile.id, sgtDate());
    if (!r.ok) return jerr("could not load target", 500);
    return jok({ dailyTarget: r.setting.dailyTarget });
  } catch {
    return jerr("could not load target", 500);
  }
}
