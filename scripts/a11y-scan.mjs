/**
 * Accessibility scan script using Playwright + @axe-core/playwright.
 *
 * Usage: node scripts/a11y-scan.mjs [url]
 * Default: http://localhost:3002
 *
 * Exits with code 1 if accessibility violations are found.
 */

import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const TARGET_URL = process.argv[2] || "http://localhost:3002";

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`🔍 Scanning ${TARGET_URL} ...`);

    // Retry until the server is ready (up to 30s)
    const deadline = Date.now() + 30000;
    let lastError;
    while (Date.now() < deadline) {
      try {
        await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 10000 });
        lastError = null;
        break;
      } catch (e) {
        lastError = e.message;
        console.log(`  Waiting for server... (${lastError.slice(0, 60)})`);
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
    if (lastError) throw new Error(`Server did not become ready: ${lastError}`);

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
    if (browser) {
      try { await browser.close(); } catch {}
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});
