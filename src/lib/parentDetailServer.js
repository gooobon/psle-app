// Server-only loaders for the parent detail features (issue #131). Read through the caller's session client, so RLS
// (public.is_parent_of) decides what a parent may see. Every optional source fails soft.
import { sessionClient } from "@/lib/supabase/server";
import { DAY_MS, WEAK_WINDOW_DAYS } from "@/lib/parentDetail";

// learning_trials.answer_text is added by a different PR. If the column is missing the query errors; retry without it.
export async function selectTrials(sb, build, cols) {
  let r = await build(sb.from("learning_trials").select(cols + ",answer_text"));
  let hasAnswers = true;
  if (r.error) { hasAnswers = false; r = await build(sb.from("learning_trials").select(cols)); }
  return { rows: r.error ? null : r.data || [], hasAnswers };
}

export async function loadWeakTrials(studentId, subject) {
  const sb = await sessionClient();
  const since = new Date(Date.now() - 2 * WEAK_WINDOW_DAYS * DAY_MS).toISOString();
  return selectTrials(sb, (q) => q.eq("student_id", studentId).eq("subject", subject).eq("server_graded", true)
    .gte("attempted_at", since).order("attempted_at", { ascending: false }).limit(5000), "skill,item_id,first_try,weight,attempted_at");
}

// Tags, attempt counts and recorded answers for one child's wrong answers (never throws).
export async function loadMistakeExtras(studentId, subject) {
  const sb = await sessionClient();
  const out = { tags: {}, tagsAvailable: true, trials: [], hasAnswers: false };
  try {
    const t = await sb.from("parent_cause_tags").select("wrong_answer_id,cause").eq("student_id", studentId).limit(2000);
    if (t.error) out.tagsAvailable = false;
    else for (const x of t.data || []) out.tags[x.wrong_answer_id] = x.cause;
  } catch { out.tagsAvailable = false; }
  try {
    const r = await selectTrials(sb, (q) => q.eq("student_id", studentId).eq("subject", subject)
      .order("attempted_at", { ascending: false }).limit(5000), "item_id,first_try,attempted_at");
    out.trials = r.rows || []; out.hasAnswers = r.hasAnswers;
  } catch { /* no trials: attempts and answers simply stay empty */ }
  return out;
}
