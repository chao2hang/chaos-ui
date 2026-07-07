/**
 * Playwright configuration for axe-core E2E accessibility testing.
 *
 * Targets the built Storybook in `storybook-static/`, served via a static
 * web server on port 3002. Run `npm run build-storybook` first, then
 * `npx playwright install && npm run test:a11y`.
 */
import { defineConfig, devices } from "playwright/test";

const PORT = 3002;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npx --yes http-server storybook-static -p ${PORT} -a 127.0.0.1 --silent`,
    url: `${BASE_URL}/iframe.html?id=components-button--default`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
