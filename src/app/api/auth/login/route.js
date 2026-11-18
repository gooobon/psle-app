// Parent login (real email + password).
import { sessionClient, adminClient, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  const password = String(b.password || "");
  if (!email || !password) return jerr("invalid credentials", 401);
  const sb = await sessionClient();
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error || !data?.user) return jerr("invalid credentials", 401);
  const admin = adminClient();
  const { data: profile } = await admin.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  if (!profile || profile.role !== "parent") { await sb.auth.signOut(); return jerr("invalid credentials", 401); }
  const { data: kids } = await admin.from("parent_child").select("child_id").eq("parent_id", profile.id);
  const ids = (kids || []).map(k => k.child_id);
  const { data: cp } = ids.length ? await admin.from("profiles").select("*").in("id", ids) : { data: [] };
  return jok({ profile: publicProfile(profile), children: (cp || []).map(publicProfile) });
}
