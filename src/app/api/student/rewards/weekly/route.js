// Student reports finishing the Saturday weekly review. Only accepted on a Saturday (SGT). Records the review (idempotent per
// child/week/subject) and awards ONE 'weekly' bonus sticker per week via award_sticker(). Flag-gated, default off.
// Limitation: completion is reported by the app (like /api/activity); the server checks day, role and bounds, not the answers.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { SUBJECT_KEYS, sgtDate } from "@/lib/activity";
import { isSaturday, weekStart } from "@/lib/rewards";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled() || !REWARDS) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`rww:${me.profile.id}:${clientIp(request)}`, { max: 20, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const subject = String(b.subject || "");
  const items = Math.round(Number(b.items) || 0);
  if (!SUBJECT_KEYS.includes(subject) || items < 1 || items > 500) return jerr("bad request", 400);
  const today = sgtDate();
  if (!isSaturday(today)) return jerr("Weekly Review is on Saturdays", 409);
  const ws = weekStart(today);
  const admin = adminClient();
  const ins = await admin.from("weekly_reviews").upsert({ child_id: me.profile.id, week_start: ws, subject, items }, { onConflict: "child_id,week_start,subject", ignoreDuplicates: true });
  if (ins.error) return jerr("could not save", 500);
  const { data, error } = await admin.rpc("award_sticker", { p_child: me.profile.id, p_kind: "weekly", p_period: ws });
  if (error) return jerr("could not award", 500);
  return jok({ awarded: !!(data && data.awarded) });
}
