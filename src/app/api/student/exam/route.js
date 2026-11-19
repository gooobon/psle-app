// Mock exams from real past papers, student side (issue #44, docs/design/mock-exams-v1.md phase 1).
//   GET  -> eligible papers (no questions, no answers), recommended paper, recent attempts, an unfinished attempt (if any)
//   POST { action:"start",  paperId }                        -> new attempt, the answer-free paper, a server wall-clock deadline
//   POST { action:"submit", attemptId, answers, auto? }      -> server grades from the paper's own key, stores the result
// The student never receives an answer key, and never a per-item correct answer: only verdicts after submit.
// Flags: NEXT_PUBLIC_SERVER_AUTH + NEXT_PUBLIC_MOCK_EXAMS_ENABLED (default OFF; with it off this route does nothing: 404).
// Needs supabase/migrations/20261129000000_exam_attempts.sql (applied by hand).
import { adminClient, currentUser, serverAuthEnabled, jerr, jok, readJson } from "@/lib/supabase/server";
import { MOCK_EXAMS_ENABLED } from "@/lib/supabase/config";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { sgtDate } from "@/lib/activity";
import { listPapers, publicPaper, paperMeta, gradeSubmission, cleanAnswers } from "@/lib/examServer";
import { minutesAllowed, paperFlags, paperLabel, deadlineMs, elapsedSeconds, countsAsAttempt, statusAfterSubmit, acceptSubmitTime, pickPaper, PAPER_FEEDS_SCORE_TIERS } from "@/lib/examEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BODY = 200_000;
const UUID = /^[0-9a-f-]{36}$/i;

const attemptOut = (a) => ({
  id: a.id, paperId: a.paper_id, label: a.paper_label, flags: a.paper_flags || [], minutes: a.minutes_allowed, status: a.status,
  startedAt: a.started_at, deadlineAt: a.deadline_at, submittedAt: a.submitted_at, score: a.score, total: a.total, answered: a.answered,
  questionCount: a.question_count, unanswered: a.unanswered, openTotal: a.open_total, sections: a.section_scores || [], counts: a.counts,
  countsReason: a.counts_reason, elapsedSeconds: a.elapsed_seconds, attemptNo: a.attempt_no,
});

function gate() { return !serverAuthEnabled() || !MOCK_EXAMS_ENABLED; }
async function student() {
  const me = await currentUser();
  return me && me.profile.role === "student" ? me : null;
}

