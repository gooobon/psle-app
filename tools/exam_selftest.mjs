// Self-test for mock exams phase 1 (issue #44). Run: node tools/exam_selftest.mjs   (exit 1 on any failure)
// Pure rules (examEngine), the real catalogue + server grading on the real papers (through tools/exam_loader.mjs), the email block,
// and static checks on the migration and the flag. No network, no database.
import { register } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
register("./exam_loader.mjs", import.meta.url);
const E = await import("../src/lib/examEngine.js");
const S = await import("../src/lib/examServer.js");
const B = await import("../src/lib/p3PaperBridge.js");
const T = await import("../src/lib/notify/emailTemplate.mjs");
const D = await import("../src/lib/dailyAlert.js");
const R = await import("../src/lib/rewards.js");
const CS = await import("../src/lib/childSettings.js");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/papers/manifest.json"), "utf8"));

let n = 0;
const ok = (name, fn) => { try { fn(); n++; console.log("PASS", name); } catch (e) { console.error("FAIL", name, "\n ", e.message); process.exitCode = 1; } };

// ── timer ──
ok("1.5 min per mark when no printed time; printed time wins; bounded", () => {
  assert.equal(E.minutesAllowed({ marks: 50 }), 75);
  assert.equal(E.minutesAllowed({ marks: 50, minutes: 60 }), 60);
  assert.equal(E.minutesAllowed({ marks: 45 }), 68); // 67.5 rounds up
  assert.equal(E.minutesAllowed({ marks: 1 }), 5);
  assert.equal(E.minutesAllowed({ marks: 9999 }), 240);
});
ok("wall-clock deadline: refresh cannot extend it; expiry detected", () => {
  const start = 1_000_000, dl = E.deadlineMs(start, 75);
  assert.equal(dl, start + 75 * 60_000);
  assert.equal(E.remainingSeconds(dl, start + 60_000), 74 * 60);
  assert.equal(E.remainingSeconds(dl, dl + 5), 0);
  assert.ok(E.isExpired(dl, dl) && !E.isExpired(dl, dl - 1));
  assert.equal(E.elapsedSeconds(start, dl + 999_999, dl), 75 * 60); // late submit is capped at the deadline
});
// ── anti-gaming ──
ok("counts only with >= 50% time OR >= 80% answered", () => {
  const c = (used, ans) => E.countsAsAttempt({ elapsedSeconds: used, allowedMinutes: 60, answered: ans, total: 50 }).counts;
  assert.equal(c(10, 0), false);          // open and submit blank
  assert.equal(c(1799, 10), false);       // just under half the time, few answers
  assert.equal(c(1800, 0), true);         // exactly half the time
  assert.equal(c(60, 39), false);         // 78% answered, fast
  assert.equal(c(60, 40), true);          // exactly 80% answered
});
ok("a paper never feeds score tiers", () => assert.equal(E.PAPER_FEEDS_SCORE_TIERS, false));
ok("isAnswered: 0 is an answer, blanks are not", () => {
  assert.ok(E.isAnswered({ val: 0 })); assert.ok(E.isAnswered({ val: "x" })); assert.ok(E.isAnswered({ val: [null, "True"] }));
  assert.ok(!E.isAnswered({ val: "  " })); assert.ok(!E.isAnswered({ val: null })); assert.ok(!E.isAnswered(undefined));
});
ok("summarize leaves open-ended items out of the score", () => {
  const s = E.summarize([{ section: "A", correct: true }, { section: "A", correct: false }, { section: "B", correct: null }]);
  assert.deepEqual([s.score, s.total, s.ungraded], [1, 2, 1]);
});
ok("pickPaper: own school first, no repeat until all used, then oldest", () => {
  const rows = [{ id: "a", school: "Nanyang Primary School" }, { id: "b", school: "Tao Nan School" }, { id: "c", school: "Nanyang Primary School" }];
  assert.equal(E.pickPaper(rows, { school: "Tao Nan School", attempts: [] }).id, "b");
  assert.equal(E.pickPaper(rows, { school: "Tao Nan School", attempts: [{ paperId: "b", status: "submitted", at: 5 }] }).id, "a");
  const all = [{ paperId: "a", status: "submitted", at: 9 }, { paperId: "b", status: "submitted", at: 1 }, { paperId: "c", status: "auto_submitted", at: 5 }];
  assert.equal(E.pickPaper(rows, { school: "", attempts: all }).id, "b"); // pool exhausted: oldest first
});
// ── eligibility + manifest flags ──
const en = manifest.papers.filter((p) => p.subject === "English");
ok("manifest rows map to the runtime pool (poolIndex unique, in range)", () => {
  const idx = en.map((p) => p.poolIndex);
  assert.ok(idx.every(Number.isInteger)); assert.equal(new Set(idx).size, en.length);
  assert.equal(Math.max(...idx), B.flattenEnglishPool().length - 1);
});
ok("full paper = English, >= 45 marks, complete key", () => {
  assert.ok(!E.isFullPaper({ subject: "English", hasAnswerKey: true, marks: 44, poolIndex: 1 }));
  assert.ok(!E.isFullPaper({ subject: "English", hasAnswerKey: false, marks: 50, poolIndex: 1 }));
  assert.ok(!E.isFullPaper({ subject: "Chinese", hasAnswerKey: true, marks: 50, poolIndex: 1 }));
  assert.ok(E.isFullPaper({ subject: "English", hasAnswerKey: true, marks: 45, poolIndex: 0 }));
});
const list = S.listPapers();
ok("catalogue = every English full paper in the manifest, flagged ones included", () => {
  const want = en.filter(E.isFullPaper);
  assert.equal(list.length, want.length);
  assert.deepEqual(list.map((p) => p.id).sort(), want.map((p) => p.id).sort());
  assert.ok(list.every((p) => p.marks >= 45 && p.minutes >= 5));
});
ok("flagged papers (duplicate / year mismatch) are kept and carry a note; flags stay in the manifest", () => {
  const flagged = en.filter(E.isFullPaper).filter((r) => E.paperFlags(r).length);
  assert.ok(flagged.length > 0, "expected at least one flagged full paper in the current manifest");
  for (const r of flagged) { const l = list.find((p) => p.id === r.id); assert.ok(l, r.id + " missing"); assert.equal(l.notes.length, l.flags.length); }
  assert.equal(E.paperFlags({ answerKeyNote: "derived" })[0], "key_estimated");
  assert.ok(manifest.papers.some((p) => (p.suspectedDuplicates || []).length) && manifest.papers.every((p) => "answerKeyNote" in p));
});
// ── answer-free paper + grading on the real papers ──
const LEAK = /"(answer|answers|acceptableAnswers|hints|solution|explanation|explain|learning_tip|retry_hint|correctAnswer|modelAnswer)"\s*:/;
ok("the paper sent to a student has no answer / hint / solution field", () => {
  for (const p of list) { const pub = S.publicPaper(p.id); assert.ok(pub.questionCount > 0, p.id); assert.ok(!LEAK.test(JSON.stringify(pub)), p.id + " leaks"); }
});
ok("grading: the paper's own key marks right/wrong; blanks are wrong; ids are not mixed across papers", () => {
  let checked = 0;
  for (const p of list) {
    const meta = S.paperMeta(p.id);
    const paper = B.flattenEnglishPool()[meta.row.poolIndex];
    const plan = B.englishPaperExamPlan(paper);
    const right = {}, wrong = {};
    for (const sec of plan) {
      if (sec.type.endsWith("MCQ")) sec.items.forEach((q) => { right[q.id] = { val: q.answer }; wrong[q.id] = { val: (q.answer + 1) % Math.max(2, q.options.length) }; });
      if (sec.type.endsWith("Cloze")) sec.items.forEach((s) => (s.blanks || []).forEach((b) => { right[s.id + "_" + b.num] = { val: b.answer }; wrong[s.id + "_" + b.num] = { val: "zzzz" }; }));
      if (sec.type === "Editing") sec.items.forEach((s) => (s.items || []).forEach((q) => { right[q.id] = { val: q.answer }; wrong[q.id] = { val: 99 }; }));
    }
    const a = S.gradeSubmission(p.id, S.cleanAnswers(right));
    const none = S.gradeSubmission(p.id, S.cleanAnswers({}));
    const bad = S.gradeSubmission(p.id, S.cleanAnswers(wrong));
    assert.equal(none.answered, 0, p.id);
    assert.ok(none.score === 0 && none.total > 0, p.id + " blank paper must score 0");
    const rightCount = a.rows.filter((r) => right[r.id] && r.correct === true).length;
    assert.ok(rightCount >= Object.keys(right).length * 0.9, `${p.id}: only ${rightCount}/${Object.keys(right).length} of its own keyed answers graded right`);
    assert.ok(bad.score < a.score || Object.keys(right).length === 0, p.id);
    assert.equal(a.count, a.rows.length); checked++;
  }
  assert.equal(checked, list.length);
});
ok("grader never returns or needs the key to the caller (verdict rows only carry correct/answered)", () => {
  const g = S.gradeSubmission(list[0].id, {});
  assert.ok(!LEAK.test(JSON.stringify(g.rows.map((r) => ({ id: r.id, section: r.section, answered: r.answered, correct: r.correct })))));
});
// ── autosave + server auto-submit (issue #46) ──
const first = list[0].id;
const qids = S.publicPaper(first).questionIds;
ok("autosave validation: only this paper's ids, only answered/flagged, capped values, no key fields", () => {
  const d = S.cleanDraft(first, { [qids[0]]: { val: 1 }, [qids[1]]: { val: "  " }, [qids[2]]: { val: null, flagged: true }, "not-a-question": { val: 1 }, __proto__: { val: 1 }, x: "str" });
  assert.deepEqual(Object.keys(d).sort(), [qids[0], qids[2]].sort());
  assert.equal(d[qids[2]].flagged, true);
  assert.equal(S.cleanDraft("no-such-paper", {}), null);
  assert.ok(!LEAK.test(JSON.stringify(d)));
});
ok("draft rows round-trip to the answers map and grade like a direct submit", () => {
  const meta = S.paperMeta(first);
  const plan = B.englishPaperExamPlan(B.flattenEnglishPool()[meta.row.poolIndex]);
  const right = {};
  for (const sec of plan) if (sec.type.endsWith("MCQ")) sec.items.forEach((q) => { right[q.id] = { val: q.answer }; });
  const draft = S.cleanDraft(first, right);
  const rows = Object.entries(draft).map(([q, a]) => ({ question_id: q, answer: { val: a.val, seq: a.seq, reason: a.reason }, flagged: a.flagged, correct: null }));
  const back = S.answersFromRows(rows);
  assert.deepEqual(JSON.parse(JSON.stringify(back)), JSON.parse(JSON.stringify(draft)));
  const g1 = S.gradeSubmission(first, S.cleanAnswers(right)), g2 = S.gradeSubmission(first, back);
  assert.equal(g2.score, g1.score); assert.equal(g2.answered, g1.answered);
  assert.equal(Object.keys(S.answersFromRows([])).length, 0);
});
ok("expired sitting: auto_submitted status, elapsed capped at the deadline; late client hand-in still refused", () => {
  const start = 1_000_000, dl = E.deadlineMs(start, 60);
  assert.equal(E.statusAfterSubmit({ auto: false, nowMs: dl + 3_600_000, deadline: dl }), "auto_submitted");
  assert.equal(E.elapsedSeconds(start, dl, dl), 3600);
  assert.equal(E.acceptSubmitTime({ nowMs: dl + 20_000, deadline: dl }), "on_time");
  assert.equal(E.acceptSubmitTime({ nowMs: dl + 20_001, deadline: dl }), "late");
});
ok("route wiring: save action, drafts reused on resume, expired -> auto-submit (not abandoned), 409 kept, no key to the client", () => {
  const r = fs.readFileSync(path.join(ROOT, "src/app/api/student/exam/route.js"), "utf8");
  assert.ok(/b\.action === "save"/.test(r) && /cleanDraft\(a\.paper_id/.test(r) && /\.eq\("student_id", sid\)/.test(r));
  assert.ok(/status !== "in_progress"\) return jok\(\{ saved: false/.test(r) && /nowMs >= Date\.parse\(a\.deadline_at\)\) return jok\(\{ saved: false/.test(r));
  assert.ok(/autoSubmitExpired\(admin, open, nowMs\)/.test(r) && /autoSubmitExpired\(admin, stale, now\)/.test(r));
  assert.ok(/jerr\("time is up", 409\)/.test(r));
  assert.ok(/onConflict: "attempt_id,question_id" \}\);/.test(r), "the final grade must still overwrite a draft");
  assert.ok(!/modelAnswers|\banswer_key\b|\.answer\b/.test(r.replace(/r\.answer|a\.answer|row\.answer|draft\[q\]/g, "")));
  const c = fs.readFileSync(path.join(ROOT, "src/components/PaperExam.js"), "utf8");
  assert.ok(/action: 'save'/.test(c) && /setInterval\(syncNow, 30000\)/.test(c) && /genius_exam_inprogress_v1/.test(c));
  assert.ok(!/localStorage\.(removeItem|clear)\([^)]*genius_(users|progress)/.test(c));
});
ok("late autosave cannot overwrite or delete a graded row", () => {
  const r = fs.readFileSync(path.join(ROOT, "src/app/api/student/exam/route.js"), "utf8");
  const save = r.slice(r.indexOf('b.action === "save"'), r.indexOf('b.action === "submit"'));
  assert.ok(/ignoreDuplicates:\s*true/.test(save), "inserting a draft must leave an existing row alone");
  assert.ok(/\.update\(\{ answer: row\.answer, flagged: row\.flagged \}\)/.test(save));
  assert.ok(/\.is\("correct", null\)/.test(save));
  const deletes = save.split(".delete()");
  assert.equal(deletes.length, 2, "one delete, of drafts only");
  assert.ok(/\.is\("correct", null\)/.test(deletes[1]), "delete must be limited to correct IS NULL");
  assert.ok(!/ignoreDuplicates/.test(r.slice(0, r.indexOf('b.action === "save"'))), "grading still overwrites the draft");
});
ok("autosave (phase 1b) added no migration of its own: exam_attempts is still followed only by the phase 2 paper_rewards file", () => {
  const files = fs.readdirSync(path.join(ROOT, "supabase/migrations")).sort();
  const i = files.indexOf("20261129000000_exam_attempts.sql");
  assert.ok(i >= 0);
  assert.deepEqual(files.slice(i + 1), ["20261130000000_paper_rewards.sql"]);
});
// ── 8pm email ──
ok("email: papers block appears only when there is something to report", () => {
  const base = { parentName: "P", date: "2026-11-20", dashboardUrl: "https://x/", children: [{ name: "Kid", grade: "P3", subjects: [], questions: 0, accuracy: null, minutes: 0, streak: 0, activeDays: 0, missing: [] }] };
  assert.ok(!T.renderDailyEmail(base).text.includes("Mock papers"));
  assert.equal(D.paperBlock([], "2026-11-20"), null);
  const blk = D.paperBlock([{ status: "submitted", sgt_day: "2026-11-20", paper_label: "Nanyang 2024 EOY", score: 30, total: 40, elapsed_seconds: 3000, minutes_allowed: 75, counts: true, open_total: 3 },
    { status: "in_progress", paper_label: "Tao Nan 2025", deadline_at: "2099-01-01T00:00:00Z" }], "2026-11-20");
  base.children[0].papers = blk;
  const m = T.renderDailyEmail(base);
  assert.ok(m.text.includes("Nanyang 2024 EOY: 30/40 (75%) · 50 of 75 min used") && m.text.includes("3 open-ended to mark") && m.text.includes("Tao Nan 2025: started, not handed in"));
  assert.ok(m.html.includes("Mock papers"));
});
// ── flag + migration (static) ──
ok("flag defaults OFF and is read from NEXT_PUBLIC_MOCK_EXAMS_ENABLED === 'true'", () => {
  const cfg = fs.readFileSync(path.join(ROOT, "src/lib/supabase/config.js"), "utf8");
  assert.ok(/MOCK_EXAMS_ENABLED\s*=\s*process\.env\.NEXT_PUBLIC_MOCK_EXAMS_ENABLED === "true"/.test(cfg));
  for (const f of ["src/app/api/student/exam/route.js", "src/app/api/parent/exam/route.js"]) { const t = fs.readFileSync(path.join(ROOT, f), "utf8"); assert.ok(/!MOCK_EXAMS_ENABLED/.test(t) && /mock exams disabled", 404/.test(t), f); }
});
ok("migration is additive: no drop table / delete / truncate of existing data, guarded creates", () => {
  const sql = fs.readFileSync(path.join(ROOT, "supabase/migrations/20261129000000_exam_attempts.sql"), "utf8").replace(/--.*$/gm, "");
  assert.ok(!/drop\s+table|delete\s+from|truncate\s+table|alter\s+table\s+public\.(profiles|wrong_answers|daily_activity)/i.test(sql));
  assert.ok(/create table if not exists public\.exam_attempts/.test(sql) && /create table if not exists public\.exam_answers/.test(sql));
  assert.ok(/grant execute on function public\.record_paper_activity\(uuid,text,text,int,int,int\) to service_role/.test(sql));
});

// ═══ Phase 2 (issue #48): notebook, review, Saturday reward, mock trials ═══
const papers = S.listPapers();
const someId = papers[0].id;

// ── notebook ──
ok("notebook cap: wrong answered items first, then blanks; open-ended never; skipped is counted", () => {
  const rows = [];
  for (let i = 0; i < 30; i++) rows.push({ id: "q" + i, answered: i % 2 === 0, correct: false });
  rows.push({ id: "open", answered: true, correct: null }, { id: "ok", answered: true, correct: true });
  const { picked, skipped } = E.pickNotebookRows(rows);
  assert.equal(E.MAX_NOTEBOOK_PER_PAPER, 20);
  assert.equal(picked.length, 20); assert.equal(skipped, 10);
  assert.ok(picked.slice(0, 15).every((r) => r.answered) && picked.slice(15).every((r) => !r.answered), "15 answered misses come first, then 5 blanks");
  assert.ok(!picked.some((r) => r.id === "open" || r.id === "ok"));
  assert.equal(E.pickNotebookRows([]).skipped, 0);
});
ok("attempt key is exam-<attemptId> (design section 6); the local notebook uses it for cause updates", async () => {
  assert.equal(E.notebookAttemptKey("abc"), "exam-abc");
  const W = await import("../src/lib/wrongNotebook.js");
  assert.equal(W.attemptKeyFor({ history: [] }, { id: "q1", attemptKey: "exam-abc", sessionNum: 4 }), "exam-abc");
  assert.equal(W.attemptKeyFor({ history: [] }, { id: "q1", sessionNum: 4 }), "set-4", "old records are unchanged");
});
ok("cause suggestion: Ran out of time only for blanks at an auto-submit; nothing is stored by it", () => {
  assert.equal(E.suggestedCause({ answered: false, status: "auto_submitted" }), "time");
  assert.equal(E.suggestedCause({ answered: false, status: "submitted" }), null);
  assert.equal(E.suggestedCause({ answered: true, status: "auto_submitted" }), null);
});
ok("the six cause labels are the existing English ones", async () => {
  const W = await import("../src/lib/wrongNotebook.js");
  assert.deepEqual(W.CAUSES.map((c) => c.label), ["Didn't know the concept", "Misread the question", "Calculation slip", "Fell for a trap", "Ran out of time", "Guessed"]);
});

// ── review ──
ok("review is only for the student's OWN finished attempt, never in progress", () => {
  const a = (status, sid = "me") => ({ student_id: sid, status });
  assert.ok(E.canReview({ attempt: a("submitted"), studentId: "me" }));
  assert.ok(E.canReview({ attempt: a("auto_submitted"), studentId: "me" }));
  assert.ok(!E.canReview({ attempt: a("in_progress"), studentId: "me" }));
  assert.ok(!E.canReview({ attempt: a("abandoned"), studentId: "me" }));
  assert.ok(!E.canReview({ attempt: a("submitted", "other"), studentId: "me" }));
  assert.ok(!E.canReview({ attempt: null, studentId: "me" }) && !E.canReview({ attempt: a("submitted"), studentId: "" }));
});
ok("review on real papers: every auto-graded item shows the key, and the shown key is the one the grader accepts (MCQ)", () => {
  let checked = 0, mcq = 0, missing = 0;
  for (const p of papers.slice(0, 12)) {
    const g0 = S.gradeSubmission(p.id, {});
    const items = S.reviewItems(p.id, g0.rows.map((r) => ({ question_id: r.id, answer: null, correct: r.correct })), "submitted");
    assert.equal(items.length, g0.count, p.id);
    const answers = {};
    for (const it of items) {
      if (it.ambiguous || it.correct === null) { assert.equal(it.correctAnswer === "" || it.openEnded, true); continue; }
      if (it.keyMissing) { assert.equal(it.correctAnswer, "", "a missing key is never guessed"); missing++; continue; }
      assert.ok(it.correctAnswer, `${p.id} ${it.id} has no correct answer text`);
      const m = /^([A-Z])\. /.exec(it.correctAnswer);
      if (m && it.section.endsWith("MCQ")) { answers[it.id] = { val: m[1].charCodeAt(0) - 65 }; mcq++; }
      checked++;
    }
    const g1 = S.gradeSubmission(p.id, answers);
    for (const r of g1.rows) if (answers[r.id]) assert.equal(r.correct, true, `${p.id} ${r.id}: the shown correct answer was graded wrong`);
  }
  assert.ok(checked > 100 && mcq > 20, `checked ${checked}, mcq ${mcq}, missing-key ${missing}`);
  console.log(`    (${checked} items with a key checked, ${mcq} MCQ round-tripped through the grader, ${missing} items flagged keyMissing)`);
});
ok("review shows the student's own answer in words and marks time-suggested blanks; open-ended items carry a model answer and the parent's mark", () => {
  const p = papers.find((x) => S.gradeSubmission(x.id, {}).ungraded > 0) || papers[0];
  const g = S.gradeSubmission(p.id, {});
  const first = g.rows.find((r) => r.correct === false);
  const rows = g.rows.map((r) => ({ question_id: r.id, answer: r.id === first.id ? { val: 0 } : null, correct: r.correct, parent_correct: r.correct === null ? true : null }));
  const items = S.reviewItems(p.id, rows, "auto_submitted");
  const it = items.find((x) => x.id === first.id);
  assert.ok(it.yourAnswer.length > 0 && it.answered && it.timeSuggested === false);
  assert.ok(items.some((x) => !x.answered && x.timeSuggested));
  const open = items.find((x) => x.openEnded);
  if (open) { assert.ok(open.correctAnswer, "model answer"); assert.equal(open.parentMark, true); }
});
ok("the student's PAPER payload still carries no key or explanation (review is a separate, post-submit call)", () => {
  const pub = JSON.stringify(S.publicPaper(someId));
  assert.ok(!/"answer"|"explanation"|"solution"|"hints"/.test(pub));
});
ok("review route: gated on canReview + own attempt; cause route only touches own notebook rows of a finished paper", () => {
  const r = fs.readFileSync(path.join(ROOT, "src/app/api/student/exam/route.js"), "utf8");
  const rv = r.slice(r.indexOf("async function review("), r.indexOf("export async function GET"));
  assert.ok(/\.eq\("student_id", me\.profile\.id\)/.test(rv) && /canReview\(\{ attempt: a, studentId: me\.profile\.id \}\)/.test(rv) && /409/.test(rv));
  assert.ok(rv.indexOf("canReview(") < rv.indexOf("reviewItems("), "the key is read only after the check");
  const c = r.slice(r.indexOf('b.action === "cause"'), r.indexOf('b.action === "submit"'));
  assert.ok(/CAUSES\.includes\(b\.cause\)/.test(c) && /canReview\(/.test(c) && /\.eq\("student_id", sid\)/.test(c) && /notebookAttemptKey\(id\)/.test(c));
  assert.ok(!/\.delete\(\)/.test(c) && !/resolved_at/.test(c));
  assert.ok(/reviewItems/.test(r) && !/reviewItems/.test(r.slice(0, r.indexOf("async function review(")).replace(/import[^\n]*\n/g, "")), "reviewItems is used only inside review()");
});
ok("notebook rows: capped, scoped to the student, attempt key exam-<id>, source = paper id, cause left NULL", () => {
  let big = 0;
  for (const p of papers.slice(0, 20)) {
    const g = S.gradeSubmission(p.id, {}); // a blank paper: every auto-graded item is wrong
    const { rows, skipped } = S.notebookRows(p.id, g, { studentId: "stu", attemptId: "att1", grade: "P3", nowIso: "2026-11-21T00:00:00.000Z" });
    assert.ok(rows.length <= E.MAX_NOTEBOOK_PER_PAPER, p.id);
    assert.equal(rows.length + skipped, g.rows.filter((r) => r.correct === false).length - (g.rows.filter((r) => r.correct === false).length - rows.length - skipped));
    for (const r of rows) {
      assert.equal(r.student_id, "stu"); assert.equal(r.attempt_key, "exam-att1"); assert.equal(r.source_id, p.id); assert.equal(r.subject, "English");
      assert.ok(!("cause" in r) && r.correct_answer && r.question_id, "no entry without a readable correct answer");
    }
    if (skipped > 0) big++;
  }
  assert.ok(big > 0, "at least one long paper actually hits the cap");
});

// ── mastery (mock trials) ──
ok("mock trials: one candidate per auto-graded item, keyed by the paper so a retake is the same key (ignored)", () => {
  const g = S.gradeSubmission(someId, {});
  const a = S.mockTrialCandidates(someId, g), b = S.mockTrialCandidates(someId, S.gradeSubmission(someId, {}));
  assert.ok(a.length > 10 && a.length <= g.total);
  assert.ok(a.every((c) => c.setId.startsWith("paper:") && c.skill && typeof c.correct === "boolean"));
  assert.deepEqual(a.map((c) => "English|" + c.itemId + "|mock|" + c.setId), b.map((c) => "English|" + c.itemId + "|mock|" + c.setId));
  assert.equal(new Set(a.map((c) => c.itemId)).size, a.length, "no item twice in one paper");
  assert.ok(a.every((c) => c.skill), "every trial has a skill key");
});
ok("delayed similar question counts at half weight, same question never (existing homeworkMastery rules, unchanged)", async () => {
  const H = await import("../src/lib/homeworkMastery.js");
  const src = { id: "q1", skill: "s", date: "2026-11-20" };
  assert.equal(H.homeworkMasteryWeight({ item: { id: "q1", skill: "s" }, source: src, seenIds: [], todayYmd: "2026-11-25" }).reason, "same-question");
  const v = H.homeworkMasteryWeight({ item: { id: "q2", skill: "s" }, source: src, seenIds: [], todayYmd: "2026-11-21" });
  assert.deepEqual([v.counts, v.weight], [true, 0.5]);
  assert.equal(H.homeworkMasteryWeight({ item: { id: "q2", skill: "s" }, source: src, seenIds: [], todayYmd: "2026-11-20" }).reason, "too-soon");
});
ok("post-submit writes live in examPostSubmit (best effort, ignoreDuplicates) and the route never lets them fail the hand-in", () => {
  const m = fs.readFileSync(path.join(ROOT, "src/lib/examPostSubmit.js"), "utf8");
  assert.ok(/onConflict: "student_id,subject,question_id,attempt_key", ignoreDuplicates: true/.test(m));
  assert.ok(/onConflict: "student_id,dedupe_key", ignoreDuplicates: true/.test(m) && /mode: "mock"/.test(m) && /weight: 1/.test(m) && /server_graded: true/.test(m));
  assert.ok(/if \(!LEARNING_DASHBOARD\)/.test(m));
  assert.equal((m.match(/catch \{/g) || []).length, 2);
  const r = fs.readFileSync(path.join(ROOT, "src/app/api/student/exam/route.js"), "utf8");
  assert.ok(/awardPaperReward\(admin/.test(r) && /writeNotebook\(admin/.test(r) && /recordMockTrials\(admin/.test(r));
  assert.ok(r.indexOf('from("exam_answers").upsert(rows') < r.indexOf("writeNotebook(admin"), "answers are saved before the extras run");
});

// ── Saturday paper reward ──
const SAT = "2026-11-21", FRI = "2026-11-20"; // 21 Nov 2026 is a Saturday
const rule = (o = {}) => ({ enabled: true, sgdPerCredit: 0.5, dailyTiers: [], weeklyUnit: "credits", weeklyAmounts: {}, paperUnit: "credits", paperAmounts: { English: 5 }, paperCheckOff: false, ...o });
ok("eligibility: submitted on a Saturday with the effort check passed; everything else is refused", () => {
  const el = (attempt, r) => R.paperRewardEligibility({ attempt, rule: r === undefined ? rule() : r });
  assert.ok(R.isSaturday(SAT) && !R.isSaturday(FRI));
  assert.deepEqual(el({ status: "submitted", sgtDay: SAT, counts: true }), { eligible: true, reason: "ok" });
  assert.deepEqual(el({ status: "auto_submitted", sgtDay: SAT, counts: true }), { eligible: true, reason: "ok" });
  assert.equal(el({ status: "submitted", sgtDay: FRI, counts: true }).reason, "not_saturday");
  assert.equal(el({ status: "in_progress", sgtDay: SAT, counts: true }).reason, "not_submitted");
  assert.equal(el({ status: "abandoned", sgtDay: SAT, counts: true }).reason, "not_submitted");
  assert.equal(el({ status: "submitted", sgtDay: SAT, counts: false }).reason, "too_little");
  assert.equal(el({ status: "submitted", sgtDay: SAT, counts: true }, null).reason, "rewards_off");
  assert.equal(el({ status: "submitted", sgtDay: SAT, counts: true }, rule({ enabled: false })).reason, "rewards_off");
});
ok("the effort check is the existing one (>= 50% time OR >= 80% answered) and the parent can turn it off", () => {
  const counts = (used, ans) => E.countsAsAttempt({ elapsedSeconds: used, allowedMinutes: 60, answered: ans, total: 50 }).counts;
  const el = (c, r) => R.paperRewardEligibility({ attempt: { status: "submitted", sgtDay: SAT, counts: c }, rule: r }).eligible;
  assert.equal(el(counts(10, 0), rule()), false, "blank hand-in earns nothing with the check on");
  assert.equal(el(counts(1800, 0), rule()), true);
  assert.equal(el(counts(60, 40), rule()), true);
  assert.equal(el(counts(10, 0), rule({ paperCheckOff: true })), true, "check off: any submitted paper qualifies");
  assert.equal(R.paperRewardEligibility({ attempt: { status: "in_progress", sgtDay: SAT, counts: true }, rule: rule({ paperCheckOff: true }) }).eligible, false, "check off never rewards an unsubmitted paper");
});
ok("amounts: separate from daily/weekly, credits or SGD at the credit value, nothing by default", () => {
  assert.equal(R.paperSubjectCredits(rule(), "English"), 5);
  assert.equal(R.paperSubjectCredits(rule({ paperUnit: "sgd", paperAmounts: { English: 3 }, sgdPerCredit: 0.5 }), "English"), 6);
  assert.equal(R.paperSubjectCredits(rule({ paperUnit: "sgd", paperAmounts: { English: 3 }, sgdPerCredit: 0 }), "English"), 0, "no rate = no guess");
  assert.equal(R.paperSubjectCredits(rule({ weeklyAmounts: { English: 9 }, paperAmounts: {} }), "English"), 0, "the weekly-review amount is NOT used");
  assert.equal(R.paperSubjectCredits(rule({ enabled: false }), "English"), 0);
  assert.equal(R.paperSubjectCredits(R.DEFAULT_RULES, "English"), 0);
  assert.equal(R.DEFAULT_RULES.paperCheckOff, false);
});
ok("parent settings: paper fields validate, default to nothing, merge across two parents' edits, and audit lines say what changed", () => {
  const base = CS.DEFAULT_SETTING;
  const e1 = CS.applySettingEdit(base, { enabled: true, paperUnit: "credits", paperAmounts: { English: 4 } }, FRI);
  assert.equal(e1.setting.rule.paperAmounts.English, 4); assert.equal(e1.setting.rule.paperCheckOff, false);
  const e2 = CS.applySettingEdit(e1.setting, { paperCheckOff: true }, FRI);
  assert.equal(e2.setting.rule.paperAmounts.English, 4, "another field of the same rule is kept");
  assert.equal(e2.setting.rule.paperCheckOff, true);
  const lines = CS.diffSettings(e1.setting, e2.setting);
  assert.deepEqual(lines, ["the Saturday paper effort check turned off"]);
  assert.ok(CS.diffSettings(base, e1.setting).some((l) => /English Saturday paper reward to 4 credits/.test(l)));
  assert.ok(CS.applySettingEdit(base, { paperAmounts: { English: -1 } }, FRI).error);
  assert.ok(CS.applySettingEdit(base, { paperAmounts: { English: 1.5 } }, FRI).error, "whole credits only");
  const plain = CS.applySettingEdit(base, { enabled: true, weeklyAmounts: { English: 2 } }, FRI);
  assert.equal(R.paperSubjectCredits(plain.setting.rule, "English"), 0, "a settings edit that never mentions papers pays no paper reward");
});
ok("settings rows: paper columns are written only when the mock-exam flag is on, so the flag-off save is exactly the old row", () => {
  const s = CS.applySettingEdit(CS.DEFAULT_SETTING, { paperAmounts: { English: 2 } }, FRI).setting;
  const off = CS.settingToRow("c", s, "p", "t"), on = CS.settingToRow("c", s, "p", "t", { paper: true });
  assert.ok(!("paper_unit" in off) && !("paper_amounts" in off) && !("paper_check_off" in off));
  assert.deepEqual([on.paper_unit, on.paper_amounts.English, on.paper_check_off], ["credits", 2, false]);
  const back = CS.settingFromRow({ effective_from: "2026-11-22", enabled: true, sgd_per_credit: 0.5, daily_tiers: [], weekly_unit: "credits", weekly_amounts: {}, daily_target: {}, homework_per_mistake: 3, paper_unit: "sgd", paper_amounts: { English: 2 }, paper_check_off: true });
  assert.deepEqual([back.rule.paperUnit, back.rule.paperAmounts.English, back.rule.paperCheckOff], ["sgd", 2, true]);
  assert.deepEqual([CS.settingFromRow({ effective_from: "x" }).rule.paperCheckOff, CS.settingFromRow(null).rule.paperAmounts], [false, {}], "old rows (no paper columns) read as nothing");
  const ss = fs.readFileSync(path.join(ROOT, "src/lib/rewardsServer.js"), "utf8");
  assert.ok(/MOCK_EXAMS_ENABLED \? ",paper_unit,paper_amounts,paper_check_off" : ""/.test(ss));
});
ok("reward service: Saturday only, needs REWARDS, pending credit gated on that Saturday, idempotent per subject per Saturday, never throws", () => {
  const ss = fs.readFileSync(path.join(ROOT, "src/lib/rewardsServer.js"), "utf8");
  const f = ss.slice(ss.indexOf("export async function awardPaperReward"));
  assert.ok(/if \(!out\.saturday\) return out/.test(f) && /if \(!REWARDS\)/.test(f));
  assert.ok(/p_kind: "paper", p_period: day, p_subject: subject/.test(f) && /p_gate_day: day/.test(f) && /award_sticker/.test(f) && /finalizeCredits/.test(f));
  assert.ok(/catch \{ return/.test(f));
  assert.ok(!/record_payout|reward_payouts/.test(f), "the app never moves money");
});

// ── migration (phase 2) ──
ok("paper_rewards migration: new file, additive, guarded, 'paper' kind only widens, old migrations untouched", () => {
  const dir = path.join(ROOT, "supabase/migrations");
  const files = fs.readdirSync(dir).sort();
  assert.equal(files[files.length - 1], "20261130000000_paper_rewards.sql");
  const raw = fs.readFileSync(path.join(dir, "20261130000000_paper_rewards.sql"), "utf8");
  assert.ok(/apply by hand|applied by hand/i.test(raw.split("\n").slice(0, 6).join("\n")));
  const sql = raw.replace(/--.*$/gm, "");
  assert.ok(!/drop\s+table|delete\s+from|truncate|update\s+public\./i.test(sql));
  assert.ok(/add column if not exists paper_unit/.test(sql) && /add column if not exists paper_amounts/.test(sql) && /add column if not exists paper_check_off boolean not null default false/.test(sql));
  assert.ok(/check \(kind in \('daily', 'weekly', 'paper'\)\)/.test(sql) && /stickers_kind_chk/.test(sql) && /reward_credits_kind_chk/.test(sql));
  assert.ok(/create or replace function public\.award_credit\(\s*p_parent uuid, p_child uuid, p_kind text, p_period date, p_subject text,\s*p_credits int, p_rate numeric, p_score_pct int, p_effective date, p_gate_day date\s*\)/.test(sql), "10-argument signature unchanged");
  assert.ok(/grant execute on function public\.award_credit\(uuid, uuid, text, date, text, int, numeric, int, date, date\) to service_role/.test(sql));
  assert.ok(/grant execute on function public\.award_sticker\(uuid, text, date\) to service_role/.test(sql));
});
ok("all of this stays behind the flag, default OFF, and the student route 404s without it", () => {
  const cfg = fs.readFileSync(path.join(ROOT, "src/lib/supabase/config.js"), "utf8");
  assert.ok(/MOCK_EXAMS_ENABLED\s*=\s*process\.env\.NEXT_PUBLIC_MOCK_EXAMS_ENABLED === "true"/.test(cfg));
  const pr = fs.readFileSync(path.join(ROOT, "src/components/ParentRewards.js"), "utf8");
  assert.ok(/\{MOCK_EXAMS_ENABLED && \(/.test(pr), "the paper reward settings only render with the flag on");
});

console.log(`\n${n} checks run${process.exitCode ? ", SOME FAILED" : ", all passed"}`);
