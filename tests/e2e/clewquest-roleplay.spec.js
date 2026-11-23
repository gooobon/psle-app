// ClewQuest Phase 1 role-play. Local Supabase only. Does not change product code.
// Run after `npm run e2e:clewquest`, with the same local env (see the report).
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { bodyText, dbGet, drive, shot, assertLocalOnly } = require("./helpers");

const PROD = "zehnulwvysvnsshunxzr";
const HANGUL = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/;
const OUT = path.join(process.cwd(), process.env.E2E_SHOTS_DIR || "docs/e2e-clewquest-phase1-2026-11-23");
const LABELS = ["Owl", "Lyre", "Laurel", "Ship", "Column", "Amphora", "Grapes", "Sun", "Shield"];
const BOY_HAIR = ["apollo-curls", "hermes-wind", "achilles-plume", "heracles-crop", "perseus-waves"];
const GIRL_HAIR = ["athena-braid", "artemis-tail", "aphrodite-waves", "persephone-wreath", "ariadne-buns"];
const COLOURS = ["ariadne-crimson", "apollo-gold", "athena-olive", "raw-flax", "tyrian-purple", "egyptian-blue"];
const COLOUR_NAMES = ["Ariadne Crimson", "Apollo Gold", "Athena Olive", "Raw Flax", "Tyrian Purple", "Egyptian Blue"];

const results = [];
const findings = [];
let currentPage = null;
function note(severity, area, detail) { findings.push({ severity, area, detail }); }
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, pass: true });
    console.log("PASS", name);
  } catch (e) {
    const error = String(e && e.stack || e).slice(0, 800);
    results.push({ name, pass: false, error });
    console.log("FAIL", name, error.split("\n")[0]);
    if (currentPage) { try { await shot(currentPage, "fail-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 48)); } catch {} }
  }
}
function dump() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "roleplay-results.json"), JSON.stringify({ results, findings }, null, 2));
}

function guard() {
  assertLocalOnly();
  const urls = [process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.E2E_API_URL, process.env.E2E_BASE_URL].join(" ");
  if (urls.includes(PROD)) throw new Error("Refusing to run: production Supabase ref detected.");
  if (!process.env.E2E_API_URL || !process.env.E2E_SERVICE_ROLE) throw new Error("E2E_API_URL and E2E_SERVICE_ROLE are required.");
  if (/^https:\/\/[a-z0-9]{20}\.supabase\.co/i.test(process.env.E2E_API_URL)) throw new Error("Refusing hosted Supabase.");
}

