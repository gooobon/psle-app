// Server-only: what happens to a paper right after the server has graded and saved it (mock exams phase 2, issue #48).
// Both steps are best effort and never undo or block the hand-in: the attempt and its answers are already saved.
import { LEARNING_DASHBOARD } from "@/lib/supabase/config";
import { notebookRows, mockTrialCandidates } from "@/lib/examServer";

// Wrong auto-graded items -> wrong_answers (attempt_key 'exam-<attemptId>'), capped per paper (examEngine.MAX_NOTEBOOK_PER_PAPER).
// Idempotent: the table's unique key (student, subject, question, attempt_key) makes a repeat a no-op. cause stays NULL until the student picks one.
export async function writeNotebook(admin, a, g, endMs) {
  try {
    const { rows, skipped } = notebookRows(a.paper_id, g, { studentId: a.student_id, attemptId: a.id, grade: a.grade, nowIso: new Date(endMs).toISOString() });
    if (!rows.length) return { added: 0, skipped };
    const w = await admin.from("wrong_answers").upsert(rows, { onConflict: "student_id,subject,question_id,attempt_key", ignoreDuplicates: true });
    if (w.error) { console.error("[exam] notebook write failed", a.id); return { added: 0, skipped, error: true }; }
    return { added: rows.length, skipped };
  } catch { return { added: 0, skipped: 0, error: true }; }
}

// First sitting of each auto-graded item -> a 'mock' trial at full weight, written by the server (the same table and dedupe rule as
// /api/learning/trials). The dedupe key includes the paper key, so a RETAKE of the same paper adds nothing: redoing the same question
// never affects mastery. first_try is true only for a correct item the student has no earlier trial for. Needs the learning dashboard
// migration; when that flag is off nothing is written.
export async function recordMockTrials(admin, a, g, endMs) {
  if (!LEARNING_DASHBOARD) return { recorded: 0, skipped: "flag_off" };
  try {
    const cands = mockTrialCandidates(a.paper_id, g) || [];
    if (!cands.length) return { recorded: 0 };
    const ids = [...new Set(cands.map((c) => c.itemId))];
    const prior = await admin.from("learning_trials").select("item_id").eq("student_id", a.student_id).eq("subject", "English").in("item_id", ids);
    if (prior.error) return { recorded: 0, error: true };
    const seen = new Set((prior.data || []).map((r) => r.item_id));
    const rows = cands.map((c) => ({
      student_id: a.student_id, subject: "English", grade: a.grade || null, item_id: c.itemId, skill: c.skill, mode: "mock",
      first_try: c.correct && !seen.has(c.itemId), correct: c.correct, weight: 1, session_num: null,
      attempted_at: new Date(endMs).toISOString(), server_graded: true, dedupe_key: "English|" + c.itemId + "|mock|" + c.setId,
    }));
    const w = await admin.from("learning_trials").upsert(rows, { onConflict: "student_id,dedupe_key", ignoreDuplicates: true });
    if (w.error) return { recorded: 0, error: true };
    return { recorded: rows.length };
  } catch { return { recorded: 0, error: true }; }
}

