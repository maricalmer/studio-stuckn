const { defineConfig, devices } = require("@playwright/test");

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";
const usesExternalServer = Boolean(process.env.BASE_URL);

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  // Image-heavy project pages can legitimately take longer than Playwright's
  // 30-second default on a cold local production build.
  timeout: 90_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: usesExternalServer
    ? undefined
    : {
        // Compare like with like: Netlify and the public site serve production
        // builds, so the local baseline must not use Next's development server.
        command: "npm run build && npm run start",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 180_000,
      },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      use: {
        // Keep Chromium identical across projects and pin a 1x scale factor so
        // committed snapshots are exactly 390 pixels wide on every machine.
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
