// Student asks "did I meet today's target?". The SERVER decides from daily_activity (never trusts the client) and awards
// at most one 'daily' sticker per child per SGT day (award_sticker() is idempotent). Flag-gated, default off.
// Target = same rule as /api/student/daily-target (earliest linked parent with settings). TODO(owner): two parents who differ.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate, pickParentDailyTarget } from "@/lib/activity";
import { dailyTargetStatus } from "@/lib/rewards";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled() || !REWARDS) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`rwc:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const admin = adminClient();
  const today = sgtDate();
  const { data: links, error: le } = await admin.from("parent_child").select("parent_id, created_at").eq("child_id", me.profile.id);
  if (le) return jerr("could not check", 500);
  const parentIds = [...new Set((links || []).map((l) => l.parent_id))];
  let settings = [];
  if (parentIds.length) {
    const r = await admin.from("parent_settings").select("parent_id, daily_target").in("parent_id", parentIds);
    if (r.error) return jerr("could not check", 500);
    settings = r.data || [];
  }
  const target = pickParentDailyTarget(links, settings);
  const { data: rows, error } = await admin.from("daily_activity").select("subject,sets_completed").eq("user_id", me.profile.id).eq("date", today);
  if (error) return jerr("could not check", 500);
  const status = dailyTargetStatus(me.profile.grade || "P3", target, rows);
  if (!status.met) return jok({ met: false, awarded: false, required: status.required });
  const { data, error: ae } = await admin.rpc("award_sticker", { p_child: me.profile.id, p_kind: "daily", p_period: today });
  if (ae) return jerr("could not award", 500);
  return jok({ met: true, awarded: !!(data && data.awarded), required: status.required });
}
