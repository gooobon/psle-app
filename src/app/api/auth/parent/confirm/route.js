// Parent email-confirm landing: the Supabase confirm link opens /?code=...; the browser posts that code here.
// We exchange it for a session (PKCE verifier cookie set at signup) and return the parent profile, so the parent lands logged in.
// Fails (401) when the link is opened in another browser/device, expired or used: the client then shows the login screen instead.
import { sessionClient, adminClient, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  if (!rateLimit("pconfirm:" + clientIp(request), { max: 20, windowMs: 600_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const code = String(b.code || "").trim();
  if (!code || code.length > 512) return jerr("code required", 400);
  const sb = await sessionClient();
  const { data, error } = await sb.auth.exchangeCodeForSession(code);
  if (error || !data?.user) return jerr("could not confirm", 401);
  const admin = adminClient();
  const { data: profile } = await admin.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  if (!profile || profile.role !== "parent") { await sb.auth.signOut(); return jerr("could not confirm", 401); }
  const { data: kids } = await admin.from("parent_child").select("child_id").eq("parent_id", profile.id);
  const ids = (kids || []).map(k => k.child_id);
  const { data: cp } = ids.length ? await admin.from("profiles").select("*").in("id", ids) : { data: [] };
  return jok({ profile: publicProfile(profile), children: (cp || []).map(publicProfile) });
}
