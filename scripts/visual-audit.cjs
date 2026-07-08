const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const pages = [
    { name: "components-overview", path: "/components" },
    { name: "general-icon", path: "/components/General/icon" },
    { name: "general-direction", path: "/components/General/direction" },
    { name: "general-spin", path: "/components/General/spin" },
    { name: "general-typography", path: "/components/General/typography" },
    { name: "general-button", path: "/components/General/button" },
    { name: "general-collapsible", path: "/components/General/collapsible" },
    { name: "general-rating", path: "/components/General/rating" },
    { name: "general-transfer", path: "/components/General/transfer" },
    { name: "general-tour", path: "/components/General/tour" },
    { name: "business-auth-forms", path: "/components/Business/auth-forms" },
    { name: "business-activity-feed", path: "/components/Business/activity-feed" },
    { name: "datadisplay-accordion", path: "/components/DataDisplay/accordion" },
    { name: "feedback-alert", path: "/components/Feedback/alert" },
    { name: "form-checkbox", path: "/components/Form/checkbox" },
  ];

  for (const mode of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: mode,
    });
    const page = await context.newPage();

    for (const p of pages) {
      // Set theme via localStorage before navigating
      await page.goto("http://localhost:3001/", { waitUntil: "domcontentloaded" });
      await page.evaluate((theme) => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, mode);

      await page.goto(`http://localhost:3001${p.path}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      await page.waitForTimeout(2000);

      const screenshotPath = `output/playwright/visual-audit/${mode}-${p.name}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  ${mode}/${p.name} => ${screenshotPath}`);
    }

    await context.close();
  }

  await browser.close();
  console.log("Visual audit complete.");
})();
