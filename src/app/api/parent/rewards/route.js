// Parent rewards: GET = stickers, weekly-review status, rules, credit ledger, payouts for ONE linked child.
// PUT = edit the child's ONE shared setting (any linked parent; effective TOMORROW SGT, audit-logged, co-parent notified), so already-awarded credits keep their snapshot.
// The ledger is per child: both parents see the same credits. Only CONFIRMED credits count toward the balance; pending and forfeited are shown separately.
// Record only: nothing here moves money. Flag-gated (NEXT_PUBLIC_REWARDS_ENABLED, default off); linked guardians only.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate } from "@/lib/activity";
import { weekStart, creditTotals, PENDING_NOTE } from "@/lib/rewards";
import { settingForDate, tomorrowSgt } from "@/lib/childSettings";
import { saveChildSetting } from "@/lib/childSettingsServer";
import { finalizeCredits, SETTING_COLUMNS } from "@/lib/rewardsServer";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;
const on = () => serverAuthEnabled() && REWARDS;

async function linked(admin, parentId, child) {
  const { data } = await admin.from("parent_child").select("child_id").eq("parent_id", parentId).eq("child_id", child).maybeSingle();
  return !!data;
}

export async function GET(request) {
  if (!on()) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const child = new URL(request.url).searchParams.get("child") || "";
  if (!UUID.test(child)) return jerr("bad child", 400);
  const admin = adminClient();
  if (!(await linked(admin, me.profile.id, child))) return jerr("not your child", 403);
  const today = sgtDate();
  const ws = weekStart(today);
  await finalizeCredits(admin, child, today);
  const [st, wr, ru, cr, po] = await Promise.all([
    admin.from("stickers").select("kind,period").eq("child_id", child),
    admin.from("weekly_reviews").select("subject,items,completed_at").eq("child_id", child).eq("week_start", ws),
    admin.from("child_setting_versions").select(SETTING_COLUMNS).eq("child_id", child).order("effective_from", { ascending: true }),
    admin.from("reward_credits").select("kind,period,subject,score_pct,credits,sgd_per_credit,status,gate_day,created_at").eq("child_id", child).order("period", { ascending: false }),
    admin.from("reward_payouts").select("id,credits,amount_sgd,paid_on,note,created_at").eq("child_id", child).order("created_at", { ascending: false }),
  ]);
  if (st.error || wr.error || ru.error || cr.error || po.error) return jerr("could not load", 500);
  const stickers = st.data || [];
  const credits = cr.data || [], payouts = po.data || [];
  const paid = payouts.reduce((a, r) => a + r.credits, 0);
  const totals = creditTotals(credits, paid);
  const versions = ru.data || [];
  const tomorrow = tomorrowSgt(today);
  const current = settingForDate(versions, today);
  const next = settingForDate(versions, tomorrow);
  return jok({
    today, weekStart: ws, tomorrow,
    weekly: { done: (wr.data || []).length > 0, subjects: (wr.data || []).map((x) => x.subject) },
    stickers: { total: stickers.length, daily: stickers.filter((s) => s.kind === "daily").length, weekly: stickers.filter((s) => s.kind === "weekly").length, paper: stickers.filter((s) => s.kind === "paper").length },
    // rules = what applies TODAY (read-only in the form's header); form edits start from what applies tomorrow (includes a co-parent's edit).
    rules: current.rule, formRules: next.rule, upcoming: next.effectiveFrom > today ? [next.rule] : [],
    ledger: { earned: totals.confirmed, pending: totals.pending, forfeited: totals.forfeited, pendingNote: PENDING_NOTE, paid, balance: totals.balance, rows: credits.slice(0, 60) },
    payouts: payouts.slice(0, 30).map((p) => ({ ...p, amount_sgd: Number(p.amount_sgd) })),
  });
}

export async function PUT(request) {
  if (!on()) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit(`rwp:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const child = String(b.child || "");
  if (!UUID.test(child)) return jerr("bad child", 400);
  const admin = adminClient();
  if (!(await linked(admin, me.profile.id, child))) return jerr("not your child", 403);
  // Any effectiveFrom sent by the client is ignored: the shared setting always changes from the next SGT day.
  const r = await saveChildSetting(admin, me.profile, child, {
    enabled: b.enabled, sgdPerCredit: b.sgdPerCredit, dailyTiers: b.dailyTiers, weeklyUnit: b.weeklyUnit, weeklyAmounts: b.weeklyAmounts,
    paperUnit: b.paperUnit, paperAmounts: b.paperAmounts, paperCheckOff: b.paperCheckOff,
  });
  if (!r.ok) return jerr(r.error, r.status || 500);
  return jok({ rule: r.setting.rule, changes: r.changes });
}
