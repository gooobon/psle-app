// Mock exams, parent side (issue #44): a linked child's papers, and marking of the open-ended items.
//   GET  ?child=<uuid>                          -> attempts + the open-ended items waiting for a mark (with the model answer)
//   POST { attemptId, questionId, correct }     -> the parent's mark for one open-ended item
// The model answer is sent to a verified linked PARENT only, never to a student. Flags: SERVER_AUTH + MOCK_EXAMS_ENABLED (default OFF).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { MOCK_EXAMS_ENABLED } from "@/lib/supabase/config";
import { modelAnswersForParent, marksByQuestion } from "@/lib/examServer";
import { combineMarks, percentOf, readyToSettle } from "@/lib/examEngine";
import { settlePaper } from "@/lib/examSettle";

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
    ? await admin.from("exam_answers").select("attempt_id,question_id,answer,parent_correct,parent_marked_at").in("attempt_id", ids).is("correct", null)
    : { data: [], error: null };
  if (oe) return jerr("could not load", 500);
  const byAttempt = {};
  for (const r of open || []) (byAttempt[r.attempt_id] = byAttempt[r.attempt_id] || []).push(r);
  const out = (attempts || []).map((a) => {
    const items = byAttempt[a.id] || [];
    const models = modelAnswersForParent(a.paper_id, items.map((i) => i.question_id));
    const text = (v) => (v == null ? "" : Array.isArray(v) ? v.filter((x) => x != null).join("; ") : String(v));
    return {
      id: a.id, label: a.paper_label, flags: a.paper_flags || [], status: a.status, submittedAt: a.submitted_at, minutes: a.minutes_allowed,
      elapsedSeconds: a.elapsed_seconds, score: a.score, total: a.total, answered: a.answered, questionCount: a.question_count,
      unanswered: a.unanswered, sections: a.section_scores || [], counts: a.counts, countsReason: a.counts_reason, openTotal: a.open_total || 0,
      autoScore: a.auto_score == null ? a.score : a.auto_score, autoTotal: a.auto_total == null ? a.total : a.auto_total, pending: a.parent_pending || 0,
      percent: percentOf(a.score, a.total), settled: !a.parent_pending,
      open: items.map((i) => ({
        questionId: i.question_id, question: (models[i.question_id] || {}).question || "", modelAnswer: (models[i.question_id] || {}).answer || "",
        studentAnswer: text(i.answer && i.answer.val), mark: i.parent_correct, automatic: i.parent_correct != null && !i.parent_marked_at,
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
  const { data: a } = await admin.from("exam_attempts").select("*").eq("id", attemptId).maybeSingle();
  if (!a || a.status === "in_progress") return jerr("not found", 404);
  if (!(await linked(admin, me.profile.id, a.student_id))) return jerr("not your child", 403);
  const { data, error } = await admin.from("exam_answers").update({ parent_correct: b.correct, parent_marked_at: new Date().toISOString() })
    .eq("attempt_id", attemptId).eq("question_id", qid).is("correct", null).select("question_id");
  if (error) return jerr("could not save", 500);
  if (!data || !data.length) return jerr("not an open-ended item", 404);
  // The mark now counts: recompute the attempt's final score from ALL its open-ended rows (idempotent, so a repeat or a changed mark
  // can never double count), then settle the paper once nothing is left to mark.
  const rows = await admin.from("exam_answers").select("question_id,section,parent_correct").eq("attempt_id", attemptId).is("correct", null).order("question_id");
  if (rows.error) return jerr("mark saved, but the score could not be updated", 500);
  const open = rows.data || [];
  const autoScore = a.auto_score == null ? a.score : a.auto_score, autoTotal = a.auto_total == null ? a.total : a.auto_total;
  const c = combineMarks({
    autoScore, autoTotal, sections: a.auto_sections || a.section_scores || [],
    openMarks: open.map((r) => (r.parent_correct === true ? true : r.parent_correct === false ? false : null)), openSections: open.map((r) => r.section || "Comprehension"), openWeights: marksByQuestion(a.paper_id, open.map((r) => r.question_id)),
  });
  const wasSettled = !!a.settled_at;
  const patch = { auto_score: autoScore, auto_total: autoTotal, auto_sections: a.auto_sections || a.section_scores || [], score: c.score, total: c.total, section_scores: c.sections, parent_score: c.parentScore, parent_total: c.parentTotal, parent_pending: c.pending };
  const up = await admin.from("exam_attempts").update(patch).eq("id", attemptId).select("*").maybeSingle();
  if (up.error || !up.data) return jerr("mark saved, but the score could not be updated", 500);
  let att = up.data;
  // Daily activity: parent-correct items count in the day's "correct" once (at settle), later changes apply as a delta.
  const prior = wasSettled ? a.parent_score || 0 : 0;
  if (c.settled && a.counts && c.parentScore !== prior) {
    const r = await admin.rpc("record_paper_parent_marks", { p_user: a.student_id, p_subject: a.subject || "English", p_key: "paper-" + attemptId, p_delta: c.parentScore - prior });
    if (r.error) console.error("[exam] parent marks daily activity failed", attemptId);
  }
  let reward = null;
  if (readyToSettle({ pending: c.pending, settledAt: a.settled_at })) {
    // Claim settlement once (only one request wins), then run everything that needs the final score.
    const claim = await admin.from("exam_attempts").update({ settled_at: new Date().toISOString() }).eq("id", attemptId).is("settled_at", null).select("*").maybeSingle();
    if (claim.data) { att = claim.data; reward = await settlePaper(admin, att); }
  }
  return jok({ score: att.score, total: att.total, pending: att.parent_pending || 0, percent: percentOf(att.score, att.total), settled: !att.parent_pending, reward });
}
