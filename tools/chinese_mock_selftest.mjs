// Self-test for Chinese mock exams (issue #146). Run: node tools/chinese_mock_selftest.mjs   (exit 1 on any failure)
// Real server modules through tools/exam_loader.mjs. The flag-ON checks run in a child process because the flag is read once at import.
// No network, no database.
import { register } from "node:module";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SELF = fileURLToPath(import.meta.url);
register("./exam_loader.mjs", import.meta.url);
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/papers/manifest.json"), "utf8"));
const sidecar = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/papers/zh_marks.json"), "utf8"));
const Z = await import("../src/lib/zhMock.js");
const E = await import("../src/lib/examEngine.js");
const C = await import("../src/lib/supabase/config.js");
const S = await import("../src/lib/examServer.js");

// ── child mode: flag ON, print facts as JSON ──
if (process.argv.includes("--probe")) {
  const list = S.listPapers();
  const zh = list.filter((p) => p.subject === "Chinese");
  const out = { flag: C.CHINESE_MOCK_ENABLED, english: list.filter((p) => p.subject === "English").length, zh: zh.map((p) => ({ id: p.id, marks: p.marks, notes: p.notes, label: p.label })), probes: {} };
  for (const p of zh) {
    const pub = S.publicPaper(p.id);
    const st = Z.chineseMockStatus(manifest.papers).find((x) => x.row.id === p.id);
    // all correct on every auto-graded item; every open item answered with its own model answer text
    const answers = {};
    for (const sec of st.plan) for (const it of sec.items) {
      if (sec.type === "VocabMCQ") answers[it.id] = { val: it.answer };
      else if (sec.type === "VocabCloze") it.blanks.forEach((b) => { answers[it.id + "_" + b.num] = { val: b.answer }; });
      else for (const q of it.questions) answers[q.id] = q.format === "mcq" ? { val: q.answer } : { val: q.answer };
    }
    const g = S.gradeSubmission(p.id, answers);
    const blank = S.gradeSubmission(p.id, {});
    out.probes[p.id] = {
      publicJson: JSON.stringify(pub), questionCount: pub.questionCount,
      secs: pub.sections.map((s) => s.label),
      total: g.total, score: g.score, autoScore: g.autoScore, autoTotal: g.autoTotal, pending: g.pending, provisionalScore: g.provisionalScore,
      openProvisional: g.rows.filter((r) => r.correct === null).map((r) => r.provisional),
      markSum: g.rows.reduce((n, r) => n + (r.marks || 0), 0),
      blankScore: blank.score, blankAutoTotal: blank.autoTotal,
      answerTexts: Object.values(answers).map((a) => a.val).filter((v) => typeof v === "string"),
      notebook: S.notebookRows(p.id, g, { studentId: "s", attemptId: "a", grade: "P3", nowIso: "2026-01-01T00:00:00Z" }).rows.length,
      trials: (S.mockTrialCandidates(p.id, g) || []).length,
    };
  }
  console.log("PROBE_JSON " + JSON.stringify(out));
  process.exit(0);
}

let n = 0;
const ok = (name, fn) => { try { fn(); n++; console.log("PASS", name); } catch (e) { console.error("FAIL", name, "\n ", e.message); process.exitCode = 1; } };

ok("flag NEXT_PUBLIC_CHINESE_MOCK_ENABLED defaults off and is documented", () => {
  assert.equal(C.CHINESE_MOCK_ENABLED, false);
  assert.match(fs.readFileSync(path.join(ROOT, "src/lib/supabase/config.js"), "utf8"), /CHINESE_MOCK_ENABLED = process\.env\.NEXT_PUBLIC_CHINESE_MOCK_ENABLED === "true"/);
  assert.match(fs.readFileSync(path.join(ROOT, ".env.example"), "utf8"), /^NEXT_PUBLIC_CHINESE_MOCK_ENABLED=$/m);
});

ok("selftest is on the package.json selftest line, after zh_wa1_selftest.js", () => {
  const line = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).scripts.selftest;
  assert.ok(line.indexOf("e2e_guard_selftest.cjs") < line.indexOf("zh_wa1_selftest.js"));
  assert.ok(line.indexOf("zh_wa1_selftest.js") < line.indexOf("chinese_mock_selftest.mjs"));
});

const status = Z.chineseMockStatus(manifest.papers);
const launchable = status.filter((s) => s.ok);
const hidden = status.filter((s) => !s.ok);

