// A parent links ANOTHER parent (by email) to one of their own children. The other parent must already have
// a parent account. The response is the same whether or not the email exists (no account enumeration).
// TODO(owner): links immediately; consider an invite the other parent must accept.
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { allow } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  if (!allow(`link-parent:${me.profile.id}`, 10, 15 * 60 * 1000)) return jerr("too many attempts, try again later", 429);
  const b = await readJson(request);
  const email = String(b.email || "").trim().toLowerCase();
  const childId = String(b.childId || "");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return jerr("valid email required", 400);
  const admin = adminClient();
  const { data: mine } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id).eq("child_id", childId).maybeSingle();
  if (!mine) return jerr("not your child", 403);
  const { data: other } = await admin.from("profiles").select("id").eq("role", "parent").ilike("email", email).maybeSingle();
  if (other && other.id !== me.profile.id) {
    await admin.from("parent_child").upsert({ parent_id: other.id, child_id: childId }, { onConflict: "parent_id,child_id" });
    // Give the new parent default settings if they somehow lack a row.
    await admin.from("parent_settings").upsert({ parent_id: other.id }, { onConflict: "parent_id", ignoreDuplicates: true });
  }
  return jok({ message: "If a parent account exists with that email, they now have access to this child." });
}
