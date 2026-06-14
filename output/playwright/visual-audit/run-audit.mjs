import { chromium } from "playwright"
import { mkdir, writeFile } from "node:fs/promises"

const baseUrl = "http://localhost:6006"
const outDir = "output/playwright/visual-audit"
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe"

const args = new Map()
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i]
  if (!arg.startsWith("--")) continue
  const [key, inlineValue] = arg.slice(2).split("=")
  const value = inlineValue ?? process.argv[i + 1]
  args.set(key, value)
  if (inlineValue === undefined) i += 1
}

const selectedGroup = args.get("group") ?? "all"
const selectedDevice = args.get("device") ?? "all"
const selectedTheme = args.get("theme") ?? "all"
const limit = Number(args.get("limit") ?? 0)
const offset = Number(args.get("offset") ?? 0)
const concurrency = Number(args.get("concurrency") ?? 4)

const viewports = [
  { device: "desktop", width: 1024, height: 768 },
  { device: "tablet", width: 768, height: 1024 },
  { device: "mobile", width: 375, height: 667 },
]
const themes = ["light", "dark"]

const selectedViewports =
  selectedDevice === "all"
    ? viewports
    : viewports.filter((viewport) => viewport.device === selectedDevice)
const selectedThemes =
  selectedTheme === "all" ? themes : themes.filter((theme) => theme === selectedTheme)

if (!selectedViewports.length) {
  throw new Error(`Unknown device "${selectedDevice}"`)
}

if (!selectedThemes.length) {
  throw new Error(`Unknown theme "${selectedTheme}"`)
}

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
})

function storybookUrl(doc, combo) {
  return `${baseUrl}/iframe.html?id=${doc.id}&viewMode=docs&globals=theme:${combo.theme};device:${combo.device}`
}

function buildReport({ docs, tasks, results, scanned }) {
  const byDoc = new Map()
  for (const item of results) {
    if (!byDoc.has(item.id)) {
      byDoc.set(item.id, { id: item.id, title: item.title, combos: [], samples: [] })
    }

    const doc = byDoc.get(item.id)
    doc.combos.push(item.combo)
    if (doc.samples.length < 3) doc.samples.push(item)
  }

  const summary = [...byDoc.values()].map((item) => ({
    id: item.id,
    title: item.title,
    combos: item.combos,
    firstIssue:
      item.samples[0].loadError ||
      item.samples[0].errors?.[0] ||
      JSON.stringify(item.samples[0].metrics?.storyIssues?.[0] || item.samples[0].metrics || {}).slice(0, 500),
    url: item.samples[0].url,
  }))

  return {
    generatedAt: new Date().toISOString(),
    filters: {
      group: selectedGroup,
      device: selectedDevice,
      theme: selectedTheme,
      offset,
      limit,
    },
    scannedDocs: docs.length,
    plannedCombos: tasks.length,
    scannedCombos: scanned,
    issueDocs: summary.length,
    issueCombos: results.length,
    summary,
    results,
  }
}

async function flushReport({ docs, tasks, results, scanned, outputPath }) {
  await mkdir(outDir, { recursive: true })
  await writeFile(
    outputPath,
    JSON.stringify(buildReport({ docs, tasks, results, scanned }), null, 2),
    "utf8"
  )
}

