---
status: 待审核
created: 2026-07-16
updated: 2026-07-16
issue: 49
---

# OrgAdminPage 组织管理台页面范式 (#49)

## 概述

新增业务级 **组织管理台** 组件（命名推荐 `OrgAdminPage`），提供「左组织树 + 右摘要/Tabs」的标准信息架构，供部门/HR 主数据页复用。

**不**再造底层 Tree；组合现有 `TreeView`（或轻量树壳）+ 布局槽位。  
与 **区划懒加载 TreeTable（#50）**、**分类 CRUD（TreeCrudPage）** 明确分工。

建议 **minor**（新组件 + 文档选型表）。

## 背景与动机

- mop 部门管理等页若只用整页 `TreeTable`，达不到飞书/企微/ERP 组织后台体验。
- 现有：
  - `TreeCrudPage`：左树右详情，节点仅 `id/label/children`，无组织字段、无右侧 Tabs/Summary 约定，偏**分类 CRUD**。
  - `TreeTable` / `TreeView`：原语/表，不是组织台。
  - `OrgTreeSelect` / `DepartmentBrowse`：表单选组织，**不**替代管理页。
- 区划 = 只读地理字典树（懒加载 TreeTable）；部门 = **组织工作台** — 不得共用同一页面范式。

## 现状摸底

