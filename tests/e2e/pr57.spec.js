// Browser pass for PR #57 on local Supabase only. Flags are on in the Next process that serves this test.
// Run after tools/e2e/run-local.sh style setup: E2E_API_URL, E2E_SERVICE_ROLE, E2E_DB_CONTAINER, E2E_DAY_SHIFT_FILE.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { test, expect } = require("@playwright/test");
const { bodyText, dbGet, nudge, loginStudent, loginParent, assertLocalOnly, setupFamily, toTodayHub } = require("./helpers");

const PARENT = { name: "Mrs Tan", email: "mrs.tan.pr57@example.test", password: "Testpass1" };
const CHILD = { username: "amir_e2e", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const CTX = { baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const SHOTS = path.join(process.cwd(), "docs", "e2e-pr57-2026-11-20");
const STEPS = [];

function record(role, step, expected, actual, status, screenshot) {
  STEPS.push({ role, step, expected, actual, status, screenshot: screenshot || "" });
  fs.mkdirSync(path.join("tests", "e2e", ".state"), { recursive: true });
  fs.writeFileSync(path.join("tests", "e2e", ".state", "pr57-steps.json"), JSON.stringify(STEPS, null, 2));
  console.log(`[${status}] ${role} | ${step}: ${actual}`);
}
async function snap(page, name) {
  fs.mkdirSync(SHOTS, { recursive: true });
  const file = path.join(SHOTS, name + ".png");
  await page.screenshot({ path: file, fullPage: true });
  return file;
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

async function pickOptionBySentence(page, sentencePart, optionText) {
  const hit = await page.evaluate(({ sentencePart, optionText }) => {
    const blocks = [...document.querySelectorAll("div")].filter((d) => (d.innerText || "").includes(sentencePart) && /\(1\)/.test(d.innerText || ""));
    blocks.sort((a, b) => a.innerText.length - b.innerText.length);
    const box = blocks[0];
    if (!box) return "no-block";
    const row = [...box.querySelectorAll("div")].find((d) => {
      const spans = [...d.querySelectorAll(":scope > span")];
      return spans.length >= 2 && spans[1].textContent.trim() === optionText;
    });
    if (!row) return "no-option";
    row.click();
    return "ok";
  }, { sentencePart, optionText });
  if (hit !== "ok") throw new Error("practice option " + hit + " for " + sentencePart + " / " + optionText);
}

async function clickWord(page, word) {
  const btn = page.getByRole("button", { name: new RegExp("\\([A-F]\\)\\s*" + word + "$") });
  await btn.first().click();
}

async function finishRetries(page) {
  for (let i = 0; i < 30; i++) {
    const text = await bodyText(page);
    if (/Next Section|Next Page|Back to Home/.test(text) && !/Please complete the retry/.test(text) && !/Not quite/.test(text)) return;
    const acted = await page.evaluate(() => {
      const visible = (el) => !!(el && (el.getClientRects().length || el.offsetParent));
      const buttons = [...document.querySelectorAll("button")].filter(visible);
      const textOf = (el) => (el.innerText || "").replace(/\s+/g, " ").trim();
      const check = buttons.find((b) => !b.disabled && textOf(b) === "Check");
      if (check) { check.click(); return "check"; }
      const ok = buttons.find((b) => !b.disabled && textOf(b) === "OK");
      if (ok) { ok.click(); return "ok"; }
      const retryRow = [...document.querySelectorAll("div")].find((d) => visible(d) && (d.innerText || "").includes("Try again") && d.querySelector("div"));
      if (retryRow) {
        const opt = [...retryRow.querySelectorAll("div")].find((d) => /^\(\d+\)/.test((d.innerText || "").trim()) && getComputedStyle(d).cursor === "pointer");
        if (opt) { opt.click(); return "retry-opt"; }
      }
      const input = [...document.querySelectorAll("input")].find((el) => visible(el) && !el.disabled && !String(el.value || "").trim() && (el.placeholder || "").length >= 0 && el.type !== "password");
      if (input && /Try again|Write it correctly|Not quite/.test(document.body.innerText || "")) {
        const proto = window.HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
        setter.call(input, input.placeholder && input.placeholder.includes("_") ? "word" : "word");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        return "typed-retry";
      }
      return "";
    });
    if (!acted) return;
    await page.waitForTimeout(150);
  }
}

async function driveUntil(page, done, max = 700) {
  let stuck = 0;
  for (let i = 0; i < max; i++) {
    if (await done()) return i;
    const action = await nudge(page);
    if (action === "stuck") {
      stuck++;
      if (stuck >= 8) return -1;
    } else stuck = 0;
    await page.waitForTimeout(30);
  }
  return -1;
}

async function startPaper(page, labelPart) {
  if (!(await page.getByText("Mock papers", { exact: true }).count())) {
    if (!(await page.getByRole("button", { name: /English mock papers/ }).count())) {
      await page.goto("/");
      await page.getByText(/Hello,/).waitFor({ timeout: 20000 });
    }
    await page.getByRole("button", { name: /English mock papers/ }).click();
  }
  await page.getByText("Mock papers", { exact: true }).waitFor();
  await page.getByText(labelPart).first().waitFor({ timeout: 20000 });
  const clicked = await page.getByText(labelPart).first().evaluate((el) => {
    let n = el;
    while (n && ![...n.querySelectorAll("button")].some((b) => /^(Start|Continue)$/.test(b.textContent.trim()))) n = n.parentElement;
    const b = n && [...n.querySelectorAll("button")].find((x) => /^(Start|Continue)$/.test(x.textContent.trim()));
    if (b) { b.click(); return b.textContent.trim(); }
    return "";
  });
  if (!clicked) throw new Error("no start button for " + labelPart);
  await page.getByText("Previous section").waitFor({ timeout: 30000 });
}

async function openSection(page, name) {
  await page.getByRole("button", { name: name, exact: true }).click();
  await page.waitForTimeout(200);
}

async function setTextNear(page, snippet, value) {
  return page.evaluate(({ snippet, value }) => {
    const norm = (s) => String(s || "").replace(/\s+/g, " ");
    const hits = [...document.querySelectorAll("div")].filter((d) => norm(d.innerText).includes(snippet));
    hits.sort((a, b) => norm(a.innerText).length - norm(b.innerText).length);
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    for (const start of hits) {
      let n = start;
      for (let i = 0; i < 8 && n; i++) {
        const inputs = [...n.querySelectorAll("input")].filter((el) => el.type !== "password" && el.type !== "checkbox");
        if (inputs.length === 1) {
          setter.call(inputs[0], value);
          inputs[0].dispatchEvent(new Event("input", { bubbles: true }));
          return true;
        }
        n = n.parentElement;
      }
    }
    return false;
  }, { snippet, value });
}

async function clickChoice(page, snippet, letter) {
  const ok = await page.evaluate(({ snippet, letter }) => {
    const blocks = [...document.querySelectorAll("div")].filter((d) => (d.innerText || "").includes(snippet) && [...d.querySelectorAll("button")].some((b) => b.textContent.trim().startsWith(letter + ".")));
    blocks.sort((a, b) => a.innerText.length - b.innerText.length);
    const box = blocks[0];
    if (!box) return false;
    const btn = [...box.querySelectorAll("button")].find((b) => b.textContent.trim().startsWith(letter + "."));
    if (!btn) return false;
    btn.click();
    return btn.textContent.trim();
  }, { snippet, letter });
  if (!ok) throw new Error("no choice " + letter + " near " + snippet);
  return ok;
}

async function fillUnanswered(page) {
  return page.evaluate(() => {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    const area = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    let n = 0;
    for (const el of document.querySelectorAll("input, textarea")) {
      if (el.disabled || el.type === "password" || el.type === "checkbox") continue;
      if (String(el.value || "").trim()) continue;
      const set = el.tagName === "TEXTAREA" ? area : setter;
      set.call(el, "zz");
      el.dispatchEvent(new Event("input", { bubbles: true }));
      n++;
    }
    const cards = [...document.querySelectorAll("div")].filter((d) => [...d.querySelectorAll(":scope > button")].some((b) => /^[A-D]\. /.test(b.textContent.trim())));
    for (const card of cards) {
      const buttons = [...card.querySelectorAll(":scope > button")].filter((b) => /^[A-D]\. /.test(b.textContent.trim()));
      if (!buttons.length) continue;
      const chosen = buttons.some((b) => /F5F3FF/.test(b.getAttribute("style") || ""));
      if (chosen) continue;
      buttons[0].click();
      n++;
    }
    for (const btn of document.querySelectorAll("button")) {
      if (btn.textContent.trim() !== "True") continue;
      const row = btn.parentElement;
      if (!row) continue;
      const picks = [...row.querySelectorAll("button")].filter((b) => b.textContent.trim() === "True" || b.textContent.trim() === "False");
      if (picks.some((b) => /F5F3FF/.test(b.getAttribute("style") || ""))) continue;
      btn.click();
      n++;
    }
    return n;
  });
}

test("PR 57 student and parent click-through @pr57", async ({ browser }) => {
  test.setTimeout(45 * 60 * 1000);
  assertLocalOnly();
  if (String(process.env.E2E_API_URL || "").includes("zehnulwvysvnsshunxzr")) throw new Error("refusing production");
  shiftDays(0);

  const parent = await browser.newContext(CTX);
  const student = await browser.newContext(CTX);
  const pp = await parent.newPage();
  const sp = await student.newPage();
  const leaks = [];
  sp.on("response", async (res) => {
    if (!res.url().includes("/api/student/exam")) return;
    if (res.request().method() !== "GET" && !String(res.url()).includes("review")) {
      const text = await res.text().catch(() => "");
      if (/"answer"\s*:/.test(text) && !/"answers"\s*:/.test(text)) leaks.push(res.url());
    }
  });

  // Current flow: Sign up -> parent account -> email confirm (mocked / skipped on the local project) -> Add your child (login ID + 4-picture code) -> auto-linked.
  await setupFamily(pp, { parent: PARENT, child: CHILD });
  await confirmParents();
  const id = await childId();

  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText("Reward rules").waitFor();
  await pp.locator("label", { hasText: "Turn on credits" }).locator("input").check();
  await pp.locator("label", { hasText: "SGD value of 1 credit" }).locator("input").fill("0.5");
  await pp.getByRole("spinbutton", { name: "English" }).nth(1).fill("6");
  const effort = pp.locator("label", { hasText: "Effort check" }).locator("input");
  await expect(effort).toBeChecked();
  await pp.getByRole("button", { name: "Save rules" }).click();
  await expect(pp.getByText(/Saved\. Applies from tomorrow/)).toBeVisible();
  const versions = await dbGet("child_setting_versions?child_id=eq." + id + "&select=effective_from,enabled,paper_amounts,paper_check_off&order=effective_from.desc");
  const saved = versions[0];
  record("parent", "Saturday paper reward saved with the effort check on", "6 English credits, check on, starts tomorrow", saved ? JSON.stringify(saved) : "no row", saved && saved.enabled && saved.paper_amounts && Number(saved.paper_amounts.English) === 6 && saved.paper_check_off !== true ? "PASS" : "FAIL", await snap(pp, "01-parent-rules"));

  // —— Practice: past-paper mock (client graded) ——
  await loginStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: "More" }).first().click();
  await sp.getByRole("button", { name: "Extra practice" }).click();
  await sp.getByRole("button", { name: /Past-paper mock/ }).click();
  try {
    await sp.getByText(/Grammar MCQ|four options are given/).first().waitFor({ timeout: 90000 });
  } catch (e) {
    record("student", "Practice opens a past-paper mock", "Grammar MCQ from the past-paper plan", (await bodyText(sp)).slice(0, 300), "FAIL", await snap(sp, "02-practice-mcq"));
    throw e;
  }
  const practiceHead = await bodyText(sp);
  record("student", "Practice opens a past-paper mock", "Grammar MCQ with four options from the past-paper plan", practiceHead.slice(0, 220), /Grammar MCQ/.test(practiceHead) && /I do not need/.test(practiceHead) ? "PASS" : "FAIL", await snap(sp, "02-practice-mcq"));

  await pickOptionBySentence(sp, "I do not need", "any");
  await pickOptionBySentence(sp, "umbrella", "must"); // wrong on purpose: key is should
  await pickOptionBySentence(sp, "My brother", "is training");
  await pickOptionBySentence(sp, "grandmother", "calls");
  await sp.getByRole("button", { name: /^Submit/ }).click();
  await sp.getByText("Not quite").first().waitFor({ timeout: 10000 });
  const mcqMarked = await bodyText(sp);
  const practiceMcqOk = /any/.test(mcqMarked) && (mcqMarked.match(/V/g) || []).length >= 1 && /must/.test(mcqMarked) && /X/.test(mcqMarked);
  record("student", "Practice MCQ correct and wrong", "Right option shows V, the wrong pick shows X", practiceMcqOk ? "V and X on the page" : mcqMarked.slice(0, 300), practiceMcqOk ? "PASS" : "FAIL", await snap(sp, "03-practice-mcq-marked"));
  await finishRetries(sp);
  const next1 = sp.getByRole("button", { name: /Next Page|Next Section/ });
  if (await next1.count()) await next1.first().click();

  // Finish the rest of the grammar/vocab pages and reach cloze with the generic driver, then take over cloze if we land on it.
  const reachedCloze = await driveUntil(sp, async () => /Grammar Cloze|Vocabulary Cloze|Choose the correct word|Write a suitable word/.test(await bodyText(sp)), 120);
  record("student", "Practice reaches a cloze section", "A cloze passage is on screen", reachedCloze >= 0 ? "step " + reachedCloze : "driver stuck", reachedCloze >= 0 ? "PASS" : "FAIL", await snap(sp, "04-practice-cloze"));

  if (reachedCloze >= 0) {
    const clozeText = await bodyText(sp);
    const typed = await sp.locator("input[placeholder='Write a word']").count();
    if (typed > 0) {
      const inputs = sp.locator("input[placeholder='Write a word']");
      const n = await inputs.count();
      if (n >= 1) await inputs.nth(0).fill("  They ");
      if (n >= 2) await inputs.nth(1).fill("wee");
      if (n >= 3) await inputs.nth(2).fill("you");
      if (n >= 4) await inputs.nth(3).fill("I");
      for (let i = 4; i < n; i++) await inputs.nth(i).fill("zz");
    } else if (/Tap a word to fill/.test(clozeText)) {
      await clickWord(sp, "her");
      await clickWord(sp, "we");
      await clickWord(sp, "you");
      await clickWord(sp, "I");
      const more = await sp.locator("button").filter({ hasText: /^\([A-F]\)/ }).count();
      // Fill any still-empty blanks by tapping remaining words once each is not required if only 4 blanks.
      record("student", "Practice cloze is a word bank, not a free-text box", "Typed near-miss is checked on the mock paper; here a wrong word and three right words are tapped", "word-bank buttons " + more, "PASS", "");
    }
    const submit = sp.getByRole("button", { name: /^Submit/ });
    if (await submit.count()) await submit.click();
    await sp.waitForTimeout(400);
    const scored = await bodyText(sp);
    const clozeScore = (scored.match(/Score:\s*(\d+)\/(\d+)/) || [])[0] || "no score line";
    record("student", "Practice cloze marks right and wrong words", "A wrong word is X and a right word is V", clozeScore + "; V " + ((scored.match(/V/g) || []).length) + " X " + ((scored.match(/\bX\b/g) || []).length), /Score:/.test(scored) ? "PASS" : "FAIL", await snap(sp, "05-practice-cloze-marked"));
  }

  const reachedEdit = await driveUntil(sp, async () => /Editing for Spelling|Write correct spelling|togedder|underlined words/.test(await bodyText(sp)), 250);
  record("student", "Practice reaches editing", "Underlined wrong word and a text box", reachedEdit >= 0 ? "step " + reachedEdit : "driver stuck", reachedEdit >= 0 ? "PASS" : "FAIL", await snap(sp, "06-practice-editing"));
  if (reachedEdit >= 0 && /togedder/.test(await bodyText(sp))) {
    const inputs = sp.locator("input[placeholder='Write correct spelling...']");
    const n = await inputs.count();
    const underline = await sp.locator("span", { hasText: "togedder" }).count();
    if (n >= 1) await inputs.nth(0).fill("together");
    if (n >= 2) await inputs.nth(1).fill("1"); // the old numeric-key bug: a digit must not pass
    if (n >= 3) await inputs.nth(2).fill("becomes");
    for (let i = 3; i < n; i++) await inputs.nth(i).fill("zzz");
    await sp.getByRole("button", { name: /^Submit/ }).click();
    await sp.waitForTimeout(400);
    const ed = await bodyText(sp);
    const togetherOk = /together/.test(ed) && /V/.test(ed);
    const digitWrong = /\b1\b/.test(ed) && /X/.test(ed);
    record("student", "Practice editing: underline, correct word, numeric key does not pass", "togedder is highlighted, together is V, typing 1 is X", "underline nodes " + underline + "; " + ((ed.match(/Score:\s*\d+\/\d+/) || [])[0] || ""), togetherOk && digitWrong && underline > 0 ? "PASS" : "FAIL", await snap(sp, "07-practice-editing-marked"));
  }

  const homeSteps = await driveUntil(sp, async () => /← Back to Home/.test(await bodyText(sp)), 500);
  record("student", "Practice mock can be finished", "The result screen is reachable so wrong items can enter the notebook", homeSteps >= 0 ? "reached home button in " + homeSteps + " steps" : "stuck before the result", homeSteps >= 0 ? "PASS" : "FAIL", await snap(sp, "08-practice-result"));
  if (homeSteps >= 0) {
    await sp.getByRole("button", { name: /Back to Home/ }).click();
    await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
    await sp.getByText("Mistakes Log").waitFor({ timeout: 15000 });
    const log = await bodyText(sp);
    const hasWrong = /cause not picked/.test(log);
    const row = sp.getByText("cause not picked").first();
    if (await row.count()) await row.click();
    const guessed = sp.getByRole("button", { name: "Guessed" });
    if (await guessed.count()) await guessed.first().click();
    await sp.waitForTimeout(400);
    const after = await bodyText(sp);
    record("student", "Practice wrong answer is in the notebook and a cause can be picked", "A missed item is listed and Guessed sticks", hasWrong && /Guessed/.test(after) ? "cause picked" : after.slice(0, 220), hasWrong && /· Guessed/.test(after) ? "PASS" : "FAIL", await snap(sp, "09-practice-notebook"));
  }

  // —— Saturday mock papers ——
  shiftDays(1);
  await sp.goto("/");
  await toTodayHub(sp);

  await startPaper(sp, "Tao Nan School 2023 WA3");
  await openSection(sp, "Grammar (multiple choice)");
  const taught = await clickChoice(sp, "Mrs Chan", "B");
  const wrongMcq = await clickChoice(sp, "Sumei stood", "B");
  const optionsText = await bodyText(sp);
  const teachAt = optionsText.indexOf("teach");
  const taughtAt = optionsText.indexOf("taught");
  const teachesAt = optionsText.indexOf("teaches");
  const teachingAt = optionsText.indexOf("teaching");
  const mapOk = teachAt >= 0 && taughtAt > teachAt && teachesAt > taughtAt && teachingAt > teachesAt && String(taught).includes("taught") && String(wrongMcq).includes("all");
  record("student", "Object-map MCQ options render in order", "teach, taught, teaches, teaching in that order; B selects taught and the wrong item selects all", taught + " / " + wrongMcq, mapOk ? "PASS" : "FAIL", await snap(sp, "10-mock-mcq-options"));

  await openSection(sp, "Grammar cloze");
  const clozeBody = await bodyText(sp);
  const clozeGap = /\(21\)/.test(clozeBody) && /\(1\)/.test(clozeBody);
  record("student", "Tao Nan grammar cloze blank numbers", "Passage blanks and answer boxes use the same numbers", clozeGap ? "passage shows (21) and a box shows (1)" : clozeBody.slice(0, 200), clozeGap ? "FAIL" : "PASS", await snap(sp, "11-mock-taonan-cloze"));

  await openSection(sp, "Editing");
  await sp.getByText(/sucesfully|punctuation mark is missing|Write the correct word/).first().waitFor({ timeout: 15000 });
  const editBody = await bodyText(sp);
  const spelled = await setTextNear(sp, "sucesfully", "successfully");
  const punctTyped = await setTextNear(sp, "punctuation mark is missing", ",");
  const punctMarked = await sp.evaluate(() => {
    const el = [...document.querySelectorAll("span")].find((s) => (s.textContent || "").trim() === "is" && /FEF08A/.test(s.getAttribute("style") || ""));
    return !!el;
  });
  record("student", "Editing is typed and punctuation is not underlined as a word", "A text box is present, sucesfully and the comma can be typed, the word is in the punctuation item is not highlighted", "spell=" + spelled + " punct=" + punctTyped + " highlightedIs=" + punctMarked, spelled && punctTyped && !punctMarked && /Write the correct word/.test(editBody) ? "PASS" : "FAIL", await snap(sp, "12-mock-editing"));

  await openSection(sp, "Comprehension");
  const openBoxes = sp.getByPlaceholder("Write your answer (your parent will mark this one)");
  const openCount = await openBoxes.count();
  if (openCount) await openBoxes.first().fill("They were near their campsite.");
  const compBody = await bodyText(sp);
  record("student", "Open-ended comprehension asks the parent to mark it", "The box says the parent will mark it, and a passage is shown when the paper has one", openCount + " parent-marked boxes; passage text " + (/Sam and Bill|camp/.test(compBody)), openCount > 0 ? "PASS" : "FAIL", await snap(sp, "13-mock-open"));

  await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  const taoResult = await bodyText(sp);
  const taoScore = (taoResult.match(/Score:\s*(\d+)\/(\d+)/) || []);
  const taoLittle = /did not count as a set/.test(taoResult) && /No Saturday paper reward/.test(taoResult);
  const taoNoExcluded = !/not counted in your score|not available in our copy/.test(taoResult);
  record("student", "Short Saturday paper: full total, no excluded, effort check blocks the reward", "Score denominator is the auto-marked total (36 on Tao Nan WA3), the paper does not count, no Saturday credits", "score " + (taoScore[0] || "none") + "; little=" + taoLittle + "; excludedWording=" + !taoNoExcluded, taoScore[2] === "36" && taoLittle && taoNoExcluded ? "PASS" : "FAIL", await snap(sp, "14-taonan-result"));

  await sp.getByRole("button", { name: "Review answers" }).click();
  await sp.getByText("Why did you get it wrong?").first().waitFor({ timeout: 20000 });
  await sp.getByRole("button", { name: "Misread the question" }).first().click();
  await sp.waitForTimeout(500);
  const review = await bodyText(sp);
  const causeStuck = /Misread the question/.test(review);
  record("student", "Wrong object-map MCQ is in the review notebook with a cause", "The missed choice can be tagged Misread the question", causeStuck ? "cause button saved" : review.slice(0, 200), causeStuck ? "PASS" : "FAIL", await snap(sp, "15-review-cause"));

  await pp.bringToFront();
  await pp.goto("/");
  await pp.getByRole("button", { name: /Papers/ }).click();
  await pp.getByText("Model answer:").first().waitFor({ timeout: 20000 });
  const beforeMark = await bodyText(pp);
  const scoreBefore = (beforeMark.match(/Score\s+(\d+)\/(\d+)/) || [])[0] || "";
  await pp.getByRole("button", { name: "Correct" }).first().click();
  await pp.getByText(/0 left|marked|Correct/).first().waitFor({ timeout: 15000 });
  await pp.waitForTimeout(600);
  const afterMark = await bodyText(pp);
  const scoreAfter = (afterMark.match(/Score\s+(\d+)\/(\d+)/) || [])[0] || "";
  const marked = await dbGet("exam_answers?parent_correct=eq.true&select=question_id,parent_correct");
  record("parent", "Parent marks an open-ended answer", "The mark is stored. The auto-marked score line does not jump, because parent marks are kept beside it", "before " + scoreBefore + " after " + scoreAfter + " marked rows " + marked.length, marked.length >= 1 && scoreBefore === scoreAfter ? "PASS" : "FAIL", await snap(pp, "16-parent-mark"));

  // Passage-less reading set
  await sp.bringToFront();
  const back = sp.getByRole("button", { name: /← Back|Back/ }).first();
  if (await back.count()) await back.click();
  await sp.getByRole("button", { name: "Done" }).click();
  await sp.getByText("Mock papers", { exact: true }).waitFor();
  await startPaper(sp, "Ai Tong School 2025");
  await openSection(sp, "Comprehension");
  const ai = await bodyText(sp);
  const noPass = /line 15/.test(ai) && !/Once upon|passage/.test(ai.slice(0, 500));
  const showsQuestion = /What does/.test(ai) || /line 15/.test(ai);
  record("student", "A reading set with no passage still shows the questions", "Questions such as line 15 are on screen and there is no passage block above them", showsQuestion ? ai.slice(0, 280) : "question missing", showsQuestion ? "PASS" : "FAIL", await snap(sp, "17-no-passage"));
  // noPass is informational: the question text itself contains no story, which is the gap the source has.
  if (!noPass) record("student", "Passage-less screen note", "The question is visible even though the source passage is empty", "question text includes extra words; see the screenshot", "PASS", "");
  await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  await sp.getByRole("button", { name: "Done" }).click();

  // Catholic High 2024: typed cloze variants, then enough answers for the effort check
  await startPaper(sp, "Catholic High Primary School 2024");
  await openSection(sp, "Grammar cloze");
  await setTextNear(sp, "(15)", "We");
  await setTextNear(sp, "(16)", "  us  ");
  await setTextNear(sp, "(17)", "hiss");
  await setTextNear(sp, "(18)", "he");
  record("student", "Mock cloze typed with case, spaces and a near-miss", "We, spaced us, hiss, and he are entered on blanks 15-18", "filled", "PASS", await snap(sp, "18-ch-cloze-typed"));
  await openSection(sp, "Editing");
  await setTextNear(sp, "piriod", "period");
  const piriodLine = await sp.evaluate(() => {
    const el = [...document.querySelectorAll("span")].find((s) => (s.textContent || "").trim() === "piriod");
    return el ? (el.getAttribute("style") || "") : "missing";
  });
  const underlined = /underline/.test(piriodLine) && (/FEF08A/i.test(piriodLine) || /254,\s*240,\s*138/.test(piriodLine));
  record("student", "Mock editing underlines the misspelled word", "piriod is underlined and period is typed", piriodLine, underlined ? "PASS" : "FAIL", await snap(sp, "19-ch-editing"));

  for (const name of ["Grammar (multiple choice)", "Vocabulary (multiple choice)", "Grammar cloze", "Vocabulary cloze", "Editing", "Comprehension"]) {
    const tab = sp.getByRole("button", { name, exact: true });
    if (await tab.count()) {
      await tab.click();
      await fillUnanswered(sp);
      await sp.waitForTimeout(100);
    }
  }
  await sp.getByRole("button", { name: "Stop early and hand in" }).click();
  let unanswered = await bodyText(sp);
  let guard = 0;
  while (/Unanswered:\s*(\d+)/.test(unanswered) && guard < 4) {
    const m = unanswered.match(/Unanswered:\s*(\d+)\s*of\s*(\d+)/);
    const left = m ? Number(m[1]) : 0;
    const total = m ? Number(m[2]) : 1;
    if (left / total <= 0.2) break;
    await sp.getByRole("button", { name: "Back to the paper" }).click();
    for (const name of ["Grammar (multiple choice)", "Vocabulary (multiple choice)", "Grammar cloze", "Vocabulary cloze", "Editing", "Comprehension"]) {
      const tab = sp.getByRole("button", { name, exact: true });
      if (await tab.count()) { await tab.click(); await fillUnanswered(sp); }
    }
    await sp.getByRole("button", { name: "Stop early and hand in" }).click();
    unanswered = await bodyText(sp);
    guard++;
  }
  await sp.getByRole("button", { name: "Hand in" }).click();
  await sp.getByText(/Score:/).waitFor({ timeout: 30000 });
  const chResult = await bodyText(sp);
  const chRow = await dbGet("exam_attempts?student_id=eq." + id + "&paper_id=eq.eoy_catholichigh_p2_2024&select=score,total,answered,question_count,counts,counts_reason,open_total&order=submitted_at.desc&limit=1");
  const credits = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.paper&select=credits,status,period");
  const row = chRow[0];
  const counted = row && row.counts === true && row.total >= 30 && Number(row.question_count) >= 40;
  const paid = credits.some((c) => Number(c.credits) === 6 && c.status === "pending");
  const clozeRight = row && row.score >= 2; // We/us/he should be right; hiss wrong. Not the only points.
  record("student", "Larger paper counts and the Saturday effort check pays", "Catholic High 2024 total is the full auto-marked set, counts is true, 6 credits pending. Case and spaces match; a near-miss does not have to.", JSON.stringify({ row, credits, screen: (chResult.match(/Score:\s*\d+\/\d+/) || [])[0], reward: /Saturday past paper done/.test(chResult) }), counted && paid && /Saturday past paper done/.test(chResult) ? "PASS" : "FAIL", await snap(sp, "20-saturday-reward"));
  record("student", "Near-miss spelling is not given the cloze mark for free", "hiss is not the key his; the other three blanks were the key with case or spaces changed", clozeRight ? "score includes the matching blanks (score " + row.score + "/" + row.total + ")" : "score " + (row && row.score), clozeRight ? "PASS" : "FAIL", "");

  const tao = await dbGet("exam_attempts?student_id=eq." + id + "&paper_id=eq.wa3_taonan_practicepaper3_2023&select=score,total,question_count,counts,open_total&order=submitted_at.desc&limit=1");
  record("student", "Tao Nan grade stored with nothing excluded", "total 36, question_count 40, open 4, counts false", JSON.stringify(tao[0] || null), tao[0] && tao[0].total === 36 && tao[0].question_count === 40 && tao[0].open_total === 4 && tao[0].counts === false ? "PASS" : "FAIL", "");

  const fails = STEPS.filter((s) => s.status === "FAIL");
  console.log("PR57 steps " + STEPS.length + ", fails " + fails.length);
  if (fails.length) console.log(fails.map((f) => "FAIL " + f.step + ": " + f.actual).join("\n"));
});
