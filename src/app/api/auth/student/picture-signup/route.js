// ClewQuest: student self sign-up with a picture code. Flag NEXT_PUBLIC_CLEWQUEST_ENABLED (default off => 404).
// The picture sequence is turned into the Supabase password server-side (HMAC with CLEWQUEST_PICTURE_PEPPER); the raw sequence is never stored.
import { sessionClient, adminClient, jerr, jok, readJson, publicProfile, createStudent } from "@/lib/supabase/server";
import { normUsername, USERNAME_RE, isReservedUsername, USERNAME_MSG, kidEmail } from "@/lib/supabase/config";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { CLEWQUEST } from "@/lib/clewquest/config";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { derivePicturePassword } from "@/lib/clewquest/pictureServer";
import { PICTURE_APP_METADATA } from "@/lib/clewquest/pictureFlag";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  if (!rateLimit(`cqps:${clientIp(request)}`, { max: 10, windowMs: 60 * 60 * 1000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const username = normUsername(b.username);
  const name = String(b.name || "").trim();
  const seq = normalizeSequence(b.sequence);
  if (!USERNAME_RE.test(username) || isReservedUsername(username)) return jerr(USERNAME_MSG, 400);
  if (!name || name.length > 80) return jerr("name required", 400);
  if (!seq) return jerr("choose 4 pictures", 400);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, username, seq); } catch { return jerr("picture sign-up unavailable", 503); }

  const admin = adminClient();
  // The picture-code flag is set in app_metadata AT CREATION (service role only; one call, so it cannot be half-applied).
  const made = await createStudent(admin, { username, password, name, grade: CLEWQUEST.defaultGrade, school: "", appMetadata: PICTURE_APP_METADATA });
  if (made.error) return made.status === 409 ? jerr("username taken", 409) : jerr("could not create account", 500); // never a raw Supabase error

  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) return jerr("account created, please sign in", 500);
  const { data: profile } = await admin.from("profiles").select("*").eq("id", made.id).maybeSingle();
  return jok({ profile: publicProfile(profile, true) });
}
