// Server-only loader for the learning dashboard. Reads through the caller's session client, so RLS decides who may see what
// (student: own rows; parent: public.is_parent_of). Never writes.
import { sessionClient } from "@/lib/supabase/server";
import { buildLearning, CAUSE_WINDOW_DAYS, DAY_MS } from "@/lib/learningDashboard";
import { levelReport } from "@/lib/itemDifficulty";

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
  return { ...buildLearning(tr.data || [], wa.data || [], Date.now()), trialCount: (tr.data || []).length, levels: await loadLevels(sb, studentId, subject) };
}

// Level of questions solved, last 14 days (issue #127). Fails soft: any error returns null and the card is simply not shown.
// Global item / skill first-try rates come from the aggregate functions in 20261207000000_item_first_try_stats.sql; before that SQL
// is applied they are empty, so only tagged items are rated and the rest count as "not rated".
async function loadLevels(sb, studentId, subject) {
  try {
    const since = new Date(Date.now() - CAUSE_WINDOW_DAYS * DAY_MS).toISOString();
    const r = await sb.from("learning_trials").select("item_id,skill,first_try")
      .eq("student_id", studentId).eq("subject", subject).eq("server_graded", true).gte("attempted_at", since).limit(5000);
    if (r.error) return null;
    const rows = r.data || [];
    const ids = [...new Set(rows.map((x) => x.item_id))].slice(0, 2000), skills = [...new Set(rows.map((x) => x.skill))];
    const [is, ss] = await Promise.all([
      ids.length ? sb.rpc("item_first_try_stats", { p_subject: subject, p_item_ids: ids }) : { data: [] },
      skills.length ? sb.rpc("skill_first_try_stats", { p_subject: subject, p_skills: skills }) : { data: [] },
    ]);
    const map = (res, key) => { const o = {}; if (!res.error) for (const x of res.data || []) o[x[key]] = { attempts: Number(x.attempts), first_try: Number(x.first_try) }; return o; };
    return { ...levelReport(rows, map(is, "item_id"), map(ss, "skill")), attempts: rows.length, days: CAUSE_WINDOW_DAYS };
  } catch { return null; }
}
