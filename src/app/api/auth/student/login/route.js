// Child login: username -> synthetic email (server-side only).
import { sessionClient, adminClient, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { kidEmail, normUsername } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const b = await readJson(request);
  const username = normUsername(b.username);
  const password = String(b.password || "");
  if (!username || !password) return jerr("invalid credentials", 401);
  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email: kidEmail(username), password });
  if (error || !data?.user) return jerr("invalid credentials", 401);
  const { data: profile } = await adminClient().from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  if (!profile || profile.role !== "student") { await sb.auth.signOut(); return jerr("invalid credentials", 401); }
  return jok({ profile: publicProfile(profile) });
}
