// The invited parent accepts. Requires a logged-in parent whose CONFIRMED login email equals the invited email.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("coparent-accept:" + me.profile.id, { max: 20, windowMs: 3600_000 })) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const id = String(b.inviteId || "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) return jerr("bad request", 400);
  const myEmail = me.user.email_confirmed_at ? String(me.user.email || "").toLowerCase() : "";
  const admin = adminClient();
  const { data: inv } = await admin.from("guardian_invites").select("*").eq("id", id).maybeSingle();
  // One generic error for every failure mode, so invite ids/emails cannot be probed.
  const bad = () => jerr("this invite is not valid (it may have expired or been revoked)", 410);
  if (!inv || inv.status !== "pending" || new Date(inv.expires_at) <= new Date() || !myEmail || inv.email.toLowerCase() !== myEmail) return bad();
  const link = await admin.from("parent_child").upsert({ parent_id: me.profile.id, child_id: inv.child_id }, { onConflict: "parent_id,child_id", ignoreDuplicates: true });
  if (link.error) return jerr("could not accept", 500);
  // Conditional update: only the first accept flips the invite.
  await admin.from("guardian_invites").update({ status: "accepted", accepted_by: me.profile.id, accepted_at: new Date().toISOString() })
    .eq("id", id).eq("status", "pending");
  const { data: child } = await admin.from("profiles").select("*").eq("id", inv.child_id).maybeSingle();
  return jok({ message: "Invite accepted. You can now see this child.", child: child ? publicProfile(child) : null });
}
