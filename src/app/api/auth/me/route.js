// Session restore: returns the logged-in profile (and, for parents, linked children).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, publicProfile } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me) return jerr("not logged in", 401);
  let children = [];
  if (me.profile.role === "parent") {
    const admin = adminClient();
    const { data: kids } = await admin.from("parent_child").select("child_id").eq("parent_id", me.profile.id);
    const ids = (kids || []).map(k => k.child_id);
    if (ids.length) { const { data } = await admin.from("profiles").select("*").in("id", ids); children = (data || []).map(publicProfile); }
  }
  return jok({ profile: publicProfile(me.profile), children });
}
