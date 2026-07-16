# Component Decision Table（组件选型表）

> **给人类与 AI 的执行契约**：先查表，再写代码。  
> 表内「用这个」是首选；「不要做」是硬禁止。表中没有的场景 → 用现有原子/业务件**组合**；只有跨页面复用且通过 `designs/` 计划后才升格新公共组件。

相关：

- Agent 复用协议：`AGENTS.md` → **Component Reuse Protocol**
- 设计流程：`designs/README.md`、`designs/INDEX.md`
- 实现位置：`components/ui` · `components/business` · `components/layout`
- Story：`src/stories/**`（用法以 Story 为准）

---

## 0. 分层（先定放哪一层）

| 层                   | 路径                  | 可以有                                                              | 禁止                                                  |
| -------------------- | --------------------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| **ui**               | `components/ui`       | 无业务假设的原子/模式（Button、Select、TreeView、Dialog…）          | 字典 code、组织 ID 语义、具体 ERP 字段                |
| **business**         | `components/business` | 领域约定明确的拼装（SearchTable、DictSelect、OrgAdminPage、Bill*…） | 一次性页面私有布局；无 Story/无导出的「半成品公共件」 |
| **layout**           | `components/layout`   | 壳与导航（AdminShell、AppShell、各类 *Layout）                      | 表格/表单业务逻辑                                     |
| **app / story demo** | 应用或 Story 内       | 一次性拼装、实验                                                    | 复制库内已有实现并改名「自用封装」后当公共 API        |

**升格规则**：同一拼装在 **≥2 个真实页面** 出现，且 API 可稳定 → 写 `designs/` 计划 → 进入 `business`（或抽到 `ui`）→ Story + 测试 + barrel 导出。

---

## 1. 检索顺序（每次实现 UI 必做）

1. 打开本表，按场景行匹配。
2. `rg` / CodeGraph 搜组件名与 `@component`。
3. 打开对应 `src/stories/**`，**复制 Story 用法**再改数据。
4. 仍无匹配 → **组合**现有件；需要新公共 API → **先** `designs/`，再实现。
5. 禁止：未检索就新建 `components/**` 下的近似组件。

---

## 2. 表格 / 列表

**梯子（新代码只许向上选，不许旁路新栈）：**

```text
Table (ui 原子)
  → DataTable          轻量展示
  → SearchTable        后台标准列表（列+数据+分页）
  → ProTable           重型（列显隐/密度/导出/视图）
树： TreeTable | EditableTreeTable
虚拟： VirtualTable
弃用： AdvancedDataTable（禁止新用；2.0 移除）
```

| 需求                                     | 用这个                                    | 不要做                                                                                   |
| ---------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| 纯展示表格（无筛选/分页编排）            | `DataTable`（business）                   | 新写 `MyTable`；不要用已弃用的 `AdvancedDataTable`                                       |
| 后台标准列表（列 + 数据 + 分页）         | `SearchTable`                             | 用 `Table` 原子自己拼完整列表页却不复用 SearchTable 契约                                 |
| 重型表格（列显隐/密度/导出/保存视图等）  | `ProTable`                                | 在 SearchTable 外包一层「假 Pro」                                                        |
| 树形只读表（层级展开、懒加载、选择联动） | `TreeTable`                               | `Table` + 递归 `map` 自造树表                                                            |
| 树形可编辑（BOM、科目等）                | `EditableTreeTable`                       | 在 TreeTable 外挂不受控编辑态                                                            |
| 超大行数虚拟滚动                         | `VirtualTable`（ui）                      | 无虚拟化硬渲 1 万行 DOM                                                                  |
| 表格原子结构（自己完全控制）             | `Table` + Header/Body/…（ui）             | 业务列表页从零搭却重复 SearchTable 能力                                                  |
| 平面可编辑表格                           | `EditableTable`（ui）或业务 `*LineEditor` | 与 `EditableTreeTable` 混用场景                                                          |
| **弃用**                                 | —                                         | `AdvancedDataTable`：新代码禁止；见 barrel 注释，优先 SearchTable / DataTable / ProTable |

