// ClewQuest onboarding E2E: parent sign-up -> email confirm -> step 2 -> add child with pictures -> success -> add another ->
// dashboard -> log out -> child logs in (Student tab, ID in different letter case + pictures) -> builder -> home. Plus: Taken shows
// suggestions, and a parent resets the child's sign-in.
// TEST SUPABASE PROJECT ONLY. Run against a local/non-prod project with
//   NEXT_PUBLIC_SERVER_AUTH=true NEXT_PUBLIC_CLEWQUEST_ENABLED=true CLEWQUEST_PICTURE_PEPPER=<16+ chars>
//   E2E_API_URL / E2E_SERVICE_ROLE pointing at the test project. Refuses to run if any URL contains the production project ref.
const { test, expect } = require("@playwright/test");
const { dbGet, shot, assertLocalOnly } = require("./helpers");

const PROD_REF = "zehnulwvysvnsshunxzr";
function guard() {
  assertLocalOnly();
  const urls = [process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.E2E_API_URL, process.env.E2E_BASE_URL, process.env.E2E_DB_URL].join(" ");
  if (urls.includes(PROD_REF)) throw new Error("Refusing to run: production Supabase ref detected.");
  if (!process.env.E2E_API_URL || !process.env.E2E_SERVICE_ROLE) throw new Error("E2E_API_URL and E2E_SERVICE_ROLE (test project) are required.");
  if (/^https:\/\/[a-z0-9]{20}\.supabase\.co/i.test(process.env.E2E_API_URL) && process.env.E2E_ALLOW_NONPROD_CLOUD !== "1") throw new Error("E2E_API_URL looks like a hosted project. Set E2E_ALLOW_NONPROD_CLOUD=1 only for a dedicated non-prod project.");
}
// Admin API on the test project: a confirm link for the (unconfirmed) parent. Returns the token_hash the app's confirm route verifies.
async function confirmLink(email) {
  const r = await fetch(process.env.E2E_API_URL.replace(/\/$/, "") + "/auth/v1/admin/generate_link", {
    method: "POST", headers: { apikey: process.env.E2E_SERVICE_ROLE, Authorization: "Bearer " + process.env.E2E_SERVICE_ROLE, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "magiclink", email }),
  });
  const j = await r.json();
  const hash = j.hashed_token || (j.properties && j.properties.hashed_token);
  if (!hash) throw new Error("no hashed_token from the test project: " + JSON.stringify(Object.keys(j)));
  return hash;
}

const STAMP = Date.now().toString(36).slice(-6);
const EMAIL = `parent-${STAMP}@example.com`; // reserved example domain
const PASS = "e2e-pass-" + STAMP;
const CHILD = "Clew" + STAMP, CHILD2 = "Quest" + STAMP;
const CODE = [0, 3, 8, 4]; // Owl, Bolt, Clew, Wing shoe
const pics = async (page, codes) => { for (const i of codes) await page.getByTestId(`pic-${i}`).first().click(); };

async function fillChild(page, { first, last, user }) {
  await page.getByTestId("ac-first").fill(first); await page.getByTestId("ac-last").fill(last);
  await page.getByRole("button", { name: "P3", exact: true }).click(); await page.getByRole("button", { name: "English" }).click(); await page.getByRole("button", { name: "Chinese", exact: true }).click();
  await page.getByTestId("ac-username").fill(user);
}