ok("every Chinese manifest row is classified; launchable ones are exactly those in the sidecar", () => {
  assert.equal(status.length, manifest.papers.filter((p) => p.subject === "Chinese").length);
  assert.ok(launchable.length >= 1, "at least one launchable paper");
  assert.deepEqual(launchable.map((s) => s.row.id).sort(), Object.keys(sidecar.papers).sort());
});

ok("launchable papers: marks present on every item and sum to the sourced total (also per section)", () => {
  for (const s of launchable) {
    const e = s.entry;
    assert.ok(e.totalSource && e.totalSource.length > 10, "total has a source");
    const ids = [];
    for (const r of s.paper.questions) { if (Array.isArray(r.questions)) r.questions.forEach((q) => ids.push(q.id)); else ids.push(r.id); }
    const c = Z.checkMarks(e, ids);
    assert.deepEqual(c.errors, []);
    assert.equal(Object.values(c.marks).reduce((a, b) => a + b, 0), e.total);
    for (const sec of e.sections) assert.equal(Object.values(sec.marks).reduce((a, b) => a + b, 0), sec.sectionTotal);
    assert.equal(s.row.marks, e.total, "manifest total agrees");
  }
});

ok("inferred marks are labelled (every section has a known basis; equal-split sections are marked inferred)", () => {
  for (const s of launchable) for (const sec of s.entry.sections) {
    assert.ok(Z.MARK_BASES.includes(sec.basis), sec.topic);
    const vals = Object.values(sec.marks);
    if (sec.basis === "printed") continue;
    assert.ok(vals.every((v) => v === vals[0]), sec.topic + ": inferred marks must be an equal split");
  }
  assert.ok(launchable.some((s) => s.inferred));
});

ok("checkMarks rejects bad sidecars (no invented totals)", () => {
  const e = launchable[0].entry, ids = Object.values(e.sections).flatMap((s) => Object.keys(s.marks));
  const bump = JSON.parse(JSON.stringify(e)); bump.total += 1;
  assert.ok(Z.checkMarks(bump, ids).errors.length);
  const noSrc = JSON.parse(JSON.stringify(e)); delete noSrc.totalSource;
  assert.ok(Z.checkMarks(noSrc, ids).errors.length);
  assert.ok(Z.checkMarks(e, [...ids, "extra_item"]).errors.length);
  assert.ok(Z.checkMarks(null, ids).errors.length);
});

ok("papers without determinable marks are excluded, each with a reason", () => {
  assert.ok(hidden.length > 0);
  for (const h of hidden) { assert.equal(h.ok, false); assert.ok(h.reason); assert.ok(!sidecar.papers[h.row.id]); }
});

ok("flag OFF: catalogue has no Chinese paper and English still lists", () => {
  const list = S.listPapers();
  assert.ok(list.every((p) => p.subject === "English"));
  assert.ok(list.length > 0);
  assert.equal(S.publicPaper(launchable[0].row.id), null);
  assert.equal(S.paperMeta(launchable[0].row.id), null);
});

ok("English isFullPaper rule is unchanged (Chinese rows still fail it)", () => {
  for (const s of launchable) assert.equal(E.isFullPaper(s.row), false);
});

const run = spawnSync(process.execPath, [SELF, "--probe"], { env: { ...process.env, NEXT_PUBLIC_CHINESE_MOCK_ENABLED: "true" }, encoding: "utf8" });
const line = (run.stdout || "").split("\n").find((l) => l.startsWith("PROBE_JSON "));
let P = null;
ok("flag ON child process runs", () => { assert.ok(line, (run.stderr || "").slice(0, 400)); P = JSON.parse(line.slice(11)); assert.equal(P.flag, true); });

