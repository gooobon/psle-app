// Student asks "did I meet today's target?". The SERVER decides from daily_activity (never trusts the client) and awards
// at most one 'daily' sticker per child per SGT day (award_sticker() is idempotent). Flag-gated, default off.
// Target = same rule as /api/student/daily-target (earliest linked parent with settings). TODO(owner): two parents who differ.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate, pickParentDailyTarget } from "@/lib/activity";
import { dailyTargetStatus, dailyCreditPlan } from "@/lib/rewards";
import { loadHomeworkGate, loadRewardRule } from "@/lib/rewardsServer";
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
  const { data: rows, error } = await admin.from("daily_activity").select("subject,sets_completed,questions_answered,correct,first_set_questions,first_set_correct").eq("user_id", me.profile.id).eq("date", today);
  if (error) return jerr("could not check", 500);
  const status = dailyTargetStatus(me.profile.grade || "P3", target, rows);
  // Sticker: unchanged rule (all required subjects met). Not gated by homework; only CREDITS are.
  let awarded = false;
  if (status.met) {
    const { data, error: ae } = await admin.rpc("award_sticker", { p_child: me.profile.id, p_kind: "daily", p_period: today });
    if (ae) return jerr("could not award", 500);
    awarded = !!(data && data.awarded);
  }
  // Credits: per subject, tier of that subject's FIRST set today. Only after all of today's parent homework is done
  // (no homework assigned today = eligible). Repeat calls are no-ops (unique per parent/child/kind/period/subject).
  const gate = await loadHomeworkGate(admin, me.profile.id, today);
  if (!gate.ok) return jerr("could not check", 500);
  const out = { met: status.met, awarded, required: status.required, homework: { eligible: gate.eligible, assigned: gate.assigned, remaining: gate.remaining }, credits: [] };
  if (!gate.eligible) return jok(out);
  const rr = await loadRewardRule(admin, me.profile.id, today);
  if (!rr.ok) return jerr("could not check", 500);
  if (!rr.rule) return jok(out);
  for (const p of dailyCreditPlan(rr.rule, rows)) {
    if (p.credits <= 0) continue;
    const { data, error: ce } = await admin.rpc("award_credit", {
      p_parent: rr.parentId, p_child: me.profile.id, p_kind: "daily", p_period: today, p_subject: p.subject,
      p_credits: p.credits, p_rate: rr.rule.sgdPerCredit, p_score_pct: p.pct, p_effective: rr.rule.effectiveFrom,
    });
    if (ce) return jerr("could not award", 500);
    out.credits.push({ subject: p.subject, pct: p.pct, credits: p.credits, newlyAwarded: !!(data && data.awarded) });
  }
  return jok(out);
}
