---
status: 完成
created: 2026-07-16
updated: 2026-07-16
issue: 43
---

# AdminSider 手风琴展开 + Shell 动效 (#43)

## 概述

在 **不破坏默认多开行为** 的前提下：

1. 为顶层菜单组提供 `menuExpandMode="accordion"`（顶层互斥展开）
2. 补齐 shell 级动效：子菜单高度展开/收起、侧栏宽度（已部分存在）、移动端 drawer、折叠 flyout 进出，并尊重 `prefers-reduced-motion`

建议 **minor** 发版（新 prop，默认保持 `multiple`）。

## 背景与动机

- 现状：`expandedKeys` 为多值 `Set` 切换，多个顶层组可同时打开，长菜单嘈杂。
- 子菜单：展开时直接 `expanded && div` 挂载（`admin-sider.tsx` ~498–501），**无高度过渡**。
- #18 已做 label/logo 与宽度同步；CHANGELOG 注明 `SidebarMenuSub` 不内置手风琴——本 issue 在 **AdminSider 自己的树** 上做 accordion，不改通用 SidebarMenuSub 语义（除非复用同一动效 primitive）。
- 消费方：qxy-mop ERP shell（`AdminShell` + `menuItems`）。

## 现状摸底（代码）

| 位置                      | 行为                                                          |
| ------------------------- | ------------------------------------------------------------- |
| `admin-sider.tsx:240–269` | 初始 seed 祖先；effect 只 **add** 祖先，不 prune 其它顶层     |
| `admin-sider.tsx:343–349` | `toggleExpanded`：有则删、无则加（多开）                      |
| `admin-sider.tsx:498–501` | 展开子树：硬条件挂载，无 height anim                          |
| `admin-sider.tsx:510–515` | 移动遮罩：布尔挂载，无 fade                                   |
| `admin-sider.tsx:522`     | 侧栏 `transition-[width] duration-300` + `motion-reduce` 已有 |
| `admin-sider.tsx:445–483` | 折叠 flyout：`Popover`，单 `flyoutKey` 已单开                 |
| `admin-shell.tsx`         | 透传 sider props；需加 `menuExpandMode` pass-through          |

## 设计方案

### API（非破坏）

| Prop                                                           | 类型                        | 默认         | 说明                            |
| -------------------------------------------------------------- | --------------------------- | ------------ | ------------------------------- |
| `menuExpandMode`                                               | `"multiple" \| "accordion"` | `"multiple"` | 仅 **顶层（depth === 0）** 互斥 |
| （v1 不做）`openKeys` / `defaultOpenKeys` / `onOpenKeysChange` | controlled                  | —            | 可选后续；v1 内部 `Set` 足够    |

`AdminShellProps` 同名透传至 `AdminSider`。

### Accordion 规则

1. **用户点击（桌面展开态）** 顶层有 children 的父项：
   - 若关闭 → 打开，并 **清除其它顶层 key**（保留该顶层下已开的嵌套 key 可选：打开新顶层时建议 prune 其它顶层及其子孙；当前 `expandedKeys` 扁平存储，实现时：打开顶层 A 时 `next = new Set([A, ...nestedKeysOfAFromPrev?])` 或更简单 `next = new Set([A])` 再依赖 seed 补祖先。**推荐实现：** 打开顶层时：删除所有「其它顶层 key」，保留当前 key；嵌套 key 若不在当前分支下则删除。
   - 若已打开 → 关闭自身（允许全部关闭）。
2. **嵌套父级（depth > 0）**：保持现有单 key toggle；不强制全局单路径。
3. **Deep-link / `selectedKey` seed（CUI-NAV-02）**：在 add 祖先后，若 `accordion`，只保留匹配项的 **顶层祖先** + 该分支上的祖先链；删除其它顶层 expanded keys。
4. **折叠 + flyout**：交互模型不变；accordion **不**作用于 flyout 多开（已有单 `flyoutKey`）。

### 动效清单

| 表面                  | 期望                      | 实现方向                                                                                                               |
| --------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 子菜单面板            | height + opacity          | CSS grid `grid-rows-[0fr]/1fr]` 或 `Collapsible`；内容可在收起后 unmount（若用 grid 可保持子树 mounted 更顺）          |
| Chevron               | 随 open 旋转              | 已有 `rotate-90`；对齐 200–300ms                                                                                       |
| 桌面侧栏宽度          | 已有 width transition     | 微调 logo/label 不跳（#18 基础）                                                                                       |
| 移动 overlay + drawer | overlay fade；sider slide | overlay：`transition-opacity`；mobile sider 可用 `translate-x` + data-state；注意现有 `hidden lg:flex` 与 `fixed` 分支 |
| 折叠 flyout           | fade/slide-in             | `PopoverContent` 增加 `data-[state=open]:animate-in` 类（若项目已有 tailwind animate）                                 |
| Reduced motion        | 瞬时                      | 全面 `motion-reduce:transition-none`；高度动画用 media 或同类 token 关掉                                               |

共享时长：与现有 sider 一致 **`duration-300 ease-in-out`**。

### 关键实现草稿

