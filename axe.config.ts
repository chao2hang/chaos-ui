/**
 * @axe-core/playwright E2E accessibility testing configuration.
 *
 * Usage in Playwright tests:
 * ```ts
 * import { AxeBuilder } from "@axe-core/playwright";
 * import { expect } from "@playwright/test";
 *
 * test("page has no a11y violations", async ({ page }) => {
 *   await page.goto("http://localhost:6006");
 *   const results = await new AxeBuilder({ page })
 *     .withTags(["wcag2a", "wcag2aa"])
 *     .analyze();
 *   expect(results.violations).toEqual([]);
 * });
 * ```
 *
 * Install: npm install -D @axe-core/playwright
 */

export const axeConfig = {
  tags: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
  rules: {
    // Allow color-contrast to be a warning during transition
    "color-contrast": { enabled: true },
    // Ensure all interactive elements have accessible names
    "button-name": { enabled: true },
    "link-name": { enabled: true },
    "image-alt": { enabled: true },
    label: { enabled: true },
    // Landmark rules
    "landmark-one-main": { enabled: true },
    "page-has-heading-one": { enabled: true },
    // ARIA rules
    "aria-valid-attr": { enabled: true },
    "aria-valid-attr-value": { enabled: true },
    "aria-roles": { enabled: true },
  },
  // Exclude elements that are known to have false positives
  exclude: [
    '[data-slot="portal"]',
    '[data-slot="popover-content"]',
    "[data-radix-popper-content-wrapper]",
  ],
};

export default axeConfig;
