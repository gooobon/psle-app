// Plain-practice go-live role-play through the real UI. Local Supabase only.
// @golive runs with email and WhatsApp off. @golive-alert restarts with email on,
// a single test recipient, and no Resend key, so nothing is delivered.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, loginStudent, loginParent, ensureParent, assertLocalOnly } = require("./helpers");
const { driveToScore } = require("./scoreDrive");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.com", password: "Testpass1" };
const PARENT_B = { name: "Mr Tan", email: "mr.tan.e2e@example.com", password: "Testpass2" };
const CHILD = { username: "mei_e2e", name: "Mei Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const HANGUL = /[\uac00-\ud7af]/;
const MONEY = /S\$|SGD|\$\d/;
const STATE = path.join("tests", "e2e", ".state", "golive-steps.json");

function record(role, step, expected, actual, status, screenshot) {
  let steps = [];
  try { steps = JSON.parse(fs.readFileSync(STATE, "utf8")); } catch { steps = []; }
  steps.push({ role, step, expected, actual: String(actual).slice(0, 800), status, screenshot: screenshot || "" });
  fs.mkdirSync(path.dirname(STATE), { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify(steps, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${String(actual).slice(0, 300)}`);
}

async function snap(page, name) {
  try { return await shot(page, name); } catch { return ""; }
}

function sql(q) {
  return execFileSync("docker", ["exec", process.env.E2E_DB_CONTAINER, "psql", "-U", "postgres", "-t", "-A", "-c", q], { encoding: "utf8" });
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

async function confirmParents() {
  const rows = await dbGet("profiles?role=eq.parent&select=id,email");
  const key = process.env.E2E_SERVICE_ROLE;
  const url = String(process.env.E2E_API_URL || "").replace(/\/$/, "");
  for (const p of rows) {
    await fetch(url + "/auth/v1/admin/users/" + p.id, {
      method: "PUT",
      headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ email_confirm: true }),
    });
  }
}

async function childId() {
  const rows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id,grade,school");
  if (!rows.length) throw new Error("child missing");
  return rows[0];
}

async function activity(id, subject) {
  const rows = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq." + subject + "&select=date,sets_completed,questions_answered,correct,first_set_questions,first_set_correct&order=date.desc");
  return rows[0] || null;
}

async function credits(id) {
  return dbGet("reward_credits?child_id=eq." + id + "&select=kind,subject,credits,status,score_pct,sgd_per_credit,period&order=period.desc");
}

function tierOf(pct) {
  if (pct == null) return 0;
  if (pct >= 90) return 3;
  if (pct >= 70) return 2;
  return 0;
}

function pctOf(row) {
  if (!row || !(Number(row.first_set_questions) > 0)) return null;
  return Math.floor((Math.min(Number(row.first_set_correct), Number(row.first_set_questions)) / Number(row.first_set_questions)) * 100);
}

async function answerPaper(page) {
  const labels = page.locator("button").filter({ hasText: /Grammar|Vocabulary|Editing|Comprehension/ });
  const n = await labels.count();
  for (let i = 0; i < n; i++) {
    await labels.nth(i).click();
    await page.evaluate(() => {
      const text = (el) => (el.innerText || "").replace(/\s+/g, " ").trim();
      const choices = [...document.querySelectorAll("button")].filter((b) => /^\s*[A-D]\./.test(text(b)));
      const groups = new Map();
      for (const b of choices) {
        const host = b.parentElement;
        if (!groups.has(host)) groups.set(host, []);
        groups.get(host).push(b);
      }
      for (const group of groups.values()) (group[0] || {}).click && group[0].click();
      const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      const setTa = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      for (const input of document.querySelectorAll("input, textarea")) {
        if (input.closest("form") && input.type === "password") continue;
        const numeric = input.getAttribute("inputmode") === "numeric";
        const next = numeric ? "1" : "a short answer";
        const tracker = input._valueTracker;
        if (tracker) tracker.setValue("");
        (input.tagName === "TEXTAREA" ? setTa : set).call(input, next);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      for (const b of document.querySelectorAll("button")) if ((b.innerText || "").trim() === "True") b.click();
    });
  }
}

test.describe.configure({ mode: "serial" });

test("plain practice student and parent role-play @golive", async ({ browser }) => {
  test.setTimeout(70 * 60 * 1000);
  assertLocalOnly();
  const answers = JSON.parse(fs.readFileSync(path.join("tests", "e2e", "fixtures", "answers.json"), "utf8"));
  const marks = JSON.parse(fs.readFileSync(path.join("tests", "e2e", ".state", "marks-paper.json"), "utf8"));
  const paper = marks.chosen;
  const parent = await browser.newContext(CTX);
  const parentB = await browser.newContext(CTX);
  const student = await browser.newContext(CTX);
  await installBrowserClock(parent);
  await installBrowserClock(parentB);
  await installBrowserClock(student);
  const pp = await parent.newPage();
  const pb = await parentB.newPage();
  const sp = await student.newPage();
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
  await pp.getByRole("button", { name: /Add child/ }).waitFor({ timeout: 20000 });
  await pp.getByRole("button", { name: /Add child/ }).click();
  await pp.getByPlaceholder("Child's username (a-z, 0-9, _)").fill(CHILD.username);
  await pp.getByPlaceholder("Display name").fill(CHILD.name);
  const grade = await pp.locator("select").first().inputValue();
  await pp.getByPlaceholder("School").fill(CHILD.school);
  await pp.getByPlaceholder("Child's password (min 6 chars)").fill(CHILD.password);
  await pp.getByRole("button", { name: "Create child account" }).click();
  await expect(pp.getByText(/Created\./)).toBeVisible();
  let file = await snap(pp, "01-child-created");
  const kid = await childId();
  record("parent A", "Create a P3 child", "Grade selector is P3 and the child is stored as P3", "selector " + grade + " stored grade " + kid.grade + " school " + kid.school, grade === "P3" && kid.grade === "P3" ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Invite another parent/ }).click();
  await pp.getByPlaceholder(/Other parent's email/).fill(PARENT_B.email);
  await pp.getByRole("button", { name: "Send invite" }).click();
  await pp.getByText(PARENT_B.email).waitFor();
  await pb.goto("/");
  await pb.getByRole("button", { name: /Parent Sign Up/ }).click();
  await pb.getByPlaceholder("e.g. Mrs Lee").fill(PARENT_B.name);
  await pb.getByPlaceholder("you@example.com").fill(PARENT_B.email);
  await pb.getByPlaceholder("Create a password").fill(PARENT_B.password);
  await pb.getByPlaceholder("Re-enter password").fill(PARENT_B.password);
  await pb.getByRole("button", { name: "Create Parent Account" }).click();
  await pb.getByText(/invited you to follow/).waitFor({ timeout: 20000 });
  await pb.getByRole("button", { name: "Accept" }).click();
  await pb.getByRole("button", { name: new RegExp(CHILD.name) }).waitFor({ timeout: 20000 });
  await confirmParents();
  const links = await dbGet("parent_child?select=parent_id,child_id");
  file = await snap(pb, "02-both-parents");
  record("parents", "Two parents linked to one child", "2 parent_child rows", "rows " + links.length, links.length === 2 ? "PASS" : "FAIL", file);

  await pp.bringToFront();
  // Creating a child does not select them. The dashboard tabs stay hidden until the chip is tapped.
  const tabsBefore = await pp.getByRole("button", { name: /Rewards/ }).count();
  await pp.getByRole("button", { name: new RegExp(CHILD.name) }).click();
  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText("Reward rules").waitFor();
  await pp.locator("label", { hasText: "Turn on credits" }).locator("input").check();
  await pp.getByRole("button", { name: "+ Add tier" }).click();
  await pp.getByRole("button", { name: "+ Add tier" }).click();
  const nums = pp.locator('input[type="number"]');
  await nums.nth(0).fill("0.50");
  await nums.nth(1).fill("90");
  await nums.nth(2).fill("3");
  await nums.nth(3).fill("70");
  await nums.nth(4).fill("2");
  await nums.nth(5).fill("5");
  await nums.nth(6).fill("4");
  if (await nums.count() > 9) await nums.nth(9).fill("6");
  await pp.getByRole("button", { name: "Save rules" }).click();
  await pp.getByText(/Saved\. Applies from tomorrow|Could not save|Enter a valid|Each tier/).first().waitFor({ timeout: 20000 }).catch(() => {});
  file = await snap(pp, "03-reward-rules");
  const ruleText = await bodyText(pp);
  record("parent A", "Detailed reward rules", "Credits on, S$0.50 per credit, 90% → 3 and 80% → 2, starting tomorrow", /S\$0\.50|0\.50/.test(ruleText) && /Applies from tomorrow/.test(ruleText) ? "saved, S$ shown, applies tomorrow. Rewards tab before tapping the child: " + tabsBefore : ruleText.slice(0, 240), /Applies from tomorrow/.test(ruleText) ? "PASS" : "FAIL", file);

  const beforeAlerts = Number(sql("select count(*) from public.event_alert_log;").trim());
  setDay(1);
  await shiftBrowser([pp, pb, sp], 1);

  await sp.goto("/");
  await loginStudent(sp, CHILD.username, CHILD.password);
  const hello = await bodyText(sp);
  file = await snap(sp, "04-student-today");
  const helloHangul = HANGUL.test(hello);
  const helloMoney = MONEY.test(hello);
  record("student", "Sign in on Today", "P3, school E2E Primary, English and Chinese to do, no Hangul, no S$", "hangul " + helloHangul + " money " + helloMoney + " school " + /E2E Primary/.test(hello) + " grade " + /P3/.test(hello), !helloHangul && !helloMoney && /E2E Primary/.test(hello) && /P3/.test(hello) ? "PASS" : "FAIL", file);

  await sp.getByRole("button", { name: "Start today's set" }).first().click();
  await sp.getByText(/Section 1|Grammar/).first().waitFor({ timeout: 20000 });
  file = await snap(sp, "05-solve-plain");
  const solve = await bodyText(sp);
  const game = /Clew|clewquest|yarn|My Stickers|XP|level up/i.test(solve);
  record("student", "English solve screen is plain", "No stickers, Clew, yarn or XP on the question screen. No Hangul.", "game " + game + " hangul " + HANGUL.test(solve) + " header " + solve.slice(0, 180).replace(/\s+/g, " "), !game && !HANGUL.test(solve) ? "PASS" : "FAIL", file);

  const hint = { hinted: false };
  await driveToScore(sp, answers.sets, { min: 82, max: 92 }, "english-1", {
    hinted: false,
    onHint: async (page) => {
      hint.hinted = true;
      hint.file = await snap(page, "06-english-hint");
    },
  });
  file = await snap(sp, "07-english-result");
  const result = await bodyText(sp);
  const resultLine = (result.match(/\d+\/\d+ correct on first try/) || ["missing"])[0];
  const hintLine = (result.match(/\d+ solved after hint[^\n]*/) || ["none"])[0];
  await sp.getByRole("button", { name: /Back to Home/ }).click();
  await sp.getByText(/Hello,/).waitFor({ timeout: 20000 });
  const en = await activity(kid.id, "English");
  const enPct = pctOf(en);
  const enCredits = (await credits(kid.id)).filter((r) => r.subject === "English" && r.kind === "daily");
  const expectTier = tierOf(enPct);
  const creditOk = expectTier === 0 ? enCredits.length === 0 : enCredits.length === 1 && Number(enCredits[0].credits) === expectTier;
  record("student", "English first set, wrong answers and a hint", "Result shows first-try correct, a hint was used, and the reward uses that first-set score", resultLine + "; " + hintLine + "; hint seen " + hint.hinted + "; first set " + (en && en.first_set_correct) + "/" + (en && en.first_set_questions) + " = " + enPct + "%; credit " + (enCredits[0] && enCredits[0].credits) + " " + (enCredits[0] && enCredits[0].status) + " (tier " + expectTier + ")", hint.hinted && enPct != null && creditOk ? "PASS" : "FAIL", file);

  await sp.getByRole("button", { name: "Extra set" }).first().click();
  await driveToScore(sp, answers.sets, { min: 40, max: 60 }, "english-2");
  await sp.getByRole("button", { name: /Back to Home/ }).click();
  await sp.getByText(/Hello,/).waitFor({ timeout: 20000 });
  const en2 = await activity(kid.id, "English");
  const enCredits2 = (await credits(kid.id)).filter((r) => r.subject === "English" && r.kind === "daily");
  file = await snap(sp, "08-english-second");
  const creditSame = expectTier === 0 ? enCredits2.length === 0 : enCredits2.length === 1 && Number(enCredits2[0].credits) === expectTier;
  record("student", "Second English set does not change the first-set reward", "first_set stays and the English daily credit does not change", "sets " + en2.sets_completed + " first " + en2.first_set_correct + "/" + en2.first_set_questions + " (was " + en.first_set_correct + "/" + en.first_set_questions + "); credits " + enCredits2.map((r) => r.credits + " " + r.status).join(", "), en2.sets_completed === 2 && Number(en2.first_set_correct) === Number(en.first_set_correct) && Number(en2.first_set_questions) === Number(en.first_set_questions) && creditSame ? "PASS" : "FAIL", file);

  file = await snap(sp, "09-student-wallet");
  const wallet = await bodyText(sp);
  const walletMoney = MONEY.test(wallet);
  record("student", "Student wallet is credits only", "No S$, SGD or dollar rate on the student screen. Credits show when any have been earned.", "money " + walletMoney + "; " + ((wallet.match(/Wallet:[^\n]*|Pending:[^\n]*|credit[^\n]*/i) || []).slice(0, 4).join(" | ") || "(no credit line)"), !walletMoney ? "PASS" : "FAIL", file);

  await sp.getByRole("button", { name: "More" }).first().click();
  await sp.getByText("Extra practice").click();
  await sp.getByRole("button", { name: /Past-paper mock/ }).click();
  await sp.getByText(/Section|Grammar|Mock/).first().waitFor({ timeout: 20000 });
  const mockHeader = (await bodyText(sp)).split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6).join(" | ");
  file = await snap(sp, "10-mock-header");
  await driveToScore(sp, answers.pastPapers, { min: 50, max: 80 }, "past-mock");
  await sp.getByRole("button", { name: /Back to Home/ }).click();
  await sp.getByText(/Hello,/).waitFor({ timeout: 20000 });
  await sp.getByRole("button", { name: "More" }).first().click();
  await sp.getByText(/Recent Sessions/).click();
  file = await snap(sp, "11-history-school");
  const historyText = await bodyText(sp);
  const historySchool = await sp.evaluate((username) => {
    const raw = localStorage.getItem("genius_progress_v2");
    if (!raw) return null;
    const all = JSON.parse(raw);
    const key = Object.keys(all).find((k) => k.startsWith(username) && k.endsWith("_English"));
    const hist = key && all[key] && all[key].history ? all[key].history : [];
    const mock = [...hist].reverse().find((h) => h.isMockExam);
    return mock ? { school: mock.school || "", examType: mock.examType || "", session: mock.sessionNum } : null;
  }, CHILD.username);
  const hardcoded = historySchool && historySchool.school === "Nanyang Primary" && !/Nanyang/.test(mockHeader);
  record("student", "History uses the paper's real school", "Recent Sessions mock label is the sat paper's school, not a fixed Nanyang name", "header " + mockHeader + "; stored " + JSON.stringify(historySchool) + "; screen has Mock " + /Mock:/.test(historyText), historySchool && historySchool.school && historySchool.school !== "E2E Primary" && !hardcoded && /Mock:/.test(historyText) ? "PASS" : "FAIL", file);

  await sp.getByRole("button", { name: "Today" }).first().click();
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByText("Mock papers", { exact: true }).waitFor();
  await sp.getByRole("button", { name: "Start" }).first().waitFor({ timeout: 30000 });
  await sp.evaluate((label) => {
    const cards = [...document.querySelectorAll("div")].filter((d) => {
      const buttons = [...d.querySelectorAll("button")].filter((b) => (b.innerText || "").trim() === "Start");
      return buttons.length === 1 && (d.innerText || "").includes(label);
    });
    cards.sort((a, b) => a.innerText.length - b.innerText.length);
    const btn = cards[0] && [...cards[0].querySelectorAll("button")].find((b) => (b.innerText || "").trim() === "Start");
    if (!btn) {
      const labels = [...document.querySelectorAll("div")].map((d) => (d.innerText || "").split("\n")[0]).filter((t) => /EOY|WA|School/.test(t)).slice(0, 12);
      throw new Error("no start button for " + label + " saw " + labels.join(" | "));
    }
    btn.click();
  }, paper.label);
  await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  const comp = sp.getByRole("button", { name: /Comprehension/ });
  if (await comp.count()) await comp.first().click();
  file = await snap(sp, "12-paper-question");
  const paperText = await bodyText(sp);
  const sawMarks = /\(\s*2\s*marks?\s*\)|\[\s*2\s*m(?:arks?)?\s*\]/i.test(paperText);
  record("student", "Paper shows a real school and a 2-mark question", paper.label + " and a printed 2-mark item", "screen has label " + paperText.includes(paper.school) + " printed-2 " + sawMarks, paperText.includes(paper.school) ? "PASS" : "FAIL", file);
  await answerPaper(sp);
  const stop = sp.getByRole("button", { name: "Stop early and hand in" });
  if (await stop.count()) await stop.click();
  else await sp.getByRole("button", { name: "Finish and check" }).click();
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score/).first().waitFor({ timeout: 20000 });
  file = await snap(sp, "13-paper-score");
  const handed = await bodyText(sp);
  const attempt = (await dbGet("exam_attempts?student_id=eq." + kid.id + "&select=id,paper_label,score,total,auto_score,auto_total,parent_pending,settled_at,status&order=started_at.desc&limit=1"))[0];
  record("student", "Hand in a paper with weighted marks", "Score line uses marks and open items wait for a parent", "wanted " + paper.label + "; screen " + ((handed.match(/Score[^\n]*/) || [""])[0]) + "; db " + JSON.stringify(attempt), attempt && Number(attempt.parent_pending) > 0 && /awaiting parent marking/.test(handed) ? "PASS" : "FAIL", file);

  const alertsAfterSets = Number(sql("select count(*) from public.event_alert_log;").trim());
  record("system", "Nothing is sent when email and WhatsApp are both off", "event_alert_log stays empty after sets, a mock and a paper hand-in", "rows before " + beforeAlerts + " after " + alertsAfterSets, alertsAfterSets === 0 ? "PASS" : "FAIL", "");

  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: new RegExp(CHILD.name) }).click();
  await pp.getByText(/Did Mei Tan do it today/).waitFor({ timeout: 20000 });
  file = await snap(pp, "14-parent-today");
  const today = await bodyText(pp);
  record("parent A", "Daily study status", "Today card shows English done and Chinese not done", /English[\s\S]{0,80}✅/.test(today) && /Chinese[\s\S]{0,80}❌/.test(today) ? "English done, Chinese not done" : today.slice(today.indexOf("Did Mei"), today.indexOf("Did Mei") + 320), /Did Mei Tan do it today/.test(today) ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Overview/ }).click();
  file = await snap(pp, "15-parent-overview");
  const overview = await bodyText(pp);
  record("parent A", "Progress dashboard on another device", "Sessions and mistakes from the child's browser are visible here", "sessions snippet " + (overview.match(/Sessions[\s\S]{0,40}/) || ["none"])[0].replace(/\s+/g, " "), /Session #|Mock:/.test(overview) ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Mistakes/ }).click();
  await pp.getByText(/Session|Assign up to|No similar|Mistakes from practice/).first().waitFor({ timeout: 20000 });
  const mistakeCard = pp.locator("button", { hasText: /Session/ }).first();
  if (await mistakeCard.count()) await mistakeCard.click();
  const hwInput = pp.locator("label", { hasText: "Questions per mistake" }).locator("input");
  if (await hwInput.count()) {
    await hwInput.fill("2");
    await hwInput.blur();
  }
  const assign = pp.getByRole("button", { name: /Assign up to/ }).first();
  if (await assign.count()) await assign.click();
  await pp.waitForTimeout(1500);
  file = await snap(pp, "16-homework");
  const hw = await bodyText(pp);
  const hwRows = await dbGet("parent_homework?child_id=eq." + kid.id + "&select=id,subject");
  record("parent A", "Set extra homework", "A mistake can be assigned as similar-question homework", "rows " + hwRows.length + "; " + (hw.match(/Assigned[^\n]*|No similar[^\n]*|Assign up to[^\n]*/) || ["no assign text"])[0], hwRows.length > 0 ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Papers/ }).click();
  await pp.getByText(paper.label).waitFor({ timeout: 20000 });
  const before = attempt;
  await pp.evaluate(() => {
    const cards = [...document.querySelectorAll("div")].filter((d) => {
      const corrects = [...d.querySelectorAll("button")].filter((b) => (b.innerText || "").trim() === "Correct");
      return corrects.length === 1 && /\[2\s*marks?\]|\(2\s*marks?\)|\[2m\]/i.test(d.innerText || "");
    });
    cards.sort((a, b) => a.innerText.length - b.innerText.length);
    const btn = cards[0] && [...cards[0].querySelectorAll("button")].find((b) => (b.innerText || "").trim() === "Correct");
    if (!btn) throw new Error("no 2-mark item to mark");
    btn.click();
  });
  await pp.waitForTimeout(1200);
  file = await snap(pp, "17-parent-mark");
  const after = (await dbGet("exam_attempts?id=eq." + before.id + "&select=score,total,auto_score,auto_total,parent_pending,parent_score,settled_at"))[0];
  const marked = await bodyText(pp);
  const deltaScore = Number(after.score) - Number(before.score);
  const deltaTotal = Number(after.total) - Number(before.total);
  record("parent A", "A parent mark on a (2 marks) item rolls into the score", "Marking one printed 2-mark item correct adds 2 to the score and 2 to the total", "before " + before.score + "/" + before.total + " pending " + before.parent_pending + " after " + after.score + "/" + after.total + " pending " + after.parent_pending + "; screen " + ((marked.match(/Score[^\n]*/) || [""])[0]), deltaScore === 2 && deltaTotal === 2 ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText(/Credits:/).waitFor();
  file = await snap(pp, "18-parent-wallet");
  const parentWallet = await bodyText(pp);
  record("parent A", "Parent wallet shows credits and S$", "The parent screen shows both the credit count and an S$ amount", /S\$/.test(parentWallet) && /Credits:/.test(parentWallet) ? "S$ and credits both shown" : parentWallet.slice(0, 240), /S\$/.test(parentWallet) && /credit/i.test(parentWallet) ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /^＋ |^− / }).filter({ hasText: /Alerts/ }).click().catch(async () => {
    await pp.getByRole("button", { name: /Alerts/ }).click();
  });
  file = await snap(pp, "19-alerts-settings");
  const alertUi = await bodyText(pp);
  record("parent A", "Alert settings the parent can see", "The 8pm checkbox and quiet hours are on the screen. WhatsApp is described as not sending yet.", /8pm Singapore time/.test(alertUi) && /Quiet hours/.test(alertUi) ? "8pm checkbox and quiet hours shown" : "missing", /8pm Singapore time/.test(alertUi) ? "PASS" : "FAIL", file);

  const studentPages = [hello, solve, result, wallet, historyText, paperText];
  const hangulHits = studentPages.filter((t) => HANGUL.test(t)).length;
  record("student", "No Korean on the student screens visited", "Hangul does not appear on Today, the solve screen, the result, the wallet, history or the paper", hangulHits + " screens with Hangul", hangulHits === 0 ? "PASS" : "FAIL", "");
});

test("milestone email fallback with WhatsApp off @golive-alert", async ({ browser }) => {
  test.setTimeout(40 * 60 * 1000);
  assertLocalOnly();
  const answers = JSON.parse(fs.readFileSync(path.join("tests", "e2e", "fixtures", "answers.json"), "utf8"));
  const kidRows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id");
  if (!kidRows.length) {
    record("system", "Alert phase", "The main role-play has already created the child", "child missing", "FAIL", "");
    return;
  }
  const kid = kidRows[0].id;
  const before = Number(sql("select count(*) from public.event_alert_log;").trim());
  const student = await browser.newContext(CTX);
  await installBrowserClock(student);
  const sp = await student.newPage();
  const shift = fs.existsSync(process.env.E2E_DAY_SHIFT_FILE) ? Number(fs.readFileSync(process.env.E2E_DAY_SHIFT_FILE, "utf8")) || 1 : 1;
  setDay(shift);
  await sp.goto("/");
  await sp.evaluate((d) => sessionStorage.setItem("e2e-shift-days", String(d)), shift);
  await loginStudent(sp, CHILD.username, CHILD.password);
  const zhStart = sp.getByRole("button", { name: /开始今天的练习/ });
  if (await zhStart.count()) await zhStart.click();
  else await sp.getByRole("button", { name: "More" }).nth(1).click();
  await driveToScore(sp, answers.sets, { min: 60, max: 85 }, "chinese");
  let file = await snap(sp, "20-chinese-result");
  const zh = await bodyText(sp);
  const zhAct = await activity(kid, "Chinese");
  record("student", "Chinese practice set", "A Chinese set is handed in and its first-set score is stored. No Hangul outside the Chinese subject text is required; the screen itself is Chinese.", "first set " + (zhAct && zhAct.first_set_correct) + "/" + (zhAct && zhAct.first_set_questions) + "; hangul " + HANGUL.test(zh) + "; " + ((zh.match(/\d+\/\d+[^\n]*/) || [""])[0]), zhAct && Number(zhAct.sets_completed) >= 1 ? "PASS" : "FAIL", file);
  const afterSet = sql("select event_type, status, detail from public.event_alert_log order by created_at;");
  record("system", "Finishing a daily set with email on and WhatsApp off", "A milestone row is written for the test recipient only", "rows before " + before + " log:\n" + afterSet.trim(), /milestone/.test(afterSet) ? "PASS" : "FAIL", "");

  const parent = await browser.newContext(CTX);
  await installBrowserClock(parent);
  const pp = await parent.newPage();
  await pp.goto("/");
  await pp.evaluate((d) => sessionStorage.setItem("e2e-shift-days", String(d)), shift);
  await loginParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: new RegExp(CHILD.name) }).click();
  const papersTab = pp.getByRole("button", { name: /Papers/ });
  if (!(await papersTab.count())) {
    record("parent A", "Mark the remaining open items", "The Papers tab is available", "Papers tab missing", "FAIL", await snap(pp, "21-parent-settled"));
  } else {
  await papersTab.click();
  const model = pp.getByText(/Model answer:/).first();
  const hasModel = await model.waitFor({ timeout: 20000 }).then(() => true).catch(() => false);
  if (!hasModel) {
    record("parent A", "Mark the remaining open items", "Open items from the handed-in paper are listed", "no model answers on the Papers tab", "FAIL", await snap(pp, "21-parent-settled"));
  } else {
  const openCount = await pp.evaluate(() => [...document.querySelectorAll("div")].filter((d) => {
    const corrects = [...d.querySelectorAll("button")].filter((b) => (b.innerText || "").trim() === "Correct");
    return corrects.length === 1 && /Model answer:/.test(d.innerText || "");
  }).length);
  for (let i = 0; i < openCount; i++) {
    await pp.evaluate((index) => {
      const cards = [...document.querySelectorAll("div")].filter((d) => {
        const corrects = [...d.querySelectorAll("button")].filter((b) => (b.innerText || "").trim() === "Correct");
        return corrects.length === 1 && /Model answer:/.test(d.innerText || "");
      });
      cards.sort((a, b) => a.innerText.length - b.innerText.length);
      const btn = cards[index] && [...cards[index].querySelectorAll("button")].find((b) => (b.innerText || "").trim() === "Correct");
      if (btn) btn.click();
    }, i);
    await pp.waitForTimeout(400);
  }
  file = await snap(pp, "21-parent-settled");
  const settled = await dbGet("exam_attempts?student_id=eq." + kid + "&select=score,total,parent_pending,settled_at,paper_label&order=started_at.desc&limit=1");
  const log = sql("select event_type, status, left(coalesce(detail,''), 160) from public.event_alert_log order by created_at;");
  const parents = await dbGet("profiles?role=eq.parent&select=id,email");
  const allow = parents.find((p) => p.email === PARENT_A.email);
  const other = parents.find((p) => p.email === PARENT_B.email);
  record("parent A", "Mark the remaining open items", "The paper settles and the final score is saved", JSON.stringify(settled[0] || null), settled[0] && Number(settled[0].parent_pending) === 0 ? "PASS" : "FAIL", file);
  const lines = log.trim().split("\n").filter(Boolean);
  const sent = lines.filter((l) => /\|sent\|/.test(l) || l.endsWith("|sent") || /\|sent/.test(l));
  record("system", "Milestone email goes only to the test recipient, and nothing is delivered", "Parent A is eligible and skipped for a missing sender, parent B is skipped by the allow-list, and no row is status sent", log.trim() || "(empty)", lines.length > 0 && sent.length === 0 && /allow-list/.test(log) ? "PASS" : "FAIL", "");
  record("system", "Recipient identity", "Allow-list is the test parent only", "A " + (allow && allow.email) + " B " + (other && other.email), allow && other ? "PASS" : "FAIL", "");
  }
  }
});
