// Student reports a completed set/round. Idempotent per (user, SGT date, subject, key) via record_activity().
import { sessionClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { SUBJECT_KEYS } from "@/lib/activity";

export const runtime = "nodejs";

export async function POST(request) {
  if (!serverAuthEnabled()) return jerr("server auth disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "student") return jerr("student login required", 401);
  const b = await readJson(request);
  const subject = String(b.subject || "");
  const key = String(b.key || "").slice(0, 120);
  if (!SUBJECT_KEYS.includes(subject) || !key) return jerr("bad request", 400);
  const sb = await sessionClient();
  const { error } = await sb.rpc("record_activity", {
    p_subject: subject, p_key: key,
    p_questions: Math.round(Number(b.questions) || 0),
    p_correct: Math.round(Number(b.correct) || 0),
    p_minutes: Math.round(Number(b.minutes) || 0),
  });
  if (error) return jerr("could not record", 500);
  return jok();
}
