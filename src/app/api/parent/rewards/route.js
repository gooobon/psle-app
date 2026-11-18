// Parent rewards: GET = stickers, weekly-review status, rules, credit ledger, payouts for ONE linked child.
// PUT = save this parent's reward rules for that child. Rules are per parent (a co-parent's rules/ledger are not visible here).
// Record only: nothing here moves money. Flag-gated (NEXT_PUBLIC_REWARDS_ENABLED, default off); linked guardians only.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate } from "@/lib/activity";
import { DEFAULT_RULES, weekStart, parseRules } from "@/lib/rewards";
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
  const ws = weekStart(sgtDate());
  const [st, wr, ru, cr, po] = await Promise.all([
    admin.from("stickers").select("kind,period").eq("child_id", child),
    admin.from("weekly_reviews").select("subject,items,completed_at").eq("child_id", child).eq("week_start", ws),
    admin.from("reward_rules").select("enabled,credits_per_day,credits_per_weekly,sgd_per_credit").eq("parent_id", me.profile.id).eq("child_id", child).maybeSingle(),
    admin.from("reward_credits").select("kind,period,credits,sgd_per_credit,created_at").eq("parent_id", me.profile.id).eq("child_id", child).order("period", { ascending: false }),
    admin.from("reward_payouts").select("id,credits,amount_sgd,paid_on,note,created_at").eq("parent_id", me.profile.id).eq("child_id", child).order("created_at", { ascending: false }),
  ]);
  if (st.error || wr.error || ru.error || cr.error || po.error) return jerr("could not load", 500);
  const stickers = st.data || [];
  const credits = cr.data || [], payouts = po.data || [];
  const earned = credits.reduce((a, r) => a + r.credits, 0);
  const paid = payouts.reduce((a, r) => a + r.credits, 0);
  const r = ru.data;
  return jok({
    today: sgtDate(), weekStart: ws,
    weekly: { done: (wr.data || []).length > 0, subjects: (wr.data || []).map((x) => x.subject) },
    stickers: { total: stickers.length, daily: stickers.filter((s) => s.kind === "daily").length, weekly: stickers.filter((s) => s.kind === "weekly").length },
    rules: r ? { enabled: r.enabled, creditsPerDay: r.credits_per_day, creditsPerWeekly: r.credits_per_weekly, sgdPerCredit: Number(r.sgd_per_credit) } : DEFAULT_RULES,
    ledger: { earned, paid, balance: earned - paid, rows: credits.slice(0, 60) },
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
  const p = parseRules(b);
  if (p.error) return jerr(p.error, 400);
  const admin = adminClient();
  if (!(await linked(admin, me.profile.id, child))) return jerr("not your child", 403);
  const { error } = await admin.from("reward_rules").upsert({
    parent_id: me.profile.id, child_id: child, enabled: p.rules.enabled, credits_per_day: p.rules.creditsPerDay,
    credits_per_weekly: p.rules.creditsPerWeekly, sgd_per_credit: p.rules.sgdPerCredit, updated_at: new Date().toISOString(),
  }, { onConflict: "parent_id,child_id" });
  if (error) return jerr("could not save", 500);
  return jok({ rules: p.rules });
}