async function scanOne(page, doc, combo) {
  await page.setViewportSize({ width: combo.width, height: combo.height })
  const url = storybookUrl(doc, combo)
  const errors = []
  const onConsole = (msg) => {
    if (msg.type() === "error") errors.push(msg.text().slice(0, 300))
  }

  page.on("console", onConsole)
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 12_000 })
    await page
      .waitForSelector("#storybook-docs, #storybook-root, .sb-errordisplay, .sb-nopreview", {
        timeout: 5_000,
      })
      .catch(() => {})
    await page.waitForTimeout(120)

    const metrics = await page.evaluate(() => {
      const isVisible = (el) => {
        const style = getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0
      }
      const hasVisible = (selector) => Array.from(document.querySelectorAll(selector)).some(isVisible)
      const hasFixedAncestor = (el, boundary) => {
        let current = el

        while (current && current !== boundary) {
          if (getComputedStyle(current).position === "fixed") {
            return true
          }

          current = current.parentElement
        }

        return false
      }
      const visibleRect = (el, boundary) => {
        let rect = el.getBoundingClientRect()
        let current = el.parentElement

        while (current && current !== boundary) {
          const style = getComputedStyle(current)
          if (/(hidden|clip|auto|scroll)/.test(`${style.overflow}${style.overflowX}${style.overflowY}`)) {
            const parentRect = current.getBoundingClientRect()
            rect = {
              left: Math.max(rect.left, parentRect.left),
              right: Math.min(rect.right, parentRect.right),
              top: Math.max(rect.top, parentRect.top),
              bottom: Math.min(rect.bottom, parentRect.bottom),
              width: Math.max(0, Math.min(rect.right, parentRect.right) - Math.max(rect.left, parentRect.left)),
              height: Math.max(0, Math.min(rect.bottom, parentRect.bottom) - Math.max(rect.top, parentRect.top)),
            }
          }
          current = current.parentElement
        }

        return rect
      }

      const stories = Array.from(document.querySelectorAll(".docs-story"))
      const storyIssues = []

      for (const story of stories) {
        const storyRect = story.getBoundingClientRect()
        const anchor = story.closest('[id^="anchor--"]')
        const storyId = story.parentElement?.querySelector('[id^="story--"]')?.id || anchor?.id || ""
        const overflowX = story.scrollWidth - story.clientWidth
        const offenders = Array.from(story.querySelectorAll("*"))
          .filter(isVisible)
          .map((el) => {
            if (hasFixedAncestor(el, story)) return null
            const rect = visibleRect(el, story)
            const outside = Math.max(0, rect.right - storyRect.right, storyRect.left - rect.left)

            return outside > 3
              ? {
                  tag: el.tagName.toLowerCase(),
                  cls: String(el.className || "").slice(0, 100),
                  text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
                  outside: Math.round(outside),
                }
              : null
          })
          .filter(Boolean)
          .sort((a, b) => b.outside - a.outside)
          .slice(0, 4)

        if (offenders.length) {
          storyIssues.push({ storyId, overflowX: Math.round(overflowX), offenders })
        }
      }

      return {
        docsStoryCount: stories.length,
        hasErrorDisplay: hasVisible(".sb-errordisplay"),
        hasNoPreview: hasVisible(".sb-nopreview"),
        pageOverflowX: Math.round(document.documentElement.scrollWidth - document.documentElement.clientWidth),
        storyIssues: storyIssues.slice(0, 12),
        dark: document.documentElement.classList.contains("dark"),
        device: document.documentElement.getAttribute("data-device"),
        text: document.body.innerText.replace(/\s+/g, " ").trim().slice(0, 160),
      }
    })

    const uniqueErrors = [...new Set(errors)].filter(
      (message) =>
        !/Download the React DevTools/i.test(message) &&
        !/status of 404/i.test(message) &&
        !/ERR_NETWORK_ACCESS_DENIED/i.test(message)
    )

    if (
      metrics.hasErrorDisplay ||
      metrics.hasNoPreview ||
      metrics.storyIssues.length ||
      uniqueErrors.length
    ) {
      return {
        id: doc.id,
        title: doc.title,
        combo: `${combo.device}/${combo.theme}`,
        url,
        errors: uniqueErrors.slice(0, 4),
        metrics,
      }
    }

    return null
  } catch (error) {
    return {
      id: doc.id,
      title: doc.title,
      combo: `${combo.device}/${combo.theme}`,
      url,
      loadError: String(error).slice(0, 500),
    }
  } finally {
    page.off("console", onConsole)
  }
}

try {
  const indexPage = await browser.newPage()
  const response = await indexPage.goto(`${baseUrl}/index.json`, {
    waitUntil: "domcontentloaded",
    timeout: 15_000,
  })
  const index = JSON.parse(await response.text())
  await indexPage.close()

  const entries = Object.values(index.entries)
  const allDocs = entries
    .filter((entry) => entry.type === "docs" && /^(components|business|layouts)-/.test(entry.id))
    .filter((entry) => selectedGroup === "all" || entry.id.startsWith(`${selectedGroup}-`))
    .sort((a, b) => {
      const order = { components: 0, business: 1, layouts: 2 }
      const ag = a.id.split("-")[0]
      const bg = b.id.split("-")[0]
      return (order[ag] ?? 9) - (order[bg] ?? 9) || a.title.localeCompare(b.title)
    })

  const docs = allDocs.slice(offset, limit > 0 ? offset + limit : undefined)
  const combos = selectedViewports.flatMap((viewport) =>
    selectedThemes.map((theme) => ({ ...viewport, theme }))
  )
  const tasks = docs.flatMap((doc) => combos.map((combo) => ({ doc, combo })))
  const results = []
  let scanned = 0
  let cursor = 0

  const outputPath = `${outDir}/audit-${selectedGroup}-${selectedDevice}-${selectedTheme}-${offset}-${limit || "all"}.json`

  async function worker() {
    const page = await browser.newPage()
    try {
      while (cursor < tasks.length) {
        const task = tasks[cursor]
        cursor += 1
        const result = await scanOne(page, task.doc, task.combo)
        scanned += 1
        if (result) results.push(result)
        if (scanned % 20 === 0) {
          await flushReport({ docs, tasks, results, scanned, outputPath })
        }
      }
    } finally {
      await page.close()
    }
  }

  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, () => worker()))
  await flushReport({ docs, tasks, results, scanned, outputPath })

  const report = buildReport({ docs, tasks, results, scanned })
  console.log(
    JSON.stringify(
      {
        outputPath,
        scannedDocs: report.scannedDocs,
        scannedCombos: report.scannedCombos,
        issueDocs: report.issueDocs,
        issueCombos: report.issueCombos,
        top: report.summary.slice(0, 20),
      },
      null,
      2
    )
  )
} finally {
  await browser.close()
}
