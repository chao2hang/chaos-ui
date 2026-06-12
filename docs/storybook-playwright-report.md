# Storybook Playwright 全量扫描报告

**扫描时间**: 2026-06-12
**目标**: 修复 `Form.stories.tsx` 导入后，验证所有 stories 无运行时错误
**工具**: Playwright (chromium, headless) + Node.js
**覆盖范围**: 419 stories（来自 `http://localhost:6006/index.json`）
**关键修复**: `src/business/Form.stories.tsx` 导入路径（`@/components/business/form-autosave-indicator` → `@/components/business/form`）

---

## TL;DR — 关键结论

| 指标 | 值 |
|------|----|
| 扫描总数 | 419 stories |
| 完全干净（0 errors / 0 warnings） | 392 (93.6%) |
| 有 console error 的 stories | 27 (6.4%) |
| 用户报告的页面 (`business-form--autosave-states`) | **已修复 ✓ 0 errors** |

**修复后的目标验证**：
```
URL:  http://localhost:6006/?path=/story/business-form--autosave-states
Page Title: "Business / Form - Autosave States ⋅ Storybook"
Console: 0 errors, 2 warnings（仅 Storybook UI 自身的 ariaLabel 提示，与该 story 无关）
```

---

## 错误分类汇总

| 类别 | 影响 stories | 严重度 | 性质 |
|------|------|------|------|
| `base-ui-native-button` | 15 | High | Base UI 库警告：DialogTrigger 内部应使用原生 `<button>` |
| `hydration-nested-button` | 7 | High | React hydration 错误：`<button>` 嵌套在 `<button>` 内 |
| `react-dom-unknown-prop` | 7 | Medium | React 不识别某 DOM 属性（通常是 `asChild`） |
| `non-bool-collapsible` | 3 | Low | DOM 收到非布尔 `collapsible={true}` |
| `other`（Storybook manager 事件） | 1 | Low | Storybook 内部 manager 通信 warning |

---

## 详细分类

### 1. `base-ui-native-button` — 15 stories

**警告文本**（首行）：
```
Base UI: A component that acts as a button expected a native <button> because the
`nativeButton` prop is true. Rendering a non-<button> removes native button
semantics, which can impact forms and accessibility. Use a real <button> in the
`render` prop, or set `nativeButton` to `false`.
```

**根因**：Base UI 的 `DialogTrigger` / `PopoverTrigger` 等组件在 `asChild` 模式下要求其子元素是原生 `<button>`。当 `DialogTrigger` 包裹了 `Button` 组件（`@base-ui/react` 内部）时会出现该警告。

**涉及的 15 个 stories**（4 个组件）：

| 组件 | Story IDs | 触发位置 |
|------|-----------|----------|
| `DepartmentBrowse` | `components-departmentbrowse--default`, `--disabled`, `--docs`, `--multiple`, `--with-default` | `components/ui/department-browse.tsx` 通过 `DialogTrigger` 包裹 |
| `TreeSelect` | `components-treeselect--default`, `--docs`, `--multiple`, `--with-default` | `components/ui/tree-select.tsx:174` |
| `UserBrowse` | `components-userbrowse--default`, `--disabled`, `--docs`, `--multiple`, `--with-default`, `--with-max-count` | `components/ui/user-browse.tsx:84` |
| `HoverCard` | （在 `hydration-nested-button` 中也出现） | 同上 |

**修复建议**（仅建议，不在本次范围）：
- `components/ui/dialog.tsx:18` 的 `DialogTrigger` 内部用 `<Slot>` 替代 `<button>`
- 或在 `DialogTrigger` 调用处设置 `nativeButton={false}`

---

### 2. `hydration-nested-button` — 7 stories

**错误文本**（首行）：
```
In HTML, <button> cannot be a descendant of <button>.
This will cause a hydration error.
```

**根因**：`MobileButton` 已经是 `<button>`，但 `MobileDialog` / `MobileSheet` 用 `DialogTrigger asChild` 包裹它，导致出现 `<button>` 嵌套。

**涉及的 7 个 stories**：

| Story | 触发组件 |
|-------|----------|
| `business-pages--inbox-example` | `Pages.stories.tsx` 中的按钮组合 |
| `components-collapsible--default` | `Collapsible` 内部结构 |
| `components-collapsible--docs` | 同上 |
| `components-hovercard--docs` | `HoverCard` 内部 trigger |
| `components-hovercard--user-profile` | 同上 |
| `mobile-components--mobile-dialogs` | `MobileDialog` + `MobileButton` |
| `mobile-components--mobile-sheets` | `MobileSheet` + `MobileButton` |

**修复建议**：
- `MobileDialog` / `MobileSheet` 接收 `trigger` 时不要用 `DialogTrigger asChild` 二次包装
- 或为 `MobileButton` 提供 `asChild` 透传

---

### 3. `react-dom-unknown-prop` — 7 stories

**警告文本**（首行）：
```
React does not recognize the `asChild` prop on a DOM element. If you intentionally
want it to appear in the DOM as a custom attribute, spell it as lowercase `aschild` instead.
```

