// Parent creates a child account (service role, after verifying the caller is a logged-in parent).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson, publicProfile } from "@/lib/supabase/server";

export const runtime = "nodejs";

// POST removed: new children are created with a picture code at /api/parent/children/picture. Always 404.
export async function POST() { return jerr("not found", 404); }

export async function GET() {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const admin = adminClient();
  const { data: kids } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id);
  const ids = (kids || []).map(k => k.child_id);
  const { data } = ids.length ? await admin.from("profiles").select("*").in("id", ids) : { data: [] };
  return jok({ children: (data || []).map(publicProfile) });
}
