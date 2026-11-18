// Link an EXISTING child account (e.g. a migrated legacy student) to the logged-in parent.
// Proof of ownership = the child's own username + password (verified with a throwaway client).
import { createClient } from "@supabase/supabase-js";
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";
import { kidEmail, normUsername } from "@/lib/supabase/config";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("linkchild:" + me.profile.id, { max: 10, windowMs: 3600_000 })) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const username = normUsername(b.username);
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
