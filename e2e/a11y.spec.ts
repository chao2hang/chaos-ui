/**
 * axe-core E2E accessibility tests against the built Storybook.
 *
 * Requires `npm run build-storybook` to have produced `storybook-static/`.
 * The Playwright webServer (see playwright.config.ts) serves that directory
 * on http://localhost:3002 so that `iframe.html?id=<storyId>` URLs resolve.
 *
 * Run: `npx playwright install && npm run test:a11y`
 */
import { expect, test } from "playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { axeConfig } from "../axe.config";

const WCAG_TAGS = axeConfig.tags;
const EXCLUDE = axeConfig.exclude ?? [];

/** A representative subset of component stories to assert against. */
const KEY_STORY_IDS = [
  "components-button--default",
  "components-alert--default",
  "components-accordion--default",
  "components-dialog--default",
  "components-input--default",
  "components-checkbox--default",
] as const;

test.describe("Storybook iframe — WCAG AA accessibility", () => {
  test("iframe shell has no WCAG AA violations", async ({ page }) => {
    await page.goto(`/iframe.html?id=${KEY_STORY_IDS[0]}`);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .exclude(EXCLUDE)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  for (const id of KEY_STORY_IDS) {
    test(`story ${id} has no WCAG AA violations`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${id}`);
      await page.waitForLoadState("domcontentloaded");

      const results = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .exclude(EXCLUDE)
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
