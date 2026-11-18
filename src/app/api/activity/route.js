// Student records a completed set/round. Calls the record_activity() SQL function with the student's own
// session (RLS/auth.uid()), which dedupes on the client-generated event id and upserts per user/date/subject.
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";

export const runtime = "nodejs";
const SUBJECTS = ["English", "Chinese", "Math", "Science"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const int = (v) => Math.max(0, Math.min(1000, Math.floor(Number(v) || 0)));

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const b = await readJson(request);
  if (!SUBJECTS.includes(b.subject) || !UUID.test(String(b.event || ""))) return jerr("bad request", 400);
  const questions = int(b.questions);
  const sb = await sessionClient();
  const { error } = await sb.rpc("record_activity", {
    p_event: b.event, p_subject: b.subject, p_sets: Math.min(int(b.sets), 20),
    p_questions: questions, p_correct: Math.min(int(b.correct), questions), p_minutes: Math.min(int(b.minutes), 600),
  });
  if (error) return jerr("record failed", 500);
  return jok();
}
