const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, drive, loginStudent, loginParent, ensureParent, ensureStudent, assertLocalOnly } = require("./helpers");
const { execFileSync } = require("child_process");
const { driveToScore } = require("./scoreDrive");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.com", password: "Testpass1" };
const PARENT_B = { name: "Mr Tan", email: "mr.tan.e2e@example.com", password: "Testpass2" };
const CHILD = { username: "amir_e2e", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const ALERTS = process.env.ALERT_DRY_RUN_LOG || path.join("tests", "e2e", ".state", "alerts.jsonl");
const STEPS = [];
const UX = [];

function record(role, step, expected, actual, status, screenshot) {
  const row = { role, step, expected, actual, status, screenshot: screenshot || "" };
  STEPS.push(row);
  fs.mkdirSync(path.join("tests", "e2e", ".state"), { recursive: true });
  fs.writeFileSync(path.join("tests", "e2e", ".state", "roleplay-steps.json"), JSON.stringify({ steps: STEPS, ux: UX }, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${actual}`);
}

function ux(note) { UX.push(note); console.log("[UX] " + note); }

async function snap(page, name) {
  try { return await shot(page, "rp-" + name); }
  catch (e) { return ""; }
}

function alerts() {
  if (!fs.existsSync(ALERTS)) return [];
  return fs.readFileSync(ALERTS, "utf8").split("\n").filter(Boolean).map((line) => {
    try { return JSON.parse(line); } catch { return null; }
  }).filter(Boolean);
}

function pctOf(row) {
  if (!row) return null;
  const q = Number(row.first_set_questions);
  const c = Number(row.first_set_correct);
  if (!(q > 0)) return null;
  return Math.floor((Math.min(c, q) / q) * 100);
}

function tierOf(pct) {
  if (pct == null) return 0;
  if (pct >= 90) return 3;
  if (pct >= 80) return 2;
  return 0;
}

function skillKey(r) {
  if (!r) return null;
  if (typeof r.skill === "string" && r.skill) return r.skill;
  if (typeof r.trapType === "string" && r.trapType && r.trapType.length <= 24) return r.trapType;
  return r.sectionType ? "sec:" + r.sectionType : (r.section ? "sec:" + r.section : null);
}

async function confirmParents() {
  const rows = await dbGet("profiles?role=eq.parent&select=id");
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
  const rows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id");
  if (!rows.length) throw new Error("child missing");
  return rows[0].id;
}

async function activity(id, subject) {
  const rows = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq." + subject + "&select=date,sets_completed,questions_answered,correct,first_set_questions,first_set_correct&order=date.desc");
  return rows[0] || null;
}

async function credits(id, subject, kind) {
  let q = "reward_credits?child_id=eq." + id + "&subject=eq." + subject + "&select=kind,credits,status,score_pct,sgd_per_credit,gate_day,period";
  if (kind) q += "&kind=eq." + kind;
  return dbGet(q);
}

async function goHub(page) {
  const today = page.getByRole("button", { name: "Today" }).first();
  if (await today.count()) {
    await today.click();
    const hello = page.getByText(/Hello,/);
    if (await hello.count()) { await hello.waitFor({ timeout: 15000 }).catch(() => {}); return; }
  }
  await page.goto("/");
  await page.getByText(/Hello,|Welcome back/).first().waitFor({ timeout: 20000 });
}

async function finishNav(page) {
  const home = page.getByRole("button", { name: /Back to Home|返回主页/ }).first();
  if (await home.count()) await home.click();
  await page.getByText(/Hello,|Welcome back/).first().waitFor({ timeout: 20000 });
}

async function cron() {
  const secret = process.env.CRON_SECRET || "e2e-cron-secret";
  const r = await fetch((process.env.E2E_BASE_URL || "http://127.0.0.1:3000") + "/api/cron/daily-alert", {
    headers: { Authorization: "Bearer " + secret },
  });
  const text = await r.text();
  let body = null;
  try { body = JSON.parse(text); } catch { body = { raw: text.slice(0, 300) }; }
  return { status: r.status, body };
}

test.describe.configure({ mode: "serial" });

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
    }
    Shifted.parse = Real.parse;
    Shifted.UTC = Real.UTC;
    window.Date = Shifted;
  });
}

function setDay(days) {
  const file = process.env.E2E_DAY_SHIFT_FILE;
  const container = process.env.E2E_DB_CONTAINER;
  if (!file || !container) throw new Error("E2E_DAY_SHIFT_FILE and E2E_DB_CONTAINER are required");
  fs.writeFileSync(file, String(days));
  execFileSync("sudo", ["docker", "exec", container, "psql", "-U", "postgres", "-v", "ON_ERROR_STOP=1", "-c", "update public.e2e_clock set shift_days = " + Number(days)], { stdio: "inherit" });
}

async function shiftBrowser(pages, days) {
  for (const page of pages) {
    await page.evaluate((d) => sessionStorage.setItem("e2e-shift-days", String(d)), days).catch(() => {});
  }
}

test("student and parent role-play across SGT days @roleplay", async ({ browser }) => {
  test.setTimeout(80 * 60 * 1000);
  assertLocalOnly();
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && String(process.env.NEXT_PUBLIC_SUPABASE_URL).includes("zehnulwvysvnsshunxzr")) {
    throw new Error("refusing production");
  }
  const answers = JSON.parse(fs.readFileSync(path.join("tests", "e2e", "fixtures", "answers.json"), "utf8"));
  fs.mkdirSync(path.dirname(ALERTS), { recursive: true });
  fs.writeFileSync(ALERTS, "");

  const parent = await browser.newContext(CTX);
  await installBrowserClock(parent);
  const pp = await parent.newPage();
  const parentB = await browser.newContext(CTX);
  await installBrowserClock(parentB);
  const student = await browser.newContext(CTX);
  await installBrowserClock(student);
  const sp = await student.newPage();
  // Day 0 of this story is a Thursday. The VM date is whatever today is, so shift back to Thursday
  // before anyone saves a setting. Later days are Thursday + n.
  const dow = new Date(Date.now() + 8 * 3600 * 1000).getUTCDay();
  const BASE = -((dow - 4 + 7) % 7);
  const ymd = (n) => new Date(Date.now() + (BASE + n) * 86400000 + 8 * 3600 * 1000).toISOString().slice(0, 10);
  const SUN = ymd(3);
  const MON = ymd(4);
  setDay(BASE);
  await shiftBrowser([pp, sp], BASE);
  console.log("anchored Thursday shift " + BASE + " " + ymd(0) + " sunday " + SUN + " monday " + MON);

  // —— Thursday: two parents, one child, rules that start tomorrow ——
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
  await pp.getByTestId("ac-username").fill(CHILD.username);
  await pp.getByTestId("ac-first").fill(CHILD.name);
  await pp.getByPlaceholder("School").fill(CHILD.school);
  await pp.getByPlaceholder("Child's password (min 6 chars)").fill(CHILD.password);
  await pp.getByRole("button", { name: "Check", exact: true }).click();
  await expect(pp.getByTestId("ac-name-status")).toBeVisible();
  await pp.getByRole("button", { name: "Create child account" }).click();
  await expect(pp.getByText(/Created\./)).toBeVisible();
  let file = await snap(pp, "01-child-created");
  record("parent A", "Sign up and create the child", "Mrs Tan has a linked child", "Created " + CHILD.username, "PASS", file);

  await pp.getByRole("button", { name: /Invite another parent/ }).click();
  await pp.getByPlaceholder(/Other parent's email/).fill(PARENT_B.email);
  await pp.getByRole("button", { name: "Send invite" }).click();
  await expect(pp.getByText(/Invite created/)).toBeVisible();
  const pb = await parentB.newPage();
  await shiftBrowser([pb], BASE);
  await pb.goto("/");
  await pb.getByRole("button", { name: /Parent Sign Up/ }).click();
  await pb.getByPlaceholder("e.g. Mrs Lee").fill(PARENT_B.name);
  await pb.getByPlaceholder("you@example.com").fill(PARENT_B.email);
  await pb.getByPlaceholder("Create a password").fill(PARENT_B.password);
  await pb.getByPlaceholder("Re-enter password").fill(PARENT_B.password);
  await pb.getByRole("button", { name: "Create Parent Account" }).click();
  await pb.getByText(/invited you to follow/).waitFor({ timeout: 20000 });
  file = await snap(pb, "02-invite");
  await pb.getByRole("button", { name: "Accept" }).click();
  await pb.getByRole("button", { name: new RegExp(CHILD.name) }).waitFor({ timeout: 20000 });
  const links = await dbGet("parent_child?select=parent_id,child_id");
  file = await snap(pb, "03-both-parents");
  record("parent B", "Accept the invite and see the same child", "parent_child has 2 rows and Amir is on the dashboard", "parent_child rows " + links.length, links.length === 2 ? "PASS" : "FAIL", file);
  await confirmParents();

  const id = await childId();
  await pp.bringToFront();
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText("Reward rules").waitFor();
  await pp.locator("label", { hasText: "Turn on credits" }).locator("input").check();
  await pp.locator("label", { hasText: "SGD value of 1 credit" }).locator("input").fill("0.5");
  await pp.getByRole("button", { name: "+ Add tier" }).click();
  await pp.getByRole("button", { name: "+ Add tier" }).click();
  const nums = pp.locator('input[type="number"]');
  await nums.nth(1).fill("90");
  await nums.nth(2).fill("3");
  await nums.nth(3).fill("80");
  await nums.nth(4).fill("2");
  await pp.locator("select").first().selectOption("sgd");
  await pp.locator("label", { hasText: /^English/ }).first().locator("input").fill("5");
  await pp.locator("label", { hasText: /^Chinese/ }).first().locator("input").fill("4");
  const paperEnglish = pp.locator("label", { hasText: /^English/ });
  let paperFilled = false;
  if (await paperEnglish.count() >= 2) {
    await pp.locator("select").nth(1).selectOption("sgd");
    await paperEnglish.nth(1).locator("input").fill("6");
    const effort = pp.locator("label", { hasText: "Effort check" }).locator("input");
    if (await effort.count() && !(await effort.isChecked())) await effort.check();
    paperFilled = true;
  }
  await pp.getByRole("button", { name: "Save rules" }).click();
  await expect(pp.getByText(/Saved\. Applies from tomorrow/)).toBeVisible();
  file = await snap(pp, "04-rules-tomorrow");
  const versions = await dbGet("child_setting_versions?child_id=eq." + id + "&select=effective_from,enabled,sgd_per_credit,daily_tiers,weekly_unit,weekly_amounts&order=effective_from.desc");
  const saved = versions[0];
  const tiersOk = saved && saved.daily_tiers.some((t) => t.minPct === 90 && t.credits === 3) && saved.daily_tiers.some((t) => t.minPct === 80 && t.credits === 2) && !saved.daily_tiers.some((t) => t.minPct < 80);
  record("parent A", "Set tiers, exchange rate and Saturday reward", "90%+ is 3 credits, 80%+ is 2, below 80 is none, S$0.50 per credit, Saturday is S$5 English and S$4 Chinese, effective tomorrow", saved ? ("effective " + saved.effective_from + " rate " + saved.sgd_per_credit + " unit " + saved.weekly_unit + " weekly " + JSON.stringify(saved.weekly_amounts)) : "no version", tiersOk && Number(saved.sgd_per_credit) === 0.5 && saved.weekly_unit === "sgd" && saved.weekly_amounts.English === 5 ? "PASS" : "FAIL", file);
  const paperRule = await dbGet("child_setting_versions?child_id=eq." + id + "&select=paper_unit,paper_amounts,paper_check_off&order=effective_from.desc");
  const paperSaved = paperRule[0];
  record("parent A", "Saturday past-paper reward amount and effort check", "English paper reward is S$6, effort check stays on, and it is saved on the same version as the other rules", paperFilled ? JSON.stringify(paperSaved) : "The Saturday past-paper fields were not on the Rewards tab", paperFilled && paperSaved && paperSaved.paper_unit === "sgd" && Number(paperSaved.paper_amounts && paperSaved.paper_amounts.English) === 6 && paperSaved.paper_check_off === false ? "PASS" : "FAIL", file);

  await pb.bringToFront();
  await ensureParent(pb, PARENT_B.email, PARENT_B.password);
  await pb.getByRole("button", { name: /Settings/ }).click();
  const enSets = pb.locator("label", { hasText: "English sets per day" }).locator("input");
  await enSets.scrollIntoViewIfNeeded();
  await enSets.fill("2");
  await pb.getByRole("button", { name: "Save", exact: true }).click();
  await expect(pb.getByText(/Saved\. Applies from tomorrow/)).toBeVisible();
  await expect(pb.getByText(/English daily sets from 1 to 2/)).toBeVisible();
  file = await snap(pb, "05-parent-b-audit");
  const audit = await dbGet("child_setting_audit?child_id=eq." + id + "&select=changed_by_name,changes,effective_from&order=changed_at.desc");
  const auditHit = audit.find((a) => (a.changes || []).some((line) => /English daily sets from 1 to 2/.test(line)));
  const notice = alerts().filter((a) => /changed/.test(a.subject || "") && /Mrs Tan/.test(a.text || ""));
  record("parent B", "Edit the shared English target", "Applies next SGT day, an audit row is stored, and parent A is notified without a real email", auditHit ? (auditHit.changed_by_name + " effective " + auditHit.effective_from + "; dry-run emails " + notice.length) : "no audit row", auditHit && notice.length >= 1 ? "PASS" : "FAIL", file);
  if (notice.length) ux("The co-parent notice is only a dry-run while email is off. Parent A does not see it inside the app, only in the change log if she opens Settings.");

  await loginStudent(sp, CHILD.username, CHILD.password);
  await sp.getByText(/1 set left today/).first().waitFor({ timeout: 15000 });
  const thursdayTarget = await sp.evaluate(async () => {
    const r = await fetch("/api/student/daily-target", { credentials: "same-origin" });
    return r.json();
  });
  file = await snap(sp, "06-thursday-one-set");
  record("student", "Thursday target before the shared edit takes effect", "English is still 1 set today", "API English target " + (thursdayTarget.dailyTarget && thursdayTarget.dailyTarget.English) + "; screen shows 1 set left", thursdayTarget.dailyTarget && thursdayTarget.dailyTarget.English === 1 ? "PASS" : "FAIL", file);
  ux("Math and Science say Coming soon, so a third live subject score is not possible. The 60% set is a later English day.");

  await pp.bringToFront();
  await pp.goto("/");
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByText(/Did Amir Tan do it today/).waitFor({ timeout: 15000 });
  file = await snap(pp, "07-thursday-not-done");
  const thuText = await bodyText(pp);
  record("parent A", "Thursday daily status before any study", "English and Chinese show not done", /English[\s\S]{0,40}❌ 0\//.test(thuText) && /Chinese[\s\S]{0,40}❌ 0\//.test(thuText) ? "Not done, 0 sets" : thuText.slice(thuText.indexOf("Did Amir"), thuText.indexOf("Did Amir") + 280), /❌ 0\/1/.test(thuText) ? "PASS" : "FAIL", file);

  const beforeSkip = alerts().length;
  const skipCron = await cron();
  const skipMails = alerts().slice(beforeSkip).filter((a) => /Not done yet today/.test(a.subject || ""));
  const skipBodyOk = skipMails.filter((a) => /NOT DONE YET today: Amir Tan/.test(a.text || "") && /❌ Not done – English: 0\/1 set/.test(a.text || "") && /❌ Not done – Chinese: 0\/1 set/.test(a.text || ""));
  record("system", "8pm alert on a day with no study", "Both linked parents get a dry-run email that English and Chinese are not done. No real email is sent.", "HTTP " + skipCron.status + " dryRun=" + (skipCron.body && skipCron.body.summary && skipCron.body.summary.dryRun) + "; matching emails " + skipBodyOk.length + " of " + skipMails.length, skipCron.status === 200 && skipBodyOk.length >= 2 ? "PASS" : "FAIL", "");

  // —— Friday: rules apply, scored sets, homework, wallet, payout ——
  setDay(BASE + 1);
  await shiftBrowser([sp, pp, pb], BASE + 1);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  let friday = null;
  for (let i = 0; i < 20; i++) {
    friday = await sp.evaluate(async () => {
      const t = await fetch("/api/student/daily-target", { credentials: "same-origin" }).then((r) => r.json()).catch(() => ({}));
      const w = await fetch("/api/student/rewards", { credentials: "same-origin" }).then((r) => r.json()).catch(() => ({}));
      return { target: t.dailyTarget || null, serverToday: w.today || null, browser: new Date().toISOString(), text: document.body.innerText };
    });
    if (friday.text && friday.text.includes("2 sets left today")) break;
    await sp.waitForTimeout(1000);
  }
  file = await snap(sp, "08-friday-two-sets");
  const fridayOk = !!(friday && friday.target && friday.target.English === 2 && friday.text.includes("2 sets left today"));
  record("student", "Friday English target from parent B", "English now asks for 2 sets. Chinese stays 1.", "server " + (friday && friday.serverToday) + " browser " + (friday && friday.browser) + " target " + JSON.stringify(friday && friday.target) + " screenHas2=" + !!(friday && friday.text && friday.text.includes("2 sets left today")), fridayOk ? "PASS" : "FAIL", file);
  if (!fridayOk) ux("Friday screen text: " + String(friday && friday.text || "").replace(/\s+/g, " ").slice(0, 300));

  await sp.getByRole("button", { name: "Start today's set" }).first().click();
  await driveToScore(sp, answers.sets.S01, { min: 100, max: 100 }, "english-92");
  file = await snap(sp, "09-english-92");
  await finishNav(sp);
  let en = await activity(id, "English");
  let enPct = pctOf(en);
  let enCredits = await credits(id, "English", "daily");
  record("student", "English first set around 92%", "First-try score is 90 or higher and earns 3 credits, still pending", "first set " + (en && en.first_set_correct) + "/" + (en && en.first_set_questions) + " = " + enPct + "%; credit " + (enCredits[0] && enCredits[0].credits) + " status " + (enCredits[0] && enCredits[0].status), enPct >= 90 && enCredits.length === 1 && enCredits[0].credits === 3 && enCredits[0].status === "pending" ? "PASS" : "FAIL", file);

  await sp.getByRole("button", { name: /Start today's set|Extra set/ }).first().click();
  await driveToScore(sp, answers.sets.S02, { min: 0, max: 70 }, "english-redo");
  await finishNav(sp);
  const en2 = await activity(id, "English");
  const enCredits2 = await credits(id, "English", "daily");
  record("student", "A second English set does not change the first-try score", "first_set stays " + (en && en.first_set_correct) + "/" + (en && en.first_set_questions) + " and there is still one English daily credit of " + tierOf(enPct), "sets " + en2.sets_completed + " first_set " + en2.first_set_correct + "/" + en2.first_set_questions + "; credit rows " + enCredits2.length + " credits " + (enCredits2[0] && enCredits2[0].credits), en2.first_set_correct === en.first_set_correct && en2.first_set_questions === en.first_set_questions && en2.sets_completed === 2 && enCredits2.length === 1 && enCredits2[0].credits === tierOf(enPct) ? "PASS" : "FAIL", await snap(sp, "10-english-redo"));

  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  await sp.getByText("Your patterns", { exact: true }).waitFor();
  const causes = ["Didn't know the concept", "Misread the question", "Calculation slip", "Fell for a trap", "Ran out of time", "Guessed"];
  let tagged = 0;
  let missingCauses = [];
  for (let i = 0; i < 25; i++) {
    const card = sp.locator("button", { hasText: "cause not picked" }).first();
    if (!(await card.count())) break;
    await card.click();
    if (tagged === 0) {
      for (const label of causes) {
        if (!(await sp.getByRole("button", { name: label, exact: true }).count())) missingCauses.push(label);
      }
    }
    const label = causes[tagged % causes.length];
    const btn = sp.getByRole("button", { name: label }).first();
    if (!(await btn.count())) break;
    await btn.click();
    tagged++;
  }
  const patternCount = await sp.getByText(/Your patterns/i).count();
  file = await snap(sp, "11-patterns");
  const patternText = await bodyText(sp);
  const sawCause = /Didn't know the concept|Misread the question|Fell for a trap|Guessed/.test(patternText);
  record("student", "Cause on each mistake and Your patterns", "All 6 English cause labels are on the card, cards get a cause, and Your patterns lists those causes", "Tagged " + tagged + " cards. Missing labels: " + (missingCauses.join(", ") || "none") + ". Cause labels on screen: " + sawCause + ". Your patterns blocks: " + patternCount, tagged > 0 && sawCause && patternCount > 0 && missingCauses.length === 0 ? "PASS" : "FAIL", file);

  const tryBtn = sp.locator("button", { hasText: /Try \d+ similar/ }).first();
  let similarNote = "No Try similar button was on the open cards.";
  let similarStatus = "FAIL";
  if (await tryBtn.count()) {
    try {
      await tryBtn.click();
      const started = await sp.waitForFunction(() => /Submit|提交|Check|确认|Similar questions|READ THE PASSAGE|阅读短文/.test(document.body.innerText), { timeout: 8000 }).then(() => true).catch(() => false);
      if (!started) {
        similarNote = "Try similar did not open a question. " + (await bodyText(sp)).replace(/\s+/g, " ").slice(0, 180);
      } else {
        await drive(sp, {
          label: "similar",
          max: 500,
          done: async () => {
            const t = await bodyText(sp);
            return t.includes("Your patterns") || t.includes("Didn't know the concept") || t.includes("Weak-spot drill");
          },
        });
        similarNote = "Finished a Try similar round and landed back on the notebook.";
        similarStatus = "PASS";
      }
    } catch (e) {
      similarNote = String(e.message || e).slice(0, 240);
    }
  }
  record("student", "Retry similar questions", "The student can practise the similar questions from a mistake", similarNote, similarStatus, await snap(sp, "12-similar"));

  await goHub(sp);
  await sp.getByRole("button", { name: "开始今天的练习" }).click();
  const chineseSets = Object.fromEntries(Object.entries(answers.sets).filter(([k]) => k.startsWith("ZS")));
  const englishSets = Object.fromEntries(Object.entries(answers.sets).filter(([k]) => k.startsWith("S")));
  await driveToScore(sp, chineseSets, { min: 100, max: 100 }, "chinese-83");
  file = await snap(sp, "13-chinese-83");
  await finishNav(sp);
  const zh = await activity(id, "Chinese");
  const zhPct = pctOf(zh);
  const zhCredits = await credits(id, "Chinese", "daily");
  record("student", "Chinese first set in the 80s", "First-try score is 80 to 89 and earns 2 credits, still pending", "first set " + (zh && zh.first_set_correct) + "/" + (zh && zh.first_set_questions) + " = " + zhPct + "%; credit " + (zhCredits[0] && zhCredits[0].credits) + " status " + (zhCredits[0] && zhCredits[0].status), zhPct >= 80 && zhPct < 90 && zhCredits.length === 1 && zhCredits[0].credits === tierOf(zhPct) && zhCredits[0].status === "pending" ? "PASS" : "FAIL", file);

  await sp.getByText(/Pending:/).first().waitFor({ timeout: 15000 });
  const walletBefore = await bodyText(sp);
  file = await snap(sp, "14-wallet-pending");
  const pendingCredits = await dbGet("reward_credits?child_id=eq." + id + "&status=eq.pending&select=credits,sgd_per_credit,subject");
  const pendingSgd = Math.round(pendingCredits.reduce((a, r) => a + Number(r.credits) * Number(r.sgd_per_credit), 0) * 100) / 100;
  record("student", "Wallet before homework is finished", "Pending credits show, with the SGD amount at S$0.50 per credit", "DB pending " + pendingCredits.map((r) => r.subject + " " + r.credits).join(", ") + " = S$" + pendingSgd.toFixed(2) + ". Screen has Pending and S$: " + /Pending:/.test(walletBefore) + " / " + walletBefore.includes("S$" + pendingSgd.toFixed(2)), /Pending:/.test(walletBefore) && walletBefore.includes("S$" + pendingSgd.toFixed(2)) && pendingCredits.length >= 1 ? "PASS" : "FAIL", file);

  await pp.bringToFront();
  await pp.goto("/");
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Mistakes/ }).click();
  await expect(pp.getByText(/Didn't know the concept|Misread the question|Fell for a trap|Guessed/).first()).toBeVisible({ timeout: 20000 });
  file = await snap(pp, "15-parent-causes");
  record("parent A", "See the wrong questions and the cause the child picked", "The mistakes tab shows the English cause label", "Cause label is visible", "PASS", file);

  const hwInput = pp.locator("label", { hasText: "Questions per mistake" }).locator("input");
  const headers = pp.locator("button", { hasText: /Session/ });
  let opened = false;
  const nHeaders = await headers.count();
  for (let i = 0; i < Math.min(nHeaders, 8) && !opened; i++) {
    await headers.nth(i).click();
    if (await hwInput.count()) opened = true;
  }
  const shownCount = opened ? await hwInput.inputValue() : "";
  if (opened) {
    const assign = pp.getByRole("button", { name: /Assign up to/ }).first();
    await assign.click();
    await pp.getByText(/Assigned \d+|Already assigned|No similar/).first().waitFor({ timeout: 8000 }).catch(() => {});
  }
  let hw = await dbGet("parent_homework?child_id=eq." + id + "&select=id,question_id");
  const afterDefault = hw.length;
  record("parent A", "Assign the default 3 similar questions", "The box starts at 3 and one mistake assigns up to 3", "Box showed " + shownCount + "; rows after that assign: " + afterDefault, shownCount === "3" && afterDefault >= 1 && afterDefault <= 3 ? "PASS" : "FAIL", await snap(pp, "16-homework-default"));

  if (opened) await hwInput.fill("12");
  for (let i = 0; i < Math.min(nHeaders, 15); i++) {
    hw = await dbGet("parent_homework?child_id=eq." + id + "&select=id");
    if (hw.length > 10) break;
    await headers.nth(i).click().catch(() => {});
    const assign = pp.getByRole("button", { name: /Assign up to/ });
    if (await assign.count()) {
      await assign.first().click();
      await pp.getByText(/Assigned \d+|Already assigned|No similar/).first().waitFor({ timeout: 8000 }).catch(() => {});
    }
  }
  hw = await dbGet("parent_homework?child_id=eq." + id + "&select=id,question_id");
  record("parent A", "Assign more than 10 homework questions in one day", "A custom count above 10 is saved on the shared setting and the assign is not capped at 10", "Homework rows today: " + hw.length, hw.length > 10 ? "PASS" : "FAIL", await snap(pp, "17-homework-over-10"));

  const prog = await sp.evaluate(() => {
    const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
    const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
    return key ? all[key] : null;
  });
  const seen = new Set(((prog && prog.trials) || []).map((t) => t.itemId));
  const assignedIds = new Set(hw.map((r) => r.question_id));
  let mastery = null;
  for (const m of (prog && prog.mistakes) || []) {
    const sk = skillKey(m);
    if (!sk || !m.id || assignedIds.has(String(m.id))) continue;
    const unseen = (answers.bank || []).find((b) => (b.section === "GrammarMCQ" || b.section === "VocabMCQ") && skillKey(b) === sk && String(b.id) !== String(m.id) && !seen.has(b.id) && !assignedIds.has(String(b.id)));
    if (unseen) { mastery = { sourceId: String(m.id), unseenId: String(unseen.id), skill: sk }; break; }
  }
  if (mastery) {
    const same = await pp.evaluate(async ({ child, qid }) => {
      const r = await fetch("/api/parent/homework", {
        method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child, subject: "English", grade: "P3", sourceQuestionId: qid, questionIds: [qid] }),
      });
      return r.json();
    }, { child: id, qid: mastery.sourceId });
    record("parent A", "Also assign the same question the child missed", "The redo is homework for today", JSON.stringify(same).slice(0, 180), same && (same.assigned || same.message) ? "PASS" : "FAIL", "");
  } else {
    record("parent A", "Also assign the same question the child missed", "A same-skill unseen partner exists for a later half-weight check", "Could not find a mistake with an unseen same-skill item", "FAIL", "");
  }

  const ledgerBefore = await sp.evaluate((skill) => {
    const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
    const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
    const L = key && all[key].skillLedger && all[key].skillLedger[skill];
    return L ? L.att : 0;
  }, mastery ? mastery.skill : "");

  await sp.bringToFront();
  await goHub(sp);
  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  await sp.getByRole("button", { name: /Start homework/ }).click();
  await drive(sp, { label: "friday-homework", max: 1600, done: async () => (await bodyText(sp)).includes("All done for today") });
  file = await snap(sp, "18-homework-done");
  await goHub(sp);
  await sp.getByText(/Wallet:/).first().waitFor({ timeout: 20000 });
  const walletAfter = await bodyText(sp);
  const confirmed = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.daily&select=subject,credits,status,sgd_per_credit");
  const confirmedSgd = Math.round(confirmed.filter((r) => r.status === "confirmed").reduce((a, r) => a + Number(r.credits) * Number(r.sgd_per_credit), 0) * 100) / 100;
  const left = await dbGet("parent_homework?child_id=eq." + id + "&solved_at=is.null&select=id");
  record("student", "Finish homework and the wallet confirms", "Every assigned question is solved, daily credits become confirmed, and the wallet total updates", "unsolved " + left.length + "; " + confirmed.map((r) => r.subject + " " + r.status + " " + r.credits).join(", ") + "; S$" + confirmedSgd.toFixed(2) + "; screen wallet " + /Wallet:/.test(walletAfter), left.length === 0 && confirmed.length >= 1 && confirmed.every((r) => r.status === "confirmed") && walletAfter.includes("S$" + confirmedSgd.toFixed(2)) ? "PASS" : "FAIL", file);

  if (mastery) {
    const hwTrials = await sp.evaluate((sourceId) => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      const trials = (key && all[key].trials) || [];
      return trials.filter((t) => t && t.mode === "homework" && String(t.itemId) === String(sourceId)).length;
    }, mastery.sourceId);
    const attAfter = await sp.evaluate((skill) => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      const L = key && all[key].skillLedger && all[key].skillLedger[skill];
      return L ? L.att : 0;
    }, mastery.skill);
    record("student", "Same-question homework redo does not raise mastery", "No homework trial is stored for " + mastery.sourceId + " and that skill's mastery count stays " + ledgerBefore, "homework trials for that id: " + hwTrials + "; att " + ledgerBefore + " → " + attAfter, hwTrials === 0 && attAfter === ledgerBefore ? "PASS" : "FAIL", "");
  }

  await pp.bringToFront();
  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText(/Credits:/).waitFor();
  const balText = await pp.getByText(/Credits:/).innerText();
  const unpaid = Number((balText.match(/Credits:\s*(\d+)/) || [])[1] || 0);
  if (unpaid > 0) {
    const pay = Math.min(2, unpaid);
    await pp.getByPlaceholder("Credits").fill(String(pay));
    await pp.getByPlaceholder("Amount S$").fill((pay * 0.5).toFixed(2));
    await pp.getByPlaceholder(/Note/).fill("Friday pocket money");
    await pp.getByRole("button", { name: "Mark paid" }).click();
    await expect(pp.getByText("Recorded as paid.")).toBeVisible();
  }
  file = await snap(pp, "19-payout");
  const payouts = await dbGet("reward_payouts?select=credits,amount_sgd,note");
  record("parent A", "Mark a payout as paid", "A confirmed balance can be marked paid and the note is kept", unpaid > 0 ? ("Paid " + (payouts[0] && payouts[0].credits) + " credits, S$" + (payouts[0] && payouts[0].amount_sgd) + ", note " + (payouts[0] && payouts[0].note)) : "No confirmed balance to pay", payouts.length === 1 && payouts[0].note === "Friday pocket money" ? "PASS" : "FAIL", file);

  // Learning dashboard (issue #42). Needs NEXT_PUBLIC_LEARNING_DASHBOARD_ENABLED=true, which the runner sets for this local run only.
  async function learningView(page) {
    await page.getByRole("button", { name: /📈 Learning/ }).click();
    await page.getByTestId("learning-dashboard").waitFor({ timeout: 20000 });
    await page.getByTestId("learning-skill").first().waitFor({ timeout: 20000 });
    return {
      trend: (await page.getByTestId("learning-trend").innerText()).trim(),
      skills: await page.getByTestId("learning-skill").count(),
      causes: await page.getByTestId("learning-cause").count(),
      text: await bodyText(page),
    };
  }
  const kid = await childId();
  const synced = await dbGet("learning_trials?student_id=eq." + kid + "&server_graded=eq.true&select=skill,weight,mode&subject=eq.English");
  const viewA = await learningView(pp);
  file = await snap(pp, "20-learning");
  const okA = synced.length > 0 && viewA.skills > 0 && viewA.causes > 0 && /mastery by skill/i.test(viewA.text) && /why answers were wrong/i.test(viewA.text) && /Improving|Flat|Slipping|Not enough practice yet/.test(viewA.trend);
  record("parent A", "Learning dashboard: mastery, causes, and whether the child is improving", "Learning tab shows mastery by skill, 14-day cause bars and an improving / flat / slipping word, from synced trials", synced.length + " synced English trials; trend '" + viewA.trend + "'; " + viewA.skills + " skills; " + viewA.causes + " cause rows", okA ? "PASS" : "FAIL", file);

  // Forged learning trials must be rejected (PR #43 follow-up). The full matrix is in tests/e2e/learning.spec.js (@learning).
  const forgedPost = await sp.evaluate(async () => {
    const r = await fetch("/api/learning/trials", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ subject: "English", itemId: "forged-perfect", skill: "en.grammar.forged_skill", mode: "exam", answer: 0, firstTry: true, correct: true, weight: 9, sessionNum: 99, ts: Date.now(), grade: "P3" }] }) });
    return r.status;
  });
  const forgedRows = await dbGet("learning_trials?student_id=eq." + kid + "&item_id=eq.forged-perfect&select=id");
  const syncedRows = await dbGet("learning_trials?student_id=eq." + kid + "&select=server_graded");
  // Direct PostgREST insert with the student's own session must be refused (no insert policy, no table grant).
  let directStatus = "skipped";
  {
    const ck = (await student.cookies()).filter((c) => c.name.startsWith("sb-127-auth-token")).sort((a, b) => a.name.localeCompare(b.name));
    let token = "";
    try {
      const raw = ck.map((c) => c.value).join("");
      const dec = raw.startsWith("base64-") ? Buffer.from(raw.slice(7), "base64url").toString("utf8") : decodeURIComponent(raw);
      const parsed = JSON.parse(dec);
      token = parsed.access_token || (Array.isArray(parsed) ? parsed[0] : "") || "";
    } catch {}
    if (token && process.env.E2E_ANON_KEY && process.env.E2E_API_URL) {
      const r = await fetch(process.env.E2E_API_URL.replace(/\/$/, "") + "/rest/v1/learning_trials", { method: "POST",
        headers: { apikey: process.env.E2E_ANON_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: kid, subject: "English", item_id: "forged-direct", skill: "x", mode: "exam", first_try: true, correct: true, weight: 0.5 }) });
      directStatus = r.status;
    }
  }
  const directRows = await dbGet("learning_trials?item_id=eq.forged-direct&select=id");
  const allGraded = syncedRows.length > 0 && syncedRows.every((r) => r.server_graded === true);
  record("student", "Forged learning trial is rejected", "A made-up trial (unknown item, claimed first try, weight 9) stores nothing; direct table insert is refused; stored rows are server-graded", "post " + forgedPost + ", forged rows " + forgedRows.length + ", direct " + directStatus + ", direct rows " + directRows.length + ", all server_graded " + allGraded, forgedRows.length === 0 && directRows.length === 0 && allGraded && (directStatus === 401 || directStatus === 403) ? "PASS" : "FAIL", "");

  await pp.getByRole("button", { name: /Overview/ }).click();

  await pp.getByText(/Did Amir Tan do it today/).scrollIntoViewIfNeeded();
  file = await snap(pp, "21-friday-done");
  const friText = await bodyText(pp);
  record("parent A", "Friday daily status after both subjects", "English 2/2 and Chinese 1/1 are done", /English[\s\S]{0,30}✅ 2\/2/.test(friText) && /Chinese[\s\S]{0,30}✅ 1\/1/.test(friText) ? "Both done" : friText.slice(friText.indexOf("Did Amir"), friText.indexOf("Did Amir") + 320), /✅ 2\/2/.test(friText) && /✅ 1\/1/.test(friText) ? "PASS" : "FAIL", file);

  const beforeDone = alerts().length;
  const doneCron = await cron();
  const doneMails = alerts().slice(beforeDone).filter((a) => /All done today/.test(a.subject || ""));
  const doneBody = doneMails.filter((a) => /✅ Done – English: 2\/2 sets/.test(a.text || "") && /✅ Done – Chinese: 1\/1 set/.test(a.text || ""));
  record("system", "8pm alert on a day that was studied", "Both parents get a dry-run email that English and Chinese are done. No real email is sent.", "HTTP " + doneCron.status + " dryRun=" + (doneCron.body && doneCron.body.summary && doneCron.body.summary.dryRun) + "; matching emails " + doneBody.length, doneCron.status === 200 && doneBody.length >= 2 ? "PASS" : "FAIL", "");

  // —— Saturday: weekly bonus and the past-paper mock ——
  setDay(BASE + 2);
  await shiftBrowser([sp, pp, pb], BASE + 2);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  const weekly = sp.getByRole("button", { name: "Start Weekly Review" });
  await weekly.waitFor({ timeout: 15000 }).catch(() => {});
  const weeklyInfo = await sp.evaluate(async () => {
    const r = await fetch("/api/student/rewards", { credentials: "same-origin" }).then((x) => x.json()).catch(() => ({}));
    const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
    const en = Object.keys(all).find((k) => k.endsWith("_P3_English"));
    const zh = Object.keys(all).find((k) => k.endsWith("_P3_Chinese"));
    const dates = en ? (all[en].history || []).map((h) => h.date) : [];
    const zhDates = zh ? (all[zh].history || []).map((h) => h.date) : [];
    const zhWrongs = zh ? (all[zh].history || []).reduce((n, h) => n + ((h.mistakes || []).length), 0) : 0;
    return { today: r.today, saturday: r.saturday, dates, zhDates, zhWrongs };
  });
  if (await weekly.count()) {
    await weekly.click();
    await drive(sp, { label: "weekly-en", max: 1600, done: async () => (await bodyText(sp)).includes("Done for this week") });
    await snap(sp, "22-weekly-english");
  }
  await goHub(sp);
  await sp.getByText(/Hello,/).waitFor({ timeout: 15000 });
  await sp.getByRole("button", { name: /^错题/ }).first().click();
  const weeklyZh = sp.getByRole("button", { name: "Start Weekly Review" });
  await weeklyZh.waitFor({ timeout: 15000 }).catch(() => {});
  if (await weeklyZh.count()) {
    await weeklyZh.click();
    await drive(sp, { label: "weekly-zh", max: 1600, done: async () => (await bodyText(sp)).includes("Done for this week") });
  }
  const weeklyRows = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.weekly&select=subject,credits,status,sgd_per_credit");
  const enW = weeklyRows.find((r) => r.subject === "English");
  const zhW = weeklyRows.find((r) => r.subject === "Chinese");
  record("student", "Saturday weekly bonus per subject", "English pays round(S$5 / 0.50) = 10 credits and Chinese pays round(S$4 / 0.50) = 8, one row each. With no Saturday homework and the day still open they stay pending.", "server " + JSON.stringify(weeklyInfo) + "; English " + (enW && enW.credits) + " " + (enW && enW.status) + "; Chinese " + (zhW && zhW.credits) + " " + (zhW && zhW.status), enW && enW.credits === 10 && zhW && zhW.credits === 8 ? "PASS" : "FAIL", await snap(sp, "23-weekly-done"));

  await goHub(sp);
  file = "";
  await sp.getByRole("button", { name: "More" }).first().click();
  const extra = sp.getByRole("button", { name: "Extra practice" });
  let pastNote = "Extra practice was not on the English screen.";
  let pastStatus = "FAIL";
  if (await extra.count()) {
    await extra.click();
    const mock = sp.getByRole("button", { name: /Past-paper mock/ });
    if (await mock.count()) {
      await mock.click();
      file = await snap(sp, "24-past-paper");
      const header = (await bodyText(sp)).slice(0, 400);
      try {
        await drive(sp, { label: "past-paper", max: 2200, done: async () => (await bodyText(sp)).includes("correct on first try") });
        pastNote = "Finished the past-paper mock. Opening text: " + header.replace(/\s+/g, " ").slice(0, 180);
        pastStatus = "PASS";
        file = await snap(sp, "25-past-paper-done");
      } catch (e) {
        pastNote = "The mock opened (" + header.replace(/\s+/g, " ").slice(0, 140) + ") but did not finish: " + String(e.message || e).slice(0, 160);
        pastStatus = "FAIL";
      }
    } else {
      pastNote = "Extra practice opened and there was no Past-paper mock button.";
      file = await snap(sp, "24-past-paper");
    }
  }
  record("student", "Saturday past-paper mock", "The student can start and finish a past-paper mock separate from today's set", pastNote, pastStatus, file || "");
  ux("The past-paper mock is tucked under More, then Extra practice. It is not on the Today card, so a child looking for Saturday's paper can miss it.");

  await goHub(sp);
  file = await snap(sp, "26-saturday-wallet");
  const satWallet = await bodyText(sp);
  record("student", "Wallet after the Saturday bonus", "Pending weekly credits show with their SGD value while Saturday is still open", /Pending:/.test(satWallet) ? satWallet.slice(satWallet.indexOf("Pending:"), satWallet.indexOf("Pending:") + 180) : "No pending line", /Pending:/.test(satWallet) && /S\$/.test(satWallet) ? "PASS" : "FAIL", file);

  // —— Sunday: 60% earns nothing; a high score with unfinished homework will forfeit ——
  setDay(BASE + 3);
  await shiftBrowser([sp, pp, pb], BASE + 3);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /Start today's set|Extra set/ }).first().click();
  try {
    await driveToScore(sp, englishSets, { min: 55, max: 65 }, "english-60");
  } catch (e) {
    console.log("english-60 stopped: " + String(e.message || e).slice(0, 200));
  }
  await finishNav(sp).catch(() => {});
  const lowRows = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq.English&date=eq." + SUN + "&select=first_set_questions,first_set_correct");
  const low = lowRows[0];
  const lowPct = pctOf(low);
  const lowCredits = await dbGet("reward_credits?child_id=eq." + id + "&subject=eq.English&kind=eq.daily&gate_day=eq." + SUN + "&select=credits,status,score_pct");
  record("student", "A later English set around 60%", "Below 80 earns no daily credit, and it does not rewrite Friday's first-set credit", "Sunday first set " + lowPct + "%; Sunday English credit rows " + lowCredits.length, lowPct != null && lowPct < 80 && lowPct >= 50 && lowCredits.length === 0 ? "PASS" : "FAIL", await snap(sp, "27-english-60"));

  await sp.getByRole("button", { name: "开始今天的练习" }).click();
  await driveToScore(sp, chineseSets, { min: 100, max: 100 }, "chinese-sunday");
  await finishNav(sp);
  const sunZhRows = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq.Chinese&date=eq." + SUN + "&select=first_set_questions,first_set_correct");
  const sunZhPct = pctOf(sunZhRows[0]);
  const sunZh = await dbGet("reward_credits?child_id=eq." + id + "&subject=eq.Chinese&kind=eq.daily&gate_day=eq." + SUN + "&select=credits,status");
  const sunTierOk = sunZhPct == null ? false : (sunZhPct < 80 ? sunZh.length === 0 : sunZh.length === 1 && sunZh[0].status === "pending" && sunZh[0].credits === tierOf(sunZhPct));
  record("student", "Sunday Chinese first set follows the tier", "Under 80 earns nothing. 80 or higher earns that tier and stays pending", "first set " + sunZhPct + "%; credit rows " + sunZh.length, sunTierOk ? "PASS" : "FAIL", await snap(sp, "28-sunday-chinese"));

  // Monday: a high first set, then homework left undone so Tuesday can forfeit it.
  setDay(BASE + 4);
  await shiftBrowser([sp, pp, pb], BASE + 4);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /Start today's set|Extra set/ }).first().click();
  await driveToScore(sp, englishSets, { min: 100, max: 100 }, "english-monday");
  await finishNav(sp);
  const monRows = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq.English&date=eq." + MON + "&select=first_set_questions,first_set_correct");
  const monPct = pctOf(monRows[0]);
  const monCredit = await dbGet("reward_credits?child_id=eq." + id + "&subject=eq.English&kind=eq.daily&gate_day=eq." + MON + "&select=credits,status");
  record("student", "Monday English first set earns a pending credit", "90 or higher earns 3 credits and they stay pending before homework is finished", "first set " + monPct + "%; " + (monCredit[0] ? monCredit[0].credits + " " + monCredit[0].status : "no credit"), monPct >= 90 && monCredit.length === 1 && monCredit[0].credits === 3 && monCredit[0].status === "pending" ? "PASS" : "FAIL", await snap(sp, "29-monday-pending"));
  await pp.bringToFront();
  await pp.goto("/");
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  const bait = await pp.evaluate(async ({ child }) => {
    const r = await fetch("/api/parent/homework", {
      method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ child, subject: "English", grade: "P3", sourceQuestionId: "monday-bait", questionIds: ["monday-bait"] }),
    });
    return r.json();
  }, { child: id });
  await sp.bringToFront();
  await sp.reload();
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByText(/Pending:/).first().waitFor({ timeout: 15000 }).catch(() => {});
  const stillPending = await bodyText(sp);
  record("parent A", "Leave Monday homework unfinished", "One question is assigned and the student does not open it, so Monday's credit stays pending", JSON.stringify(bait).slice(0, 140) + "; pending on screen: " + /Pending:/.test(stillPending), bait && bait.assigned >= 1 && /Pending:/.test(stillPending) ? "PASS" : "FAIL", await snap(sp, "29b-monday-left-open"));

  // Tuesday: Monday's unfinished homework forfeits. Saturday, with no homework, has already confirmed.
  setDay(BASE + 5);
  await shiftBrowser([sp, pp, pb], BASE + 5);
  await sp.goto("/");
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByText(/lost because homework/).first().waitFor({ timeout: 20000 }).catch(() => {});
  file = await snap(sp, "30-forfeited");
  const monNow = await dbGet("reward_credits?child_id=eq." + id + "&gate_day=eq." + MON + "&select=subject,kind,credits,status");
  const walletTue = await bodyText(sp);
  record("student", "Day end forfeits unfinished homework", "Monday's credit is forfeited and the wallet says it was lost", monNow.map((r) => r.kind + " " + r.subject + " " + r.status + " " + r.credits).join(", ") + ". Screen: " + (walletTue.includes("lost because homework") ? "shows the lost line" : "missing"), monNow.some((r) => r.kind === "daily" && r.status === "forfeited") && /lost because homework/.test(walletTue) ? "PASS" : "FAIL", file);

  const satNow = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.weekly&select=subject,status");
  record("student", "Saturday bonus after that day ended with no homework", "Weekly credits confirm once Saturday is over, because nothing was assigned", satNow.map((r) => r.subject + " " + r.status).join(", "), satNow.length >= 2 && satNow.every((r) => r.status === "confirmed") ? "PASS" : "FAIL", "");

  if (mastery) {
    const before = await sp.evaluate((skill) => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      const p = key ? all[key] : { trials: [], skillLedger: {} };
      const L = p.skillLedger && p.skillLedger[skill];
      return { att: L ? L.att : 0, hw: (p.trials || []).filter((t) => t && t.mode === "homework" && String(t.itemId) === String(skill)).length };
    }, mastery.skill);
    const freshSeen = new Set(await sp.evaluate(() => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      return ((key && all[key].trials) || []).map((t) => t.itemId);
    }));
    const unseenNow = (answers.bank || []).find((b) => (b.section === "GrammarMCQ" || b.section === "VocabMCQ") && skillKey(b) === mastery.skill && String(b.id) !== String(mastery.sourceId) && !freshSeen.has(b.id));
    if (unseenNow) mastery.unseenId = String(unseenNow.id);
    await pp.bringToFront();
    await ensureParent(pp, PARENT_A.email, PARENT_A.password);
    const late = await pp.evaluate(async ({ child, sourceId, unseenId }) => {
      const r = await fetch("/api/parent/homework", {
        method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child, subject: "English", grade: "P3", sourceQuestionId: sourceId, questionIds: [sourceId, unseenId] }),
      });
      return r.json();
    }, { child: id, sourceId: mastery.sourceId, unseenId: mastery.unseenId });
    await sp.bringToFront();
    await sp.goto("/");
    await ensureStudent(sp, CHILD.username, CHILD.password);
    await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
    const startHw = sp.getByRole("button", { name: /Start homework/ });
    await startHw.waitFor({ timeout: 15000 }).catch(() => {});
    if (await startHw.count()) {
      await startHw.click();
      await sp.waitForFunction(() => /Submit|提交/.test(document.body.innerText || ""), { timeout: 15000 }).catch(() => {});
      await drive(sp, { label: "monday-mastery", max: 400, done: async () => (await bodyText(sp)).includes("All done for today") });
    }
    const after = await sp.evaluate(({ skill, sourceId, unseenId }) => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      const p = key ? all[key] : { trials: [], skillLedger: {} };
      const trials = p.trials || [];
      const L = p.skillLedger && p.skillLedger[skill];
      const hw = trials.filter((t) => t && t.mode === "homework");
      return {
        att: L ? L.att : 0,
        same: hw.filter((t) => String(t.itemId) === String(sourceId)).length,
        half: hw.filter((t) => String(t.itemId) === String(unseenId)).map((t) => t.weight),
      };
    }, mastery);
    file = await snap(sp, "31-half-mastery");
    const halfOk = after.half.length === 1 && Math.abs(after.half[0] - 0.5) < 1e-9 && after.same === 0 && Math.abs(after.att - before.att - 0.5) < 1e-9;
    record("student", "Unseen similar question at least one day later counts half", "Redo of " + mastery.sourceId + " adds nothing. Unseen " + mastery.unseenId + " (" + mastery.skill + ") adds 0.5. Assign result " + JSON.stringify(late).slice(0, 80), "att " + before.att + " → " + after.att + "; same-question homework trials " + after.same + "; unseen weights " + after.half.join(","), halfOk ? "PASS" : "FAIL", file);
  }

  await pp.bringToFront();
  await pp.goto("/");
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  file = await snap(pp, "32-week-strip");
  const strip = await bodyText(pp);
  record("parent A", "Daily status across the practised days", "The 7-day strip and today's line show which days were done", strip.includes("Did Amir Tan do it today") ? "Today card is on the dashboard" : "Today card missing", strip.includes("Did Amir Tan do it today") ? "PASS" : "FAIL", file);

  await pb.bringToFront();
  await pb.goto("/");
  await ensureParent(pb, PARENT_B.email, PARENT_B.password);
  const viewB = await learningView(pb);
  file = await snap(pb, "33-learning-parent-b");
  const okB = viewB.skills > 0 && viewB.causes > 0 && /mastery by skill/i.test(viewB.text) && /why answers were wrong/i.test(viewB.text);
  record("parent B", "Learning dashboard is the same for the other linked parent", "Parent B opens the same Learning tab. Counts can be higher if the child practised again after parent A looked.", viewB.skills + " skills, " + viewB.causes + " cause rows (A looked earlier: " + viewA.skills + " skills, " + viewA.causes + " cause rows)", okB ? "PASS" : "FAIL", file);

  const fails = STEPS.filter((s) => s.status === "FAIL").length;
  const gaps = STEPS.filter((s) => s.status === "GAP").length;
  const passes = STEPS.filter((s) => s.status === "PASS").length;
  console.log("ROLEPLAY " + passes + " pass, " + fails + " fail, " + gaps + " gap");
  expect(fails, STEPS.filter((s) => s.status === "FAIL").map((s) => s.step + ": " + s.actual).join("\n")).toBe(0);
});
