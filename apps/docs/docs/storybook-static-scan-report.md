# Storybook Static Scan Report

## Summary

- **Total files scanned:** 84
  - `src/business/*.stories.tsx`: 24 files
  - `src/components/*.stories.tsx`: 57 files
  - `src/layout/*.stories.tsx`: 3 files
- **Total issues:** 18 (Critical: 0, High: 6, Medium: 7, Low: 5)
- **Date:** 2026-06-12
- **Tooling detected:** Storybook 10.4.3 + `@storybook/nextjs-vite`; Next.js 16.2.9; React 19.2.7; `@base-ui/react` 1.5.0
- **Path alias verified:** `tsconfig.json` resolves `@/*` to `./*` (project root), so `@/components/...` is correct and `@/src/components/...` would be wrong.

### Notes on scope

This is a static (text) scan. TypeScript `tsc` is configured to **not** run in Storybook
(`typescript.check = false` in `.storybook/main.ts`), so many type errors that would
otherwise be caught at build time can leak into the running story. The issues below are
those that will still misbehave at runtime (ignored props, dropped children, invalid
enum values) plus style/deprecation issues.

No `useFormAutosave`, `useAsync`, or `useDebounce` calls were found in any story file
(grep for `@/hooks/use-` in `src/**/*.stories.tsx` returns zero matches), so the
"required arguments" check is N/A for this codebase.

---

## Critical Issues (story will fail to render)

_No critical issues found._ No broken import paths, no missing named exports, and no
hard runtime errors were detected. The `@/` path-alias resolves correctly in every
case (84/84). All `import` statements in all 84 story files resolve to a real file
on disk.

---

## High Issues (likely runtime error or visibly wrong UI)

### H1. `FileUpload.stories.tsx` - `<FileUpload dropzone>` and ignored children

- **File:** `src/components/FileUpload.stories.tsx`
- **Lines:** 17-23, 28-35
- **Problem:** `FileUpload` (`components/ui/file-upload.tsx`) destructures
  `{ onDrop, accept, maxFiles, maxSize, disabled, className }` only. It does **not**
  accept a `dropzone` prop and does **not** render its `children`. The component
  always renders its built-in drop-zone UI.
  - The `Default` story wraps `<Button>...</Button>` inside `<FileUpload>` and expects
    the button to show. It will not - the FileUpload own drop zone replaces it.
  - The `Dropzone` story passes `dropzone` (silently ignored) and also wraps custom
    children that will not render.
- **Suggested fix:** Either extend the `FileUpload` component to accept and render
  `children` and a `dropzone` flag, or rewrite both stories to not pass children or
  the `dropzone` prop.

### H2. `FilterBuilder.stories.tsx` - `initialFilters` and invalid `operator` values

- **File:** `src/business/FilterBuilder.stories.tsx`
- **Lines:** 14-21, 28-34
- **Problem:** `FilterBuilder` (`components/business/filter-builder.tsx`) only
  destructures `{ fields, onChange, className }`. It has no `initialFilters` prop.
  - The `WithInitialFilters` story `initialFilters` array is silently dropped, so
    the UI starts with no filters regardless of what the story passes.
  - Even if it were wired up, the values are wrong: `operator: "equals"` and
    `operator: "greater_than"` are not in the component `defaultOperators` list
    (`eq | neq | contains | gt | lt | gte | lte`).
  - Also, the `fields` prop is typed as `{ key, label }[]`, so `type: "string" | "select" | "number" | "date"`
    and the nested `options` are unused (medium issue, see M5).
- **Suggested fix:** Add an `initialFilters` prop to `FilterBuilder` (and `defaultOperators`),
  or remove the `WithInitialFilters` story until the component supports it.

### H3. `ActivityFeed.stories.tsx` - wrong shape of `ActivityItem` in `activities`

