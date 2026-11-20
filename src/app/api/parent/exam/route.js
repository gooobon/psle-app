// Mock exams, parent side (issue #44): a linked child's papers, and marking of the open-ended items.
//   GET  ?child=<uuid>                          -> attempts + the open-ended items waiting for a mark (with the model answer)
//   POST { attemptId, questionId, correct }     -> the parent's mark for one open-ended item
// The model answer is sent to a verified linked PARENT only, never to a student. Flags: SERVER_AUTH + MOCK_EXAMS_ENABLED (default OFF).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { MOCK_EXAMS_ENABLED } from "@/lib/supabase/config";
import { modelAnswersForParent } from "@/lib/examServer";
import { attemptScore } from "@/lib/examScore";
import { settleAttempt } from "@/lib/examPostSubmit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const UUID = /^[0-9a-f-]{36}$/i;

async function linked(admin, parentId, childId) {
  const { data } = await admin.from("parent_child").select("child_id").eq("parent_id", parentId).eq("child_id", childId).maybeSingle();
  return !!data;
}
async function parent() {
  const me = await currentUser();
  return me && me.profile.role === "parent" ? me : null;
}

export async function GET(request) {
  if (!serverAuthEnabled() || !MOCK_EXAMS_ENABLED) return jerr("mock exams disabled", 404);
  const me = await parent();
  if (!me) return jerr("parent login required", 401);
  const child = new URL(request.url).searchParams.get("child") || "";
  if (!UUID.test(child)) return jerr("bad child", 400);
  const admin = adminClient();
  if (!(await linked(admin, me.profile.id, child))) return jerr("not your child", 403);
  const { data: attempts, error } = await admin.from("exam_attempts").select("*").eq("student_id", child).neq("status", "in_progress").order("started_at", { ascending: false }).limit(30);
  if (error) return jerr("could not load", 500);
  const ids = (attempts || []).filter((a) => (a.open_total || 0) > 0).map((a) => a.id);
  const { data: open, error: oe } = ids.length
    ? await admin.from("exam_answers").select("attempt_id,question_id,answer,parent_correct").in("attempt_id", ids).is("correct", null)
    : { data: [], error: null };
  if (oe) return jerr("could not load", 500);
  const byAttempt = {};
  for (const r of open || []) (byAttempt[r.attempt_id] = byAttempt[r.attempt_id] || []).push(r);
  const out = (attempts || []).map((a) => {
    const items = byAttempt[a.id] || [];
    const models = modelAnswersForParent(a.paper_id, items.map((i) => i.question_id));
    const text = (v) => (v == null ? "" : Array.isArray(v) ? v.filter((x) => x != null).join("; ") : String(v));
    const sc = attemptScore(a); // score / total include the marks given so far; pending = still waiting for a mark
    return {
      id: a.id, label: a.paper_label, flags: a.paper_flags || [], status: a.status, submittedAt: a.submitted_at, minutes: a.minutes_allowed,
      elapsedSeconds: a.elapsed_seconds, score: sc.score, total: sc.total, pending: sc.pending, settled: sc.settled, pct: sc.pct,
      autoScore: sc.autoScore, autoTotal: sc.autoTotal, answered: a.answered, questionCount: a.question_count,
      unanswered: a.unanswered, sections: a.section_scores || [], counts: a.counts, countsReason: a.counts_reason, openTotal: a.open_total || 0,
      open: items.map((i) => ({
        questionId: i.question_id, question: (models[i.question_id] || {}).question || "", modelAnswer: (models[i.question_id] || {}).answer || "",
        studentAnswer: text(i.answer && i.answer.val), mark: i.parent_correct,
      })),
    };
  });
  return jok({ attempts: out });
}

export async function POST(request) {
  if (!serverAuthEnabled() || !MOCK_EXAMS_ENABLED) return jerr("mock exams disabled", 404);
  const me = await parent();
  if (!me) return jerr("parent login required", 401);
  const b = await readJson(request);
  const attemptId = String(b.attemptId || ""), qid = String(b.questionId || "").slice(0, 200);
  if (!UUID.test(attemptId) || !qid || typeof b.correct !== "boolean") return jerr("bad request", 400);
  const admin = adminClient();
  const { data: a } = await admin.from("exam_attempts").select("student_id,status").eq("id", attemptId).maybeSingle();
  if (!a || a.status === "in_progress") return jerr("not found", 404);
  if (!(await linked(admin, me.profile.id, a.student_id))) return jerr("not your child", 403);
  const { data, error } = await admin.from("exam_answers").update({ parent_correct: b.correct, parent_marked_at: new Date().toISOString() })
    .eq("attempt_id", attemptId).eq("question_id", qid).is("correct", null).select("question_id");
  if (error) return jerr("could not save", 500);
  if (!data || !data.length) return jerr("not an open-ended item", 404);
  // The mark now counts in the paper score. The last mark settles the attempt (final score, first-attempt trials, Saturday credit).
  const st = await settleAttempt(admin, attemptId);
  if (!st.ok) return jerr(st.error || "saved the mark but could not update the score", 500);
  const sc = attemptScore(st.attempt);
  return jok({ score: sc.score, total: sc.total, pending: sc.pending, settled: sc.settled, pct: sc.pct, settledNow: st.settledNow === true });
}
