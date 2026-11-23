// Student rewards status: stickers + this week's review state. Read-only. Flag-gated (NEXT_PUBLIC_REWARDS_ENABLED, default off).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate } from "@/lib/activity";
import { isSaturday, weekStart, studentCredits } from "@/lib/rewards";
import { finalizeCredits } from "@/lib/rewardsServer";

export const runtime = "nodejs";

export async function GET() {
  if (!serverAuthEnabled() || !REWARDS) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const admin = adminClient();
  const today = sgtDate();
  const ws = weekStart(today);
  await finalizeCredits(admin, me.profile.id, today);
  const [st, wr, cr] = await Promise.all([
    admin.from("stickers").select("kind,period").eq("child_id", me.profile.id).order("period", { ascending: false }).limit(400),
    admin.from("weekly_reviews").select("subject").eq("child_id", me.profile.id).eq("week_start", ws),
    admin.from("reward_credits").select("kind,period,subject,credits,status,gate_day").eq("child_id", me.profile.id).order("period", { ascending: false }).limit(200),
  ]);
  if (st.error || wr.error || cr.error) return jerr("could not load", 500);
  const stickers = st.data || [];
  const rows = cr.data || [];
  return jok({
    today, saturday: isSaturday(today), weekStart: ws,
    weeklyDone: (wr.data || []).map((r) => r.subject),
    counts: { daily: stickers.filter((s) => s.kind === "daily").length, weekly: stickers.filter((s) => s.kind === "weekly").length },
    stickers: stickers.slice(0, 60),
    // Only CONFIRMED credits are earned; pending ones wait for the day's homework, forfeited ones are kept as a record.
    // Only CONFIRMED credits are earned; pending ones wait for the day's homework. Credits only: no dollar value ever reaches a student.
    credits: studentCredits(rows),
  });
}