- **File:** `src/business/ActivityFeed.stories.tsx`
- **Lines:** 14-21
- **Problem:** The component `ActivityItem` interface
  (`components/business/activity-feed.tsx`) is:
  ```ts
  interface ActivityItem {
    user: string
    action: string
    time: string
    avatarFallback?: string
    variant?: "default" | "success" | "warning" | "destructive" | "info"
  }
  ```
  The story passes:
  ```ts
  { id, user: { name: "John Doe" }, action, target, time, icon }
  ```
  - `user` should be a `string`, not `{ name }` (will render as `[object Object]`).
  - `target` and `icon` are not part of the type and are ignored.
  - `id` is not part of the type and is ignored.
  - `avatarFallback`/`variant` (which the component does use) are not provided.
- **Suggested fix:** Either change `ActivityItem` to match the story shape, or
  rewrite the story to use `{ user: "John Doe", action, time, avatarFallback: "JD" }`.

### H4. `FilterBuilder.stories.tsx` - `fields` items carry unrecognised shape

- **File:** `src/business/FilterBuilder.stories.tsx`
- **Lines:** 14-21
- **Problem:** Same component as H2. Story `fields` array uses
  `{ key, label, type: "string" | "select" | "number" | "date", options: [...] }`.
  The component reads only `f.key` and `f.label`; the `type` (used to switch the
  value input) and `options` (used to render a `<Select>` for `select` fields) are
  not consumed. As a result the date/number fields behave the same as plain text
  fields and the select-field options are dropped.
- **Suggested fix:** Extend the `fields` prop to `{ key, label, type, options? }`
  and use `type`/`options` in the component.

### H5. `Heavy.stories.tsx` - local `useValue` shadows React `useState`

- **File:** `src/business/Heavy.stories.tsx`
- **Lines:** 39, 47, 95-97
- **Problem:** `useValue` is declared at the bottom of the file (after the story
  that uses it) and simply wraps `useState`. It shadows React `useState` import,
  which is non-obvious and surprising. While JavaScript hoists function
  declarations so this technically works, it is a footgun (e.g. anyone moving the
  declaration into a sibling file will see `useState` as undefined).
- **Suggested fix:** Use `React.useState` directly, or define `useValue` at the
  top of the file (or import it from a shared hook).

### H6. `ConnectionStatus.stories.tsx` - `navigator.onLine` mutation in a decorator

- **File:** `src/business/ConnectionStatus.stories.tsx`
- **Lines:** 25-31
- **Problem:** The `Offline` story decorator mutates the global `navigator.onLine`
  via `Object.defineProperty` with `configurable: true` (good) but it is never
  restored. Because decorators run on every render, the `Offline` state is
  effectively leaked into the next story. Also, the `Toaster`/`sonner`-based
  `toast` variant will not work reliably in tests because it needs the actual
  browser event loop.
- **Suggested fix:** Wrap the mutation in a try/finally that restores
  `navigator.onLine`, or use Storybook `parameters` to drive the offline state
  via a `viewMode`/mock layer instead.

---

## Medium Issues (warnings, possible bugs)

### M1. `ScrollArea.stories.tsx` - `ScrollBar` imported at the bottom of the file

- **File:** `src/components/ScrollArea.stories.tsx`
- **Line:** 48
- **Problem:** The `import { ScrollBar } from "@/components/ui/scroll-area"` is
  placed at the **end** of the file (after the `Horizontal` story that uses it on
  line 43). ES module hoisting makes this work, but it is a strong style red flag
  (linter rule `import/first` will flag this in most setups).
- **Suggested fix:** Move the import to the top of the file next to the other
  `scroll-area` import.

### M2. `FilterBuilder.stories.tsx` - `Field.type` literal-narrowing via `as const`

- **File:** `src/business/FilterBuilder.stories.tsx`
- **Lines:** 14-21
- **Problem:** Because the `Field` type only declares `{ key, label }`, the story
  resorts to `as const` to make `type: "string"` (etc.) type-check. The runtime
  component then has no way to consume that information (see H4). The `as const`
  hides the type-system mismatch.
- **Suggested fix:** Update the `Field` interface to include `type` (and `options`)
  so the cast can be dropped.

### M3. `Pages.stories.tsx` - unused import `initials`

- **File:** `src/business/Pages.stories.tsx`
- **Line:** 13
- **Problem:** `import { initials } from "@/lib/format"` is never used in the
  file (no `initials(...)` call anywhere). The export exists in
  `lib/format.ts:113`, so the import resolves fine, but the dead import adds
  noise and triggers `no-unused-vars` in strict ESLint configs.
