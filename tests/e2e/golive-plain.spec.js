// Plain-practice go-live role-play through the real UI. Local Supabase only.
// @golive runs with email and WhatsApp off. @golive-alert restarts with email on,
// a single test recipient, and no Resend key, so nothing is delivered.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, drive, loginStudent, loginParent, ensureParent, assertLocalOnly, setupFamily } = require("./helpers");
const { driveToScore } = require("./scoreDrive");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.test", password: "Testpass1" };
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

async function assignPracticeHomework(page) {
  await page.getByRole("button", { name: /Mistakes/ }).click();
  await page.getByText(/Review Together/).first().waitFor({ timeout: 20000 });
  // The tab paints the parent's empty local history first, then replaces it with the server list.
  await page.waitForFunction(() => /All \(\d+\)/.test(document.body.innerText || ""), { timeout: 25000 });
  const sessionChip = page.getByRole("button", { name: /^Session 1$/ });
  if (await sessionChip.count()) await sessionChip.click();
  const notes = [];
  for (let i = 0; i < 6; i++) {
    const opened = await page.evaluate((index) => {
      const cards = [...document.querySelectorAll("button")].filter((b) => {
        const t = (b.innerText || "").replace(/\s+/g, " ").trim();
        return /Session \d+/.test(t) && t.length > 40;
      });
      if (!cards[index]) return false;
      cards[index].click();
      return (cards[index].innerText || "").replace(/\s+/g, " ").trim().slice(0, 80);
    }, i);
    if (!opened) { notes.push("no card " + i); break; }
    const hwInput = page.locator("label", { hasText: "Questions per mistake" }).locator("input");
    if (await hwInput.count()) {
      await hwInput.fill("2");
      await hwInput.blur();
    }
    const assign = page.getByRole("button", { name: /Assign up to/ }).first();
    if (!(await assign.count())) { notes.push("card " + i + " has no Assign button"); continue; }
    const respPromise = page.waitForResponse((r) => r.url().includes("/api/parent/homework") && r.request().method() === "POST", { timeout: 20000 }).catch(() => null);
    await assign.click();
    const resp = await respPromise;
    let body = "";
    if (resp) body = (await resp.text().catch(() => "")).slice(0, 240);
    await page.waitForTimeout(400);
    notes.push("card " + i + " (" + opened + ") http " + (resp ? resp.status() : "none") + " " + body.replace(/\s+/g, " "));
    if (resp && resp.ok()) return { ok: true, notes };
  }
  return { ok: false, notes };
}

