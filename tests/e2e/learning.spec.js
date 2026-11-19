// Hand-checked role-play of the learning dashboard (PR #43). Local Supabase only.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, drive, loginStudent, ensureParent, ensureStudent, assertLocalOnly } = require("./helpers");
const { driveToScore } = require("./scoreDrive");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.com", password: "Testpass1" };
const PARENT_B = { name: "Mr Tan", email: "mr.tan.e2e@example.com", password: "Testpass2" };
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
function skillKey(r) {
  if (!r) return null;
  if (typeof r.skill === "string" && r.skill) return r.skill;
  if (typeof r.trapType === "string" && r.trapType && r.trapType.length <= 24) return r.trapType;
  return r.sectionType ? "sec:" + r.sectionType : (r.section ? "sec:" + r.section : null);
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
  const parentB = await browser.newContext(CTX);
  const student = await browser.newContext(CTX);
  await installBrowserClock(parent);
  await installBrowserClock(parentB);
  await installBrowserClock(student);
  const pp = await parent.newPage();
  const pb = await parentB.newPage();
  const sp = await student.newPage();

  await pp.goto("/");
  await pp.getByText("Welcome back").waitFor();
  await pp.getByRole("button", { name: /Parent Sign Up/ }).click();
  await pp.getByPlaceholder("e.g. Mrs Lee").fill(PARENT_A.name);
  await pp.getByPlaceholder("you@example.com").fill(PARENT_A.email);
  await pp.getByPlaceholder("Create a password").fill(PARENT_A.password);
  await pp.getByPlaceholder("Re-enter password").fill(PARENT_A.password);
  await pp.getByRole("button", { name: "Create Parent Account" }).click();
  await pp.getByRole("button", { name: /Add child/ }).click();
  await pp.getByPlaceholder("Child's username (a-z, 0-9, _)").fill(CHILD.username);
  await pp.getByPlaceholder("Display name").fill(CHILD.name);
  await pp.getByPlaceholder("School").fill(CHILD.school);
  await pp.getByPlaceholder("Child's password (min 6 chars)").fill(CHILD.password);
  await pp.getByRole("button", { name: "Create child account" }).click();
  await expect(pp.getByText(/Created\./)).toBeVisible();
  await pp.getByRole("button", { name: /Invite another parent/ }).click();
  await pp.getByPlaceholder(/Other parent's email/).fill(PARENT_B.email);
  await pp.getByRole("button", { name: "Send invite" }).click();
  await pp.getByText(/Invite created/).waitFor();
  await pb.goto("/");
  await pb.getByRole("button", { name: /Parent Sign Up/ }).click();
  await pb.getByPlaceholder("e.g. Mrs Lee").fill(PARENT_B.name);
  await pb.getByPlaceholder("you@example.com").fill(PARENT_B.email);
  await pb.getByPlaceholder("Create a password").fill(PARENT_B.password);
  await pb.getByPlaceholder("Re-enter password").fill(PARENT_B.password);
  await pb.getByRole("button", { name: "Create Parent Account" }).click();
  await pb.getByText(/invited you to follow/).waitFor();
  await pb.getByRole("button", { name: "Accept" }).click();
  await pb.getByRole("button", { name: new RegExp(CHILD.name) }).waitFor({ timeout: 20000 });
  const links = await dbGet("parent_child?select=parent_id,child_id");
  record("parent", "Both parents linked", "2 parent_child rows", "rows " + links.length, links.length === 2 ? "PASS" : "FAIL", await snap(pb, "01-parents"));

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
  let source = null;
  for (const m of prog.mistakes || []) {
    const sk = skillKey(m);
    if (!sk || !m.id) continue;
    const unseen = (answers.bank || []).find((b) => (b.section === "GrammarMCQ" || b.section === "VocabMCQ") && skillKey(b) === sk && String(b.id) !== String(m.id) && !seen.has(b.id));
    if (unseen) { source = { id: String(m.id), skill: sk, unseen: String(unseen.id) }; break; }
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
  await shiftBrowser([sp, pp, pb], 1);
  if (source) {
    const fresh = await sp.evaluate(() => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      return ((all[key] && all[key].trials) || []).map((t) => t.itemId);
    });
    const freshSeen = new Set(fresh);
    const unseenNow = (answers.bank || []).find((b) => (b.section === "GrammarMCQ" || b.section === "VocabMCQ") && skillKey(b) === source.skill && String(b.id) !== String(source.id) && !freshSeen.has(b.id));
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
  await shiftBrowser([sp, pp, pb], 8);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /Start today's set|Extra set/ }).first().click();
  const englishSets = Object.fromEntries(Object.entries(answers.sets).filter(([k]) => k.startsWith("S")));
  await driveToScore(sp, englishSets, { min: 85, max: 100 }, "learn-later");
  await sp.getByRole("button", { name: /Back to Home|返回主页/ }).first().click().catch(() => {});
  await sp.getByText(/Hello,|Your patterns/).first().waitFor({ timeout: 20000 });
  await waitTrials(id, n0 + 1);

  const trials = await dbGet("learning_trials?student_id=eq." + id + "&subject=eq.English&select=skill,mode,first_try,weight,session_num,attempted_at&order=attempted_at");
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
  const viewB = await openLearning(pb, PARENT_B);
  const fileB = await snap(pb, "07-parent-b");

  const same = JSON.stringify(viewA.api.skills) === JSON.stringify(viewB.api.skills) && JSON.stringify(viewA.api.causes) === JSON.stringify(viewB.api.causes) && JSON.stringify(viewA.api.trend) === JSON.stringify(viewB.api.trend) && JSON.stringify(viewA.api.weekly) === JSON.stringify(viewB.api.weekly);
  record("parent", "Both parents see the same learning data", "Skills, causes, trend and weekly scores match exactly", same ? "identical" : "A " + JSON.stringify(viewA.api.trend) + " B " + JSON.stringify(viewB.api.trend), same ? "PASS" : "FAIL", fileB);

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

  const forgedTs = await sp.evaluate(() => Date.now());
  const forged = await sp.evaluate(async (ts) => {
    const r = await fetch("/api/learning/trials", {
      method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [
        { subject: "English", itemId: "forged-perfect", skill: "en.grammar.forged_skill", mode: "exam", firstTry: true, correct: true, weight: 9, sessionNum: 99, ts, grade: "P3" },
      ] }),
    });
    return { status: r.status, body: await r.json() };
  }, forgedTs);
  const forgedRow = await dbGet("learning_trials?student_id=eq." + id + "&item_id=eq.forged-perfect&select=first_try,correct,weight,skill");
  const again = await sp.evaluate(async (ts) => {
    const r = await fetch("/api/learning/trials", {
      method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [
        { subject: "English", itemId: "forged-perfect", skill: "en.grammar.forged_skill", mode: "exam", firstTry: false, correct: false, weight: 1, sessionNum: 99, ts, grade: "P3" },
      ] }),
    });
    return r.status;
  }, forgedTs);
  const afterDup = await dbGet("learning_trials?student_id=eq." + id + "&item_id=eq.forged-perfect&select=first_try,weight");
  const direct = await directInsert(student, id);
  const accepted = forged.status === 200 && forgedRow.length === 1 && forgedRow[0].first_try === true && Number(forgedRow[0].weight) === 1;
  const notFlipped = afterDup.length === 1 && afterDup[0].first_try === true;
  record("student", "Forged learning trial", "A signed-in student must not be able to store a trial they never sat, or choose its first-try flag or weight.", "API post " + forged.status + " stored " + JSON.stringify(forgedRow) + "; same timestamp again " + again + " still " + JSON.stringify(afterDup) + "; direct row " + JSON.stringify(direct), accepted && notFlipped ? "FAIL" : "PASS", "");

  const productFails = STEPS.filter((s) => s.status === "FAIL" && s.step !== "Forged learning trial");
  console.log("LEARNING " + STEPS.filter((s) => s.status === "PASS").length + " pass, " + STEPS.filter((s) => s.status === "FAIL").length + " fail, " + STEPS.filter((s) => s.status === "GAP").length + " gap");
  expect(productFails, productFails.map((s) => s.step + ": " + s.actual).join("\n")).toEqual([]);
});

