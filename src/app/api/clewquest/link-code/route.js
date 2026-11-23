// ClewQuest: a signed-in picture-code child asks for a one-time 6-digit code (10 minutes) to give to a parent. Flag off => 404.
import { adminClient, currentUser, jerr, jok } from "@/lib/supabase/server";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { usesPictureCode } from "@/lib/clewquest/pictureFlag";
import { issueLinkCode } from "@/lib/clewquest/linkCode";

export const runtime = "nodejs";

export async function POST() {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "student" || !me.profile.username) return jerr("student login required", 401);
  if (!usesPictureCode(me.user)) return jerr("not available for this account", 409);
  const r = await issueLinkCode({ admin: adminClient(), childId: me.profile.id, username: me.profile.username, pepper: process.env.CLEWQUEST_PICTURE_PEPPER });
  if (r.status !== 200) return jerr(r.error, r.status);
  return jok({ code: r.code, expiresInSecs: r.expiresInSecs });
}