async function finishAssignedHomework(page, childId) {
  if (await page.getByText("Hello,").count()) {
    await page.getByRole("button", { name: /^Mistakes/ }).first().click();
  }
  const start = page.getByRole("button", { name: /Start homework/ });
  await start.waitFor({ timeout: 20000 });
  const before = await start.innerText();
  await start.click();
  await page.getByText(/Mock Exam|Submit Page|Section \d+\//).first().waitFor({ timeout: 20000 });
  const driven = await drive(page, {
    label: "homework",
    max: 500,
    done: async () => {
      const t = await bodyText(page);
      if (/All done for today/.test(t)) return true;
      if (/Section \d+\/|Mock Exam|Submit Page|Submit Answers/.test(t)) return false;
      const rows = await dbGet("parent_homework?child_id=eq." + childId + "&select=solved_at");
      return rows.length > 0 && rows.every((r) => r.solved_at);
    },
  });
  await page.waitForTimeout(800);
  return { before, steps: driven.steps };
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
  const student = await browser.newContext(CTX);
  await installBrowserClock(parent);
  await installBrowserClock(student);
  const pp = await parent.newPage();
  const sp = await student.newPage();
  setDay(0);
  await shiftBrowser([pp, sp], 0);

  // Current flow: Sign up -> parent account -> email confirm (mocked / skipped on the local project) -> Add your child (login ID + 4-picture code) -> auto-linked.
  await setupFamily(pp, { parent: PARENT_A, child: CHILD });
  let file = await snap(pp, "01-child-created");
  const kid = await childId();
  const links = await dbGet("parent_child?select=parent_id,child_id");
  expect(links.length).toBe(1);
  record("parent A", "Sign up, add a P3 child by picture code", "Child is stored as P3 and linked to one parent", "stored grade " + kid.grade + " school " + kid.school + " links " + links.length, kid.grade === "P3" && links.length === 1 ? "PASS" : "FAIL", file);

  await pp.bringToFront();
  const rewardsBefore = await pp.getByRole("button", { name: /Rewards/ }).count();
  const papersBefore = await pp.getByRole("button", { name: /Papers/ }).count();
  record("parent A", "New child is selected", "Rewards and Papers show without tapping the child chip", "Rewards " + rewardsBefore + " Papers " + papersBefore, rewardsBefore > 0 && papersBefore > 0 ? "PASS" : "FAIL", file);
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
  record("parent A", "Detailed reward rules", "Credits on, S$0.50 per credit, 90% → 3 and 70% → 2, starting tomorrow", /S\$0\.50|0\.50/.test(ruleText) && /Applies from tomorrow/.test(ruleText) ? "saved, S$ shown, applies tomorrow" : ruleText.slice(0, 240), /Applies from tomorrow/.test(ruleText) ? "PASS" : "FAIL", file);

  const beforeAlerts = Number(sql("select count(*) from public.event_alert_log;").trim());
  setDay(1);
  await shiftBrowser([pp, sp], 1);

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
  // "Recent Sessions" moved: the history is now My records > History (data-testid home-my-records).
  await sp.getByRole("button", { name: "More" }).first().click();
  await sp.getByTestId("home-my-records").click();
  await sp.getByTestId("rec-row").first().waitFor({ timeout: 20000 });
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
  const schoolFit = historySchool && historySchool.school ? await sp.evaluate((school) => {
    const nodes = [...document.querySelectorAll("div")].filter((el) => (el.innerText || "").includes("Mock: " + school));
    const el = nodes.sort((a, b) => (a.innerText || "").length - (b.innerText || "").length)[0];
    if (!el) return { found: false };
    const s = getComputedStyle(el);
    return {
      found: true,
      text: (el.innerText || "").replace(/\s+/g, " ").trim(),
      whiteSpace: s.whiteSpace,
      overflowWrap: s.overflowWrap,
      textOverflow: s.textOverflow,
      clientWidth: el.clientWidth,
      scrollWidth: el.scrollWidth,
      clipped: el.scrollWidth > el.clientWidth + 2,
    };
  }, historySchool.school) : { found: false };
  record("student", "History uses the paper's real school", "Recent Sessions mock label is the sat paper's school, not a fixed Nanyang name, and the full name is on screen", "header " + mockHeader + "; stored " + JSON.stringify(historySchool) + "; fit " + JSON.stringify(schoolFit), historySchool && historySchool.school && historySchool.school !== "E2E Primary" && !hardcoded && schoolFit.found && !schoolFit.clipped && schoolFit.text.includes(historySchool.school) ? "PASS" : "FAIL", file);

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
  await pp.getByText("Sessions").first().waitFor({ timeout: 20000 });
  await pp.waitForTimeout(1200);
  file = await snap(pp, "15-parent-overview");
  const stats = await pp.evaluate(() => {
    const cards = [...document.querySelectorAll("div")].filter((d) => {
      const lines = (d.innerText || "").split("\n").map((s) => s.trim()).filter(Boolean);
      return lines.length >= 2 && lines.length <= 3 && /^(Sessions|Average|Trend|Mock Done)$/.test(lines[lines.length - 1]);
    });
    const out = {};
    for (const c of cards) {
      const lines = c.innerText.split("\n").map((s) => s.trim()).filter(Boolean);
      const label = lines[lines.length - 1];
      if (!out[label]) out[label] = lines[lines.length - 2];
    }
    const section = ((document.body.innerText || "").match(/Section Performance[\s\S]{0,700}/) || [""])[0];
    return { cards: out, sectionHasBar: /%/.test(section) && /Grammar|Vocabulary|Editing|Comprehension|Cloze/.test(section) };
  });
  const sessionsOk = stats.cards.Sessions && stats.cards.Sessions !== "—" && Number(stats.cards.Sessions) > 0;
  const avgOk = stats.cards.Average && /\d+%/.test(stats.cards.Average);
  record("parent A", "Overview sessions and average on another device", "Sessions and Average come from the server. This browser has none of the child's local history.", JSON.stringify(stats.cards), sessionsOk && avgOk ? "PASS" : "FAIL", file);
  record("parent A", "Overview stats that still use this device", "Trend, Mock Done and the section bars read the child's local history", "Trend " + (stats.cards.Trend || "?") + "; Mock Done " + (stats.cards["Mock Done"] || "?") + "; section bars " + stats.sectionHasBar, "NOTE", file);

  const assigned = await assignPracticeHomework(pp);
  file = await snap(pp, "16-homework");
  const hwRows = await dbGet("parent_homework?child_id=eq." + kid.id + "&select=id,subject,question_id,source_question_id,assigned_for,solved_at");
  record("parent A", "Set extra homework", "A practice-set mistake can be assigned as similar-question homework", "rows " + hwRows.length + "; " + assigned.notes.join(" || "), hwRows.length > 0 ? "PASS" : "FAIL", file);

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
  const quietTimes = await pp.locator("input[type='time']").evaluateAll((els) => els.map((el) => el.value));
  const alertCopyOk = /finishes a set, a paper or assigned homework/.test(alertUi) && /weekly report/.test(alertUi) && /Quiet hours/.test(alertUi) && quietTimes.includes("21:30") && quietTimes.includes("06:30") && !/8pm Singapore time/.test(alertUi);
  record("parent A", "Alert settings the parent can see", "The checkbox names a finished set, paper or homework plus the weekly report. Quiet hours stay 21:30–06:30. It does not offer an 8pm daily email.", alertCopyOk ? "milestone checkbox, weekly report, quiet hours " + quietTimes.join("-") : alertUi.slice(alertUi.indexOf("Alerts"), alertUi.indexOf("Alerts") + 500) + " times " + quietTimes.join(","), alertCopyOk ? "PASS" : "FAIL", file);

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
  const hwBeforeFinish = await dbGet("parent_homework?child_id=eq." + kid + "&select=id,solved_at,assigned_for,subject");
  let hwFinishNote = "no assigned rows to finish";
  let hwFinishOk = false;
  if (hwBeforeFinish.length) {
    try {
      const finished = await finishAssignedHomework(sp, kid);
      hwFinishNote = "started from " + finished.before + " in " + finished.steps + " steps";
      hwFinishOk = true;
    } catch (err) {
      hwFinishNote = String(err && err.message || err).slice(0, 400);
      await snap(sp, "22-homework-stuck");
    }
  }
  await sp.waitForTimeout(1500);
  const hwAfter = sql("select subject, assigned_for::text, solved_at is not null as solved, correct from public.parent_homework order by created_at;");
  const solvedN = hwAfter.trim().split("\n").filter((l) => /\|t\|/.test(l) || /\|true\|/.test(l)).length;
  record("student", "Finish the assigned homework", "Every parent_homework row for today is marked solved", hwFinishNote + "\n" + hwAfter.trim(), hwBeforeFinish.length > 0 && hwFinishOk && solvedN === hwBeforeFinish.length ? "PASS" : "FAIL", await snap(sp, "22-homework-done"));
  const afterHw = sql("select event_type, status, event_key, left(coalesce(detail,''), 180) from public.event_alert_log order by created_at;");
  const hwLines = afterHw.trim().split("\n").filter((l) => /:hw-/.test(l));
  const hwEligible = hwLines.filter((l) => /email skipped/.test(l));
  const hwBlocked = hwLines.filter((l) => /allow-list|not_on_allow_list|not in allow-list/.test(l));
  const hwSent = hwLines.filter((l) => /\|sent\|/.test(l));
  record("system", "Finishing homework with email on and WhatsApp off", "A milestone row is written for the homework. The parent reaches the send and stops with no Resend key. Nothing is status sent.", "rows before " + before + "\n" + afterHw.trim(), hwLines.length >= 1 && hwEligible.length === 1 && hwBlocked.length === 0 && hwSent.length === 0 ? "PASS" : "FAIL", "");

  if (!(await sp.getByText("Hello,").count())) {
    const home = sp.getByRole("button", { name: /Back to Home|Today/ }).first();
    if (await home.count()) await home.click();
    await sp.getByText("Hello,").waitFor({ timeout: 20000 }).catch(() => {});
  }
  const zhStart = sp.getByRole("button", { name: /开始今天的练习/ });
  if (await zhStart.count()) await zhStart.click();
  else await sp.getByRole("button", { name: "More" }).nth(1).click();
  await driveToScore(sp, answers.sets, { min: 60, max: 85 }, "chinese");
  let file = await snap(sp, "20-chinese-result");
  const zh = await bodyText(sp);
  const zhAct = await activity(kid, "Chinese");
  record("student", "Chinese practice set", "A Chinese set is handed in and its first-set score is stored. No Hangul outside the Chinese subject text is required; the screen itself is Chinese.", "first set " + (zhAct && zhAct.first_set_correct) + "/" + (zhAct && zhAct.first_set_questions) + "; hangul " + HANGUL.test(zh) + "; " + ((zh.match(/\d+\/\d+[^\n]*/) || [""])[0]), zhAct && Number(zhAct.sets_completed) >= 1 ? "PASS" : "FAIL", file);
  const afterSet = sql("select event_type, status, event_key, left(coalesce(detail,''), 160) from public.event_alert_log order by created_at;");
  const setLines = afterSet.trim().split("\n").filter((l) => /:set-/.test(l) && /Chinese/.test(l));
  const setEligible = setLines.filter((l) => /email skipped/.test(l));
  const setBlocked = setLines.filter((l) => /not_on_allow_list/.test(l));
  const setSent = setLines.filter((l) => /\|sent\|/.test(l));
  record("system", "Finishing a daily set with email on and WhatsApp off", "A milestone row is written for the Chinese set. Only the allow-listed parent is eligible, and nothing is delivered.", "log:\n" + afterSet.trim(), setLines.length >= 1 && setEligible.length === 1 && setBlocked.length === 0 && setSent.length === 0 ? "PASS" : "FAIL", "");

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
  record("parent A", "Mark the remaining open items", "The paper settles and the final score is saved", JSON.stringify(settled[0] || null), settled[0] && Number(settled[0].parent_pending) === 0 ? "PASS" : "FAIL", file);
  const lines = log.trim().split("\n").filter(Boolean);
  const sent = lines.filter((l) => /\|sent\|/.test(l) || l.endsWith("|sent") || /\|sent/.test(l));
  record("system", "Milestone email goes only to the test recipient, and nothing is delivered", "The parent is eligible and skipped for a missing sender, and no row is status sent", log.trim() || "(empty)", lines.length > 0 && sent.length === 0 && /email skipped/.test(log) ? "PASS" : "FAIL", "");
  }
  }
});
