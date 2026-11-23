// ClewQuest: student login with a picture code. Reuses kidEmail() + signInWithPassword like the password login.
// Lockout: 5 failures per username per 15 min (locked 15 min) plus a per-IP cap, durable in Supabase and shared by every
// serverless instance (lib/clewquest/lockout.js), with the in-memory limiter as a first layer. Reset on success. Flag off => 404.
import { sessionClient, adminClient, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { kidEmail, normUsername } from "@/lib/supabase/config";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { clientIp } from "@/lib/rateLimit";
import { derivePicturePassword, loginGuard, hashIp } from "@/lib/clewquest/pictureServer";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const b = await readJson(request);
  const username = normUsername(b.username);
  const seq = normalizeSequence(b.sequence);
  if (!username || !seq) return jerr("invalid credentials", 401);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, username, seq); } catch { return jerr("picture sign-in unavailable", 503); }
  const admin = adminClient();
  const ipHash = hashIp(process.env.CLEWQUEST_PICTURE_PEPPER, clientIp(request));
  const chk = await loginGuard.check(admin, username, ipHash);
  if (chk.error) return jerr("sign-in temporarily unavailable", 503); // fail closed if the lockout store cannot be read
  if (chk.locked) return jerr("Ask a parent to help you sign in", 429);
  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) { await loginGuard.fail(admin, username, ipHash); return jerr("invalid credentials", 401); } // never says which picture was wrong
  const { data: profile } = await admin.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  if (!profile || profile.role !== "student") { await sb.auth.signOut(); await loginGuard.fail(admin, username, ipHash); return jerr("invalid credentials", 401); }
  await loginGuard.reset(admin, username);
  return jok({ profile: publicProfile(profile) });
}
