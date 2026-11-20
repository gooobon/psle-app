// Browser role-play for PR #63. Local Supabase only. Flags are on in the Next process that serves this test.
// Amir Tan (student) and Mrs Tan (parent). Screenshots: docs/e2e-pr63-2026-11-20/
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { bodyText, dbGet, loginStudent, ensureParent, assertLocalOnly } = require("./helpers");

const PARENT = { name: "Mrs Tan", email: "mrs.tan.pr63@example.com", password: "Testpass1" };
const CHILD = { username: "amir_pr63", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const SHOTS = path.join(process.cwd(), "docs", "e2e-pr63-2026-11-20");
const HANGUL = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/;
const STEPS = [];
const CRAWL = [];
const TAO = "Tao Nan School 2023 WA3";
const HENRY = "Henry Park Primary School 2023 EOY";

function record(role, step, expected, actual, status, screenshot) {
  STEPS.push({ role, step, expected, actual, status, screenshot: screenshot || "" });
  fs.mkdirSync(path.join("tests", "e2e", ".state"), { recursive: true });
  fs.writeFileSync(path.join("tests", "e2e", ".state", "pr63-steps.json"), JSON.stringify({ steps: STEPS, crawl: CRAWL }, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${actual}`);
}
async function snap(page, name) {
  fs.mkdirSync(SHOTS, { recursive: true });
  const file = path.join(SHOTS, name + ".png");
  await page.screenshot({ path: file, fullPage: true });
  return file;
}
async function noteScreen(page, where) {
  const text = await bodyText(page).catch(() => "");
  const hits = text.match(HANGUL) ? (text.match(new RegExp(HANGUL.source, "g")) || []).slice(0, 8) : [];
  CRAWL.push({ where, hangul: hits, sample: text.replace(/\s+/g, " ").slice(0, 240) });
  return { text, hits };
}
function shiftDays(n) {
  fs.writeFileSync(process.env.E2E_DAY_SHIFT_FILE, String(n));
  execFileSync("docker", ["exec", process.env.E2E_DB_CONTAINER, "psql", "-U", "postgres", "-v", "ON_ERROR_STOP=1", "-c", "update public.e2e_clock set shift_days = " + Number(n)], { stdio: "pipe" });
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

async function nudge(page) {
  return page.evaluate(() => {
    const visible = (el) => !!(el && (el.getClientRects().length || el.offsetParent));
    const buttons = () => [...document.querySelectorAll("button")].filter(visible);
    const text = (el) => (el.innerText || "").replace(/\s+/g, " ").trim();
    const enabled = (re) => buttons().find((b) => !b.disabled && re.test(text(b)));
    const body = document.body.innerText || "";
    if (/Tap the cards in order/.test(body) && !/should be/.test(body) && !/Please complete the retry/.test(body)) return "order-ready";
    const advance = enabled(/^(Next Page|Finish Section|Next Section|Back to Home|See results|Finish review|Next →)$/);
    if (advance && !/Please complete the retry/.test(body)) { advance.click(); return "advance:" + text(advance).slice(0, 40); }
    const check = enabled(/^(Check|OK)$/);
    if (check) { check.click(); return "check"; }
    if (/Try again|Not quite|Please complete the retry/.test(body)) {
      const boxes = [...document.querySelectorAll("div")].filter((d) => /Try again/.test(d.innerText || "") && [...d.querySelectorAll("button")].some((b) => text(b) === "Check" && b.disabled));
      boxes.sort((a, b) => (a.innerText || "").length - (b.innerText || "").length);
      const box = boxes[0];
      if (box) {
        const word = [...box.querySelectorAll("button")].find((b) => text(b) !== "Check" && text(b).length > 0 && text(b).length < 24);
        if (word) { word.click(); return "retry-word:" + text(word).slice(0, 16); }
      }
    }
    const submit = enabled(/^(Submit|Submit Page|Submit Answers)/);
    if (submit && !submit.disabled) { submit.click(); return "submit:" + text(submit).slice(0, 40); }
    const word = buttons().find((b) => /^\([A-H]\)/.test(text(b)) && text(b).length < 40);
    if (word && /Tap a word|Word bank|Choose/.test(body)) { word.click(); return "word"; }
    let typed = false;
    for (const el of document.querySelectorAll("input, textarea")) {
      if (!visible(el) || el.disabled) continue;
      const type = (el.getAttribute("type") || "text").toLowerCase();
      if (type === "password" || type === "checkbox" || type === "date") continue;
      if (String(el.value || "").trim()) continue;
      const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      setter.call(el, "word");
      el.dispatchEvent(new Event("input", { bubbles: true }));
      typed = true;
    }
    if (typed) return "typed";
    // One option (1) per question that is not already selected. Clicking only the first (1) on the page never leaves question 1.
    const ones = [...document.querySelectorAll("div")].filter((el) => {
      const s = el.querySelector(":scope > span");
      if (!s || s.textContent.trim() !== "(1)" || getComputedStyle(el).cursor !== "pointer") return false;
      const bg = (el.style.background || "").toLowerCase();
      return bg !== "#dbeafe" && bg !== "rgb(219, 234, 254)";
    });
    if (ones.length) { ones.forEach((el) => el.click()); return "mcq:" + ones.length; }
    const retry = [...document.querySelectorAll("div")].find((el) => {
      if (el.dataset.e2e) return false;
      const s = el.querySelector(":scope > span");
      return s && /^\(\d+\)$/.test(s.textContent.trim()) && getComputedStyle(el).cursor === "pointer" && /Try again|Not quite/.test(el.parentElement ? el.parentElement.innerText : "");
    });
    if (retry) { retry.dataset.e2e = "1"; retry.click(); return "retry"; }
    return "stuck";
  });
}

async function driveUntilOrder(page, max = 900) {
  let stuck = 0;
  for (let i = 0; i < max; i++) {
    const action = await nudge(page);
    if (action === "order-ready") return true;
    if (action === "stuck") {
      stuck++;
      if (stuck >= 8) return false;
    } else stuck = 0;
    await page.waitForTimeout(40);
  }
  return false;
}

async function tapNamed(page, snippet) {
  const btn = page.getByRole("button", { name: new RegExp(snippet, "i") });
  await btn.first().click();
}
async function keyNamed(page, snippet) {
  const btn = page.getByRole("button", { name: new RegExp(snippet, "i") }).first();
  await btn.focus();
  await btn.press("Enter");
}

function alerts() {
  const file = process.env.ALERT_DRY_RUN_LOG;
  if (!file || !fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split("\n").filter(Boolean).map((line) => {
    try { return JSON.parse(line); } catch { return null; }
  }).filter(Boolean);
}

test.describe.configure({ mode: "serial" });

test("PR 63 role-play: cloze, order, parent marks, titles, no Korean", async ({ browser }) => {
  test.setTimeout(50 * 60 * 1000);
  assertLocalOnly();
  if (!process.env.E2E_DAY_SHIFT_FILE || !process.env.E2E_DB_CONTAINER) throw new Error("clock env missing");
  const parent = await browser.newContext(CTX);
  const pp = await parent.newPage();
  const student = await browser.newContext(CTX);
  const sp = await student.newPage();

  // —— Friday: Mrs Tan creates Amir and saves Saturday paper rules (they apply tomorrow) ——
  shiftDays(0);
  await pp.goto("/");
  await pp.getByText("Welcome back").waitFor();
  await noteScreen(pp, "login");
  await pp.locator("button").filter({ hasText: /^\s*Parent\s*$/ }).click();
  await pp.getByPlaceholder("Your email").fill(PARENT.email);
  await pp.getByPlaceholder("Your password").fill(PARENT.password);
  await pp.getByRole("button", { name: /Log In/ }).click();
  const already = await pp.getByRole("button", { name: /Add child|Amir Tan/ }).first().waitFor({ timeout: 8000 }).then(() => true).catch(() => false);
  if (!already) {
    await pp.goto("/");
    await pp.getByText("Welcome back").waitFor();
    await pp.getByRole("button", { name: /Parent Sign Up/ }).click();
    await pp.getByPlaceholder("e.g. Mrs Lee").fill(PARENT.name);
    await pp.getByPlaceholder("you@example.com").fill(PARENT.email);
    await pp.getByPlaceholder("Create a password").fill(PARENT.password);
    await pp.getByPlaceholder("Re-enter password").fill(PARENT.password);
    await pp.getByRole("button", { name: "Create Parent Account" }).click();
    await pp.getByRole("button", { name: /Add child/ }).waitFor({ timeout: 20000 });
  }
  await confirmParents();
  if (!(await pp.getByRole("button", { name: /Amir Tan/ }).count())) {
    await pp.getByRole("button", { name: /Add child/ }).click();
    await pp.getByPlaceholder("Child's username (a-z, 0-9, _)").fill(CHILD.username);
    await pp.getByPlaceholder("Display name").fill(CHILD.name);
    await pp.getByPlaceholder("School").fill(CHILD.school);
    await pp.getByPlaceholder("Child's password (min 6 chars)").fill(CHILD.password);
    await pp.getByRole("button", { name: "Create child account" }).click();
    await expect(pp.getByText(/Created\./)).toBeVisible();
  }
  await pp.getByRole("button", { name: /Amir Tan/ }).click();
  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText("Saturday past paper reward").waitFor({ timeout: 20000 });
  const creditsToggle = pp.locator("label").filter({ hasText: /Turn on credits/ }).locator("input");
  if (!(await creditsToggle.isChecked())) await creditsToggle.check();
  await pp.locator("label").filter({ hasText: "SGD value of 1 credit" }).locator("input").fill("0.5");
  await pp.locator("label").filter({ hasText: /^English/ }).last().locator("input").fill("6");
  const effort = pp.locator("label").filter({ hasText: "Effort check" }).locator("input");
  if (!(await effort.isChecked())) await effort.check();
  await pp.getByRole("button", { name: "Save rules" }).click();
  await expect(pp.getByText(/Saved\. Applies from tomorrow/)).toBeVisible({ timeout: 20000 });
  let file = await snap(pp, "01-parent-rules");
  await noteScreen(pp, "parent-rewards-settings");
  record("parent", "Save Saturday paper rules", "6 English credits, effort check on, from tomorrow", await pp.locator("body").innerText().then((t) => (t.match(/Saved\. Applies from tomorrow \([^)]+\)/) || ["saved"])[0]), "PASS", file);

  // —— Saturday ——
  shiftDays(1);
  await sp.goto("/");
  await loginStudent(sp, CHILD.username, CHILD.password);
  let seen = await noteScreen(sp, "student-home");
  file = await snap(sp, "02-student-home");
  record("student", "Home after login", "Hello Amir, no Hangul", seen.hits.length ? "Hangul " + seen.hits.join(" ") : "no Hangul", seen.hits.length ? "FAIL" : "PASS", file);

  // —— 4. Practice title is the real school (ACS), not Nanyang ——
  await sp.getByRole("button", { name: "More", exact: true }).first().click();
  await sp.getByText("Extra practice").click();
  await sp.getByRole("button", { name: /Past-paper mock/ }).click();
  await sp.getByText(/Anglo-Chinese|Nanyang|Section/).first().waitFor({ timeout: 20000 });
  const header1 = await sp.locator("body").innerText();
  const titleOk = /Anglo-Chinese School \(Junior\)/.test(header1) && !/Nanyang/.test(header1.split("Tap the cards")[0]);
  file = await snap(sp, "03-practice-header-acs");
  record("student", "Past-paper mock header", "Anglo-Chinese School (Junior), not Nanyang", (header1.match(/Anglo-Chinese School \(Junior\)|Nanyang Primary|Mock Exam/) || ["no school in header"]).slice(0, 3).join(" | "), titleOk ? "PASS" : "FAIL", file);

  // —— 2. Practice order: Undo, Reset, keyboard, then the right order ——
  const reached = await driveUntilOrder(sp);
  if (!reached) {
    file = await snap(sp, "04-practice-order-stuck");
    record("student", "Reach practice order cards", "Tap-to-order visible", "driver stuck", "FAIL", file);
  } else {
    file = await snap(sp, "04-practice-order-cards");
    const controls = await bodyText(sp);
    const controlsOk = /Undo/.test(controls) && /Reset/.test(controls) && /Tap the cards in order/.test(controls);
    record("student", "Practice order cards render", "Three event cards, Undo, Reset", controlsOk ? "Undo and Reset visible" : "controls missing", controlsOk ? "PASS" : "FAIL", file);
    await tapNamed(sp, "tripped and fell");
    await expect(sp.getByText("1 of 3 ordered")).toBeVisible();
    await sp.getByRole("button", { name: "Undo", exact: true }).click();
    await expect(sp.getByText("0 of 3 ordered")).toBeVisible();
    await tapNamed(sp, "placed sacks");
    await tapNamed(sp, "tripped and fell");
    await sp.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(sp.getByText("0 of 3 ordered")).toBeVisible();
    await keyNamed(sp, "tripped and fell");
    await expect(sp.getByText("1 of 3 ordered")).toBeVisible();
    await tapNamed(sp, "placed sacks");
    await tapNamed(sp, "jumped into the river");
    await expect(sp.getByText("3 of 3 ordered")).toBeVisible();
    file = await snap(sp, "05-practice-order-set");
    let submitted = false;
    for (let i = 0; i < 40; i++) {
      const action = await sp.evaluate(() => {
        const visible = (el) => !!(el && (el.getClientRects().length || el.offsetParent));
        const inOrder = (el) => !!el.closest("[aria-label='Put the events in order. Tap them first to last.']");
        const tds = [...document.querySelectorAll("td")].filter((td) => td.textContent.trim() === "(1)" && getComputedStyle(td).cursor === "pointer");
        for (const td of tds) {
          const wrap = td.closest("table") && td.closest("table").parentElement;
          if (wrap && /Answer:\s*\(\s*\)/.test(wrap.innerText)) { td.click(); return "table-mcq"; }
        }
        const ab = [...document.querySelectorAll("span")].find((el) => !el.dataset.e2eAb && getComputedStyle(el).cursor === "pointer" && /^\(A\)/.test(el.textContent.trim()));
        if (ab) { ab.dataset.e2eAb = "1"; ab.click(); return "ab"; }
        const tfCell = [...document.querySelectorAll("tr")].map((tr) => [...tr.querySelectorAll("td")][2]).find((td) => td && !td.dataset.e2eTf && getComputedStyle(td).cursor === "pointer" && !td.textContent.trim());
        if (tfCell) { tfCell.dataset.e2eTf = "1"; tfCell.click(); return "tf-cell"; }
        const tf = [...document.querySelectorAll("button")].find((el) => visible(el) && !el.dataset.e2eTf && !inOrder(el) && el.textContent.trim() === "True");
        if (tf) { tf.dataset.e2eTf = "1"; tf.click(); return "tf"; }
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        for (const el of document.querySelectorAll("input, textarea")) {
          if (!visible(el) || el.disabled || String(el.value || "").trim()) continue;
          const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
          Object.getOwnPropertyDescriptor(proto, "value").set.call(el, "word");
          el.dispatchEvent(new Event("input", { bubbles: true }));
          return "typed";
        }
        const sub = [...document.querySelectorAll("button")].find((b) => /Submit Answers/.test(b.innerText || "") && !b.disabled);
        if (sub) { sub.click(); return "submitted"; }
        return "idle";
      });
      if (action === "submitted") { submitted = true; break; }
      if (action === "idle") break;
      await sp.waitForTimeout(60);
    }
    if (submitted) await sp.getByText(/CORRECT|INCORRECT/).first().waitFor({ timeout: 10000 }).catch(() => {});
    const graded = await bodyText(sp);
    const orderBit = (graded.split("SEQUENCE").pop() || graded).slice(0, 500);
    const right = submitted && /CORRECT/.test(graded) && !/should be/.test(orderBit);
    file = await snap(sp, "06-practice-order-graded");
    record("student", "Practice order graded right", "Key 2,1,3 shows CORRECT and no 'should be'", right ? "CORRECT, no should-be" : (submitted ? "submitted but verdict unclear" : "could not submit"), right ? "PASS" : "FAIL", file);
    for (let i = 0; i < 25; i++) {
      const t = await bodyText(sp);
      if (/Hello,/.test(t) && !/Tap the cards in order/.test(t)) break;
      const btn = sp.getByRole("button", { name: /Next Section|Finish Section|Next Page|See results|Finish review|Back to Home|Next →/ }).first();
      if (await btn.count()) await btn.click().catch(() => {});
      else break;
      await sp.waitForTimeout(200);
    }
  }
  if ((await sp.getByText(/Hello,/).count()) === 0) {
    const leave = sp.getByRole("button", { name: /Back to Home|See results/ }).first();
    if (await leave.count()) await leave.click().catch(() => {});
    else await sp.locator("header button, div button").first().click().catch(() => {});
  }
  await sp.getByRole("button", { name: "Today" }).first().click({ timeout: 8000 }).catch(() => {});
  await sp.getByText(/Hello,/).waitFor({ timeout: 15000 }).catch(() => {});
  // Recent list may say Nanyang. Capture whatever is on the English home.
  if (await sp.getByRole("button", { name: "More", exact: true }).count()) {
    await sp.getByRole("button", { name: "More", exact: true }).first().click();
    await sp.getByText("My Progress").click().catch(() => {});
    const recent = await bodyText(sp);
    file = await snap(sp, "07-practice-recent");
    const line = (recent.match(/Mock:[^\n]+/) || ["no mock line"])[0];
    const recentOk = /Anglo-Chinese/.test(line) && !/Nanyang/.test(line);
    record("student", "Practice review list names the school", "Anglo-Chinese, not Nanyang Primary", line, recentOk ? "PASS" : "FAIL", file);
    await sp.getByRole("button", { name: "Today" }).first().click().catch(() => {});
    await sp.getByText(/Hello,/).waitFor({ timeout: 15000 }).catch(() => {});
  }

  // —— Mock papers list title, then Henry Park order right + wrong ——
  if (!(await sp.getByRole("button", { name: /English mock papers/ }).count())) {
    await sp.goto("/");
    await sp.getByText(/Hello,/).waitFor({ timeout: 20000 });
  }
  await sp.getByRole("button", { name: /English mock papers/ }).click();
  await sp.getByText("Mock papers", { exact: true }).waitFor();
  await sp.getByText(TAO).first().waitFor({ timeout: 30000 });
  const listText = await bodyText(sp);
  file = await snap(sp, "08-mock-list");
  await noteScreen(sp, "mock-list");
  const taoOnList = listText.includes(TAO);
  const nanyangMislabeled = /Nanyang Primary/.test(listText) && !/Nanyang/.test(TAO);
  record("student", "Mock list shows the paper's school", TAO + " on the list", taoOnList ? TAO + " is listed" + (nanyangMislabeled ? "; Nanyang also appears (real papers may)" : "") : "Tao Nan missing", taoOnList ? "PASS" : "FAIL", file);

  async function startByLabel(label) {
    const clicked = await sp.getByText(label, { exact: true }).first().evaluate((el) => {
      let n = el;
      while (n && ![...n.querySelectorAll("button")].some((b) => b.textContent.trim() === "Start")) n = n.parentElement;
      const b = n && [...n.querySelectorAll("button")].find((x) => x.textContent.trim() === "Start");
      if (b) { b.click(); return true; }
      return false;
    });
    if (!clicked) throw new Error("no Start for " + label);
    await sp.getByText("Previous section").waitFor({ timeout: 30000 });
  }
  await startByLabel(HENRY);
  const henryHead = await bodyText(sp);
  file = await snap(sp, "09-henry-header");
  record("student", "Mock exam header is the paper school", HENRY, henryHead.includes(HENRY) && !/Nanyang/.test(henryHead) ? HENRY : henryHead.slice(0, 120), henryHead.includes(HENRY) ? "PASS" : "FAIL", file);
  await sp.getByRole("button", { name: "Comprehension", exact: true }).click();
  await sp.getByText("Tap the cards in order").first().waitFor();
  // First story: right order is 2, 3, 1. Keyboard + undo, then the right taps.
  const g1 = sp.locator("[role=group]").filter({ hasText: "Jane sped to the park" });
  await g1.getByRole("button", { name: /received a call/ }).focus();
  await g1.getByRole("button", { name: /received a call/ }).press(" ");
  await g1.getByRole("button", { name: "Undo", exact: true }).click();
  await g1.getByRole("button", { name: /received a call/ }).click();
  await g1.getByRole("button", { name: /sped to the park/ }).click();
  await g1.getByRole("button", { name: /hiding under the thick bushes/ }).click();
  // Second story: wrong order (1, 2, 3) instead of 3, 1, 2. Reset after a partial tap.
  const g2 = sp.locator("[role=group]").filter({ hasText: "Tom placed a box" });
  await g2.getByRole("button", { name: /folded paper cranes/ }).click();
  await g2.getByRole("button", { name: "Reset", exact: true }).click();
  await g2.getByRole("button", { name: /placed a box/ }).click();
  await g2.getByRole("button", { name: /watched a video/ }).click();
  await g2.getByRole("button", { name: /folded paper cranes/ }).click();
  file = await snap(sp, "10-mock-order-set");
  record("student", "Mock order Undo, Reset, keyboard", "One story ordered correctly, one deliberately wrong", "Jane 1-2-3 set, Tom 1-2-3 set (key is 3-1-2)", "PASS", file);
  await sp.getByRole("button", { name: /Stop early and hand in/ }).click();
  await sp.getByRole("button", { name: "Hand in", exact: true }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  file = await snap(sp, "11-henry-result");
  const henryResult = await bodyText(sp);
  record("student", "Mock order result line", "Comprehension includes the one right order; score waits for the parent", (henryResult.match(/Score:[^\n]+/) || ["no score"])[0] + " | " + ((henryResult.match(/Comprehension:[^\n]+/) || [""])[0]), /1\/42 \+ 5 awaiting parent marking/.test(henryResult) && /Comprehension: 1\/7/.test(henryResult) ? "PASS" : "FAIL", file);
  await sp.getByRole("button", { name: /Review answers/ }).click();
  await sp.getByText("Review").waitFor();
  await sp.getByText("Loading").waitFor({ state: "hidden", timeout: 20000 }).catch(() => {});
  await sp.getByText(HENRY).first().waitFor({ timeout: 20000 });
  const review = await bodyText(sp);
  file = await snap(sp, "12-henry-review-order");
  record("student", "Mock review shows the school and the wrong order", HENRY + " and a correct answer for the missed order", (review.includes(HENRY) ? HENRY : "title missing") + (review.includes("Correct answer") ? "; correct answer shown" : "; no correct answer"), review.includes(HENRY) && review.includes("Correct answer") ? "PASS" : "FAIL", file);
  const hid = await childId();
  const henryAnswers = await dbGet("exam_answers?select=question_id,correct,answer&question_id=in.(eoy_henrypark_p2_2023_q41,eoy_henrypark_p2_2023_q45)");
  record("student", "Mock order rows", "q41 correct, q45 not", JSON.stringify(henryAnswers.map((r) => ({ id: r.question_id, correct: r.correct, seq: r.answer && r.answer.seq }))), henryAnswers.find((r) => r.question_id.endsWith("q41"))?.correct === true && henryAnswers.find((r) => r.question_id.endsWith("q45"))?.correct === false ? "PASS" : "FAIL", file);

  await sp.getByRole("button", { name: /Back/ }).click();
  const done = sp.getByRole("button", { name: "Done", exact: true });
  if (await done.count()) await done.click();
  if (!(await sp.getByText("Mock papers", { exact: true }).count())) {
    await sp.goto("/");
    await sp.getByText(/Hello,/).waitFor({ timeout: 20000 });
    await sp.getByRole("button", { name: /English mock papers/ }).click();
  }
  await sp.getByText("Mock papers", { exact: true }).waitFor();

  // —— 1 + 3. Tao Nan cloze words, order wrong, open items, hand in ——
  const priorActivity = await dbGet("daily_activity?user_id=eq." + hid + "&subject=eq.English&select=correct");
  const activityBase = priorActivity.reduce((s, r) => s + (Number(r.correct) || 0), 0);
  await startByLabel(TAO);
  const taoHead = await bodyText(sp);
  file = await snap(sp, "13-taonan-header");
  record("student", "Tao Nan exam title", TAO + " not Nanyang", taoHead.includes("Tao Nan School") && !/Nanyang/.test(taoHead) ? "Tao Nan School in the header" : taoHead.slice(0, 100), taoHead.includes("Tao Nan School") && !/Nanyang/.test(taoHead) ? "PASS" : "FAIL", file);
  await sp.getByRole("button", { name: "Grammar cloze", exact: true }).click();
  await sp.getByText("(21)").first().waitFor();
  const clozeText = await bodyText(sp);
  const nums = ["(21)", "(22)", "(23)", "(24)"].every((n) => clozeText.includes(n));
  file = await snap(sp, "14-taonan-cloze");
  record("student", "Cloze blanks use passage numbers", "(21) (22) (23) (24) and word choices", nums ? "21-24 present" : "missing a passage number", nums ? "PASS" : "FAIL", file);
  async function pickWord(num, word) {
    const ok = await sp.evaluate(({ num, word }) => {
      const want = "(" + num + ")";
      const hosts = [...document.querySelectorAll("div")].filter((d) => [...d.querySelectorAll("b")].some((b) => b.textContent.trim() === want) && [...d.querySelectorAll("button")].some((b) => b.textContent.includes(word)));
      hosts.sort((a, b) => a.innerText.length - b.innerText.length);
      const host = hosts[0];
      if (!host) return false;
      const btn = [...host.querySelectorAll("button")].find((b) => new RegExp("^[A-H]\\.\\s*" + word + "$").test(b.textContent.trim()));
      if (!btn) return false;
      btn.click();
      return true;
    }, { num, word });
    if (!ok) throw new Error("no cloze word " + word + " for " + num);
  }
  await pickWord(21, "down");
  await pickWord(22, "in");
  await pickWord(23, "up"); // key is at
  await pickWord(24, "to"); // key is its
  file = await snap(sp, "15-taonan-cloze-picked");
  record("student", "Cloze accepts words", "21 down, 22 in, 23 up (wrong), 24 to (wrong)", "four words clicked", "PASS", file);

  await sp.getByRole("button", { name: "Comprehension", exact: true }).click();
  await sp.getByText("Tap the cards in order").first().waitFor({ timeout: 20000 });
  const cave = sp.locator("[role=group]").filter({ hasText: "Bill and Sam were camping" });
  await cave.getByRole("button", { name: /discovered that someone/ }).click();
  await cave.getByRole("button", { name: "Undo", exact: true }).click();
  // Wrong order 1, 2, 3. Key is 3, 1, 2.
  await cave.getByRole("button", { name: /discovered that someone/ }).click();
  await cave.getByRole("button", { name: /were camping/ }).click();
  await cave.getByRole("button", { name: /returned to their campsite/ }).click();
  // Fill every other control on every section so the paper counts.
  const sections = ["Grammar (multiple choice)", "Vocabulary (multiple choice)", "Vocabulary cloze", "Editing", "Comprehension"];
  for (const name of sections) {
    await sp.getByRole("button", { name: name, exact: true }).click();
    await sp.waitForTimeout(150);
    await sp.evaluate(() => {
      const visible = (el) => !!(el && (el.getClientRects().length || el.offsetParent));
      const inOrder = (el) => !!el.closest("[aria-label='Put the events in order. Tap them first to last.']");
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      const area = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      for (const el of document.querySelectorAll("input, textarea")) {
        if (!visible(el) || el.disabled || el.type === "password" || el.type === "checkbox") continue;
        if (String(el.value || "").trim()) continue;
        const set = el.tagName === "TEXTAREA" ? area : setter;
        set.call(el, "The snake was asleep by the river.");
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
      const groups = [...document.querySelectorAll("div")].filter((d) => [...d.querySelectorAll(":scope > button")].some((b) => /^[A-H]\. /.test(b.textContent.trim())));
      for (const g of groups) {
        if (inOrder(g)) continue;
        const buttons = [...g.querySelectorAll(":scope > button")].filter((b) => /^[A-H]\. /.test(b.textContent.trim()));
        const chosen = buttons.some((b) => /F5F3FF/.test(b.getAttribute("style") || ""));
        if (!chosen && buttons[1]) buttons[1].click();
        else if (!chosen && buttons[0]) buttons[0].click();
      }
    });
  }
  await sp.getByRole("button", { name: /Stop early and hand in/ }).click();
  const check = await bodyText(sp);
  file = await snap(sp, "16-taonan-check");
  const unanswered = (check.match(/Unanswered:\s*(\d+)/) || [])[1];
  record("student", "Tao Nan ready to hand in", "Most questions answered so the paper can count", "Unanswered " + unanswered + " of the paper", Number(unanswered) <= 8 ? "PASS" : "FAIL", file);
  await sp.getByRole("button", { name: "Hand in", exact: true }).click();
  await sp.getByText(/awaiting parent marking/).waitFor({ timeout: 30000 });
  const result = await bodyText(sp);
  file = await snap(sp, "17-taonan-result");
  const scoreLine = (result.match(/\d+\/\d+ \+ \d+ awaiting parent marking/) || ["missing score line"])[0];
  const waits = /reward is decided after your parent has marked/.test(result);
  const counts = /counts as today's set/.test(result);
  record("student", "Hand-in score waits for the parent", "like 2/36 + 4 awaiting parent marking, reward not awarded yet", scoreLine + (waits ? "; reward waits" : "; reward text missing") + (counts ? "; counts" : "; did not count"), /awaiting parent marking/.test(scoreLine) && waits ? "PASS" : "FAIL", file);
  await sp.getByRole("button", { name: /Review answers/ }).click();
  await sp.getByText("Tao Nan School").first().waitFor();
  file = await snap(sp, "18-taonan-review");
  const rev = await bodyText(sp);
  record("student", "Review title is Tao Nan", "Tao Nan School, not Nanyang", /Tao Nan School/.test(rev) && !/Nanyang/.test(rev) ? "Tao Nan School" : rev.slice(0, 80), /Tao Nan School/.test(rev) && !/Nanyang/.test(rev) ? "PASS" : "FAIL", file);

  const attempts = await dbGet("exam_attempts?student_id=eq." + hid + "&paper_id=eq.wa3_taonan_practicepaper3_2023&select=id,paper_label,score,total,auto_score,auto_total,parent_pending,parent_score,counts,counts_reason,settled_at,sgt_day&order=started_at.desc");
  const att = attempts[0];
  if (!att) throw new Error("Tao Nan attempt missing");
  const clozeRows = await dbGet("exam_answers?attempt_id=eq." + att.id + "&question_id=like.*GrammarCloze*&select=question_id,correct,answer");
  const wanted = [
    ["21", "down", true],
    ["22", "in", true],
    ["23", "up", false],
    ["24", "to", false],
  ];
  const clozeActual = wanted.map(([n, word, ok]) => {
    const row = clozeRows.find((r) => String(r.question_id).endsWith("_" + n));
    return { n, word, row: row && { id: row.question_id, correct: row.correct, val: row.answer && row.answer.val }, match: !!(row && row.answer && row.answer.val === word && row.correct === ok) };
  });
  record("student", "Cloze graded on the word", "down/in correct, up/to wrong", JSON.stringify(clozeActual), clozeActual.every((x) => x.match) ? "PASS" : "FAIL", file);
  const orderRow = await dbGet("exam_answers?attempt_id=eq." + att.id + "&question_id=eq.TN23_H_Q44&select=question_id,correct,answer");
  record("student", "Tao Nan order graded wrong", "seq 1,2,3 is not the key 3,1,2", JSON.stringify(orderRow), orderRow[0] && orderRow[0].correct === false ? "PASS" : "FAIL", file);
  const creditsBefore = await dbGet("reward_credits?child_id=eq." + hid + "&select=kind,credits,status,period");
  record("student", "No paper credit before the parent finishes", "ledger empty until the last open item is marked", JSON.stringify(creditsBefore), creditsBefore.length === 0 ? "PASS" : "FAIL", file);
  record("student", "Attempt stored", "pending 4, not settled, Saturday, counted", JSON.stringify(att), att.parent_pending === 4 && !att.settled_at && att.counts === true && String(att.sgt_day) === "2026-11-21" ? "PASS" : "FAIL", file);

  // —— Parent marks one by one, changes one, then the last mark settles once ——
  await ensureParent(pp, PARENT.email, PARENT.password);
  await pp.getByRole("button", { name: /Amir Tan/ }).click();
  await pp.getByRole("button", { name: /Papers/ }).click();
  await pp.getByText("Open-ended answers to mark").first().waitFor({ timeout: 20000 });
  file = await snap(pp, "19-parent-before-marks");
  await noteScreen(pp, "parent-papers");
  const before = await bodyText(pp);
  record("parent", "Papers tab shows the waiting score and Tao Nan", scoreLine, (before.match(/\d+\/\d+ \+ \d+ awaiting parent marking/) || ["missing"])[0] + (before.includes("Tao Nan School") ? "; Tao Nan" : "; school missing") + (before.includes("Nanyang") ? "; Nanyang present" : ""), /Tao Nan School/.test(before) && /awaiting parent marking/.test(before) && !/Nanyang/.test(before) ? "PASS" : "FAIL", file);

  async function markItem(itemIndex, correct) {
    const card = pp.getByText(TAO, { exact: true }).first().locator("xpath=ancestor::div[.//button[normalize-space()='Correct']][1]");
    await card.getByRole("button", { name: correct ? "Correct" : "Not correct", exact: true }).nth(itemIndex).click();
    await pp.waitForTimeout(600);
    await pp.getByText(TAO, { exact: true }).first().waitFor({ timeout: 20000 });
  }
  // Four open items. Mark 0 correct, 1 wrong, change 0 to wrong, 2 correct, 3 wrong (settles).
  await markItem(0, true);
  let mid = (await bodyText(pp)).match(/Score \d+\/\d+[^\n]*/);
  file = await snap(pp, "20-parent-one-correct");
  record("parent", "First mark adds one", "score and total each rise by 1, still pending", (mid || ["missing"])[0], /awaiting parent marking/.test((mid || [""])[0]) ? "PASS" : "FAIL", file);
  await markItem(1, false);
  mid = (await bodyText(pp)).match(/Score \d+\/\d+[^\n]*/);
  record("parent", "A wrong mark adds to the total only", "total +1, score unchanged, still pending", (mid || ["missing"])[0], /awaiting parent marking/.test((mid || [""])[0]) ? "PASS" : "FAIL", file);
  await markItem(0, false); // change the first mark from correct to wrong
  mid = (await bodyText(pp)).match(/Score \d+\/\d+[^\n]*/);
  file = await snap(pp, "21-parent-changed-mark");
  record("parent", "Changing a mark recomputes", "score drops by 1, total stays, no second add", (mid || ["missing"])[0], /awaiting parent marking/.test((mid || [""])[0]) ? "PASS" : "FAIL", file);
  await markItem(2, true);
  await markItem(3, false);
  await expect(pp.getByText("All marked. The final score is saved.")).toBeVisible({ timeout: 20000 });
  const fin = await bodyText(pp);
  file = await snap(pp, "22-parent-settled");
  const finalLine = (fin.match(/Score \d+\/\d+[^\n]*/) || ["missing"])[0];
  record("parent", "Last mark settles once", "no 'awaiting', final score saved", finalLine, /awaiting parent marking/.test(finalLine) ? "FAIL" : "PASS", file);

  const after = (await dbGet("exam_attempts?id=eq." + att.id + "&select=score,total,auto_score,auto_total,parent_score,parent_total,parent_pending,settled_at"))[0];
  const settledOnce = after.parent_pending === 0 && !!after.settled_at && after.parent_score === 1 && after.parent_total === 4 && after.score === after.auto_score + 1 && after.total === after.auto_total + 4;
  record("parent", "Stored score matches the marks", "auto + 1 correct of 4, pending 0, settled_at set", JSON.stringify(after), settledOnce ? "PASS" : "FAIL", file);
  const credits = await dbGet("reward_credits?child_id=eq." + hid + "&select=kind,credits,status,period,sgd_per_credit,score_pct");
  const stickers = await dbGet("stickers?child_id=eq." + hid + "&select=kind,period");
  const activity = await dbGet("daily_activity?user_id=eq." + hid + "&select=date,subject,questions_answered,correct,done_keys");
  record("parent", "Saturday paper credit", "one paper credit, 6, pending or confirmed, period 2026-11-21", JSON.stringify(credits), credits.length === 1 && credits[0].kind === "paper" && Number(credits[0].credits) === 6 && credits[0].period === "2026-11-21" ? "PASS" : "FAIL", file);
  record("parent", "One paper sticker", "kind paper on Saturday", JSON.stringify(stickers), stickers.some((s) => s.kind === "paper" && s.period === "2026-11-21") ? "PASS" : "FAIL", file);
  const act = activity.find((a) => (a.done_keys || []).some((k) => String(k).startsWith("paper-")));
  const expectCorrect = activityBase + (after.auto_score || 0) + (after.parent_score || 0);
  record("parent", "daily_activity correct includes parent marks", "day correct rises by this paper's auto score plus the parent-correct items", JSON.stringify({ base: activityBase, now: act && act.correct, expect: expectCorrect }), act && act.correct === expectCorrect ? "PASS" : "FAIL", file);

  // Change a mark AFTER settle: score moves, credit is not duplicated, settled_at stays.
  const settledAt = after.settled_at;
  await markItem(2, false);
  await pp.waitForTimeout(500);
  const changed = (await dbGet("exam_attempts?id=eq." + att.id + "&select=score,parent_score,parent_pending,settled_at"))[0];
  const credits2 = await dbGet("reward_credits?child_id=eq." + hid + "&kind=eq.paper&select=id,credits,status");
  const act2 = (await dbGet("daily_activity?user_id=eq." + hid + "&select=correct,done_keys")).find((a) => (a.done_keys || []).some((k) => String(k).startsWith("paper-")));
  const noDouble = credits2.length === 1 && changed.settled_at === settledAt && changed.parent_pending === 0 && changed.parent_score === 0 && changed.score === after.auto_score && act2 && act2.correct === activityBase + after.auto_score;
  file = await snap(pp, "23-parent-after-change");
  record("parent", "A later change does not settle or pay twice", "score drops to the auto score, one credit, same settled_at", JSON.stringify({ changed, credits: credits2.length, correct: act2 && act2.correct }), noDouble ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText(/Credits:/).waitFor({ timeout: 20000 });
  file = await snap(pp, "24-parent-wallet");
  await noteScreen(pp, "parent-wallet");
  const wallet = await bodyText(pp);
  record("parent", "Wallet shows credits and SGD", "6 credits and S$3.00 from 0.50 each", (wallet.match(/Credits:[^\n]+|Pending:[^\n]+|Saturday past paper[^\n]*/) || []).slice(0, 4).join(" | ") || wallet.slice(0, 180), /6/.test(wallet) && /S\$3\.00|3\.00/.test(wallet) ? "PASS" : "FAIL", file);

  await sp.goto("/");
  await sp.getByText(/Hello,/).waitFor({ timeout: 20000 });
  file = await snap(sp, "25-student-wallet");
  await noteScreen(sp, "student-wallet");
  const sw = await bodyText(sp);
  record("student", "Student wallet", "pending or confirmed 6 credits and S$3.00, paper sticker", (sw.match(/Pending:[^\n]+|Wallet:[^\n]+|My Stickers:[^\n]+/) || ["no wallet line"]).join(" | "), (/6/.test(sw) && /S\$3\.00|3\.00/.test(sw)) ? "PASS" : "FAIL", file);

  // Learning dashboard, notebook, rewards settings already shot. Crawl the rest.
  await sp.getByRole("button", { name: "More", exact: true }).first().click();
  await noteScreen(sp, "student-english-home");
  await sp.getByRole("button", { name: "Review", exact: true }).click().catch(() => {});
  await noteScreen(sp, "student-review");
  file = await snap(sp, "26-student-review");
  await sp.getByRole("button", { name: /Mistakes/ }).first().click().catch(async () => {
    await sp.getByRole("button", { name: "Today" }).click();
    await sp.getByRole("button", { name: /Mistakes/ }).first().click();
  });
  await noteScreen(sp, "student-notebook");
  file = await snap(sp, "27-student-notebook");

  await pp.getByRole("button", { name: /Learning/ }).click();
  await pp.waitForTimeout(800);
  file = await snap(pp, "28-parent-learning");
  await noteScreen(pp, "parent-learning");
  await pp.getByRole("button", { name: /Overview/ }).click();
  await noteScreen(pp, "parent-overview");
  await pp.getByRole("button", { name: /Mock/ }).click();
  await noteScreen(pp, "parent-mock-tab");
  file = await snap(pp, "29-parent-mock-tab");

  const mails = alerts();
  const weekly = mails.filter((m) => /week|Tao Nan|past paper|Score/i.test((m.subject || "") + " " + (m.text || "")));
  const weeklyText = weekly.map((m) => (m.subject || "") + "\n" + (m.text || "")).join("\n---\n");
  const finalScore = after.auto_score + "/" + (after.auto_total + 4);
  // The report is sent at the moment of settle, before the post-settle change, so it should contain the settled score.
  const settledScore = after.score + "/" + after.total;
  fs.writeFileSync(path.join(SHOTS, "30-weekly-dry-run.txt"), weeklyText || "(no dry-run email captured)");
  const hangulMail = HANGUL.test(weeklyText);
  record("parent", "Weekly report dry-run", "rendered, not sent, contains the settled score " + settledScore, weekly.length ? (weekly[0].subject || "email") + " hangul=" + hangulMail + " hasScore=" + weeklyText.includes(String(after.score)) : "no dry-run row", weekly.length && !hangulMail && weeklyText.includes(String(after.score)) ? "PASS" : "FAIL", "");
  let milestoneNote = "no event_alert_log row";
  try {
    const events = await dbGet("event_alert_log?select=event_type,status,payload&order=created_at.desc&limit=20");
    const ms = events.filter((e) => e.event_type === "milestone");
    milestoneNote = ms.length ? JSON.stringify(ms.map((e) => ({ status: e.status, score: e.payload && e.payload.score, total: e.payload && e.payload.total }))) : "no milestone row (notifyEvent returns immediately unless WHATSAPP_ENABLED=true)";
    record("parent", "Milestone alert", "a dry-run of the final score while WhatsApp stays off", milestoneNote, ms.length && String((ms[0].payload || {}).score) === String(after.score) ? "PASS" : "FAIL", "");
  } catch (e) {
    record("parent", "Milestone alert", "a dry-run of the final score while WhatsApp stays off", String(e.message || e).slice(0, 200), "FAIL", "");
  }

  const hangulScreens = CRAWL.filter((c) => c.hangul.length);
  record("both", "No Hangul on the screens that were opened", "none", hangulScreens.length ? JSON.stringify(hangulScreens) : CRAWL.map((c) => c.where).join(", "), hangulScreens.length ? "FAIL" : "PASS", "");

  const failed = STEPS.filter((s) => s.status === "FAIL");
  if (failed.length) {
    console.log("FAILURES\n" + failed.map((f) => f.step + ": " + f.actual).join("\n"));
    throw new Error(failed.length + " step(s) failed. See tests/e2e/.state/pr63-steps.json");
  }
});

test("Mrs Tan marks the handed-in Tao Nan paper", async ({ browser }) => {
  test.setTimeout(15 * 60 * 1000);
  assertLocalOnly();
  shiftDays(1);
  const hid = await childId();
  const attempts = await dbGet("exam_attempts?student_id=eq." + hid + "&paper_id=eq.wa3_taonan_practicepaper3_2023&select=id,score,total,auto_score,auto_total,parent_pending,counts,sgt_day&order=started_at.desc");
  const att = attempts[0];
  const clozeRows = await dbGet("exam_answers?attempt_id=eq." + att.id + "&question_id=like.*GrammarCloze*&select=question_id,correct,answer");
  const wanted = [["21", "down", true], ["22", "in", true], ["23", "up", false], ["24", "to", false]];
  const clozeActual = wanted.map(([n, word, ok]) => {
    const row = clozeRows.find((r) => String(r.question_id).endsWith("_" + n));
    return { n, val: row && row.answer && row.answer.val, correct: row && row.correct, match: !!(row && row.answer && row.answer.val === word && row.correct === ok) };
  });
  record("student", "Cloze graded on the word (latest hand-in)", "down and in correct, up and to wrong", JSON.stringify(clozeActual), clozeActual.every((x) => x.match) ? "PASS" : "FAIL", "");

  const beforeAct = await dbGet("daily_activity?user_id=eq." + hid + "&subject=eq.English&select=correct,done_keys");
  const activityBase = beforeAct.reduce((s, r) => s + (Number(r.correct) || 0), 0);

  const parent = await browser.newContext(CTX);
  const pp = await parent.newPage();
  const student = await browser.newContext(CTX);
  const sp = await student.newPage();
  await ensureParent(pp, PARENT.email, PARENT.password);
  await pp.getByRole("button", { name: /Amir Tan/ }).click();
  await pp.getByRole("button", { name: /Papers/ }).click();
  await pp.getByText("Open-ended answers to mark").first().waitFor({ timeout: 20000 });
  let file = await snap(pp, "19-parent-before-marks");
  await noteScreen(pp, "parent-papers");
  const before = await bodyText(pp);
  record("parent", "Papers tab shows the waiting score and Tao Nan", "6/36 + 4 awaiting parent marking", (before.match(/Tao Nan School 2023 WA3[\s\S]{0,80}/) || ["missing"])[0].replace(/\s+/g, " "), /Tao Nan School 2023 WA3/.test(before) && /awaiting parent marking/.test(before) ? "PASS" : "FAIL", file);

  async function markItem(itemIndex, correct) {
    const hit = await pp.evaluate(({ itemIndex, correct, label }) => {
      const cards = [...document.querySelectorAll("div")].filter((d) => (d.innerText || "").trimStart().startsWith(label) && [...d.querySelectorAll("button")].filter((b) => b.textContent.trim() === "Correct").length >= 4);
      cards.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.innerText.length - b.innerText.length);
      const card = cards[0];
      if (!card) return "no-card";
      const items = [...card.querySelectorAll("div")].filter((d) => {
        const names = [...d.querySelectorAll("button")].map((b) => b.textContent.trim());
        return names.filter((n) => n === "Correct").length === 1 && names.filter((n) => n === "Not correct").length === 1 && d.querySelector("b");
      });
      items.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
      const item = items[itemIndex];
      if (!item) return "no-item " + items.length;
      const btn = [...item.querySelectorAll("button")].find((b) => b.textContent.trim() === (correct ? "Correct" : "Not correct"));
      btn.click();
      return (item.innerText || "").replace(/\s+/g, " ").slice(0, 80);
    }, { itemIndex, correct, label: TAO });
    console.log("mark", itemIndex, correct, hit);
    await pp.waitForTimeout(800);
  }
  await markItem(0, true);
  let mid = ((await bodyText(pp)).match(/Tao Nan School 2023 WA3[\s\S]{0,120}/) || ["missing"])[0].replace(/\s+/g, " ");
  file = await snap(pp, "20-parent-one-correct");
  record("parent", "First mark adds one", "7/37 and still 3 awaiting", mid, /7\/37/.test(mid) && /3 awaiting/.test(mid) ? "PASS" : "FAIL", file);
  await markItem(1, false);
  mid = ((await bodyText(pp)).match(/Tao Nan School 2023 WA3[\s\S]{0,120}/) || ["missing"])[0].replace(/\s+/g, " ");
  record("parent", "A wrong mark adds to the total only", "7/38 and 2 awaiting", mid, /7\/38/.test(mid) && /2 awaiting/.test(mid) ? "PASS" : "FAIL", file);
  await markItem(0, false);
  mid = ((await bodyText(pp)).match(/Tao Nan School 2023 WA3[\s\S]{0,120}/) || ["missing"])[0].replace(/\s+/g, " ");
  file = await snap(pp, "21-parent-changed-mark");
  record("parent", "Changing a mark recomputes", "6/38 and 2 awaiting, the correct mark was taken back", mid, /6\/38/.test(mid) && /2 awaiting/.test(mid) ? "PASS" : "FAIL", file);
  await markItem(2, true);
  await markItem(3, false);
  await expect(pp.getByText("All marked. The final score is saved.").first()).toBeVisible({ timeout: 20000 });
  const fin = await bodyText(pp);
  file = await snap(pp, "22-parent-settled");
  record("parent", "Last mark settles once", "7/40 and no items awaiting", (fin.match(/Tao Nan School 2023 WA3[\s\S]{0,100}/) || ["missing"])[0].replace(/\s+/g, " "), /7\/40/.test(fin) && !/Tao Nan School 2023 WA3[\s\S]{0,80}awaiting parent marking/.test(fin) ? "PASS" : "FAIL", file);

  const after = (await dbGet("exam_attempts?id=eq." + att.id + "&select=score,total,auto_score,auto_total,parent_score,parent_total,parent_pending,settled_at"))[0];
  const settledOnce = after.parent_pending === 0 && !!after.settled_at && after.parent_score === 1 && after.parent_total === 4 && after.score === 7 && after.total === 40;
  record("parent", "Stored score matches the marks", "7/40, one parent-correct of four, settled once", JSON.stringify(after), settledOnce ? "PASS" : "FAIL", file);
  const credits = await dbGet("reward_credits?child_id=eq." + hid + "&kind=eq.paper&select=kind,credits,status,period,sgd_per_credit");
  const stickers = await dbGet("stickers?child_id=eq." + hid + "&kind=eq.paper&select=kind,period");
  record("parent", "Saturday paper credit", "one credit of 6 for 2026-11-21", JSON.stringify(credits), credits.length === 1 && Number(credits[0].credits) === 6 && credits[0].period === "2026-11-21" ? "PASS" : "FAIL", file);
  record("parent", "One paper sticker", "paper sticker on Saturday", JSON.stringify(stickers), stickers.length === 1 && stickers[0].period === "2026-11-21" ? "PASS" : "FAIL", file);
  const act = (await dbGet("daily_activity?user_id=eq." + hid + "&subject=eq.English&select=correct,done_keys"))[0];
  record("parent", "daily_activity correct includes the parent mark", "correct was " + activityBase + " and is now " + (activityBase + 1), JSON.stringify(act), act && act.correct === activityBase + 1 ? "PASS" : "FAIL", file);

  const settledAt = after.settled_at;
  await markItem(2, false);
  await pp.waitForTimeout(800);
  const changed = (await dbGet("exam_attempts?id=eq." + att.id + "&select=score,parent_score,parent_pending,settled_at"))[0];
  const credits2 = await dbGet("reward_credits?child_id=eq." + hid + "&kind=eq.paper&select=credits,status");
  const act2 = (await dbGet("daily_activity?user_id=eq." + hid + "&subject=eq.English&select=correct"))[0];
  file = await snap(pp, "23-parent-after-change");
  const noDouble = credits2.length === 1 && changed.settled_at === settledAt && changed.parent_score === 0 && changed.score === 6 && changed.parent_pending === 0 && act2 && act2.correct === activityBase;
  record("parent", "A later change does not pay twice", "score back to 6/40, same settled_at, one credit, correct back to " + activityBase, JSON.stringify({ changed, credits: credits2, correct: act2 && act2.correct }), noDouble ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText(/Credits:/).first().waitFor({ timeout: 20000 });
  file = await snap(pp, "24-parent-wallet");
  await noteScreen(pp, "parent-wallet");
  const wallet = await bodyText(pp);
  record("parent", "Wallet shows credits and SGD", "6 credits and S$3.00", (wallet.match(/Credits:[^\n]+|Pending:[^\n]+|S\$[0-9.]+/) || []).slice(0, 4).join(" | "), /6/.test(wallet) && /3\.00/.test(wallet) ? "PASS" : "FAIL", file);

  await loginStudent(sp, CHILD.username, CHILD.password);
  file = await snap(sp, "25-student-wallet");
  await noteScreen(sp, "student-wallet");
  const sw = await bodyText(sp);
  record("student", "Student wallet after the paper reward", "6 credits and S$3.00", (sw.match(/Pending:[^\n]+|Wallet:[^\n]+|My Stickers:[^\n]+/) || ["no wallet"]).join(" | "), /6/.test(sw) && /3\.00/.test(sw) ? "PASS" : "FAIL", file);

  await pp.getByRole("button", { name: /Learning/ }).click();
  await pp.waitForTimeout(600);
  file = await snap(pp, "28-parent-learning");
  await noteScreen(pp, "parent-learning");
  await pp.getByRole("button", { name: /Overview/ }).click();
  await noteScreen(pp, "parent-overview");
  await pp.getByRole("button", { name: /Mock/ }).click();
  await noteScreen(pp, "parent-mock-tab");
  file = await snap(pp, "29-parent-mock-tab");

  const mails = alerts();
  const weeklyText = mails.map((m) => (m.subject || "") + "\n" + (m.text || "")).join("\n---\n");
  fs.writeFileSync(path.join(SHOTS, "30-weekly-dry-run.txt"), weeklyText || "(no dry-run email captured)");
  const hangulMail = HANGUL.test(weeklyText);
  record("parent", "Weekly report dry-run", "contains the settled 7/40 and was not sent", mails.length ? "emails " + mails.length + " has7/40=" + weeklyText.includes("7/40") + " hangul=" + hangulMail : "no dry-run row", mails.length && weeklyText.includes("7/40") && !hangulMail ? "PASS" : "FAIL", "");
  let ms = [];
  try { ms = (await dbGet("event_alert_log?select=event_type,status,payload&limit=20")).filter((e) => e.event_type === "milestone"); } catch (e) { ms = [{ error: String(e.message || e) }]; }
  record("parent", "Milestone alert with WhatsApp off", "a dry-run carrying 7/40", ms.length ? JSON.stringify(ms).slice(0, 240) : "no milestone row; notifyEvent does nothing unless WHATSAPP_ENABLED=true", "FAIL", "");
  const hangulScreens = CRAWL.filter((c) => c.hangul.length);
  record("both", "No Hangul on parent screens opened in this pass", "none", hangulScreens.length ? JSON.stringify(hangulScreens) : "none", hangulScreens.length ? "FAIL" : "PASS", "");
  const failed = STEPS.filter((s) => s.status === "FAIL");
  if (failed.length) throw new Error(failed.map((f) => f.step + ": " + f.actual).join("\n"));
});

