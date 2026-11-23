// ClewQuest: a signed-in picture-code child emails their live 6-digit link code to a parent. Flag off => 404.
// The parent's address is used for this send only (not stored, not logged). 3 per hour per child.
import { adminClient, currentUser, jerr, jok, readJson } from "@/lib/supabase/server";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { usesPictureCode } from "@/lib/clewquest/pictureFlag";
import { sendLinkCodeEmail } from "@/lib/clewquest/linkEmail.mjs";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "student" || !me.profile.username) return jerr("student login required", 401);
  if (!usesPictureCode(me.user)) return jerr("not available for this account", 409);
  const b = await readJson(request);
  const r = await sendLinkCodeEmail({ admin: adminClient(), childId: me.profile.id, username: me.profile.username, code: String(b.code || ""), email: b.email, pepper: process.env.CLEWQUEST_PICTURE_PEPPER });
  if (r.status !== 200) return jerr(r.error, r.status);
  return jok({ sent: true });
}
