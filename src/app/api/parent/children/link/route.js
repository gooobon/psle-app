// Link an EXISTING child account (e.g. a migrated legacy student) to the logged-in parent.
// Proof of ownership = the child's own username + password (verified with a throwaway client).
import { createClient } from "@supabase/supabase-js";
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { kidEmail, normUsername } from "@/lib/supabase/config";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { clewquestRoutesOn } from "@/lib/clewquest/guard";
import { normalizeSequence } from "@/lib/clewquest/pictures";
import { derivePicturePassword, loginGuard, hashIp } from "@/lib/clewquest/pictureServer";
import { usesPictureCode } from "@/lib/clewquest/pictureFlag";
import { runPictureLogin, MSG } from "@/lib/clewquest/pictureLoginFlow";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("linkchild:" + me.profile.id, { max: 10, windowMs: 3600_000 })) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const username = normUsername(b.username);
  if (b.sequence !== undefined) return linkByPicture(request, me, username, b.sequence); // ClewQuest picture-code child
  const password = String(b.password || "");
  if (!username || !password) return jerr("username and password required", 400);
  const probe = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await probe.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) return jerr("wrong child username or password", 401);
  const admin = adminClient();
  const { data: kid } = await admin.from("profiles").select("*").eq("id", data.user.id).eq("role", "student").maybeSingle();
  if (!kid) return jerr("wrong child username or password", 401);
  const { error: e2 } = await admin.from("parent_child").upsert({ parent_id: me.profile.id, child_id: kid.id }, { onConflict: "parent_id,child_id", ignoreDuplicates: true });
  if (e2) return jerr("link failed", 500);
  return jok({ child: publicProfile(kid) });
}

// ClewQuest: a picture-code child only has an HMAC password, so the parent proves ownership with the child's picture code.
// Same HMAC + atomic lockout as the child's own login (runPictureLogin: count BEFORE the sign-in, fail closed 503). Every wrong
// code / unknown user / non-picture account gets the same generic 401. Flag off => 404.
async function linkByPicture(request, me, username, rawSeq) {
  if (!clewquestRoutesOn()) return jerr("not found", 404);
  const seq = normalizeSequence(rawSeq);
  if (!username || !seq) return jerr(MSG.invalid, 401);
  let password;
  try { password = derivePicturePassword(process.env.CLEWQUEST_PICTURE_PEPPER, username, seq); } catch { return jerr("picture sign-in unavailable", 503); }
  const admin = adminClient();
  const probe = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const r = await runPictureLogin({
    guard: loginGuard, admin, username,
    ipHash: hashIp(process.env.CLEWQUEST_PICTURE_PEPPER, clientIp(request)),
    signIn: async () => {
      const { data: kid } = await admin.from("profiles").select("id").eq("username", username).eq("role", "student").maybeSingle();
      if (!kid) return { error: true };
      const cur = await admin.auth.admin.getUserById(kid.id);
      if (cur.error || !cur.data?.user || !usesPictureCode(cur.data.user)) return { error: true }; // app_metadata only
      const { data, error } = await probe.auth.signInWithPassword({ email: kidEmail(username), password });
      return error || !data?.user ? { error: true } : { user: data.user };
    },
    loadProfile: async (id) => (await admin.from("profiles").select("*").eq("id", id).eq("role", "student").maybeSingle()).data,
    signOut: async () => {},
  });
  if (r.status !== 200) return jerr(r.error, r.status);
  const { error: e2 } = await admin.from("parent_child").upsert({ parent_id: me.profile.id, child_id: r.profile.id }, { onConflict: "parent_id,child_id", ignoreDuplicates: true });
  if (e2) return jerr("link failed", 500);
  return jok({ child: publicProfile(r.profile) });
}
