// ClewQuest: student login with a picture code. Reuses kidEmail() + signInWithPassword like the password login.
// Lockout (lib/clewquest/lockout.js): in-memory first layer (lib/rateLimit.js) + a durable layer in Supabase. The attempt is
// counted ATOMICALLY BEFORE the sign-in, so parallel requests cannot bypass it; any lockout store error fails closed (503).
// Reset on success. Flag off => 404.
import { sessionClient, adminClient, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { kidEmail, normUsername } from "@/lib/supabase/config";
import { clewquestRoutesOn, notFound } from "@/lib/clewquest/guard";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { clientIp } from "@/lib/rateLimit";
import { derivePicturePassword, loginGuard, hashIp } from "@/lib/clewquest/pictureServer";
import { runPictureLogin, MSG } from "@/lib/clewquest/pictureLoginFlow";

export const runtime = "nodejs";

export async function POST(request) {
  if (!clewquestRoutesOn()) return notFound();
  const b = await readJson(request);
  const username = normUsername(b.username);
  const seq = normalizeSequence(b.sequence);
  if (!username || !seq) return jerr(MSG.invalid, 401);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, username, seq); } catch { return jerr("picture sign-in unavailable", 503); }
  const admin = adminClient();
  const sb = await sessionClient();
  const r = await runPictureLogin({
    guard: loginGuard, admin, username,
    ipHash: hashIp(process.env.CLEWQUEST_PICTURE_PEPPER, clientIp(request)),
    signIn: async () => { const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password }); return error || !data?.user ? { error: true } : { user: data.user }; },
    loadProfile: async (id) => (await admin.from("profiles").select("*").eq("id", id).maybeSingle()).data,
    signOut: () => sb.auth.signOut(),
  });
  if (r.status !== 200) return jerr(r.error, r.status); // never says which picture was wrong
  return jok({ profile: publicProfile(r.profile) });
}
