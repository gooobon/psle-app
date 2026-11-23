// Parent resets a child's sign-in to a NEW picture code (reset, never reveal). Pure: the admin client and secrets are injected.
//   403 no parent_child link / 404 child missing / 409 typed-password child that was not explicitly confirmed / 503 unavailable.
// A typed-password child is switched to a picture-code account (app_metadata.picture_code = true, service role only).
// The sequence is never logged or stored; only the derived password goes to Supabase Auth.
import { derivePicturePassword } from "./pictureServer.js";
import { usesPictureCode, PICTURE_APP_METADATA } from "./pictureFlag.js";

export async function resetSignin({ admin, parentId, childId, seq, confirmSwitch, pepper, clearLockout }) {
  if (!childId || !seq) return { status: 400, error: "bad request" };
  const { data: link } = await admin.from("parent_child").select("child_id").eq("parent_id", parentId).eq("child_id", childId).maybeSingle();
  if (!link) return { status: 403, error: "not your child" };
  const { data: kid } = await admin.from("profiles").select("username,role,display_name").eq("id", childId).maybeSingle();
  if (!kid || kid.role !== "student" || !kid.username) return { status: 404, error: "not found" };
  const cur = await admin.auth.admin.getUserById(childId);
  if (cur.error || !cur.data?.user) return { status: 404, error: "not found" };
  const typed = !usesPictureCode(cur.data.user); // app_metadata only, never user_metadata
  if (typed && confirmSwitch !== true) return { status: 409, error: "confirm switch to pictures", needsConfirm: true };
  let password;
  try { password = derivePicturePassword(pepper, kid.username, seq); } catch { return { status: 503, error: "picture codes unavailable" }; }
  const up = await admin.auth.admin.updateUserById(childId, { password, app_metadata: PICTURE_APP_METADATA });
  if (up.error) return { status: 500, error: "could not reset" };
  const cleared = await clearLockout(kid.username); // a locked-out child can sign in with the new code right away
  if (cleared && cleared.error) return { status: 503, error: "picture codes unavailable" };
  return { status: 200, username: kid.username, name: kid.display_name || "", switched: typed };
}
