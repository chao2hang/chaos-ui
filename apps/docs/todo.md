# Docs App — MDX Split Follow-ups

This file tracks known residual issues from the automated split of 331 bilingual
MDX files into `.zh.mdx` / `.en.mdx` variants via `scripts/split-mdx-locales.mjs`.
Everything listed here is a **cosmetic / manual polish** item — the split is
lossless (every source line is preserved somewhere) and the app builds & renders.

## Already resolved

- ✅ **GFM tables not rendering** — root cause was missing `remark-gfm` plugin.
  Fixed by adding `remarkPlugins: ["remark-gfm"]` to `createMDX()` in
  `next.config.ts`. Tables now compile to `<table>` / `<th>` / `<td>`.
- ✅ **Escaped pipes `\|` in table cells** — TS union types like
  `React.RefObject<HTMLElement \| null>` were being split by `line.split("|")`,
  breaking MDX compilation. Fixed with sentinel-based guarding in the split
  script. Re-ran full 331-file batch.
- ✅ **Symmetric ASCII slash labels** (`**columns / columns**`) — were dropped
  from ZH file. Fixed: when both halves are pure-ASCII and identical, the label
  is kept in both files.
- ✅ **Bold markers broken by slash split** (`**变体 / Variant**`) — fixed with
  `splitSlashPreservingBold()` that re-wraps each half with the emphasis marker.
- ✅ **Multi-line CodeBlock templates** — lines inside `<CodeBlock code={\`...\`}>`
  were being language-routed. Fixed with backtick + JSX-depth tracking.
- ✅ **Shiki server-side highlighting** — `CodeBlock` is now an async server
  component using `codeToHtml()` with dual-theme (github-light + github-dark).
- ✅ **i18n locale switching** — cookie-based locale via `LocaleProvider` +
  `router.refresh()`, applied to all pages (home, components, detail, card,
  search). Detail page `loadMdx()` loads `.<locale>.mdx` with fallback.

## Known residual patterns (manual polish, optional)

1. **Table header cells that were only Chinese in the source.**
   e.g. `| Variant | Description | 默认 |` still shows `默认` in the `.en.mdx`
   file because the source had no English counterpart for that column.
   → Manual fix: edit affected `.en.mdx` files to translate `默认` → `Default`.

2. **Bilingual list items are kept in _both_ files.**
   Lines like `- **Base UI**: 基于 \`@base-ui/react\` 无头…` include both English
term and Chinese explanation. The routing threshold (`min(cjk,ascii) >= 6`)
   deliberately preserves them in both files so information isn't dropped.
   → Manual fix (optional): rewrite each note in each locale.

3. **Pure-Chinese blockquotes tail (`> 📘 完整交互式示例…`) live only in `.zh.mdx`.**
   Because the source has no English translation of the tip.
   → Manual fix (optional): add an EN blockquote in each `.en.mdx`.

4. **Original `.mdx` files are still present** as a safety net (route falls
   back to them if a locale variant is missing). Safe to delete once you're
   happy with the split — `loadMdx()` will simply return `null` and show the
   not-found fallback if a locale file is ever missing.

## Verification snapshot

- `npx eslint` on 17 edited/created files — **0 errors, 0 warnings** ✅
- `npx tsc --noEmit` — 0 errors in edited files (pre-existing errors only in
  `@/components/business/*` and Storybook stories, unrelated) ✅
- Dev server `curl` checks:
  - `/components/General/button` (zh) → `<table>` elements present, `按钮` in body ✅
  - `/components/General/button` (en) → `<table>` elements present, Shiki `shiki-wrap` × 4 ✅
  - `/components/Business/charts-shared-chart-export` (en) → renders without MDX error, `React.RefObject` preserved ✅
- 331 zh files + 331 en files generated, matches source count ✅
