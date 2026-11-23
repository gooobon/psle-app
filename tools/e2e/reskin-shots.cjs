// Mobile screenshots (390x844) of the restyled shell screens in LOCAL mode (no Supabase). Demo users use fake data.
// Usage: NEXT_PUBLIC_SHOW_DEMO=true npx next dev -p 3100, then: node tools/e2e/reskin-shots.cjs http://127.0.0.1:3100
const { chromium } = require("@playwright/test");
const path = require("path");
const base = process.argv[2] || "http://127.0.0.1:3100";
if (/zehnulwvysvnsshunxzr/.test(base)) throw new Error("Refusing to run against production.");
const OUT = process.env.SHOT_DIR || path.join(__dirname, "../../docs/design/reskin-shots");
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const shot = (n, full) => page.screenshot({ path: path.join(OUT, n + ".png"), fullPage: !!full });
  const login = async (id, pw, role) => {
    await page.goto(base + "/");
    await page.getByTestId("cq-landing-login").click();
    await page.getByTestId("login-form").waitFor();
    await page.getByTestId("login-role-" + role).click();
    await page.getByTestId("login-id").fill(id);
    await page.getByTestId("login-password").fill(pw);
    await page.getByTestId("login-submit").click();
  };
  // local-mode signup form
  await page.goto(base + "/");
  await page.getByTestId("cq-landing-signup").click();
  await page.getByTestId("signup-local-form").waitFor();
  await shot("03-local-signup", true);
  // student Today
  await login("demo_student", "demo123", "student");
  await page.getByText(/Hello,/).first().waitFor({ timeout: 20000 });
  await shot("02-today-header", true);
  // student subject home (the "More" button on the English card)
  await page.getByRole("button", { name: "More" }).first().click();
  await page.getByText(/Today's set|today's set/i).first().waitFor({ timeout: 15000 });
  await page.waitForTimeout(500);
  await shot("04-student-subject-home", true);
  // a solving screen (must be unchanged by the reskin): start today's set, first question, viewport only
  const start = page.locator("[role=button]").filter({ hasText: /Start today|Continue today/ }).first();
  await start.click();
  await page.waitForTimeout(1500);
  await shot(process.env.SOLVE_NAME || "06-solving-screen", false);
  await ctx.clearCookies(); await page.evaluate(() => sessionStorage.clear());
  // parent dashboard
  await login("demo_parent", "demo456", "parent");
  await page.getByTestId("parent-stat-cards").waitFor({ timeout: 20000 });
  await shot("01-parent-dashboard-stat-cards", true);
  await page.getByRole("button", { name: "Mistakes", exact: true }).click();
  await page.waitForTimeout(500);
  await shot("05-parent-mistakes-tab", true);
  await b.close();
})();
