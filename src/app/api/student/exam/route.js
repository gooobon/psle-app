// Mock exams from real past papers, student side (issue #44, docs/design/mock-exams-v1.md phase 1).
//   GET  -> eligible papers (no questions, no answers), recommended paper, recent attempts, an unfinished attempt (if any)
//   POST { action:"start",  paperId }                        -> new attempt, the answer-free paper, a server wall-clock deadline
//   POST { action:"save", attemptId, answers }               -> autosave drafts into exam_answers (correct = null) for the student's own open attempt
//   POST { action:"submit", attemptId, answers, auto? }      -> server grades from the paper's own key, stores the result
// The student never receives an answer key, and never a per-item correct answer: only verdicts after submit.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_MOCK_EXAMS_ENABLED (default OFF; with it off this route does nothing: 404).
// An open attempt past its deadline is auto-submitted (auto_submitted) from the saved drafts; GET returns the drafts to resume on any device.
// Needs supabase/migrations/20261129000000_exam_attempts.sql (applied by hand).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { MOCK_EXAMS_ENABLED } from "@/lib/supabase/config";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { sgtDate } from "@/lib/activity";
import { listPapers, publicPaper, paperMeta, gradeSubmission, cleanAnswers, cleanDraft, answersFromRows, reviewItems } from "@/lib/examServer";
import { awardPaperReward } from "@/lib/rewardsServer";
import { writeNotebook, recordMockTrials } from "@/lib/examPostSubmit";
import { minutesAllowed, paperFlags, paperLabel, deadlineMs, elapsedSeconds, countsAsAttempt, statusAfterSubmit, acceptSubmitTime, pickPaper, PAPER_FEEDS_SCORE_TIERS, canReview, notebookAttemptKey, suggestedCause } from "@/lib/examEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BODY = 200_000;
const UUID = /^[0-9a-f-]{36}$/i;
const CAUSES = ["concept_unknown", "misread", "calculation", "trap", "time", "guessed"]; // CHECK constraint on wrong_answers.cause

const attemptOut = (a) => ({
  id: a.id, paperId: a.paper_id, label: a.paper_label, flags: a.paper_flags || [], minutes: a.minutes_allowed, status: a.status,
  startedAt: a.started_at, deadlineAt: a.deadline_at, submittedAt: a.submitted_at, score: a.score, total: a.total, answered: a.answered,
  questionCount: a.question_count, unanswered: a.unanswered, openTotal: a.open_total, sections: a.section_scores || [], counts: a.counts,
  countsReason: a.counts_reason, elapsedSeconds: a.elapsed_seconds, attemptNo: a.attempt_no,
});

// Draft answers saved so far for an open attempt (the student's own; never a key or a verdict). Used to resume on another device.
async function loadDraft(admin, attemptId) {
  const { data, error } = await admin.from("exam_answers").select("question_id,answer,flagged").eq("attempt_id", attemptId);
  if (error) return null;
  return answersFromRows(data || []);
}
const draftOut = (m) => { const answers = {}, flags = {}; for (const [id, a] of Object.entries(m || {})) { answers[id] = { val: a.val, seq: a.seq, reason: a.reason }; if (a.flagged) flags[id] = true; } return { answers, flags }; };

