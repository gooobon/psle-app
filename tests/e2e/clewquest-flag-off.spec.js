// ClewQuest flag OFF: routes 404 and the login / student home match the pre-ClewQuest app.
// Local Supabase only. Run against a server built with NEXT_PUBLIC_CLEWQUEST_ENABLED unset.
const { test, expect } = require("@playwright/test");
const { shot, assertLocalOnly } = require("./helpers");

const PROD = "zehnulwvysvnsshunxzr";
const ROUTES = [
  ["/api/auth/student/picture-login", "POST"],
  ["/api/auth/student/picture-signup", "POST"],
  ["/api/clewquest/state", "GET"],
  ["/api/clewquest/character", "PUT"],
  ["/api/clewquest/award", "POST"],
  ["/api/clewquest/hint", "POST"],
  ["/api/clewquest/picture-reset", "POST"],
  ["/api/clewquest/link-code", "POST"],
  ["/api/parent/children/link-code", "POST"],
  ["/api/parent/children/picture", "POST"],
];

test.use({ viewport: { width: 390, height: 844 } });

test("flag off: ClewQuest routes 404 and the app has no ClewQuest UI", async ({ page, request }) => {
  assertLocalOnly();
  const url = String(process.env.E2E_API_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "");
  if (url.includes(PROD)) throw new Error("Refusing to run: production Supabase ref.");
  test.setTimeout(120000);
  const codes = {};
  for (const [path, method] of ROUTES) {
    const r = await request.fetch(path, { method, data: method === "GET" ? undefined : {} });
    codes[method + " " + path] = r.status();
    expect(r.status(), path).toBe(404);
  }
  await page.goto("/");
  await expect(page.getByTestId("cq-prelogin")).toBeVisible();
  await expect(page.getByTestId("cq-landing-signup")).toBeVisible();
  await page.getByTestId("cq-landing-login").click();
  await expect(page.getByTestId("login-form")).toBeVisible();
  expect(await page.getByTestId("cq-open-picture-signup").count()).toBe(0);
  expect(await page.getByTestId("cq-open-picture-login").count()).toBe(0);
  expect(await page.getByText(/sign in with pictures|create account with pictures/i).count()).toBe(0);
  await shot(page, "off-01-login");
  await page.getByTestId("login-id").fill("demo_student");
  await page.getByTestId("login-password").fill("demo123");
  await page.getByTestId("login-submit").click();
  await expect(page.getByText("Hello, Demo")).toBeVisible({ timeout: 20000 });
  expect(await page.getByTestId("cq-landing").count()).toBe(0);
  expect(await page.getByTestId("cq-builder").count()).toBe(0);
  expect(await page.getByTestId("today-back-to-islands").count()).toBe(0);
  const text = await page.locator("body").innerText();
  expect(text).toMatch(/Today/);
  expect(text).toMatch(/English/);
  expect(text).not.toMatch(/ClewQuest|English Island|thread/);
  expect(text).not.toMatch(/[\uAC00-\uD7A3]/);
  await shot(page, "off-02-demo-today");
  console.log("FLAG_OFF_ROUTES " + JSON.stringify(codes));
});
