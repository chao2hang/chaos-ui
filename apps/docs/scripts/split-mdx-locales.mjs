#!/usr/bin/env node
/**
 * Split bilingual MDX content files into `<slug>.zh.mdx` and `<slug>.en.mdx`.
 *
 * Heuristics (conservative — when in doubt, the line goes to BOTH files so
 * nothing is lost):
 *
 *   1.  Imports / frontmatter / JSX (`<CodeBlock ...>`, `</X>`)  → shared
 *   2.  Lines inside fenced ``` or backtick template literals     → shared
 *   3.  `## 何时使用 / When to Use`                               → split on ` / `
 *       (only splits when the part before ` / ` contains CJK)
 *   4.  `# CommandPalette 命令面板`                               → ASCII words → en,
 *       CJK words → zh
 *   5.  Table cells with `中文<br/>English`                       → split per cell
 *   6.  Body paragraph pairs: a CJK-only line followed by an
 *       ASCII-only line                                          → zh / en
 *   7.  `> 业务组件 / Domain-specific...`                         → split on ` / `
 *   8.  Single paragraph with ` / ` where left side is CJK       → split
 *
 * Usage:
 *   node scripts/split-mdx-locales.mjs                 # write all
 *   node scripts/split-mdx-locales.mjs --dry-run       # print preview, no writes
 *   node scripts/split-mdx-locales.mjs --sample 10     # only first 10 files
 *   node scripts/split-mdx-locales.mjs --file Business/activity-feed
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = join(__dirname, "..", "@", "content");

// ---------- CLI flags ----------
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sampleIdx = args.indexOf("--sample");
const sampleCount = sampleIdx >= 0 ? Number(args[sampleIdx + 1]) || 0 : 0;
const fileIdx = args.indexOf("--file");
const singleFile = fileIdx >= 0 ? args[fileIdx + 1] : null;

// ---------- Helpers ----------
const CJK_RE = /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/;
function hasCjk(s) {
  return CJK_RE.test(s);
}

/** Try to split "中文 / English" at the first " / " where the LHS has CJK. */
function splitSlash(line) {
  const idx = line.indexOf(" / ");
  if (idx > 0 && hasCjk(line.slice(0, idx))) {
    return [line.slice(0, idx).trimEnd(), line.slice(idx + 3).trimStart()];
  }
  return null;
}

/**
 * Like splitSlash, but preserves markdown emphasis markers (**, *, __) that
 * wrap the whole line. `**变体 / Variant**` → [`**变体**`, `**Variant**`].
 * If the two halves are pure-ASCII AND identical (e.g. `**columns / columns**`
 * — often the variant name), return the same bold string for both files so
 * the label isn't dropped from ZH by ratio routing.
 */
function splitSlashPreservingBold(line) {
  const m = line.match(/^(\*\*?|__)(.+)\1\s*$/);
  if (m) {
    const marker = m[1];
    const inner = m[2];
    const sp = splitSlash(inner);
    if (sp) {
      return [`${marker}${sp[0]}${marker}`, `${marker}${sp[1]}${marker}`];
    }
    // Handle `**foo / foo**` (both sides ASCII, no CJK) — keep the label in both.
    const idx = inner.indexOf(" / ");
    if (idx > 0 && !hasCjk(inner)) {
      const lhs = inner.slice(0, idx).trim();
      const rhs = inner.slice(idx + 3).trim();
      if (lhs === rhs && lhs.length > 0) {
        const both = `${marker}${lhs}${marker}`;
        return [both, both];
      }
    }
  }
  return null;
}

/** Try to split "中文<br/>English" inside a table cell. */
function splitBr(s) {
  const m = s.match(/^(.*?)\s*<br\s*\/?\s*>\s*(.*)$/i);
  if (m && hasCjk(m[1])) {
    return [m[1].trim(), m[2].trim()];
  }
  return null;
}

/**
 * Decide where a single line should be routed based on language dominance.
 * Returns "zh", "en", or "both".
 *
 * Strips inline code and markdown links first, then compares CJK char count
 * vs ASCII letter count. A line like `**无障碍**: 组件遵循 WAI-ARIA 最佳实践。`
 * is predominantly Chinese (10 CJK vs 7 ASCII) → "zh". A line like
 * `Use when you need an activity feed.` → "en".
 */