if (P) {
  ok("flag ON: Chinese papers listed, with marks, Chinese label and the inferred-marks note; English count unchanged", () => {
    const offEnglish = S.listPapers().length;
    assert.equal(P.english, offEnglish);
    assert.deepEqual(P.zh.map((z) => z.id).sort(), launchable.map((s) => s.row.id).sort());
    for (const z of P.zh) { assert.equal(z.marks, sidecar.papers[z.id].total); assert.match(z.label, /Chinese/); assert.ok(z.notes.some((t) => /worked out from the section totals/.test(t))); }
  });
  ok("flag ON: the public paper never carries answers, solutions, pinyin or the model answers", () => {
    for (const [id, pr] of Object.entries(P.probes)) {
      assert.ok(!/"(answer|answers|solution|explanation|pinyin|meaning|acceptableAnswers)"/.test(pr.publicJson), id);
      const plan = launchable.find((s) => s.row.id === id).plan;
      // an answer that is quoted from the reading passage is legitimately visible there; every other model answer must be absent
      for (const sec of plan) for (const it of sec.items) for (const q of it.questions || []) if (typeof q.answer === "string" && q.answer.length >= 4 && !(it.passage || "").includes(q.answer)) assert.ok(!pr.publicJson.includes(q.answer), id + " leaks " + q.id);
    }
  });
  ok("flag ON: every section is shown with its Chinese label and every item is listed once", () => {
    for (const [id, pr] of Object.entries(P.probes)) {
      assert.ok(pr.secs.every((l) => /[一-鿿]/.test(l)), id);
      assert.equal(pr.questionCount, launchable.find((s) => s.row.id === id).paper.questions.reduce((a, r) => a + (Array.isArray(r.questions) ? r.questions.length : 1), 0));
    }
  });
  ok("flag ON: grading = objective items from the paper's key; open items go to the parent, never provisionally marked", () => {
    for (const [id, pr] of Object.entries(P.probes)) {
      const e = sidecar.papers[id];
      assert.equal(pr.markSum, e.total);
      assert.equal(pr.autoScore, pr.autoTotal, "all-correct objective answers score full");
      assert.ok(pr.pending > 0 && pr.autoTotal < e.total);
      assert.ok(pr.openProvisional.length > 0 && pr.openProvisional.every((x) => x === null), "no provisional mark on Chinese open items");
      assert.equal(pr.provisionalScore, 0);
      assert.equal(pr.score, pr.autoScore);
      assert.equal(pr.blankScore, 0);
      assert.equal(pr.blankAutoTotal, pr.autoTotal, "a blank paper is wrong on every objective item");
    }
  });
  ok("flag ON: no English notebook rows or mastery trials are written for Chinese papers", () => {
    for (const pr of Object.values(P.probes)) { assert.equal(pr.notebook, 0); assert.equal(pr.trials, 0); }
  });
}

ok("PaperExam section tabs use a unique key (Chinese papers repeat section types)", () => {
  const src = fs.readFileSync(path.join(ROOT, "src/components/PaperExam.js"), "utf8");
  assert.ok(!/key=\{s\.type\}/.test(src), "tab key must not be s.type");
  assert.ok(/key=\{'sec' \+ i\}/.test(src));
});

{
  const { combineMarks } = await import("../src/lib/examEngine.js");
  ok("partial 1 of 2 adds 1, total adds 2", () => {
    const c = combineMarks({ autoScore: 10, autoTotal: 20, openMarks: [false, true, false], openSections: ["C", "C", "C"], openWeights: [2, 2, 2], openAwarded: [1, null, null], sections: [] });
    assert.equal(c.score, 10 + 1 + 2 + 0); assert.equal(c.total, 20 + 6); assert.equal(c.pending, 0);
  });
  ok("no openAwarded behaves as before", () => {
    const c = combineMarks({ autoScore: 0, autoTotal: 0, openMarks: [true, false, null], openSections: ["C", "C", "C"], openWeights: [2, 2, 2] });
    assert.equal(c.score, 2); assert.equal(c.total, 4); assert.equal(c.pending, 1);
  });
  ok("partial-marks migration is additive only", () => {
    const sql = fs.readFileSync(path.join(ROOT, "supabase/migrations/20261211000000_exam_parent_partial_marks.sql"), "utf8");
    assert.ok(!/\bdrop\s+(table|column)|\bdelete\b|\btruncate\b/i.test(sql)); assert.ok(/add column if not exists parent_marks/.test(sql));
  });
}

ok("no pictographic characters or Korean in the files this feature adds", () => {
  for (const f of ["src/lib/zhMock.js", "src/data/papers/zh_marks.json", "tools/chinese_mock_selftest.mjs"]) {
    const t = fs.readFileSync(path.join(ROOT, f), "utf8");
    assert.ok(!/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{AC00}-\u{D7AF}\u{1100}-\u{11FF}]/u.test(t), f);
  }
});

console.log(`\n${n} passed${process.exitCode ? ", FAILURES above" : ", 0 failures"}`);
console.log("Hidden Chinese papers (no sourced per-question marks):", hidden.length);
