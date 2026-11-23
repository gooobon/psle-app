// ClewQuest: student login with a picture code. Reuses kidEmail() + signInWithPassword like the password login.
// 5 failures per username per 15 min (lib/rateLimit.js). Flag off => 404.
import { sessionClient, adminClient, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { kidEmail, normUsername } from "@/lib/supabase/config";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { derivePicturePassword, isLockedOut, recordFailure } from "@/lib/clewquest/pictureServer";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const b = await readJson(request);
  const username = normUsername(b.username);
  const seq = normalizeSequence(b.sequence);
  if (!username || !seq) return jerr("invalid credentials", 401);
  if (isLockedOut(username)) return jerr("Ask a parent to help you sign in", 429);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, username, seq); } catch { return jerr("picture sign-in unavailable", 503); }
  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) { recordFailure(username); return jerr("invalid credentials", 401); } // never says which picture was wrong
  const { data: profile } = await adminClient().from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  if (!profile || profile.role !== "student") { await sb.auth.signOut(); recordFailure(username); return jerr("invalid credentials", 401); }
  return jok({ profile: publicProfile(profile) });
}
