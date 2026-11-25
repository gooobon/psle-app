// Parent: concept / skill-level weak spots for a linked child (issue #131). Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_PARENT_DETAIL_ENABLED.
// >= 4 first-try attempts in the last 14 days, first-try %, trend vs the previous 14 days, 2 missed examples (item id + child answer).
// The child's answer comes from learning_trials.answer_text and is null when that column is missing or empty.
import { currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { PARENT_DETAIL } from "@/lib/supabase/config";
import { LEARNING_SUBJECTS } from "@/lib/learningServer";
import { weakSpots } from "@/lib/parentDetail";
import { loadWeakTrials } from "@/lib/parentDetailServer";

export const runtime = "nodejs";
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request) {
  if (!serverAuthEnabled() || !PARENT_DETAIL) return jerr("parent detail disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const u = new URL(request.url);
  const child = u.searchParams.get("child") || "", subject = u.searchParams.get("subject") || "English";
  if (!UUID.test(child) || !LEARNING_SUBJECTS.includes(subject)) return jerr("bad request", 400);
  const t = await loadWeakTrials(child, subject);
  if (!t.rows) return jerr("could not load", 500);
  return jok({ subject, spots: weakSpots(t.rows, Date.now()), answersAvailable: t.hasAnswers });
}
