// Student asks "did I meet today's target?". The SERVER decides from daily_activity (never trusts the client) and awards
// at most one 'daily' sticker per child per SGT day (award_sticker() is idempotent). Flag-gated, default off.
// Target = the child's ONE shared setting in force today (src/lib/childSettings.js; any linked parent may edit, effective next SGT day).
// CREDITS are created PENDING and confirmed only when the day's homework condition holds (finalize_credits, idempotent, server-side).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate } from "@/lib/activity";
import { dailyTargetStatus, dailyCreditPlan } from "@/lib/rewards";
import { loadHomeworkGate, loadRewardRule, loadChildSetting, finalizeCredits } from "@/lib/rewardsServer";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled() || !REWARDS) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  if (!rateLimit(`rwc:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const admin = adminClient();
  const today = sgtDate();
  await finalizeCredits(admin, me.profile.id, today); // lazily settle earlier days (forfeit / confirm) before anything else
  const cs = await loadChildSetting(admin, me.profile.id, today);
  if (!cs.ok) return jerr("could not check", 500);
  const target = cs.setting.dailyTarget;
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
  // Credits: per subject, tier of that subject's FIRST set today. They are created PENDING no matter what the homework state is right now
  // (the parent may still assign homework later today). finalize_credits() then confirms them at once if everything assigned today is solved,
  // otherwise they wait until the end of the SGT day. Repeat calls are no-ops (one row per child/kind/period/subject).
  const gate = await loadHomeworkGate(admin, me.profile.id, today);
  if (!gate.ok) return jerr("could not check", 500);
  const out = { met: status.met, awarded, required: status.required, homework: { eligible: gate.eligible, assigned: gate.assigned, remaining: gate.remaining }, credits: [] };
  const rr = await loadRewardRule(admin, me.profile.id, today);
  if (!rr.ok) return jerr("could not check", 500);
  if (!rr.rule) return jok(out);
  for (const p of dailyCreditPlan(rr.rule, rows)) {
    if (p.credits <= 0) continue;
    const { data, error: ce } = await admin.rpc("award_credit", {
      p_parent: rr.parentId, p_child: me.profile.id, p_kind: "daily", p_period: today, p_subject: p.subject,
      p_credits: p.credits, p_rate: rr.rule.sgdPerCredit, p_score_pct: p.pct, p_effective: rr.rule.effectiveFrom, p_gate_day: today,
    });
    if (ce) return jerr("could not award", 500);
    out.credits.push({ subject: p.subject, pct: p.pct, credits: p.credits, newlyAwarded: !!(data && data.awarded) });
  }
  await finalizeCredits(admin, me.profile.id, today);
  return jok(out);
}
