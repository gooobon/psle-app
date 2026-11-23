const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { shot, bodyText, dbGet, drive, loginStudent, loginParent, logout, ensureParent, ensureStudent } = require("./helpers");

const PARENT_A = { name: "Mrs Tan", email: "mrs.tan.e2e@example.com", password: "Testpass1" };
const PARENT_B = { name: "Mr Tan", email: "mr.tan.e2e@example.com", password: "Testpass2" };
const CHILD = { username: "amir_e2e", name: "Amir Tan", password: "kidpass1", school: "E2E Primary" };
const STATE = path.join("tests", "e2e", ".state");
const CTX = { baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000", timezoneId: "Asia/Singapore", locale: "en-SG", viewport: { width: 1280, height: 900 } };
const phase = process.env.E2E_PHASE || "main";

const notes = [];
function note(scenario, status, detail) {
  notes.push({ scenario, status, detail });
  fs.mkdirSync(STATE, { recursive: true });
  const file = path.join(STATE, "scenarios-" + phase + ".json");
  fs.writeFileSync(file, JSON.stringify(notes, null, 2));
  console.log(`[${status}] ${scenario}: ${detail}`);
}

function fixture() {
  return JSON.parse(fs.readFileSync(path.join("tests", "e2e", "fixtures", "similar.json"), "utf8"));
}

async function finishSet(page, label) {
  return drive(page, {
    label,
    max: 2200,
    done: async () => {
      const t = await bodyText(page);
      return t.includes("correct on first try") || t.includes("题首次答对");
    },
  });
}

async function childId() {
  const rows = await dbGet("profiles?username=eq." + CHILD.username + "&select=id");
  if (!rows.length) throw new Error("child profile missing");
  return rows[0].id;
}

test.describe.configure({ mode: "serial" });

test("parent and student journey @main", async ({ browser }) => {
  test.skip(phase !== "main", "E2E_PHASE is not main");
  test.setTimeout(45 * 60 * 1000);
  fs.mkdirSync(STATE, { recursive: true });

  const parent = await browser.newContext(CTX);
  const pp = await parent.newPage();

  await pp.goto("/");
  await pp.getByText("Welcome back").waitFor();
  await pp.getByRole("button", { name: /Parent Sign Up/ }).click();
  await pp.getByPlaceholder("e.g. Mrs Lee").fill(PARENT_A.name);
  await pp.getByPlaceholder("you@example.com").fill(PARENT_A.email);
  await pp.getByPlaceholder("Create a password").fill(PARENT_A.password);
  await pp.getByPlaceholder("Re-enter password").fill(PARENT_A.password);
  await pp.getByRole("button", { name: "Create Parent Account" }).click();
  await pp.getByTestId("add-child-card").waitFor({ timeout: 20000 });
  await shot(pp, "01-parent-signed-up");

  await pp.getByTestId("ac-username").fill(CHILD.username);
  await pp.getByTestId("ac-first").fill(CHILD.name);
  await pp.getByPlaceholder("School").fill(CHILD.school);
  await pp.getByPlaceholder("Child's password (min 6 chars)").fill(CHILD.password);
  await pp.getByRole("button", { name: "Check", exact: true }).click();
  await expect(pp.getByTestId("ac-name-status")).toBeVisible();
  await pp.getByRole("button", { name: "Create child account" }).click();
  await expect(pp.getByTestId("ac-success")).toBeVisible();
  await expect(pp.getByText(CHILD.name).first()).toBeVisible();
  await shot(pp, "02-child-created");
  const links = await dbGet("parent_child?select=parent_id,child_id");
  expect(links.length).toBe(1);
  note("1 parent signup and child", "PASS", "Mrs Tan created amir_e2e; parent_child has 1 row");

  await pp.getByRole("button", { name: /Share with another parent/ }).click();
  await pp.getByPlaceholder(/Other parent's email/).fill(PARENT_B.email);
  await pp.getByRole("button", { name: "Send invite" }).click();
  await expect(pp.getByText(/Invite created/)).toBeVisible();
  await shot(pp, "03-invite-sent");
  await parent.storageState({ path: path.join(STATE, "parent-a.json") });
  await logout(pp);

  await pp.goto("/");
  await pp.getByRole("button", { name: /Parent Sign Up/ }).click();
  await pp.getByPlaceholder("e.g. Mrs Lee").fill(PARENT_B.name);
  await pp.getByPlaceholder("you@example.com").fill(PARENT_B.email);
  await pp.getByPlaceholder("Create a password").fill(PARENT_B.password);
  await pp.getByPlaceholder("Re-enter password").fill(PARENT_B.password);
  await pp.getByRole("button", { name: "Create Parent Account" }).click();
  await pp.getByText(/invited you to follow/).waitFor({ timeout: 15000 });
  await shot(pp, "04-invite-received");
  await pp.getByRole("button", { name: "Accept" }).click();
  await Promise.race([
    pp.getByText("Welcome back").waitFor({ timeout: 20000 }),
    pp.getByRole("button", { name: new RegExp(CHILD.name) }).waitFor({ timeout: 20000 }),
  ]);
  let relogged = false;
  if (await pp.getByText("Welcome back").count()) {
    relogged = true;
    await loginParent(pp, PARENT_B.email, PARENT_B.password);
  }
  await expect(pp.getByRole("button", { name: new RegExp(CHILD.name) })).toBeVisible();
  note("1 second parent links", "PASS", relogged
    ? "Invite accepted. Accept reloads the page and the in-memory session is not restored, so Mr Tan had to log in again; Amir Tan is then on the dashboard."
    : "Mr Tan accepted the invite and stayed signed in with Amir Tan.");
  await shot(pp, "05-second-parent");
  const both = await dbGet("parent_child?select=parent_id,child_id");
  expect(both.length).toBe(2);
  await parent.storageState({ path: path.join(STATE, "parent-b.json") });
  await parent.close();

  // Rewards configured by the creating parent before any practice, so "no homework" can award.
  const parentA = await browser.newContext({ ...CTX, storageState: path.join(STATE, "parent-a.json") });
  const pa = await parentA.newPage();
  await ensureParent(pa, PARENT_A.email, PARENT_A.password);
  await pa.getByRole("button", { name: /Rewards/ }).click();
  await pa.getByText("Reward rules").waitFor();
  await pa.locator("label", { hasText: "Turn on credits" }).locator("input").check();
  await pa.locator("label", { hasText: "SGD value of 1 credit" }).locator("input").fill("1");
  for (let i = 0; i < 3; i++) await pa.getByRole("button", { name: "+ Add tier" }).click();
  const tiers = [[0, 1], [80, 2], [90, 3]];
  const nums = pa.locator('input[type="number"]');
  for (let i = 0; i < tiers.length; i++) {
    await nums.nth(1 + i * 2).fill(String(tiers[i][0]));
    await nums.nth(2 + i * 2).fill(String(tiers[i][1]));
  }
  await pa.locator("select").selectOption("sgd");
  await pa.locator("label", { hasText: /^English/ }).locator("input").fill("5");
  await pa.locator("label", { hasText: /^Chinese/ }).locator("input").fill("4");
  await pa.getByRole("button", { name: "Save rules" }).click();
  await expect(pa.getByText(/Saved\. Applies from/)).toBeVisible();
  await expect(pa.locator('input[type="number"]')).toHaveCount(11);
  const today = await pa.locator('input[type="date"]').inputValue();
  const tomorrow = new Date(today + "T00:00:00Z");
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const tomorrowYmd = tomorrow.toISOString().slice(0, 10);
  await pa.locator('input[type="date"]').fill(tomorrowYmd);
  await pa.locator('input[type="number"]').nth(6).fill("99");
  await pa.getByRole("button", { name: "Save rules" }).click();
  await expect(pa.getByText(/Saved\. Applies from/)).toBeVisible();
  await expect(pa.getByText("Scheduled changes: " + tomorrowYmd)).toBeVisible();
  await shot(pa, "06-reward-rules");
  const versions = await dbGet("reward_rule_versions?select=effective_from,enabled,sgd_per_credit,daily_tiers,weekly_unit,weekly_amounts&order=effective_from");
  expect(versions.length).toBe(2);
  expect(versions[0].effective_from).toBe(today);
  expect(versions[1].effective_from).toBe(tomorrowYmd);
  expect(versions[0].weekly_unit).toBe("sgd");
  expect(Number(versions[0].sgd_per_credit)).toBe(1);
  expect(versions[0].weekly_amounts.English).toBe(5);
  expect(versions[0].weekly_amounts.Chinese).toBe(4);
  const todayTop = versions[0].daily_tiers.find((t) => t.minPct === 90);
  const tomorrowTop = versions[1].daily_tiers.find((t) => t.minPct === 90);
  expect(todayTop.credits).toBe(3);
  expect(tomorrowTop.credits).toBe(99);
  note("5 reward tiers and effective date", "PASS", "Today's 90% tier is 3 credits; " + tomorrowYmd + " is 99 and does not replace today. Weekly bonus is S$5 English and S$4 Chinese at S$1 per credit.");
  await parentA.close();

  const student = await browser.newContext(CTX);
  const sp = await student.newPage();
  await loginStudent(sp, CHILD.username, CHILD.password);
  await shot(sp, "07-student-today");
  await sp.getByRole("button", { name: "Start today's set" }).click();
  await finishSet(sp, "english-set-1");
  await shot(sp, "08-english-result");
  await sp.getByRole("button", { name: /Back to Home/ }).click();
  await sp.getByText(/Hello,/).waitFor();

  const id = await childId();
  const activity = await dbGet("daily_activity?user_id=eq." + id + "&select=subject,date,sets_completed,questions_answered,correct,first_set_questions,first_set_correct&order=subject");
  const en = activity.find((r) => r.subject === "English");
  expect(en).toBeTruthy();
  expect(en.sets_completed).toBe(1);
  expect(en.first_set_questions).toBe(en.questions_answered);
  expect(en.first_set_correct).toBe(en.correct);
  expect(en.first_set_questions).toBeGreaterThan(0);
  const credits1 = await dbGet("reward_credits?child_id=eq." + id + "&select=kind,subject,credits,score_pct,rule_effective_from");
  const enDaily = credits1.filter((r) => r.kind === "daily" && r.subject === "English");
  expect(enDaily.length).toBe(1);
  expect(enDaily[0].credits).toBeLessThan(99);
  expect(enDaily[0].rule_effective_from).toBe(today);
  note("2 English daily activity and first-set score", "PASS", "English sets=1 questions=" + en.questions_answered + " correct=" + en.correct + " first_set=" + en.first_set_correct + "/" + en.first_set_questions + ". Daily credit " + enDaily[0].credits + " at " + enDaily[0].score_pct + "% from the rule effective " + today + " (tomorrow's 99-credit tier was not used). No homework was assigned, so the gate allowed the credit.");

  await sp.getByRole("button", { name: "Extra set" }).click();
  await finishSet(sp, "english-set-2");
  await sp.getByRole("button", { name: /Back to Home/ }).click();
  await sp.getByText(/Hello,/).waitFor();
  const activity2 = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq.English&select=sets_completed,questions_answered,correct,first_set_questions,first_set_correct");
  expect(activity2[0].sets_completed).toBe(2);
  expect(activity2[0].first_set_questions).toBe(en.first_set_questions);
  expect(activity2[0].first_set_correct).toBe(en.first_set_correct);
  expect(activity2[0].questions_answered).toBeGreaterThan(en.questions_answered);
  const credits2 = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.daily&subject=eq.English&select=credits");
  expect(credits2.length).toBe(1);
  note("2 second set keeps the first-set score", "PASS", "sets_completed=2, questions grew from " + en.questions_answered + " to " + activity2[0].questions_answered + ", first_set stayed " + activity2[0].first_set_correct + "/" + activity2[0].first_set_questions + ". Still one English daily credit.");

  // Causes, patterns, Try similar.
  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  await sp.getByText("Your patterns", { exact: true }).waitFor();
  await sp.getByText("Notebook", { exact: true }).waitFor();
  const card = sp.locator("button", { hasText: "cause not picked" }).first();
  await card.click();
  await sp.getByRole("button", { name: "Didn't know the concept" }).click();
  await expect(sp.getByText("Didn't know the concept").first()).toBeVisible();
  await shot(sp, "09-cause-and-patterns");
  await sp.waitForTimeout(1500);
  const caused = await dbGet("wrong_answers?student_id=eq." + id + "&cause=eq.concept_unknown&select=question_id,cause,question_text");
  expect(caused.length).toBeGreaterThan(0);
  expect(caused.some((r) => r.question_text)).toBeTruthy();
  note("3 cause label and Your patterns", "PASS", "Picked Didn't know the concept. Your patterns is on the notebook. Server rows with cause=concept_unknown: " + caused.length + ".");

  const fx = fixture();
  async function runSimilar(seed, marker, label) {
    await sp.evaluate(({ seed, marker }) => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      const key = Object.keys(all).find((k) => k.endsWith("_P3_English"));
      const p = all[key];
      p.mistakes = p.mistakes || [];
      if (!p.mistakes.some((m) => m.mid === marker)) {
        p.mistakes.push({
          id: seed.id, q: marker + " " + seed.stem, mid: marker, sessionNum: 99,
          date: new Date().toLocaleDateString("en-SG", { day: "2-digit", month: "short", year: "numeric" }),
          sectionType: "Comprehension", topic: "Comprehension", correct: false,
        });
      }
      localStorage.setItem("genius_progress_v2", JSON.stringify(all));
    }, { seed, marker });
    await sp.reload();
    // A restored server session lands on Today ("Hello,"). The login screen is the
    // path when the cookie is not restored. Either way, open the notebook next.
    await sp.waitForFunction(() => {
      const t = document.body.innerText;
      return t.includes("Welcome back") || t.includes("Your patterns") || t.includes("Hello,");
    });
    if (await sp.getByText("Welcome back").count()) await loginStudent(sp, CHILD.username, CHILD.password);
    if (!(await sp.getByText("Your patterns", { exact: true }).count())) {
      await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
    }
    await sp.getByText("Your patterns", { exact: true }).waitFor();
    await sp.getByRole("button", { name: new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }).click();
    const tryBtn = sp.getByRole("button", { name: /Try \d+ similar/ });
    await expect(tryBtn).toBeVisible();
    await tryBtn.click();
    const run = await drive(sp, {
      label,
      max: 400,
      done: async () => sp.evaluate((mid) => {
        const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
        for (const p of Object.values(all)) {
          const m = (p.mistakes || []).find((x) => x && x.mid === mid);
          if (m && Array.isArray(m.retries) && m.retries.length) return m.retries[m.retries.length - 1];
        }
        return null;
      }, marker),
    });
    const retry = await sp.evaluate((mid) => {
      const all = JSON.parse(localStorage.getItem("genius_progress_v2") || "{}");
      for (const p of Object.values(all)) {
        const m = (p.mistakes || []).find((x) => x && x.mid === mid);
        if (m && m.retries && m.retries.length) return m.retries[m.retries.length - 1];
      }
      return null;
    }, marker);
    return { run, retry };
  }

  const edit = await runSimilar(fx.editingSeed, "E2E EDIT SEED", "similar-editing");
  const editSections = edit.retry.ids.map((qid) => fx.byId[qid] && fx.byId[qid].section);
  expect(editSections.some((s) => s === "GrammarMCQ" || s === "VocabMCQ")).toBeTruthy();
  await shot(sp, "10-similar-editing");
  note("3 editing to MCQ same skill", "PASS", "Seed " + fx.editingSeed.id + " (" + fx.editingSeed.skills.join(", ") + ") practised " + edit.retry.ids.join(", ") + " sections " + editSections.join(", "));

  const fact = await runSimilar(fx.factSeed, "E2E FACT SEED", "similar-fact");
  for (const qid of fact.retry.ids) {
    const row = fx.byId[qid];
    expect(row.concepts).toContain("en.reading.fact_finding");
    expect(row.concepts.includes("en.reading.inference") && !row.concepts.includes("en.reading.fact_finding")).toBeFalsy();
  }
  await shot(sp, "11-similar-fact");
  note("3 fact-finding vs inference", "PASS", "Seed " + fx.factSeed.id + " similar ids " + fact.retry.ids.join(", ") + " are fact-finding, not inference.");

  await student.storageState({ path: path.join(STATE, "student.json") });

  // Parent sees the cause, then assigns homework.
  const parentAgain = await browser.newContext({ ...CTX, storageState: path.join(STATE, "parent-a.json") });
  const p2 = await parentAgain.newPage();
  await ensureParent(p2, PARENT_A.email, PARENT_A.password);
  await p2.getByRole("button", { name: /Mistakes/ }).click();
  await expect(p2.getByText("Didn't know the concept").first()).toBeVisible({ timeout: 20000 });
  await shot(p2, "12-parent-cause");
  note("4 parent sees causes", "PASS", "Parent mistakes tab shows the English cause label Didn't know the concept.");

  const hwInput = p2.locator("label", { hasText: "Questions per mistake" }).locator("input");
  // Open a mistake card until the per-mistake count box is on screen.
  const headers = p2.locator("button", { hasText: /Session/ });
  const nHeaders = await headers.count();
  let opened = false;
  for (let i = 0; i < Math.min(nHeaders, 12) && !opened; i++) {
    await headers.nth(i).click();
    if (await hwInput.count()) opened = true;
  }
  expect(opened).toBeTruthy();
  await hwInput.fill("4");
  await shot(p2, "13-homework-count");
  for (let i = 0; i < nHeaders; i++) {
    const used = await dbGet("parent_homework?child_id=eq." + id + "&select=id");
    if (used.length > 10) break;
    const label = await headers.nth(i).innerText();
    if (label.trim().length < 24) continue;
    await headers.nth(i).click();
    const assign = p2.getByRole("button", { name: /Assign up to/ });
    if (!(await assign.count())) continue;
    await assign.first().click();
    await p2.getByText(/Assigned \d+|Already assigned|No similar/).first().waitFor({ timeout: 8000 }).catch(() => {});
  }
  const hw = await dbGet("parent_homework?child_id=eq." + id + "&select=id,question_id,solved_at");
  expect(hw.length).toBeGreaterThan(10);
  const settings = await dbGet("parent_settings?select=homework_per_mistake");
  expect(settings.some((s) => s.homework_per_mistake === 4)).toBeTruthy();
  await shot(p2, "14-homework-assigned");
  note("4 homework count and more than 10", "PASS", "homework_per_mistake saved as 4. Assigned " + hw.length + " questions today (above the old 10/day cap; the abuse bound is 100).");
  await parentAgain.close();

  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: "开始今天的练习" }).click();
  await finishSet(sp, "chinese-set");
  await shot(sp, "15-chinese-result");
  await sp.getByRole("button", { name: /返回主页/ }).click();
  await sp.getByText(/Hello,/).waitFor();
  const zh = await dbGet("daily_activity?user_id=eq." + id + "&subject=eq.Chinese&select=sets_completed,questions_answered,correct,first_set_questions,first_set_correct");
  expect(zh.length).toBe(1);
  expect(zh[0].sets_completed).toBe(1);
  expect(zh[0].first_set_questions).toBeGreaterThan(0);
  const zhCredits = await dbGet("reward_credits?child_id=eq." + id + "&subject=eq.Chinese&select=credits,kind");
  expect(zhCredits.length).toBe(0);
  const openHw = hw.filter((r) => !r.solved_at).length;
  note("2 Chinese daily activity", "PASS", "Chinese sets=1 first_set=" + zh[0].first_set_correct + "/" + zh[0].first_set_questions + ".");
  note("6 credits blocked while homework is open", "PASS", "Chinese daily credit was not written (" + zhCredits.length + " rows) while " + openHw + " homework questions were still unsolved. Issue #32 pending credits are not implemented: English credits awarded before homework existed stayed confirmed, and nothing is stored as pending.");

  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  await sp.getByRole("button", { name: /Start homework/ }).click();
  await drive(sp, {
    label: "homework",
    max: 800,
    done: async () => (await bodyText(sp)).includes("All done for today"),
  });
  await shot(sp, "16-homework-done");
  await sp.getByRole("button", { name: "Today" }).first().click();
  await sp.getByText(/Hello,/).waitFor();
  await sp.waitForTimeout(1500);
  const zhCreditsAfter = await dbGet("reward_credits?child_id=eq." + id + "&subject=eq.Chinese&kind=eq.daily&select=credits,score_pct,rule_effective_from");
  expect(zhCreditsAfter.length).toBe(1);
  expect(zhCreditsAfter[0].rule_effective_from).toBe(today);
  const left = await dbGet("parent_homework?child_id=eq." + id + "&solved_at=is.null&select=id");
  expect(left.length).toBe(0);
  await shot(sp, "17-credits-after-homework");
  note("6 credits after homework, and when none were assigned", "PASS", "After every assigned question was solved, Chinese daily credit " + zhCreditsAfter[0].credits + " at " + zhCreditsAfter[0].score_pct + "% was written. Earlier, English was credited when nothing was assigned.");

  await student.storageState({ path: path.join(STATE, "student.json") });
  fs.writeFileSync(path.join(STATE, "today.txt"), today);
  await student.close();
});

