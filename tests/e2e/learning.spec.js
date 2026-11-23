// Hand-checked role-play of the learning dashboard (PR #43). Local Supabase only.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, drive, loginStudent, ensureParent, ensureStudent, assertLocalOnly, setupFamily } = require("./helpers");
const { driveToScore } = require("./scoreDrive");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.test", password: "Testpass1" };
const CHILD = { username: "amir_e2e", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const STEPS = [];

function record(role, step, expected, actual, status, screenshot) {
  STEPS.push({ role, step, expected, actual, status, screenshot: screenshot || "" });
  fs.mkdirSync("tests/e2e/.state", { recursive: true });
  fs.writeFileSync("tests/e2e/.state/learning-steps.json", JSON.stringify(STEPS, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${actual}`);
}
async function snap(page, name) {
  try { return await shot(page, "learn-" + name); } catch { return ""; }
}
function setDay(days) {
  fs.writeFileSync(process.env.E2E_DAY_SHIFT_FILE, String(days));
  execFileSync("sudo", ["docker", "exec", process.env.E2E_DB_CONTAINER, "psql", "-U", "postgres", "-c", "update public.e2e_clock set shift_days = " + Number(days)], { stdio: "inherit" });
}
async function shiftBrowser(pages, days) {
  for (const page of pages) await page.evaluate((d) => sessionStorage.setItem("e2e-shift-days", String(d)), days).catch(() => {});
}
async function installBrowserClock(context) {
  await context.addInitScript(() => {
    const Real = Date;
    const shiftMs = () => Number(sessionStorage.getItem("e2e-shift-days") || "0") * 86400000;
    class Shifted extends Real {
      constructor(...args) { if (args.length === 0) super(Real.now() + shiftMs()); else super(...args); }
      static now() { return Real.now() + shiftMs(); }
    }
    Shifted.parse = Real.parse;
    Shifted.UTC = Real.UTC;
    window.Date = Shifted;
  });
}
function rateOf(rows) {
  let tot = 0, ok = 0;
  for (const r of rows) {
    const w = Number(r.weight) > 0 ? Math.min(1, Number(r.weight)) : 1;
    tot += w;
    if (r.first_try === true || r.firstTry === true) ok += w;
  }
  return tot ? Math.round(ok / tot * 100) : null;
}
async function childId() {
  const rows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id");
  return rows[0].id;
}
async function waitTrials(id, min) {
  for (let i = 0; i < 30; i++) {
    const rows = await dbGet("learning_trials?student_id=eq." + id + "&select=id");
    if (rows.length >= min) return rows.length;
    await new Promise((r) => setTimeout(r, 500));
  }
  const rows = await dbGet("learning_trials?student_id=eq." + id + "&select=id");
  return rows.length;
}

test("learning dashboard matches what was played @learning", async ({ browser }) => {
  test.setTimeout(40 * 60 * 1000);
  assertLocalOnly();
  const answers = JSON.parse(fs.readFileSync("tests/e2e/fixtures/answers.json", "utf8"));
  const parent = await browser.newContext(CTX);
  const student = await browser.newContext(CTX);
  await installBrowserClock(parent);
  await installBrowserClock(student);
  const pp = await parent.newPage();
  const sp = await student.newPage();

  // Current flow: Sign up -> parent account -> email confirm (mocked / skipped on the local project) -> Add your child (login ID + 4-picture code) -> auto-linked.
  await setupFamily(pp, { parent: PARENT_A, child: CHILD });
  await shot(pp, "01-parent-and-child");
  const links = await dbGet("parent_child?select=parent_id,child_id");
  expect(links.length).toBe(1);
  record("parent", "Parent signed up and child linked", "1 parent_child row", "rows " + links.length, links.length === 1 ? "PASS" : "FAIL", await snap(pp, "01-parents"));

  const id = await childId();
  await loginStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: "Start today's set" }).first().click();
  await driveToScore(sp, answers.sets.S01, { min: 60, max: 75 }, "learn-set");
  await sp.getByRole("button", { name: /Back to Home|返回主页/ }).first().click();
  await sp.getByText(/Hello,/).waitFor();
  const n0 = await waitTrials(id, 1);
  const day0 = await dbGet("learning_trials?student_id=eq." + id + "&subject=eq.English&select=item_id,skill,mode,first_try,correct,weight,session_num,attempted_at&order=attempted_at");
  record("student", "Day 0 English set syncs trials", "Server stores the mastery trials from the signed-in set", n0 + " trials, modes " + [...new Set(day0.map((r) => r.mode))].join(","), n0 > 0 && day0.every((r) => r.mode === "exam") ? "PASS" : "FAIL", await snap(sp, "02-after-set"));

  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  await sp.getByText("Your patterns", { exact: true }).waitFor();
  const causes = ["Didn't know the concept", "Misread the question", "Fell for a trap"];
  let tagged = 0;
  for (let i = 0; i < causes.length; i++) {
    const card = sp.locator("button", { hasText: "cause not picked" }).first();
    if (!(await card.count())) break;
    await card.click();
    await sp.getByRole("button", { name: causes[i] }).first().click();
    tagged++;
  }
  await sp.waitForTimeout(1500);
  const caused = await dbGet("wrong_answers?student_id=eq." + id + "&subject=eq.English&cause=not.is.null&select=cause");
  const causeCounts = {};
  for (const r of caused) causeCounts[r.cause] = (causeCounts[r.cause] || 0) + 1;
  record("student", "English cause labels", "Three different causes are stored", JSON.stringify(causeCounts), tagged === 3 && caused.length >= 3 ? "PASS" : "FAIL", await snap(sp, "03-causes"));

  const prog = await sp.evaluate(() => {
    const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
    const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
    return all[key];
  });
  const seen = new Set((prog.trials || []).map((t) => t.itemId));
  const leafOf = (itemId) => {
    const b = (answers.bank || []).find((x) => x.id === String(itemId));
    return b && b.leaf;
  };
  let source = null;
  for (const m of prog.mistakes || []) {
    const leaf = leafOf(m.id);
    if (!leaf || !m.id) continue;
    const unseen = (answers.bank || []).find((b) => (b.section === "GrammarMCQ" || b.section === "VocabMCQ") && b.leaf === leaf && String(b.id) !== String(m.id) && !seen.has(b.id));
    if (unseen) { source = { id: String(m.id), skill: leaf, unseen: String(unseen.id) }; break; }
  }
  record("student", "A same-skill unseen question exists", "There is a later homework item that can count at half weight", source ? source.id + " -> " + source.unseen + " (" + source.skill + ")" : "none", source ? "PASS" : "FAIL", "");
  if (!source) {
    record("student", "Same-question homework does not raise mastery", "No homework trial for the missed question", "no source mistake", "FAIL", "");
    record("student", "Unseen similar question one day later counts half", "One homework trial at weight 0.5", "no source mistake", "FAIL", "");
  }

  await pp.bringToFront();
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  if (source) {
    const same = await pp.evaluate(async ({ child, qid }) => {
      const r = await fetch("/api/parent/homework", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ child, subject: "English", grade: "P3", sourceQuestionId: qid, questionIds: [qid] }) });
      return r.json();
    }, { child: id, qid: source.id });
    await sp.bringToFront();
    await sp.goto("/");
    await ensureStudent(sp, CHILD.username, CHILD.password);
    await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
    const start = sp.getByRole("button", { name: /Start homework/ });
    await start.waitFor({ timeout: 15000 });
    await start.click();
    await sp.waitForFunction(() => /Submit|提交/.test(document.body.innerText || ""));
    await drive(sp, { label: "same-q", max: 300, done: async () => (await bodyText(sp)).includes("All done for today") });
    await sp.waitForTimeout(1500);
    const sameRows = await dbGet("learning_trials?student_id=eq." + id + "&item_id=eq." + encodeURIComponent(source.id) + "&mode=eq.homework&select=weight,first_try");
    record("student", "Same-question homework does not raise mastery", "No homework trial is stored for " + source.id, "assign " + JSON.stringify(same).slice(0, 80) + "; homework rows " + sameRows.length, same.assigned >= 1 && sameRows.length === 0 ? "PASS" : "FAIL", await snap(sp, "04-same-question"));
  }

  setDay(1);
  await shiftBrowser([sp, pp], 1);
  if (source) {
    const fresh = await sp.evaluate(() => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      return ((all[key] && all[key].trials) || []).map((t) => t.itemId);
    });
    const freshSeen = new Set(fresh);
    const unseenNow = (answers.bank || []).find((b) => (b.section === "GrammarMCQ" || b.section === "VocabMCQ") && b.leaf === source.skill && String(b.id) !== String(source.id) && !freshSeen.has(b.id));
    if (unseenNow) source.unseen = String(unseenNow.id);
    await pp.bringToFront();
    await pp.goto("/");
    await ensureParent(pp, PARENT_A.email, PARENT_A.password);
    const late = await pp.evaluate(async ({ child, sourceId, unseenId }) => {
      const r = await fetch("/api/parent/homework", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ child, subject: "English", grade: "P3", sourceQuestionId: sourceId, questionIds: [unseenId] }) });
      return r.json();
    }, { child: id, sourceId: source.id, unseenId: source.unseen });
    await sp.bringToFront();
    await sp.goto("/");
    await ensureStudent(sp, CHILD.username, CHILD.password);
    await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
    const start = sp.getByRole("button", { name: /Start homework/ });
    await start.waitFor({ timeout: 15000 });
    await start.click();
    await sp.waitForFunction(() => /Submit|提交/.test(document.body.innerText || ""));
    await drive(sp, { label: "half", max: 300, done: async () => (await bodyText(sp)).includes("All done for today") });
    await sp.waitForTimeout(1500);
    const half = await dbGet("learning_trials?student_id=eq." + id + "&item_id=eq." + encodeURIComponent(source.unseen) + "&mode=eq.homework&select=weight,first_try,skill");
    record("student", "Unseen similar question one day later counts half", "One homework trial at weight 0.5", "assign " + (late.assigned) + "; " + JSON.stringify(half), late.assigned >= 1 && half.length === 1 && Number(half[0].weight) === 0.5 ? "PASS" : "FAIL", await snap(sp, "05-half"));
  }

  setDay(8);
  await shiftBrowser([sp, pp], 8);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /Start today's set|Extra set/ }).first().click();
  const englishSets = Object.fromEntries(Object.entries(answers.sets).filter(([k]) => k.startsWith("S")));
  await driveToScore(sp, englishSets, { min: 85, max: 100 }, "learn-later");
  await sp.getByRole("button", { name: /Back to Home|返回主页/ }).first().click().catch(() => {});
  await sp.getByText(/Hello,|Your patterns/).first().waitFor({ timeout: 20000 });
  await waitTrials(id, n0 + 1);

  const paperSes = await sp.evaluate(() => {
    const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
    const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
    return key ? all[key].nextSession : null;
  });
  const paper = answers.pastPapers && answers.pastPapers[String(paperSes)];
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: "More", exact: true }).first().click();
  await sp.getByRole("button", { name: "Extra practice" }).click();
  await sp.getByRole("button", { name: "Past-paper mock" }).click();
  await driveToScore(sp, paper, { min: 100, max: 100 }, "learn-paper");
  await sp.getByRole("button", { name: /Back to Home|返回主页/ }).first().click().catch(() => {});
  await sp.getByText(/Hello,|Your patterns/).first().waitFor({ timeout: 20000 });
  let mockRows = [];
  for (let i = 0; i < 30; i++) {
    mockRows = await dbGet("learning_trials?student_id=eq." + id + "&mode=eq.mock&select=item_id,server_graded,correct,first_try");
    if (mockRows.length > 0) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  const paperIds = new Set(((paper && paper.items) || []).map((it) => it.id));
  const mockOnPaper = mockRows.filter((r) => paperIds.has(r.item_id));
  record("student", "Past-paper mock feeds the Learning tab", "Past-paper answers are stored as server-graded mock trials", mockRows.length + " mock rows, " + mockOnPaper.length + " match this paper, all graded " + (mockRows.length > 0 && mockRows.every((r) => r.server_graded === true)), mockOnPaper.length > 0 && mockRows.every((r) => r.server_graded === true) ? "PASS" : "FAIL", await snap(sp, "05b-past-paper"));

  const trials = await dbGet("learning_trials?student_id=eq." + id + "&subject=eq.English&server_graded=eq.true&select=skill,mode,first_try,weight,session_num,attempted_at&order=attempted_at");
  const wrongs = await dbGet("wrong_answers?student_id=eq." + id + "&subject=eq.English&select=cause,attempted_at");
  const nowMs = Date.now() + 8 * 86400000;
  const hand = handBuild(trials, wrongs, nowMs);

  async function openLearning(page, who) {
    await page.goto("/");
    await ensureParent(page, who.email, who.password);
    await page.getByRole("button", { name: /Learning/ }).click();
    await page.getByTestId("learning-dashboard").waitFor({ timeout: 20000 });
    await page.getByTestId("learning-skill").first().waitFor({ timeout: 20000 });
    const api = await page.evaluate(async (child) => {
      const r = await fetch("/api/parent/learning?child=" + child + "&subject=English", { credentials: "same-origin" });
      return r.json();
    }, id);
    const text = await bodyText(page);
    return { api, text };
  }
  const viewA = await openLearning(pp, PARENT_A);
  const fileA = await snap(pp, "06-parent-a");


  const skillMismatch = [];
  for (const s of hand.skills) {
    const got = (viewA.api.skills || []).find((x) => x.skill === s.skill);
    if (!got || got.now !== s.now || got.weekAgo !== s.weekAgo || got.delta !== s.delta) skillMismatch.push(s.skill + " hand " + s.now + "/" + s.weekAgo + " api " + (got && got.now) + "/" + (got && got.weekAgo));
  }
  const uiHasVs = /vs 7 days ago/.test(viewA.text);
  record("parent A", "Skill mastery now vs 7 days ago", "Every skill percent matches a hand count of the stored trials, and a skill from the first day shows a 7-day comparison", skillMismatch.length ? skillMismatch.slice(0, 4).join("; ") : hand.skills.length + " skills match; vs-7-days on screen " + uiHasVs, skillMismatch.length === 0 && uiHasVs && hand.skills.some((s) => s.weekAgo != null) ? "PASS" : "FAIL", fileA);

  const weekMismatch = (viewA.api.weekly || []).some((w, i) => !hand.weekly[i] || w.week !== hand.weekly[i].week || w.rate !== hand.weekly[i].rate);
  const weekOnScreen = (viewA.api.weekly || []).every((w) => viewA.text.includes(w.rate + "%"));
  record("parent A", "Weekly first-attempt scores", "Exam and mock only, hand-counted, shown on the tab", JSON.stringify(viewA.api.weekly), !weekMismatch && weekOnScreen && viewA.api.weekly.length >= 1 ? "PASS" : "FAIL", fileA);

  const trendOk = viewA.api.trend && viewA.api.trend.word === hand.trend.word && viewA.api.trend.recent === hand.trend.recent && viewA.api.trend.before === hand.trend.before && viewA.text.includes(viewA.api.trend.recent + "%");
  record("parent A", "Improving / flat / slipping", "The word matches the last sessions versus the earlier ones, by hand", JSON.stringify(viewA.api.trend) + " hand " + JSON.stringify(hand.trend), trendOk ? "PASS" : "FAIL", fileA);

  const causeMismatch = [];
  for (const c of hand.causes) {
    const got = (viewA.api.causes || []).find((x) => x.cause === c.cause);
    if (!got || got.total !== c.total) causeMismatch.push(c.cause + " hand " + c.total + " api " + (got && got.total));
  }
  const taggedShown = ["concept_unknown", "misread", "trap"].every((c) => viewA.text.includes(c === "concept_unknown" ? "Didn't know the concept" : c === "misread" ? "Misread the question" : "Fell for a trap") || (viewA.api.causes || []).some((x) => x.cause === c));
  record("parent A", "14-day cause bars", "Counts match the causes Amir picked", causeMismatch.join("; ") || JSON.stringify(viewA.api.causes), causeMismatch.length === 0 && taggedShown && viewA.api.causes.length > 0 ? "PASS" : "FAIL", fileA);

  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  await sp.getByText("Mastery by skill").waitFor({ timeout: 20000 });
  await sp.getByText("Your error patterns").waitFor();
  const mine = await sp.evaluate(async () => {
    const r = await fetch("/api/student/learning?subject=English", { credentials: "same-origin" });
    return r.json();
  });
  const studentText = (await bodyText(sp)).toLowerCase();
  const missingPct = (viewA.api.skills || []).filter((s) => !studentText.includes(String(s.now) + "%")).map((s) => s.skill + " " + s.now);
  const studentSkillsOk = JSON.stringify(mine.skills) === JSON.stringify(viewA.api.skills) && missingPct.length === 0;
  const studentLabels = /mastery by skill/.test(studentText) && /your error patterns/.test(studentText) && /no cause picked yet/.test(studentText) && /didn't know the concept/.test(studentText) && /misread the question/.test(studentText) && /fell for a trap/.test(studentText);
  record("student", "Notebook shows his own mastery and error patterns", "Same skill percents as the parents, and the cause labels he picked", "skills match parents: " + (JSON.stringify(mine.skills) === JSON.stringify(viewA.api.skills)) + (missingPct.length ? "; missing " + missingPct.slice(0, 4).join(", ") : ""), studentSkillsOk && studentLabels ? "PASS" : "FAIL", await snap(sp, "08-student"));
  await sp.locator("button", { hasText: "This Week" }).locator("xpath=..").getByRole("button", { name: "Today", exact: true }).click();
  const todayCard = await sp.getByText("Mastery by skill").count();
  record("student", "Mastery card stays when the mistake list is filtered", "The server-backed card is not inside the mistake list, so a filter does not remove it", todayCard > 0 ? "Mastery by skill still on screen" : "card missing", todayCard > 0 ? "PASS" : "FAIL", await snap(sp, "09-filtered"));

  const dashBefore = await pp.evaluate(async (child) => {
    const r = await fetch("/api/parent/learning?child=" + child + "&subject=English", { credentials: "same-origin" });
    return r.json();
  }, id);

  // ── Forgery checks (PR #43 follow-up). The server must grade the submitted answer itself and own correct / first_try / weight. ──
  const post = (items) => sp.evaluate(async (body) => {
    const r = await fetch("/api/learning/trials", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: body }) });
    let j = null; try { j = await r.json(); } catch {}
    return { status: r.status, body: j };
  }, items);
  const rowsOf = (itemId) => dbGet("learning_trials?student_id=eq." + id + "&item_id=eq." + encodeURIComponent(itemId) + "&select=first_try,correct,weight,skill,mode,server_graded,attempted_at");
  const recorded = new Set((await dbGet("learning_trials?student_id=eq." + id + "&select=item_id")).map((r) => r.item_id));
  const pool = [];
  for (const setId of ["S08", "S07", "S06", "S05", "S04", "S03", "S02"]) {
    for (const it of (answers.sets[setId] && answers.sets[setId].items) || []) if (it.kind === "mcq" && typeof it.answer === "number" && it.n >= 3 && !recorded.has(it.id)) pool.push(it);
  }
  const [fa, fb] = pool;
  const before = (await dbGet("learning_trials?student_id=eq." + id + "&select=id")).length;
  const now = await sp.evaluate(() => Date.now());

  // 1) The old forgery: an id that is not in the bank, with perfect flags and weight 9.
  const f1 = await post([{ subject: "English", itemId: "forged-perfect", skill: "en.grammar.forged_skill", mode: "exam", answer: 0, firstTry: true, correct: true, weight: 9, sessionNum: 99, ts: now, grade: "P3" }]);
  const r1 = await rowsOf("forged-perfect");
  const ok1 = r1.length === 0 && f1.status === 200;
  // Replays of that unseen item, with new timestamps and a tampered weight, still store nothing.
  await post([
    { subject: "English", itemId: "forged-perfect", skill: "en.grammar.forged_skill", mode: "exam", answer: 0, firstTry: true, correct: true, weight: 9, sessionNum: 99, ts: now - 5000, grade: "P3" },
    { subject: "English", itemId: "forged-perfect", skill: "en.grammar.forged_skill", mode: "exam", answer: 1, firstTry: true, correct: true, weight: 0.5, sessionNum: 99, ts: now - 86400000, grade: "P3" },
  ]);
  const directEarly = await directWrites(student, id);
  const dashAfter = await pp.evaluate(async (child) => {
    const r = await fetch("/api/parent/learning?child=" + child + "&subject=English", { credentials: "same-origin" });
    return r.json();
  }, id);
  const dashSame = ["skills", "weekly", "trend", "causes"].every((k) => JSON.stringify(dashBefore[k]) === JSON.stringify(dashAfter[k]));
  const stillNone = (await rowsOf("forged-perfect")).length === 0 && directEarly.forgedRows === 0;
  record("parent", "Forgery does not move the Learning tab", "Unknown items, weight tampering, new timestamps, and direct inserts leave both parents' numbers unchanged", "dashboard identical " + dashSame + "; forged rows still " + (await rowsOf("forged-perfect")).length + "; direct " + JSON.stringify(directEarly), dashSame && stillNone ? "PASS" : "FAIL", await snap(pp, "10-after-forgery"));
  // 2) A real item answered WRONG while the client claims correct, first try and a made-up skill / weight: server stores its own verdict.
  const wrongAns = (fa.answer + 1) % fa.n;
  const f2 = await post([{ subject: "English", itemId: fa.id, skill: "en.grammar.forged_skill", mode: "exam", answer: wrongAns, firstTry: true, correct: true, weight: 0.3, sessionNum: 99, ts: now, grade: "P3" }]);
  const r2 = await rowsOf(fa.id);
  const ok2 = r2.length === 1 && r2[0].correct === false && r2[0].first_try === false && Number(r2[0].weight) === 1 && r2[0].skill !== "en.grammar.forged_skill" && r2[0].server_graded === true;
  // 3) Resubmitting the same item with the right answer and a new timestamp must not add a perfect row or change the stored one.
  const f3 = await post([{ subject: "English", itemId: fa.id, mode: "exam", answer: fa.answer, sessionNum: 99, ts: now - 1000, grade: "P3" }, { subject: "English", itemId: fa.id, mode: "exam", answer: fa.answer, sessionNum: 99, ts: now - 2000, grade: "P3" }]);
  const r3 = await rowsOf(fa.id);
  const ok3 = r3.length === 1 && r3[0].correct === false && r3[0].first_try === false;
  // 4) A real item answered right with weight 9 claimed: stored once, weight 1. A later correct answer in another mode is not first try.
  const f4 = await post([{ subject: "English", itemId: fb.id, mode: "exam", answer: fb.answer, weight: 9, firstTry: true, sessionNum: 99, ts: now, grade: "P3" }]);
  const f4b = await post([{ subject: "English", itemId: fb.id, mode: "mock", answer: fb.answer, sessionNum: 99, ts: now, grade: "P3" }]);
  const r4 = await rowsOf(fb.id);
  const exam4 = r4.find((r) => r.mode === "exam"), mock4 = r4.find((r) => r.mode === "mock");
  const ok4 = !!exam4 && exam4.first_try === true && Number(exam4.weight) === 1 && !!mock4 && mock4.first_try === false;
  // 5) Homework for an item that no parent assigned, with a weight claim: nothing is stored.
  const hwTarget = pool[2] || fb;
  const f5 = await post([{ subject: "English", itemId: hwTarget.id, mode: "homework", answer: hwTarget.answer, weight: 0.5, sessionNum: 99, ts: now, grade: "P3" }]);
  const r5 = (await rowsOf(hwTarget.id)).filter((r) => r.mode === "homework");
  const ok5 = r5.length === 0;
  // 6) The response never carries correctness or the key.
  const leaks = JSON.stringify([f1.body, f2.body, f3.body, f4.body]);
  const ok6 = !/correct|answer|first_try|firstTry|weight/i.test(leaks.replace(/"ok"/g, ""));
  // 7) A client-set timestamp far in the past is not trusted (no backdated rows).
  const f7item = pool[3];
  let ok7 = true, a7 = "no spare item";
  if (f7item) {
    await post([{ subject: "English", itemId: f7item.id, mode: "exam", answer: f7item.answer, sessionNum: 99, ts: now - 30 * 86400000, grade: "P3" }]);
    const r7 = await rowsOf(f7item.id);
    ok7 = r7.length === 1 && Date.parse(r7[0].attempted_at) > Date.now() - 3 * 86400000;
    a7 = JSON.stringify(r7);
  }
  // 8) Direct table writes are blocked for a signed-in student (insert, update, delete).
  const direct = await directWrites(student, id);
  const blocked = (s) => s === 401 || s === 403;
  const ok8 = !direct.skipped && !direct.error && blocked(direct.weight9) && blocked(direct.weightHalf) && blocked(direct.otherStudent) && blocked(direct.update) && blocked(direct.delete) && direct.forgedRows === 0;
  const after = (await dbGet("learning_trials?student_id=eq." + id + "&select=id")).length;
  const added = after - before; // fa wrong, fb exam + mock, and f7item
  const expectAdded = 3 + (f7item ? 1 : 0);

  record("student", "Forged trial: item not in the bank", "Rejected, nothing stored", "status " + f1.status + ", rows " + r1.length, ok1 ? "PASS" : "FAIL", "");
  record("student", "Forged trial: client-sent correct / first_try / weight / skill", "Server grades the answer: a wrong answer is stored wrong, weight 1, server skill", JSON.stringify(r2), ok2 ? "PASS" : "FAIL", "");
  record("student", "Forged trial: resubmitting the same item", "No second row, no perfect row from a new timestamp", "status " + f3.status + ", rows " + JSON.stringify(r3), ok3 ? "PASS" : "FAIL", "");
  record("student", "Forged trial: weight 9 claim and first try", "First try is server-derived; a later mode for the same item is not first try", JSON.stringify(r4), ok4 ? "PASS" : "FAIL", "");
  record("student", "Forged trial: homework nobody assigned", "No row, no mastery", "rows " + r5.length + ", status " + f5.status, ok5 ? "PASS" : "FAIL", "");
  record("student", "Trial response does not leak the key", "Counts only", leaks, ok6 ? "PASS" : "FAIL", "");
  record("student", "Forged trial: backdated timestamp", "Server ignores a timestamp older than 48 hours", a7, ok7 ? "PASS" : "FAIL", "");
  record("student", "Forged trial: direct insert, update, delete on the table", "All blocked for the signed-in student (RLS and grants)", JSON.stringify(direct), ok8 ? "PASS" : "FAIL", "");
  record("student", "Forged trial: only the legitimate rows were added", "Exactly " + expectAdded + " new rows", "added " + added, added === expectAdded ? "PASS" : "FAIL", "");

  console.log("LEARNING " + STEPS.filter((s) => s.status === "PASS").length + " pass, " + STEPS.filter((s) => s.status === "FAIL").length + " fail, " + STEPS.filter((s) => s.status === "GAP").length + " gap");
  const productFails = STEPS.filter((s) => s.status === "FAIL");
  expect(productFails, productFails.map((s) => s.step + ": " + s.actual).join("\n")).toEqual([]);
});

async function directWrites(context, studentId) {
  const anon = process.env.E2E_ANON_KEY;
  const api = process.env.E2E_API_URL;
  if (!anon || !api) return { skipped: "no anon key" };
  const cookies = await context.cookies();
  const parts = cookies.filter((c) => c.name.startsWith("sb-127-auth-token")).sort((a, b) => a.name.localeCompare(b.name));
  const raw = parts.map((c) => c.value).join("");
  let token = "";
  try {
    const decoded = raw.startsWith("base64-") ? Buffer.from(raw.slice(7), "base64url").toString("utf8") : decodeURIComponent(raw);
    const parsed = JSON.parse(decoded);
    token = parsed.access_token || (Array.isArray(parsed) ? parsed[0] : "") || "";
  } catch { return { error: "could not read the session cookie" }; }
  if (!token) return { error: "no access token" };
  const base = api.replace(/\/$/, "") + "/rest/v1/learning_trials";
  const headers = { apikey: anon, Authorization: "Bearer " + token, "Content-Type": "application/json", Prefer: "return=representation" };
  const ins = (item, weight, sid) => fetch(base, { method: "POST", headers, body: JSON.stringify({ student_id: sid, subject: "English", item_id: item, skill: "en.grammar.forged_skill", mode: "exam", first_try: true, correct: true, weight, attempted_at: new Date().toISOString() }) });
  const heavy = await ins("forged-weight-9", 9, studentId);
  const fraction = await ins("forged-direct", 0.5, studentId);
  const other = await ins("forged-other", 1, "00000000-0000-0000-0000-000000000000");
  const upd = await fetch(base + "?student_id=eq." + studentId, { method: "PATCH", headers, body: JSON.stringify({ first_try: true, weight: 1 }) });
  const del = await fetch(base + "?student_id=eq." + studentId, { method: "DELETE", headers });
  const left = await dbGet("learning_trials?item_id=like.forged-*&select=id");
  return { weight9: heavy.status, weightHalf: fraction.status, otherStudent: other.status, update: upd.status, delete: del.status, forgedRows: left.length };
}
function handBuild(trials, wrongs, nowMs) {
  const wOf = (r) => Number(r.weight) > 0 ? Math.min(1, Number(r.weight)) : 1;
  const rate = (rows) => {
    let tot = 0, ok = 0;
    for (const r of rows) { tot += wOf(r); if (r.first_try) ok += wOf(r); }
    return { n: tot, rate: tot ? Math.round(ok / tot * 100) : null };
  };
  const t = (r) => Date.parse(r.attempted_at);
  const cut = nowMs - 7 * 86400000;
  const by = {};
  for (const r of trials) (by[r.skill] = by[r.skill] || []).push(r);
  const skills = Object.keys(by).map((skill) => {
    const cur = rate(by[skill]);
    const prev = rate(by[skill].filter((r) => t(r) <= cut));
    return { skill, now: cur.rate, weekAgo: prev.rate, delta: cur.rate != null && prev.rate != null ? cur.rate - prev.rate : null };
  });
  const sgt = (ms) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(ms));
  const weekStart = (ms) => {
    const d = sgt(ms);
    const dow = new Date(d + "T00:00:00Z").getUTCDay();
    return sgt(Date.parse(d + "T00:00:00Z") - ((dow + 6) % 7) * 86400000 + 8 * 3600000);
  };
  const weeks = {};
  for (const r of trials) {
    if (r.mode !== "exam" && r.mode !== "mock") continue;
    const k = weekStart(t(r));
    (weeks[k] = weeks[k] || []).push(r);
  }
  const weekly = Object.keys(weeks).sort().map((week) => ({ week, rate: rate(weeks[week]).rate }));
  const sess = new Map();
  for (const r of trials) {
    if (r.mode !== "exam" && r.mode !== "mock") continue;
    const key = "s" + r.session_num;
    const e = sess.get(key) || { at: 0, rows: [] };
    e.at = Math.max(e.at, t(r)); e.rows.push(r); sess.set(key, e);
  }
  const ordered = [...sess.values()].sort((a, b) => a.at - b.at);
  let trend;
  if (ordered.length < 2) trend = { word: "not_enough", recent: null, before: null };
  else {
    const half = Math.floor(ordered.length / 2);
    const recentSes = ordered.slice(-4);
    const beforeSes = ordered.slice(-8, -4);
    if (!beforeSes.length) {
      const a = rate(ordered.slice(0, half).flatMap((s) => s.rows)).rate;
      const b = rate(ordered.slice(half).flatMap((s) => s.rows)).rate;
      trend = { word: judge(b, a), recent: b, before: a };
    } else {
      const recent = rate(recentSes.flatMap((s) => s.rows)).rate;
      const before = rate(beforeSes.flatMap((s) => s.rows)).rate;
      trend = { word: judge(recent, before), recent, before };
    }
  }
  const causes = {};
  for (const r of wrongs) {
    const at = t(r);
    const age = nowMs - at;
    if (age < 0 || age > 14 * 86400000) continue;
    const c = r.cause || "untagged";
    const row = causes[c] || (causes[c] = { cause: c, total: 0 });
    row.total += 1;
  }
  return { skills, weekly, trend, causes: Object.values(causes) };
}
function judge(recent, before) {
  if (recent == null || before == null) return "not_enough";
  if (recent - before >= 5) return "improving";
  if (before - recent >= 5) return "slipping";
  return "flat";
}
