const { defineConfig } = require("@playwright/test");
require("./tests/e2e/guard").assertNonProduction(); // fail fast if any configured Supabase URL or key is the production project

module.exports = defineConfig({
  testDir: "tests/e2e",
  timeout: 45 * 60 * 1000,
  expect: { timeout: 20000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    actionTimeout: 20000,
    navigationTimeout: 30000,
    baseURL: process.env.E2E_BASE_URL || "http://127.0.0.1:3000",
    timezoneId: "Asia/Singapore",
    locale: "en-SG",
    viewport: { width: 1280, height: 900 },
    trace: "off",
    video: "off",
  },
});
