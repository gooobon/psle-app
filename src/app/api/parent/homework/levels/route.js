// Inputs for "Assign practice": global first-try rates (aggregate only, no student ids) used to ESTIMATE item levels,
// plus this child's recently solved and still-pending homework ids. Parent only; the child must be linked (RLS).
// Fails soft: if learning_trials is not available, stats are empty and levels show as unrated.
import { adminClient, sessionClient, currentUser, serverAuthEnabled, jerr, jok } from "@/lib/supabase/server";
import { PARENT_HOMEWORK } from "@/lib/supabase/config";
import { SUBJECT_KEYS, sgtDate } from "@/lib/activity";
import { aggregateTrialStats, RECENT_DAYS } from "@/lib/assignFilters";
import { itemIndex, resolveItem } from "@/lib/learningGrade";
import { skillIdsOf } from "@/lib/similarItemsCore";
import { taxonomyIdsFor } from "@/lib/taxonomyLookup";
import { WA1_PRACTICE_SETS } from "@/data/p3/english/wa1_practice";
import { WA1_ZH_PRACTICE } from "@/data/p3/chinese/wa1_practice";
import WA1_ZH_DRILL from "@/data/p3/chinese/wa1_drill";

export const runtime = "nodejs";
const SETS = { English: () => WA1_PRACTICE_SETS, Chinese: () => [...WA1_ZH_PRACTICE, ...(WA1_ZH_DRILL || [])] };
// Same key rule as skillOfItem in /api/learning/trials: this is what learning_trials.skill holds.
function trialSkillKeys(subject) {
  const out = {};
  if (!SETS[subject]) return out;
  try {
    const byId = itemIndex(subject, SETS[subject]);
    for (const id of Object.keys(byId)) {
      const rec = resolveItem(byId, id);
      if (!rec) continue;
      out[id] = skillIdsOf(taxonomyIdsFor(id) || [])[0] || rec.skill || rec.trap || ("sec:" + rec.sectionType);
    }
  } catch (e) { /* fail soft */ }
  return out;
}
const UUID = /^[0-9a-f-]{36}$/i;

export async function GET(request) {
  if (!serverAuthEnabled() || !PARENT_HOMEWORK) return jerr("homework disabled", 404);
  const me = await currentUser();
  if (!me || me.profile.role !== "parent") return jerr("parent login required", 401);
  const u = new URL(request.url);
  const child = u.searchParams.get("child") || "";
  const subject = u.searchParams.get("subject") || "";
  if (!UUID.test(child) || !SUBJECT_KEYS.includes(subject)) return jerr("bad request", 400);
  const sb = await sessionClient();
  const since = sgtDate(new Date(), -RECENT_DAYS);
  const { data: hw, error } = await sb.from("parent_homework")
    .select("question_id,solved_at,correct,assigned_for").eq("child_id", child).eq("subject", subject).gte("assigned_for", since);
  if (error) return jerr("could not load", 500);
  const solved = [], pending = [];
  (hw || []).forEach((r) => { if (r.solved_at) { if (r.correct === true) solved.push(r.question_id); } else pending.push(r.question_id); });
  // Child's own correct trials in the window (RLS: only linked guardians see them).
  const sinceIso = new Date(Date.now() - RECENT_DAYS * 86400000).toISOString();
  const mine = await sb.from("learning_trials").select("item_id").eq("student_id", child).eq("subject", subject).eq("correct", true).gte("attempted_at", sinceIso).limit(5000);
  if (!mine.error) (mine.data || []).forEach((r) => { if (solved.indexOf(r.item_id) === -1) solved.push(r.item_id); });
  let stats = { items: {}, concepts: {} };
  try {
    const g = await adminClient().from("learning_trials").select("item_id,skill,first_try").eq("subject", subject).limit(20000);
    if (!g.error) stats = aggregateTrialStats(g.data);
  } catch (e) { /* fail soft */ }
  return jok({ solved, pending, stats, skillKeys: trialSkillKeys(subject) });
}
