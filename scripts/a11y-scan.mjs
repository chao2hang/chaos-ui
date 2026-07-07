/**
 * Accessibility scan script using Playwright + @axe-core/playwright.
 *
 * Usage: node scripts/a11y-scan.mjs [url]
 * Default: http://localhost:6006
 *
 * Exits with code 1 if accessibility violations are found.
 */

import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const TARGET_URL = process.argv[2] || "http://localhost:6006";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 60000 });

    const results = await new AxeBuilder({ page }).analyze();

    if (results.violations.length > 0) {
      console.log(`\n❌ Found ${results.violations.length} accessibility violation(s):\n`);
      for (const v of results.violations) {
        console.log(`  [${v.id}] ${v.help}`);
        console.log(`  Impact: ${v.impact}`);
        console.log(`  URL:    ${v.helpUrl}`);
        console.log(`  Nodes:  ${v.nodes.length}\n`);
      }
      await browser.close();
      process.exit(1);
    }

    console.log("✅ No accessibility violations found.");
    await browser.close();
  } catch (err) {
    console.error("❌ Accessibility scan failed:", err.message);
    await browser.close();
    process.exit(1);
  }
}

main();
