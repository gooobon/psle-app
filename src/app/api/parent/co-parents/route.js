// A parent links another (already registered) parent to one of their children, by the other parent's email.
// Responds identically whether or not the email exists, so it cannot be used to probe for accounts.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!rateLimit("coparent:" + me.profile.id, { max: 10, windowMs: 3600_000 })) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  const childId = String(b.childId || "");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jerr("valid email required", 400);
  const admin = adminClient();
  const { data: mine } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id).eq("child_id", childId).maybeSingle();
  if (!mine) return jerr("not your child", 403);
  const { data: other } = await admin.from("profiles").select("id").eq("role", "parent").eq("email", email).maybeSingle();
  // TODO(owner): linking is immediate (no acceptance step by the other parent). Add an invite/accept flow if desired.
  if (other && other.id !== me.profile.id) {
    await admin.from("parent_child").upsert({ parent_id: other.id, child_id: childId }, { onConflict: "parent_id,child_id", ignoreDuplicates: true });
  }
  return jok({ message: "If a parent account exists for that email, it is now linked to this child. Otherwise ask them to sign up first, then try again." });
}