列表页壳：

| 需求                           | 用这个                                        | 不要做                                    |
| ------------------------------ | --------------------------------------------- | ----------------------------------------- |
| 筛选条 + 工具条 + 表体的列表壳 | `ListPageShell` + `FilterBar` + `SearchTable` | 每页手写 header/filter/table 间距互不一致 |
| 主数据简单列表骨架             | `MasterListTemplate`                          | 与 ListPageShell 再发明第三套             |
| 页头 / 密度 / 内容区           | `PageHeader` + `PageChrome`                   | 页面内魔法数 padding 替代 density 契约    |

---

## 3. 树 / 组织 / 浏览选择

### 3.1 Browse vs Picker（定义，避免双轨乱造）

| 类型       | 含义                                                        | 应用                                                       |
| ---------- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| **Browse** | **弹窗/面板里浏览并选定**（可表、可树、可远程 load）        | `BrowseDialog`；领域 `*Browse` **必须**是其薄适配器        |
| **Picker** | **表单触发器**（Select/Combobox/Popover 收起态 + 展开选值） | 静态/本地树用 Picker；大数据/复杂列用 Browse+`BrowseInput` |
| **禁止**   | 同一实体再写第三套 `*SelectModal` / `*Chooser` 且不复用上表 | 新代码若同时需要 Browse+Picker，文档写清职责，共享数据契约 |

**健康范例**：`company-browse` / `customer-browse` 等 → 内部只配列与 `items`，UI 壳是 `BrowseDialog`。  
**待收敛（见 designs 复用收敛计划 Backlog）**：`user-picker`、`department-picker`、`org-picker` 等仍自建 Dialog/树，新功能不要再复制它们的实现，应组合 `UserBrowse` / `OrgTree` / `BrowseDialog`。

### 3.2 组织三件套

| 需求                           | 用这个                                                   | 不要做                                                                |
| ------------------------------ | -------------------------------------------------------- | --------------------------------------------------------------------- |
| 纯树展示/选择（无业务 chrome） | `TreeView` / `TreeSelect`（ui）                          | 用 `div`+递归冒充树选择                                               |
| 组织树展示/单选（可搜索）      | `OrgTree`（ui）                                          | 在页面组件内再写一套 `OrgTreeRow`                                     |
| 部门浏览弹窗                   | `DepartmentBrowse`（ui）                                 | Modal+Transfer 临时拼部门选择                                         |
| 用户浏览弹窗                   | `UserBrowse`（ui）                                       | 自建用户双栏选择；**新选人优先 UserBrowse，不要复制 UserPicker 内芯** |
| 通用浏览弹窗（表/树/远程）     | `BrowseDialog`（business）                               | 每个实体一个互不兼容的 BrowseModal                                    |
| 领域实体浏览                   | 现有 `*Browse` 适配器，或新建 **仅** BrowseDialog 薄封装 | 复制 400 行 Dialog 浏览壳                                             |
| 触发浏览的输入框               | `BrowseInput`（ui）+ 打开 Browse/`*Browse`               | Input 右侧自己绑无障碍按钮却无统一清除/浏览                           |
| 组织管理整页（左树右详情+Tab） | `OrgAdminPage`（business，**左树应组合 OrgTree**）       | 用 layout + 一堆 ui 重拼；禁止页内自绘树                              |
| 左树右「分类 CRUD」通用页      | `TreeCrudPage`                                           | 与 OrgAdminPage 场景重叠时硬造第三套左树                              |
| 穿梭多选                       | `Transfer`（ui）                                         | 两个 List + 自己搬 keys                                               |