test("parent sign-up -> confirm -> add child with pictures -> child logs in -> builder -> home", async ({ page }) => {
  guard(); test.setTimeout(10 * 60 * 1000);
  await page.setViewportSize({ width: 390, height: 844 });

  // 1. landing -> Sign up -> step 1
  await page.goto("/");
  await expect(page.getByTestId("cq-prelogin")).toBeVisible(); await shot(page, "ob-01-landing");
  await page.getByTestId("cq-landing-signup").click();
  await page.getByTestId("su-pname").fill("Mdm Tan"); await page.getByTestId("su-pemail").fill(EMAIL); await page.getByTestId("su-ppassword").fill(PASS);
  await page.getByTestId("su-c1").check(); await page.getByTestId("su-c2").check(); await shot(page, "ob-02-signup-step1");
  await page.getByTestId("su-continue").click();
  await expect(page.getByTestId("check-email")).toBeVisible(); await shot(page, "ob-03-check-email");

  // 2-3. email confirm (test project admin API) -> lands logged in on step 2
  const hash = await confirmLink(EMAIL);
  await page.goto(`/?token_hash=${encodeURIComponent(hash)}&type=magiclink`);
  await expect(page.getByTestId("cq-signup-step2")).toBeVisible({ timeout: 30000 }); await shot(page, "ob-04-step2");

  // negative: a taken login ID shows suggestions (checked after the first child exists, below). First child:
  await fillChild(page, { first: "Aria", last: "Tan", user: CHILD });
  await expect(page.getByTestId("ac-status")).toContainText("Available", { timeout: 10000 });
  await pics(page, CODE); await pics(page, CODE); await shot(page, "ob-05-step2-filled");
  await page.getByTestId("ac-create").click();
  await expect(page.getByTestId("child-ready")).toBeVisible({ timeout: 30000 });
  await expect(page.getByTestId("child-ready")).toContainText("Aria is ready!");
  await expect(page.getByTestId("ready-username")).toHaveText(CHILD); await shot(page, "ob-06-ready");
  const prof = await dbGet("profiles?select=id,username&username=eq." + CHILD);
  expect(prof.length).toBe(1);
  expect((await dbGet("parent_child?select=child_id&child_id=eq." + prof[0].id)).length).toBe(1);

  // 6. Add another child (negative: the same ID in other letter case is Taken, with suggestions)
  await page.getByTestId("ready-another").click();
  await fillChild(page, { first: "Ben", last: "Tan", user: CHILD.toUpperCase() });
  await expect(page.getByTestId("ac-status")).toContainText("Taken", { timeout: 10000 });
  expect(await page.getByTestId("ac-suggest").count()).toBe(3); await shot(page, "ob-07-taken");
  await page.getByTestId("ac-username").fill(CHILD2);
  await expect(page.getByTestId("ac-status")).toContainText("Available", { timeout: 10000 });
  await pics(page, CODE); await pics(page, CODE); await page.getByTestId("ac-create").click();
  await expect(page.getByTestId("child-ready")).toContainText("Ben is ready!", { timeout: 30000 });

  // 7. Go to dashboard: child card shows name + Login ID
  await page.getByTestId("ready-dashboard").click();
  await expect(page.getByTestId("child-card")).toBeVisible({ timeout: 30000 });
  await expect(page.getByTestId("child-login-id")).toBeVisible(); await shot(page, "ob-08-dashboard");

  // 8. log out
  await page.getByRole("button", { name: /log ?out/i }).click();
  await expect(page.getByTestId("cq-prelogin")).toBeVisible({ timeout: 20000 });

  // 9. child logs in on the Student tab: ID in different letter case + pictures
  await page.getByTestId("cq-landing-login").click();
  await page.getByTestId("pic-username").fill(CHILD.toUpperCase());
  await pics(page, CODE); await shot(page, "ob-09-child-login");
  await page.getByTestId("pic-submit").click();

  // 10-11. first login -> builder -> home
  await expect(page.getByTestId("cq-builder")).toBeVisible({ timeout: 30000 }); await shot(page, "ob-10-builder");
  expect(await page.getByTestId("cq-tab-eyes").count()).toBe(0); // Hair tab only
  // Issue #100: tapping a hair card (other gender's card included) must update the live preview and allow saving.
  const preview = page.getByTestId("cq-preview");
  const before = await preview.evaluate((el) => (el.currentSrc || el.src || el.outerHTML));
  await shot(page, "ob-10a-builder-before-hair");
  await page.getByTestId("cq-hair-apollo-curls").click();
  await expect(page.getByTestId("cq-hair-apollo-curls")).toHaveAttribute("aria-pressed", "true");
  await expect.poll(() => preview.evaluate((el) => (el.currentSrc || el.src || el.outerHTML))).not.toBe(before);
  await shot(page, "ob-10b-builder-after-hair");
  await page.getByTestId("cq-save").click();
  await expect(page.getByTestId("cq-builder-error")).not.toContainText("Choose a hairstyle");
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 }); await shot(page, "ob-11-home");
  for (const n of ["English", "Chinese", "Math", "Science", "The Clew"]) await expect(page.getByRole("button", { name: n, exact: true })).toBeVisible();
});

test("parent resets a child's sign-in; the child logs in with the new pictures", async ({ page }) => {
  guard(); test.setTimeout(5 * 60 * 1000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByTestId("cq-landing-login").click(); await page.getByTestId("login-role-parent").click();
  await page.getByTestId("login-id").fill(EMAIL); await page.getByTestId("login-password").fill(PASS); await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("child-card")).toBeVisible({ timeout: 30000 });
  await page.getByTestId("reset-signin-open").click();
  const NEW = [1, 2, 5, 6]; await pics(page, NEW); await pics(page, NEW);
  await page.getByTestId("reset-review").click(); await page.getByTestId("reset-save").click();
  await expect(page.getByTestId("reset-done")).toBeVisible({ timeout: 20000 }); await shot(page, "ob-12-reset-done");
  await page.getByRole("button", { name: /log ?out/i }).click();
  await page.getByTestId("cq-landing-login").click();
  await page.getByTestId("pic-username").fill(CHILD); await pics(page, CODE); await page.getByTestId("pic-submit").click();
  await expect(page.getByTestId("pic-error")).toBeVisible(); // old pictures no longer work
  await page.getByTestId("pic-clear").click(); await pics(page, NEW); await page.getByTestId("pic-submit").click();
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 30000 });
});