// Grade and store an attempt. Shared by a client hand-in and the server-side auto-submit of an expired sitting.
// opts.expired: the deadline passed with no hand-in: grade the saved draft, record it at the deadline, status auto_submitted.
async function finalize(admin, a, answers, { nowMs, auto, expired }) {
  const id = a.id, sid = a.student_id;
  const deadline = Date.parse(a.deadline_at), startedMs = Date.parse(a.started_at);
  const g = gradeSubmission(a.paper_id, answers);
  if (!g) return { error: "paper not found", code: 500 };
  const endMs = expired ? deadline : nowMs;
  const used = elapsedSeconds(startedMs, endMs, deadline); // server clock, capped at the deadline
  const verdict = countsAsAttempt({ elapsedSeconds: used, allowedMinutes: a.minutes_allowed, answered: g.answered, total: g.count });
  const status = expired ? "auto_submitted" : statusAfterSubmit({ auto: auto === true && nowMs >= deadline, nowMs, deadline });
  const day = sgtDate(new Date(endMs));
  const reason = verdict.counts ? (verdict.byTime ? "time" : "answers") : "too_little";
  // Claim the attempt first (only one concurrent finalize wins), then write answers.
  const upd = await admin.from("exam_attempts").update({
    status, submitted_at: new Date(endMs).toISOString(), elapsed_seconds: used, score: g.score, total: g.total, answered: g.answered,
    question_count: g.count, unanswered: g.unanswered, open_total: g.ungraded, section_scores: g.sections, counts: verdict.counts,
    counts_reason: reason, sgt_day: day,
  }).eq("id", id).eq("status", "in_progress").select("*").maybeSingle();
  if (upd.error) return { error: "could not submit", code: 500 };
  if (!upd.data) { const cur = await admin.from("exam_attempts").select("*").eq("id", id).maybeSingle(); return { attempt: cur.data || a, already: true }; }
  const rows = g.rows.filter((r) => !r.excluded).map((r) => ({
    attempt_id: id, question_id: r.id, section: r.section, answer: r.answer ? { val: r.answer.val, seq: r.answer.seq, reason: r.answer.reason } : null,
    correct: r.correct, flagged: r.flagged,
  }));
  // Overwrite (not ignore) so autosaved draft rows (correct = null) become the graded rows.
  const w = await admin.from("exam_answers").upsert(rows, { onConflict: "attempt_id,question_id" });
  if (w.error) console.error("[exam] answers write failed", id);
  // A counted paper is the subject's daily set but never feeds the first-set score tiers (record_paper_activity stores a 0/0 first set).
  let daily = "skipped";
  if (verdict.counts && !PAPER_FEEDS_SCORE_TIERS) {
    const r = await admin.rpc("record_paper_activity", { p_user: sid, p_subject: "English", p_key: "paper-" + id, p_questions: g.answered, p_correct: g.score, p_minutes: Math.max(1, Math.ceil(used / 60)) });
    daily = r.error ? "error" : "recorded";
    if (r.error) console.error("[exam] daily activity failed", id);
  }
  // Phase 2. Each step is best effort and never undoes or blocks the hand-in: the attempt and its answers are already saved.
  const notebook = await writeNotebook(admin, upd.data, g, endMs);
  const trials = await recordMockTrials(admin, upd.data, g, endMs);
  const reward = await awardPaperReward(admin, { childId: sid, subject: "English", day, status, counts: verdict.counts });
  return { attempt: upd.data, daily, g, notebook, trials, reward };
}

// An in-progress attempt past its deadline: submit it from the server-saved answers instead of abandoning it.
async function autoSubmitExpired(admin, a, nowMs) {
  const draft = await loadDraft(admin, a.id);
  if (!draft) return null;
  return finalize(admin, a, draft, { nowMs, expired: true });
}

function gate() { return !serverAuthEnabled() || !MOCK_EXAMS_ENABLED; }
async function student() {
  const me = await currentUser();
  return me && me.profile.role === "student" ? me : null;
}

// Review of ONE finished attempt: the student's own answer, the key, the explanation (where the paper has one), the parent's mark on
// open-ended items, and the notebook status/cause of each missed item. Own attempt only, and never while it is in progress.
async function review(admin, me, id) {
  if (!UUID.test(id)) return jerr("bad request", 400);
  const { data: a, error } = await admin.from("exam_attempts").select("*").eq("id", id).eq("student_id", me.profile.id).maybeSingle();
  if (error) return jerr("could not load", 500);
  if (!a) return jerr("not found", 404);
  if (!canReview({ attempt: a, studentId: me.profile.id })) return jerr("answers are shown after you hand in", 409);
  const [ans, nb] = await Promise.all([
    admin.from("exam_answers").select("question_id,answer,correct,parent_correct,flagged").eq("attempt_id", id),
    admin.from("wrong_answers").select("question_id,cause,resolved_at").eq("student_id", me.profile.id).eq("subject", "English").eq("attempt_key", notebookAttemptKey(id)),
  ]);
  if (ans.error) return jerr("could not load", 500);
  const items = reviewItems(a.paper_id, ans.data || [], a.status);
  if (!items) return jerr("paper not found", 500);
  const inBook = new Map((nb.error ? [] : nb.data || []).map((r) => [r.question_id, r]));
  return jok({
    attempt: attemptOut(a),
    items: items.map((it) => ({ ...it, inNotebook: inBook.has(it.id), cause: (inBook.get(it.id) || {}).cause || null, suggestedCause: suggestedCause({ answered: it.answered, status: a.status }) })),
    notebookCap: items.filter((it) => it.correct === false).length - inBook.size,
  });
}