- **Suggested fix:** Remove the import.

### M4. `Stepper.stories.tsx` - `activeStep={4}` is past the last step in `AllSteps`

- **File:** `src/components/Stepper.stories.tsx`
- **Line:** 111
- **Problem:** The last block of the `AllSteps` story uses `activeStep={4}` for a
  4-item stepper. Index 4 is out of bounds (valid: 0-3). Behaviourally the
  component treats this as "all complete" (every index satisfies `i < 4`), which
  is the intent, but a future change to clamp or 404-on-overshoot would break
  the story silently. Use `activeStep={3}` (the last index) to be safe.
- **Suggested fix:** Use `activeStep={3}` or document the intent in a comment.

### M5. `Microinteractions.stories.tsx` - `<DensitySwitcher open={false} />` / `<DensitySwitcher open />` without `density`/`onChange`

- **File:** `src/business/Microinteractions.stories.tsx`
- **Lines:** 126-127
- **Problem:** The story renders two `DensitySwitcher` instances with no
  `density` and no `onChange`. The component is a controlled-or-uncontrolled
  switch; rendering it uncontrolled means the click does not propagate, so
  clicking the toggles does nothing. Compare with the `DensityExample` story a
  few lines above which uses the controlled pattern correctly.
- **Suggested fix:** Either remove the `AllVariants` "Density Switcher" block
  (and rely on `DensityExample`), or wire up `onChange` to local state.

### M6. Multiple business story files - no `type Story` alias

- **Files (9):**
  - `src/business/Charts.stories.tsx`
  - `src/business/Calendar.stories.tsx`
  - `src/business/Collaboration.stories.tsx`
  - `src/business/Media.stories.tsx`
  - `src/business/Heavy.stories.tsx`
  - `src/business/Microinteractions.stories.tsx`
  - `src/business/MobileComponents.stories.tsx`
  - `src/business/Navigation.stories.tsx`
  - `src/business/Pages.stories.tsx`
- **Problem:** These stories use `export const X: StoryObj = ...` directly without
  declaring `type Story = StoryObj<typeof meta>`. Works fine, but every other
  story in the codebase uses the `Story` alias - this is an inconsistency that
  makes refactors harder.
- **Suggested fix:** Add `type Story = StoryObj<typeof meta>` (or
  `type Story = StoryObj` for files with no `component`) and use `Story` in each
  export.

### M7. `Microinteractions.stories.tsx` - `<CoachMark target={ref}>` receives a `state` whose initial value is `null`

- **File:** `src/business/Microinteractions.stories.tsx`
- **Lines:** 65, 144
- **Problem:** `useState<HTMLElement | null>(null)` is used to capture a `ref`
  on a Button. The `<CoachMark target={ref}>` is then passed `null` on the
  first render. The component should handle `null` gracefully, but in this
  project `CoachMark` does `target.getBoundingClientRect()` and will throw if
  it is ever called with `null`. The story works only because the user has to
  click the button to flip `open` to true, which only happens after `setRef` has
  set a non-null ref. This is fragile.
- **Suggested fix:** Render the `CoachMark` only when `ref` is non-null
  (early return), or use a `useRef` + `useEffect` to capture.

---

## Low Issues (style, deprecation)

### L1. `ScrollArea.stories.tsx` - duplicate import (see M1)

Already covered in M1. Listed here for completeness under style.

### L2. `Pages.stories.tsx` - `alert()` in handlers

- **File:** `src/business/Pages.stories.tsx`
- **Lines:** 145, 204, 220, 229
- **Problem:** Side-effect calls to `alert(...)` in `onSubmit` handlers will
  block the JS thread in Storybook canvas and pollute automated tests. Most
  other stories in the same file also use `alert`, so this is consistent - but
  the whole `Pages` story is a candidate for switching to `console.log` or
  toasts for cleaner dev experience.
- **Suggested fix:** Replace `alert(...)` with `console.info(...)` or
  `toast(...)` (sonner is already imported elsewhere).

