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
ok("autosave needs no new migration: latest migration is still exam_attempts", () => {
  const files = fs.readdirSync(path.join(ROOT, "supabase/migrations")).sort();
  assert.equal(files[files.length - 1], "20261129000000_exam_attempts.sql");
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
  const files = fs.readdirSync(path.join(ROOT, "supabase/migrations")).sort();
  assert.equal(files[files.length - 1], "20261129000000_exam_attempts.sql");
});
console.log(`\n${n} checks run${process.exitCode ? ", SOME FAILED" : ", all passed"}`);
