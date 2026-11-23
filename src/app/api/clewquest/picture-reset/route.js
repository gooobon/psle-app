// ClewQuest: a linked parent sets a new picture code for their child (parent_child link). Flag off => 404.
import { adminClient, currentUser, jerr, jok, readJson } from "@/lib/supabase/server";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { derivePicturePassword, loginGuard } from "@/lib/clewquest/pictureServer";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const b = await readJson(request);
  const childId = String(b.childId || "");
  const seq = normalizeSequence(b.sequence);
  if (!childId || !seq) return jerr("bad request", 400);
  const admin = adminClient();
  const { data: link } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id).eq("child_id", childId).maybeSingle();
  if (!link) return jerr("not your child", 403);
  const { data: kid } = await admin.from("profiles").select("username,role").eq("id", childId).maybeSingle();
  if (!kid || kid.role !== "student" || !kid.username) return jerr("not found", 404);
  // Only a child who already signs in with a picture code: this must never silently replace a normal password.
  const cur = await admin.auth.admin.getUserById(childId);
  if (cur.error || !cur.data?.user) return jerr("not found", 404);
  if (cur.data.user.user_metadata?.picture_code !== true) return jerr("this account does not use a picture code", 409);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, kid.username, seq); } catch { return jerr("picture codes unavailable", 503); }
  const up = await admin.auth.admin.updateUserById(childId, { password, user_metadata: { role: "student", picture_code: true } });
  if (up.error) return jerr("could not reset", 500);
  await loginGuard.reset(admin, kid.username); // a locked-out child can sign in with the new code right away
  return jok({});
}
