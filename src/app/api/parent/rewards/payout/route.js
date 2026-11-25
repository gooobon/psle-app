// Parent marks a payout as PAID: records credits settled + SGD amount + date (atomic in SQL record_payout()).
// RECORD ONLY: the app never moves money. Blocks if credits exceed the child's unpaid CONFIRMED balance (pending and forfeited credits never count). Flag-gated, default off.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate } from "@/lib/activity";
import { checkPayout } from "@/lib/rewards";
import { loadChildSetting } from "@/lib/rewardsServer";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;

export async function POST(request) {
  if (!serverAuthEnabled() || !REWARDS) return jerr("rewards disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit(`rwpay:${me.profile.id}:${clientIp(request)}`, { max: 20, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const child = String(b.child || "");
  const credits = Number(b.credits);
  const amount = Math.round(Number(b.amountSgd) * 100) / 100;
  const paidOn = String(b.paidOn || sgtDate());
  if (!UUID.test(child) || !Number.isInteger(credits) || credits < 1 || credits > 100000) return jerr("Enter a whole number of credits.", 400);
  if (!Number.isFinite(amount) || amount < 0 || amount > 100000) return jerr("Enter a valid SGD amount.", 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paidOn) || Number.isNaN(Date.parse(paidOn)) || paidOn > sgtDate()) return jerr("Enter a valid date (not in the future).", 400);
  // Cash-out minimum and limit (issue #133), from the shared setting in force today. Enforced here so it works without any SQL change;
  // 0 / unset = no minimum, no limit. Fails closed if the setting or the payout history cannot be read.
  const admin = adminClient();
  const { data: link } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id).eq("child_id", child).maybeSingle();
  if (!link) return jerr("not your child", 403);
  const cs = await loadChildSetting(admin, child, sgtDate());
  if (!cs.ok) return jerr("could not check the cash-out settings", 500);
  const prior = await admin.from("reward_payouts").select("amount_sgd,paid_on").eq("child_id", child).limit(2000);
  if (prior.error) return jerr("could not check the cash-out settings", 500);
  const chk = checkPayout({ amountSgd: amount, paidOn, rule: cs.setting.rule, payouts: prior.data || [] });
  if (!chk.ok) return Response.json({ error: chk.error, code: chk.code, min: chk.min, limit: chk.limit, left: chk.left }, { status: 422, headers: { "Cache-Control": "no-store" } });
  const { data, error } = await admin.rpc("record_payout", {
    p_parent: me.profile.id, p_child: child, p_credits: credits, p_amount: amount, p_paid_on: paidOn, p_note: String(b.note || "").slice(0, 200),
  });
  if (error || !data) return jerr("could not record", 500);
  if (data.error === "not_linked") return jerr("not your child", 403);
  if (data.error === "balance") return Response.json({ error: `Only ${data.balance} unpaid credits available.`, code: "balance", balance: data.balance }, { status: 409, headers: { "Cache-Control": "no-store" } });
  return jok({ balance: data.balance });
}
