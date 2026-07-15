---
status: 完成
created: 2026-07-15
updated: 2026-07-15
---

# NavigationTabsBar 点击被吞（CUI-TAB-03 / #26）

## 概述

修复 #21 drag-to-scroll 回归：无横向溢出时仍武装拖拽 + 4px 阈值过低，真实鼠标微抖导致 `suppressClick` 吞掉页签 `onChange`。P0 后台主导航不可用。

## 背景与动机

- 版本：`@chaos_team/chaos-ui@1.5.7`–`1.5.9`；消费方 mop / FE-11 用 `1.5.8`
- 现象：2～3 个页签时点击经常无反应；程序化 click 正常
- 前置：#21 / CUI-TAB-02；跟踪：CUI-TAB-03 / issue #26
- 预期：无溢出不拖、阈值 ≥8、有溢出大位移仍 suppress；正式包 **1.5.10** 升级（不在 mop 打补丁）

## 设计方案

### 技术方案

1. `onScrollPointerDown`：`scrollWidth <= clientWidth + 1` 时直接 return（不 `setPointerCapture`、不 arm drag）
2. `DRAG_THRESHOLD_PX`：`4` → `8`（真实鼠标点击常 5px 级抖动）
3. `cursor-grab` 仅在 `canScrollLeft || canScrollRight`（或 `isDragging` → grabbing）
4. 保持：interactive 目标不启动拖拽；仅 `drag.dragged` 后 suppress click

### 组件 / 文件清单

- [x] `components/layout/navigation-tabs-bar.tsx`
- [x] `components/layout/navigation-tabs-bar.test.tsx`
- [x] `designs/INDEX.md`
- [ ] `CHANGELOG.md` + version **1.5.10**（发布时，不在本修复提交强制）

### 接口设计

无 public API 变更。`AdminTabs` / `AdminShell` 自动继承。

### 依赖

- 无新第三方依赖
- 逻辑依赖现有 pointer 手势与 `suppressClickRef`（#21）

## 实施步骤

- [x] 无溢出 early-return
- [x] 阈值 8px
- [x] cursor 仅溢出时 grab
- [x] 单测：无溢出大位移仍 onChange；有溢出 5px 仍 onChange；有溢出大位移仍 suppress
- [x] `pnpm exec vitest run components/layout/navigation-tabs-bar.test.tsx`（28 passed）

## 验收标准

- [x] 无溢出：短按/微抖激活 tab
- [x] 有溢出：超阈值 drag-scroll 并 suppress；亚阈值仍 onChange
- [x] 关闭按钮等 interactive 行为不变
- [x] 单元测试通过
- [ ] 正式发布 1.5.10（FE-11 升级）— 另走 `/release` 流程

## 风险与注意

- jsdom 需 mock `scrollWidth` / `clientWidth` / `scrollLeft`（与 #21 一致）
- 阈值 8 略提高触控起拖门槛，优先保证点击可靠
- 发布前再跑 `pnpm run release:check`；勿在 mop 复制组件

## 变更记录

| 日期       | 变更                       | 作者  |
| ---------- | -------------------------- | ----- |
| 2026-07-15 | 初始实现与单测；状态待审核 | chaos |
