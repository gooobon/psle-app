// Role-play of mock-exam server autosave (PR #47). Local Supabase only.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, loginStudent, ensureParent, assertLocalOnly } = require("./helpers");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.com", password: "Testpass1" };
const PARENT_B = { name: "Mr Tan", email: "mr.tan.e2e@example.com", password: "Testpass2" };
const CHILD = { username: "amir_e2e", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const KEY_LEAK = /"(hints|solution|explanation|explain|learning_tip|retry_hint|correctAnswer|modelAnswer)"\s*:/;
const STEPS = [];

function record(role, step, expected, actual, status, screenshot) {
  STEPS.push({ role, step, expected, actual, status, screenshot: screenshot || "" });
  fs.mkdirSync("tests/e2e/.state", { recursive: true });
  fs.writeFileSync("tests/e2e/.state/autosave-steps.json", JSON.stringify(STEPS, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${actual}`);
}
async function snap(page, name) {
  try { return await shot(page, "auto-" + name); } catch { return ""; }
}
function sql(q) {
  execFileSync("sudo", ["docker", "exec", process.env.E2E_DB_CONTAINER, "psql", "-U", "postgres", "-c", q], { stdio: "pipe" });
}
async function childId() {
  const rows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id");
  return rows[0].id;
}
async function openPapers(page) {
  await page.getByRole("button", { name: /English mock papers/ }).click();
  await page.getByText("Mock papers", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Start" }).first().waitFor({ timeout: 30000 });
}
async function answerOne(page) {
  const b = page.locator("button", { hasText: /^B\./ });
  if (await b.count()) { await b.first().click(); return "B"; }
  const input = page.locator("input").first();
  await input.fill("zzzz-saved");
  return "text";
}

test("mock exam autosave role-play @autosave", async ({ browser }) => {
  test.setTimeout(20 * 60 * 1000);
  assertLocalOnly();
  const bodies = [];
  const parent = await browser.newContext(CTX);
  const parentB = await browser.newContext(CTX);
  const student = await browser.newContext(CTX);
  const pp = await parent.newPage();
  const pb = await parentB.newPage();
  const sp = await student.newPage();
  sp.on("response", async (res) => {
    if (!res.url().includes("/api/student/exam")) return;
    bodies.push(await res.text().catch(() => ""));
  });

  await pp.goto("/");
  await pp.getByTestId("login-form").waitFor();
  await pp.getByRole("button", { name: /Parent Sign Up/ }).click();
  await pp.getByPlaceholder("e.g. Mrs Lee").fill(PARENT_A.name);
  await pp.getByPlaceholder("you@example.com").fill(PARENT_A.email);
  await pp.getByPlaceholder("Create a password").fill(PARENT_A.password);
  await pp.getByPlaceholder("Re-enter password").fill(PARENT_A.password);
  await pp.getByRole("button", { name: "Create Parent Account" }).click();
  await pp.getByRole("button", { name: /Add child/ }).click();
  await pp.getByTestId("ac-username").fill(CHILD.username);
  await pp.getByTestId("ac-first").fill(CHILD.name);
  await pp.getByPlaceholder("School").fill(CHILD.school);
  await pp.getByPlaceholder("Child's password (min 6 chars)").fill(CHILD.password);
  await pp.getByRole("button", { name: "Check", exact: true }).click();
  await expect(pp.getByTestId("ac-name-status")).toBeVisible();
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
  const id = await childId();
  record("parent", "Both parents linked", "Mrs Tan and Mr Tan follow Amir", "linked", "PASS", await snap(pb, "01-parents"));

  await loginStudent(sp, CHILD.username, CHILD.password);
  await openPapers(sp);
  await sp.getByRole("button", { name: "Start" }).first().click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const attempt = (await dbGet("exam_attempts?student_id=eq." + id + "&status=eq.in_progress&select=id,paper_id&order=started_at.desc&limit=1"))[0];
  const t0 = Date.now();
  const kind = await answerOne(sp);
  let draft = [];
  for (let i = 0; i < 16; i++) {
    draft = await dbGet("exam_answers?attempt_id=eq." + attempt.id + "&select=question_id,answer,correct,flagged");
    if (draft.length) break;
    await sp.waitForTimeout(500);
  }
  const delay = Date.now() - t0;
  const savedOk = draft.length >= 1 && draft.every((r) => r.correct === null) && delay >= 1500 && delay <= 8000;
  record("student", "Autosave about 3 seconds after a change", "A draft row with correct null appears between 2 and 8 seconds", kind + " in " + delay + "ms; rows " + draft.length, savedOk ? "PASS" : "FAIL", await snap(sp, "02-saved"));

  const savedId = draft[0].question_id;
  const student2 = await browser.newContext(CTX);
  const sp2 = await student2.newPage();
  await loginStudent(sp2, CHILD.username, CHILD.password);
  await openPapers(sp2);
  await sp2.getByRole("button", { name: "Continue" }).click();
  await sp2.getByText("Previous section").waitFor({ timeout: 30000 });
  const resumed = await sp2.evaluate(() => [...document.querySelectorAll("button")].some((b) => /^\s*B\./.test(b.innerText || "") && getComputedStyle(b).borderTopColor === "rgb(124, 58, 237)") || [...document.querySelectorAll("input")].some((el) => el.value === "zzzz-saved"));
  record("student", "Second browser resumes the server copy", "A fresh context shows the saved answer with no local draft", resumed ? "answer restored" : "not restored", resumed ? "PASS" : "FAIL", await snap(sp2, "03-resume"));
  await student2.close();

  let failedSave = false;
  await sp.route("**/api/student/exam", async (route) => {
    const data = route.request().postData() || "";
    if (!failedSave && data.includes('"action":"save"')) {
      failedSave = true;
      await route.fulfill({ status: 500, contentType: "application/json", body: '{"error":"could not save"}' });
      return;
    }
    await route.continue();
  });
  await sp.getByRole("button", { name: "☆ flag" }).first().click();
  for (let i = 0; i < 16 && !failedSave; i++) await sp.waitForTimeout(500);
  const duringFail = await dbGet("exam_answers?attempt_id=eq." + attempt.id + "&question_id=eq." + savedId + "&select=flagged");
  await sp.unroute("**/api/student/exam");
  let retried = false;
  for (let i = 0; i < 40 && !retried; i++) {
    await sp.waitForTimeout(1000);
    const row = await dbGet("exam_answers?attempt_id=eq." + attempt.id + "&question_id=eq." + savedId + "&select=flagged");
    retried = row[0] && row[0].flagged === true;
  }
  record("student", "Autosave retries on the 30 second tick", "The 3 second save can fail; the 30 second interval sends it again", "3s save failed " + failedSave + "; still unflagged then " + (duringFail[0] && duringFail[0].flagged !== true) + "; later flagged " + retried, failedSave && duringFail[0] && duringFail[0].flagged !== true && retried ? "PASS" : "FAIL", "");

  sql("update public.exam_attempts set started_at = now() - interval '80 minutes', deadline_at = now() - interval '40 seconds' where id = '" + attempt.id + "'");
  await sp.goto("/");
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByText(/saved answers were handed in automatically/).waitFor({ timeout: 20000 });
  const finished = await dbGet("exam_attempts?id=eq." + attempt.id + "&select=status,counts,counts_reason,score,answered");
  const graded = await dbGet("exam_answers?attempt_id=eq." + attempt.id + "&question_id=eq." + savedId + "&select=correct,answer");
  const activity = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq.English&select=sets_completed,first_set_questions,first_set_correct");
  const expiredOk = finished[0] && finished[0].status === "auto_submitted" && finished[0].counts === true && graded[0] && graded[0].correct !== null && activity[0] && activity[0].sets_completed >= 1 && activity[0].first_set_questions === 0;
  record("student", "Expired paper is auto-submitted from the saved answers", "Status auto_submitted, not abandoned; the answer is graded; it counts as today's set", JSON.stringify({ finished: finished[0], graded: graded[0], activity: activity[0] }), expiredOk ? "PASS" : "FAIL", await snap(sp, "04-expired"));

  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Papers/ }).click();
  await pp.getByText(/handed in automatically|Score/).first().waitFor({ timeout: 20000 });
  record("parent A", "Dashboard shows the auto-submitted paper", "Papers tab lists the sitting", /Score/.test(await bodyText(pp)) ? "score on the tab" : "missing", /Score/.test(await bodyText(pp)) ? "PASS" : "FAIL", await snap(pp, "05-parent"));
  await ensureParent(pb, PARENT_B.email, PARENT_B.password);
  await pb.getByRole("button", { name: /Papers/ }).click();
  await pb.getByText(/Score/).first().waitFor({ timeout: 20000 });
  record("parent B", "Mr Tan sees the same paper", "Both parents", "visible", "PASS", await snap(pb, "06-parent-b"));

  const secret = process.env.CRON_SECRET || "e2e-cron-secret";
  const cron = await fetch("http://127.0.0.1:3000/api/cron/daily-alert", { headers: { authorization: "Bearer " + secret } });
  const log = fs.readFileSync(process.env.ALERT_DRY_RUN_LOG, "utf8");
  record("parent", "8pm email includes the auto-submitted paper", "Dry-run Mock papers section, no answer key", "cron " + cron.status, cron.ok && /Mock papers/.test(log) && !KEY_LEAK.test(log) ? "PASS" : "FAIL", "");

  await sp.getByRole("button", { name: "Start" }).nth(1).click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const late = (await dbGet("exam_attempts?student_id=eq." + id + "&status=eq.in_progress&select=id&order=started_at.desc&limit=1"))[0];
  await answerOne(sp);
  for (let i = 0; i < 16; i++) {
    const rows = await dbGet("exam_answers?attempt_id=eq." + late.id + "&select=question_id");
    if (rows.length) break;
    await sp.waitForTimeout(500);
  }
  const lateAnswer = (await dbGet("exam_answers?attempt_id=eq." + late.id + "&select=question_id,answer,correct"))[0];
  sql("update public.exam_attempts set deadline_at = now() - interval '2 minutes' where id = '" + late.id + "'");
  await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  const lateResponse = sp.waitForResponse((r) => r.url().includes("/api/student/exam") && r.request().method() === "POST");
  await sp.getByRole("button", { name: "Hand in" }).click();
  const lateStatus = (await lateResponse).status();
  const kept = await dbGet("exam_answers?attempt_id=eq." + late.id + "&question_id=eq." + lateAnswer.question_id + "&select=correct,answer");
  const lateRow = await dbGet("exam_attempts?id=eq." + late.id + "&select=status");
  const lateOk = lateStatus === 409 && lateRow[0].status === "auto_submitted" && kept[0] && kept[0].answer && kept[0].correct !== null;
  record("student", "Late hand-in is 409 and the saved answer is kept", "Past the grace the submit is refused, then the draft is graded", "HTTP " + lateStatus + " " + JSON.stringify(lateRow[0]) + " " + JSON.stringify(kept[0]), lateOk ? "PASS" : "FAIL", await snap(sp, "07-late"));

  await sp.goto("/");
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByRole("button", { name: "Start" }).first().click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const open = (await dbGet("exam_attempts?student_id=eq." + id + "&status=eq.in_progress&select=id&order=started_at.desc&limit=1"))[0];
  await answerOne(sp);
  for (let i = 0; i < 16; i++) {
    const rows = await dbGet("exam_answers?attempt_id=eq." + open.id + "&select=question_id");
    if (rows.length) break;
    await sp.waitForTimeout(500);
  }
  const keptId = (await dbGet("exam_answers?attempt_id=eq." + open.id + "&select=question_id"))[0].question_id;
  const forged = await sp.evaluate(async ({ attemptId, questionId }) => {
    const other = await fetch("/api/student/exam", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", attemptId: "00000000-0000-0000-0000-000000000000", answers: { q: { val: 1 } } }) });
    const foreign = await fetch("/api/student/exam", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", attemptId, answers: { [questionId]: { val: 1 }, "forged-question": { val: 1, correct: true } } }) });
    return { other: other.status, foreign: await foreign.json() };
  }, { attemptId: open.id, questionId: keptId });
  sql("update public.exam_attempts set deadline_at = now() - interval '5 seconds' where id = '" + open.id + "'");
  const lateSave = await sp.evaluate(async ({ attemptId, questionId }) => {
    const r = await fetch("/api/student/exam", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", attemptId, answers: { [questionId]: { val: 9 } } }) });
    return r.json();
  }, { attemptId: open.id, questionId: keptId });
  const still = await dbGet("exam_answers?attempt_id=eq." + open.id + "&question_id=eq." + keptId + "&select=answer");
  const foreignRows = await dbGet("exam_answers?question_id=eq.forged-question&select=question_id");
  const forgedOk = forged.other === 404 && forged.foreign.saved === true && foreignRows.length === 0 && lateSave.saved === false && still[0] && still[0].answer.val !== 9;
  forged.lateSave = lateSave;
  record("student", "Forged autosaves are rejected", "Another attempt 404, a foreign question id is dropped, a save after the deadline is refused", JSON.stringify(forged), forgedOk ? "PASS" : "FAIL", "");

  const leaked = bodies.filter((t) => KEY_LEAK.test(t));
  const saveBodies = bodies.filter((t) => t.includes('"saved"'));
  record("student", "Autosave and resume responses carry no answer key", "No hint, solution, or model answer in the student exam traffic", bodies.length + " responses, leaks " + leaked.length + ", saves " + saveBodies.length, leaked.length === 0 && saveBodies.length > 0 ? "PASS" : "FAIL", "");

  const fails = STEPS.filter((s) => s.status === "FAIL");
  console.log("AUTOSAVE " + STEPS.filter((s) => s.status === "PASS").length + " pass, " + fails.length + " fail, " + STEPS.filter((s) => s.status === "GAP").length + " gap");
  expect(fails, fails.map((s) => s.step + ": " + s.actual).join("\n")).toEqual([]);
});