```text
组织树 UI     → OrgTree
组织管理台    → OrgAdminPage（组合 OrgTree）
分类树 CRUD   → TreeCrudPage
实体浏览弹窗  → BrowseDialog / *Browse
表单树选择    → TreeSelect 或领域 Picker（须复用树 ui，勿复制）
```

---

## 4. 选择器 / 远程 / 字典

| 需求                        | 用这个                                                     | 不要做                                                               |
| --------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| 静态单选                    | `Select`（ui）                                             | 业务里再包无文档的 `AppSelect`                                       |
| 可搜索本地选项              | `Combobox` / `AutoComplete`                                | 滥用 RemoteSelect 打本地假接口                                       |
| 多选标签式                  | `MultiSelect`（business）                                  | 多个 Checkbox 列表冒充多选下拉                                       |
| 字典（categoryCode / 缓存） | `DictSelect`                                               | Select + 手写 fetch 字典且无缓存                                     |
| 远程关键字搜索下拉基类      | `RemoteSelect`                                             | 每个远程下拉复制防抖/loading；**DictSelect 应逐步基于它（Backlog）** |
| 字典维护弹窗                | `DictManageDialog`                                         | 在业务页内嵌无复用的字典 CRUD 表                                     |
| 新领域 Picker               | 优先：BrowseDialog 适配器 **或** RemoteSelect/OrgTree 组合 | 从 `user-picker.tsx` 整文件复制改名                                  |

---

## 5. 表单 / 对话框 / 向导

| 需求         | 用这个                                                                 | 不要做                                      |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------- |
| 表单原子     | `Form` / 各 Input* / `FormGrid` / `FormSection`（ui）                  | 无 label/a11y 的裸 input 堆叠当「表单体系」 |
| 弹窗表单     | `FormDialog`（business）                                               | Dialog 里堆字段但无统一提交/校验槽          |
| 多步表单     | `FormWizard`                                                           | 自造 Stepper 状态机且不复用                 |
| 通用确认     | `ConfirmDialog` / `useConfirm`（business）或 `AlertDialog`（ui）       | `window.confirm`                            |
| 通用模态壳   | `Dialog` / `Sheet` / `Drawer`（ui）                                    | 新 `MyModal` 包装同一套 Radix               |
| 标准 CRUD 页 | `CrudPage` / `TabCrudPage`（注意 deprecated 字段偏好 FormDialogField） | 与 ListPageShell 能力重复时再发明           |

---

## 6. 布局 / 后台壳

| 需求             | 用这个                                                    | 不要做                                |
| ---------------- | --------------------------------------------------------- | ------------------------------------- |
| 标准管理后台壳   | `AdminShell` + `AdminSider` / `AdminHeader` / `AdminTabs` | 再实现一套侧栏+顶栏高度链             |
| 通用应用壳       | `AppShell`                                                | 与 AdminShell 混用契约却复制 CSS 变量 |
| 登录/空白/打印等 | `AuthLayout` / `BlankLayout` / `PrintLayout` / …          | 页面级 `min-h-screen` 分叉布局体系    |
| 主从             | `MasterDetailLayout` / `MasterDetailTabs`                 | 无障碍与尺寸不统一的 split 私有实现   |

高度链、折叠、Tab 行为以已完成 designs（AdminShell / AdminSider 系列）为准，**禁止**在业务页覆盖 shell 高度约定。

---

## 7. 图表

| 需求              | 用这个                                                                              | 不要做                                   |
| ----------------- | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| 统一图表入口/套件 | `Chart` / `ChartSuite` / 各 `*Chart`（Area/Bar/Line/Pie/Sankey/Scatter/Waterfall…） | 业务里直接 new 一套 ECharts 封装分叉主题 |
| KPI / 指标卡      | `KpiCard` / `StatCard` / `StatCardRow` / `MetricTrend`                              | 每页不同 padding 的「指标卡」            |

新图表类型：先 designs，再按现有 chart 目录模式扩展，复用 tooltip/图例/宽卡测量约定。

---

