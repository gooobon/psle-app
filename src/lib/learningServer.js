// Server-only loader for the learning dashboard. Reads through the caller's session client, so RLS decides who may see what
// (student: own rows; parent: public.is_parent_of). Never writes.
import { sessionClient } from "@/lib/supabase/server";
import { buildLearning, CAUSE_WINDOW_DAYS, DAY_MS } from "@/lib/learningDashboard";

export const LEARNING_SUBJECTS = ["English", "Chinese"]; // v1; Math/Science are Coming soon

export async function loadLearning(studentId, subject) {
  const sb = await sessionClient();
  const since = new Date(Date.now() - CAUSE_WINDOW_DAYS * DAY_MS).toISOString();
  const [tr, wa] = await Promise.all([
    sb.from("learning_trials").select("skill,mode,first_try,weight,session_num,attempted_at")
      .eq("student_id", studentId).eq("subject", subject).eq("server_graded", true).order("attempted_at", { ascending: false }).limit(5000),
    sb.from("wrong_answers").select("cause,attempted_at")
      .eq("student_id", studentId).eq("subject", subject).gte("attempted_at", since).order("attempted_at", { ascending: false }).limit(1000),
  ]);
  if (tr.error || wa.error) return { error: "could not load" };
  return { ...buildLearning(tr.data || [], wa.data || [], Date.now()), trialCount: (tr.data || []).length };
}