export async function GET(request) {
  if (gate()) return jerr("mock exams disabled", 404);
  const me = await student();
  if (!me) return jerr("student login required", 401);
  const admin = adminClient();
  const reviewId = new URL(request.url).searchParams.get("review");
  if (reviewId) return review(admin, me, String(reviewId));
  const { data, error } = await admin.from("exam_attempts").select("*").eq("student_id", me.profile.id).order("started_at", { ascending: false }).limit(60);
  if (error) return jerr("could not load", 500);
  let rows = data || [];
  const now = Date.now();
  let autoSubmitted = null;
  const stale = rows.find((a) => a.status === "in_progress" && Date.parse(a.deadline_at) <= now);
  if (stale) { // deadline passed with no hand-in: grade the server-saved answers now
    const r = await autoSubmitExpired(admin, stale, now);
    if (r && r.attempt) { rows = rows.map((a) => (a.id === stale.id ? r.attempt : a)); autoSubmitted = r.already ? null : { ...attemptOut(r.attempt), reward: r.reward || null }; }
  }
  const open = rows.find((a) => a.status === "in_progress") || null;
  const draft = open ? await loadDraft(admin, open.id) : null;
  const papers = listPapers();
  const rec = pickPaper(papers.map((p) => ({ ...p })), { school: me.profile.school, attempts: rows.map((a) => ({ paperId: a.paper_id, status: a.status, at: Date.parse(a.submitted_at || a.started_at) })) });
  return jok({
    papers, recommendedId: rec ? rec.id : null,
    attempts: rows.filter((a) => a.status !== "in_progress").slice(0, 30).map(attemptOut),
    open: open ? { ...attemptOut(open), expired: Date.parse(open.deadline_at) <= now, ...draftOut(draft) } : null,
    autoSubmitted,
  });
}