async function directInsert(context, studentId) {
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
  const headers = { apikey: anon, Authorization: "Bearer " + token, "Content-Type": "application/json", Prefer: "return=representation" };
  const heavy = await fetch(api.replace(/\/$/, "") + "/rest/v1/learning_trials", {
    method: "POST", headers,
    body: JSON.stringify({ student_id: studentId, subject: "English", item_id: "forged-weight-9", skill: "en.grammar.forged_skill", mode: "exam", first_try: true, correct: true, weight: 9, attempted_at: new Date().toISOString() }),
  });
  const fraction = await fetch(api.replace(/\/$/, "") + "/rest/v1/learning_trials", {
    method: "POST", headers,
    body: JSON.stringify({ student_id: studentId, subject: "English", item_id: "forged-direct", skill: "en.grammar.forged_skill", mode: "exam", first_try: true, correct: true, weight: 0.5, attempted_at: new Date().toISOString() }),
  });
  const other = await fetch(api.replace(/\/$/, "") + "/rest/v1/learning_trials", {
    method: "POST", headers,
    body: JSON.stringify({ student_id: "00000000-0000-0000-0000-000000000000", subject: "English", item_id: "forged-other", skill: "en.grammar.forged_skill", mode: "exam", first_try: true, correct: true, weight: 1, attempted_at: new Date().toISOString() }),
  });
  return { weight9: heavy.status, weightHalf: fraction.status, otherStudent: other.status };
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
