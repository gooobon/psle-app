// The inviting parent cancels a still-pending invite. (Does not remove an already-accepted guardian.)
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const b = await readJson(request);
  const id = String(b.inviteId || "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) return jerr("bad request", 400);
  const { data, error } = await adminClient().from("guardian_invites")
    .update({ status: "revoked", revoked_at: new Date().toISOString() })
    .eq("id", id).eq("inviter_id", me.profile.id).eq("status", "pending").select("id");
  if (error) return jerr("could not revoke", 500);
  if (!data?.length) return jerr("no pending invite to revoke", 404);
  return jok({ message: "Invite revoked." });
}