async function dbWrite(method, pathname, body) {
  assertLocalOnly();
  const url = process.env.E2E_API_URL.replace(/\/$/, "") + "/rest/v1/" + pathname;
  if (url.includes(PROD)) throw new Error("refusing production");
  const key = process.env.E2E_SERVICE_ROLE;
  const r = await fetch(url, {
    method,
    headers: {
      apikey: key, Authorization: "Bearer " + key, Accept: "application/json",
      "Content-Type": "application/json", Prefer: "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error("db " + method + " " + r.status + " " + pathname + " " + text.slice(0, 240));
  return text ? JSON.parse(text) : null;
}

async function noKorean(page, where) {
  const t = await page.evaluate(() => {
    const bits = [document.body.innerText || ""];
    document.querySelectorAll("[alt],[aria-label],[title]").forEach((el) => {
      bits.push(el.getAttribute("alt") || "", el.getAttribute("aria-label") || "", el.getAttribute("title") || "");
    });
    return bits.join("\n");
  });
  if (HANGUL.test(t)) note("high", "korean", where + " shows Hangul");
  expect(HANGUL.test(t), where).toBe(false);
}

async function noGameOnSolve(page, where) {
  const n = await page.locator("[data-testid^='cq-']").count();
  const imgs = await page.locator("img[src*='/clewquest/']").count();
  const text = await bodyText(page);
  expect(n, where + " cq testids").toBe(0);
  expect(imgs, where + " clewquest images").toBe(0);
  expect(/thread|ClewQuest|Stage [1-8]/i.test(text), where + " game copy").toBe(false);
}

function setNativeValue(el, value) {
  const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
  const tracker = el._valueTracker;
  if (tracker) tracker.setValue("");
  setter.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

async function clickChoice(page, qNum, optNum) {
  const head = page.locator("span", { hasText: new RegExp("^" + qNum + "\\.$") }).first();
  await head.scrollIntoViewIfNeeded();
  const block = head.locator("xpath=ancestor::div[2]");
  await block.locator("div").filter({ has: page.locator("span", { hasText: new RegExp("^\\(" + optNum + "\\)$") }) }).first().click();
}

async function retryChoice(page, qNum, optNum) {
  const head = page.locator("span", { hasText: new RegExp("^" + qNum + "\\.$") }).first();
  const block = head.locator("xpath=ancestor::div[2]");
  const hint = block.locator("div").filter({ hasText: /Not quite! Hint:|再想想/ }).first();
  await hint.scrollIntoViewIfNeeded();
  await hint.locator("div").filter({ has: page.locator("span", { hasText: new RegExp("^\\(" + optNum + "\\)$") }) }).first().click();
  await hint.getByRole("button", { name: /^(Check|确认)$/ }).click();
}

test.describe.configure({ mode: "serial" });
test.use({ viewport: { width: 390, height: 844 } });

test("role-play ClewQuest Phase 1", async ({ page }) => {
  guard();
  currentPage = page;
  test.setTimeout(50 * 60 * 1000);
  const stamp = Date.now().toString(36).slice(-6);
  const student = "cqrp_" + stamp;
  const lockUser = "cqlk_" + stamp;
  const passUser = "cqpw_" + stamp;
  const parentEmail = "cqparent_" + stamp + "@local.test";
  const otherEmail = "cqother_" + stamp + "@local.test";
  const CODE = [0, 3, 5, 8];
  const LOCK_CODE = [1, 2, 4, 6];
  const NEW_CODE = [8, 7, 6, 5];

  try {
    await check("picture signup shows a label under every picture", async () => {
      await page.goto("/");
      await page.getByTestId("cq-open-picture-signup").click();
      await page.getByTestId("su-username").fill(student);
      await page.getByTestId("su-name").fill("Aria Tan");
      await page.getByTestId("su-next").click();
      for (let i = 0; i < 9; i++) {
        const lab = page.getByTestId("pic-label-" + i);
        await expect(lab).toBeVisible();
        await expect(lab).toHaveText(LABELS[i]);
      }
      const glyphs = await page.evaluate(() => [...document.querySelectorAll("[data-testid^='pic-'] span[aria-hidden='true']")].map((el) => {
        const t = el.textContent || "";
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = "32px 'Noto Color Emoji', sans-serif";
        return { t, w: Math.round(ctx.measureText(t).width), h: Math.round(el.getBoundingClientRect().height) };
      }));
      fs.mkdirSync(OUT, { recursive: true });
      fs.writeFileSync(path.join(OUT, "picture-glyphs.json"), JSON.stringify(glyphs, null, 2));
      await shot(page, "rp-01-picture-labels");
      for (const i of CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("su-next2").click();
      for (const i of CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("su-create").click();
      await expect(page.getByTestId("cq-builder")).toBeVisible({ timeout: 30000 });
      await noKorean(page, "builder step 1");
    });

    await check("builder: boy and girl, 10 hairstyles, 6 colours, 40-char nickname rejected", async () => {
      await page.getByTestId("cq-gender-boy").click();
      for (const h of BOY_HAIR) await expect(page.getByTestId("cq-hair-" + h)).toBeVisible();
      expect(await page.locator("[data-testid^='cq-hair-']").count()).toBe(5);
      await page.getByRole("button", { name: "Back" }).click();
      await page.getByTestId("cq-gender-girl").click();
      for (const h of GIRL_HAIR) await expect(page.getByTestId("cq-hair-" + h)).toBeVisible();
      expect(await page.locator("[data-testid^='cq-hair-']").count()).toBe(5);
      await page.getByTestId("cq-hair-ariadne-buns").click();
      await shot(page, "rp-02-hair-girl");
      await page.getByTestId("cq-next-hair").click();
      for (let i = 0; i < COLOURS.length; i++) {
        const b = page.getByTestId("cq-colour-" + COLOURS[i]);
        await expect(b).toBeVisible();
        await expect(b).toContainText(COLOUR_NAMES[i]);
      }
      expect(await page.locator("[data-testid^='cq-colour-']").count()).toBe(6);
      await page.getByTestId("cq-colour-egyptian-blue").click();
      await shot(page, "rp-03-colours");
      await page.getByTestId("cq-next-colour").click();
      const nick = page.getByTestId("cq-nickname");
      await nick.fill("A".repeat(40));
      const shown = await nick.inputValue();
      if (shown.length < 40) note("medium", "nickname", "Typing 40 characters into the nickname field keeps " + shown.length + " (" + JSON.stringify(shown) + "). The field does not show a rejection; maxLength cuts the text.");
      await nick.evaluate((el) => {
        el.removeAttribute("maxLength");
        const proto = window.HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
        if (el._valueTracker) el._valueTracker.setValue("");
        setter.call(el, "A".repeat(40));
        el.dispatchEvent(new Event("input", { bubbles: true }));
      });
      await page.getByTestId("cq-save").click();
      await expect(page.getByTestId("cq-builder-error")).toContainText(/2-12/);
      await shot(page, "rp-04-nickname-rejected");
      await nick.fill("Bluebun");
      await page.getByTestId("cq-save").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await noKorean(page, "landing");
    });

    await check("four islands: open subjects, coming soon, tap targets", async () => {
      await shot(page, "rp-05-landing-mobile");
      const hits = await page.evaluate(() => {
        const root = document.querySelector("[data-testid='cq-landing'] img");
        const box = root.getBoundingClientRect();
        const pts = [
          ["english", 0.23, 0.28],
          ["chinese", 0.23, 0.74],
          ["math", 0.77, 0.28],
          ["science", 0.77, 0.74],
          ["clew", 0.50, 0.45],
        ];
        return pts.map(([name, px, py]) => {
          const x = box.left + box.width * px;
          const y = box.top + box.height * py;
          let el = document.elementFromPoint(x, y);
          // scroll that point into the viewport if the map is taller than the screen
          if (!el) {
            window.scrollTo(0, window.scrollY + y - 200);
            el = document.elementFromPoint(x, Math.min(y, 400));
          }
          const btn = el && el.closest ? el.closest("button") : null;
          return { name, testid: btn ? btn.getAttribute("data-testid") : null, tag: el ? el.tagName : null, y: Math.round(y) };
        });
      });
      fs.writeFileSync(path.join(OUT, "hotspots.json"), JSON.stringify(hits, null, 2));
      // Click the art point for each island, not only the text chip.
      async function clickArt(px, py) {
        const img = page.locator("[data-testid='cq-landing'] img").first();
        const box = await img.boundingBox();
        await page.mouse.click(box.x + box.width * px, box.y + box.height * py);
      }
      await clickArt(0.77, 0.28);
      await expect(page.getByTestId("cq-toast")).toHaveText("Coming soon");
      await shot(page, "rp-06-math-toast");
      await page.waitForTimeout(2300);
      await clickArt(0.77, 0.74);
      await expect(page.getByTestId("cq-toast")).toHaveText("Coming soon");
      await expect(page.getByTestId("cq-landing")).toBeVisible();
      const labels = await page.locator("[data-testid^='cq-island-']").allInnerTexts();
      if (labels.some((t) => /\n/.test(t) || /soon\)\s*$/m.test(t) && t.includes("\n"))) {
        note("medium", "landing-labels", "Island coming-soon labels wrap inside the chip: " + JSON.stringify(labels));
      }
    });

    await check("Today from landing and home, and leaving a subject returns", async () => {
      await page.getByTestId("cq-today").click();
      await expect(page.getByTestId("today-back-to-islands")).toBeVisible({ timeout: 20000 });
      await expect(page.getByText("Hello, Aria")).toBeVisible();
      await shot(page, "rp-07-today-from-landing");
      await noKorean(page, "today hub");
      await page.getByTestId("today-back-to-islands").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible();
      // English from the landing, then leave without finishing a set.
      await page.getByTestId("cq-island-english").click();
      await expect(page.getByText("Start today's set", { exact: true })).toBeVisible({ timeout: 20000 });
      await page.getByRole("button", { name: "Today", exact: true }).click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("cq-clew").click();
      await expect(page.getByTestId("cq-home")).toBeVisible();
      await page.getByTestId("cq-today-home").click();
      await expect(page.getByTestId("today-back-to-islands")).toBeVisible();
      await page.getByTestId("today-back-to-islands").click();
      await expect(page.getByTestId("cq-home")).toBeVisible();
      await page.getByTestId("cq-go-english").click();
      await expect(page.getByText("Start today's set", { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Today", exact: true }).click();
      await expect(page.getByTestId("cq-home")).toBeVisible({ timeout: 20000 });
      await page.getByRole("button", { name: "Back to the islands" }).click();
      await expect(page.getByTestId("cq-landing")).toBeVisible();
    });

    await check("stages 1-5 art and stage 6+ not offered", async () => {
      const rows = await dbGet("profiles?select=id,username&username=eq." + student);
      expect(rows.length).toBe(1);
      const uid = rows[0].id;
      fs.writeFileSync(path.join(OUT, "student-id.txt"), uid);
      const targets = [0, 25, 100, 300, 700, 10000];
      const expectStage = [1, 2, 3, 4, 5, 5];
      for (let i = 0; i < targets.length; i++) {
        const haveRows = await dbGet("clewquest_thread_ledger?select=amount&user_id=eq." + uid);
        const have = haveRows.reduce((s, r) => s + Number(r.amount), 0);
        const need = Math.round((targets[i] - have) * 10) / 10;
        if (need > 0) {
          await dbWrite("POST", "clewquest_thread_ledger", {
            user_id: uid, grade: "P3", subject: "english", amount: need,
            reason: "correct_first_try", source_ref: "seed-stage-" + targets[i],
          });
        }
        await page.goto("/");
        await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
        await page.getByTestId("cq-clew").click();
        await expect(page.getByTestId("cq-home")).toBeVisible();
        const total = Number(await page.getByTestId("cq-thread-total").innerText());
        expect(total).toBeCloseTo(targets[i], 1);
        const body = await bodyText(page);
        expect(body).toContain("Stage " + expectStage[i]);
        expect(body).not.toMatch(/Stage 6|Stage 7|Stage 8/);
        expect(body).toContain("Coming later");
        const src = await page.getByTestId("cq-character").getAttribute("src");
        if (expectStage[i] <= 4) expect(src).toContain("/clewquest/stages/stage-" + expectStage[i]);
        else expect(src).toContain("/clewquest/characters/stage5-");
        expect(src).not.toMatch(/stage-6|stage-7|stage-8/);
        if (targets[i] >= 700) expect(body).toContain("Full-grown Clew");
        else expect(body).not.toMatch(/thread to Stage [6-8]/);
        await shot(page, "rp-stage-" + expectStage[i] + (targets[i] === 10000 ? "-cap" : ""));
      }
      // Drop the seed rows so the later practice round is the only thread, then the exam adds real awards.
      // Local test user only. genius_* keys are not touched.
      await dbWrite("DELETE", "clewquest_thread_ledger?user_id=eq." + uid + "&source_ref=like.seed-stage-*");
    });

    await check("English ExamSession: +1 / +0.5 / 0 and no game UI on solve", async () => {
      await page.goto("/");
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("cq-island-english").click();
      await page.getByText("Start today's set", { exact: true }).click();
      await expect(page.getByRole("button", { name: /Submit Page 1\// })).toBeVisible({ timeout: 20000 });
      await expect(page.getByText("Grammar MCQ (4 marks)")).toBeVisible();
      await noGameOnSolve(page, "english question");
      await shot(page, "rp-10-en-question");
      // S01 grammar page 1: B1 ans 2 (1-based), B2 wrong then retry 3, B3 wrong then wrong, B4 ans 3.
      await clickChoice(page, 1, 2);
      await clickChoice(page, 2, 1);
      await clickChoice(page, 3, 1);
      await clickChoice(page, 4, 3);
      await page.getByRole("button", { name: /Submit Page 1\// }).click();
      await expect(page.getByText("Not quite! Hint:").first()).toBeVisible();
      await noGameOnSolve(page, "english marking");
      await shot(page, "rp-11-en-marking");
      await retryChoice(page, 2, 3);
      await retryChoice(page, 3, 2);
      await page.getByRole("button", { name: /Next Page|Finish Section/ }).click();
      await drive(page, { label: "rp-en", max: 2500, done: async () => (await bodyText(page)).includes("correct on first try") });
      expect(await page.locator("[data-testid^='cq-']").count()).toBe(0);
      await shot(page, "rp-12-en-result");
      await page.getByRole("button", { name: /Back to Home/ }).click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await page.waitForTimeout(2500);
      await page.getByTestId("cq-clew").click();
      await expect(page.getByTestId("cq-home")).toBeVisible();
      const uid = fs.readFileSync(path.join(OUT, "student-id.txt"), "utf8").trim();
      const ledger = await dbGet("clewquest_thread_ledger?select=amount,reason,subject,source_ref&user_id=eq." + uid + "&order=source_ref.asc");
      const by = Object.fromEntries(ledger.map((r) => [r.source_ref, r]));
      const b1 = by["english|S01_B_S01_B1"];
      const b2 = by["english|S01_B_S01_B2"];
      const b3 = by["english|S01_B_S01_B3"];
      expect(b1 && b1.reason).toBe("correct_first_try");
      expect(Number(b1.amount)).toBe(1);
      expect(b2 && b2.reason).toBe("correct_after_hint");
      expect(Number(b2.amount)).toBe(0.5);
      expect(b3).toBeFalsy();
      fs.writeFileSync(path.join(OUT, "en-ledger.json"), JSON.stringify(ledger, null, 2));
      await shot(page, "rp-13-en-home-thread");
    });

    await check("Chinese ExamSession: +1 / +0.5 / 0 and no game UI", async () => {
      await page.goto("/");
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await page.getByTestId("cq-island-chinese").click();
      await page.getByText("开始今天的练习", { exact: true }).click();
      await expect(page.getByRole("button", { name: /提交 第1\// })).toBeVisible({ timeout: 20000 });
      await noGameOnSolve(page, "chinese question");
      await shot(page, "rp-14-zh-question");
      await clickChoice(page, 1, 1);
      await clickChoice(page, 2, 1);
      await clickChoice(page, 3, 1);
      await clickChoice(page, 4, 4);
      await clickChoice(page, 5, 1);
      await page.getByRole("button", { name: /提交 第1\// }).click();
      await expect(page.getByText("再想想！提示：").first()).toBeVisible();
      await noGameOnSolve(page, "chinese marking");
      await shot(page, "rp-15-zh-marking");
      await retryChoice(page, 2, 2);
      await retryChoice(page, 3, 2);
      await page.getByRole("button", { name: "完成本节" }).click();
      await drive(page, { label: "rp-zh", max: 2500, done: async () => (await bodyText(page)).includes("首次答对") });
      expect(await page.locator("[data-testid^='cq-']").count()).toBe(0);
      await shot(page, "rp-16-zh-result");
      await page.getByRole("button", { name: "返回主页" }).click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await page.waitForTimeout(2500);
      const uid = fs.readFileSync(path.join(OUT, "student-id.txt"), "utf8").trim();
      const ledger = await dbGet("clewquest_thread_ledger?select=amount,reason,subject,source_ref&user_id=eq." + uid);
      const by = Object.fromEntries(ledger.map((r) => [r.source_ref, r]));
      const a1 = by["chinese|ZS01_A1"];
      const a2 = by["chinese|ZS01_A2"];
      const a3 = by["chinese|ZS01_A3"];
      expect(a1 && a1.reason).toBe("correct_first_try");
      expect(Number(a1.amount)).toBe(1);
      expect(a2 && a2.reason).toBe("correct_after_hint");
      expect(Number(a2.amount)).toBe(0.5);
      expect(a3).toBeFalsy();
      fs.writeFileSync(path.join(OUT, "zh-ledger.json"), JSON.stringify(ledger.filter((r) => r.subject === "chinese"), null, 2));
      await page.getByTestId("cq-clew").click();
      await shot(page, "rp-17-zh-home");
    });

    await check("wrong picture code five times shows the parent lock message", async () => {
      await page.goto("/");
      await page.getByRole("button", { name: "Log out" }).click();
      await page.getByTestId("cq-open-picture-signup").click();
      await page.getByTestId("su-username").fill(lockUser);
      await page.getByTestId("su-name").fill("Lock Kid");
      await page.getByTestId("su-next").click();
      for (const i of LOCK_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("su-next2").click();
      for (const i of LOCK_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("su-create").click();
      await expect(page.getByTestId("cq-builder")).toBeVisible({ timeout: 30000 });
      await page.getByTestId("cq-gender-boy").click();
      await page.getByTestId("cq-next-hair").click();
      await page.getByTestId("cq-next-colour").click();
      await page.getByTestId("cq-save").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await page.getByRole("button", { name: "Log out" }).click();
      const messages = [];
      for (let n = 1; n <= 6; n++) {
        await page.getByTestId("cq-open-picture-login").click();
        await page.getByTestId("pic-username").fill(lockUser);
        for (const i of [0, 0, 0, 0]) await page.getByTestId("pic-" + i).click();
        await page.getByTestId("pic-submit").click();
        const err = page.getByTestId("pic-error");
        await expect(err).toBeVisible({ timeout: 15000 });
        messages.push(await err.innerText());
        await page.getByRole("button", { name: "Back" }).click();
      }
      fs.writeFileSync(path.join(OUT, "lockout-messages.json"), JSON.stringify(messages, null, 2));
      const locked = messages.filter((m) => m.includes("Ask a parent to help you sign in"));
      expect(locked.length).toBeGreaterThan(0);
      await page.getByTestId("cq-open-picture-login").click();
      await shot(page, "rp-18-lockout");
      if (!messages[4].includes("Ask a parent")) {
        note("low", "lockout", "After 5 wrong codes the message was " + JSON.stringify(messages[4]) + ". The lock text appeared on a later try. Messages: " + JSON.stringify(messages));
      }
    });

    await check("password student and parent keep Today, homework, wallet, rewards", async () => {
      await page.goto("/");
      const studentSignup = page.getByRole("button", { name: "Student Sign Up" });
      if (await studentSignup.count() === 0) {
        note("medium", "password-signup", "With server auth on, the login screen hides Student Sign Up. A new password student cannot self-register; a parent creates the child, or the child uses a picture code. Demo login still works.");
      }
      await page.getByPlaceholder("Your login ID").fill("demo_student");
      await page.getByPlaceholder("Your password").fill("demo123");
      await page.getByRole("button", { name: /Log In/ }).click();
      await expect(page.getByText("Hello, Demo")).toBeVisible({ timeout: 20000 });
      const demoQuest = await page.getByTestId("cq-landing").count() + await page.getByTestId("cq-builder").count();
      if (demoQuest) note("high", "demo-student", "demo_student landed in ClewQuest.");
      const demoText = await bodyText(page);
      expect(demoText).not.toMatch(/S\$|SGD/);
      await shot(page, "rp-19-demo-student");
      await page.getByRole("button", { name: "Logout" }).click();
      await page.getByRole("button", { name: "Parent Sign Up" }).click();
      await page.getByPlaceholder("e.g. Mrs Lee").fill("Mrs Tan");
      await page.getByPlaceholder("you@example.com").fill(parentEmail);
      const pw = page.getByPlaceholder("Create a password");
      await pw.fill("parentpass1");
      await page.getByPlaceholder("Re-enter password").fill("parentpass1");
      await page.getByRole("button", { name: /Create Parent Account/ }).click();
      await expect(page.getByRole("button", { name: /Add child/ })).toBeVisible({ timeout: 20000 });
      await shot(page, "rp-22-parent-dashboard");
      const parentText = await bodyText(page);
      expect(parentText).not.toMatch(/[\uAC00-\uD7A3]/);
      await page.getByRole("button", { name: /Add child/ }).click();
      await page.getByPlaceholder("Child's username (a-z, 0-9, _)").fill(passUser);
      await page.getByPlaceholder("Display name").fill("Password Kid");
      await page.getByPlaceholder("Child's password (min 6 chars)").fill("pass1234");
      await page.getByRole("button", { name: "Create child account" }).click();
      await expect(page.getByText(/Created\./).first()).toBeVisible({ timeout: 20000 });
      await page.getByRole("button", { name: /Password Kid/ }).click();
      const tabNames = await page.locator("button").allInnerTexts();
      fs.writeFileSync(path.join(OUT, "parent-tabs.json"), JSON.stringify(tabNames, null, 2));
      const rewards = page.getByRole("button", { name: /Rewards/ });
      if (await rewards.count()) {
        await rewards.click();
        await shot(page, "rp-22b-parent-rewards");
      } else note("medium", "parent-rewards", "Rewards tab was not rendered after creating a child. Tabs: " + tabNames.join(" | "));
      await page.getByRole("button", { name: /Settings/ }).click();
      await shot(page, "rp-22c-parent-settings");
      await page.getByRole("button", { name: "Logout" }).click();
      await page.locator("button").filter({ hasText: /^\s*Student\s*$/ }).click();
      await page.getByPlaceholder("Your login ID").fill(passUser);
      await page.getByPlaceholder("Your password").fill("pass1234");
      await page.getByRole("button", { name: /Log In/ }).click();
      await page.waitForTimeout(1500);
      await shot(page, "rp-20-password-login");
      if (await page.getByTestId("cq-builder").count()) {
        note("high", "password-student", "A parent-created P3 password student is sent to Build your Clew and cannot reach the Today hub without saving a character. The builder has no logout.");
        await page.getByTestId("cq-gender-boy").click();
        await page.getByTestId("cq-next-hair").click();
        await page.getByTestId("cq-next-colour").click();
        await page.getByTestId("cq-save").click();
        await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      }
      if (await page.getByTestId("cq-landing").count() || await page.getByTestId("cq-home").count()) {
        note("medium", "password-student", "After password login the student is inside ClewQuest. The old Today hub opens from the Today button.");
        if (await page.getByTestId("cq-landing").count()) await page.getByTestId("cq-today").click();
        else await page.getByTestId("cq-today-home").click();
      }
      await expect(page.getByText("Today").first()).toBeVisible({ timeout: 20000 });
      await page.getByText(/My Stickers|Meet today's target/).waitFor({ timeout: 8000 }).catch(() => {});
      await shot(page, "rp-21-password-today");
      const hub = await bodyText(page);
      expect(hub).toMatch(/English/);
      expect(hub).toMatch(/华文|Chinese/);
      expect(hub).not.toMatch(/S\$|SGD/);
      expect(hub).toMatch(/set left|1 set|套/);
      if (!/My Stickers|Wallet|credit/i.test(hub)) note("low", "wallet", "The Today hub showed the daily target and subjects, and no S$. The sticker shelf / credit wallet was not in the text.");
      await page.getByRole("button", { name: "Logout" }).click().catch(async () => { await page.getByRole("button", { name: "Log out" }).click(); });
      await page.locator("button").filter({ hasText: /^\s*Parent\s*$/ }).click();
      await page.getByPlaceholder("Your email").fill(parentEmail);
      await page.getByPlaceholder("Your password").fill("parentpass1");
      await page.getByRole("button", { name: /Log In/ }).click();
      await expect(page.getByRole("button", { name: /Add child/ })).toBeVisible({ timeout: 20000 });
      await page.getByRole("button", { name: /Invite another parent/ }).click();
      await page.getByPlaceholder("Child's username").fill(lockUser);
      await page.getByPlaceholder("Child's password").fill("not-the-picture-code");
      await page.getByRole("button", { name: "Link child" }).click();
      await expect(page.getByText(/wrong child username or password|Failed/i)).toBeVisible({ timeout: 15000 });
      await shot(page, "rp-23-parent-cannot-link-picture-child");
      note("high", "parent-link", "The parent link form asks for the child's password. A picture-code child has no password the parent knows, so a parent cannot link that child from the UI. Picture reset stays unreachable until a parent_child row already exists.");
    });

    await check("linked parent can reset the picture code; unlinked parent cannot", async () => {
      const kid = (await dbGet("profiles?select=id,username&username=eq." + lockUser))[0];
      const me = await page.evaluate(async () => {
        const r = await fetch("/api/auth/me", { credentials: "same-origin" });
        return r.json();
      });
      expect(kid && me && me.profile && me.profile.id).toBeTruthy();
      await dbWrite("POST", "parent_child", { parent_id: me.profile.id, child_id: kid.id });
      await page.reload();
      await expect(page.getByRole("button", { name: /Lock Kid/ })).toBeVisible({ timeout: 20000 });
      await page.getByRole("button", { name: /Settings/ }).click();
      await expect(page.getByTestId("picture-reset")).toBeVisible();
      await page.getByTestId("picture-reset-start").click();
      for (let i = 0; i < 9; i++) await expect(page.getByTestId("pic-label-" + i)).toBeVisible();
      for (const i of NEW_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("picture-reset-review").click();
      await shot(page, "rp-24-parent-reset-confirm");
      await page.getByTestId("picture-reset-confirm").click();
      await expect(page.getByTestId("picture-reset-done")).toBeVisible({ timeout: 20000 });
      await shot(page, "rp-25-parent-reset-done");
      // Unlinked parent
      await page.getByRole("button", { name: "Logout" }).click();
      await page.getByRole("button", { name: "Parent Sign Up" }).click();
      await page.getByPlaceholder("e.g. Mrs Lee").fill("Mr Other");
      await page.getByPlaceholder("you@example.com").fill(otherEmail);
      await page.getByPlaceholder("Create a password").fill("parentpass1");
      await page.getByPlaceholder("Re-enter password").fill("parentpass1");
      await page.getByRole("button", { name: /Create Parent Account/ }).click();
      await expect(page.getByRole("button", { name: /Add child/ })).toBeVisible({ timeout: 20000 });
      expect(await page.getByTestId("picture-reset").count()).toBe(0);
      const api = await page.evaluate(async (childId) => {
        const r = await fetch("/api/clewquest/picture-reset", {
          method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ childId, sequence: [0, 1, 2, 3] }),
        });
        return r.status;
      }, kid.id);
      expect(api).toBe(403);
      await shot(page, "rp-26-unlinked-parent");
      // Child signs in with the new code, and the old code does not work.
      await page.getByRole("button", { name: "Logout" }).click();
      await page.getByTestId("cq-open-picture-login").click();
      await page.getByTestId("pic-username").fill(lockUser);
      for (const i of LOCK_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("pic-submit").click();
      await expect(page.getByTestId("pic-error")).toBeVisible();
      await page.getByTestId("pic-clear").click();
      for (const i of NEW_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("pic-submit").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await shot(page, "rp-27-new-code-login");
    });
  } finally {
    dump();
  }

  const failed = results.filter((r) => !r.pass);
  if (failed.length) throw new Error(failed.map((f) => f.name + ": " + f.error.split("\n")[0]).join("\n"));
});