| 资产                         | 能力                                              | 缺口                                 |
| ---------------------------- | ------------------------------------------------- | ------------------------------------ |
| `TreeCrudPage`               | 左树搜索、选中、onCreate/onRefresh、右 `children` | 无 Summary/Tabs/badge/readOnly/count |
| `TreeView`                   | 展开、选中、fieldNames                            | 无管理台 chrome                      |
| `MasterDetailLayout`（若有） | 左右分栏                                          | 非组织语义                           |
| `PageChrome` (#44)           | 页级密度                                          | 可包在页面外，不进 OrgAdmin 内部强制 |

## 设计方案

### 命名与目录

- 组件名：`OrgAdminPage`（优先于 `DepartmentWorkbench`，更通用）
- 路径：`components/business/org-admin-page.tsx`
- 导出：`components/business/index.ts`
- 分类：`business/org` 或 `business/crud`（Story：`Business/OrgAdminPage`）

### 信息架构

| 区域   | 职责                           | 实现                                                          |
| ------ | ------------------------------ | ------------------------------------------------------------- |
| 顶栏   | 公司筛选槽、刷新、同步、新增   | `filterSlot` + `headerActions` + 可选内置 refresh/create 回调 |
| 左     | 组织树：搜索、展开、选中；角标 | 内嵌 `TreeView` 或受控树；`treeData` + badges                 |
| 右空态 | 未选中                         | `emptySelection`                                              |
| 右上   | 节点 Summary                   | `summary` slot（ReactNode）                                   |
| 右下   | Tabs：成员 / 下级 / 日志…      | `tabs: { key, label, children }[]` 或 `tabsSlot`              |

### API 草图（实现时可微调，保持 slot-first）

```tsx
type OrgAdminTreeNode = {
  id: string;
  label: string;
  children?: OrgAdminTreeNode[];
  /** Optional badges (OA bound, count, …) rendered after label */
  badges?: React.ReactNode;
  readOnly?: boolean;
  count?: number;
  disabled?: boolean;
};

type OrgAdminTab = {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
};

interface OrgAdminPageProps {
  treeData: OrgAdminTreeNode[];
  selectedId?: string;
  defaultSelectedId?: string;
  onSelect?: (id: string | undefined, node?: OrgAdminTreeNode) => void;

  /** Top-left / toolbar filter (e.g. company Select) */
  filterSlot?: React.ReactNode;
  /** Top actions (sync OA, etc.) */
  headerActions?: React.ReactNode;
  onRefresh?: () => void;
  onCreate?: () => void;

  treeSearchPlaceholder?: string;
  emptyTree?: React.ReactNode;
  emptySelection?: React.ReactNode;

  /** Right panel summary for current node */
  summary?: React.ReactNode;
  /** Right panel tabs; if empty, only summary + children */
  tabs?: OrgAdminTab[];
  /** Fallback main content when not using tabs */
  children?: React.ReactNode;

  defaultTabKey?: string;
  tabKey?: string;
  onTabChange?: (key: string) => void;

  sidebarWidth?: number; // default ~280–320
  className?: string;
  /** Optional tree loading */
  treeLoading?: boolean;
}
```

### 行为约定

1. **选中**：点击树节点 → `onSelect`；`summary` / 当前 tab 内容由消费方按 `selectedId` 请求数据（组件不绑 API）。
2. **只读节点**：`readOnly` 时仍可选中查看；不隐藏树节点；工具栏「新增子部门」是否禁用由消费方 `headerActions`/`onCreate` 控制（可后续 `onCreateDisabled`）。
3. **角标**：`badges` 或 `count` 显示在 label 旁（`text-muted-foreground text-xs`）。
4. **搜索**：过滤树 label（复用 TreeCrudPage filter 思路或 TreeView 外层 filter）。
5. **空树 / 空选中**：分别渲染 `emptyTree` / `emptySelection`。
6. **底层**：默认 `TreeView`；**不要**在 v1 强绑 `TreeTable`（组织导航树通常轻量）。

### 与现有组件分工（文档选型表）

| 场景                           | 选型                                 |
| ------------------------------ | ------------------------------------ |
| 商品分类等「左分类右 CRUD 表」 | `TreeCrudPage`                       |
| 行政区划 / 超大字典懒加载表    | `TreeTable` + `onExpandRow`（#50）   |
| 部门/组织管理台                | **`OrgAdminPage`**                   |
| 表单里选部门                   | `OrgTreeSelect` / `DepartmentBrowse` |

### 组件 / 文件清单

- [ ] `components/business/org-admin-page.tsx`
- [ ] `components/business/org-admin-page.test.tsx`
- [ ] `components/business/index.ts` export
- [ ] `src/stories/business/OrgAdminPage.stories.tsx` — 默认 / 空选中 / 只读角标 / 搜索
- [ ] 文档短文或 Story description：选型表
- [ ] `CHANGELOG.md`（Added）

### 依赖

- `TreeView`、`Button`、`Input`、`Tabs`（ui）、`cn`
- 无新第三方包
- **不**依赖 #50 完成即可交付；Story 可交叉引用

## 实施步骤

- [ ] 1. 定 props 与 `OrgAdminTreeNode` 类型，写失败用例（测试先写可选）
- [ ] 2. 布局骨架：顶栏 + 左树 + 右 summary/tabs
- [ ] 3. 接 TreeView 选中/搜索/空态
- [ ] 4. Story 三态 + 单测导出/选中回调
- [ ] 5. 文档选型表
- [ ] 6. CHANGELOG；`tsc` + test

## 验收标准（对齐 issue）

- [ ] 存在可导入的 `OrgAdminPage`（或等价最终命名）
- [ ] 支持 filterSlot / headerActions / summary / tabs / 空选中
- [ ] 树支持搜索与选中回调
- [ ] 节点可展示 badges/count（至少一种）
- [ ] Story：只读角标、空选中、搜索
- [ ] 文档写清 vs TreeCrudPage / TreeTable
- [ ] 不复制第四套底层 Tree 实现

## 风险与注意

- **范围膨胀**：v1 只做布局与槽位，不内置 OA 同步、成员 API、权限。
- **与 TreeCrudPage 重叠**：文档必须划界，避免双标准。
- **a11y**：树与 Tabs 键盘路径；左右栏 `min-h-0` 防止撑破 AdminShell 高度链。
- 需要 `designs/` 门禁：本文件即为开发前置；实施时改 `工作中` 并更新 `INDEX.md`。

## Out of scope（v1）

- 内置成员表格/权限矩阵
- 强制替换 mop 部门页（消费方跟版）
- TreeTable 懒加载 isLeaf（#50）
- 虚拟滚动组织树

## 发布与消费方

- `/release minor`（可与 #50 同波或分 PR）
- mop：`/base-data/departments` 升级后替换「整页 TreeTable + 占位」
- 关闭 #49 时 comment 版本 + SHA

## 变更记录

| 日期       | 变更                  | 作者  |
| ---------- | --------------------- | ----- |
| 2026-07-16 | 初始计划（issue #49） | agent |
