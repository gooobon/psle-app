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


// ── Parent marks settle the paper (issue #62) ─────────────────────────────────────────────────────────────────────────────
// Called after EVERY parent mark. Recomputes parent_marked / parent_right from exam_answers (the truth), so two parents marking at once
// cannot drift the counters. While any open-ended item is unmarked the attempt is "pending": first-attempt trials, the Saturday credit and the
// sticker wait. The mark that clears the last one settles the attempt exactly once (settled_at claimed with IS NULL): final score = auto score +
// marks, then the deferred mock trials (first attempt only; the dedupe key ignores a retake) and the Saturday reward run from that final score.
// A later change of a mark updates the counters and final_score but never repeats the side effects. Never throws.
import { attemptScore } from "@/lib/examScore";
import { awardPaperReward } from "@/lib/rewardsServer";

export async function settleAttempt(admin, attemptId) {
  try {
    const cur = await admin.from("exam_attempts").select("*").eq("id", attemptId).maybeSingle();
    const a = cur.data;
    if (cur.error || !a) return { ok: false, error: "attempt not found" };
    const ans = await admin.from("exam_answers").select("question_id,correct,parent_correct,parent_marked_at").eq("attempt_id", attemptId);
    if (ans.error) return { ok: false, error: "could not read marks" };
    const open = (ans.data || []).filter((r) => r.correct === null);
    const marked = open.filter((r) => r.parent_correct !== null && r.parent_correct !== undefined);
    const right = marked.filter((r) => r.parent_correct === true).length;
    const s = attemptScore({ ...a, parent_marked: marked.length, parent_right: right });
    const patch = { parent_marked: marked.length, parent_right: right };
    if (s.settled && s.open > 0) { patch.final_score = s.score; patch.final_total = s.total; }
    const up = await admin.from("exam_attempts").update(patch).eq("id", attemptId).select("*").maybeSingle();
    if (up.error) return { ok: false, error: "could not save the score (is migration 20261202000000 applied?)" };
    if (!(s.settled && s.open > 0)) return { ok: true, attempt: up.data || a, pending: s.pending, settledNow: false };
    // Claim the settle. Only the request that flips settled_at from NULL runs the deferred steps.
    const claim = await admin.from("exam_attempts").update({ settled_at: new Date().toISOString() }).eq("id", attemptId).is("settled_at", null).select("*").maybeSingle();
    if (claim.error) return { ok: false, error: "could not settle" };
    if (!claim.data) return { ok: true, attempt: up.data || a, pending: 0, settledNow: false };
    const endMs = Date.parse(a.submitted_at) || Date.now();
    const rows = (ans.data || []).map((r) => ({ id: r.question_id, correct: r.correct === null ? r.parent_correct === true : r.correct }));
    const trials = await recordMockTrials(admin, claim.data, { rows }, endMs);
    const reward = await awardPaperReward(admin, { childId: a.student_id, subject: a.subject || "English", day: a.sgt_day, status: a.status, counts: a.counts, scorePct: s.pct });
    return { ok: true, attempt: claim.data, pending: 0, settledNow: true, trials, reward };
  } catch { return { ok: false, error: "could not settle" }; }
}
