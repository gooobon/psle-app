// Role-play of mock exams phase 1 (PR #45). Local Supabase only.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, loginStudent, ensureParent, ensureStudent, assertLocalOnly } = require("./helpers");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.com", password: "Testpass1" };
const PARENT_B = { name: "Mr Tan", email: "mr.tan.e2e@example.com", password: "Testpass2" };
const CHILD = { username: "amir_e2e", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const LEAK = /"(answer|answers|acceptableAnswers|hints|solution|explanation|explain|learning_tip|retry_hint|correctAnswer|modelAnswer)"\s*:/;
const STEPS = [];

function record(role, step, expected, actual, status, screenshot) {
  STEPS.push({ role, step, expected, actual, status, screenshot: screenshot || "" });
  fs.mkdirSync("tests/e2e/.state", { recursive: true });
  fs.writeFileSync("tests/e2e/.state/mock-steps.json", JSON.stringify(STEPS, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${actual}`);
}
async function snap(page, name) {
  try { return await shot(page, "mock-" + name); } catch { return ""; }
}
function sql(q) {
  execFileSync("sudo", ["docker", "exec", process.env.E2E_DB_CONTAINER, "psql", "-U", "postgres", "-c", q], { stdio: "pipe" });
}
async function childId() {
  const rows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id");
  return rows[0].id;
}

test("mock exam role-play @mock", async ({ browser }) => {
  test.setTimeout(40 * 60 * 1000);
  assertLocalOnly();
  const studentBodies = [];
  const parent = await browser.newContext(CTX);
  const parentB = await browser.newContext(CTX);
  const student = await browser.newContext(CTX);
  const pp = await parent.newPage();
  const pb = await parentB.newPage();
  const sp = await student.newPage();
  sp.on("response", async (res) => {
    if (!res.url().includes("/api/student/exam")) return;
    const text = await res.text().catch(() => "");
    studentBodies.push(text.slice(0, 300000));
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
  const links = await dbGet("parent_child?select=parent_id,child_id");
  record("parent", "Both parents linked", "2 parent_child rows", "rows " + links.length, links.length === 2 ? "PASS" : "FAIL", await snap(pb, "01-parents"));

  const id = await childId();
  await loginStudent(sp, CHILD.username, CHILD.password);
  const mockBtn = sp.getByRole("button", { name: /English mock papers/ });
  await mockBtn.waitFor({ timeout: 20000 });
  await mockBtn.click();
  await sp.getByText("Mock papers", { exact: true }).waitFor();
  await sp.getByRole("button", { name: "Start" }).first().waitFor({ timeout: 30000 });
  const listText = await bodyText(sp);
  const flagged = /This paper's answer key was worked out|The year on this paper may be different|This paper looks similar/.test(listText);
  const timerRule = /Printed time on the paper|1\.5 min per mark/.test(listText);
  record("student", "Paper list shows the timer rule and a flagged-paper note", "A full paper shows printed time or 1.5 min per mark, and at least one neutral flag note", timerRule ? "timer rule shown; flagged note " + flagged : "timer rule missing", timerRule && flagged ? "PASS" : "FAIL", await snap(sp, "02-list"));

  const minutesText = await sp.getByText(/This paper/).first().evaluate((el) => {
    let n = el;
    while (n && n.querySelectorAll("button").length !== 1) n = n.parentElement;
    return n ? n.innerText : "";
  });
  const minutes = Number((minutesText.match(/(\d+)\s*min/) || [])[1] || 0);
  await sp.getByText(/This paper/).first().evaluate((el) => {
    let n = el;
    while (n && n.querySelectorAll("button").length !== 1) n = n.parentElement;
    const b = n && [...n.querySelectorAll("button")].find((x) => x.textContent.trim() === "Start");
    if (b) b.click();
  });
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const timer = (await bodyText(sp)).match(/(\d+):(\d{2})/);
  const shownMin = timer ? Number(timer[1]) : -1;
  const timerOk = minutes >= 5 && shownMin >= minutes - 1 && shownMin <= minutes;
  record("student", "Timer matches the paper", minutes + " min on the card, countdown starts at that length", "card " + minutes + " min, timer " + (timer ? timer[0] : "none"), timerOk ? "PASS" : "FAIL", await snap(sp, "03-timer"));

  const sections = sp.locator("button").filter({ hasText: /Grammar|Vocabulary|Editing|Comprehension/ });
  const sectionCount = await sections.count();
  if (sectionCount > 1) await sections.nth(1).click();
  await sp.getByRole("button", { name: "← Previous section" }).click();
  const backOk = sectionCount > 1;
  await sp.getByRole("button", { name: "☆ flag" }).first().click();
  const flaggedMark = await sp.getByRole("button", { name: "★ flagged" }).count();
  record("student", "Free navigation and flagging", "Can move between sections and flag a question", sectionCount + " sections, flagged buttons " + flaggedMark, backOk && flaggedMark >= 1 ? "PASS" : "FAIL", await snap(sp, "04-flag"));

  await answerSome(sp, 4);
  await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  await sp.getByText(/Unanswered:/).waitFor();
  const review = await bodyText(sp);
  const reviewOk = /Unanswered:/.test(review) && /Flagged for later:/.test(review) && /cannot change your answers/.test(review);
  await sp.getByRole("button", { name: "Back to the paper" }).click();
  await sp.getByText("Previous section").waitFor();
  await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  const result = await bodyText(sp);
  const notCount = /did not count as a set/.test(result);
  record("student", "Review screen, then a short paper does not count", "Check screen lists unanswered and flagged items. A handful of answers under half the time does not count as a set", reviewOk ? "review shown; result says count=" + !notCount : "review missing", reviewOk && notCount ? "PASS" : "FAIL", await snap(sp, "05-short"));

  const short = await dbGet("exam_attempts?student_id=eq." + id + "&status=neq.in_progress&select=score,total,answered,counts,counts_reason,question_count&order=submitted_at.desc&limit=1");
  const wrongs = await dbGet("exam_answers?select=correct,answer&attempt_id=eq." + (await latestAttempt(id)).id);
  const wrongMarked = wrongs.filter((r) => r.correct === false).length;
  record("student", "Deliberate answers are graded on the server", "Stored correct flags are the server's, and at least one chosen answer is wrong", short[0] ? JSON.stringify(short[0]) + "; wrong rows " + wrongMarked : "no attempt", short[0] && short[0].counts === false && wrongMarked > 0 ? "PASS" : "FAIL", "");

  await sp.getByRole("button", { name: "Done" }).click();
  await sp.getByText("Mock papers", { exact: true }).waitFor();

  // Auto-submit: shorten the server deadline, resume, and let the on-screen clock hit 0:00.
  const start2 = sp.getByRole("button", { name: "Start" }).nth(1);
  await start2.click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const open = await latestAttempt(id);
  sql("update public.exam_attempts set started_at = now(), deadline_at = now() + interval '8 seconds' where id = '" + open.id + "'");
  await sp.reload();
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByRole("button", { name: "Continue" }).click();
  await sp.getByText("Previous section").waitFor({ timeout: 20000 });
  await sp.getByText(/Time ran out, so your paper was handed in automatically/).waitFor({ timeout: 25000 });
  const autoRow = await dbGet("exam_attempts?id=eq." + open.id + "&select=status,counts");
  record("student", "Auto-submit when the clock hits 0:00", "The paper hands itself in and the status is auto_submitted", JSON.stringify(autoRow), autoRow[0] && autoRow[0].status === "auto_submitted" ? "PASS" : "FAIL", await snap(sp, "06-auto"));

  await sp.getByRole("button", { name: "Done" }).click();
  await sp.getByRole("button", { name: "Start" }).nth(2).click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const filled = await answerFraction(sp, 0.8);
  if (!(await sp.getByRole("button", { name: "Hand in" }).count())) {
    await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  }
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  const counted = await dbGet("exam_attempts?student_id=eq." + id + "&counts=eq.true&select=id,answered,question_count,counts_reason,score,total&order=submitted_at.desc&limit=1");
  const activity = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq.English&select=sets_completed,first_set_questions,first_set_correct,done_keys");
  const credits = await dbGet("reward_credits?child_id=eq." + id + "&select=credits");
  const countedOk = counted[0] && counted[0].counts_reason === "answers" && activity[0] && activity[0].sets_completed >= 1 && activity[0].first_set_questions === 0 && activity[0].first_set_correct === 0;
  record("student", "80% answered counts as today's set but not the score tier", "sets_completed goes up, first-set score stays 0/0, no tier credits", JSON.stringify({ filled, counted: counted[0], activity: activity[0], credits: credits.length }), countedOk && credits.length === 0 ? "PASS" : "FAIL", await snap(sp, "07-counted"));

  await sp.getByRole("button", { name: "Done" }).click();
  await sp.getByText("Ai Tong School 2020").first().evaluate((el) => {
    let n = el;
    while (n && ![...n.querySelectorAll("button")].some((b) => b.textContent.trim() === "Start")) n = n.parentElement;
    const b = n && [...n.querySelectorAll("button")].find((x) => x.textContent.trim() === "Start");
    if (b) b.click();
  });
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const comp = sp.getByRole("button", { name: "Comprehension" });
  if (await comp.count()) await comp.click();
  const openBox = sp.getByPlaceholder("Write your answer (your parent will mark this one)");
  if (await openBox.count()) await openBox.first().fill("the park");
  const stopped = await sp.evaluate(() => {
    const stop = [...document.querySelectorAll("button")].find((b) => (b.innerText || "").includes("Stop early"));
    if (stop) { stop.click(); return true; }
    return false;
  });
  if (!stopped) throw new Error("No stop button. On screen:\n" + (await bodyText(sp)).slice(0, 500));
  await sp.getByRole("button", { name: "Hand in" }).waitFor({ timeout: 15000 });
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  record("student", "Hands in a paper with an open-ended question", "The result says a parent will mark it", /marked by your parent/.test(await bodyText(sp)) ? "parent mark noted" : "no open items on the result", /marked by your parent/.test(await bodyText(sp)) ? "PASS" : "FAIL", await snap(sp, "07b-open"));

  await pp.bringToFront();
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Papers/ }).click();
  await pp.getByText("Model answer:").first().waitFor({ timeout: 20000 });
  const model = ((await pp.getByText("Model answer:").first().locator("xpath=..").innerText()) || "").replace(/^Model answer:\s*/, "").trim();
  await pp.getByRole("button", { name: "Correct" }).first().click();
  let marked = [];
  for (let i = 0; i < 20; i++) {
    marked = await dbGet("exam_answers?parent_correct=eq.true&select=question_id,parent_correct");
    if (marked.length) break;
    await pp.waitForTimeout(300);
  }
  record("parent A", "Marks an open-ended item from the model answer", "Papers tab shows the model answer and a Correct mark is stored", "model shown; marks " + marked.length, model.length > 0 && marked.length >= 1 ? "PASS" : "FAIL", await snap(pp, "08-parent-mark"));

  await pb.bringToFront();
  await pb.goto("/");
  await ensureParent(pb, PARENT_B.email, PARENT_B.password);
  await pb.getByRole("button", { name: /Papers/ }).click();
  await pb.getByText("Model answer:").first().waitFor({ timeout: 20000 });
  const same = (await bodyText(pb)).includes(model.slice(0, 40));
  record("parent B", "Sees the same paper and model answer", "Both parents can open Papers", same ? "model answer visible" : "model answer missing", same ? "PASS" : "FAIL", await snap(pb, "09-parent-b"));

  const leaked = studentBodies.filter((t) => LEAK.test(t) || (model && model.length > 12 && t.includes(model.slice(0, 40))));
  record("student", "Answer keys never reach the student", "Student exam responses have no answer, hint, or model-answer fields", studentBodies.length + " responses, leaks " + leaked.length, studentBodies.length > 0 && leaked.length === 0 ? "PASS" : "FAIL", "");

  const forged = await sp.evaluate(async () => {
    const bad = await fetch("/api/student/exam", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "start", paperId: "forged-paper", correct: true }) });
    const claim = await fetch("/api/student/exam", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "submit", attemptId: "00000000-0000-0000-0000-000000000000", answers: { q: { val: 0, correct: true } } }) });
    return { start: bad.status, other: claim.status };
  });
  const lateId = counted[0].id;
  sql("update public.exam_attempts set status = 'in_progress', deadline_at = now() - interval '2 minutes' where id = '" + lateId + "'");
  const late = await sp.evaluate(async (attemptId) => {
    const r = await fetch("/api/student/exam", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "submit", attemptId, answers: { q: { val: 0, correct: true } }, auto: true }) });
    return r.status;
  }, lateId);
  sql("update public.exam_attempts set status = 'submitted' where id = '" + lateId + "'");
  const direct = await directInsert(student, id);
  const forgedOk = forged.start === 400 && forged.other === 404 && late === 409 && (direct.insert === 401 || direct.insert === 403);
  record("student", "Forged and late submissions are rejected", "Unknown paper 400, another attempt 404, submit after the grace 409, direct insert blocked", JSON.stringify({ forged, late, direct }), forgedOk ? "PASS" : "FAIL", "");

  const before = await dbGet("daily_activity?user_id=eq." + id + "&select=sets_completed");
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByRole("button", { name: "Start" }).first().click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  await answerSome(sp, 1);
  const sitting = await latestAttempt(id);
  sql("update public.exam_attempts set deadline_at = now() - interval '1 minute' where id = '" + sitting.id + "'");
  await sp.goto("/");
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByText("Time is up").waitFor({ timeout: 20000 });
  const otherStart = sp.getByRole("button", { name: "Start" }).nth(3);
  await otherStart.click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const abandoned = await dbGet("exam_attempts?id=eq." + sitting.id + "&select=status");
  const kept = await dbGet("exam_answers?attempt_id=eq." + sitting.id + "&select=question_id");
  record("student", "Expired paper started over becomes abandoned", "Severity: high. No server autosave, so the on-screen answers are not in exam_answers and the old sitting is abandoned", "status " + (abandoned[0] && abandoned[0].status) + ", saved answers " + kept.length, abandoned[0] && abandoned[0].status === "abandoned" && kept.length === 0 ? "GAP" : "FAIL", await snap(sp, "10-abandoned"));

  const secret = process.env.CRON_SECRET || "e2e-cron-secret";
  const cron = await fetch("http://127.0.0.1:3000/api/cron/daily-alert", { headers: { authorization: "Bearer " + secret } });
  const log = fs.readFileSync(process.env.ALERT_DRY_RUN_LOG, "utf8");
  const mailOk = cron.ok && /Mock papers/.test(log) && !/modelAnswer|answer key/i.test(log);
  record("parent", "8pm email has a Mock papers section", "Dry-run only, paper name and score, no answer key", "cron " + cron.status + "; Mock papers " + /Mock papers/.test(log), mailOk ? "PASS" : "FAIL", "");

  const fails = STEPS.filter((s) => s.status === "FAIL");
  console.log("MOCK " + STEPS.filter((s) => s.status === "PASS").length + " pass, " + fails.length + " fail, " + STEPS.filter((s) => s.status === "GAP").length + " gap");
  expect(fails, fails.map((s) => s.step + ": " + s.actual).join("\n")).toEqual([]);
});

test("flag off hides mock exams @mock-off", async ({ page }) => {
  test.skip(!process.env.E2E_FLAG_OFF, "run against a server started without the flag");
  const anon = await page.request.get("/api/student/exam");
  expect(anon.status()).toBe(404);
  await loginStudent(page, CHILD.username, CHILD.password);
  expect(await page.getByRole("button", { name: /English mock papers/ }).count()).toBe(0);
  const authed = await page.evaluate(async () => (await fetch("/api/student/exam", { credentials: "same-origin" })).status);
  expect(authed).toBe(404);
});

async function latestAttempt(studentId) {
  const rows = await dbGet("exam_attempts?student_id=eq." + studentId + "&select=id,status&order=started_at.desc&limit=1");
  return rows[0];
}
async function answerSome(page, n) {
  let got = 0;
  const labels = page.locator("button").filter({ hasText: /Grammar|Vocabulary|Editing|Comprehension/ });
  const sections = Math.max(1, await labels.count());
  for (let s = 0; s < sections && got < n; s++) {
    if (await labels.count()) await labels.nth(s).click();
    const buttons = page.locator("button", { hasText: /^B\./ });
    const count = await buttons.count();
    for (let i = 0; i < count && got < n; i++) { await buttons.nth(i).click(); got++; }
    const inputs = page.locator("input");
    const ic = await inputs.count();
    for (let i = 0; i < ic && got < n; i++) { await inputs.nth(i).fill("zzzz-wrong"); got++; }
  }
}
async function answerFraction(page, fraction) {
  let last = "";
  let clicks = 0;
  for (let round = 0; round < 2; round++) {
    const labels = page.locator("button").filter({ hasText: /multiple choice|cloze|Editing|Comprehension/ });
    const n = await labels.count();
    for (let i = 0; i < n; i++) {
      await labels.nth(i).click();
      clicks += await page.evaluate(() => {
        const choices = [...document.querySelectorAll("button")].filter((b) => /^\s*[A-D]\./.test(b.innerText || ""));
        const groups = new Map();
        for (const b of choices) {
          const host = b.parentElement;
          if (!groups.has(host)) groups.set(host, []);
          groups.get(host).push(b);
        }
        for (const group of groups.values()) (group[1] || group[0]).click();
        const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        for (const input of document.querySelectorAll("input, textarea")) {
          const numeric = input.getAttribute("inputmode") === "numeric" || input.style.width === "40px";
          const next = numeric ? "1" : "zzzz-wrong";
          const tracker = input._valueTracker;
          if (tracker) tracker.setValue("");
          set.call(input, next);
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        let tf = 0;
        for (const b of document.querySelectorAll("button")) if ((b.innerText || "").trim() === "True") { b.click(); tf++; }
        return groups.size + tf;
      });
    }
    await page.getByRole("button", { name: "Stop early and hand in" }).click();
    last = await bodyText(page);
    const m = last.match(/Unanswered:\s*(\d+)\s*of\s*(\d+)/);
    const unanswered = m ? Number(m[1]) : 1;
    const total = m ? Number(m[2]) : 1;
    if (total > 0 && (total - unanswered) / total >= fraction) return (last.match(/Unanswered:[^\n]*/)?.[0] || "") + " clicks " + clicks;
    await page.getByRole("button", { name: "Back to the paper" }).click();
  }
  return "short of 80%: " + (last.match(/Unanswered:[^\n]*/)?.[0] || last.slice(0, 80)) + " clicks " + clicks;
}
async function directInsert(context, studentId) {
  const anon = process.env.E2E_ANON_KEY;
  const api = process.env.E2E_API_URL;
  if (!anon || !api) return { skipped: true };
  const cookies = await context.cookies();
  const raw = cookies.filter((c) => c.name.startsWith("sb-127-auth-token")).sort((a, b) => a.name.localeCompare(b.name)).map((c) => c.value).join("");
  let token = "";
  try {
    const decoded = raw.startsWith("base64-") ? Buffer.from(raw.slice(7), "base64url").toString("utf8") : decodeURIComponent(raw);
    const parsed = JSON.parse(decoded);
    token = parsed.access_token || (Array.isArray(parsed) ? parsed[0] : "") || "";
  } catch { return { error: "cookie" }; }
  const r = await fetch(api.replace(/\/$/, "") + "/rest/v1/exam_attempts", {
    method: "POST",
    headers: { apikey: anon, Authorization: "Bearer " + token, "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({ student_id: studentId, subject: "English", paper_id: "forged", minutes_allowed: 60, deadline_at: new Date().toISOString(), status: "submitted", score: 99, total: 100 }),
  });
  return { insert: r.status };
}