export async function GET() {
  if (gate()) return jerr("mock exams disabled", 404);
  const me = await student();
  if (!me) return jerr("student login required", 401);
  const admin = adminClient();
  const { data, error } = await admin.from("exam_attempts").select("*").eq("student_id", me.profile.id).order("started_at", { ascending: false }).limit(60);
  if (error) return jerr("could not load", 500);
  const rows = data || [];
  const now = Date.now();
  const open = rows.find((a) => a.status === "in_progress") || null;
  const papers = listPapers();
  const rec = pickPaper(papers.map((p) => ({ ...p })), { school: me.profile.school, attempts: rows.map((a) => ({ paperId: a.paper_id, status: a.status, at: Date.parse(a.submitted_at || a.started_at) })) });
  return jok({
    papers, recommendedId: rec ? rec.id : null,
    attempts: rows.filter((a) => a.status !== "in_progress").slice(0, 30).map(attemptOut),
    open: open ? { ...attemptOut(open), expired: Date.parse(open.deadline_at) <= now } : null,
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
    if (open && Date.parse(open.deadline_at) > nowMs) { // one sitting at a time: resume it (the deadline is the original one)
      return jok({ attempt: attemptOut(open), paper: publicPaper(open.paper_id), resumed: true });
    }
    if (open) await admin.from("exam_attempts").update({ status: "abandoned" }).eq("id", open.id).eq("status", "in_progress");
    const mine = (prior || []).filter((a) => a.paper_id === meta.row.id);
    const minutes = minutesAllowed(meta.row);
    const started = new Date(nowMs);
    const ins = await admin.from("exam_attempts").insert({
      student_id: sid, subject: "English", grade: me.profile.grade || null, paper_id: meta.row.id, paper_label: paperLabel(meta.row),
      paper_flags: paperFlags(meta.row), minutes_allowed: minutes, started_at: started.toISOString(),
      deadline_at: new Date(deadlineMs(nowMs, minutes)).toISOString(), attempt_no: mine.length + 1,
    }).select("*").single();
    if (ins.error || !ins.data) return jerr(ins.error && ins.error.code === "23505" ? "try again" : "could not start", ins.error && ins.error.code === "23505" ? 409 : 500);
    return jok({ attempt: attemptOut(ins.data), paper: publicPaper(meta.row.id), resumed: false });
  }

  if (b.action === "submit") {
    const id = String(b.attemptId || "");
    if (!UUID.test(id)) return jerr("bad request", 400);
    const { data: a, error } = await admin.from("exam_attempts").select("*").eq("id", id).eq("student_id", sid).maybeSingle();
    if (error) return jerr("could not submit", 500);
    if (!a) return jerr("not found", 404);
    if (a.status !== "in_progress") return jok({ attempt: attemptOut(a), already: true }); // idempotent: a repeat submit changes nothing
    const deadline = Date.parse(a.deadline_at), startedMs = Date.parse(a.started_at);
    // A hand-in after the deadline plus the network grace is refused. The client cannot keep
    // answering past 0:00 and send the paper later. Auto-submit is only "automatic" when the
    // server clock has actually reached the deadline.
    if (acceptSubmitTime({ nowMs, deadline }) === "late") return jerr("time is up", 409);
    const answers = cleanAnswers(b.answers);
    const g = gradeSubmission(a.paper_id, answers);
    if (!g) return jerr("paper not found", 500);
    const used = elapsedSeconds(startedMs, nowMs, deadline); // server clock, capped at the deadline
    const verdict = countsAsAttempt({ elapsedSeconds: used, allowedMinutes: a.minutes_allowed, answered: g.answered, total: g.count });
    const status = statusAfterSubmit({ auto: b.auto === true && nowMs >= deadline, nowMs, deadline });
    const day = sgtDate(new Date(nowMs));
    const reason = verdict.counts ? (verdict.byTime ? "time" : "answers") : "too_little";
    // Claim the attempt first (only one concurrent submit wins), then write answers.
    const upd = await admin.from("exam_attempts").update({
      status, submitted_at: new Date(nowMs).toISOString(), elapsed_seconds: used, score: g.score, total: g.total, answered: g.answered,
      question_count: g.count, unanswered: g.unanswered, open_total: g.ungraded, section_scores: g.sections, counts: verdict.counts,
      counts_reason: reason, sgt_day: day,
    }).eq("id", id).eq("status", "in_progress").select("*").maybeSingle();
    if (upd.error) return jerr("could not submit", 500);
    if (!upd.data) { const cur = await admin.from("exam_attempts").select("*").eq("id", id).maybeSingle(); return jok({ attempt: attemptOut(cur.data || a), already: true }); }
    const rows = g.rows.map((r) => ({
      attempt_id: id, question_id: r.id, section: r.section, answer: r.answer ? { val: r.answer.val, seq: r.answer.seq, reason: r.answer.reason } : null,
      correct: r.correct, flagged: r.flagged,
    }));
    const w = await admin.from("exam_answers").upsert(rows, { onConflict: "attempt_id,question_id", ignoreDuplicates: true });
    if (w.error) console.error("[exam] answers write failed", id);
    // A counted paper is the subject's daily set but never feeds the first-set score tiers (record_paper_activity stores a 0/0 first set).
    let daily = "skipped";
    if (verdict.counts && !PAPER_FEEDS_SCORE_TIERS) {
      const r = await admin.rpc("record_paper_activity", { p_user: sid, p_subject: "English", p_key: "paper-" + id, p_questions: g.answered, p_correct: g.score, p_minutes: Math.max(1, Math.ceil(used / 60)) });
      daily = r.error ? "error" : "recorded";
      if (r.error) console.error("[exam] daily activity failed", id);
    }
    return jok({ attempt: attemptOut(upd.data), daily, verdicts: g.rows.map((r) => ({ id: r.id, section: r.section, answered: r.answered, correct: r.correct })) });
  }
  return jerr("bad request", 400);
}
