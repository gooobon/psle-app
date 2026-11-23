// ClewQuest Phase 1 role-play. Local Supabase only. Does not change product code.
// Run after `npm run e2e:clewquest`, with the same local env (see the report).
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { bodyText, dbGet, drive, shot, assertLocalOnly } = require("./helpers");

const PROD = "zehnulwvysvnsshunxzr";
const HANGUL = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/;
const OUT = path.join(process.cwd(), process.env.E2E_SHOTS_DIR || "docs/e2e-clewquest-phase1-recheck-2026-11-23");
const GENERIC_LINK = "That code did not work. Ask your child for a new code.";
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

async function logoutToLogin(page) {
  // ClewQuest says "Log out". The Today hub and the parent dashboard say "Logout".
  const named = page.getByRole("button", { name: /^log ?out$/i });
  if (await named.count()) await named.first().click();
  else await page.getByTestId("cq-builder-logout").click();
  await expect(page.getByText("Welcome back")).toBeVisible({ timeout: 20000 });
}

async function openParentTools(page) {
  if ((await page.getByTestId("pl-username").count()) === 0) {
    await page.getByRole("button", { name: /Invite another parent/ }).click();
  }
  await expect(page.getByTestId("pl-username")).toBeVisible();
}

async function tapPad(page, padIndex, code) {
  const pad = page.locator("[data-testid='pic-dots']").nth(padIndex).locator("xpath=..");
  for (const i of code) await pad.getByTestId("pic-" + i).click();
}

async function readLinkCode(page) {
  await page.getByTestId("cq-linkcode-open").click();
  await page.getByTestId("cq-linkcode-get").click();
  const el = page.getByTestId("cq-linkcode-value");
  await expect(el).toBeVisible({ timeout: 15000 });
  const code = (await el.innerText()).replace(/\s+/g, "");
  expect(code).toMatch(/^\d{6}$/);
  return code;
}

