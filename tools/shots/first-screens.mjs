// Takes the 390x844 screenshots for the first-screens PR. Every /api/* call is answered by a mock (Playwright route interception):
// no Supabase project, real or otherwise, is ever contacted. Usage: node tools/shots/first-screens.mjs <baseUrl> <outDir>
import { chromium } from "@playwright/test";
const base = process.argv[2] || "http://127.0.0.1:3100", out = process.argv[3] || "docs/design/first-screens-shots";
const parent = { id: "p-1", role: "parent", name: "Mdm Tan" };
const kid = { id: "c-1", role: "student", username: "Aria01", name: "Aria Tan", grade: "P3", pictureCode: true };
const json = (route, body, status = 200) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
const chars = { gender: "girl", hair_key: "ariadne-buns", colour_key: "ariadne-crimson", nickname: "Aria" };
const stateOk = { ok: true, character: chars, thread: { total: 142, bySubject: { english: 90, chinese: 52 } }, stage: 3, next: { stage: 4, need: 300, have: 142 } };

async function run() {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
  const shot = async (page, name) => { await page.waitForTimeout(500); await page.screenshot({ path: `${out}/${name}.png`, fullPage: true }); console.log("shot", name); };
  async function ctx(mock) {
    const c = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await c.route(/supabase\.co|127\.0\.0\.1:54321/, (r) => r.abort());
    await c.route("**/api/**", (r) => {
      const u = new URL(r.request().url()), p = u.pathname;
      const m = mock(p, u, r.request());
      return m === undefined ? json(r, { error: "mock: not found" }, 404) : json(r, m.body ?? m, m.status || 200);
    });
    const page = await c.newPage(); return { c, page };
  }
  // logged out
  let s = await ctx((p) => (p === "/api/auth/me" ? { error: "no", status: 401 } : undefined)); let page = s.page;
  await page.goto(base); await page.getByTestId("cq-prelogin").waitFor(); await shot(page, "01-landing");
  await page.getByTestId("cq-landing-login").click(); await page.getByTestId("login-form").waitFor(); await shot(page, "02-login-student");
  await page.getByTestId("pic-username").fill("Aria01"); for (const i of [0, 3, 8, 3]) await page.getByTestId(`pic-${i}`).click(); await shot(page, "03-login-student-filled");
  await page.getByTestId("login-role-parent").click(); await shot(page, "04-login-parent");
  await page.getByTestId("forgot-link").click(); await page.getByTestId("forgot-email").fill("mdm.tan@example.com"); await shot(page, "05-forgot-password");
  await s.c.close();
  // set new password
  s = await ctx((p) => (p === "/api/auth/me" ? { error: "no", status: 401 } : undefined)); page = s.page;
  await page.goto(base + "/?reset=1&code=abc"); await page.getByTestId("set-new-password").waitFor(); await shot(page, "06-set-new-password"); await s.c.close();
  // sign up
  s = await ctx((p) => (p === "/api/auth/me" ? { error: "no", status: 401 } : p === "/api/auth/parent/signup" ? { ok: true, needsConfirmation: true } : undefined)); page = s.page;
  await page.goto(base); await page.getByTestId("cq-landing-signup").click(); await page.getByTestId("cq-signup").waitFor(); await shot(page, "07-signup-step1-empty");
  await page.getByTestId("su-pname").fill("Mdm Tan"); await page.getByTestId("su-pemail").fill("mdm.tan@example.com"); await page.getByTestId("su-ppassword").fill("secret-pass-1");
  await page.getByTestId("su-c1").check(); await page.getByTestId("su-c2").check(); await page.getByTestId("su-student").click(); await shot(page, "08-signup-step1-filled");
  await page.getByTestId("su-continue").click(); await page.getByTestId("check-email").waitFor(); await shot(page, "09-check-your-email"); await s.c.close();
  // step 2 (parent with no children, e.g. right after the confirm link)
  let taken = true;
  s = await ctx((p, u) => {
    if (p === "/api/auth/parent/confirm") return { ok: true, profile: parent, children: [] };
    if (p === "/api/parent/children/picture") return { ok: true, child: { id: "c-9", role: "student", username: "AriaTan", name: "Aria Tan", grade: "P3", pictureCode: true } };
    if (p === "/api/auth/me") return { ok: true, profile: parent, children: [] };
    if (p === "/api/auth/username-available") { const n = u.searchParams.get("u"); return n === "Aria01" && taken ? { ok: true, state: "taken", suggestions: ["Aria01_2", "Aria47", "Aria01Quest"] } : { ok: true, state: "available" }; }
    return undefined;
  }); page = s.page;
  await page.goto(base + "/?code=confirm-mock"); await page.getByTestId("cq-signup-step2").waitFor();
  await page.getByTestId("ac-first").fill("Aria"); await page.getByTestId("ac-last").fill("Tan"); await page.waitForTimeout(900); await shot(page, "10-add-child-checking-or-taken");
  await page.getByRole("button", { name: "P3", exact: true }).click(); await page.getByRole("button", { name: "English" }).click(); await page.getByRole("button", { name: "Math" }).click(); await page.getByRole("button", { name: "Chinese", exact: true }).click();
  await page.getByTestId("ac-username").fill("AriaTan"); await page.waitForTimeout(900);
  for (const i of [0, 3, 8, 3]) await page.getByTestId(`pic-${i}`).first().click();
  for (const i of [0, 3, 8, 3]) await page.getByTestId(`pic-${i}`).nth(1).click();
  await shot(page, "11-add-child-available-pictures");
  await page.getByTestId("ac-create").click(); await page.getByTestId("child-ready").waitFor(); await shot(page, "18-child-ready");
  await s.c.close();
  // builder + logged-in landing + home
  s = await ctx((p) => {
    if (p === "/api/auth/me") return { ok: true, profile: kid, children: [] };
    if (p === "/api/clewquest/state") return globalThis.__noChar ? { ...stateOk, character: null } : stateOk;
    return undefined;
  }); page = s.page;
  globalThis.__noChar = true; await page.goto(base); await page.getByTestId("cq-builder").waitFor(); await shot(page, "12-builder");
  await page.getByTestId("cq-gender-boy").click(); await page.getByTestId("cq-colour-tyrian-purple").click(); await page.getByTestId("cq-hair-hermes-wind").click(); await shot(page, "13-builder-boy-purple");
  globalThis.__noChar = false; await page.reload(); await page.getByTestId("cq-landing").waitFor(); await shot(page, "14-logged-in-landing");
  await page.getByTestId("cq-clew").click(); await page.getByTestId("cq-home").waitFor(); await shot(page, "15-clewquest-home"); await s.c.close();
  // parent dashboard
  s = await ctx((p) => {
    if (p === "/api/auth/me") return { ok: true, profile: parent, children: [kid] };
    if (p === "/api/parent/children") return { ok: true, children: [kid] };
    if (p.startsWith("/api/parent/today")) return { ok: true, children: [] };
    if (p === "/api/clewquest/picture-reset") return { ok: true, username: "Aria01", name: "Aria Tan" };
    return undefined;
  }); page = s.page;
  await page.goto(base); await page.getByTestId("child-card").waitFor(); await shot(page, "16-parent-dashboard-child-card");
  await page.getByTestId("reset-signin-open").click(); await shot(page, "19-reset-signin-pick");
  for (const i of [1, 2, 5, 6]) await page.getByTestId(`pic-${i}`).first().click();
  for (const i of [1, 2, 5, 6]) await page.getByTestId(`pic-${i}`).nth(1).click();
  await shot(page, "20-reset-signin-confirm-pictures");
  await page.getByTestId("reset-review").click(); await shot(page, "21-reset-signin-review");
  await page.getByTestId("reset-save").click(); await page.getByTestId("reset-done").waitFor(); await shot(page, "22-reset-signin-done");
  await page.getByTestId("ac-open").click(); await shot(page, "17-parent-add-child"); await s.c.close();
  await browser.close();
}
run().catch((e) => { console.error(e); process.exit(1); });