**根因**：Radix UI / Base UI 系列的 `asChild` prop 在某些透传路径上没有被 `Slot` 拦截，最终落到原生 DOM 元素上。

**涉及 stories**（与 `hydration-nested-button` 高度重叠）：
- `components-collapsible--default` / `--docs`
- `components-hovercard--docs` / `--user-profile`
- `mobile-components--mobile-dialogs` / `--mobile-navigations` / `--mobile-sheets`

**修复建议**：在 `Collapsible.Trigger`、`HoverCard.Trigger` 内部使用 `@radix-ui/react-slot` 而非直接 spread props。

---

### 4. `non-bool-collapsible` — 3 stories

**警告文本**（首行）：
```
Received `true` for a non-boolean attribute `collapsible`. If you want to write
it to the DOM, pass a string instead: collapsible="true" or collapsible={value.toString()}.
```

**根因**：`<Sidebar collapsible={true}>` 中的 `collapsible` 应该是字符串或省略，而不是布尔。

**涉及 stories**：
- `components-accordion--default`
- `components-accordion--docs`
- `components-accordion--faq`

**修复建议**：在 `src/components/Accordion.stories.tsx` 中改用 `collapsible="true"` 或去掉该 prop。

---

### 5. `other` — 1 story

**Story**: `components-progress--complete`

**警告文本**（首行）：
```
manager received storyRenderPhaseChanged but was unable to determine the source of the event
manager received storyRendered but was unable to determine the source of the event
manager received storybook/highlight/remove but was unable to determine the source of the event
manager received chromaui/addon-visual-tests/highlightIgnored/count but was unable to determine the source of the event
manager received storybook/docs/snippet-rendered but was unable to determine the source of the event
```

**根因**：Storybook 内部 manager ↔ preview 通信警告，与 story 本身无关，是 addon（chromatic、docs）的事件追踪问题。

**严重度**：**Low**。不影响 story 渲染，可在 addon 配置中抑制。

---

## 已知但本次未复现的警告（来自历史 Playwright 日志）

这些是历史日志中出现、但本次扫描未复现的警告。可能是 Vite dep 优化期间的瞬态问题：

| 历史警告 | 来源 log | 本次复现 |
|---------|---------|---------|
| `sb-addons/a11y-2/manager-bundle.js` 404 | `console-2026-06-12T02-55-20-950Z.log` | ✗ 未出现 |
| `sb-addons/docs-3/manager-bundle.js` 404 | 同上 | ✗ 未出现 |
| `sb-addons/storybook-core-server-presets-0/common-manager-bundle.js` 404 | `console-2026-06-12T02-39-21-589Z.log` | ✗ 未出现 |
| Vite `504 Outdated Optimize Dep` | `console-2026-06-12T02-53-49-795Z.log` | ✗ 未出现 |
| `components/business/charts/index.tsx` 404 | `console-2026-06-12T02-49-48-857Z.log` | ✗ 未出现 |
| `SB_PREVIEW_API_0009 NoStoryMatchError business-connection-status` | `console-2026-06-12T01-53-09-661Z.log` | ✗ 未出现 |
| `ariaLabel` mandatory in Storybook 11 (Button / PopoverProvider) | 多条 | ✓ 出现，但仅 manager UI 自身 |

**结论**：本次扫描结果干净，无 Storybook addon race condition 错误。

---

## 优先级建议（按用户选择"仅扫描不修复"原则）

| 优先级 | 类别 | 数量 | 影响 |
|--------|------|------|------|
| P0（必修）| 用户报告的 Form 404 | 1 | ✓ **已完成** |
| P1（高）| `base-ui-native-button` | 15 | 影响 accessibility & forms 提交 |
| P2（中）| `hydration-nested-button` | 7 | React 渲染错误（潜在 hydration mismatch） |
| P3（中）| `react-dom-unknown-prop` | 7 | DOM 警告（不影响功能） |
| P4（低）| `non-bool-collapsible` | 3 | DOM 属性警告 |
| P5（忽略）| `other` manager 事件 | 1 | Storybook 内部 |

---

## 复现方法

```bash
cd C:\Developer\workspace\design\chaos_style

# 1. 获取所有 story ids
(Invoke-WebRequest -Uri "http://localhost:6006/index.json" -UseBasicParsing).Content |
  ConvertFrom-Json | ForEach-Object { $_.entries.PSObject.Properties.Name } |
  Sort-Object | Out-File docs\story-ids.txt

# 2. 批量扫描
node scripts/scan-stories.js

# 3. 汇总分类
node scripts/summarize-scan.js
```

**输入文件**：
- `docs/story-ids.txt` — 419 个 story id 列表
- `docs/playwright-results-raw.json` — 完整扫描结果（含每条 console error 全文）
- `docs/playwright-results-summary.json` — 分类汇总

**脚本**：
- `scripts/scan-stories.js` — Playwright 批量扫描器
- `scripts/summarize-scan.js` — 错误分类器

---

## 验证截图位置

`docs/screenshots/` （本次未生成，下一轮可补充）
