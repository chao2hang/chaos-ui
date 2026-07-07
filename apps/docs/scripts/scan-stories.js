const { chromium } = require("playwright")
const fs = require("fs")
const path = require("path")

const STORY_IDS_FILE = path.join(__dirname, "..", "docs", "story-ids.txt")
const OUTPUT_FILE = path.join(__dirname, "..", "docs", "playwright-results-raw.json")
const BASE_URL = "http://localhost:3002"

const STORY_NAV_TIMEOUT = 30000
const SETTLE_DELAY_MS = 1500

async function main() {
  const ids = fs
    .readFileSync(STORY_IDS_FILE, "utf8")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)

  console.log(`[scan] ${ids.length} story ids loaded`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  const results = []
  let processed = 0

  for (const id of ids) {
    processed += 1
    const url = `${BASE_URL}/?path=/story/${id}`

    const consoleErrors = []
    const consoleWarnings = []
    const pageErrors = []
    const failedRequests = []
    const requestFailed = []

    const onConsole = (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text())
      else if (msg.type() === "warning") consoleWarnings.push(msg.text())
    }
    const onPageError = (err) => {
      pageErrors.push(err.message)
    }
    const onRequestFailed = (req) => {
      const url = req.url()
      if (url.includes("iframe.html") || url.includes("/sb-") || url.includes("/vite/")) {
        requestFailed.push(`${req.failure()?.errorText} ${url}`)
      }
    }
    const onResponse = (res) => {
      const u = res.url()
      if (u.includes("localhost:3002") && res.status() >= 400) {
        if (
          u.includes(".stories.") ||
          u.includes("/src/") ||
          u.includes("/node_modules/.cache/") ||
          u.includes("Outdated Optimize")
        ) {
          failedRequests.push(`${res.status()} ${u}`)
        }
      }
    }

    page.on("console", onConsole)
    page.on("pageerror", onPageError)
    page.on("requestfailed", onRequestFailed)
    page.on("response", onResponse)

    const startedAt = Date.now()
    let status = "ok"
    let navError = null
    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: STORY_NAV_TIMEOUT,
      })
      await page.waitForTimeout(SETTLE_DELAY_MS)
      const titleHasError = await page
        .title()
        .then((t) => t.toLowerCase())
        .catch(() => "")
      if (titleHasError.includes("error") || titleHasError.includes("not found")) {
        status = "title-error"
      }
    } catch (e) {
      status = "nav-failed"
      navError = e.message
    }

    page.off("console", onConsole)
    page.off("pageerror", onPageError)
    page.off("requestfailed", onRequestFailed)
    page.off("response", onResponse)

    const hasIssues =
      consoleErrors.length > 0 ||
      pageErrors.length > 0 ||
      failedRequests.length > 0 ||
      requestFailed.length > 0 ||
      status !== "ok"

    results.push({
      id,
      status,
      durationMs: Date.now() - startedAt,
      navError,
      consoleErrors,
      pageErrors,
      failedRequests,
      requestFailed,
    })

    if (processed % 25 === 0 || hasIssues) {
      console.log(
        `[scan] ${processed}/${ids.length} ${id} status=${status} errs=${consoleErrors.length}+${pageErrors.length} net=${failedRequests.length}`,
      )
    }

    if (processed % 50 === 0) {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2))
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2))
  await browser.close()
  console.log(`[scan] done. ${results.length} results -> ${OUTPUT_FILE}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