function routeLine(line) {
  const stripped = line
    .replace(/`[^`]+`/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "");
  const cjkCount = (
    stripped.match(/[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/g) || []
  ).length;
  const asciiCount = (stripped.match(/[A-Za-z]/g) || []).length;
  if (cjkCount === 0 && asciiCount === 0) return "both";
  if (cjkCount === 0) return "en";
  if (asciiCount === 0) return "zh";
  // Genuinely bilingual (both sides substantial) → keep in both files.
  // Threshold: if the *minority* language has >= 6 chars, it's meaningful
  // enough that dropping it would lose information.
  const minority = Math.min(cjkCount, asciiCount);
  if (minority >= 6) return "both";
  return cjkCount >= asciiCount ? "zh" : "en";
}

/**
 * Split `# CommandPalette 命令面板` style titles where the same heading
 * contains a PascalCase identifier + a Chinese name.
 *   zh → keeps the full "Identifier 中文名" form (matches source-code style)
 *   en → just the ASCII identifier
 * Returns [zhTitle, enTitle] or null.
 */
function splitTitleWords(title) {
  // Only treat as splittable when there's at least one CJK word AND
  // at least one ASCII word (otherwise it's already one language).
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length < 2) return null;
  const cjkWords = words.filter((w) => hasCjk(w));
  const asciiWords = words.filter((w) => !hasCjk(w));
  if (cjkWords.length === 0 || asciiWords.length === 0) return null;
  // ZH keeps the original "ASCII 中文" ordering so that source-code identifiers
  // stay visible to Chinese readers. EN gets just the ASCII identifier(s).
  return [title, asciiWords.join(" ")];
}

/**
 * Walk lines and produce two output buffers (zh + en).
 * Returns { zh: string[], en: string[], shared: string[] } where `shared`
 * is what gets prepended to both.
 */
