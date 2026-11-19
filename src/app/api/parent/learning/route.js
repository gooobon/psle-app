// Parent reads a linked child's learning dashboard (same data for every linked parent). RLS (is_parent_of) enforces the link.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED (default off).
import { currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { LEARNING_DASHBOARD } from "@/lib/supabase/config";
import { loadLearning, LEARNING_SUBJECTS } from "@/lib/learningServer";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request) {
  if (!serverAuthEnabled() || !LEARNING_DASHBOARD) return jerr("learning dashboard disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const u = new URL(request.url);
  const child = u.searchParams.get("child") || "";
  const subject = u.searchParams.get("subject") || "English";
  if (!UUID.test(child)) return jerr("bad child", 400);
  if (!LEARNING_SUBJECTS.includes(subject)) return jerr("bad subject", 400);
  const out = await loadLearning(child, subject);
  if (out.error) return jerr(out.error, 500);
  return jok({ subject, ...out });
}