test("saturday weekly bonus and payout @saturday", async ({ browser }) => {
  test.skip(phase !== "saturday", "E2E_PHASE is not saturday");
  test.setTimeout(40 * 60 * 1000);
  const today = fs.readFileSync(path.join(STATE, "today.txt"), "utf8").trim();
  const id = await childId();
  const student = await browser.newContext({ ...CTX, storageState: path.join(STATE, "student.json") });
  const sp = await student.newPage();
  await ensureStudent(sp, CHILD.username, CHILD.password);
  await sp.getByRole("button", { name: /^Mistakes/ }).first().click();
  const weekly = sp.getByRole("button", { name: "Start Weekly Review" });
  await expect(weekly).toBeVisible({ timeout: 20000 });
  await shot(sp, "18-weekly-card");
  await weekly.click();
  await drive(sp, {
    label: "weekly-english",
    max: 1400,
    done: async () => (await bodyText(sp)).includes("Done for this week"),
  });
  await shot(sp, "19-weekly-english-done");
  const once = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.weekly&subject=eq.English&select=credits,sgd_per_credit");
  expect(once.length).toBe(1);
  expect(once[0].credits).toBe(5);

  const again = await sp.evaluate(async () => {
    const r = await fetch("/api/student/rewards/weekly", {
      method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "English", items: 3 }),
    });
    return r.json();
  });
  expect(again.creditsAwarded).toBeFalsy();
  const still = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.weekly&subject=eq.English&select=credits");
  expect(still.length).toBe(1);

  await sp.getByRole("button", { name: "Today" }).first().click();
  await sp.getByRole("button", { name: /^错题/ }).first().click();
  await sp.getByRole("button", { name: "Start Weekly Review" }).click();
  await drive(sp, {
    label: "weekly-chinese",
    max: 1400,
    done: async () => (await bodyText(sp)).includes("Done for this week"),
  });
  const zhWeek = await dbGet("reward_credits?child_id=eq." + id + "&kind=eq.weekly&subject=eq.Chinese&select=credits");
  expect(zhWeek.length).toBe(1);
  expect(zhWeek[0].credits).toBe(4);
  await shot(sp, "20-weekly-chinese-done");
  note("7 per-subject Saturday bonus", "PASS", "English weekly credit 5 and Chinese weekly credit 4, one row each. A second English completion did not add another row (creditsAwarded=" + again.creditsAwarded + ").");
  await student.close();

  const parent = await browser.newContext({ ...CTX, storageState: path.join(STATE, "parent-a.json") });
  const pp = await parent.newPage();
  await ensureParent(pp, PARENT_A.email, PARENT_A.password);
  await pp.getByRole("button", { name: /Rewards/ }).click();
  await pp.getByText(/Credits:/).waitFor();
  await shot(pp, "21-ledger-before-payout");
  const balText = await pp.getByText(/Credits:/).innerText();
  const unpaid = Number((balText.match(/Credits:\s*(\d+)/) || [])[1]);
  expect(unpaid).toBeGreaterThan(0);
  await pp.getByPlaceholder("Credits").fill(String(Math.min(2, unpaid)));
  await pp.getByPlaceholder("Amount S$").fill(String(Math.min(2, unpaid)));
  await pp.getByPlaceholder(/Note/).fill("e2e pocket money");
  await pp.getByRole("button", { name: "Mark paid" }).click();
  await expect(pp.getByText("Recorded as paid.")).toBeVisible();
  await expect(pp.getByText(/e2e pocket money/)).toBeVisible();
  await shot(pp, "22-payout-paid");
  const payouts = await dbGet("reward_payouts?select=credits,amount_sgd,note");
  expect(payouts.length).toBe(1);
  expect(payouts[0].note).toBe("e2e pocket money");
  note("7 parent marks payout paid", "PASS", "Recorded " + payouts[0].credits + " credits as paid (S$" + payouts[0].amount_sgd + "). Practice day was " + today + "; the server clock for this phase is Saturday.");
  await parent.close();
});

