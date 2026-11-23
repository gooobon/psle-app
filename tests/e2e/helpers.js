const fs = require("fs");
const path = require("path");

const SHOTS = path.join(process.cwd(), process.env.E2E_SHOTS_DIR || "docs/e2e-2026-11-19");
const PRODUCTION_REF = "zehnulwvysvnsshunxzr";

function assertLocalOnly() {
  const blob = [
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.E2E_API_URL,
    process.env.E2E_DB_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  ].join(" ");
  if (blob.includes(PRODUCTION_REF)) {
    throw new Error("Refusing to run: a Supabase URL or key points at the production project.");
  }
}

async function shot(page, name) {
  fs.mkdirSync(SHOTS, { recursive: true });
  const file = path.join(SHOTS, name + ".png");
  await page.screenshot({ path: file, fullPage: true });
  return file;
}

async function bodyText(page) {
  return page.locator("body").innerText();
}

function restHeaders() {
  assertLocalOnly();
  const key = process.env.E2E_SERVICE_ROLE;
  const url = process.env.E2E_API_URL;
  if (!key || !url) throw new Error("E2E_API_URL and E2E_SERVICE_ROLE are required");
  return {
    url,
    headers: { apikey: key, Authorization: "Bearer " + key, Accept: "application/json" },
  };
}

async function dbGet(pathname) {
  const { url, headers } = restHeaders();
  const r = await fetch(url.replace(/\/$/, "") + "/rest/v1/" + pathname, { headers });
  const text = await r.text();
  if (!r.ok) throw new Error("db " + r.status + " " + pathname + " " + text.slice(0, 300));
  return text ? JSON.parse(text) : [];
}

