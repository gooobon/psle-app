// ClewQuest: student self sign-up with a picture code. Flag NEXT_PUBLIC_CLEWQUEST_ENABLED (default off => 404).
// The picture sequence is turned into the Supabase password server-side (HMAC with CLEWQUEST_PICTURE_PEPPER); the raw sequence is never stored.
import { sessionClient, adminClient, jerr, jok, readJson, publicProfile, createStudent } from "@/lib/supabase/server";
import { normUsername, USERNAME_RE, RESERVED_USERNAMES, kidEmail } from "@/lib/supabase/config";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { derivePicturePassword } from "@/lib/clewquest/pictureServer";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  if (!rateLimit(`cqps:${clientIp(request)}`, { max: 10, windowMs: 60 * 60 * 1000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const username = normUsername(b.username);
  const name = String(b.name || "").trim();
  const seq = normalizeSequence(b.sequence);
  if (!USERNAME_RE.test(username) || RESERVED_USERNAMES.includes(username)) return jerr("username must be 3-30 chars: a-z, 0-9, _", 400);
  if (!name || name.length > 80) return jerr("name required", 400);
  if (!seq) return jerr("choose 4 pictures", 400);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, username, seq); } catch { return jerr("picture sign-up unavailable", 503); }

  const admin = adminClient();
  const made = await createStudent(admin, { username, password, name, grade: CLEWQUEST.defaultGrade, school: "" });
  if (made.error) return jerr(made.error, made.status);
  await admin.auth.admin.updateUserById(made.id, { user_metadata: { role: "student", picture_code: true } });

  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) return jerr("account created, please sign in", 500);
  const { data: profile } = await admin.from("profiles").select("*").eq("id", made.id).maybeSingle();
  return jok({ profile: publicProfile(profile) });
}