async function expectGenericLink(page) {
  const msg = page.getByTestId("pl-msg");
  await expect(msg).toBeVisible({ timeout: 15000 });
  const text = (await msg.innerText()).trim();
  expect(text).toBe(GENERIC_LINK);
  expect(text).not.toMatch(/expired|already used|reused|reuse|wrong code|does not exist|unknown|not found|invalid hash/i);
  return text;
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
  const picUser = "cqpic_" + stamp;
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

    await check("builder: boy and girl, 10 hairstyles, 6 colours, nickname 24 with counter", async () => {
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
      const count = page.getByTestId("cq-nick-count");
      await nick.fill("B");
      await expect(count).toHaveText("1 / 24");
      await nick.fill("A".repeat(40));
      const shown = await nick.inputValue();
      expect(shown.length).toBe(24);
      await expect(count).toHaveText("24 / 24");
      await shot(page, "rp-04-nickname-counter");
      await nick.evaluate((el) => {
        el.removeAttribute("maxLength");
        const proto = window.HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
        if (el._valueTracker) el._valueTracker.setValue("");
        setter.call(el, "A".repeat(40));
        el.dispatchEvent(new Event("input", { bubbles: true }));
      });
      await expect(count).toHaveText("40 / 24");
      await page.getByTestId("cq-save").click();
      await expect(page.getByTestId("cq-builder-error")).toContainText(/2-24/);
      await shot(page, "rp-04-nickname-rejected");
      await nick.fill("Bluebun");
      await expect(count).toHaveText("7 / 24");
      await page.getByTestId("cq-save").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await noKorean(page, "landing");
    });

    await check("four islands: open subjects, coming soon on one line, no navy band", async () => {
      await shot(page, "rp-05-landing-mobile");
      const layout = await page.evaluate(() => {
        const landing = document.querySelector("[data-testid='cq-landing']");
        const img = landing.querySelector("img");
        const ir = img.getBoundingClientRect();
        const lr = landing.getBoundingClientRect();
        const vh = window.innerHeight;
        function paint(x, y) {
          let n = document.elementFromPoint(x, y);
          const tag = n ? n.tagName : null;
          while (n && n !== document.documentElement) {
            const bg = getComputedStyle(n).backgroundColor;
            if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
              return { bg, testid: n.getAttribute && n.getAttribute("data-testid"), tag: n.tagName };
            }
            n = n.parentElement;
          }
          return { bg: "none", tag };
        }
        const soon = [...document.querySelectorAll("[data-testid^='cq-island-']")].map((btn) => {
          const phrase = [...btn.querySelectorAll("span")].find((s) => (s.textContent || "").trim() === "(Coming soon)");
          const lines = phrase ? phrase.innerText.split(/\n/).map((s) => s.trim()).filter(Boolean) : [];
          return {
            testid: btn.getAttribute("data-testid"),
            text: (btn.innerText || "").replace(/\s+/g, " ").trim(),
            phrase: phrase ? phrase.textContent : null,
            lineCount: phrase ? phrase.getClientRects().length : 0,
            lines,
          };
        });
        const sampleY = Math.min(vh - 3, Math.max(lr.bottom + 6, vh - 3));
        return {
          imgBottom: Math.round(ir.bottom),
          landingBottom: Math.round(lr.bottom),
          vh,
          gapBelowLanding: Math.round(vh - lr.bottom),
          navyBelowImage: Math.round(lr.bottom - ir.bottom),
          bottom: paint(window.innerWidth / 2, sampleY),
          soon,
        };
      });
      fs.writeFileSync(path.join(OUT, "landing-metrics.json"), JSON.stringify(layout, null, 2));
      for (const row of layout.soon) {
        if (!row.phrase) continue;
        expect(row.phrase).toBe("(Coming soon)");
        expect(row.lineCount).toBe(1);
        expect(row.lines.join(" ")).not.toMatch(/Coming\s*$/);
        expect(row.text).not.toMatch(/\(Coming$/);
      }
      const bottomNavy = layout.bottom && /rgb\(11,\s*59,\s*115\)/.test(layout.bottom.bg || "");
      if (bottomNavy && layout.gapBelowLanding > 24) {
        note("high", "landing-navy", "A navy band fills " + layout.gapBelowLanding + "px under the map on a 390×844 screen. " + JSON.stringify(layout.bottom));
      }
      expect(bottomNavy && layout.gapBelowLanding > 24, "navy band under the map").toBe(false);
      if (layout.navyBelowImage > 140) {
        note("medium", "landing-navy", "The landing background stays navy for " + layout.navyBelowImage + "px under the island art.");
      }
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
      for (const t of labels) {
        const lines = t.split(/\n/).map((s) => s.trim()).filter(Boolean);
        if (lines.length === 1) continue;
        expect(lines[lines.length - 1]).toBe("(Coming soon)");
        expect(lines.some((l) => /Coming$/.test(l) || /^soon\)/.test(l))).toBe(false);
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

    await check("picture child gets a 6-digit code and a parent links with it", async () => {
      await page.goto("/");
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      const linkCode = await readLinkCode(page);
      const uid = fs.readFileSync(path.join(OUT, "student-id.txt"), "utf8").trim();
      const stored = await dbGet("clewquest_link_codes?select=code_hash,expires_at&child_id=eq." + uid);
      expect(stored.length).toBe(1);
      expect(stored[0].code_hash).toMatch(/^[0-9a-f]{64}$/);
      expect(stored[0].code_hash).not.toContain(linkCode);
      await shot(page, "rp-30-link-code");
      fs.writeFileSync(path.join(OUT, "link-code-meta.json"), JSON.stringify({ digits: linkCode.length, hashStored: true, expiresAt: stored[0].expires_at }, null, 2));
      await logoutToLogin(page);
      await page.getByRole("button", { name: "Parent Sign Up" }).click();
      await page.getByPlaceholder("e.g. Mrs Lee").fill("Mrs Tan");
      await page.getByPlaceholder("you@example.com").fill(parentEmail);
      await page.getByPlaceholder("Create a password").fill("parentpass1");
      await page.getByPlaceholder("Re-enter password").fill("parentpass1");
      await page.getByRole("button", { name: /Create Parent Account/ }).click();
      await expect(page.getByRole("button", { name: /Add child/ })).toBeVisible({ timeout: 20000 });
      await openParentTools(page);
      const wrong = linkCode === "000000" ? "111111" : "000000";
      await page.getByTestId("pl-username").fill(student);
      await page.getByTestId("pl-code").fill(wrong);
      await page.getByTestId("pl-submit").click();
      const wrongMsg = await expectGenericLink(page);
      await shot(page, "rp-31-link-wrong");
      await page.getByTestId("pl-code").fill(linkCode);
      await page.getByTestId("pl-submit").click();
      await expect(page.getByTestId("pl-msg")).toContainText("Linked Aria Tan", { timeout: 15000 });
      await expect(page.getByRole("button", { name: /Aria Tan/ })).toBeVisible({ timeout: 15000 });
      const me = await page.evaluate(async () => (await fetch("/api/auth/me", { credentials: "same-origin" })).json());
      const links = await dbGet("parent_child?select=parent_id,child_id&child_id=eq." + uid);
      expect(links.length).toBe(1);
      expect(links[0].parent_id).toBe(me.profile.id);
      await shot(page, "rp-32-linked");
      await page.getByTestId("pl-username").fill(student);
      await page.getByTestId("pl-code").fill(linkCode);
      await page.getByTestId("pl-submit").click();
      const reusedMsg = await expectGenericLink(page);
      await shot(page, "rp-33-link-reused");
      await logoutToLogin(page);
      await page.getByTestId("cq-open-picture-login").click();
      await page.getByTestId("pic-username").fill(student);
      for (const i of CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("pic-submit").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      const fresh = await readLinkCode(page);
      expect(fresh).not.toBe(linkCode);
      await dbWrite("PATCH", "clewquest_link_codes?child_id=eq." + uid, { expires_at: "2020-01-01T00:00:00.000Z" });
      await logoutToLogin(page);
      await page.locator("button").filter({ hasText: /^\s*Parent\s*$/ }).click();
      await page.getByPlaceholder("Your email").fill(parentEmail);
      await page.getByPlaceholder("Your password").fill("parentpass1");
      await page.getByRole("button", { name: /Log In/ }).click();
      await expect(page.getByRole("button", { name: /Add child/ })).toBeVisible({ timeout: 20000 });
      await openParentTools(page);
      await page.getByTestId("pl-username").fill(student);
      await page.getByTestId("pl-code").fill(fresh);
      await page.getByTestId("pl-submit").click();
      const expiredMsg = await expectGenericLink(page);
      await shot(page, "rp-34-link-expired");
      expect(wrongMsg).toBe(reusedMsg);
      expect(reusedMsg).toBe(expiredMsg);
      fs.writeFileSync(path.join(OUT, "link-messages.json"), JSON.stringify({ wrong: wrongMsg, reused: reusedMsg, expired: expiredMsg }, null, 2));
    });

    await check("parent-created picture child is already linked", async () => {
      await openParentTools(page);
      await page.getByRole("button", { name: /Create a picture-code child/ }).click();
      await page.getByTestId("pc-username").fill(picUser);
      await page.getByTestId("pc-name").fill("Picture Kid");
      await tapPad(page, 0, CODE);
      await expect(page.locator("[data-testid='pic-dots']")).toHaveCount(2);
      await tapPad(page, 1, CODE);
      await page.getByTestId("pc-submit").click();
      await expect(page.getByTestId("pc-msg")).toContainText("Created Picture Kid", { timeout: 20000 });
      await expect(page.getByRole("button", { name: /Picture Kid/ })).toBeVisible({ timeout: 15000 });
      const kid = (await dbGet("profiles?select=id,username&username=eq." + picUser))[0];
      const me = await page.evaluate(async () => (await fetch("/api/auth/me", { credentials: "same-origin" })).json());
      const links = await dbGet("parent_child?select=parent_id,child_id&child_id=eq." + kid.id);
      expect(links.length).toBe(1);
      expect(links[0].parent_id).toBe(me.profile.id);
      await shot(page, "rp-35-parent-created-picture");
    });

    await check("password student keeps Today and can open ClewQuest", async () => {
      await page.getByRole("button", { name: /Add child/ }).click();
      await page.getByPlaceholder("Child's username (a-z, 0-9, _)").fill(passUser);
      await page.getByPlaceholder("Display name").fill("Password Kid");
      await page.getByPlaceholder("Child's password (min 6 chars)").fill("pass1234");
      await page.getByRole("button", { name: "Create child account" }).click();
      await expect(page.getByText(/Created\./).first()).toBeVisible({ timeout: 20000 });
      await expect(page.getByRole("button", { name: /Password Kid/ })).toBeVisible();
      await shot(page, "rp-22-parent-dashboard");
      await logoutToLogin(page);
      await page.getByPlaceholder("Your login ID").fill("demo_student");
      await page.getByPlaceholder("Your password").fill("demo123");
      await page.getByRole("button", { name: /Log In/ }).click();
      await expect(page.getByText("Hello, Demo")).toBeVisible({ timeout: 20000 });
      expect(await page.getByTestId("cq-landing").count() + await page.getByTestId("cq-builder").count()).toBe(0);
      expect(await bodyText(page)).not.toMatch(/S\$|SGD/);
      await shot(page, "rp-19-demo-student");
      await page.getByRole("button", { name: "Logout" }).click();
      await expect(page.getByText("Welcome back")).toBeVisible({ timeout: 20000 });
      await page.locator("button").filter({ hasText: /^\s*Student\s*$/ }).click();
      await page.getByPlaceholder("Your login ID").fill(passUser);
      await page.getByPlaceholder("Your password").fill("pass1234");
      await page.getByRole("button", { name: /Log In/ }).click();
      await expect(page.getByText("Hello, Password")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("today-open-clewquest")).toBeVisible();
      expect(await page.getByTestId("cq-builder").count()).toBe(0);
      expect(await page.getByTestId("cq-landing").count()).toBe(0);
      const hub = await bodyText(page);
      expect(hub).toMatch(/English/);
      expect(hub).toMatch(/华文|Chinese/);
      expect(hub).not.toMatch(/S\$|SGD/);
      await noKorean(page, "password today");
      await shot(page, "rp-21-password-today");
      await page.getByTestId("today-open-clewquest").click();
      await expect(page.getByTestId("cq-builder")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("cq-skip")).toHaveText("Skip for now");
      await expect(page.getByTestId("cq-builder-logout")).toHaveText("Log out");
      await shot(page, "rp-36-builder-skip-logout");
      await page.getByTestId("cq-skip").click();
      await expect(page.getByText("Hello, Password")).toBeVisible({ timeout: 20000 });
      expect(await page.getByTestId("cq-builder").count()).toBe(0);
      await page.getByTestId("today-open-clewquest").click();
      await expect(page.getByTestId("cq-builder")).toBeVisible();
      await page.getByTestId("cq-builder-logout").click();
      await expect(page.getByText("Welcome back")).toBeVisible({ timeout: 20000 });
    });

    await check("five wrong codes lock on the fifth; linked parent reset clears it", async () => {
      await page.getByTestId("cq-open-picture-signup").click();
      await page.getByTestId("su-username").fill(lockUser);
      await page.getByTestId("su-name").fill("Lock Kid");
      await page.getByTestId("su-next").click();
      for (const i of LOCK_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("su-next2").click();
      for (const i of LOCK_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("su-create").click();
      await expect(page.getByTestId("cq-builder")).toBeVisible({ timeout: 30000 });
      await expect(page.getByTestId("cq-skip")).toBeVisible();
      await expect(page.getByTestId("cq-builder-logout")).toBeVisible();
      await page.getByTestId("cq-gender-boy").click();
      await page.getByTestId("cq-next-hair").click();
      await page.getByTestId("cq-next-colour").click();
      await page.getByTestId("cq-save").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      const lockCode = await readLinkCode(page);
      await logoutToLogin(page);
      await page.locator("button").filter({ hasText: /^\s*Parent\s*$/ }).click();
      await page.getByPlaceholder("Your email").fill(parentEmail);
      await page.getByPlaceholder("Your password").fill("parentpass1");
      await page.getByRole("button", { name: /Log In/ }).click();
      await expect(page.getByRole("button", { name: /Add child/ })).toBeVisible({ timeout: 20000 });
      await openParentTools(page);
      await page.getByTestId("pl-username").fill(lockUser);
      await page.getByTestId("pl-code").fill(lockCode);
      await page.getByTestId("pl-submit").click();
      await expect(page.getByTestId("pl-msg")).toContainText("Linked Lock Kid", { timeout: 15000 });
      await expect(page.getByRole("button", { name: /Lock Kid/ })).toBeVisible();
      await logoutToLogin(page);
      const messages = [];
      for (let n = 1; n <= 5; n++) {
        await page.getByTestId("cq-open-picture-login").click();
        await page.getByTestId("pic-username").fill(lockUser);
        for (const i of [0, 0, 0, 0]) await page.getByTestId("pic-" + i).click();
        await page.getByTestId("pic-submit").click();
        const err = page.getByTestId("pic-error");
        await expect(err).toBeVisible({ timeout: 15000 });
        const text = (await err.innerText()).trim();
        const locked = await page.getByTestId("pic-locked").count();
        messages.push({ n, text, locked: locked > 0 });
        if (n < 5) {
          expect(locked).toBe(0);
          expect(text).toBe("That did not work. Try again.");
          await page.getByRole("button", { name: "Back" }).click();
        }
      }
      await expect(page.getByTestId("pic-locked")).toBeVisible();
      const lockedText = await page.getByTestId("pic-locked").innerText();
      expect(lockedText).toMatch(/Ask a parent to reset your picture code/);
      expect(lockedText).not.toMatch(/\d{6}/);
      expect(await page.getByTestId("cq-linkcode").count()).toBe(0);
      expect(await page.getByTestId("cq-linkcode-value").count()).toBe(0);
      expect(messages[4].text).toBe("Locked for 15 minutes.");
      expect(messages[4].locked).toBe(true);
      fs.writeFileSync(path.join(OUT, "lockout-messages.json"), JSON.stringify({ messages, lockedText }, null, 2));
      await shot(page, "rp-18-lockout");
      await page.getByRole("button", { name: "Back" }).click();
      await page.locator("button").filter({ hasText: /^\s*Parent\s*$/ }).click();
      await page.getByPlaceholder("Your email").fill(parentEmail);
      await page.getByPlaceholder("Your password").fill("parentpass1");
      await page.getByRole("button", { name: /Log In/ }).click();
      await expect(page.getByRole("button", { name: /Lock Kid/ })).toBeVisible({ timeout: 20000 });
      await page.getByRole("button", { name: /Lock Kid/ }).click();
      await page.getByRole("button", { name: /Settings/ }).click();
      await expect(page.getByTestId("picture-reset")).toBeVisible();
      await page.getByTestId("picture-reset-start").click();
      const reset = page.getByTestId("picture-reset");
      for (const i of NEW_CODE) await reset.getByTestId("pic-" + i).click();
      await page.getByTestId("picture-reset-review").click();
      await shot(page, "rp-24-parent-reset-confirm");
      await page.getByTestId("picture-reset-confirm").click();
      await expect(page.getByTestId("picture-reset-done")).toBeVisible({ timeout: 20000 });
      await shot(page, "rp-25-parent-reset-done");
      await logoutToLogin(page);
      await page.getByTestId("cq-open-picture-login").click();
      await page.getByTestId("pic-username").fill(lockUser);
      for (const i of LOCK_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("pic-submit").click();
      await expect(page.getByTestId("pic-error")).toBeVisible({ timeout: 15000 });
      expect(await page.getByTestId("pic-locked").count()).toBe(0);
      await page.getByTestId("pic-clear").click();
      for (const i of NEW_CODE) await page.getByTestId("pic-" + i).click();
      await page.getByTestId("pic-submit").click();
      await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
      await shot(page, "rp-27-new-code-login");
    });

    await check("unlinked parent cannot reset a picture code", async () => {
      const kid = (await dbGet("profiles?select=id,username&username=eq." + lockUser))[0];
      await logoutToLogin(page);
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
    });

  } finally {
    dump();
  }

  const failed = results.filter((r) => !r.pass);
  if (failed.length) throw new Error(failed.map((f) => f.name + ": " + f.error.split("\n")[0]).join("\n"));
});
