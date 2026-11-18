// Parent marks a payout as PAID: records credits settled + SGD amount + date (atomic in SQL record_payout()).
// RECORD ONLY: the app never moves money. Blocks if credits exceed this parent's unpaid balance. Flag-gated, default off.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { REWARDS } from "@/lib/supabase/config";
import { sgtDate } from "@/lib/activity";
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
  const { data, error } = await adminClient().rpc("record_payout", {
    p_parent: me.profile.id, p_child: child, p_credits: credits, p_amount: amount, p_paid_on: paidOn, p_note: String(b.note || "").slice(0, 200),
  });
  if (error || !data) return jerr("could not record", 500);
  if (data.error === "not_linked") return jerr("not your child", 403);
  if (data.error === "balance") return Response.json({ error: `Only ${data.balance} unpaid credits available.`, code: "balance", balance: data.balance }, { status: 409, headers: { "Cache-Control": "no-store" } });
  return jok({ balance: data.balance });
}
