/**
 * Full Visual Audit Script
 *
 * Visits all 546 component pages in light + dark mode.
 * Captures: screenshots, console errors, preview status.
 * Output: output/playwright/visual-audit-full/report.json
 */

const { chromium } = require("playwright");
const { readFileSync, writeFileSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const ROOT = join(__dirname, "..");
const BASE_URL = "http://localhost:3001";
const OUTPUT_DIR = join(ROOT, "output/playwright/visual-audit-full");
mkdirSync(OUTPUT_DIR, { recursive: true });

// Parse components from meta to get all URLs
function getComponentPages() {
  const meta = readFileSync(
    join(ROOT, "apps/docs/@/content/components.meta.ts"),
    "utf-8"
  );
  const pages = [];
  const regex =
    /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(meta)) !== null) {
    const [, slug, name, category] = match;
    pages.push({
      slug,
      category,
      name,
      url: `/components/${category}/${slug}`,
    });
  }
  return pages;
}

(async () => {
  const pages = getComponentPages();
  console.log(`🔍 Auditing ${pages.length} component pages...\n`);

  const report = [];

  const browser = await chromium.launch();

  for (const mode of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: mode,
    });
    const page = await context.newPage();

    // Collect console errors
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      consoleErrors.length = 0; // reset per page

      try {
        // Set theme
        await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded" });
        await page.evaluate((theme) => {
          localStorage.setItem("theme", theme);
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }, mode);

        await page.goto(BASE_URL + p.url, {
          waitUntil: "networkidle",
          timeout: 30000,
        });
        await page.waitForTimeout(1500);

        // Check preview status
        const previewStatus = await page.evaluate(() => {
          const errorEl = document.querySelector(
            '[class*="destructive"]'
          );
          const noPreviewEl = document.body.innerText.includes(
            "No live preview available"
          );
          const loadingEl = document.body.innerText.includes("暂无");
          const previewArea = document.querySelector(
            '[class*="repeating-linear-gradient"]'
          );

          return {
            hasError: !!errorEl,
            noPreview: noPreviewEl,
            loading: loadingEl,
            hasPreviewArea: !!previewArea,
            hasContent: previewArea
              ? previewArea.children.length > 0 ||
                (previewArea.textContent &&
                  previewArea.textContent.trim().length > 0)
              : false,
          };
        });

        const screenshotName = `${mode}-${p.category}-${p.slug}.png`;
        await page.screenshot({
          path: join(OUTPUT_DIR, screenshotName),
          fullPage: false,
        });

        const entry = {
          slug: p.slug,
          name: p.name,
          category: p.category,
          mode,
          url: p.url,
          screenshot: screenshotName,
          previewStatus,
          consoleErrors: [...consoleErrors],
          status:
            previewStatus.hasError || consoleErrors.length > 0
              ? "error"
              : previewStatus.noPreview
              ? "no_preview"
              : previewStatus.hasContent
              ? "ok"
              : "empty",
        };

        report.push(entry);

        if ((i + 1) % 50 === 0) {
          console.log(
            `  [${mode}] ${i + 1}/${pages.length} pages scanned...`
          );
        }
      } catch (err) {
        report.push({
          slug: p.slug,
          name: p.name,
          category: p.category,
          mode,
          url: p.url,
          status: "timeout",
          error: err.message,
          consoleErrors: [...consoleErrors],
        });
      }
    }

    await context.close();
    console.log(`✅ ${mode} mode complete.`);
  }

  await browser.close();

  // Write report
  writeFileSync(
    join(OUTPUT_DIR, "report.json"),
    JSON.stringify(report, null, 2)
  );

  // Summary
  const summary = {
    total: report.length,
    ok: report.filter((r) => r.status === "ok").length,
    error: report.filter((r) => r.status === "error").length,
    no_preview: report.filter((r) => r.status === "no_preview").length,
    empty: report.filter((r) => r.status === "empty").length,
    timeout: report.filter((r) => r.status === "timeout").length,
  };
  console.log(`\n📊 Summary:`);
  console.log(`  Total: ${summary.total}`);
  console.log(`  OK: ${summary.ok}`);
  console.log(`  Error: ${summary.error}`);
  console.log(`  No Preview: ${summary.no_preview}`);
  console.log(`  Empty: ${summary.empty}`);
  console.log(`  Timeout: ${summary.timeout}`);
  console.log(`\n📝 Report: ${join(OUTPUT_DIR, "report.json")}`);
})();