### L3. `Microinteractions.stories.tsx` - triple-ternary callback logic

- **File:** `src/business/Microinteractions.stories.tsx`
- **Lines:** 93-95
- **Problem:** The three switches are wired with double-ternary callback logic
  (`onChange={(o) => o ? setD("compact") : setD("default")}`) that is
  unnecessarily hard to read. Style-only.
- **Suggested fix:** Use a single switch on density and an event handler that
  maps back to a string.

### L4. `Heavy.stories.tsx` - `function useValue` declaration hoisted above use (see H5)

The local `useValue` is also a style concern; see H5.

### L5. Multiple stories - `import type { Meta, StoryObj }` vs `import { Meta, StoryObj }`

Across the 84 files the split is ~70/30 in favour of `import type` (the
recommended pattern). The minority are not wrong, just inconsistent. No fix
required.

---

## Storybook 11 deprecation note

The user-mentioned **Storybook 11 deprecation warning** about `ariaLabel` on
`Button` and `PopoverProvider` is **not applicable** to this project:

- The codebase is on Storybook **10.4.3** (`package.json` line 100).
- The local `Button` component (`components/ui/button.tsx`) does **not** require
  an `ariaLabel` prop; it is a thin wrapper around `@base-ui/react` `Button`,
  which accepts the standard `aria-label` HTML attribute (the storybook `IconOnly`
  story uses `aria-label` correctly).
- There is no `PopoverProvider` exported in the codebase. `Popover` is a single
  export from `components/ui/popover.tsx` and its trigger uses
  `render={<Button variant="outline" />}` (the recommended base-ui pattern).

If/when the project upgrades to Storybook 11, re-run this scan and re-check
`Button`, `Popover`, and any new base-ui deprecations.

---

## Per-file Status