## 8. 单据 / 审批 / 附件（高频业务）

| 需求                  | 用这个                                                        | 不要做                                   |
| --------------------- | ------------------------------------------------------------- | ---------------------------------------- |
| 单据页骨架            | `BillPage` + `BillHeader` / `BillFooter` / `BillStatusBar`    | 普通 PageChrome 硬改成单据却缺状态条契约 |
| 行编辑（订单/费用等） | 对应 `*LineEditor` / `LineEditor`                             | 复制某 LineEditor 改名不收敛             |
| 审批时间线            | `ApprovalTimeline` / `ApprovalFlow`                           | Timeline 原子自造审批语义                |
| 附件                  | `AttachmentList` / `AttachmentUploader` / `AttachmentPreview` | 裸 `FileUpload` 冒充附件域组件           |
| 导入导出              | `ImportDialog` / `ExportButton` / `BulkImportWizard`          | 每页一个上传+解析私有流程                |

---

## 9. 明确禁止（AI 高频翻车点）

1. **未搜库就新建** `components/ui|business` 下与现有近名组件（`*Table2`、`OrgPanel`、`UserPickerModal`…）。
2. **绕过 barrel** 复制内部实现到 app，再改成「项目组件」。
3. **扩展公共 props 用布尔爆炸** 而不开 designs（`showX`×20）。
4. **弃用件复活**：`AdvancedDataTable` 等标注 `@deprecated` 的只维护不新用。
5. **Story 与实现分叉**：改了组件行为不改 Story / 测试。
6. **i18n 硬编码中文/英文** 进可复用组件（走 `lib/i18n` 资源）。
7. **把 app 路由/API 路径写进 ui 层**。

---

## 10. 新公共组件完成定义（DoD）

进入 `components/*` 公共面之前：

- [ ] `designs/` 计划存在，状态允许开发
- [ ] 本表或本节有「用这个 / 不要做」行（新增或更新）
- [ ] Named export；需要时从 `components/business/index.ts`（或对应入口）导出
- [ ] `src/stories/**` + `tags: ["autodocs"]`，含 When to use（可用 Story 参数或 MD 说明）
- [ ] 关键路径单测
- [ ] i18n（库约定的语言包）
- [ ] 无无关文件大 diff

未达 DoD → 只能放在 app 私有或 Story 演示，**不得**假装稳定公共 API。

---

## 11. 维护约定

| 何时                | 做什么                                     |
| ------------------- | ------------------------------------------ |
| 新增/弃用公共组件   | 更新本表对应行                             |
| 发现 AI/PR 重复封装 | 在「不要做」补一行，并考虑 eslint/评审清单 |
| 大波次重构          | designs 计划中附「选型表 diff」            |

**存量收敛 backlog**（Picker 自建 Dialog、DictSelect→RemoteSelect、表格共享 chrome 等）：见  
`designs/2026-07-16_组件复用收敛_选型与OrgAdmin_设计计划.md` 文末清单。本表管增量；该 designs 管还债。

**本表不是全量组件目录**（库内组件远多于此）。全量以源码 `@component` + Storybook 为准；本表只锁定**易混淆与高频**路径。

---

## 12. 快速对照（复制给会话用）

```text
列表 → SearchTable / ListPageShell / FilterBar
轻表 → DataTable
重表 → ProTable
树表 → TreeTable | EditableTreeTable
壳子 → AdminShell | PageChrome | PageHeader
字典 → DictSelect
远程下拉 → RemoteSelect
浏览弹窗 → BrowseDialog 或 *Browse 薄适配器
选人浏览 → UserBrowse（勿复制 UserPicker 内芯）
组织树 → OrgTree
组织台 → OrgAdminPage（组合 OrgTree）
确认 → ConfirmDialog / AlertDialog
表单弹窗 → FormDialog
禁止 → AdvancedDataTable 新用；页内自绘树；未检索新建 components/**
```