```ts
// toggle at depth 0 + accordion
setExpandedKeys((prev) => {
  const next = new Set(prev);
  if (next.has(item.key)) {
    next.delete(item.key);
    // optional: prune descendants of item.key
    return next;
  }
  if (menuExpandMode === "accordion" && level === 0) {
    const topLevelKeys = new Set(menuItems.map((m) => m.key));
    for (const k of [...next]) {
      if (topLevelKeys.has(k) && k !== item.key) next.delete(k);
      // prune keys that only belong to other top-level branches
    }
    // simpler v1: rebuild from non-top keys under item only — see tests
  }
  next.add(item.key);
  return next;
});
```

Seed effect（accordion）：

```ts
setExpandedKeys((prev) => {
  const next = new Set(prev);
  for (const key of ancestors) next.add(key);
  if (menuExpandMode === "accordion") {
    const top = ancestors[0]; // first in trail = top-level
    const topLevelKeys = new Set(menuItems.map((m) => m.key));
    for (const k of [...next]) {
      if (topLevelKeys.has(k) && k !== top) next.delete(k);
    }
    // ensure full ancestor chain remains
    for (const key of ancestors) next.add(key);
  }
  return next;
});
```

### 组件 / 文件清单

- [ ] `components/layout/admin-sider.tsx` — `menuExpandMode`、toggle、seed prune、子菜单/遮罩/flyout 动效
- [ ] `components/layout/admin-shell.tsx` — prop 透传 + 类型导出
- [ ] `components/layout/admin-sider.test.tsx` — accordion 切换 + deep-link seed
- [ ] `components/layout/admin-shell` 相关测试（若有 shell prop 类型测试）
- [ ] `src/stories/layout/AdminSider.stories.tsx` — Accordion on/off + motion 说明
- [ ] `CHANGELOG.md`
- [ ] 导出类型：`AdminSiderProps` / `AdminShellProps` 含 `menuExpandMode`

### 依赖

- 现有 Popover、Button、cn
- 可选复用 ui `Collapsible`（若已有）；无新 npm 包

## 实施步骤

- [ ] 1. 增加 `menuExpandMode` 默认 `multiple`；default 路径与现测例完全一致
- [ ] 2. 实现 depth-0 accordion toggle + 辅助：顶层 key 集合 / 分支 prune
- [ ] 3. 修正 seed effect 与 initial `useState` 在 accordion 下的 prune
- [ ] 4. 子菜单高度过渡（优先 grid 0fr/1fr，避免测布局抖动）
- [ ] 5. 移动 overlay fade；drawer enter/exit（在现有 fixed/hidden 模型上增量，避免回归 CUI-LAYOUT-02 `relative`）
- [ ] 6. flyout content 进出动画（轻量）
- [ ] 7. 全表面 `motion-reduce`
- [ ] 8. 测试 + Storybook + CHANGELOG
- [ ] 9. `pnpm test` admin-sider + `tsc` + `lint`

## 验收标准（对齐 issue）

- [ ] `menuExpandMode="multiple"`（默认）：与当前多开行为一致
- [ ] `menuExpandMode="accordion"`：用户展开时至多一个 **顶层** 组打开；可关闭当前组
- [ ] Deep route / `selectedKey` prefix 仍自动展开活动分支；accordion 下仅该顶层组保持打开
- [ ] 允许 motion 时子菜单有可见高度（或等价）过渡
- [ ] 允许 motion 时移动 drawer 与折叠 flyout 有进出
- [ ] `prefers-reduced-motion: reduce` 关闭 transform/height 动画
- [ ] 单元/组件测试：accordion toggle + deep-link seed
- [ ] CHANGELOG + 类型导出
- [ ] Storybook：accordion 开关 + motion 说明

## 风险与注意

- **Seed 与用户展开竞态**：effect 在路由变化时必须 prune，否则 accordion 被旧顶层污染。
- **扁平 expandedKeys**：嵌套 key 与顶层 key 同 Set；prune 时不要误删当前分支嵌套 key。
- **高度动画 + overflow**：aside 已有 `overflow-x-hidden overflow-y-auto`；子面板动画避免把 nav 滚动锁死。
- **移动端 `hidden` vs 动画**：完全 `hidden` 无法 transition；可能需 `data-mobile-open` + `pointer-events` + translate，桌面仍 `lg:flex`。实现时以「有可见进出」为准，不强制重写整套响应式。
- **CUI-LAYOUT-02**：保持 aside `relative`，禁止 `lg:static`。
- 默认 `multiple` 保证无回归；qxy-mop 显式开 accordion。

## Out of scope（v1）

- 任意深度「整树只开一条路径」
- mop 侧 fork / CSS 补丁 AdminSider
- 破坏默认多开
- 完整 controlled `openKeys` API

## 发布

- Prefer minor；可与 #44 同波次 minor 或分 PR 同版本。
- 消费方 pin + `/chaos-ui-up`。

## 关联

- CUI-NAV-02 deep-link expand（1.5.3）
- #18 折叠宽度/label 动画（已完成）
- CHANGELOG：SidebarMenuSub「不内置手风琴」

## 变更记录

| 日期       | 变更                  | 作者  |
| ---------- | --------------------- | ----- |
| 2026-07-16 | 初始计划（issue #43） | agent |
