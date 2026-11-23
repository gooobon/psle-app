// ClewQuest onboarding E2E: parent sign-up -> email confirm -> step 2 -> add child with pictures -> success -> add another ->
// dashboard -> log out -> child logs in (Student tab, ID in different letter case + pictures) -> builder -> home. Plus: Taken shows
// suggestions, and a parent resets the child's sign-in.
// TEST SUPABASE PROJECT ONLY. Run against a local/non-prod project with
//   NEXT_PUBLIC_SERVER_AUTH=true NEXT_PUBLIC_CLEWQUEST_ENABLED=true CLEWQUEST_PICTURE_PEPPER=<16+ chars>
//   E2E_API_URL / E2E_SERVICE_ROLE pointing at the test project. Refuses to run if any URL contains the production project ref.
const { test, expect } = require("@playwright/test");
const { dbGet, shot, assertLocalOnly, confirmLinkHash } = require("./helpers");

function guard() {
  assertLocalOnly(); // throws on the production ref (or an un-opted hosted project)
  if (!process.env.E2E_API_URL || !process.env.E2E_SERVICE_ROLE) throw new Error("E2E_API_URL and E2E_SERVICE_ROLE (local or non-production project) are required.");
}

const STAMP = Date.now().toString(36).slice(-6);
const EMAIL = `parent-${STAMP}@example.test`; // reserved test domain, never a real address
const PASS = "e2e-pass-" + STAMP;
const CHILD = "Clew" + STAMP, CHILD2 = "Quest" + STAMP;
const CODE = [0, 3, 8, 4]; // Owl, Bolt, Clew, Wing shoe
const pics = async (page, codes, pad = 0) => { for (const i of codes) await page.getByTestId(`pic-${i}`).nth(pad).click(); }; // pad 1 = "pick the same pictures again"

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
  // 2-3. email confirm. A project with "Confirm email" ON shows "check your email": the confirm link is mocked through the test project's
  // admin API. A project with it OFF (local default) signs the parent in straight away and shows step 2.
  const afterSignup = await Promise.race([
    page.getByTestId("check-email").waitFor({ timeout: 30000 }).then(() => "confirm"),
    page.getByTestId("cq-signup-step2").waitFor({ timeout: 30000 }).then(() => "step2"),
  ]);
  if (afterSignup === "confirm") {
    await shot(page, "ob-03-check-email");
    const hash = await confirmLinkHash(EMAIL);
    await page.goto(`/?token_hash=${encodeURIComponent(hash)}&type=magiclink`);
  }
  await expect(page.getByTestId("cq-signup-step2")).toBeVisible({ timeout: 30000 }); await shot(page, "ob-04-step2");

  // negative: a taken login ID shows suggestions (checked after the first child exists, below). First child:
  await fillChild(page, { first: "Aria", last: "Tan", user: CHILD });
  await expect(page.getByTestId("ac-status")).toContainText("Available", { timeout: 10000 });
  await pics(page, CODE, 0); await pics(page, CODE, 1); await shot(page, "ob-05-step2-filled");
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
  await pics(page, CODE, 0); await pics(page, CODE, 1); await page.getByTestId("ac-create").click();
  await expect(page.getByTestId("child-ready")).toContainText("Ben is ready!", { timeout: 30000 });

  // 7. Go to dashboard: child card shows name + Login ID
  await page.getByTestId("ready-dashboard").click();
  await expect(page.getByTestId("child-card")).toBeVisible({ timeout: 30000 });
  await expect(page.getByTestId("child-login-id")).toBeVisible(); await shot(page, "ob-08-dashboard");

  // 8. log out
  await page.getByRole("button", { name: /^log ?out$/i }).first().click();
  await expect(page.getByTestId("cq-prelogin")).toBeVisible({ timeout: 20000 });

  // 9. child logs in on the Student tab: ID in different letter case + pictures
  await page.getByTestId("cq-landing-login").click();
  await page.getByTestId("pic-username").fill(CHILD.toUpperCase());
  await pics(page, CODE); await shot(page, "ob-09-child-login");
  await page.getByTestId("pic-submit").click();

  // 10-11. first login -> builder -> home
  await expect(page.getByTestId("cq-builder")).toBeVisible({ timeout: 30000 }); await shot(page, "ob-10-builder");
  expect(await page.getByTestId("cq-tab-eyes").count()).toBe(0); // Hair tab only
  await page.getByTestId("cq-save").click();
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 20000 }); await shot(page, "ob-11-home");
});

test("parent resets a child's sign-in; the child logs in with the new pictures", async ({ page }) => {
  guard(); test.setTimeout(5 * 60 * 1000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByTestId("cq-landing-login").click(); await page.getByTestId("login-role-parent").click();
  await page.getByTestId("login-id").fill(EMAIL); await page.getByTestId("login-password").fill(PASS); await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("child-card")).toBeVisible({ timeout: 30000 });
  await page.getByTestId("reset-signin-open").click();
  const NEW = [1, 2, 5, 6]; await pics(page, NEW, 0); await pics(page, NEW, 1);
  await page.getByTestId("reset-review").click(); await page.getByTestId("reset-save").click();
  await expect(page.getByTestId("reset-done")).toBeVisible({ timeout: 20000 }); await shot(page, "ob-12-reset-done");
  await page.getByRole("button", { name: /log ?out/i }).click();
  await page.getByTestId("cq-landing-login").click();
  await page.getByTestId("pic-username").fill(CHILD); await pics(page, CODE); await page.getByTestId("pic-submit").click();
  await expect(page.getByTestId("pic-error")).toBeVisible(); // old pictures no longer work
  await page.getByTestId("pic-clear").click(); await pics(page, NEW); await page.getByTestId("pic-submit").click();
  await expect(page.getByTestId("cq-landing")).toBeVisible({ timeout: 30000 });
});
