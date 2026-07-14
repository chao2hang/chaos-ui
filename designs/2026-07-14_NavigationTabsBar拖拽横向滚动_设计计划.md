---
status: 完成
created: 2026-07-14
updated: 2026-07-14
---

# NavigationTabsBar 拖拽横向滚动（#21）

## 概述

多页签溢出时支持按住拖拽横向滚动；保持滚动条隐藏；ResizeObserver 可靠驱动左右箭头；短按仍切 tab；拖拽中不选中文字、不打开 ContextMenu。

## 背景与动机

- 消费方 qxy-mop / FE-11：`AdminShell tabs` → `NavigationTabsBar`，无法在业务层补拖拽
- 现状：`overflow-x-auto` + 隐藏滚动条 + 仅 `scrollBy` 箭头；无 pointer drag
- 桌面按住拖动会选中 tab 文字，无法平移

## 设计方案

### 技术方案

1. 滚动容器 `pointerdown/move/up/cancel`：阈值 4px 后进入 dragging，`scrollLeft = start - dx`，`setPointerCapture`
2. `didDrag` 时抑制 tab `onChange` click；关闭按钮不启动拖拽
3. tab 标签 `select-none`；dragging 时 `cursor-grabbing` + 阻止选中
4. `onContextMenu`：若本次手势已 drag 则 `preventDefault`
5. `ResizeObserver` + mount/`items` 更新 `canScrollLeft/Right`
6. `wheel` 纵向 delta 映射为横向滚动（仅在可横向滚动时）
7. 保持滚动条隐藏 CSS

### 组件 / 文件清单

- [x] `components/layout/navigation-tabs-bar.tsx`
- [x] `components/layout/navigation-tabs-bar.test.tsx`
- [x] `src/stories/layout/NavigationTabsBar.stories.tsx`
- [x] `designs/INDEX.md`

### 接口设计

无 public API 变更。`AdminTabs` / `AdminShell` 自动继承。

### 依赖

无新第三方依赖。

## 实施步骤

1. [x] 实现 drag-scroll + select-none + ContextMenu 共存
2. [x] ResizeObserver 刷新箭头
3. [x] wheel 横向映射
4. [x] 单测 + overflow Story
5. [x] 状态 → 待审核

## 验收

- [x] 溢出后拖拽可横向滚动
- [x] 短按仍切换 tab
- [x] 拖拽不选中文字、不打开右键菜单
- [x] 箭头在 resize/overflow 后可靠出现
- [x] 滚动条保持隐藏
- [x] vitest navigation-tabs-bar 通过（26）