async function nudge(page) {
  const fields = page.locator("input[type='text'], textarea");
  const n = await fields.count();
  for (let i = 0; i < n; i++) {
    const el = fields.nth(i);
    if (!(await el.isVisible().catch(() => false))) continue;
    const value = await el.inputValue().catch(() => "");
    if (!String(value).trim()) {
      await el.fill("e2e answer");
      return "typed";
    }
  }
  return page.evaluate(() => {
    const visible = (el) => !!(el && (el.getClientRects().length || el.offsetParent));
    const buttons = () => [...document.querySelectorAll("button")].filter(visible);
    const text = (el) => (el.innerText || "").replace(/\s+/g, " ").trim();
    const enabled = (re) => buttons().find((b) => !b.disabled && re.test(text(b)));
    const body = document.body.innerText || "";

    const advance = enabled(/^(Next Page|Finish Section|Next Section|下一页|完成本节|下一节|返回主页|Back to Home|See results|查看成绩|Finish review|完成复习|下一个|Next →|Go to Next|开始下一节|返回主页)/);
    if (advance) { advance.click(); return "advance:" + text(advance).slice(0, 40); }

    const check = enabled(/^(Check|OK|确认)$/);
    if (check) { check.click(); return "check"; }

    if (/What does this word mean\?|这个词语是什么意思/.test(body)) {
      const opt = buttons().find((b) => !b.disabled && !/Logout|Today|Next|Finish|See results|查看成绩|完成复习|下一个/.test(text(b)));
      if (opt) { opt.click(); return "meaning"; }
    }

    const submit = enabled(/^(Submit|Submit Answers|提交|提交答案|提交 第)/);
    if (submit) { submit.click(); return "submit:" + text(submit).slice(0, 40); }

    const compCells = [...document.querySelectorAll("td")].filter((td) => {
      if (td.textContent.trim() !== "(1)" || getComputedStyle(td).cursor !== "pointer") return false;
      const box = td.closest("table") && td.closest("table").parentElement;
      return box && /Answer:\s*\(\s*\)|答案：\s*\(\s*\)/.test(box.innerText);
    });
    if (compCells.length) { compCells.forEach((td) => td.click()); return "comp-mcq"; }

    const ab = [...document.querySelectorAll("span")].filter((el) => {
      if (el.dataset.e2eAb || getComputedStyle(el).cursor !== "pointer" || !/^\(A\)/.test(el.textContent.trim())) return false;
      const bg = getComputedStyle(el).backgroundColor;
      return bg === "rgba(0, 0, 0, 0)" || bg === "transparent";
    });
    if (ab.length) { ab.forEach((el) => { el.dataset.e2eAb = "1"; el.click(); }); return "ab"; }

    let acted = false;
    for (const el of document.querySelectorAll("input, textarea")) {
      if (!visible(el) || el.disabled) continue;
      const type = (el.getAttribute("type") || "text").toLowerCase();
      if (type === "password" || type === "checkbox" || type === "date" || type === "number") continue;
      if (String(el.value || "").trim()) continue;
      const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      const tracker = el._valueTracker;
      if (tracker) tracker.setValue("");
      setter.call(el, "e2e answer");
      el.dispatchEvent(new Event("input", { bubbles: true }));
      acted = true;
    }
    if (acted) return "typed";

    if (/Try again|再选一次|Not quite/.test(body)) {
      const opt = [...document.querySelectorAll("div")].find((el) => {
        const s = el.querySelector(":scope > span");
        return s && /^\(\d+\)$/.test(s.textContent.trim()) && getComputedStyle(el).cursor === "pointer";
      });
      if (opt) { opt.click(); return "retry-option"; }
      const retryWord = buttons().find((b) => !b.disabled && text(b).length > 0 && text(b).length < 24 && !/^(Check|OK|确认|Clear|清除|Submit|Next|Show)/.test(text(b)));
      if (retryWord) { retryWord.click(); return "retry-word:" + text(retryWord).slice(0, 20); }
    }

    const wordBtn = buttons().find((b) => /Tap a word to fill|点击词语/.test(body) && !/Submit|提交|Next|下一/.test(text(b)) && text(b).length > 0 && text(b).length < 40);
    if (wordBtn && /Tap a word to fill|点击词语，填入/.test(body)) {
      wordBtn.click();
      return "wordbank";
    }

    for (const tr of document.querySelectorAll("tr")) {
      const nums = [...tr.querySelectorAll("button")].filter((b) => /^\d$/.test(text(b)));
      if (nums.length < 2 || tr.dataset.e2eSeq) continue;
      tr.dataset.e2eSeq = "1";
      nums[0].click();
      return "sequence";
    }

    const trueCell = [...document.querySelectorAll("td")].find((td) => td.cellIndex === 2 && getComputedStyle(td).cursor === "pointer" && !td.innerText.includes("✓"));
    if (trueCell) { trueCell.click(); return "truefalse"; }

    const groups = [...document.querySelectorAll("div")].filter((d) => {
      const kids = [...d.children].filter((c) => c.tagName === "BUTTON" && /^\(\d+\)/.test(text(c)));
      return kids.length >= 4;
    });
    if (groups.length) {
      let n = 0;
      groups.forEach((g, i) => {
        const btns = [...g.querySelectorAll(":scope > button")].filter((b) => !b.disabled);
        const btn = btns[i % Math.max(btns.length, 1)];
        if (btn) { btn.click(); n++; }
      });
      if (n) return "match";
    }

    const ones = [...document.querySelectorAll("div")].filter((el) => {
      const s = el.querySelector(":scope > span");
      return s && s.textContent.trim() === "(1)" && getComputedStyle(el).cursor === "pointer";
    });
    if (ones.length) { ones.forEach((el) => el.click()); return "mcq"; }

    const bracket = [...document.querySelectorAll("span")].find((el) => getComputedStyle(el).cursor === "pointer" && el.closest("span") && /\[/.test((el.parentElement && el.parentElement.innerText) || ""));
    if (bracket) { bracket.click(); return "bracket"; }

    // OrderTap cards (comprehension "put the events in order"). Tap each unordered card once.
    // Without this the driver clicks an already-answered True/False button until the step cap.
    const order = buttons().find((b) => !b.disabled && /Not ordered yet/.test(b.getAttribute("aria-label") || ""));
    if (order) { order.click(); return "order"; }

    const tfButtons = buttons().filter((b) => /^(True|False|对|错)$/.test(text(b)) && !b.disabled);
    const tfPicked = tfButtons.some((b) => getComputedStyle(b).backgroundColor !== "rgb(255, 255, 255)");
    if (tfButtons.length && !tfPicked) {
      const tfBtn = tfButtons.find((b) => /^(True|对)$/.test(text(b))) || tfButtons[0];
      const key = Object.keys(tfBtn).find((k) => k.startsWith("__reactProps"));
      const handler = key && tfBtn[key] && tfBtn[key].onClick;
      if (handler) handler({ preventDefault() {}, stopPropagation() {} });
      else tfBtn.click();
      return "tf-btn";
    }

    return "stuck";
  });
}

async function drive(page, { done, max = 900, label = "exam" }) {
  let stuck = 0;
  const headers = [];
  const tally = {};
  for (let i = 0; i < max; i++) {
    if (await done()) return { steps: i, headers: [...new Set(headers)] };
    const header = await page.evaluate(() => {
      const t = document.body.innerText || "";
      const m = t.match(/Section \d+\/\d+|第 \d+\/\d+ 节/);
      const labels = ["Grammar MCQ", "Vocabulary MCQ", "Grammar Cloze", "Vocabulary Cloze", "Editing for Spelling", "Synthesis & Transformation", "Comprehension", "Homework from Parent", "Similar questions"];
      return (m ? m[0] : "") + " | " + (labels.find((l) => t.includes(l)) || "");
    }).catch(() => "");
    if (header.trim()) headers.push(header);
    const action = await nudge(page);
    tally[action] = (tally[action] || 0) + 1;
    if (action === "stuck") {
      stuck++;
      if (stuck >= 6) {
        await shot(page, "stuck-" + label);
        const snippet = (await bodyText(page).catch(() => "")).slice(0, 500);
        throw new Error("Exam driver stuck during " + label + " after " + i + " steps. On screen:\n" + snippet);
      }
    } else stuck = 0;
    await page.waitForTimeout(40);
  }
  await shot(page, "timeout-" + label);
  throw new Error("Exam driver timed out during " + label + " " + JSON.stringify(tally));
}

// The logged-out first screen is the landing; open the login form from it (no-op if already on the form).
async function openLogin(page) {
  await page.waitForFunction(() => {
    const t = document.body.innerText;
    return t.includes("Welcome back") || t.includes("Untangle PSLE") || t.includes("Hello,") || t.includes("Add child");
  });
  const btn = page.getByTestId("cq-landing-login");
  if (await btn.count()) await btn.click();
}

async function loginStudent(page, id, password) {
  await page.goto("/");
  await openLogin(page);
  await page.getByText("Welcome back").waitFor();
  await page.locator("button").filter({ hasText: /^\s*Student\s*$/ }).click();
  await page.getByPlaceholder("Your login ID").fill(id);
  await page.getByPlaceholder("Your password").fill(password);
  await page.getByRole("button", { name: /Log In/ }).click();
  await page.getByText(/Hello,/).waitFor({ timeout: 20000 });
}

async function loginParent(page, email, password) {
  await page.goto("/");
  await openLogin(page);
  await page.getByText("Welcome back").waitFor();
  await page.locator("button").filter({ hasText: /^\s*Parent\s*$/ }).click();
  await page.getByPlaceholder("Your email").fill(email);
  await page.getByPlaceholder("Your password").fill(password);
  await page.getByRole("button", { name: /Log In/ }).click();
  await page.getByRole("button", { name: /Add child/ }).waitFor({ timeout: 20000 });
}

async function ensureParent(page, email, password) {
  await page.goto("/");
  await page.waitForFunction(() => {
    const t = document.body.innerText;
    return t.includes("Welcome back") || t.includes("Untangle PSLE") || t.includes("Add child");
  });
  await openLogin(page);
  if (await page.getByText("Welcome back").count()) await loginParent(page, email, password);
}

async function ensureStudent(page, id, password) {
  await page.goto("/");
  await page.waitForFunction(() => {
    const t = document.body.innerText;
    return t.includes("Welcome back") || t.includes("Untangle PSLE") || t.includes("Hello,");
  });
  await openLogin(page);
  if (await page.getByText("Welcome back").count()) await loginStudent(page, id, password);
}

async function logout(page) {
  await page.getByRole("button", { name: "Logout" }).click();
  await page.getByText(/Welcome back|Untangle PSLE/).first().waitFor({ timeout: 20000 });
}

module.exports = {
  SHOTS, openLogin, shot, bodyText, dbGet, drive, nudge, loginStudent, loginParent, logout, ensureParent, ensureStudent, assertLocalOnly,
};
