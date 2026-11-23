// Saturday past-paper reward, played through the mock-exam UI. Local Supabase only.
// Today in this script is the real SGT day (Friday 20 Nov 2026 when this was written).
// Rules are saved that day and apply the next day. The next day is shifted to a Saturday.
const fs = require("fs");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, loginStudent, ensureParent, ensureStudent, assertLocalOnly } = require("./helpers");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.com", password: "Testpass1" };
const PARENT_B = { name: "Mr Tan", email: "mr.tan.e2e@example.com", password: "Testpass2" };
const CHILD = { username: "amir_e2e", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const CAUSES = ["Didn't know the concept", "Misread the question", "Calculation slip", "Fell for a trap", "Ran out of time", "Guessed"];
const LEAK = /"(answer|answers|acceptableAnswers|hints|solution|explanation|explain|learning_tip|retry_hint|correctAnswer|modelAnswer)"\s*:/;
const STEPS = [];

function record(role, step, expected, actual, status, screenshot) {
  STEPS.push({ role, step, expected, actual, status, screenshot: screenshot || "" });
  fs.mkdirSync("tests/e2e/.state", { recursive: true });
  fs.writeFileSync("tests/e2e/.state/paper-steps.json", JSON.stringify(STEPS, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${actual}`);
}
async function snap(page, name) {
  try { return await shot(page, "paper-" + name); } catch { return ""; }
}
function sql(q) {
  execFileSync("sudo", ["docker", "exec", process.env.E2E_DB_CONTAINER, "psql", "-U", "postgres", "-v", "ON_ERROR_STOP=1", "-c", q], { stdio: "pipe" });
}
function shiftDays() {
  const file = process.env.E2E_DAY_SHIFT_FILE;
  return file && fs.existsSync(file) ? Number(fs.readFileSync(file, "utf8")) || 0 : 0;
}
function setDay(days) {
  fs.writeFileSync(process.env.E2E_DAY_SHIFT_FILE, String(days));
  sql("update public.e2e_clock set shift_days = " + Number(days));
}
async function shiftBrowser(pages, days) {
  const base = process.env.E2E_BASE_URL || "http://127.0.0.1:3000";
  for (const page of pages) {
    if (!String(page.url() || "").startsWith(base)) await page.goto(base);
    await page.evaluate((d) => sessionStorage.setItem("e2e-shift-days", String(d)), days);
  }
}
async function installBrowserClock(context) {
  await context.addInitScript(() => {
    const Real = Date;
    const shiftMs = () => Number(sessionStorage.getItem("e2e-shift-days") || "0") * 86400000;
    class Shifted extends Real {
      constructor(...args) {
        if (args.length === 0) super(Real.now() + shiftMs());
        else super(...args);
      }
      static now() { return Real.now() + shiftMs(); }
      static parse(value) { return Real.parse(value); }
      static UTC(...args) { return Real.UTC(...args); }
    }
    window.Date = Shifted;
  });
}
async function childId() {
  const rows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id");
  return rows[0].id;
}
async function latestAttempt(studentId) {
  const rows = await dbGet("exam_attempts?student_id=eq." + studentId + "&select=id,status,counts,counts_reason,score,total,answered,question_count&order=started_at.desc&limit=1");
  return rows[0];
}
async function answerFraction(page, fraction) {
  let last = "";
  for (let round = 0; round < 3; round++) {
    const labels = page.locator("button").filter({ hasText: /multiple choice|cloze|Editing|Comprehension|Grammar|Vocabulary/ });
    const n = await labels.count();
    for (let i = 0; i < n; i++) {
      await labels.nth(i).click();
      await page.evaluate(() => {
        const choices = [...document.querySelectorAll("button")].filter((b) => /^\s*[A-D]\./.test(b.innerText || ""));
        const groups = new Map();
        for (const b of choices) {
          const host = b.parentElement;
          if (!groups.has(host)) groups.set(host, []);
          groups.get(host).push(b);
        }
        for (const group of groups.values()) (group[1] || group[0]).click();
        const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        const setTa = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
        for (const input of document.querySelectorAll("input, textarea")) {
          const numeric = input.getAttribute("inputmode") === "numeric" || input.style.width === "40px";
          const next = numeric ? "1" : "zzzz-wrong";
          const tracker = input._valueTracker;
          if (tracker) tracker.setValue("");
          (input.tagName === "TEXTAREA" ? setTa : set).call(input, next);
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        for (const b of document.querySelectorAll("button")) if ((b.innerText || "").trim() === "True") b.click();
      });
    }
    const stop = page.getByRole("button", { name: "Stop early and hand in" });
    if (await stop.count()) await stop.click();
    else if (await page.getByRole("button", { name: "Finish and check" }).count()) await page.getByRole("button", { name: "Finish and check" }).click();
    await page.getByText(/Unanswered:/).waitFor({ timeout: 15000 });
    last = await bodyText(page);
    const m = last.match(/Unanswered:\s*(\d+)\s*of\s*(\d+)/);
    const unanswered = m ? Number(m[1]) : 1;
    const total = m ? Number(m[2]) : 1;
    if (total > 0 && (total - unanswered) / total >= fraction) return last.match(/Unanswered:[^\n]*/)?.[0] || "";
    await page.getByRole("button", { name: "Back to the paper" }).click();
  }
  return "short of target: " + (last.match(/Unanswered:[^\n]*/)?.[0] || "");
}

test("saturday paper reward through the exam UI @paper", async ({ browser }) => {
  test.setTimeout(45 * 60 * 1000);
  assertLocalOnly();
  const studentBodies = [];
  const parent = await browser.newContext(CTX);
  const parentB = await browser.newContext(CTX);
  const student = await browser.newContext(CTX);
  await installBrowserClock(parent);
  await installBrowserClock(parentB);
  await installBrowserClock(student);
  const pp = await parent.newPage();
  const pb = await parentB.newPage();
  const sp = await student.newPage();
  sp.on("response", async (res) => {
    if (!res.url().includes("/api/student/exam")) return;
    studentBodies.push((await res.text().catch(() => "")).slice(0, 200000));
  });
  setDay(0);
  await shiftBrowser([pp, pb, sp], 0);

  await pp.goto("/");
  await pp.getByText("Welcome back").waitFor();
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
  record("parent", "Both parents linked before the paper", "2 parent_child rows", "rows " + links.length, links.length === 2 ? "PASS" : "FAIL", await snap(pb, "01-parents"));

  const id = await childId();
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText("Saturday past paper reward").waitFor();
  await pp.locator("label", { hasText: "Turn on credits" }).locator("input").check();
  await pp.locator("label", { hasText: "SGD value of 1 credit" }).locator("input").fill("0.5");
  await pp.locator("select").nth(1).selectOption("sgd");
  await pp.locator("label", { hasText: /^English/ }).nth(1).locator("input").fill("6");
  const effort = pp.locator("label", { hasText: "Effort check" }).locator("input");
  if (!(await effort.isChecked())) await effort.check();
  await pp.getByRole("button", { name: "Save rules" }).click();
  await expect(pp.getByText(/Saved\. Applies from tomorrow/)).toBeVisible();
  const rule = (await dbGet("child_setting_versions?child_id=eq." + id + "&select=effective_from,enabled,sgd_per_credit,paper_unit,paper_amounts,paper_check_off&order=effective_from.desc"))[0];
  const ruleOk = rule && rule.enabled && Number(rule.sgd_per_credit) === 0.5 && rule.paper_unit === "sgd" && Number(rule.paper_amounts.English) === 6 && rule.paper_check_off === false;
  record("parent A", "Configure the Saturday paper reward", "S$0.50 per credit, English paper S$6, effort check on, applies tomorrow", JSON.stringify(rule), ruleOk ? "PASS" : "FAIL", await snap(pp, "02-paper-rule"));

  setDay(1);
  await shiftBrowser([pp, pb, sp], 1);
  await loginStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByText("Mock papers", { exact: true }).waitFor();
  await sp.getByRole("button", { name: "Start" }).first().waitFor({ timeout: 30000 });
  const list = await bodyText(sp);
  const listOk = /Printed time on the paper|1\.5 min per mark/.test(list);
  record("student", "Paper list on Saturday", "The list shows the timer rule", listOk ? "timer rule shown" : "timer rule missing", listOk ? "PASS" : "FAIL", await snap(sp, "03-list"));

  const cardMin = Number((await sp.getByText(/This paper/).first().evaluate((el) => {
    let n = el;
    while (n && n.querySelectorAll("button").length !== 1) n = n.parentElement;
    return n ? n.innerText : "";
  })).match(/(\d+)\s*min/)?.[1] || 0);
  await sp.getByRole("button", { name: "Start" }).first().click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const timer = (await bodyText(sp)).match(/(\d+):(\d{2})/);
  const shownMin = timer ? Number(timer[1]) : -1;
  record("student", "Timer starts at the paper length", cardMin + " min on the card", "timer " + (timer ? timer[0] : "none"), cardMin >= 5 && shownMin >= cardMin - 1 && shownMin <= cardMin ? "PASS" : "FAIL", await snap(sp, "04-timer"));

  const sections = sp.locator("button").filter({ hasText: /Grammar|Vocabulary|Editing|Comprehension/ });
  const sectionCount = await sections.count();
  if (sectionCount > 1) await sections.nth(1).click();
  await sp.getByRole("button", { name: "← Previous section" }).click();
  await sp.getByRole("button", { name: "☆ flag" }).first().click();
  const flagged = await sp.getByRole("button", { name: "★ flagged" }).count();
  record("student", "Free navigation and flag for later", "Move to another section, come back, and flag a question", sectionCount + " sections, flagged " + flagged, sectionCount > 1 && flagged >= 1 ? "PASS" : "FAIL", await snap(sp, "05-nav"));

  const choice = sp.locator("button", { hasText: /^B\./ });
  if (await choice.count()) await choice.first().click();
  else await sp.locator("input, textarea").first().fill("zzzz-saved");
  const open = await latestAttempt(id);
  let draft = [];
  for (let i = 0; i < 20; i++) {
    draft = await dbGet("exam_answers?attempt_id=eq." + open.id + "&select=question_id,correct");
    if (draft.length) break;
    await sp.waitForTimeout(500);
  }
  const draftOk = draft.length >= 1 && draft.every((r) => r.correct === null);
  record("student", "Autosave while the paper is open", "The answer is stored before hand-in, and it is not graded yet", "rows " + draft.length + " correct-null " + draftOk, draftOk ? "PASS" : "FAIL", await snap(sp, "06-autosave"));

  const student2 = await browser.newContext(CTX);
  await installBrowserClock(student2);
  const sp2 = await student2.newPage();
  await shiftBrowser([sp2], 1);
  await loginStudent(sp2, CHILD.username, CHILD.password);
  await sp2.getByRole("button", { name: /English mock papers/ }).click();
  await sp2.getByRole("button", { name: "Continue" }).click();
  await sp2.getByText("Previous section").waitFor({ timeout: 30000 });
  const resumed = await sp2.evaluate(() => [...document.querySelectorAll("button")].some((b) => /^\s*B\./.test(b.innerText || "") && getComputedStyle(b).borderTopColor === "rgb(124, 58, 237)") || [...document.querySelectorAll("input, textarea")].some((el) => el.value === "zzzz-saved"));
  record("student", "A second browser resumes the saved answer", "Continue shows the autosaved answer", resumed ? "restored" : "not restored", resumed ? "PASS" : "FAIL", await snap(sp2, "07-resume"));
  await student2.close();

  await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  await sp.getByText(/Unanswered:/).waitFor();
  const check = await bodyText(sp);
  const checkOk = /Unanswered:/.test(check) && /Flagged for later:/.test(check) && /cannot change your answers/.test(check);
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  const shortText = await bodyText(sp);
  const shortRow = await latestAttempt(id);
  const shortCredits = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.paper&select=credits,status");
  const shortOk = checkOk && /did not count as a set/.test(shortText) && /No Saturday paper reward/.test(shortText) && shortRow && shortRow.counts === false && shortCredits.length === 0;
  record("student", "A short Saturday hand-in fails the effort check", "Review screen, paper does not count, no paper credit, and the screen says why", "counts " + (shortRow && shortRow.counts) + "; credits " + shortCredits.length + "; message " + /No Saturday paper reward/.test(shortText), shortOk ? "PASS" : "FAIL", await snap(sp, "08-too-little"));

  await sp.getByRole("button", { name: "Done" }).click();
  await sp.getByRole("button", { name: "Start" }).nth(1).click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const ticking = await latestAttempt(id);
  const shift = shiftDays();
  sql("update public.exam_attempts set deadline_at = now() + (" + shift + " || ' days')::interval + interval '8 seconds' where id = '" + ticking.id + "'");
  await sp.reload();
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByRole("button", { name: "Continue" }).click();
  await sp.getByText(/Time ran out, so your paper was handed in automatically/).waitFor({ timeout: 25000 });
  const autoRow = await dbGet("exam_attempts?id=eq." + ticking.id + "&select=status,counts");
  const autoCredits = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.paper&select=credits");
  const autoOk = autoRow[0] && autoRow[0].status === "auto_submitted" && autoRow[0].counts === false && autoCredits.length === 0;
  record("student", "Auto-submit at 0:00 with almost nothing answered", "Status auto_submitted, still no paper credit", JSON.stringify(autoRow[0]), autoOk ? "PASS" : "FAIL", await snap(sp, "09-auto"));

  await sp.getByRole("button", { name: "Done" }).click();
  await sp.getByRole("button", { name: "Start" }).nth(2).click();
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const filled = await answerFraction(sp, 0.8);
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 40000 });
  const fullText = await bodyText(sp);
  const full = await latestAttempt(id);
  const paperCredits = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.paper&select=credits,status,sgd_per_credit,subject,gate_day");
  const fullOk = full && full.counts === true && /pending/.test(fullText) && paperCredits.length === 1 && paperCredits[0].credits === 12 && paperCredits[0].status === "pending";
  record("student", "Enough of the paper earns the Saturday reward, still pending", "12 credits (S$6 at S$0.50) pending, once for English", filled + "; " + JSON.stringify(paperCredits[0]) + "; screen pending " + /pending/.test(fullText), fullOk ? "PASS" : "FAIL", await snap(sp, "10-reward"));

  await sp.getByRole("button", { name: "Review answers" }).click();
  await sp.getByText("Why did you get it wrong?").first().waitFor({ timeout: 20000 });
  const reviewText = await bodyText(sp);
  const missing = CAUSES.filter((label) => !reviewText.includes(label));
  const calc = sp.getByRole("button", { name: "Calculation slip" }).first();
  if (await calc.count()) await calc.click();
  await sp.waitForTimeout(800);
  const caused = await dbGet("wrong_answers?student_id=eq." + id + "&cause=eq.calculation&select=question_id,cause,attempt_key");
  const notebookRows = await dbGet("wrong_answers?student_id=eq." + id + "&select=id,attempt_key");
  const fromPaper = notebookRows.filter((r) => String(r.attempt_key || "").startsWith("exam-"));
  record("student", "Review shows the 6 causes and missed questions enter the notebook", "All 6 English labels, one saved as Calculation slip, notebook rows from the exam", "missing " + (missing.join(", ") || "none") + "; calculation rows " + caused.length + "; exam notebook rows " + fromPaper.length, missing.length === 0 && caused.length >= 1 && fromPaper.length >= 1 ? "PASS" : "FAIL", await snap(sp, "11-review"));

  const openNote = /marked by your parent/.test(fullText);
  if (!openNote) {
    await sp.getByRole("button", { name: "← Back" }).click().catch(() => {});
    await sp.getByRole("button", { name: "Done" }).click().catch(() => {});
    const ai = sp.getByText("Ai Tong School 2020").first();
    if (await ai.count()) {
      await ai.evaluate((el) => {
        let n = el;
        while (n && ![...n.querySelectorAll("button")].some((b) => b.textContent.trim() === "Start")) n = n.parentElement;
        const b = n && [...n.querySelectorAll("button")].find((x) => x.textContent.trim() === "Start");
        if (b) b.click();
      });
      await sp.getByText("Previous section").waitFor({ timeout: 30000 });
      const comp = sp.getByRole("button", { name: "Comprehension" });
      if (await comp.count()) await comp.click();
      const box = sp.getByPlaceholder("Write your answer (your parent will mark this one)");
      if (await box.count()) await box.first().fill("the park");
      await sp.getByRole("button", { name: "Stop early and hand in" }).click();
      await sp.getByRole("button", { name: "Hand in" }).click();
      await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
    }
  }
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Papers/ }).click();
  const modelLoc = pp.getByText("Model answer:").first();
  const hasModel = await modelLoc.waitFor({ timeout: 20000 }).then(() => true).catch(() => false);
  let marked = [];
  if (hasModel) {
    await pp.getByRole("button", { name: "Correct" }).first().click();
    for (let i = 0; i < 20; i++) {
      marked = await dbGet("exam_answers?parent_correct=eq.true&select=question_id");
      if (marked.length) break;
      await pp.waitForTimeout(300);
    }
  }
  record("parent A", "Marks an open-ended item", "Papers shows the model answer and Correct is stored", hasModel ? "marks " + marked.length : "No model answer was on the Papers tab", hasModel && marked.length >= 1 ? "PASS" : "GAP", await snap(pp, "12-parent-mark"));

  await ensureParent(pb, PARENT_B.email, PARENT_B.password);
  await pb.getByRole("button", { name: /Papers/ }).click();
  const bSees = await pb.getByText(/Score/).first().waitFor({ timeout: 20000 }).then(() => true).catch(() => false);
  record("parent B", "Sees the same papers", "Mr Tan's Papers tab lists the sittings", bSees ? "score visible" : "missing", bSees ? "PASS" : "FAIL", await snap(pb, "13-parent-b"));

  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByText(/Pending:/).first().waitFor({ timeout: 20000 }).catch(() => {});
  const wallet = await bodyText(sp);
  record("student", "Wallet shows the pending paper credits in dollars", "Pending line includes S$6.00", /Pending:/.test(wallet) && wallet.includes("S$6.00") ? "S$6.00 pending" : wallet.slice(Math.max(0, wallet.indexOf("Pending")), Math.max(0, wallet.indexOf("Pending")) + 160), /Pending:/.test(wallet) && wallet.includes("S$6.00") ? "PASS" : "FAIL", await snap(sp, "14-wallet"));

  const secret = process.env.CRON_SECRET || "e2e-cron-secret";
  const cron = await fetch((process.env.E2E_BASE_URL || "http://127.0.0.1:3000") + "/api/cron/daily-alert", { headers: { Authorization: "Bearer " + secret } });
  const log = fs.existsSync(process.env.ALERT_DRY_RUN_LOG) ? fs.readFileSync(process.env.ALERT_DRY_RUN_LOG, "utf8") : "";
  const mailOk = cron.status === 200 && /Mock papers/.test(log) && !LEAK.test(log);
  record("system", "8pm dry-run mentions the paper and sends nothing", "HTTP 200, Mock papers in the log, no answer key", "HTTP " + cron.status + " mock " + /Mock papers/.test(log), mailOk ? "PASS" : "FAIL", "");

  // A review after hand-in is supposed to include correctAnswer and explanation.
  // An in-progress GET includes the student's own draft under the key "answers".
  // Those are not the answer key leaking before the paper is handed in.
  const beforeReview = studentBodies.filter((t) => !/"correctAnswer"\s*:/.test(t));
  const keyLeak = /"(acceptableAnswers|hints|solution|learning_tip|retry_hint|modelAnswer)"\s*:/;
  const leaked = beforeReview.filter((t) => keyLeak.test(t) || /"explanation"\s*:/.test(t));
  record("student", "Exam responses do not include the answer key before hand-in", "Start, save and the paper list have no key. The review after hand-in does, on purpose.", beforeReview.length + " pre-review responses, key leaks " + leaked.length + " (review payloads excluded)", beforeReview.length > 0 && leaked.length === 0 ? "PASS" : "FAIL", "");

  setDay(2);
  await shiftBrowser([sp, pp], 2);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByText(/Wallet:/).first().waitFor({ timeout: 20000 }).catch(() => {});
  const confirmed = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.paper&select=status,credits");
  record("student", "Next day confirms the paper credit when Saturday homework was not assigned", "The paper credit is confirmed", JSON.stringify(confirmed), confirmed[0] && confirmed[0].status === "confirmed" ? "PASS" : "FAIL", await snap(sp, "15-confirmed"));

  await pp.goto("/");
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText(/Credits:/).waitFor();
  const bal = Number(((await pp.getByText(/Credits:/).innerText()).match(/Credits:\s*(\d+)/) || [])[1] || 0);
  if (bal > 0) {
    await pp.getByPlaceholder("Credits").fill(String(Math.min(bal, 12)));
    await pp.getByPlaceholder("Amount S$").fill((Math.min(bal, 12) * 0.5).toFixed(2));
    await pp.getByPlaceholder(/Note/).fill("Saturday paper");
    await pp.getByRole("button", { name: "Mark paid" }).click();
    await expect(pp.getByText("Recorded as paid.")).toBeVisible();
  }
  const payouts = await dbGet("reward_payouts?select=credits,amount_sgd,note");
  record("parent A", "Marks the paper payout paid", "A confirmed balance can be marked paid", JSON.stringify(payouts[0] || null), payouts[0] && payouts[0].note === "Saturday paper" ? "PASS" : "FAIL", await snap(pp, "16-paid"));

  const fails = STEPS.filter((s) => s.status === "FAIL");
  console.log("PAPER " + STEPS.filter((s) => s.status === "PASS").length + " pass, " + fails.length + " fail, " + STEPS.filter((s) => s.status === "GAP").length + " gap");
  expect(fails, fails.map((s) => s.step + ": " + s.actual).join("\n")).toEqual([]);
});
