// ClewQuest Phase 1 E2E: picture-code sign-up -> builder -> landing -> English practice -> thread on home.
// NON-PRODUCTION ONLY. Run via a local Supabase (see tools/e2e/run-local.sh) with
//   NEXT_PUBLIC_SERVER_AUTH=true NEXT_PUBLIC_CLEWQUEST_ENABLED=true CLEWQUEST_PICTURE_PEPPER=<16+ chars>
// and E2E_API_URL / E2E_SERVICE_ROLE pointing at that local project. Not part of `npm run selftest`.
const { test, expect } = require("@playwright/test");
const { bodyText, dbGet, drive, shot, assertLocalOnly } = require("./helpers");

const PROD_REF = "zehnulwvysvnsshunxzr";
// Abort before anything runs if any configured Supabase URL/key is the production project, or if no non-prod API is given.
function guard() {
  assertLocalOnly();
  const urls = [process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.E2E_API_URL, process.env.E2E_BASE_URL].join(" ");
  if (urls.includes(PROD_REF)) throw new Error("Refusing to run: production Supabase ref detected.");
  if (!process.env.E2E_API_URL || !process.env.E2E_SERVICE_ROLE) throw new Error("E2E_API_URL and E2E_SERVICE_ROLE (local or non-prod) are required.");
  if (/^https:\/\/[a-z0-9]{20}\.supabase\.co/i.test(process.env.E2E_API_URL) && process.env.E2E_ALLOW_NONPROD_CLOUD !== "1") {
    throw new Error("E2E_API_URL looks like a hosted Supabase project. Set E2E_ALLOW_NONPROD_CLOUD=1 only if it is a dedicated non-prod project.");
  }
}

const USER = "clew_e2e_" + Date.now().toString(36).slice(-5);
const CODE = [0, 3, 5, 8]; // owl, ship, amphora, shield

test("picture sign-up -> builder -> landing -> English practice -> thread on home", async ({ page }) => {
  guard();
  test.setTimeout(30 * 60 * 1000);

  await page.goto("/");
  await page.getByTestId("cq-open-picture-signup").click();
  await page.getByTestId("su-username").fill(USER);
  await page.getByTestId("su-name").fill("Clew Tester");
  await page.getByTestId("su-next").click();
  for (const i of CODE) await page.getByTestId(`pic-${i}`).click();
  await page.getByTestId("su-next2").click();
  for (const i of CODE) await page.getByTestId(`pic-${i}`).click();
  await page.getByTestId("su-create").click();

  // Builder
  await expect(page.getByTestId("cq-builder")).toBeVisible({ timeout: 30000 });
  await page.getByTestId("cq-gender-girl").click();
  await page.getByTestId("cq-hair-ariadne-buns").click();
  await page.getByTestId("cq-next-hair").click();
  await page.getByTestId("cq-colour-egyptian-blue").click();
  await page.getByTestId("cq-next-colour").click();
  await page.getByTestId("cq-nickname").fill("Starlet");
  await shot(page, "cq-01-builder");
  await page.getByTestId("cq-save").click();

  // Landing: English and Chinese open, Math coming soon
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
  await shot(page, "cq-02-landing");
  await page.getByTestId("cq-island-math").click();
  await expect(page.getByTestId("cq-toast")).toHaveText("Coming soon");

  const chars = await dbGet("clewquest_characters?select=user_id,gender,hair_key,colour_key,nickname,picture_code_set");
  const mine = chars.find((c) => c.nickname === "Starlet");
  expect(mine).toBeTruthy();
  expect([mine.gender, mine.hair_key, mine.colour_key, mine.picture_code_set]).toEqual(["girl", "ariadne-buns", "egyptian-blue", true]);

  // English island opens the existing practice. Solve screens must show no ClewQuest elements.
  await page.getByTestId("cq-island-english").click();
  await page.getByRole("button", { name: "Start today's set" }).click();
  await drive(page, { label: "cq-english", max: 2200, done: async () => (await bodyText(page)).includes("correct on first try") });
  expect(await page.locator("[data-testid^='cq-']").count()).toBe(0);
  await shot(page, "cq-03-result");
  await page.getByRole("button", { name: /Back to Home/ }).click();

  // Back on the islands -> The Clew home shows the thread (server graded, idempotent)
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
  await page.waitForTimeout(2500); // the award is sent after marking; give it time to land
  await page.getByTestId("cq-clew").click();
  await expect(page.getByTestId("cq-home")).toBeVisible();
  const shown = Number(await page.getByTestId("cq-thread-total").innerText());
  expect(shown).toBeGreaterThanOrEqual(1);
  const ledger = await dbGet("clewquest_thread_ledger?select=amount,reason,subject,source_ref&user_id=eq." + mine.user_id);
  expect(ledger.length).toBeGreaterThan(0);
  expect(ledger.every((r) => r.subject === "english" && ((r.reason === "correct_first_try" && Number(r.amount) === 1) || (r.reason === "correct_after_hint" && Number(r.amount) === 0.5)))).toBe(true);
  expect(ledger.reduce((s, r) => s + Number(r.amount), 0)).toBeCloseTo(shown, 1);
  expect(new Set(ledger.map((r) => r.source_ref)).size).toBe(ledger.length); // idempotent
  await shot(page, "cq-04-home");

  // F7: the existing Today hub stays reachable with the flag on, and its back button returns to where it was opened
  await page.getByTestId("cq-today-home").click();
  await expect(page.getByTestId("today-back-to-islands")).toBeVisible({ timeout: 20000 });
  await shot(page, "cq-05-today-hub");
  await page.getByTestId("today-back-to-islands").click();
  await expect(page.getByTestId("cq-home")).toBeVisible({ timeout: 20000 });
  await page.getByRole("button", { name: "Back to the islands" }).click();
  await page.getByTestId("cq-today").click();
  await expect(page.getByTestId("today-back-to-islands")).toBeVisible({ timeout: 20000 });
  await page.getByTestId("today-back-to-islands").click();
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });

  // Picture login with the same code, after logging out
  await page.reload();
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
  await page.getByRole("button", { name: "Log out" }).click();
  await page.getByTestId("cq-open-picture-login").click();
  await page.getByTestId("pic-username").fill(USER);
  for (let i = 0; i < 9; i++) await expect(page.getByTestId(`pic-label-${i}`)).toBeVisible(); // F11: labels always shown
  for (const i of CODE) await page.getByTestId(`pic-${i}`).click();
  await page.getByTestId("pic-submit").click();
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 });
});
