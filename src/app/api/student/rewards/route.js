// Student rewards status: stickers + this week's review state. Read-only. Flag-gated (NEXT_PUBLIC_REWARDS_ENABLED, default off).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate } from "@/lib/activity";
import { isSaturday, weekStart } from "@/lib/rewards";

export const runtime = "nodejs";

export async function GET() {
  if (!serverAuthEnabled() || !REWARDS) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const admin = adminClient();
  const today = sgtDate();
  const ws = weekStart(today);
  const [st, wr] = await Promise.all([
    admin.from("stickers").select("kind,period").eq("child_id", me.profile.id).order("period", { ascending: false }).limit(400),
    admin.from("weekly_reviews").select("subject").eq("child_id", me.profile.id).eq("week_start", ws),
  ]);
  if (st.error || wr.error) return jerr("could not load", 500);
  const stickers = st.data || [];
  return jok({
    today, saturday: isSaturday(today), weekStart: ws,
    weeklyDone: (wr.data || []).map((r) => r.subject),
    counts: { daily: stickers.filter((s) => s.kind === "daily").length, weekly: stickers.filter((s) => s.kind === "weekly").length },
    stickers: stickers.slice(0, 60),
  });
}