function splitMdx(src) {
  const lines = src.split(/\r?\n/);
  const zh = [];
  const en = [];

  // Track fenced code blocks and backtick template literals so we don't
  // accidentally split inside them.
  let inFence = false; // ``` fenced block
  let fenceMarker = null;
  // Track backtick template literals that span multiple lines (e.g.
  // `<CodeBlock code={`...multiline...`} />`). Toggled on any un-escaped ` we
  // encounter outside a fenced code block.
  let inTemplate = false;
  // Track when we're inside a multi-line JSX element (opened `<Foo ...` on
  // one line and not yet closed with `/>` or `</Foo>`).
  let jsxDepth = 0;

  function countUnescapedBackticks(s) {
    let n = 0;
    for (let k = 0; k < s.length; k++) {
      if (s[k] === "`" && s[k - 1] !== "\\") n++;
    }
    return n;
  }

  // Pending paragraph block: consecutive non-blank lines outside of any
  // fence / JSX. We buffer them, then route the block as a unit so we can
  // detect zh-line / en-line pairs.
  let para = [];

  function flushPara() {
    if (para.length === 0) return;
    // Split the buffered block into sub-paragraphs (separated by blank lines),
    // preserving the blank lines between them so we can emit them back into
    // both files when nothing routes specially.
    const groups = []; // each: { lines: string[], blanksAfter: number }
    let cur = { lines: [], blanksAfter: 0 };
    for (const ln of para) {
      if (ln === "") {
        // A blank inside a paragraph buffer terminates the current group.
        if (cur.lines.length > 0) {
          cur.blanksAfter++;
          // Peek: if there's more content later, close this group and start fresh
          // on the next non-blank. We handle that by pushing when a non-blank arrives.
        }
      } else {
        if (cur.blanksAfter > 0 && cur.lines.length > 0) {
          // close current group, start new one
          groups.push(cur);
          cur = { lines: [], blanksAfter: 0 };
        }
        cur.lines.push(ln);
      }
    }
    if (cur.lines.length > 0) groups.push(cur);
    para = [];

    // Route each group. Interesting cases:
    //  (a) group has 2 lines, first CJK, second ASCII → zh/en pair
    //  (b) two consecutive groups, each 1 line, CJK then ASCII → zh/en pair
    let i = 0;
    while (i < groups.length) {
      const g = groups[i];

      // Case (a): adjacent CJK+ASCII lines in same group
      if (
        g.lines.length === 2 &&
        hasCjk(g.lines[0]) &&
        !hasCjk(g.lines[1])
      ) {
        zh.push(g.lines[0]);
        en.push(g.lines[1]);
        for (let k = 0; k < g.blanksAfter; k++) {
          zh.push("");
          en.push("");
        }
        i++;
        continue;
      }

      // Case (b): current group is single CJK line, next group is single ASCII line
      if (
        i + 1 < groups.length &&
        g.lines.length === 1 &&
        groups[i + 1].lines.length === 1 &&
        hasCjk(g.lines[0]) &&
        !hasCjk(groups[i + 1].lines[0])
      ) {
        zh.push(g.lines[0]);
        en.push(groups[i + 1].lines[0]);
        // emit blank spacing between them: the "blanksAfter" of the FIRST group
        const blanks = g.blanksAfter || 1;
        for (let k = 0; k < blanks; k++) {
          zh.push("");
          en.push("");
        }
        // plus any trailing blanks of the second group
        for (let k = 0; k < groups[i + 1].blanksAfter; k++) {
          zh.push("");
          en.push("");
        }
        i += 2;
        continue;
      }

      // Default per-line routing within this group.
      for (const ln of g.lines) {
        const bp = splitSlashPreservingBold(ln);
        if (bp) {
          zh.push(bp[0]);
          en.push(bp[1]);
          continue;
        }
        const sp = splitSlash(ln);
        if (sp) {
          zh.push(sp[0]);
          en.push(sp[1]);
          continue;
        }
        // Route lone paragraph lines by CJK/ASCII ratio.
        const r = routeLine(ln);
        if (r === "zh") zh.push(ln);
        else if (r === "en") en.push(ln);
        else { zh.push(ln); en.push(ln); }
      }
      for (let k = 0; k < g.blanksAfter; k++) {
        zh.push("");
        en.push("");
      }
      i++;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // ----- inside a multi-line template literal or JSX element → shared -----
    // These lines can contain arbitrary text (including CJK inside a code
    // sample) that must NOT be language-split.
    if (inTemplate || jsxDepth > 0) {
      zh.push(line);
      en.push(line);
      // Track template toggle
      if (inTemplate) {
        const bt = countUnescapedBackticks(line);
        if (bt % 2 === 1) inTemplate = false;
      } else {
        // We're in a JSX element; a lone ` might open a template on this line.
        const bt = countUnescapedBackticks(line);
        if (bt % 2 === 1) inTemplate = true;
      }
      // Track JSX close on this line (self-close /> or matching </Foo>)
      if (jsxDepth > 0 && !inTemplate) {
        if (/\/>\s*$/.test(line) || /<\/[A-Za-z][^>]*>\s*$/.test(line)) {
          jsxDepth = Math.max(0, jsxDepth - 1);
        }
      }
      continue;
    }

    // ----- fenced code block detection -----
    const fenceMatch = line.match(/^(\s*)(```+|~~~+)/);
    if (fenceMatch) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fenceMatch[2];
        flushPara();
        zh.push(line);
        en.push(line);
        continue;
      } else if (line.trim().startsWith(fenceMarker[0].repeat(3))) {
        inFence = false;
        fenceMarker = null;
        zh.push(line);
        en.push(line);
        continue;
      }
    }
    if (inFence) {
      zh.push(line);
      en.push(line);
      continue;
    }

    // ----- blank line -----
    if (line.trim() === "") {
      // If we're mid-paragraph, buffer the blank so flushPara can decide
      // whether it separates a zh-line from its en-line partner. Only flush
      // when the NEXT non-blank line is structural (heading, list, JSX,
      // table, blockquote, fence, import) — that's handled by falling into
      // those branches below, which each call flushPara() themselves. Here
      // we just accumulate.
      if (para.length > 0) {
        para.push("");
      } else {
        zh.push("");
        en.push("");
      }
      continue;
    }

    // ----- imports / frontmatter -----
    if (/^import\s+/.test(line) || /^export\s+/.test(line)) {
      flushPara();
      zh.push(line);
      en.push(line);
      continue;
    }

    // ----- JSX lines (start with < or </) -----
    if (/^\s*<\/?[A-Z]/.test(line) || /^\s*<[a-z]+[\s/>]/.test(line)) {
      flushPara();
      zh.push(line);
      en.push(line);
      // If this JSX element isn't closed on the same line, we're inside a
      // multi-line element — track depth so body lines stay shared.
      const opensBacktick = countUnescapedBackticks(line) % 2 === 1;
      const closesSelf = /\/>\s*$/.test(line);
      const closesTag = /<\/[A-Za-z][^>]*>\s*$/.test(line);
      if (opensBacktick) {
        inTemplate = true;
        // If the tag also isn't closed, we'll still be in JSX after the
        // template closes — but that's rare. Leave jsxDepth at 0; the
        // template check alone usually covers it.
        if (!closesSelf && !closesTag) jsxDepth = 1;
      } else if (!closesSelf && !closesTag) {
        jsxDepth = 1;
      }
      continue;
    }

    // ----- headings -----
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushPara();
      const hashes = heading[1];
      const title = heading[2];
      const sp = splitSlash(title);
      if (sp) {
        zh.push(`${hashes} ${sp[0]}`);
        en.push(`${hashes} ${sp[1]}`);
        continue;
      }
      const tw = splitTitleWords(title);
      if (tw) {
        zh.push(`${hashes} ${tw[0]}`);
        en.push(`${hashes} ${tw[1]}`);
        continue;
      }
      // can't split — keep in both
      zh.push(line);
      en.push(line);
      continue;
    }

    // ----- blockquote lines -----
    if (/^>\s?/.test(line)) {
      flushPara();
      const body = line.replace(/^>\s?/, "");
      const sp = splitSlash(body);
      if (sp) {
        zh.push(`> ${sp[0]}`);
        en.push(`> ${sp[1]}`);
        continue;
      }
      // Language-aware routing via CJK/ASCII ratio.
      const r = routeLine(body);
      if (r === "zh") zh.push(line);
      else if (r === "en") en.push(line);
      else { zh.push(line); en.push(line); }
      continue;
    }

    // ----- table rows -----
    if (/^\s*\|/.test(line)) {
      flushPara();
      // Skip the alignment row `|---|---|`
      if (/^\s*\|?[\s:|-]+\|?\s*$/.test(line)) {
        zh.push(line);
        en.push(line);
        continue;
      }
      // Split each cell on `<br/>`. Guard escaped pipes `\|` (used inside
      // TypeScript union types like `"png" \| "svg"`) so they aren't treated
      // as cell separators — replace with a sentinel, split, then restore.
      const PIPE_SENTINEL = "\u0000PIPE\u0000";
      const cells = line
        .replace(/\\\|/g, PIPE_SENTINEL)
        .split("|")
        .map((c) => c.replace(new RegExp(PIPE_SENTINEL, "g"), "\\|"));
      const zhCells = [];
      const enCells = [];
      let didSplit = false;
      for (const cell of cells) {
        if (cell === "" || cell === undefined) {
          zhCells.push(cell);
          enCells.push(cell);
          continue;
        }
        const sp = splitBr(cell);
        if (sp) {
          zhCells.push(sp[0]);
          enCells.push(sp[1]);
          didSplit = true;
        } else {
          // Try "中文 / English" within the cell
          const ss = splitSlash(cell);
          if (ss) {
            zhCells.push(ss[0]);
            enCells.push(ss[1]);
            didSplit = true;
          } else {
            zhCells.push(cell);
            enCells.push(cell);
          }
        }
      }
      // If we split any cell, route them differently. Otherwise shared.
      if (didSplit) {
        // Normalize cell spacing: `|cell|` → `| cell |` so the rendered
        // table doesn't lose its padding. Empty/alignment-only cells pass through.
        const norm = (arr) =>
          arr
            .map((c) =>
              c === "" || c === undefined
                ? ""
                : ` ${c.trim()} `
            )
            .join("|");
        zh.push(norm(zhCells));
        en.push(norm(enCells));
      } else {
        zh.push(line);
        en.push(line);
      }
      continue;
    }

    // ----- list items -----
    if (/^\s*[-*+]\s+/.test(line)) {
      flushPara();
      const body = line.replace(/^(\s*[-*+]\s+)/, "");
      const sp = splitSlash(body);
      if (sp) {
        const prefix = line.match(/^(\s*[-*+]\s+)/)[1];
        zh.push(`${prefix}${sp[0]}`);
        en.push(`${prefix}${sp[1]}`);
        continue;
      }
      // Language-aware routing via CJK/ASCII ratio.
      const r = routeLine(body);
      if (r === "zh") zh.push(line);
      else if (r === "en") en.push(line);
      else { zh.push(line); en.push(line); }
      continue;
    }

    // ----- ordinary paragraph line: buffer for pair detection -----
    para.push(line);
  }

  flushPara();
  return { zh, en };
}

// ---------- File walker ----------
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      // skip already-split locale files
      if (entry.name.endsWith(".zh.mdx") || entry.name.endsWith(".en.mdx")) continue;
      out.push(full);
    }
  }
  return out;
}

async function processFile(absPath) {
  const src = await readFile(absPath, "utf8");
  const { zh, en } = splitMdx(src);
  const zhOut = zh.join("\n") + "\n";
  const enOut = en.join("\n") + "\n";

  const base = absPath.replace(/\.mdx$/, "");
  const zhPath = `${base}.zh.mdx`;
  const enPath = `${base}.en.mdx`;

  if (dryRun) {
    console.log(`\n=== ${absPath} ===`);
    console.log("--- ZH ---");
    console.log(zhOut);
    console.log("--- EN ---");
    console.log(enOut);
  } else {
    await writeFile(zhPath, zhOut, "utf8");
    await writeFile(enPath, enOut, "utf8");
    console.log(`wrote ${zhPath}`);
    console.log(`wrote ${enPath}`);
  }
}

async function main() {
  let files;
  if (singleFile) {
    // accept with or without extension / category
    const candidate = singleFile.endsWith(".mdx") ? singleFile : `${singleFile}.mdx`;
    const abs = join(CONTENT_ROOT, candidate);
    files = [abs];
  } else {
    files = await walk(CONTENT_ROOT);
  }
  if (sampleCount > 0) files = files.slice(0, sampleCount);

  console.log(`processing ${files.length} file(s)${dryRun ? " [dry-run]" : ""}…`);
  for (const f of files) {
    try {
      await processFile(f);
    } catch (err) {
      console.error(`failed: ${f}:`, err);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