| File | Status | Issues |
|------|--------|--------|
| src/business/ActivityFeed.stories.tsx | WARN | H3 (item shape mismatch) |
| src/business/AdvancedDataTable.stories.tsx | OK | - |
| src/business/Calendar.stories.tsx | OK | M6 (no `type Story`) |
| src/business/Charts.stories.tsx | OK | M6 (no `type Story`) |
| src/business/Collaboration.stories.tsx | OK | M6 (no `type Story`) |
| src/business/ConnectionStatus.stories.tsx | WARN | H6 (navigator mutation) |
| src/business/DataTable.stories.tsx | OK | - |
| src/business/EmptyState.stories.tsx | OK | - |
| src/business/FileUploadManager.stories.tsx | OK | - |
| src/business/FilterBuilder.stories.tsx | FAIL | H2, H4, M2 |
| src/business/Form.stories.tsx | OK | - |
| src/business/FormField.stories.tsx | OK | - |
| src/business/FormWizard.stories.tsx | OK | - |
| src/business/Heavy.stories.tsx | WARN | H5, M6, L4 |
| src/business/KanbanBoard.stories.tsx | OK | - |
| src/business/KPICard.stories.tsx | OK | - |
| src/business/Media.stories.tsx | OK | M6 (no `type Story`) |
| src/business/Microinteractions.stories.tsx | WARN | M5, M6, M7, L3 |
| src/business/MobileComponents.stories.tsx | OK | M6 (no `type Story`) |
| src/business/Navigation.stories.tsx | OK | M6 (no `type Story`) |
| src/business/PageHeader.stories.tsx | OK | - |
| src/business/Pages.stories.tsx | WARN | M3, M6, L2 |
| src/business/StatCard.stories.tsx | OK | - |
| src/business/StatusTag.stories.tsx | OK | - |
| src/components/Accordion.stories.tsx | OK | - |
| src/components/Alert.stories.tsx | OK | - |
| src/components/AlertDialog.stories.tsx | OK | - |
| src/components/Avatar.stories.tsx | OK | - |
| src/components/Badge.stories.tsx | OK | - |
| src/components/Breadcrumb.stories.tsx | OK | - |
| src/components/BrowseInput.stories.tsx | OK | - |
| src/components/Button.stories.tsx | OK | - |
| src/components/Calendar.stories.tsx | OK | - |
| src/components/Card.stories.tsx | OK | - |
| src/components/Checkbox.stories.tsx | OK | - |
| src/components/Collapsible.stories.tsx | OK | - |
| src/components/ColorPicker.stories.tsx | OK | - |
| src/components/Command.stories.tsx | OK | - |
| src/components/DepartmentBrowse.stories.tsx | OK | - |
| src/components/Dialog.stories.tsx | OK | - |
| src/components/Drawer.stories.tsx | OK | - |
| src/components/DropdownMenu.stories.tsx | OK | - |
| src/components/FileUpload.stories.tsx | FAIL | H1 (children + `dropzone` ignored) |
| src/components/FormGrid.stories.tsx | OK | - |
| src/components/FormList.stories.tsx | OK | - |
| src/components/FormSection.stories.tsx | OK | - |
| src/components/GridLayout.stories.tsx | OK | - |
| src/components/HoverCard.stories.tsx | OK | - |
| src/components/Input.stories.tsx | OK | - |
| src/components/InputGroup.stories.tsx | OK | - |
| src/components/KPIPanel.stories.tsx | OK | - |
| src/components/Label.stories.tsx | OK | - |
| src/components/NavigationMenu.stories.tsx | OK | - |
| src/components/PageContainer.stories.tsx | OK | - |
| src/components/Pagination.stories.tsx | OK | - |
| src/components/Popover.stories.tsx | OK | - |
| src/components/Progress.stories.tsx | OK | - |
| src/components/RadioGroup.stories.tsx | OK | - |
| src/components/ScrollArea.stories.tsx | WARN | M1, L1 |
| src/components/Select.stories.tsx | OK | - |
| src/components/Separator.stories.tsx | OK | - |
| src/components/Sheet.stories.tsx | OK | - |
| src/components/Sidebar.stories.tsx | OK | - |
| src/components/Skeleton.stories.tsx | OK | - |
| src/components/SplitPane.stories.tsx | OK | - |
| src/components/Stepper.stories.tsx | OK | M4 |
| src/components/Switch.stories.tsx | OK | - |
| src/components/Table.stories.tsx | OK | - |
| src/components/Tabs.stories.tsx | OK | - |
| src/components/TagsInput.stories.tsx | OK | - |
| src/components/Textarea.stories.tsx | OK | - |
| src/components/Timeline.stories.tsx | OK | - |
| src/components/Toaster.stories.tsx | OK | - |
| src/components/Toggle.stories.tsx | OK | - |
| src/components/ToggleGroup.stories.tsx | OK | - |
| src/components/Tooltip.stories.tsx | OK | - |
| src/components/TreeSelect.stories.tsx | OK | - |
| src/components/TreeView.stories.tsx | OK | - |
| src/components/UserBrowse.stories.tsx | OK | - |
| src/components/VirtualList.stories.tsx | OK | - |
| src/components/VirtualTable.stories.tsx | OK | - |
| src/layout/AuthLayout.stories.tsx | OK | - |
| src/layout/DashboardLayout.stories.tsx | OK | - |
| src/layout/DetailLayout.stories.tsx | OK | - |

**Legend:** `OK` = no issues found, `WARN` = non-blocking issues, `FAIL` = at
least one High issue that affects rendered output.

---

## Appendix - Verification methodology

1. Enumerated all 84 story files via `Get-ChildItem -Filter *.stories.tsx`
   (24 + 57 + 3).
2. Read every story file end-to-end and recorded its imports, default export,
   named exports, and every JSX prop.
3. For each `import ... from "@/..."` path, resolved the file on disk
   (`@/*` -> project root, per `tsconfig.json`).
4. For each named import, opened the target file and grep`d for
   `^export (function|const|class|interface|type)` and the
   `export { ... }` block to confirm the symbol exists.
5. Cross-referenced every JSX prop against the target component
   destructured `Props` interface (`grep` for `interface` / `type ... Props`).
6. Searched for Storybook 11 deprecation patterns (`ariaLabel`, `PopoverProvider`)
   - none found applicable (project is on Storybook 10.4.3).
7. Searched for `@/hooks/...` imports - none found.