export async function POST(request) {
  if (gate()) return jerr("mock exams disabled", 404);
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) return jerr("payload too large", 413);
  const me = await student();
  if (!me) return jerr("student login required", 401);
  if (!rateLimit(`exam:${me.profile.id}:${clientIp(request)}`, { max: 30, windowMs: 60_000 })) return jerr("too many requests", 429);
  const b = await readJson(request);
  const admin = adminClient();
  const sid = me.profile.id;
  const nowMs = Date.now();

  if (b.action === "start") {
    const meta = paperMeta(String(b.paperId || ""));
    if (!meta) return jerr("unknown paper", 400);
    const { data: prior, error: pe } = await admin.from("exam_attempts").select("*").eq("student_id", sid).order("started_at", { ascending: false }).limit(200);
    if (pe) return jerr("could not start", 500);
    const open = (prior || []).find((a) => a.status === "in_progress");
    if (open && Date.parse(open.deadline_at) > nowMs) { // one sitting at a time: resume it (the deadline is the original one), with the server-saved answers
      return jok({ attempt: attemptOut(open), paper: publicPaper(open.paper_id), resumed: true, ...draftOut(await loadDraft(admin, open.id)) });
    }
    let autoSubmitted = null;
    if (open) { // expired: grade it from the saved answers. Only if that fails does it fall back to abandoned (nothing to lose then).
      const r = await autoSubmitExpired(admin, open, nowMs);
      if (r && r.attempt && !r.error) { autoSubmitted = r.already ? null : { ...attemptOut(r.attempt), reward: r.reward || null }; prior.forEach((x, i) => { if (x.id === open.id) prior[i] = r.attempt; }); }
      else await admin.from("exam_attempts").update({ status: "abandoned" }).eq("id", open.id).eq("status", "in_progress");
    }
    const mine = (prior || []).filter((a) => a.paper_id === meta.row.id);
    const minutes = minutesAllowed(meta.row);
    const started = new Date(nowMs);
    const ins = await admin.from("exam_attempts").insert({
      student_id: sid, subject: "English", grade: me.profile.grade || null, paper_id: meta.row.id, paper_label: paperLabel(meta.row),
      paper_flags: paperFlags(meta.row), minutes_allowed: minutes, started_at: started.toISOString(),
      deadline_at: new Date(deadlineMs(nowMs, minutes)).toISOString(), attempt_no: mine.length + 1,
    }).select("*").single();
    if (ins.error || !ins.data) return jerr(ins.error && ins.error.code === "23505" ? "try again" : "could not start", ins.error && ins.error.code === "23505" ? 409 : 500);
    return jok({ attempt: attemptOut(ins.data), paper: publicPaper(meta.row.id), resumed: false, autoSubmitted });
  }

  if (b.action === "save") { // autosave of in-progress answers: own open attempt, before the deadline only
    const id = String(b.attemptId || "");
    if (!UUID.test(id)) return jerr("bad request", 400);
    if (!rateLimit(`examsave:${sid}`, { max: 60, windowMs: 60_000 })) return jerr("too many requests", 429);
    const { data: a, error } = await admin.from("exam_attempts").select("*").eq("id", id).eq("student_id", sid).maybeSingle();
    if (error) return jerr("could not save", 500);
    if (!a) return jerr("not found", 404);
    if (a.status !== "in_progress") return jok({ saved: false, status: a.status });
    if (nowMs >= Date.parse(a.deadline_at)) return jok({ saved: false, status: "expired" }); // answers after 0:00 never count
    const draft = cleanDraft(a.paper_id, b.answers);
    if (!draft) return jerr("paper not found", 500);
    const ids = Object.keys(draft);
    const cur = await admin.from("exam_answers").select("question_id").eq("attempt_id", id);
    if (cur.error) return jerr("could not save", 500);
    const gone = (cur.data || []).map((r) => r.question_id).filter((q) => !draft[q]); // answer cleared on screen: drop the draft row
    if (ids.length) {
      const payload = ids.map((q) => ({
        attempt_id: id, question_id: q, answer: { val: draft[q].val, seq: draft[q].seq, reason: draft[q].reason }, flagged: draft[q].flagged, correct: null,
      }));
      // New drafts only. A conflict (a row already graded) is left as it is.
      const ins = await admin.from("exam_answers").upsert(payload, { onConflict: "attempt_id,question_id", ignoreDuplicates: true });
      if (ins.error) return jerr("could not save", 500);
      // Refresh the draft text. correct IS NULL, so a save that arrives after grading cannot blank the mark.
      const wrote = await Promise.all(payload.map((row) => admin.from("exam_answers").update({ answer: row.answer, flagged: row.flagged })
        .eq("attempt_id", id).eq("question_id", row.question_id).is("correct", null)));
      if (wrote.some((w) => w.error)) return jerr("could not save", 500);
    }
    if (gone.length) {
      const d = await admin.from("exam_answers").delete().eq("attempt_id", id).in("question_id", gone).is("correct", null);
      if (d.error) return jerr("could not save", 500);
    }
    return jok({ saved: true, count: ids.length });
  }

  if (b.action === "cause") { // the student picks WHY a missed item went wrong (the six existing causes). Only items of their own finished paper.
    const id = String(b.attemptId || ""), qid = String(b.questionId || "").slice(0, 200);
    if (!UUID.test(id) || !qid || !CAUSES.includes(b.cause)) return jerr("bad request", 400);
    const { data: a, error } = await admin.from("exam_attempts").select("id,student_id,status").eq("id", id).eq("student_id", sid).maybeSingle();
    if (error) return jerr("could not save", 500);
    if (!a || !canReview({ attempt: a, studentId: sid })) return jerr("not found", 404);
    const u = await admin.from("wrong_answers").update({ cause: b.cause, updated_at: new Date().toISOString() })
      .eq("student_id", sid).eq("subject", "English").eq("question_id", qid).eq("attempt_key", notebookAttemptKey(id)).select("question_id");
    if (u.error) return jerr("could not save", 500);
    if (!u.data || !u.data.length) return jerr("this item is not in your notebook", 404);
    return jok();
  }

  if (b.action === "submit") {
    const id = String(b.attemptId || "");
    if (!UUID.test(id)) return jerr("bad request", 400);
    const { data: a, error } = await admin.from("exam_attempts").select("*").eq("id", id).eq("student_id", sid).maybeSingle();
    if (error) return jerr("could not submit", 500);
    if (!a) return jerr("not found", 404);
    if (a.status !== "in_progress") return jok({ attempt: attemptOut(a), already: true }); // idempotent: a repeat submit changes nothing
    const deadline = Date.parse(a.deadline_at);
    // A hand-in after the deadline plus the network grace is refused. The client cannot keep answering past 0:00 and send the paper
    // later. The sitting itself is not lost: it is auto-submitted from the answers saved before the deadline (the 409 stays).
    if (acceptSubmitTime({ nowMs, deadline }) === "late") {
      const r = await autoSubmitExpired(admin, a, nowMs);
      if (r && r.attempt && !r.error) return jerr("time is up", 409); // handed in from the saved answers (or already handed in by another request)
      // The saved answers could not be read or graded just now. Not a server crash and not a silent loss: the sitting stays open and is
      // retried on the student's next GET or start. Tell the client plainly (503 = try again), never 500.
      return jerr("time is up, but we could not hand in your saved answers just now. Open Mock papers again in a moment and they will be handed in.", 503);
    }
    const r = await finalize(admin, a, cleanAnswers(b.answers), { nowMs, auto: b.auto });
    if (r.error) return jerr(r.error, r.code || 500);
    if (r.already) return jok({ attempt: attemptOut(r.attempt), already: true });
    return jok({ attempt: attemptOut(r.attempt), daily: r.daily, reward: r.reward, notebook: r.notebook, verdicts: r.g.rows.map((x) => ({ id: x.id, section: x.section, answered: x.answered, correct: x.correct })) });
  }
  return jerr("bad request", 400);
}
