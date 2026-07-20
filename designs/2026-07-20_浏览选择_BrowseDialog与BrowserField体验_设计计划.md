---
status: 待审核
created: 2026-07-20
updated: 2026-07-20
---

# 浏览选择 BrowseDialog 与 BrowserField 体验 设计计划

## 概述

本波次收敛浏览选择相关开放 issue，修复远程弹窗首开闪 empty、complete 下拉被裁切、失败静默、空结果多余面板四类问题，作为非破坏性修复交付。

- #80 BrowseDialog 远程 `loadData` debounce 前闪「暂无数据」
- #73 BrowserField complete 下拉 Portal/浮层
- #74 complete 失败暴露错误态
- #75 complete 返回 `[]` 不显示下拉

（同波次并行但独立：#76 ExportButton print XSS、#77 四组件 i18n、#78 untrack `.playwright-mcp`。）

## 背景与动机

- mop 订单创建 / 主数据预查依赖 BrowserField complete + 高级搜索 BrowseDialog。
- 1.16 complete 底座已 ship（#72），但浮层仍为字段内 absolute，Card/AdminShell 裁切。
- 远程弹窗 `loading` 设在 debounce 回调内，首开必然 empty 闪烁。
- complete reject 与空数组体验与 Ecology WeaBrowser 不一致。

## 现有组件检索（强制，防重复造轮子）

对照 [`docs/component-decision-table.md`](../docs/component-decision-table.md) 与 `AGENTS.md` → Component Reuse Protocol。

- [x] 已查选型表：BrowserField / BrowseDialog 为官方入口
- [x] 已检索 `browser-field.tsx`、`browse-dialog.tsx`、Popover portal、`--z-index-popover`
- [x] 已打开 `BrowserField.stories.tsx`
- [x] **结论**：复用现有组件，仅修复行为与浮层契约；不新建近名 picker
- [x] **不要做**：不在 mop 业务页本地 portal 掩盖；不改 BrowseDialog 为新公共 API

## 设计方案

### 技术方案

#### #80 BrowseDialog

- 远程路径：首次打开 / `open` 重置时在 debounce **前** `setLoading(true)`，必要时 `useLayoutEffect` 清空 rows。
- 后续 keyword 搜索：debounce 期间保留旧 rows，不在等待期画 empty。
- 请求结束且 `rows.length===0` 才 empty。

#### #73–#75 BrowserField complete

- 下拉：`createPortal` → `document.body`，`position: fixed` + trigger `getBoundingClientRect`，z-index 用 `--z-index-popover`；视口不足时上展开。
- `acError` state：catch 写入错误文案；loading 清除；继续输入清错误。
- 渲染条件：`acOpen && (acLoading || acError || acItems.length > 0)`；空数组不渲染面板。
- 保留键盘 / listbox / 高级搜索（有结果或 loading 时）。

### 组件 / 文件清单

- [x] `components/business/browse-dialog.tsx`
- [x] `components/business/browse-dialog.test.tsx`
- [x] `components/business/browser-field.tsx`
- [x] `components/business/browser-field.test.tsx`
- [x] `src/stories/business/BrowserField.stories.tsx`（Card 底部边缘）
- [x] `lib/i18n/resources/*/ui.json`（`browserField.completeError` 等）

### 接口设计

无破坏性公开 API 变更。可选后续：`completeShowEmpty?: boolean`（本波次默认不显示 empty 面板，不新增 prop 除非需要）。

### 依赖

- `react-dom` `createPortal`
- 现有 i18n `useSafeTranslation`
- 不新增第三方 floating-ui

## 实施步骤

- [x] #80 loading 时序 + 单测
- [x] #73 portal 定位 + Story
- [x] #74 错误态 + 单测
- [x] #75 空数组不展示 + 单测
- [x] 验收命令

## 验收标准

- [x] 远程 BrowseDialog 打开不闪「暂无数据」
- [x] complete 下拉不被 Card overflow 裁切
- [x] reject 显示错误文案；`[]` 无 listbox
- [x] 既有 complete 键盘/registry 单测通过
- [x] `npx tsc --noEmit` 通过

## 风险与注意

- portal 与 onBlur 关闭竞态：选项 `onMouseDown preventDefault` 已有，保持。
- 空结果不再展示「高级搜索」页脚：用户走放大镜（对齐 Wea）。

## 变更记录

| 日期       | 变更 | 作者  |
| ---------- | ---- | ----- |
| 2026-07-20 | 初始 | agent |
