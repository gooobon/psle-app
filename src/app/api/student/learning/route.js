// A student reads their own learning view (skills and error patterns). Flags as the parent route; default off.
import { currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { LEARNING_DASHBOARD } from "@/lib/supabase/config";
import { loadLearning, LEARNING_SUBJECTS } from "@/lib/learningServer";

export const runtime = "nodejs";

export async function GET(request) {
  if (!serverAuthEnabled() || !LEARNING_DASHBOARD) return jerr("learning dashboard disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const subject = new URL(request.url).searchParams.get("subject") || "English";
  if (!LEARNING_SUBJECTS.includes(subject)) return jerr("bad subject", 400);
  const out = await loadLearning(me.profile.id, subject);
  if (out.error) return jerr(out.error, 500);
  return jok({ subject, ...out });
}
