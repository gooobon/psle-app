// ClewQuest: a logged-in parent creates a picture-code child; the child is linked (parent_child) at creation. Flag off => 404.
import { adminClient, currentUser, jerr, jok, readJson, publicProfile, createStudent } from "@/lib/supabase/server";
import { normUsername, USERNAME_RE, RESERVED_USERNAMES } from "@/lib/supabase/config";
import { rateLimit } from "@/lib/rateLimit";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { derivePicturePassword } from "@/lib/clewquest/pictureServer";
import { PICTURE_APP_METADATA } from "@/lib/clewquest/pictureFlag";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("cqpchild:" + me.profile.id, { max: 10, windowMs: 3600_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const username = normUsername(b.username);
  const name = String(b.name || "").trim();
  const seq = normalizeSequence(b.sequence);
  if (!USERNAME_RE.test(username) || RESERVED_USERNAMES.includes(username)) return jerr("username must be 3-30 chars: a-z, 0-9, _", 400);
  if (!name || name.length > 80) return jerr("name required", 400);
  if (!seq) return jerr("choose 4 pictures", 400);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, username, seq); } catch { return jerr("picture codes unavailable", 503); }
  const admin = adminClient();
  const made = await createStudent(admin, { username, password, name, grade: CLEWQUEST.defaultGrade, school: "", parentId: me.profile.id, appMetadata: PICTURE_APP_METADATA });
  if (made.error) return made.status === 409 ? jerr("username taken", 409) : jerr("could not create account", 500);
  const { data: profile } = await admin.from("profiles").select("*").eq("id", made.id).maybeSingle();
  return jok({ child: publicProfile(profile) });
}