test("flags off stays local @off", async ({ browser }) => {
  test.skip(phase !== "off", "E2E_PHASE is not off");
  const ctx = await browser.newContext(CTX);
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    const marker = { e2e_keep: { history: [{ sessionNum: 1, date: "01 Jan 2020", mistakes: [] }], mistakes: [], nextSession: 2 } };
    localStorage.setItem("genius_progress_v2", JSON.stringify(marker));
    localStorage.setItem("genius_users_v2", JSON.stringify({ e2e_keep: { id: "e2e_keep", password: "secret", name: "Keep Me", role: "student", grade: "P3" } }));
  });
  await page.goto("/");
  await page.getByText("Welcome back").waitFor();
  await expect(page.getByRole("button", { name: /Student Sign Up/ })).toBeVisible();
  await expect(page.getByPlaceholder("Your login ID")).toBeVisible();
  await page.locator("button").filter({ hasText: /^\s*Parent\s*$/ }).click();
  await expect(page.getByPlaceholder("Your login ID")).toBeVisible();
  await shot(page, "23-flags-off-login");
  await page.locator("button").filter({ hasText: /^\s*Student\s*$/ }).click();
  await page.getByText("Fill").click();
  await page.getByRole("button", { name: /Log In/ }).click();
  await page.getByText(/Hello,/).waitFor();
  await expect(page.getByText(/1 set left today/).first()).toBeVisible();
  await expect(page.getByText("My Stickers")).toHaveCount(0);
  await expect(page.getByText("Homework from Parent")).toHaveCount(0);
  await shot(page, "24-flags-off-today");
  const kept = await page.evaluate(() => ({
    users: JSON.parse(localStorage.getItem("genius_users_v2") || "{}"),
    progress: JSON.parse(localStorage.getItem("genius_progress_v2") || "{}"),
  }));
  expect(kept.users.e2e_keep.name).toBe("Keep Me");
  expect(kept.users.demo_student).toBeTruthy();
  expect(kept.progress.e2e_keep.history[0].date).toBe("01 Jan 2020");
  const me = await page.request.get("/api/auth/me");
  expect(me.status()).toBe(404);
  note("8 flags off", "PASS", "Login offers Student Sign Up and an ID field. Demo Today has no stickers and no homework. genius_users_v2 and genius_progress_v2 kept the seeded e2e_keep records. /api/auth/me is 404.");
  await ctx.close();
});
