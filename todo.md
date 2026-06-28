# Chaos UI 企业级组件库 — 完善 TODO

> 目标:将 `D:\Projects\qxyfoods\chaos_style` 升级为生产级企业 UI 组件库,服务于 `qxy-mop` 及后续所有业务系统。
> 验收对象:人(开发者/设计师)+ AI(Copilot/Codex/Cursor/本地模型)
> 当前版本:0.1.0 → 目标版本:1.0.0

---

## 优先级说明

- **P0** — 必须完成,阻塞 1.0.0 发布
- **P1** — 1.0.0 发布前完成
- **P2** — 1.x 持续迭代
- **P3** — 长期演进,根据业务诉求推进

---

## 0. 总览(完成度速览)

| 维度 | 当前 | 目标 | 缺口 |
|------|------|------|------|
| ui 基础组件 | 70 | 90 | 缺 20(含 region-layout / subform-tabs / config-provider / flex / typography / spinner;已补 Menu/Message/Modal) |
| business 业务组件 | 85 | 250+ | 缺 ~165(含单据/CRUD/审批/Picker/营销/财务 + 旧系统迁移 + 跨库借鉴) |
| layout 布局 | 10 | 22 | 缺 12(含 region-layout / master-edit-template) |
| 图表组件 | 1 基础 chart | 15+ | 缺 14(对标 Tremor 全套) |
| 仪表盘 Blocks | 0 | 8+ | 全新类别 |
| hooks | 17 | 35+ | 缺 ~18 |
| lib 工具 | 6 | 20+ | 缺 ~14(含 rsa / excel / pdf / qrcode) |
| 业务模板 (master-edit/list) | 0 | 8+ | 全新类别 |
| CI/CD 流水线 | 2 | 6+ | 缺 4 |
| 测试覆盖率阈值 | 60% | 85% | 缺 25pp |
| 文档完整度 | ~55% | 100% | 缺 45pp(Storybook 中英双语 P0 已完成;P1 migration/roadmap/changelog + 组件级 MDX 待做) |
| AI 友好性 | 基础 AGENTS.md | 多层级 ai-rules | 缺 6 类 |

> **2026-06-28 文档结构变更**: `src/intro/` 从单层扁平 MDX 改为 `zh/` + `en/` 双语子目录,后整体搬迁至 `src/stories/intro/{zh,en}/`。侧边栏拆为 `en` 与 `zh` 两个分组。MDX 统一用 frontmatter `title:` (而非 `<Meta>`),链接改用 `en-xxx--docs` / `zh-xxx--docs` CSF ID。
>
> **2026-06-28 项目清理完成**:
> - Phase 1: 删除根目录 21 个垃圾文件;`.gitignore` 增加 `/output/` `*.sh` `/reguser.js` `VISUAL_TEST_REPORT.md` `.depcruise.*`
> - Phase 2: `VISUAL_TEST_REPORT.md` → `docs/reports/visual-test.md`;`component-spec.md` → `docs/specs/components.md`
> - Phase 3A: `tsup.config.ts` entry 直接指向源码 barrel;7 空 `package/*.ts` 归档至 `package/__deprecated__/`;保留 `package/next.ts`
> - Phase 3B: `src/{components,business,layout,utils}` → `src/stories/{ui,business,layout,utils}`(140+ 文件)
> - `.storybook/main.ts` stories glob 更新为 `../src/stories/**`
> - `build-storybook` 通过;18 份双语文档 + 全部组件 stories 均注册正常

---

## 一、工程基座 & 构建(Foundation)

### 1.1 package.json 完善
- [ ] **P0** 添加 `license: "MIT"` 字段
- [ ] **P0** 添加 `repository` / `bugs` / `homepage` 字段
- [ ] **P0** 添加 `keywords`(react, ui, design-system, components, tailwind, radix 等)
- [ ] **P0** 添加 `description`(中英双语)
- [ ] **P0** 新增 `prepublishOnly` 脚本: `npm run check && npm run test && npm run build:pkg`
- [ ] **P0** 新增 `format` 脚本: `prettier --write "**/*.{ts,tsx,css,md,mdx,json,yml}"`
- [ ] **P0** 新增 `format:check` 脚本
- [ ] **P1** 添加 `engines.npm` 字段
- [ ] **P1** 添加 `provenance: true`(npm 8.4+ 包溯源)
- [ ] **P1** `publishConfig.access` 改为 `public` 或明确文档化 `restricted` 策略
- [ ] **P1** 添加 `funding` 字段
- [ ] **P2** 评估迁移到 Changesets 版本管理(替代手写 version)

### 1.2 tsup 构建配置
- [ ] **P0** `target` 从 `es2019` 提升到 `es2020`(跟上 React 19 生态)
- [ ] **P1** 评估 `minify: true` 用于生产构建
- [ ] **P1** 添加 `treeshake: { preset: "smallest" }` 进一步减少体积
- [ ] **P2** 添加 `banner` 字段写入 LICENSE 头
- [ ] **P2** 评估 `splitting: false` 在 SSR 环境下的兼容性

### 1.3 tsconfig.json 完善
- [ ] **P1** 添加 `tsconfig.build.json`(typecheck 全量,build 仅打包入口)
- [ ] **P1** 添加 `noUnusedLocals` / `noUnusedParameters` 严格性
- [ ] **P1** 添加 `forceConsistentCasingInFileNames`
- [ ] **P1** 添加 `verbatimModuleSyntax: true`(确保 ESM 互操作)
- [ ] **P2** `target` 升级到 `ES2022`(消费方支持后)
- [ ] **P2** 添加 `tsconfig.test.json` 用于测试环境

### 1.4 vitest 配置升级
- [ ] **P0** `environment: "node"` 改为 `"jsdom"` 或 `"happy-dom"`(组件测试必需)
- [ ] **P0** 添加 `setupFiles: ["./vitest.setup.ts"]`(注册 jest-dom matchers)
- [ ] **P0** 添加 `clearMocks: true` / `restoreMocks: true`
- [ ] **P0** 提升 coverage 阈值: `lines: 85, branches: 80, functions: 85, statements: 85`
- [ ] **P1** 添加 `alias` 配置(复用 tsconfig 的 paths)
- [ ] **P1** 添加 `workspace` 字段支持多项目(storybook / unit / a11y)
- [ ] **P2** 评估 `pool: "threads"` 提升测试速度

### 1.5 缺失的核心依赖
- [ ] **P0** `@testing-library/react@19` + `@testing-library/jest-dom@6` + `@testing-library/user-event@14`
- [ ] **P0** `jsdom` 或 `happy-dom`
- [ ] **P1** `@vitest/coverage-v8`(已隐式安装,需显式声明)
- [ ] **P1** `@axe-core/cli`(已存在于 detection.yml 但未在 deps 声明)
- [ ] **P1** `prettier-plugin-tailwindcss`(class 自动排序)
- [ ] **P2** `knip`(检测未使用的文件/导出)
- [ ] **P2** `size-limit` + `@size-limit/preset-small-lib`(包体积监控)
- [ ] **P2** `depcheck`(开发依赖健康度)
- [ ] **P2** `npm-run-all2`(脚本并行化)

### 1.6 缺失的核心文件
- [ ] **P0** 创建 `/LICENSE` 文件(MIT)
- [ ] **P0** 创建 `/CHANGELOG.md`(人工维护或 Changesets 自动生成)
- [ ] **P0** 创建 `/.prettierrc.json` + `/.prettierignore`
- [ ] **P0** 创建 `/.editorconfig`
- [ ] **P1** 创建 `/.npmrc`(已存在,需审计: registry / save-exact / side-effects-cache)
- [ ] **P1** 创建 `/CONTRIBUTING.md`(贡献流程)
- [ ] **P1** 创建 `/SECURITY.md`(安全漏洞上报流程)
- [ ] **P2** 创建 `/SUPPORT.md`
- [ ] **P2** 创建 `/CODE_OF_CONDUCT.md`

---

## 二、组件库完整性(Audit 对照 qxy-mop)

### 2.1 qxy-mop 实际使用的 antd 组件映射表

下表列出 qxy-mop 正在使用的 antd 组件,逐一映射到 chaos-ui 是否已有等价组件,缺口即为待开发项。

| qxy-mop 使用的 antd 组件 | chaos-ui 对应 | 缺口 |
|--------------------------|---------------|------|
| `Layout` / `Header` / `Sider` / `Content` | ✅ `app-shell` / `dashboard-layout` | 无 |
| `Menu` (inline, theme, selectedKeys) | ✅ `menubar` / `navigation-menu` | 需补充 `MenuSider` |
| `Avatar` (含 size 24, 背景色) | ✅ `avatar` | 无 |
| `Dropdown` (with menu items) | ✅ `dropdown-menu` | 无 |
| `Breadcrumb` (with items API) | ✅ `breadcrumb` | 无 |
| `Space` (size, wrap) | ❌ | **缺 `space` 组件** |
| `Card` (size, bodyStyle, extra) | ✅ `card` | 无 |
| `Row` / `Col` (gutter, span) | ❌ | **缺 `grid` / `row` / `col`** |
| `Table` (size, columns, scroll.x, pagination, fixed, ellipsis) | ⚠️ `data-table` / `advanced-data-table` | 需 API 验证 |
| `Tag` (color) | ✅ `chip` / `badge` | 需确认映射 |
| `Button` (type, size, icon, danger, type="link") | ✅ `button` | 无 |
| `Typography.Text` | ⚠️ 无独立组件 | 需 `typography` 系列 |
| `Form` (useForm, layout, Form.Item, rules) | ✅ `form` + `form-field` | 校验规则待补 |
| `Input` (Search, TextArea, Number) | ✅ `input` + `textarea` / ❌ `input-search` | **缺 `input-search`** |
| `InputNumber` | ❌ | **缺 `input-number`** |
| `Select` (showSearch, allowClear, options) | ✅ `select` | 需 `combobox` 增强 |
| `Modal` (confirm, open, destroyOnClose) | ✅ `dialog` / `alert-dialog` | 需 `modal.confirm` 静态方法 |
| `Upload` | ✅ `file-upload` | 无 |
| `DatePicker` / `RangePicker` | ⚠️ `date-range-picker` | **缺 `date-picker` 单点** |
| `Tabs` (activeKey, items) | ✅ `tabs` | 无 |
| `Tree` (treeData, selectedKeys, expandedKeys) | ✅ `tree-view` | 无 |
| `TreeSelect` | ✅ `tree-select` | 无 |
| `Progress` (percent, size, status) | ✅ `progress` | 无 |
| `App.useApp()` (message 全局) | ⚠️ | 需 AppProvider 增强 |
| `Result` | ✅ `error-page` | 无 |
| `ConfigProvider` / `theme` | ⚠️ | **缺 `ConfigProvider` 顶层 provider** |
| `Descriptions` (item, column) | ❌ | **缺 `descriptions` 描述列表组件** |
| `Divider` | ❌ | **缺 `divider` 组件** |
| `Empty` | ✅ `empty-state` | 无 |
| `Tooltip` (implicit) | ✅ `tooltip` | 无 |
| `Popconfirm` (implicit) | ⚠️ | **缺 `popconfirm` 组件** |
| `Drawer` (implicit) | ✅ `drawer` | 无 |
| `Notification` (implicit) | ✅ `sonner` 已配 | 需 `useNotification` Hook |
| `Spin` (implicit) | ✅ `loading-page` | **缺 `spin` 局部加载** |
| `Affix` (sticky) | ❌ | **缺 `affix` 组件** |
| `Anchor` | ❌ | **缺 `anchor` 组件** |
| `BackTop` | ❌ | **缺 `back-top` 组件** |
| `FloatButton` (FAB) | ✅ `fab` | 无 |
| `Segmented` | ✅ `segmented-control` | 无 |
| `Switch` (implicit) | ✅ `switch` | 无 |
| `Slider` (implicit) | ✅ `slider` | 无 |
| `Steps` | ✅ `stepper` | 无 |
| `Statistic` | ✅ `kpi-card` | 需 `Statistic` 原子 |
| `Timeline` | ✅ `timeline` | 无 |
| `Transfer` | ✅ `transfer` | 无 |
| `Cascader` (multi-level select) | ❌ | **缺 `cascader` 级联选择** |
| `TreeSelect` (multi) | ✅ `tree-select` | 无 |
| `Rate` | ✅ `rating` | 无 |
| `AutoComplete` | ⚠️ `command-palette` | 需 `autocomplete` |
| `Mentions` | ❌ | **缺 `mentions` @ 提及** |

### 2.2 必须新增的 ui 基础组件(P0)

| 组件 | 来源映射 | 优先级 | 验收标准 |
|------|----------|--------|----------|
| **`space`** | antd Space | P0 | 原子级布局间距组件,支持 `size/direction/wrap/align`,有 Story + a11y + 单测 |
| **`row` / `col` / `grid`** | antd Grid | P0 | 24 栅格,支持 `gutter/span/offset/responsive`,有 Story + a11y + 单测 |
| **`input-search`** | antd Input.Search | P0 | `allowClear/enterButton/onSearch`,有 Story + 单测 |
| **`input-number`** | antd InputNumber | P0 | `min/max/precision/step/controls`,有 Story + 单测 |
| **`date-picker`** | antd DatePicker | P0 | 单点日期,format/locale/disabledDate,基于 react-day-picker 包装 |
| **`divider`** | antd Divider | P0 | 简单分隔线,支持 `orientation/text/type` |
| **`descriptions`** | antd Descriptions | P0 | 描述列表,`column/extra/items/title` |
| **`popconfirm`** | antd Popconfirm | P0 | 气泡确认,基于 `popover` 增强 |
| **`spin`** | antd Spin | P0 | 局部加载,`size/tip/spinning/delay` |
| **`affix`** | antd Affix | P0 | 钉住元素,`offsetTop/offsetBottom` |
| **`back-top`** | antd BackTop | P1 | 回到顶部,基于 `button` + `intersection-observer` |
| **`cascader`** | antd Cascader | P1 | 级联选择,`fieldNames/loadData` |
| **`mentions`** | antd Mentions | P1 | @ 提及,`prefix/options` |
| **`anchor`** | antd Anchor | P1 | 锚点导航,`items/affix/offsetTop` |
| **`autocomplete`** | antd AutoComplete | P1 | 自动补全,基于 `select` 增强 |
| **`watermark`** | antd Watermark | P1 | 水印,SVG/Canvas 双模式,`font/content/rotate/gap` |

### 2.3 必须增强的 business 业务组件

> 以下组件全部基于 qxy-mop 审计提炼。每个业务页面都有 **单据头 + 明细行 + 审批流 + 状态机** 的共性,应沉淀为可复用组件,而非让每个页面重复写。

---

#### 2.3.1 单据/表单/明细行体系(Bill & Line Editor System)

这是 ERP 系统最核心的组件族——每种单据(订单/费用/对账/申请)都有**单据头** + **可编辑明细行** + **合计** + **提交/存草稿**。

##### 🔴 P0: 核心单据框架

- [ ] **P0** `bill-page` —— 单据页面骨架
  - Props: `title` / `subtitle` / `status` / `onBack` / `actions` / `loading`
  - 内置: 页头(返回+标题+状态+操作) + 内容区 + 底部操作栏(存草稿/提交/取消)
  - 对标 qxy-mop: 所有 `page.tsx` 里的 `<div className="mop-page-header">` + 底部 `<Space><Button>存草稿</Button><Button>提交</Button></Space>`
  - 状态: 支持 Draft/Pending/Approved/Rejected 四态切换,按钮/字段自动只读

- [ ] **P0** `bill-header` —— 单据头区
  - Props: `fields`(字段配置数组) / `layout`(vertical/grid/custom) / `columns`(2/3/4列) / `readOnly`
  - 自动渲染: `Form` + `Select` + `DatePicker` + `Input` + `DictSelect` + 自定义 picker
  - 对标: qxy-mop 订单创建的"订单信息"Card / 费用申请的"单据信息"Card
  - 支持 `gutter` + 响应式列数

- [ ] **P0** `line-editor` —— 可编辑明细行通用组件
  - 核心能力:
    - 行增删(addRow / removeRow),至少保留 1 行
    - 行内编辑(每格可放任意组件: Select/InputNumber/Input/DatePicker)
    - 自动计算列(如 qty*price=subtotal)
    - 合计行(自动汇总指定列)
    - 行拖拽排序(基于 dnd-kit,已依赖)
    - 批量粘贴(从 Excel 粘贴多行)
  - Props: `columns`(列定义,含 `compute?`/`editable?`/`fixed?`) / `data` / `onChange` / `minRows` / `maxRows` / `footer` / `rowKey`
  - 对标: qxy-mop 订单的"商品明细"表 / 费用申请的"费用明细"表

- [ ] **P0** `order-line-editor` —— 订单明细专版(基于 line-editor)
  - 专用列: SKU选择(异步搜索) / 单价(自动带入) / 数量 / 小计(自动算) / 删除
  - 内置 SKU Picker(搜索/下拉/模糊匹配)
  - 底部汇总: 行数 + 订单合计
  - 对标: `qxy-mop/order/create/page.tsx`

- [ ] **P0** `expense-line-editor` —— 费用明细专版(基于 line-editor)
  - 专用列: 摘要 / 金额
  - 底部汇总: 合计金额
  - 对标: `qxy-mop/expense/apply/page.tsx`

- [ ] **P0** `bill-footer` —— 单据底部操作栏
  - Props: `onSaveDraft` / `onSubmit` / `onCancel` / `onApprove` / `onReject` / `onRecall` / `status`
  - 根据单据状态自动显示/隐藏按钮:
    - Draft: 存草稿 + 提交 + 取消
    - Pending: (审批人视角) 通过 + 驳回
    - Approved: (只读) 打印 + 作废
    - Rejected: (提交人视角) 修改重提 + 作废
  - 对标: qxy-mop 所有单据页底部的 `<Space>` 按钮组

##### 🟡 P1: 更多单据类型专版

- [ ] **P1** `reconciliation-line-editor` —— 对账明细编辑
  - 专用列: 经销商 / 订单金额 / 费用扣减 / 应付净额
  - 对标: `qxy-mop/expense/reconciliation`

- [ ] **P1** `sales-target-editor` —— 销售目标编辑表(行内 InputNumber)
  - 专用列: 年度 / 大区 / 业务员 / Q1~Q4(可编辑) / 年度目标(可编辑)
  - 底部汇总: 各列算术求和
  - 对标: `qxy-mop/sales/target`

- [ ] **P1** `marketing-activity-form` —— 营销活动表单
  - 单据头: 活动名称/类型/期间/预算
  - 明细行: 搭赠规则行/满赠规则行/满减规则行
  - 对标: `qxy-mop/marketing/activities` + `policy`

- [ ] **P1** `policy-line-editor` —— 搭赠/满赠/满减政策明细
  - 专用列: 政策名称 / 类型 / 触发条件 / 奖励 / 配额(已用/总额) / 状态
  - 配额列: 进度条 + 配额状态 Tag(充足/紧张/已耗尽)
  - 对标: `qxy-mop/marketing/policy`

- [ ] **P1** `application-form` —— 开户/闭户/变更申请表单
  - 单据头: 申请类型(开户/闭户/变更) / 经销商信息
  - 对标: `qxy-mop/customer/applications`

---

#### 2.3.2 CRUD 页面模板(CRUD Page Templates)

qxy-mop 里 70% 的页面是"搜索 + 表格 + 新增/编辑弹窗 + 分页"——这种模式必须模板化。

- [ ] **P0** `crud-page` —— 增删改查标准页
  - **搜索栏**: `filterFields`(支持 Input/Search / Select / DatePicker / DictSelect)
  - **操作栏**: `actions`(新增/刷新/批量操作/导出)
  - **数据表格**: `columns` / `dataSource` / `pagination` / `rowSelection`(批量选择)
  - **表单弹窗**: `formFields`(新增/编辑共用,自动校验) / Modal 容器 / 自定义表单布局
  - **删除确认**: `onDelete`(内置 confirm dialog)
  - **Hooks**: 内置 usePagination / useCrud 整合
  - 对标: qxy-mop 的 companies / departments / employees / warehouses / regions / dictionaries

- [ ] **P0** `filter-bar` —— 搜索/筛选栏
  - Props: `fields`(字段配置) / `onSearch` / `onReset` / `layout`(inline/card)
  - 响应式: PC 横排 / 移动端折叠
  - 对标: qxy-mop 几乎所有列表页的 `<Form layout="inline">`

- [ ] **P0** `search-table` —— 搜索 + 表格组合(不含弹窗)
  - 整合 filter-bar + Table + Pagination
  - 对标: qxy-mop 所有列表页的标准布局

- [ ] **P1** `tree-crud-page` —— 左树右表 CRUD
  - 左侧: TreeView / TreeSelect(带搜索)
  - 右侧: crud-page(标准 CRUD)
  - 树选中 → 右表联动过滤
  - 对标: `qxy-mop/base-data/products`(商品分类树 + 商品表) / `product-categories`(分类树 + 详情)

- [ ] **P1** `tab-crud-page` —— 标签页切换 CRUD
  - 顶部 Tabs 切换不同数据视图
  - 每个 Tab 内可配不同 columns / filterFields
  - 对标: `qxy-mop/base-data/dictionaries`(分类 Tab + 明细 Tab)

---

#### 2.3.3 仪表盘/看板体系(Dashboard & KPI)

qxy-mop 的 Dashboard + 业绩看板 + 费用池都遵循"统计卡+表格+快捷入口"模式。

- [ ] **P0** `stat-card` —— 统计卡(已有,需增强)
  - 增强: `icon`(ReactNode) / `color`(主题色) / `trend`(上涨/下跌箭头+百分比) / `sparkline`(迷你趋势图)
  - 对标: qxy-mop dashboard 的 4 个统计卡 / 业绩看板 / 费用池

- [ ] **P0** `stat-card-row` —— 统计卡横排布局
  - Props: `cards`(配置数组) / `columns`(响应式列数: xs/sm/md/lg)
  - 对标: qxy-mop 所有页面的 `<Row gutter={[12,12]}><Col xs={24} sm={12} lg={6}>...`

- [ ] **P1** `todo-list-table` —— 待办事项表格
  - 带"处理"按钮 + 状态标签 + 类型标签
  - 支持点击跳转
  - 对标: qxy-mop dashboard 的"待办事项"表

- [ ] **P1** `quick-entry-grid` —— 快捷入口网格
  - Props: `items`(图标+名称+路由)
  - 对标: qxy-mop dashboard 的"快捷入口"

- [ ] **P1** `announcement-card` —— 公告/通知卡片
  - 对标: qxy-mop dashboard 的"系统公告"

- [ ] **P1** `performance-rank-table` —— 排行榜表格
  - 带名次标签(金银铜) + 进度条(达成率)
  - 对标: qxy-mop sales/performance

- [ ] **P1** `pool-tracker-table` —— 费用池追踪表
  - 带 Progress + 状态 Tag(充足/不足/已耗尽)
  - 对标: qxy-mop marketing/pool

---

#### 2.3.4 审批流 & 状态机(Approval & Status)

- [ ] **P0** `biz-status-tag` —— 业务状态标签
  - 基于 `BizStatusEnum`(DRAFT/PENDING/APPROVED/REJECTED)标准化
  - 自动颜色映射: Draft=灰 / Pending=蓝 / Approved=绿 / Rejected=红 / RejectedMid=橙
  - 对标: qxy-mop 所有页面的 `<Tag color={statusMap[v].color}>`

- [ ] **P0** `bill-status-bar` —— 单据状态进度条
  - 纵向/横向展示当前审批节点
  - 灰→蓝(当前)→绿(已过)→红(驳回)
  - 对标: qxy-mop 审批场景

- [ ] **P1** `approval-flow` —— 审批流可视化
  - 节点: 提交人 / 审批人 / 时间 / 状态 / 意见
  - 支持: 线性审批 / 会签 / 或签 / 加签 / 转签
  - 可收起/展开详情

- [ ] **P1** `approval-action-bar` —— 审批操作栏
  - 通过 / 驳回 / 转交 / 加签 / 退回 / 沟通
  - 必填审批意见 textarea
  - 对标: OA 审批页

- [ ] **P1** `bill-timeline` —— 单据流转时间线
  - 创建 → 提交 → 审批 → 生效/驳回 的全流程记录
  - 基于 `timeline` 组件增强,加入审批人/意见/耗时

- [ ] **P2** `oa-bridge` —— OA 系统桥接组件
  - 提交到 OA / 拉取 OA 审批状态 / 撤回

---

#### 2.3.5 基础数据选择器(Picker/Selector 族)

qxy-mop 中大量使用下拉选择基础数据(公司/部门/员工/经销商/仓库/商品/分类/地区),这些应该统一。

- [ ] **P0** `dict-select` —— 字典下拉选择(已存在 qxy-mop 的 `DictSelect.tsx`,需提升到组件库)
  - 自动从后端加载字典数据
  - 缓存策略(30min staleTime)
  - 支持 `useDict(categoryCode)` Hook

- [ ] **P1** `company-picker` —— 公司选择器
  - 基于 Select/Combobox,支持搜索
  - 对标: qxy-mop departments 页的 TreeSelect 公司选择

- [ ] **P1** `department-picker` —— 部门选择器(支持树形)
  - 基于 tree-select
  - 对标: qxy-mop departments 页

- [ ] **P1** `employee-picker` —— 员工选择器
  - 基于 Select,支持姓名/工号搜索
  - 对标: qxy-mop 所有"业务员"字段

- [ ] **P1** `distributor-picker` —— 经销商选择器
  - 基于 Select/Combobox,支持编码/名称/助记码搜索
  - 对标: qxy-mop order/create 的经销商 Select

- [ ] **P1** `sku-picker` —— 商品/SKU 选择器
  - 支持: 搜索 / 分类树过滤 / 带入默认价
  - 对标: qxy-mop order/create 的商品 Select

- [ ] **P1** `warehouse-picker` —— 仓库选择器
  - 对标: qxy-mop base-data/warehouses

- [ ] **P1** `region-picker` —— 行政区划选择器(树形级联)
  - 支持: 省/市/区 三级联动
  - 对标: qxy-mop base-data/regions

- [ ] **P1** `product-category-picker` —— 商品分类选择器(树形)
  - 对标: qxy-mop base-data/product-categories + products 页左侧树

- [ ] **P2** `cost-center-picker` —— 成本中心选择器
- [ ] **P2** `customer-picker` —— 客户选择器(含经销商/终端)

---

#### 2.3.6 营销/促销专属(Marketing & Promotion)

- [ ] **P1** `promotion-rule-editor` —— 促销规则编辑器
  - 规则类型: 搭赠 / 满赠 / 满减 / 买A送B / 阶梯返利 / 终端奖励
  - 每种规则类型有不同的字段模板
  - 对标: qxy-mop marketing/policy

- [ ] **P1** `promotion-rule-card` —— 促销规则展示卡
  - 展示: 触发条件 / 奖励 / 配额使用
  - 对标: qxy-mop marketing/policy 的 Table 行

- [ ] **P1** `budget-allocator` —— 预算分配组件
  - 按区域/产品/时间拆分预算
  - 对标: qxy-mop marketing/pool

- [ ] **P2** `campaign-calendar-enhanced` —— 营销活动日历增强(已有 campaign-calendar,需增强)
  - 日历视图 + 甘特视图切换
  - 活动状态颜色标记

---

#### 2.3.7 对账/财务专属(Reconciliation & Finance)

- [ ] **P1** `reconciliation-summary` —— 对账摘要
  - 字段: 账期 / 经销商 / 订单金额 / 费用扣减 / 应付净额
  - 对标: qxy-mop expense/reconciliation

- [ ] **P1** `settlement-status-tag` —— 结算状态标签(签认/有异议)
  - 对标: qxy-mop reconciliation 的 statusMap

- [ ] **P1** `sign-action-button` —— 签认操作按钮
  - 根据状态显示: 待签认→签认按钮 / 已签认→查看明细
  - 对标: qxy-mop reconciliation 的"签认/明细"按钮

- [ ] **P2** `invoice-manager` —— 发票管理组件
- [ ] **P2** `payment-schedule` —— 付款计划组件

---

#### 2.3.8 单据打印 & 输出(Document Output)

- [ ] **P2** `bill-print-template` —— 单据打印模板
  - 基于 CSS @media print
  - 自动分页 / 表头重复 / 页码
  - 对标: 所有单据页未来都需要打印

- [ ] **P2** `barcode-display` —— 条码展示(EAN-13 / Code-128)
- [ ] **P2** `qrcode-display` —— 二维码展示

---

#### 2.3.9 通用业务增强 Hooks

- [ ] **P0** `use-message` Hook —— 替代 antd `App.useApp()` 的 message 静态调用
- [ ] **P0** `use-modal` Hook —— 替代 antd `Modal.confirm` 的命令式 API
- [ ] **P0** `use-notification` Hook —— 全局通知
- [ ] **P1** `use-dict(categoryCode)` Hook —— 字典加载(已存在 qxy-mop 的 `useDict.ts`,需提升到组件库)
- [ ] **P1** `use-pagination` Hook —— 已存在,需补充完整测试
- [ ] **P1** `use-table` Hook —— Table 数据加载/分页/排序/筛选/选中的完整封装
- [ ] **P1** `use-form-table` Hook —— Form + Table 联动(搜索+表格联动)
- [ ] **P1** `use-crud` Hook —— 增删改查全套(CRUD 操作 + 列表加载 + 表单弹窗)
- [ ] **P1** `use-bill` Hook —— 单据状态机(Draft→Pending→Approved/Rejected + 存草稿/提交/审批/驳回/撤回)
- [ ] **P1** `use-approval` Hook —— 审批流(当前节点/可操作/提交审批)
- [ ] **P1** `use-line-editor` Hook —— 明细行编辑(增删改行/自动计算/合计)
- [ ] **P2** `use-print` Hook —— 打印
- [ ] **P2** `use-export` Hook —— 数据导出(Excel/CSV)
- [ ] **P2** `use-import` Hook —— 数据导入(Excel 解析)
- [ ] **P1** `use-permission` Hook —— 按钮级权限(`can(code)` / `cannot(code)`)
- [ ] **P1** `use-data-scope` Hook —— 行级数据权限过滤
- [ ] **P1** `use-websocket` Hook —— 实时订阅(订单状态/审批/通知)
- [ ] **P1** `use-sse` Hook —— Server-Sent Events
- [ ] **P1** `use-async-task` Hook —— 异步任务(导出/对账)轮询
- [ ] **P2** `use-print` Hook —— 打印
- [ ] **P2** `use-export` Hook —— 数据导出(Excel/CSV)
- [ ] **P2** `use-import` Hook —— 数据导入(Excel 解析)

#### 2.3.10 数据导入导出 (Import & Export)

> ERP 场景每天有大量数据进出,导错/导崩/导入失败导致脏数据是最常见的事故源。

- [ ] **P0** `export-button` —— 通用导出按钮
  - Props: `columns` / `dataSource` / `filename` / `format`('xlsx' | 'csv' | 'pdf') / `async`
  - 能力: 列配置(可隐藏/重命名/格式化) / 表头分组 / 多 Sheet / 大数据走异步任务
  - 同步模式: ≤ 1w 行
  - 异步模式: > 1w 行 → 提交到任务中心,完成后通知下载
  - 对标: qxy-mop 所有列表页"导出"按钮

- [ ] **P0** `import-dialog` —— 通用导入弹窗
  - Props: `templateUrl` / `templateColumns` / `parseMode` / `onSuccess`
  - 流程: 下载模板 → 上传文件 → 解析预览(表格) → 错误行高亮(红色+悬浮提示) → 确认导入
  - 能力: 增量/全量、字段映射、重复数据检测(按主键/唯一索引)
  - 对标: qxy-mop 商品/经销商批量导入

- [ ] **P0** `template-download` —— 模板下载组件
  - Props: `columns` / `filename` / `sampleData` / `instructions`
  - 支持带说明 Sheet(列含义/填写示例/校验规则)

- [ ] **P1** `import-error-table` —— 导入错误行明细表
  - 列: 行号 / 错误字段 / 错误信息 / 原始值 / 建议值
  - 支持: 导出错误行(方便用户修正后重导)

- [ ] **P1** `batch-print-dialog` —— 批量打印弹窗
  - Props: `template` / `selectedRows` / `preview`
  - 支持: 单据/发票/合同/发货单 的连续纸/自定义纸张套打
  - 集成 `barcode-display` / `qrcode-display`

- [ ] **P1** `print-template-builder` —— 打印模板配置器
  - 拖拽: 字段/文本/图片/二维码/条码/分隔线
  - 实时预览
  - 纸张: A4/A5/自定义(80mm 热敏/连续纸)
  - 页边距/分页符/表头重复

#### 2.3.11 看板/甘特/日历 (Alternative Views)

> 表格之外,中后台的三大杀手锏视图。

- [ ] **P0** `kanban-board` —— 看板
  - Props: `columns`(状态列定义) / `cards` / `onCardMove` / `onCardClick`
  - 能力: 拖拽改状态(`dnd-kit` 已依赖) / 列汇总 / 卡片统计 / 拖拽到具体列时触发状态机
  - 场景: 订单流转(待审核→已审核→已发货) / 工单 / 任务
  - 对标: qxy-mop 销售订单看板

- [ ] **P1** `kanban-column` —— 看板列(单列)
  - Props: `status` / `title` / `count` / `color` / `limit`(WIP 限制) / `cards`

- [ ] **P1** `gantt-chart` —— 甘特图
  - Props: `tasks` / `viewMode`('day' | 'week' | 'month' | 'quarter') / `dependencies`
  - 能力: 任务条/里程碑/依赖线/进度条/关键路径
  - 场景: 排产/项目进度/营销活动排期

- [ ] **P1** `calendar-view` —— 日历视图
  - Props: `events` / `view`('month' | 'week' | 'day' | 'agenda') / `date`
  - 能力: 拖拽改期 / 重复事件 / 全天事件 / 颜色分类
  - 场景: 排班/营销活动/订单交付

- [ ] **P1** `resource-schedule` —— 资源排期(甘特增强)
  - 资源维度: 产线/车辆/人员/仓库
  - 时间维度: 日/周/月
  - 冲突检测

- [ ] **P1** `timeline-view` —— 横向时间线视图(已 `timeline` 基础)
  - 横向滚动 / 缩放 / 事件区间

- [ ] **P0** `chart-suite` —— 图表套件(ECharts 包装)
  - 子组件: `line-chart` / `bar-chart` / `pie-chart` / `radar-chart` / `scatter-chart`
  - Props: `data` / `xField` / `yField` / `series` / `theme` / `responsive`
  - 能力: tooltip/legend/legend 联动/数据缩放/动画/响应式
  - 对标: qxy-mop dashboard 业绩趋势图

- [ ] **P1** `funnel-chart` —— 漏斗图
- [ ] **P1** `gauge-chart` —— 仪表盘
- [ ] **P1** `heatmap-chart` —— 热力图
- [ ] **P1** `map-chart` —— 地图(中国/省/市,基于 GeoJSON)
- [ ] **P1** `dashboard-canvas` —— 仪表盘画布(栅格拖拽)
  - 用户可自由调整卡片位置/大小/添加删除
  - 布局持久化

#### 2.3.12 权限矩阵组件 (Permission Wrappers)

> 企业级中后台的灵魂,不做权限 = 玩具。

- [ ] **P0** `permission-wrapper` —— 权限包裹组件
  - Props: `code`(权限码,如 `'order:approve'`) / `fallback`(无权限时显示)
  - 包裹按钮/菜单/字段/任意内容
  - 用法: `<PermissionWrapper code="order:approve"><Button>审批</Button></PermissionWrapper>`
  - 集成 `use-permission` Hook

- [ ] **P0** `data-scope-filter` —— 数据范围过滤高阶组件
  - Props: `scope`(组织/区域/部门) / `data`
  - 自动按当前用户的数据范围裁剪 dataSource
  - 配合 `use-data-scope` Hook

- [ ] **P0** `field-mask` —— 字段脱敏
  - Props: `value` / `mask`(脱敏规则: 手机/身份证/银行卡/邮箱/姓名)
  - 能力: 显示态/编辑态切换 / 复制时还原 / 脱敏规则可自定义
  - 场景: 客户手机号/银行卡号/身份证号

- [ ] **P0** `forbidden` —— 无权限占位
  - 默认显示: 灰色蒙层 + "暂无权限"图标 + 申请权限按钮
  - 可作为 `PermissionWrapper` 的默认 `fallback`

- [ ] **P1** `with-permission` HOC —— 高阶组件形式
  - 拦截 props 级别权限,不渲染整个子树

- [ ] **P1** `permission-button` —— 按钮级权限封装(基于 `button` 增强)
  - 自动: 无权限时 disabled + tooltip 提示

#### 2.3.13 任务中心 & 异步操作 (Async Task Center)

- [ ] **P0** `async-task-trigger` —— 异步任务触发器
  - Props: `taskType` / `params` / `onComplete`
  - 能力: 调用 API 提交任务 → 弹出任务中心 → 轮询进度 → 完成后下载

- [ ] **P0** `async-task-center` —— 异步任务中心
  - 全局抽屉/弹窗入口
  - 列表: 任务类型/状态(待处理/进行中/完成/失败)/进度条/操作时间/操作人
  - 能力: 取消任务/重试任务/下载结果/查看日志
  - WebSocket 推送实时进度

- [ ] **P1** `task-progress` —— 任务进度条
  - Props: `percent` / `status` / `message`
  - 集成到 Modal/Drawer 头部

- [ ] **P1** `task-history` —— 历史任务记录
  - 按时间倒序 / 按类型筛选 / 按状态筛选

#### 2.3.14 通知中心 (Notification Center)

- [ ] **P0** `notification-bell` —— 顶部铃铛(Header 用)
  - Props: `count` / `onClick`
  - 红点徽标 / 数字徽标 / 动画

- [ ] **P0** `notification-drawer` —— 通知中心抽屉
  - 分类: 审批待办 / 系统消息 / 业务消息 / 公告
  - 列表: 已读/未读 / 全部已读 / 跳转链接
  - Tab 切换 / 筛选 / 搜索

- [ ] **P0** `announcement-banner` —— 站内公告横幅
  - Props: `announcements` / `dismissible` / `priority`
  - 能力: 优先级排序 / 关闭后不再显示 / 跳转详情
  - 顶置 / 浮窗 / 全屏三种模式

- [ ] **P1** `message-list` —— 消息列表(站内信)
  - Props: `messages` / `onRead` / `onClick`
  - 能力: 全部已读 / 单条已读 / 跳转到业务对象

- [ ] **P1** `im-message` —— IM 消息气泡(企微/钉钉对接,聊天体系完整版见 §2.4.1)
  - 文本/图片/文件/卡片/系统消息

#### 2.3.15 体验增强 (UX Enhancements)

> 这些"小东西"是产品力和细节质感的差距来源。

- [ ] **P0** `error-boundary` —— 错误边界
  - Props: `fallback` / `onError` / `level`('page' | 'component' | 'widget')
  - 能力: 局部崩溃不雪崩 / 错误上报 / 重试按钮 / 反馈入口
  - 全局兜底: 路由级 ErrorBoundary

- [ ] **P0** `global-loading` —— 全局加载条
  - 顶部进度条(类似 NProgress)
  - 接入: `api-client` 的请求拦截器

- [ ] **P0** `page-loading` —— 页面级骨架屏(已有 `loading-page`,需细化为骨架)
  - Props: `rows` / `cols` / `layout`
  - 内置多种模板: 列表页骨架/详情页骨架/表单页骨架

- [ ] **P0** `watermark` —— 水印(已 P1,提升到 P0)
  - Props: `text` / `content` / `rotate` / `gap` / `fontSize` / `opacity` / `zIndex`
  - 双模式: SVG / Canvas
  - 能力: 平铺/单点/对角线/自定义
  - 场景: 防截图追溯(后台所有页默认开启)

- [ ] **P0** `empty-state` 加强 —— 已有,需扩展预设
  - 预设场景: 无数据/无权限/无网络/无搜索结果/404/500/维护中/加载失败
  - 统一规范: 插画 + 主文案 + 副文案 + 操作按钮

- [ ] **P1** `feature-tour` —— 新功能引导(Guided Tour)
  - Props: `steps` / `run` / `onFinish`
  - 能力: 高亮目标元素 / 步骤气泡 / 前进/后退/跳过
  - 集成: 新版本引导 / 角色引导 / 主动 tour

- [ ] **P1** `keyboard-shortcut` —— 全局快捷键
  - Props: `bindings`(key + handler) / `scope`
  - 能力: 显示快捷键面板(Ctrl+/) / 跨平台(Mac/Win)/ 防冲突

- [ ] **P1** `command-palette` 加强 —— 命令面板(已有,需加深)
  - 命令来源: 路由/组件/操作/API
  - 模糊匹配 / 历史记录 / 收藏

- [ ] **P1** `fullscreen-toggle` —— 全屏切换
  - 集成 `requestFullscreen` / 退出全屏监听

- [ ] **P1** `theme-switcher` 加强 —— 主题切换(已有,需加深)
  - 浅色/深色/跟随系统 / 品牌色选择 / 字体大小(小/中/大)

- [ ] **P1** `preference-panel` —— 个性化设置面板
  - 集成: 主题/字体大小/语言/布局密度(紧凑/默认/宽松)
  - 用户偏好持久化

- [ ] **P2** `image-viewer` 加强 —— 图片查看器(已有,需加深)
  - Props: `images` / `onIndexChange`
  - 能力: 缩放/旋转/翻转/左右切换/全屏/下载

- [ ] **P2** `split-pane` —— 可拖拽分屏
- [ ] **P2** `dock-panel` —— 可停靠面板
- [ ] **P2** `tab-pin` —— 标签页钉住(防误关)

#### 2.3.16 附件管理 (Attachment)

- [ ] **P0** `attachment-uploader` —— 附件上传器(已有 `file-upload`,需加强)
  - Props: `accept` / `maxSize` / `maxCount` / `multiple` / `directory`
  - 能力: 拖拽上传 / 粘贴上传 / 断点续传 / 秒传(Hash) / 上传进度 / 失败重试
  - 类型: 图片/PDF/Office/压缩包/任意

- [ ] **P0** `attachment-list` —— 附件列表
  - Props: `files` / `onDelete` / `onDownload` / `readonly`
  - 展示: 文件名/大小/上传人/上传时间/类型图标
  - 操作: 预览/下载/删除/分享

- [ ] **P0** `attachment-preview` —— 附件预览
  - 能力: 图片直接预览 / PDF 在线预览 / Office 文档(转 PDF) / 视频播放 / 音频播放
  - 集成 `image-viewer`

- [ ] **P1** `image-gallery` —— 图片画廊(多图展示)
  - 布局: 网格/瀑布流/轮播
  - 能力: 点击放大/批量上传/拖拽排序/封面设置

- [ ] **P1** `file-card` —— 单文件卡片
  - Props: `file` / `progress` / `status`
  - 场景: 上传中/上传完成/失败/暂停

- [ ] **P1** `paste-upload` —— 剪贴板粘贴上传
  - 监听 `paste` 事件,自动上传图片

#### 2.3.17 单据编号 & 编号规则 (Sequence)

- [ ] **P1** `sequence-preview` —— 编号预览
  - Props: `rule`(前缀+日期格式+流水位数+校验位) / `previewCount`
  - 能力: 实时预览生成结果 / 规则配置可视化

- [ ] **P1** `sequence-input` —— 编号输入
  - Props: `rule` / `autoGenerate` / `onChange`
  - 场景: 单据编号 / 客户编码 / 商品编码

#### 2.3.18 表单设计器 / 工作流设计器 (Low-Code)

> 这两块是 P2 长期投入,前期可先做"骨架",再迭代。

- [ ] **P2** `form-designer` —— 表单设计器
  - 左: 字段面板(拖拽源)
  - 中: 画布(可视化布局)
  - 右: 属性面板(字段配置/校验/联动)
  - 字段类型: input/select/date/number/upload/textarea/richtext/signature/...
  - 能力: 字段联动 / 显隐规则 / 校验规则 / 权限字段 / 数据回填
  - 产出: JSON Schema → 渲染到 `form-designer-runtime`

- [ ] **P2** `form-designer-runtime` —— 表单渲染器
  - 入参: 表单 JSON Schema
  - 能力: 渲染/校验/提交/回显

- [ ] **P2** `workflow-designer` —— 工作流设计器
  - 节点类型: 审批人/条件/分支/并行/会签/或签/加签/转签/抄送/子流程/结束
  - 画布: 节点拖拽 / 连线 / 配置面板
  - 产出: 流程定义 JSON

- [ ] **P2** `workflow-preview` —— 流程预览
  - 静态预览定义的工作流图

- [ ] **P2** `rule-editor` —— 规则编辑器(简单 DSL)
  - 场景: 价格规则 / 促销规则 / 审批规则
  - 能力: 条件/动作/优先级/启用时段

#### 2.3.19 移动端组件族 (Mobile UI)

> 触屏不是响应式,需要专门组件。

- [ ] **P2** `mobile-page-shell` —— 移动页面骨架
  - 顶栏(返回+标题+操作) / 底部安全区 / 滑动手势

- [ ] **P2** `mobile-action-sheet` —— 底部动作面板(iOS 风格)
  - Props: `actions` / `cancelable`
  - 能力: 选项/危险操作/自定义内容

- [ ] **P2** `mobile-picker` —— 移动选择器
  - 类型: 单列/多列/级联/日期/时间/省市区
  - 能力: iOS 滚轮 / Android 弹窗双模式

- [ ] **P2** `mobile-camera` —— 相机组件
  - 拍照 / 录像 / 扫码 / 闪光灯 / 切换前后摄像头

- [ ] **P2** `mobile-qrcode-scanner` —— 二维码扫描
  - 集成: `qr-scanner` 或 `html5-qrcode`

- [ ] **P2** `mobile-signature` —— 手写签名
  - Canvas 签名 / 清除 / 保存为 PNG

- [ ] **P2** `mobile-geolocation` —— 定位组件
  - 集成: `navigator.geolocation` / 高德/腾讯地图
  - 能力: 单次定位/持续追踪/逆地理编码

- [ ] **P2** `mobile-pull-refresh` —— 下拉刷新
- [ ] **P2** `mobile-infinite-scroll` —— 触底加载
- [ ] **P2** `mobile-swipe-action` —— 滑动操作(左滑删除/右滑更多)
- [ ] **P2** `mobile-tab-bar` —— 底部 Tab Bar
- [ ] **P2** `mobile-list-item` —— 列表项
  - Props: `title` / `description` / `extra` / `arrow`

### 2.4 必须新增的 layout 布局组件

- [ ] **P0** `admin-sider` —— 后台侧边栏(支持折叠/展开/路由联动/多级)
- [ ] **P0** `admin-header` —— 后台顶栏(Logo + Breadcrumb + UserMenu + 全局操作)
- [ ] **P0** `admin-tabs` —— 标签页导航(支持右键菜单: 关闭/关闭其他/关闭右侧/关闭全部/刷新)
- [ ] **P0** `admin-breadcrumb` —— 自动从 pathname 生成面包屑
- [ ] **P1** `split-screen` —— 左右分屏布局
- [ ] **P1** `article-layout` —— 长文/帮助文档布局
- [ ] **P1** `print-template-layout` —— 打印模板布局
- [ ] **P1** `embed-layout` —— 嵌入第三方系统布局(隐藏 Sider/Header)
- [ ] **P2** `wizard-layout` —— 向导式分步布局
- [ ] **P1** `chat-layout` —— 对话式布局(消息流 + 输入区,详见 §2.4.1)

### 2.4.1 对话/聊天体系 (Chat & Conversation System)

> 覆盖人-人(IM/企微/客服) + 人-AI(大模型对话/Copilot/Agent) 两种模式,企业中后台 2026 的标配。

#### 布局 & 容器

- [ ] **P1** `chat-shell` —— 聊天页面骨架
  - Props: `sidebar` / `header` / `messagesArea` / `inputArea`
  - 三栏: 会话列表(Sidebar) + 消息区(主区) + 详情/资料(右侧可折叠)
  - 两栏: 消息区 + 输入区(嵌入侧边栏/Drawer 时)
  - 场景: 客服工作台 / 内部IM / AI 助手面板

- [ ] **P1** `chat-sidebar` —— 会话列表
  - Props: `conversations` / `activeId` / `onSelect` / `onCreate` / `onSearch`
  - 能力: 搜索/置顶/未读数/分组(今天/昨天/更早)/右键菜单(删除/置顶/免打扰/标记未读)
  - AI 模式新增: 按模型分组 / 按场景分组(问询/写作/代码/分析)

- [ ] **P1** `chat-header` —— 对话顶栏
  - Props: `title` / `subtitle` / `status` / `actions`(搜索/设置/成员/更多)
  - 人-人: 对方头像 + 名称 + 在线状态 + 音视频按钮
  - 人-AI: 模型图标 + 模型名 + Token 用量 + 上下文长度 + 模型切换

#### 消息 & 气泡

- [ ] **P1** `chat-message` —— 消息气泡(增强已有组件)
  - Props: `role`('user' | 'assistant' | 'system' | 'notification') / `content` / `avatar` / `name` / `time` / `status` / `actions`
  - 人-人消息类型: 文本 / 图片 / 文件 / 语音 / 视频 / 位置 / 名片 / 卡片(订单/商品/审批单)
  - 人-AI 消息类型: 文本 / Markdown 渲染 / 代码块(带语言标识+复制按钮) / 表格 / 思考链(thinking) / 工具调用(tool-call) / 图片生成 / 图表
  - 统一: 头像 + 名称 + 时间 + 消息体 + 状态(发送中/已发/已读/失败) + 操作(撤回/删除/复制/编辑/重新生成)

- [ ] **P1** `chat-message-group` —— 消息分组(同一个人连续多条自动合并头像)
  - Props: `messages` / `sender` / `collapsible`

- [ ] **P1** `chat-message-actions` —— 消息操作栏(悬浮显示)
  - 人-人: 回复 / 转发 / 复制 / 撤回 / 删除 / 多选
  - 人-AI: 复制 / 重新生成 / 点赞/点踩 / 编辑提示 / 引用 / 分享

- [ ] **P1** `chat-thinking-block` —— AI 思考过程展示
  - Props: `content` / `duration` / `collapsed`
  - 折叠态: "思考中..." / "已思考 12s" 点击展开
  - 展开态: 思考链文本 + 耗时

- [ ] **P1** `chat-tool-call-block` —— AI 工具调用展示
  - Props: `toolName` / `toolInput` / `toolOutput` / `status`('calling' | 'success' | 'error')
  - 场景: 查询数据库 / 调用 API / 执行代码 / 搜索网页
  - 展示: 调用中(Loading 骨架) / 成功(结果摘要) / 失败(错误信息+重试)

- [ ] **P1** `chat-code-block` —— 代码块(增强渲染)
  - Props: `code` / `language` / `filename` / `diff`
  - 能力: 语法高亮(Shiki/Prism) / 行号 / 复制按钮 / 折叠长代码 / diff 高亮(增/删/改行) / 在沙箱中运行

- [ ] **P1** `chat-markdown-renderer` —— Markdown 渲染器(AI 专用)
  - 能力: 标题/列表/表格/代码块/数学公式(KaTeX)/Mermaid 图表/HTML 安全渲染
  - 图片: 懒加载 / 点击放大
  - 链接: 外部链接安全跳转

- [ ] **P1** `chat-card-message` —— 卡片消息(结构化)
  - Props: `title` / `description` / `thumbnail` / `metadata` / `actions`
  - 场景:
    - 人-人: 订单卡片 / 审批单卡片 / 商品卡片 / 文件卡片
    - 人-AI: 查询结果卡片 / 天气卡片 / 股票卡片 / 函数调用结果卡片

- [ ] **P2** `chat-image-gallery` —— 图片消息组(多图横滑/网格)
- [ ] **P2** `chat-voice-message` —— 语音消息(播放/波形/时长)

#### 输入区

- [ ] **P1** `chat-input` —— 聊天输入框(核心)
  - Props: `value` / `onChange` / `onSend` / `placeholder` / `disabled` / `maxLength`
  - 能力:
    - 多行自适应(1-6 行自动扩展,超出滚动)
    - Shift+Enter 换行 / Enter 发送(可配置)
    - @提及(弹出 Picker) / 命令斜杠 `/`(触发命令面板)
    - 粘贴图片自动预览 / 拖拽文件上传
    - 发送前确认(Shift+Enter 不发 / Ctrl+Enter 发 / 可自定义)
  - AI 增强:
    - 停止生成按钮(流式输出中切换)
    - Token 计数 + 剩余上下文显示
    - System Prompt 预览/编辑入口

- [ ] **P1** `chat-input-toolbar` —— 输入框工具栏
  - 人-人: 表情 / 图片 / 文件 / 语音 / 视频 / 位置 / 名片
  - 人-AI: 附件上传(RAG) / 网页链接 / 代码片段 / System Prompt / 模型切换 / 温度滑条
  - Props: `tools`(可用工具列表) / `onToolClick`

- [ ] **P2** `chat-mention-picker` —— @提及选择器
  - Props: `users` / `groups` / `bots` / `aiModels`
  - 搜索: 姓名/工号/AI 模型名

- [ ] **P2** `chat-command-menu` —— 斜杠命令菜单
  - Props: `commands`(命令列表) / `onSelect`
  - 内置: /clear / /summarize / /translate / /code

#### AI 专属交互

- [ ] **P1** `chat-streaming-text` —— 流式文本输出
  - Props: `chunks` / `isStreaming` / `speed`(打字速度)
  - 能力: 逐字/逐词渲染 + 闪烁光标 + 流式 Markdown 渲染
  - 性能: requestAnimationFrame 批量刷新 / 虚拟化长对话

- [ ] **P1** `chat-suggest-replies` —— AI 建议回复(快捷按钮)
  - Props: `suggestions`(建议文案数组) / `onSelect`
  - 场景: 回答完后展示 3-5 个追问建议 / 用户不知问啥时的引导

- [ ] **P1** `chat-context-panel` —— 上下文管理面板
  - Props: `attachments` / `systemPrompt` / `model` / `tokens`
  - 能力: 查看/增删附件 / 查看 System Prompt / Token 用量统计 / 上下文窗口可视化
  - 场景: 长对话上下文不足时提醒 / 附件管理 / 文档问答(RAG)

- [ ] **P1** `chat-model-switcher` —— 模型切换
  - Props: `models` / `active` / `onChange`
  - 展示: 模型图标 + 名称 + 能力标签(推理/视觉/代码/工具) + 速度/质量/成本 指标

- [ ] **P2** `chat-agent-status` —— Agent 执行状态
  - Props: `steps`(多步执行链) / `currentStep` / `status`
  - 展示: 步骤列表(思考→调用工具→处理结果→生成回答) + 每步状态 + 耗时
  - 场景: ReAct Agent / Function Calling 链

- [ ] **P2** `chat-artifact-panel` —— Artifact 侧面板(代码/文档实时预览)
  - 双栏: 左侧代码 / 右侧预览(HTML/React/SVG)
  - 场景: AI 生成代码/图表/文档时实时预览

- [ ] **P2** `chat-feedback` —— 回复反馈组件
  - 点赞/点踩 / 原因选择(准确/不相关/违规/不完整) / 自由文本反馈
  - 反馈数据回传,用于模型微调/RLHF

#### 会话管理

- [ ] **P1** `chat-conversation` —— 单个会话对象(数据模型 + UI)
  - Props: `id` / `title` / `messages` / `model` / `createdAt` / `pinned`
  - 能力: 重命名 / 删除 / 导出 / 分享 / 置顶

- [ ] **P1** `chat-conversation-search` —— 会话内搜索
  - Props: `keyword` / `results` / `onJump`
  - 能力: 高亮匹配 / 上一个/下一个 / 定位滚动

- [ ] **P2** `chat-branch` —— 对话分支(Fork 叉路)
  - 从某条消息分叉,走不同路线探索
  - 展示: 消息树 ← 此条消息有分支 → 切换分支

- [ ] **P2** `chat-shared-link` —— 分享对话链接
  - 生成可读的对话快照页面 / 带水印 / 可设置过期时间

### 2.5 必须新增的 hooks

- [ ] **P0** `use-breakpoint` —— 响应式断点(lg/md/sm/xs)
- [ ] **P0** `use-event-listener` —— DOM 事件订阅
- [ ] **P0** `use-key` / `use-key-combo` —— 键盘事件
- [ ] **P0** `use-click-away` —— 点击外部关闭(已有 use-click-outside,统一命名)
- [ ] **P1** `use-network-status` —— 离线/在线
- [ ] **P1** `use-visibility-change` —— 页面可见性
- [ ] **P1** `use-window-size` —— 窗口尺寸
- [ ] **P1** `use-scroll` / `use-scroll-direction` —— 滚动监听
- [ ] **P1** `use-orientation` —— 横竖屏
- [ ] **P1** `use-clipboard` —— 剪贴板(已有 use-copy-to-clipboard,统一命名)
- [ ] **P1** `use-form` —— 表单状态封装(基于 RHF)
- [ ] **P1** `use-fetch` / `use-swr` —— 数据请求
- [ ] **P2** `use-undo` / `use-redo` —— 撤销/重做
- [ ] **P2** `use-idle` —— 空闲检测
- [ ] **P2** `use-network-quality` —— 网络质量

### 2.6 必须新增的 lib 工具

- [ ] **P0** `storage` —— localStorage/sessionStorage 包装(过期/序列化/加密)
- [ ] **P0** `event-bus` —— 全局事件总线
- [ ] **P0** `download` —— 文件下载(Blob/URL/Stream)
- [ ] **P0** `cookie` —— Cookie 读写
- [ ] **P0** `url` —— URL 参数解析/序列化
- [ ] **P1** `date` —— 基于 date-fns 的扩展(相对时间/格式化/区间)
- [ ] **P1** `validation` —— 通用校验(手机/邮箱/身份证/银行卡/统一社会信用代码)
- [ ] **P1** `random` —— 随机数(范围/UUID/不重复序列)
- [ ] **P1** `tree` —— 树形数据操作(扁平化/树化/查找/路径)
- [ ] **P1** `color` —— 颜色工具(亮度/对比度/转换/调色板生成)
- [ ] **P1** `array` —— 数组操作(分组/排序/去重/分块/分页)
- [ ] **P2** `worker` —— Web Worker 池(用于大量数据处理)
- [ ] **P2** `excel` —— Excel 读写(基于 xlsx 或 exceljs)
- [ ] **P2** `pdf` —— PDF 生成(基于 jspdf/pdfmake)
- [ ] **P2** `image` —— 图片处理(压缩/裁剪/格式转换)
- [ ] **P2** `crypto` —— 加密(AES/RSA/SHA,基于 Web Crypto API)

---

## 三、测试 & 质量保证(Quality)

### 3.1 单元测试
- [ ] **P0** 安装 `@testing-library/react@19` + `@testing-library/jest-dom@6` + `@testing-library/user-event@14`
- [ ] **P0** 创建 `/vitest.setup.ts`(注册 jest-dom matchers, mock window.matchMedia 等)
- [ ] **P0** 编写所有 ui 基础组件的单元测试(每个组件至少 1 个 render + 1 个交互测试)
- [ ] **P0** 编写所有 hooks 的单元测试
- [ ] **P0** 编写所有 lib 工具的单元测试
- [ ] **P1** 编写所有 business 业务组件的单元测试(覆盖率 ≥ 60%)
- [ ] **P1** 提升 coverage 阈值到 `lines/branches/functions/statements = 85%`
- [ ] **P2** 引入 `playwright` 单元测试(浏览器环境)

### 3.2 Storybook 测试
- [ ] **P0** 补全所有 ui 组件的 .stories.tsx(已有 67 个 stories,验证覆盖率)
- [ ] **P0** 补全所有 business 组件的 .stories.tsx(已有 85 个 stories,验证覆盖率)
- [ ] **P0** 每个 Story 至少包含: Default / Size variants / Disabled / Error / Loading / Dark mode
- [ ] **P0** 每个 Story 至少一个 interaction 测试(`play` 函数)
- [ ] **P1** 启用 `test-storybook`(已配置 script,需完善 stories)
- [ ] **P1** 评估 `chromatic` Visual Regression Testing(已安装 `@chromatic-com/storybook`)
- [ ] **P2** 引入 `percy` / `playwright-visual` 作为备选 VRT 方案

### 3.3 可访问性 (a11y)
- [ ] **P0** 已有 `@storybook/addon-a11y` + `test: "error"`,验证所有 Story 通过
- [ ] **P0** 引入 `@axe-core/playwright` 到 E2E 流程
- [ ] **P0** 引入 `@axe-core/cli` 到 CI(已配置,需验证)
- [ ] **P1** 编写键盘导航测试(每个 interactive 组件)
- [ ] **P1** 引入 `pa11y` 补充扫描
- [ ] **P1** 为色盲/对比度添加自动化检测
- [ ] **P2** 引入 NVDA / VoiceOver 自动化(部分)

### 3.4 E2E 测试
- [ ] **P1** 引入 `@playwright/test`(已安装 `playwright`,需切换到 test runner)
- [ ] **P1** 编写组件库的 E2E 用例(每个 layout 至少 1 个)
- [ ] **P1** 引入 visual regression(e2e 截图比对)
- [ ] **P2** 性能测试(Lighthouse CI)
- [ ] **P2** 跨浏览器矩阵(Chrome / Firefox / Safari / Edge)

### 3.5 依赖与安全
- [ ] **P0** 启用 npm audit CI(已配置,需验证)
- [ ] **P0** 引入 `osv-scanner` 或 `snyk` 补充 SCA
- [ ] **P1** 引入 `npm-audit-resolver` 自动修复
- [ ] **P1** 评估 `socket.dev` 供应链安全扫描
- [ ] **P2** 引入 `gitleaks` 防密钥泄漏
- [ ] **P2** 引入 `trivy` 容器扫描(已有 Dockerfile)

---

## 四、CI/CD 流水线(DevOps)

### 4.1 GitHub Actions 工作流

现有:`detection.yml` (7 jobs) + `security.yml` (1 job)

需要新增:
- [ ] **P0** `.github/workflows/ci.yml` —— 主流水线(整合 detection 全流程,作为 PR 必过项)
- [ ] **P0** `.github/workflows/release.yml` —— 基于 tag 的 release + npm publish
- [ ] **P0** `.github/workflows/dependency-review.yml` —— 依赖审查
- [ ] **P1** `.github/workflows/storybook-deploy.yml` —— Storybook 自动部署到 Vercel/GH Pages
- [ ] **P1** `.github/workflows/chromatic.yml` —— Visual regression(若采用 Chromatic)
- [ ] **P1** `.github/workflows/labeler.yml` —— 自动 PR/Issue 标签
- [ ] **P1** `.github/workflows/stale.yml` —— 自动关闭陈旧 Issue
- [ ] **P1** `.github/workflows/codeql.yml` —— CodeQL 静态分析
- [ ] **P2** `.github/workflows/dependabot-merge.yml` —— 自动合并 Dependabot PR
- [ ] **P2** `.github/workflows/nightly.yml` —— 夜间构建(测长尾)

### 4.2 必备配置
- [ ] **P0** `.github/dependabot.yml` —— 自动依赖更新(每周)
- [ ] **P0** `.github/pull_request_template.md` —— PR 模板
- [ ] **P0** `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] **P0** `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] **P1** `.github/CODEOWNERS` —— 文件所有权(自动指派 Reviewer)
- [ ] **P1** `.github/labeler.yml` —— 自动打标
- [ ] **P1** `.github/matchers/` —— 自定义 PR 注释格式

### 4.3 Commit 规范
- [ ] **P0** 引入 `@commitlint/cli` + `@commitlint/config-conventional`
- [ ] **P0** 创建 `.commitlintrc.json`
- [ ] **P0** Husky `commit-msg` 钩子: `npx --no-install commitlint --edit "$1"`
- [ ] **P1** 在 `lint-staged` 中加入 commit-msg 校验
- [ ] **P2** 评估 `cz-cli`(commitizen) 交互式提交

### 4.4 版本管理
- [ ] **P1** 评估 Changesets(替代手写 version)
- [ ] **P1** 评估 release-it
- [ ] **P2** 评估语义化发布(semantic-release)

### 4.5 部署
- [ ] **P1** Storybook 部署到 Vercel(已有 `vercel.json`,需确认)
- [ ] **P1** Storybook 部署到 GitHub Pages(备选)
- [ ] **P2** 文档站(基于 Storybook MDX 或独立 VitePress)

---

## 五、文档 & AI 友好性(Docs & AI)

### 5.1 必备文档

#### 项目级
- [ ] **P0** `/README.md` 升级(已有,需补充)
  - Logo + 简介 + Badge 链
  - 安装指南
  - 快速开始
  - 在线演示链接(Storybook)
  - 组件清单 + 链接
  - 主题/定制化
  - TypeScript 指南
  - 浏览器兼容性
  - 贡献指南链接
  - 许可证
  - Star 趋势 + 社区
- [ ] **P0** `/CHANGELOG.md`
- [ ] **P0** `/CONTRIBUTING.md`
- [ ] **P0** `/LICENSE` (MIT)
- [ ] **P0** `/SECURITY.md`
- [ ] **P1** `/docs/architecture.md` —— 整体架构说明
- [ ] **P1** `/docs/design-tokens.md` —— 设计令牌(色板/间距/字号/阴影/圆角/动画)
- [ ] **P1** `/docs/theming.md` —— 主题定制化(浅色/深色/品牌色/字体)
- [ ] **P1** `/docs/i18n.md` —— 国际化指南
- [ ] **P1** `/docs/migration.md` —— 迁移指南(antd/MUI/Element Plus → Chaos UI)
- [ ] **P1** `/docs/performance.md` —— 性能优化指南
- [ ] **P1** `/docs/testing.md` —— 测试编写指南
- [ ] **P2** `/docs/faq.md`

#### 组件级(每个组件必须有)
- [ ] **P0** JSDoc 注释:每个 export 组件、函数、类型
  - `description`(中文一行 + 英文一行)
  - `@param` / `@returns`
  - `@example` 至少 1 个
  - `@since` 版本号
  - `@deprecated` 标记(若适用)
- [ ] **P0** Storybook MDX 文档:每个组件一份 `.mdx` 文件
  - 标题 + 简介
  - 代码演示(嵌入 live story)
  - API 表格(自动从 props 提取)
  - 最佳实践 / 反模式
  - 可访问性说明
  - 性能说明(若有)
- [ ] **P0** Storybook `tags: ["autodocs"]`(已要求,验证全部组件)
- [ ] **P0** Storybook `parameters.docs.description.component` 设置

### 5.2 AI 友好性增强(关键!)

> AI(Copilot/Codex/Cursor/本地模型) 读仓库的能力直接决定开发效率,需要专门为它们准备材料。

#### 5.2.1 AI 规则文件矩阵

| 文件 | 服务于 | 优先级 | 说明 |
|------|--------|--------|------|
| `AGENTS.md` | 所有 AI | P0 | 已有,持续完善 |
| `CLAUDE.md` | Claude Code | P0 | Claude 专属规则 |
| `.cursorrules` | Cursor | P0 | Cursor 专属规则 |
| `.github/copilot-instructions.md` | GitHub Copilot | P1 | Copilot 专属 |
| `.codeium/instructions.md` | Codeium | P1 | Codeium 专属 |
| `.continue/rules.md` | Continue | P1 | Continue 专属 |
| `.windsurfrules` | Windsurf | P1 | Windsurf 专属 |
| `CONVENTIONS.md` | 所有 AI | P0 | 项目级编码规范 |
| `ARCHITECTURE.md` | 所有 AI | P0 | 架构说明 |
| `COMPONENT_INDEX.md` | 所有 AI | P0 | 组件清单 + 用途 + 链接 |
| `HOOKS_INDEX.md` | 所有 AI | P0 | hooks 清单 |
| `LIB_INDEX.md` | 所有 AI | P0 | 工具函数清单 |

#### 5.2.2 AI 提示词模板库

- [ ] **P0** `/docs/ai-prompts/component-new.md` —— AI 写新组件的提示词
- [ ] **P0** `/docs/ai-prompts/component-bugfix.md` —— 修 bug 的提示词
- [ ] **P0** `/docs/ai-prompts/story-new.md` —— 写 story 的提示词
- [ ] **P0** `/docs/ai-prompts/test-new.md` —— 写单测的提示词
- [ ] **P1** `/docs/ai-prompts/refactor.md` —— 重构的提示词
- [ ] **P1** `/docs/ai-prompts/migrate-antd.md` —— 从 antd 迁移的提示词

#### 5.2.3 机器可读元数据

- [ ] **P0** `/.well-known/ai-context.json` —— AI 上下文元数据
  - 项目类型 / 技术栈
  - 组件总数 / 分类
  - 入口导出列表
  - 设计令牌摘要
- [ ] **P0** 每个组件文件包含机器可读 frontmatter(注释)
  ```ts
  /**
   * @component Button
   * @category ui/primitives
   * @since 0.1.0
   * @description 通用按钮
   * @keywords button, action, click
   * @accessibility WAI-ARIA: button role
   * @example
   * <Button variant="primary" onClick={...}>点击</Button>
   */
  ```
- [ ] **P1** `/.llm-context/` 目录
  - `architecture-summary.md`(2-3k token 摘要)
  - `component-catalog.md`(纯组件清单)
  - `hooks-catalog.md`
  - `i18n-keys.md`
  - `common-patterns.md`(常见组合示例)

#### 5.2.4 搜索增强

- [ ] **P0** 安装/更新 CodeGraph(已有 `.codegraph/`,验证索引)
- [ ] **P0** 创建 `/docs/SYMBOLS.md` —— 关键符号索引(可由 codegraph 自动生成)
- [ ] **P1** 创建 `/docs/CHEATSHEET.md` —— 速查表
- [ ] **P1** 引入 `mcp` 配置(已有 `.mcp.json`,扩展)

### 5.3 Storybook 文档

> **结构约定**(2026-06-28 起):`src/intro/` 下不再放裸 MDX,而是按语言分子目录:
> - `src/intro/zh/<key>.mdx` —— `<Meta title="中文/<标题>">`
> - `src/intro/en/<key>.mdx` —— `<Meta title="English/<Title>">`
> - `src/intro/{zh,en}/home.mdx` —— 互跳落地页
> - 侧边栏自动出现 `中文/` 与 `English/` 两个分组;消费者点选即切换
> - 代码块统一保持英文(只翻译说明文字)
>
> 旧 `src/intro/*.mdx` 已清空,避免侧边栏重复条目。

- [x] **P0** `src/intro/{zh,en}/getting-started.mdx` —— 快速开始(中英双语)
- [x] **P0** `src/intro/{zh,en}/installation.mdx` —— 安装(中英双语,顺手移除 `@/components/ui/tabs` 不存在 import)
- [x] **P0** `src/intro/{zh,en}/theming.mdx` —— 主题(中英双语)
- [x] **P0** `src/intro/{zh,en}/i18n.mdx` —— 国际化(中英双语)
- [x] **P0** `src/intro/{zh,en}/accessibility.mdx` —— 可访问性(中英双语)
- [x] **P0** `src/intro/{zh,en}/introduction.mdx` —— 介绍 / Introduction(中英双语,本次新增双语版本)
- [x] **P0** `src/intro/{zh,en}/component-guidelines.mdx` —— 组件指南 / Component Guidelines(中英双语,本次新增双语版本)
- [x] **P0** `src/intro/{zh,en}/design-tokens.mdx` —— 设计令牌 / Design Tokens(中英双语,本次新增双语版本)
- [x] **P0** `src/intro/{zh,en}/home.mdx` —— 中英互跳落地页(本次新增)
- [ ] **P1** `src/intro/{zh,en}/migration.mdx` —— 迁移指南
- [ ] **P1** `src/intro/{zh,en}/roadmap.mdx` —— 路线图
- [ ] **P1** `src/intro/{zh,en}/changelog.mdx` —— 变更日志
- [ ] **P1** 为每个组件创建 `<ComponentName>.mdx` 文档

#### 5.3.1 Menu/Message/Modal 静态 API(2026-06-28 增量)

> 补齐对标 antd 的关键 API,完善 `qxy-mop` 业务系统迁移与新业务开发所需的"命令式"反馈/导航能力。

- [x] **P0** `lib/message.ts` —— 静态 `message.{success,error,warning,info,loading,promise,destroy,config}` 顶层 API,包装 sonner 单例
- [x] **P0** `components/ui/message-provider.tsx` —— `<MessageProvider>` 挂载 `<Toaster>` 到 React 树根
- [x] **P0** `hooks/use-message.ts` —— 保留原 `useMessage()` hook(委托给 lib/message,向后兼容)
- [x] **P0** `lib/modal-store.tsx` —— 全局 Modal 仓库(`useSyncExternalStore` + `subscribe`/`getSnapshot`/`push`/`close`/`closeAll`)
- [x] **P0** `lib/modal.ts` —— 静态 `Modal.{confirm,info,warning,success,error,closeAll}` 顶层 API,支持 `onOk`/`onCancel` 异步 + 加载态
- [x] **P0** `components/ui/modal-provider.tsx` —— `<ModalProvider>` 渲染所有命令式 Modal;基于 `Dialog` + `@base-ui/react` 实现
- [x] **P0** `components/ui/menu.tsx` —— 垂直导航树:支持 `items` API + `Menu.Item/SubMenu/Divider/ItemGroup` 子组件 API;`mode: inline|vertical|horizontal`、`theme: light|dark`、`selectedKeys/openKeys/multiple/inlineCollapsed/inlineIndent/triggerSubMenuAction`;导出 `MenuProps` 类型
- [x] **P0** `src/stories/ui/Menu.stories.tsx` —— 7 个故事:InlineLight / InlineDark / VerticalLight / Horizontal / ChildComponentAPI / Collapsed / Controlled
- [x] **P0** `src/stories/ui/Message.stories.tsx` —— 2 个故事:Basic / WithDescription
- [x] **P0** `src/stories/ui/Modal.stories.tsx` —— 3 个故事:Confirm / WithAsyncOnOk / DisallowMaskClose
- [x] **P0** `components/ui/index.ts` + `lib/index.ts` 导出 `MessageProvider` / `ModalProvider` / `Menu` / `MenuItem` / `MenuSubMenu` / `MenuDivider` / `MenuItemGroup` / `MenuProps` / `message` / `Modal`
- [x] **P0** `tsc --noEmit` 通过(0 错误);`npm run build-storybook` 通过
- [x] **P0** Playwright 验证:点击 `Modal.confirm` 按钮→对话框弹出→点击 `删除` 按钮→关闭并触发 `onOk`;点击 `Success` 消息按钮→toast 弹出;Menu 多级子菜单展开/收起/选中

> 已知小瑕疵:MDX frontmatter `title:` 行在 docs 视图中仍作为可见文本显示(非新组件引入,沿用 §5.3 既有行为;可在后续将 `<Meta>` 抽为 MDX 包装器时统一处理)。

---

## 六、可访问性 (Accessibility)

- [ ] **P0** 所有 interactive 组件有 `aria-label` / `aria-describedby`
- [ ] **P0** 所有按钮/链接使用语义化元素(已配 `@chaos/no-raw-html-button`)
- [ ] **P0** 颜色对比度满足 WCAG AA(4.5:1)
- [ ] **P0** 键盘可访问(Tab/Shift+Tab/Enter/Space/Esc/方向键)
- [ ] **P0** 焦点可见(focus-visible 样式)
- [ ] **P0** 屏幕阅读器友好(语义化 HTML + ARIA)
- [ ] **P1** Reduced motion 支持(`@media (prefers-reduced-motion: reduce)`)
- [ ] **P1** High contrast 模式支持
- [ ] **P1** 全部组件 Storybook a11y 面板 0 violations

---

## 七、性能 (Performance)

- [ ] **P0** 所有大表使用虚拟化(`virtual-table` 已有,验证全部场景)
- [ ] **P0** 大量数据下拉使用 `virtual-list`
- [ ] **P0** 图标按需导入(已用 `lucide-react`,需配 tree-shaking)
- [ ] **P0** `lucide-react` 替换为内部 `@chaos/ui/icons`(已有,需替换)
- [ ] **P0** Bundle size 监控(`size-limit`, 单个组件入口 ≤ 5KB gzip)
- [ ] **P1** React Server Components 兼容性(已开 `rsc: true`,验证)
- [ ] **P1** Server-only 标记(API/数据库访问)
- [ ] **P1** 图片懒加载(Next.js Image)
- [ ] **P1** 代码分割(每个 layout 独立 chunk)
- [ ] **P2** Streaming SSR
- [ ] **P2** Web Vitals 监控
- [ ] **P2** Lighthouse Score ≥ 95

---

## 八、国际化 (i18n)

- [ ] **P0** 审计当前 i18n 资源文件(已用 i18next,确认 locale 资源目录)
- [ ] **P0** 创建 `/locales/zh-CN.json` + `/locales/en-US.json`
- [ ] **P0** 命名空间拆分:common / components / business / errors
- [ ] **P0** 提取所有硬编码中文到 i18n key
- [ ] **P0** ESLint 规则 `@chaos/no-hardcoded-chinese` 默认 error(目前 business/ 下 warn 豁免,需逐步去除)
- [ ] **P1** 添加 en-US / ja-JP / ko-KR
- [x] **P1** 文档站多语言(Storybook 侧边栏「中文/English」分组 + 首页互跳,2026-06-28)
- [x] **P1** Storybook locale 切换(已配 `@chaos/i18n` provider,验证通过)
- [ ] **P2** 数字/日期/货币本地化
- [ ] **P2** RTL 支持(已开 `rtl: false`,保留配置)

---

## 九、主题 & 设计令牌 (Theming)

- [ ] **P0** 审计 `app/globals.css` 设计令牌
- [ ] **P0** 颜色:主色 / 辅助色 / 语义色 / 中性色 (浅色 + 深色)
- [ ] **P0** 字体:字号 / 行高 / 字重
- [ ] **P0** 间距:基础单位 4px / 8 / 12 / 16 / 24 / 32 ...
- [ ] **P0** 圆角:sm / md / lg / full
- [ ] **P0** 阴影:sm / md / lg / xl
- [ ] **P0** 动画时长:fast / normal / slow
- [ ] **P0** 断点:xs / sm / md / lg / xl / 2xl
- [ ] **P0** 文档化所有令牌到 `/docs/design-tokens.md`
- [ ] **P1** 暴露 `tailwind-merge` 工具给消费方
- [ ] **P1** 提供 `tailwind.config.preset.js` 供消费方继承
- [ ] **P1** 主题切换 hook (`useTheme`)
- [ ] **P2** 主题生成器(可视化编辑)
- [ ] **P2** 多品牌主题(支持白标)

---

## 十、安全 (Security)

- [ ] **P0** 移除所有 console.log(已配 `no-console: warn`,需消除所有违规)
- [ ] **P0** 移除所有硬编码密钥(扫描 + 文档)
- [ ] **P0** API 客户端支持 Token 刷新(已有 useUserStore,需 ApiClient 集成)
- [ ] **P0** XSS 防护(react 默认转义,需审查 dangerouslySetInnerHTML)
- [ ] **P0** 依赖审计(已配 security.yml)
- [ ] **P1** CSP 兼容(为消费方提供 CSP 头建议)
- [ ] **P1** OAuth/SSO 集成示例
- [ ] **P1** 密码强度校验组件
- [ ] **P2** 加密工具(Web Crypto API 包装)
- [ ] **P2** 防爬虫/防爆破(限流提示组件)

---

## 十一、API & 数据交互 (Data Layer)

- [ ] **P0** `api-client` 增强
  - 自动注入 Token
  - 自动刷新 Token
  - 统一错误处理(ApiError)
  - 请求重试
  - 请求取消
  - 上传/下载进度
  - 并发控制
- [ ] **P0** `use-query` / `use-mutation` 增强包装(基于 @tanstack/react-query)
- [ ] **P0** `use-dict` Hook 提升(已在 `lib/`,需移至 `hooks/` 并完善)
- [ ] **P1** 离线缓存(PWA 准备)
- [ ] **P1** 乐观更新
- [ ] **P1** WebSocket 客户端(实时通知/数据)
- [ ] **P1** SSE 客户端
- [ ] **P2** GraphQL 客户端(若需要)

---

## 十二、开发者体验 (DX)

- [ ] **P0** 每个组件有 `.stories.tsx` + JSDoc + 单测
- [ ] **P0** 每个组件有 `index.ts` 显式 re-export(便于 tree-shaking)
- [ ] **P0** 错误提示友好(开发态堆栈 + 生产态用户文案)
- [ ] **P0** Storybook Addons 完善
  - viewport / backgrounds / controls 已配
  - measure / outline / highlight
  - theme switcher(已配)
  - locale switcher(已配)
  - device switcher(已配)
  - 性能分析(storybook-addon-performance)
- [ ] **P1** VS Code 工作区推荐 `.vscode/settings.json`
  - Tailwind IntelliSense
  - ESLint
  - Prettier
  - 文件关联
- [ ] **P1** VS Code 扩展推荐 `.vscode/extensions.json`
  - dbaeumer.vscode-eslint
  - esbenp.prettier-vscode
  - bradlc.vscode-tailwindcss
  - antfu.iconify
  - styled-components
- [ ] **P1** VS Code 调试配置 `.vscode/launch.json`
- [ ] **P1** Vitest UI 集成(`@vitest/ui`)
- [ ] **P2** Storybook 组件测试 + Playwright 集成
- [ ] **P2** 远程开发容器 `.devcontainer/`

---

## 十三、消费方迁移工具 (Migration Tools)

> 服务于把现有 antd/MUI 项目迁移到 chaos-ui

- [ ] **P1** Codemod 脚本
  - `antd` → `chaos-ui` 自动替换
  - `import { Table } from 'antd'` → `import { Table } from '@qxyfoods/chaos-ui'`
  - 已知 props 映射自动调整
- [ ] **P1** ESLint 迁移规则(临时开启,逐步修复)
  - `no-restricted-imports` 引入 antd 时 warning
- [ ] **P2** 主题迁移工具(antd 主题变量 → CSS 变量)

---

## 十四、Roadmap & 治理 (Governance)

- [ ] **P0** 创建 `/docs/roadmap.md` —— 公开路线图
- [ ] **P0** 公开决策记录(ADR) `/docs/adr/0001-xxx.md`
- [ ] **P0** 组件维护负责人(CODEOWNERS)
- [ ] **P1** RFC 流程 `/docs/rfc/`
- [ ] **P1** 季度版本计划
- [ ] **P1** LTS 政策(长期支持版本)
- [ ] **P1** 弃用策略(deprecation policy)
- [ ] **P2** 公开 RFC 仓库
- [ ] **P2** 社区治理

---

## 十五、运营 & 推广 (Marketing)

- [ ] **P1** 在线演示站点(Storybook 部署)
- [ ] **P1** Logo + 品牌
- [ ] **P1** 官网(landing page)
- [ ] **P1** NPM 公开(若改 public)
- [ ] **P2** 社交媒体
- [ ] **P2** 技术博客(写组件设计思路)
- [ ] **P2** 视频教程
- [ ] **P2** 案例展示(qxy-mop 等)

---

## 优先级汇总(给"更强模型"参考)

### 第 1 批(1-2 周完成,解锁 1.0.0)
1. LICENSE / CHANGELOG / CONTRIBUTING / .prettierrc
2. 测试基础设施(`@testing-library/react` + jsdom + vitest.setup.ts)
3. coverage 阈值提升到 85%
4. 缺失的 ui 组件: space / row+col / input-search / input-number / date-picker / divider / descriptions / popconfirm / spin / affix / flex / typography / spinner / config-provider
5. 缺失的 hooks: use-breakpoint / use-event-listener / use-key / use-message / use-modal / use-notification
6. 缺失的 lib: storage / event-bus / download / cookie
7. CLAUDE.md / .cursorrules / AI 规则文件矩阵
8. machine-readable 注释 frontmatter
9. COMPONENT_INDEX.md / HOOKS_INDEX.md / LIB_INDEX.md
10. README.md 升级
11. .github/dependabot.yml + .github/pull_request_template.md
12. commitlint 引入
13. **单据体系核心**: bill-page + bill-header + line-editor + order-line-editor + expense-line-editor + bill-footer
14. **CRUD 模板**: crud-page + filter-bar + search-table
15. **状态体系**: biz-status-tag + bill-status-bar
16. **看板/仪表盘**: stat-card-row(stat-card 增强) + stat-card-with-delta
17. **布局**: admin-sider + admin-header + admin-tabs + admin-breadcrumb
18. **字典**: dict-select(提升 qxy-mop 的 DictSelect)
19. **⭐ 旧系统迁移核心(用户明确要求)**:
    - **`master-detail-tabs`**(页面内多明细 tab,旧 CostXxxMasterEdit 模式)
    - **`region-layout`**(5 区可拖拽布局)
    - **`crud-toolbar` + `edit-toolbar`**(业务工具栏 50+ 按钮)
    - **`audit-sidebar`**(审核侧栏,5 选 1 + 驳回节点 + 加签方向)
    - **`attachment-list` + `related-bill-list`**
    - **`master-edit-template` + `master-list-template`**(单据页面模板)
    - **`data-table` 对标 MUI Pro**(主从展开/列固定/列拖拽/列显隐/行选择/虚拟化/导出)
20. **⭐ 跨库借鉴 P0(企业级必备)**:
    - `config-provider` 顶层 provider
    - `flex` 弹性布局
    - `typography` 排版组件族
    - `spinner` 纯加载指示器
    - `use-message` / `use-modal` / `use-notification` 命令式 API
21. CI 流水线整合(ci.yml)

### 第 1.5 批(旧系统迁移 P0,与 1.0.0 同步)
- **`photo-audit`**(AuditPhoto 照片审核)
- **`operation-log`**(操作日志)
- **`bill-todo-list`**(单据 5 状态流转:待办/已办/待发/已发/跟踪)
- **`serial-number-manager`**(单据流水号)
- **`dynamic-form-builder`**(动态表单配置)
- **`flow-tracker`**(流程追踪)
- **`rebut-node-select`**(驳回节点选择)
- **browse 工厂扩展**:`customer-browse` / `product-browse` / `sales-order-browse` / `fee-type-browse` / `shipping-way-browse` / `warehouse-browse` / `company-browse` / `city-browse`
- **Tremor 借鉴 P1**:`bar-list` / `delta-bar` / `category-bar` / `spark-chart` / `donut-chart` / `badge-delta` / `callout` / `tracking`
- **图表组件族**:`area-chart` / `bar-chart` / `line-chart` / `donut-chart` / `pie-chart` / `scatter-chart` / `radial-chart` / `spark-chart` / `funnel-chart`
- **仪表盘 Blocks**:`chart-card` / `stat-card-with-sparkline` / `bar-list-card` / `donut-card`
- **`qr-code`** / **`image-preview`** / **`auto-form`**(Zod→Form)

### 第 2 批(1-2 月完成,1.x 迭代)
- 完整 component MDX 文档
- 所有 business 组件单测
- E2E 测试体系
- 国际化(去掉 hardcoded-chinese 豁免)
- 设计令牌完整文档化
- 主题切换系统
- Changesets 替代手写版本

### 第 3 批(3-6 月,持续)
- Visual Regression
- 性能优化
- 高级功能(打印/导出/扫码/电子签认)
- 迁移工具(Codemod)
- 社区运营

---

## 验收清单(发版前必过)

- [ ] 所有 P0/P1 项已完成
- [ ] `npm run check` 0 错误
- [ ] `npm test` 0 失败,coverage ≥ 85%
- [ ] `npm run build-storybook` 成功
- [ ] `npm run build:pkg` 成功
- [ ] `npm pack --dry-run` 输出符合预期
- [ ] 所有 Story 通过 a11y 校验
- [ ] 所有组件有 .stories.tsx
- [ ] README 完整
- [ ] CHANGELOG 更新
- [ ] 1-2 个真实业务项目(如 qxy-mop)迁移验证通过
- [ ] AI 规则文件矩阵完整
- [ ] COMPONENT_INDEX.md / HOOKS_INDEX.md / LIB_INDEX.md 最新
- [ ] CI 流水线绿
- [ ] 至少 1 个团队成员 Review 通过

---

## 元信息

- 维护人:Chaos UI Team
- 最后更新:2026-06-28(项目清理 + 双语文档结构完成 + Menu/Message/Modal 静态 API)
- 当前版本:0.1.0
- 目标版本:1.0.0

---

## 十六、旧 ASP.NET 系统(QXY.Master) 审计补充

> 审计对象:`D:\Projects\qxyfoods\qxy-mop\old\extracted` 下的旧清香园营销管理平台(ASP.NET WebForms + miniUI 框架)
> 目的:找出旧系统有但新 chaos-ui 缺的关键业务组件,避免新一代组件库无法承载迁移工作。

### 16.1 核心特色 — 页面内 Tab(主表 + 多明细子表 tab)

**这是用户明确点名的"需要在组件库中重新做"的核心组件。**

旧 `CostXxxMasterEdit` 系列表单的标志性模式(以 `CostPersonWriteOffMasterEdit` 为代表):
- **一个主单 + N 个明细子单 tab**(典型 1~12 个,最多 `CostSaleApplyMasterEdit` 有 12 个)
- tab 位置: `top`(默认) / `bottom`(财务人员视角)
- tab 命名严格约定: `tab-{code}`
- 每个 tab 都是 `<mini-toolbar tag="detail"> + <mini-fit>(装 grid)` 的标准化双段
- 关键能力: **根据业务字段动态显示/隐藏 tab**(`onTabHide` 通过 `tabs.updateTab(tab, { visible: false/true })`)
- 配合 `initform(parameters, isClearBoth)` 主子表工厂自动装配

子清单名称示例(`CostPersonWriteOffMasterEdit`):
- 导购费用明细
- 共建费用明细
- 其他费用明细
- 税金明细

子清单名称示例(`CostSaleApplyMasterEdit` 12个):
- 各种费用类别 × 明细 + 摊销 + 投放 + 照片

#### 必备组件
- [ ] **P0** `master-detail-tabs` —— **页面内多明细 tab**(本任务核心需求)
  - Props: `master` / `tabs`(明细配置) / `tabPosition` / `activeKey` / `onChange` / `dynamicVisibility`
  - 命名约定: `tab-{key}` / `grid-{key}` / `{key}-TOOLBAR` / `{key}-LIST` / `{key}-EDIT`
  - 能力: 动态显隐 / 动态新增删除 tab / 顶部&底部位置 / 响应数据状态切换可见性
  - 文档: JSDoc + Storybook story + 至少 1 个完整 demo(复刻 `CostPersonWriteOffMasterEdit`)
- [ ] **P0** `tab-with-toolbar` —— Tab + 子工具栏 + Grid 三件套原子组件
- [ ] **P1** `subform-tabs` —— 子表单 tab(区别于明细 grid tab,数据是嵌套表单)

### 16.2 5 区可拖拽布局(Region Layout)

旧 `mini-layout` 提供 north/south/east/west/center 5 区,支持:
- `showRegion/expandRegion/hideRegion/collapseRegion`
- 可拖拽调整大小
- east 抽屉可折叠(用于审核侧栏)

新 `split-pane.tsx` 只有左右两栏,**不足以承载复杂业务页面布局**。

- [ ] **P0** `region-layout` —— 5 区可拖拽布局
  - Props: `regions: { north?, south?, east?, west?, center }` / `sizes` / `collapsible` / `resizable`
  - 能力: 区域显示/隐藏 / 折叠 / 拖拽 / 持久化尺寸
  - Storybook: 5 区 + 4 区 + 3 区变体
  - 依赖: `react-resizable-panels` 评估

### 16.3 业务工具栏家族(CRUD/Edit Toolbar)

旧 `edittoolbar.js` / `gridtoolbar.js` 共 50+ 按钮,新 `bulk-actions-toolbar` 是行级批量操作,**缺标准 CRUD 工具栏**。

- [ ] **P0** `crud-toolbar` —— 列表页标准工具栏
  - 内置按钮(可按 `permissions` 显示/隐藏):
    - 快速查询(右侧 placeholder 输入框)
    - 刷新
    - 新增 / 修改 / 删除 / 复制
    - 高级 / 导出 Excel / 导出 Word
    - 导入 / 下载导入模板
    - 打印
    - 审核 / 弃审 / 撤销
    - 流程追踪
    - 附件
    - 同步
    - 关联单据
    - 关闭
  - Props: `actions`(可配置按钮数组) / `permissions` / `onAction` / `selectedRows`
  - 溢出折叠(参考 `toolbaroverflow.js`)

- [ ] **P0** `edit-toolbar` —— 编辑页工具栏
  - 内置按钮:
    - 保存 / 保存并新增 / 保存并提交
    - 上一条 / 下一条 / 第一条 / 最后一条
    - 取回(单据被他人取走后,取回到自己名下)
    - 转发 / 打印 / 附件 / 富文本
    - 导出 Word / 关闭
  - Props: `status` / `permissions` / `onAction`

- [ ] **P0** `page-header` 增强 —— 添加 fixed 吸顶(参考 `div[id$="Edit-TOOLBAR"]` CSS)
  - `sticky: true` 时吸顶,自动避让 `page-header` 高度

### 16.4 审核侧栏(Audit Sidebar) — 业务核心

旧 `QXY.Master` 的 east 抽屉是所有 MasterEdit 表单的审核中枢:
- 5 选 1 单选: 审核 / 驳回 / 转发 / 加签 / 已阅
- 驳回时可指定顺序(驳回到流程某一节点)
- 驳回方式: 流程重走 / 直接提交给我
- 加签方向: 之前 / 之后
- 审核意见 textarea(审核通过非必填,其他必填)
- 附件列表(动态增删)
- 关联单据列表(动态增删)
- 单据状态 `10 / 5`(审核中)才允许 `onSave` 调 `edittoolbar.onSave`

- [ ] **P0** `audit-sidebar` —— 审核侧栏
  - Props: `visible` / `onClose` / `onAudit` / `onRebut` / `onSendAs` / `onSign` / `onInform` / `flowNodes`(可选流程节点)
  - 抽屉位置: `right`(默认) / `bottom`
  - 状态: 支持审核中(Drawer 可交互) / 其他状态(只读模式)
  - 内部子组件:
    - `audit-action-radio` —— 5 选 1 单选组
    - `rebut-node-select` —— 驳回节点选择
    - `sign-direction-radio` —— 加签方向
    - `audit-remark-textarea` —— 审核意见
    - `attachment-list` —— 附件列表(独立组件)
    - `related-bill-list` —— 关联单据列表(独立组件)

- [ ] **P0** `attachment-list` —— 附件管理列表
  - Props: `attachments` / `onAdd` / `onDelete` / `onPreview` / `readonly`
  - 支持: 单文件上传 / 拖拽上传 / 预览(图片/PDF/Office) / 删除 / 下载
  - 业务数据关联: `billType` + `billId`

- [ ] **P0** `related-bill-list` —— 关联单据列表
  - Props: `bills` / `onAdd` / `onDelete` / `onOpen` / `readonly`
  - 支持: 选择已审核单据(通过 browse 弹窗) / 打开 / 删除

### 16.5 照片审核(Photo Audit) — AuditPhoto

旧 `AuditPhoto.aspx` 关键能力:
- 按上传日期分组的照片网格
- 单张照片卡片 235×300,含 7 个元数据(时间/上传人/状态/拍摄地点/审核人/审核时间/意见)
- 全屏 lightbox(上一张/下一张 + 右键 5 状态)
- 5 种状态: 合格 / 不合格 / 重复 / 不可用 / 同一店
- 多选 + 批量审核 / 批量下载(zip)
- 拍摄地点(EXIF GPS 反查)

- [ ] **P0** `photo-audit` —— 照片审核组件
  - Props: `photos`(分组的) / `onAudit(photoId, status)` / `onBatchAudit(photoIds, status)` / `onDownload` / `readonly`
  - 子组件:
    - `photo-card` —— 单照片卡(缩略图 + 元数据 + 状态)
    - `photo-lightbox` —— 全屏预览
    - `photo-context-menu` —— 右键 5 状态菜单
  - 依赖: `exifr`(读取 EXIF GPS) / `jszip`(批量下载打包)

### 16.6 FastReport + Aspose.Word 打印集成

旧 `edittoolbar.onPrint` 双模式:
1. **FastReport** 通过 `ws://127.0.0.1:11207` WebSocket 调本地服务
2. **Aspose.Word** 走服务端 `PrintAsposeWord.aspx` + 浏览器端预览

- [ ] **P1** `print-button` / `print-service` —— 打印集成
  - Props: `templates`(可用模板列表) / `onPrint` / `onPreview` / `onExport`
  - 模式: `local-websocket`(FastReport) / `server-side`(Aspose.Word) / `browser-only`(简易)
  - 子组件:
    - `print-preview` —— 浏览器端打印预览
    - `print-template-picker` —— 模板选择弹窗

### 16.7 Excel 导入/导出增强

旧 `gridtoolbar.onImport` 关键能力:
- 模板下载(`onDownLoadImportTemplate`)
- `importHandler` 按列名注入字典翻译回调
- `importCellCommit` 单元格级联动
- 覆盖确认(导入前提示"将丢失编辑数据")
- Excel 序列号 → JS Date 转换

- [ ] **P1** 增强 `bulk-import-wizard`
  - 新增: `onDownLoadImportTemplate` 模板下载
  - 新增: `importHandler` 列级翻译回调
  - 新增: `importCellCommit` 联动计算
  - 新增: Excel → JSON 自动类型转换(日期/数字/布尔)

### 16.8 Browse 弹窗工厂(Browse Picker)

旧 `QXYopen.js` 集中 30+ 选人/选部门/选客户/选商品/选存货/选销售单/选核销单 弹窗。

- [ ] **P1** 增强 `browse-input` 为通用工厂
  - 已有: `user-browse` / `department-browse` (实体 browse)
  - 需新增:
    - `customer-browse`(选客户,含经销商/终端)
    - `product-browse`(选商品,按分类/按销售价)
    - `sales-order-browse`(选销售订单/选未发货明细)
    - `writeoff-browse`(选核销主单)
    - `price-adjust-browse`(选改价主单)
    - `fee-type-browse`(选费用类型)
    - `shipping-way-browse`(选配送方式)
    - `warehouse-browse` 复用
    - `company-browse` 复用
    - `city-browse` 复用

### 16.9 通知中心(SignalR 模式)

旧 `Index.js` + `registerSignalR()`:
- SignalR hub 推送 `getMessage`
- 浮动小铃铛(可拖拽)
- 右下角 messageBox 弹层(10 分钟 timeout)
- 已阅/未阅两种 icon
- 待办 grid 自动刷新

- [ ] **P2** 增强 `notification-center`
  - 新增: SignalR hub 模式 / SSE 模式
  - 新增: 浮动铃铛组件(`floating-bell`)
  - 新增: messageBox 弹层(可拖拽 + 自动关闭)

### 16.10 主单模板(Master Edit Template)

旧系统每个 MasterEdit 都是同样的套路: `RegionLayout + 顶级 Tabs + PageInternalTabs + CrudToolbar + EditToolbar + AuditSidebar` 的组合。

- [ ] **P0** `master-edit-template` —— MasterEdit 模板
  - 一个组件,10 行代码复刻 `CostPersonWriteOffMasterEdit` 全部交互
  - Props: `master`(主表配置) / `detailTabs`(明细 tab 配置) / `auditConfig`(审核配置) / `toolbarConfig`
  - 集成 `audit-sidebar` / `page-internal-tabs` / `edit-toolbar`
  - 文档: 完整 demo 复刻旧 `CostPersonWriteOffMasterEdit`

- [ ] **P1** `master-list-template` —— MasterList 模板
  - 集成 `crud-toolbar` / `search-table` / `audit-sidebar`(点击行打开抽屉)
  - 完整 demo 复刻 `CostPersonWriteOffMasterList`

### 16.11 其他补充

- [ ] **P2** `rsa-login-form` —— RSA 公钥加密登录
  - 依赖: `jsencrypt` lib
  - 配合后端注入公钥
  - 已有 chaos-ui `Form` + `Input` + `InputGroup`,只需 `lib/rsa.ts` + 业务包装

- [ ] **P2** `favorite-menu` —— 左侧菜单右键收藏

- [ ] **P3** `theme-skin-switcher` —— 多皮肤切换(已有 `theme-toggle` 增强即可)

- [ ] **P3** `rich-text` —— 富文本编辑(基于 Tiptap/Lexical)
  - 旧 `edittoolbar.onRichText` 调 `RichText.aspx`

- [ ] **P3** `timeline` 增强 —— 旧系统有"待办/已办/待发/已发/跟踪"5 色磁贴,可包装为 `dashboard-tile`

### 16.12 旧系统 Forms 全量对照表(共 ~250 个)

下表列出旧系统所有 Forms,**标记新系统是否覆盖**。任何未覆盖项都应沉淀为新组件或新页面模板。

#### 16.12.1 Admin 后台(55 个)
- 旧文件:`Forms/Admin/*`
- 覆盖情况(qxy-mop 现状):
  - ✅ 已覆盖: DictList / DictSortList / Permissions 系统权限/角色/用户
  - ⚠️ 部分覆盖: BillTitleConfigList(单据标题配置) / FlowConfigList(流程配置) / FlowNodeConfig(流程节点)
  - ❌ 未覆盖: AdminTodoList(待办)/ ProcessAlreadyDoneList / ProcessIssuedList / ProcessTrackList / ProcessWaitSendList / WaitSendList(单据流转 5 状态)**需要 `bill-todo-list` 组件**
  - ❌ 未覆盖: SerialNumberList(单据流水号) — **需要 `serial-number-manager`**
  - ❌ 未覆盖: SystemFormList / SystemMenuList(动态表单配置)**— 需要 `dynamic-form-builder`**
  - ❌ 未覆盖: JcpxUserList(旧版用户) / JcpxEmployeeList(旧版员工)**已部分覆盖**

#### 16.12.2 BaseData 基础数据(18 个)
- 旧文件:`Forms2/*Edit/List`
- 覆盖情况:
  - ✅ 已覆盖: Company / Customer / City / ComUnit(商品单位) / CustomerClass / CustomerAddress / FeeType / InventoryClass / Inventory / RegionArchives / ShippingPrices / ShippingWay / Warehouse
  - ⚠️ 部分覆盖: Escrow(担保函)
  - ❌ 未覆盖: OperationLogList(操作日志) — **需 `operation-log` 组件**

#### 16.12.3 CostManage 费用管理(40+ 个,最复杂!)
- 旧文件:`Forms2/CostManage/*`
- **核心业务**:费用申请 / 费用核销 / 多种费用类型(销售/市场/品牌/管理/人员/其他/促销/共建/推广/激励/导入/调整)
- 模式: `CostXxxApplyMasterEdit`(申请) + `CostXxxWriteOffMasterEdit`(核销) + `CostXxxWriteOffTaxList`(税金) + `AuditPhoto`(照片审核)
- **新系统现状**:qxy-mop 只有简化版 `expense/apply` + `expense/ledger` + `reconciliation`
- **缺失**:
  - ❌ 10+ 种费用类型专属表单
  - ❌ 费用核销流程(`CostWriteOffMaster`)
  - ❌ 税金明细(`CostWriteOffTaxList`)
  - ❌ 照片审核(`AuditPhoto`)
  - ❌ 担保函管理(`EscrowEdit`)
  - ❌ 品牌费用管理(`CostBrandApply`)
  - ❌ 人员费用管理(`CostPersonApply`)
  - ❌ 车辆费用管理(`CarApply`)
  - ❌ 推广/激励/促销费用管理

#### 16.12.4 SaleManage 销售管理(25+ 个)
- 旧文件:`Forms2/SaleManage/*`
- 覆盖情况:
  - ✅ 已覆盖(简化): OrderList / OrderCreate / Distributor
  - ❌ 未覆盖:
    - `SaleMasterEdit` / `SaleMasterList`(销售订单完整版)
    - `SaleInvGiftPolicy`(礼品政策)
    - `GiftApplyMaster`(礼品申请)
    - `ShipMasterEdit`(装运单)
    - `SaleCountersignMaster`(销售会签单)
    - `DealerOutStockMaster`(经销商出库)
    - `DealerStockBeginMaster`(经销商期初库存)
    - `SaleInvoiceDetailStat`(销售发票明细统计)
    - `SaleExecuteStatistical`(销售执行统计)
    - `SaleIssueDetail` / `SaleMDetail`(销售明细)

#### 16.12.5 CustomerManage 客户管理(15+ 个)
- 旧文件:`Forms2/CustomerManage/*`
- 覆盖情况:
  - ✅ 已覆盖: Distributor / Application
  - ❌ 未覆盖:
    - `CustomerChangeMaster`(客户变更)
    - `CustomerAccountChangeMaster`(客户账户变更)
    - `CustomerAttributionChangeMaster`(客户归属变更)
    - `CustomerDelinquencyMaster`(客户欠款)
    - `CustomerPlanChangeRequest`(客户计划变更申请)
    - `CustomerStatement`(客户对账)
    - `CustomerDealingList`(客户成交)
    - `CustomerCostsDealingList`(客户费用成交)
    - `CloseApplyMaster`(闭户申请)

#### 16.12.6 PlanManage 计划管理(12 个)
- 旧文件:`Forms2/PlanManage/*`
- 全部 ❌ 未覆盖:
  - `PlanTaskMaster`(计划任务)
  - `PlanChangeMaster`(计划变更)
  - `BudgetAdjustMaster`(预算调整)
  - `RegionalBudgetMaster`(区域预算)
  - `SaleTargetTaskMaster`(销售目标任务)
  - `TaskAdjustMaster`(任务调整)
  - `YongyouExtend1-4`(用友扩展 4 套模板)
  - `CostBudgetList`(费用预算)

#### 16.12.7 Statistics 统计分析(10+ 个)
- 旧文件:`Forms2/Statistics/*`
- 全部 ❌ 未覆盖:
  - `SaleExecuteStatistical`(销售执行统计)
  - `DealerErpChangeDetail/Sum`(经销商 ERP 变更)
  - `CostDataNoticeBoard`(费用数据看板)
  - `InventoryDataList`(库存数据)
  - `InventoryStockInfoList`(库存信息)
  - `SaleIssueDetail` / `SaleMDetail`(销售明细)
  - `NotInvoiceDetail`(未开票明细)
  - `ShipSettlementList`(装运结算)
  - `RegionArchivesProgressList/SumList`(档案进度)

#### 16.12.8 InvoiceManage 发票管理(8 个)
- 旧文件:`Forms2/InvoiceManage/*`
- 全部 ❌ 未覆盖:
  - `InvoiceApplyMaster`(发票申请)
  - `InvoiceApplyNewMaster`(发票申请新)
  - `InvoiceApplyDetail1List`(发票申请明细)
  - `InvoicedSumList` / `NotInvoiceSumList`(已/未开票汇总)
  - `InvoiceSumList`(开票汇总)
  - `AlreadyInvoiceDetail`(已开票明细)
  - `NotInvoiceDetail`(未开票明细)

#### 16.12.9 SettlementManage 结算管理(6 个)
- 旧文件:`Forms2/SettlementManage/*`
- 全部 ❌ 未覆盖:
  - `ShipSettlementMaster`(装运结算)
  - `ShipSettlementMDList`(装运结算明细)
  - `AccountCostsMaster`(账户费用)
  - `MonthlyAssessmentMaster`(月度评估)
  - `NewCostsMaster` / `NewInventoryMaster`(新费用/新库存)

#### 16.12.10 MaterialManage 物料管理(2 个)
- 旧文件:`Forms2/MaterialManage/*`
- ❌ 未覆盖:`MaterialMaster`(物料主数据)、`PricesMasterEdit/List`(价格主数据)、`PricesDetailsList`(价格明细)、`CustPricePageList`(客户价目)

#### 16.12.11 AccountManage 账户管理(6 个)
- 旧文件:`Forms2/AccountManage/*`
- ❌ 未覆盖:`AccountMasterList`(账户主)、`AccountMasterNewList`(账户新)、`FreeAccoutDetailList`(免费账户明细)、`QryAccoutRemain`(账户余额查询)、`QryDisCountUseRemain`(折扣使用余额)

### 16.13 旧系统盘点结论

1. **必须新增的"业务模板"组件**(P0):
   - `master-detail-tabs`(页面内多明细 tab)
   - `region-layout`(5 区布局)
   - `crud-toolbar` / `edit-toolbar`(业务工具栏)
   - `audit-sidebar`(审核侧栏)
   - `attachment-list` / `related-bill-list`(审核附件)
   - `master-edit-template` / `master-list-template`(业务模板)
   - `operation-log`(操作日志)
   - `bill-todo-list`(单据待办 5 状态)
   - `serial-number-manager`(单据流水号)
   - `dynamic-form-builder`(动态表单配置)

2. **必须新增的业务组件**(P0):
   - `photo-audit`(照片审核)
   - `rebut-node-select`(驳回节点选择)
   - `flow-tracker`(流程追踪)

3. **必须新增的 browse picker 工厂**(P1):
   - 至少 8 种专项 browse 弹窗(见 16.8)

4. **必须新增的财务/统计组件**(P1):
   - `tax-detail-table`(税金明细)
   - `writeoff-flow`(核销流程)
   - `budget-overview`(预算总览)
   - `target-progress`(目标进度)
   - `inventory-snapshot`(库存快照)
   - `invoice-summary`(发票汇总)
   - `account-balance`(账户余额)

5. **MOP 业务模块映射缺口**(P1):
   - 旧 `CostManage` 10+ 种费用类型 → 至少 5 种费用 Picker / 状态
   - 旧 `SaleManage` 8 个核心单据 → 至少补齐 GiftApply / ShipMaster / SaleCountersign
   - 旧 `CustomerManage` 5 个变更类单据 → 全部缺失
   - 旧 `PlanManage` 6 个计划类单据 → 全部缺失
    - 旧 `Statistics` 9 个统计报表 → 全部缺失
    - 旧 `InvoiceManage` 7 个发票单据 → 全部缺失
    - 旧 `SettlementManage` 5 个结算单据 → 全部缺失
    - 旧 `MaterialManage` 价格/物料 → 全部缺失
    - 旧 `AccountManage` 账户体系 → 全部缺失


---

## 十七、跨组件库对标 — 值得借鉴的优质组件

> 以下组件来自 shadcn/ui(v4)、Ant Design 5、MUI X Pro、Tremor、HeroUI、Radix UI 等主流库,Chaos UI 当前缺少但对企业级场景有极高价值。按"值得借鉴"程度 Pb(P0-必学 / P1-推荐 / P2-可选)分级。

### 17.1 shadcn/ui v4 新增组件(ChaOS UI 基于 shadcn,必须跟进)

shadcn/ui 是 Chaos UI 的底座,新版持续增加组件。以下是当前缺少的:

| 组件 | shadcn v4 状态 | Chaos UI 现状 | Pb | 说明 |
|------|---------------|---------------|-----|------|
| **`combobox`** | ✅ 已有 | ⚠️ `components/ui/combobox.tsx` 存在但需验证 | P0 | shadcn 的 Combobox 基于 cmdk,搜索+选择一体 |
| **`data-table`** | ✅ 基于 TanStack Table | ⚠️ `advanced-data-table.tsx` 已有 | P1 | 需对标: 列固定 / 列排序 / 列过滤 / 列拖拽 / 列显隐 / 行选择 / 行展开 / 虚拟化 / 导出 |
| **`date-picker`** | ✅ 基于 react-day-picker | ❌ 缺单点 date-picker | P0 | shadcn 已封装完整,Chaos UI 需跟进 |
| **`empty`** | ✅ shadcn v4 新增 | ✅ `empty-state.tsx` 已有 | — | 已覆盖 |
| **`spinner`** | ✅ shadcn v4 新增 | ❌ 缺 | P0 | 加载 spinner(区别于 spin 包裹层,是纯指示器) |
| **`field`** | ✅ shadcn v4 新增 | ⚠️ `form-field.tsx` 需对标 | P1 | shadcn Field 支持横向/纵向布局 + 错误信息 + 描述 |
| **`input-group`** | ✅ shadcn v4 新增 | ✅ 已有 | — | 已覆盖 |
| **`input-otp`** | ✅ shadcn 有 | ✅ `otp-field.tsx` 已有 | — | 已覆盖 |
| **`typography`** | ✅ shadcn v4 新增 | ❌ 缺 | P0 | H1~H6 / Lead / Large / Small / Muted / P / Blockquote / InlineCode / List |

### 17.2 Ant Design 5 企业级组件(对标迁移源)

Ant Design 是 qxy-mop 正在使用且需要替换的库,以下组件在 antd 有但 Chaos UI 缺失:

| 组件 | antd 5 状态 | Chaos UI | Pb | 说明 |
|------|-----------|----------|-----|------|
| **`config-provider`** | ✅ 核心组件 | ❌ | P0 | 全局配置:主题/国际化/前缀/方向/虚拟滚动,消费方必需 |
| **`app`** | ✅ message/notification/modal 静态方法 | ❌ | P0 | 替代 antd App 的 useApp()——必须提供等价 API |
| **`form.useForm`** | ✅ 表单实例 | ✅ react-hook-form | — | 模式不同,RHF 生态更好,保持现状 |
| **`qr-code`** | ✅ antd 5 新增 | ❌ | P1 | 二维码展示/下载,基于 qrcode.react |
| **`watermark`** | ✅ antd 5 新增 | ✅ 已有 | — | 已覆盖 |
| **`float-button`** | ✅ antd 5 新增 | ✅ `fab.tsx` 已有 | — | 已覆盖 |
| **`tour`** | ✅ antd 5 新增 | ✅ `tour.tsx` 已有 | — | 已覆盖 |
| **`segmented`** | ✅ antd 5 新增 | ✅ `segmented-control.tsx` 已有 | — | 已覆盖 |
| **`flex`** | ✅ antd 5 新增 | ❌ 缺独立组件 | P0 | 等价 antd Flex(比 space 更灵活,支持 wrap/gap/justify/align) |
| **`notification`** | ✅ 命令式 | ⚠️ sonner 已有 | P1 | 需封装 `useNotification` 命令式 API |
| **`message`** | ✅ 命令式 | ⚠️ sonner 已有 | P0 | 需封装 `useMessage` 命令式 API |
| **`modal` 命令式** | ✅ Modal.confirm/info/success | ⚠️ | P0 | 需封装 `useModal` 命令式 API |
| **`image`** | ✅ 预览+缩放 | ❌ | P1 | 图片预览(缩放/旋转/翻页),基于 yet-another-react-lightbox |
| **`upload`** | ✅ 拖拽+列表+裁剪 | ✅ file-upload 已有 | P1 | 需增强:裁剪/压缩/预览/分片上传 |
| **`calendar`** | ✅ 完整日历 | ✅ 已有 | — | 已覆盖 |
| **`color-picker`** | ✅ antd 5 新增 | ✅ 已有 | — | 已覆盖 |

### 17.3 MUI X Pro 高级组件(闭源付费,值得开源替代)

MUI X Pro 提供了企业级最强大的数据密集组件。Chaos UI 应提供等价开源替代:

| 组件 | MUI X Pro 能力 | Chaos UI 替代方案 | Pb | 说明 |
|------|---------------|-----------------|-----|------|
| **`DataGrid Premium`** | 行分组/聚合/Excel 导出导入/剪贴板/单元格编辑/行拖拽/主从展开/虚拟化 | ⚠️ 需基于 TanStack Table 8 构建 | P0 | 这是所有业务系统的核心!必须对标 MUI Pro 的全部能力 |
| **`Date Range Picker`** | 时间范围+快捷选择 | ✅ `date-range-picker` 已有 | — | 已覆盖 |
| **`Date Picker Pro`** | 日期+时间+快捷 | ❌ 缺 date-picker 单点 | P0 | 需跟进 |
| **`Charts`** | 10+ 图表类型+动画+交互 | ⚠️ 已有 `chart.tsx`(recharts) | P1 | 需对标:BarChart / LineChart / PieChart / AreaChart / DonutChart / ScatterChart / SparkChart / RadialChart / FunnelChart |
| **`Tree View Pro`** | 拖拽排序+搜索+虚拟化 | ✅ `tree-view.tsx` 已有 | P1 | 需增强拖拽排序 |
| **`Scheduler`** | 日程/甘特视图 | ❌ 缺 | P2 | 市场/营销活动日历/项目甘特图,可基于 @dnd-kit + 自定义 |

### 17.4 Tremor 仪表盘/数据可视化组件(强烈推荐)

Tremor 专注仪表盘,组件设计精良。Chaos UI 当前图表族很薄,应全面借鉴:

| 组件 | Tremor 能力 | Chaos UI | Pb | 说明 |
|------|-----------|----------|-----|------|
| **`BarList`** | 水平条形排名列表,排序+动画+点击 | ❌ | P1 | 排行榜/SKU 销量排名/经销商贡献排名,极其常用 |
| **`DeltaBar`** | 增减条(正绿负红) | ❌ | P1 | 同比/环比增减展示 |
| **`CategoryBar`** | 分类进度条(多段占比) | ❌ | P1 | 费用结构占比/渠道贡献占比 |
| **`ProgressBar`** | 进度条(含目标线) | ⚠️ progress 已有 | P1 | 增强为目标达成进度(实际+目标线) |
| **`SparkChart`** | 迷你折线/面积图(内联) | ❌ | P1 | 统计卡内的迷你趋势线,stat-card 必备 |
| **`DonutChart`** | 环形图 | ❌ | P1 | 占比分析(费用类型/渠道/区域) |
| **`RadialChart`** | 径向进度图 | ✅ gauge 已有 | — | 已覆盖 |
| **`Tracking`** | 里程碑追踪线 | ❌ | P1 | 里程碑/阶段进度(项目跟踪/审批进度) |
| **`Callout`** | 提示标注卡 | ❌ | P1 | 业务提示/规则说明/注意事项 |
| **`Metric`** | 数字看板(大字+变化值) | ✅ kpi-card 已有 | — | 已覆盖 |
| **`Flex`** | 弹性布局 | ❌ | P0 | 同 antd Flex,核心布局组件 |
| **`Divider`** | 分隔线 | ❌ | P0 | 已在 2.2 规划 |
| **`BadgeDelta`** | 带增减色的徽章 | ❌ | P1 | "+12.5% ↑" 类标签,业绩看板必备 |
| **`Icon` 统一出口** | 图标组件包装 | ⚠️ icons.ts 已有 | P1 | 需增强: 支持图标搜索/分类/按需导入 |

### 17.5 其他值得借鉴的特色组件

| 组件 | 来源 | Pb | 说明 |
|------|------|-----|------|
| **`AutoForm`** | shadcn 生态(shadcn-ui-extensions) | P1 | 基于 Zod Schema 自动生成表单—— Chaos UI 已有 `form.tsx`,需增加"schema→form"自动渲染能力 |
| **`Sonner` 增强** | sonner 原生 | P1 | Toast 增强: action button / promise / rich content / 自定义 icon |
| **`Cmdk` 增强** | cmdk 原生 | P1 | Command 增强子命令/嵌套菜单/最近使用 |
| **`React-Aria` 组件** | Adobe React Aria | P2 | 部分高可访问性组件(Calendar/DateField/TagGroup/TabBoard)可参考其 a11y 实现 |
| **`Vaul` 增强** | vaul 原生 | P2 | Drawer 增强缩放/拖拽关闭/背景模糊 |
| **`Embla-Carousel`** | embla-carousel | P2 | Carousel 增强: 自动播放/懒加载/视差/缩略图导航 |
| **`React-Table` / `TanStack Table`** | TanStack | P0 | 已依赖,需全面对标 MUI DataGrid Pro 能力 |
| **`React-Hook-Form` 增强** | RHF | P1 | 已依赖,需增加 Zod auto-form / 动态表单 / 向导式表单 |
| **`Recharts` 增强** | recharts | P1 | 已依赖,需增加 Tremor 风格的统一图表封装 |
| **`Dnd-Kit` 增强** | @dnd-kit | P1 | 已依赖,需增加看板拖拽/排序/跨容器拖拽 |
| **`React-Virtual`** | @tanstack/react-virtual | P1 | 已依赖,需增加虚拟表格/虚拟树/虚拟列表 |
| **`Tailwind-Variant`** | tailwind-variants / cva | — | 已使用 cva,评估 tailwind-variants 更好的变体系统 |
| **`Motion(Framer-Motion)`** | motion | P2 | 动画库,增强组件过渡/布局动画/手势支持 |

### 17.6 图表体系专项(Chart System)

Chaos UI 当前只有基础的 `chart.tsx`(recharts 包装),远不够企业级。需要建设完整的图表组件族:

- [ ] **P1** `area-chart` —— 面积图(趋势+填充)
- [ ] **P1** `bar-chart` —— 柱状图(分组/堆叠/横向)
- [ ] **P1** `line-chart` —— 折线图(多线+标注)
- [ ] **P1** `donut-chart` —— 环形图(占比)
- [ ] **P1** `pie-chart` —— 饼图
- [ ] **P1** `scatter-chart` —— 散点图
- [ ] **P1** `radial-chart` —— 径向图(达成率)
- [ ] **P1** `spark-chart` —— 迷你趋势图(内联到 stat-card)
- [ ] **P1** `funnel-chart` —— 漏斗图(转化率)
- [ ] **P2** `gauge-chart` —— 仪表盘图
- [ ] **P2** `treemap-chart` —— 树图(层级占比)
- [ ] **P2** `sankey-chart` —— 桑基图(流量流转)
- [ ] **P2** `heatmap-chart` —— 热力图(已有 `heatmap-calendar.tsx`,增强为通用)
- [ ] **P2** `radar-chart` —— 雷达图(多维评估)
- [ ] **P2** `waterfall-chart` —— 瀑布图(财务分析)

统一封装要求:
- 基于 recharts(已依赖)
- 统一 API: `data / index / categories / colors / valueFormatter / showTooltip / showLegend / onValueChange`
- 统一 Tooltip/Legend 样式
- 暗色模式适配
- 响应式
- 无障碍

### 17.7 图表嵌入式 Blocks(参考 Tremor Blocks)

Tremor Blocks 提供了开箱即用的仪表盘 Block,Chaos UI 应提供等价:

- [ ] **P1** `chart-card` —— 图表+标题+描述+KPI 一体卡片
- [ ] **P1** `stat-card-with-sparkline` —— 统计卡 + 迷你趋势线
- [ ] **P1** `stat-card-with-delta` —— 统计卡 + 增减标签(+12.5%↑)
- [ ] **P1** `bar-list-card` —— 排名列表卡
- [ ] **P1** `donut-card` —— 占比分析卡
- [ ] **P2** `dashboard-grid` —— 预设仪表盘网格布局(2×2 / 3×2 / 自定义)
- [ ] **P2** `overview-page` —— 总览页面模板(N 个 chart-card + stat-card-row)

### 17.8 shadcn/ui Blocks / Pages 参考

shadcn/ui v4 新增了 Blocks(预构建页面片段)和注册表生态:

- [ ] **P2** 评估 `shadcn blocks` 注册表机制
  - 可借鉴: 每个业务模板(curd-page / master-edit-template)发布为 block
  - 消费方通过 `npx shadcn add @chaos-ui/bill-page` 一键安装
- [ ] **P2** 创建 Chaos UI 注册表(`@qxyfoods/chaos-ui` block registry)
  - 发布到 shadcn 兼容的注册表格式
  - 包含: 所有 business 组件 / 所有 layout 模板 / 所有 chart 组件

### 17.9 总结:必须新增的关键借鉴组件

| 优先级 | 组件 | 来源借鉴 |
|--------|------|----------|
| **P0** | `config-provider` | antd ConfigProvider |
| **P0** | `flex` | antd Flex / Tremor Flex |
| **P0** | `typography` | shadcn v4 Typography |
| **P0** | `spinner` | shadcn v4 Spinner |
| **P0** | `use-message` / `use-modal` / `use-notification` | antd App.useApp() |
| **P0** | `data-table` 对标 MUI Pro | MUI X DataGrid Premium |
| **P0** | `date-picker` | shadcn v4 DatePicker |
| **P1** | `bar-list` | Tremor BarList |
| **P1** | `delta-bar` | Tremor DeltaBar |
| **P1** | `category-bar` | Tremor CategoryBar |
| **P1** | `spark-chart` | Tremor SparkChart |
| **P1** | `donut-chart` | Tremor DonutChart |
| **P1** | `badge-delta` | Tremor BadgeDelta |
| **P1** | `callout` | Tremor Callout |
| **P1** | `tracking` | Tremor Tracking |
| **P1** | `qr-code` | antd QRCode |
| **P1** | `image-preview` | antd Image |
| **P1** | `auto-form`(Zod→Form) | shadcn AutoForm |
| **P1** | 图表组件族(10+ 种) | Tremor Charts / recharts |
| **P1** | chart-card / stat-card-with-sparkline | Tremor Blocks |
| **P2** | `scheduler` / `gantt` | MUI X Scheduler |
| **P2** | `rich-text-editor` | Tiptap/Lexical |
| **P2** | `sankey-chart` / `treemap-chart` | recharts |


---

## 十八、目录结构重组(单仓 + Turborepo-ready)

> 状态:**待评审与执行**。本节给出"终极目标结构 + 渐进式迁移路径"的一体化方案,综合项目当前硬约束、Mantine/shadcn/Turborepo 行业最佳实践。

### 18.1 现状盘点(为什么必须改)

经过对仓库的逐项扫描,确认以下事实:

| # | 现象 | 数据 | 严重度 |
|---|---|---|---|
| 1 | `components/ui/` 71 个 .tsx 全部平铺 | 71 个文件,无子目录 | 🔴 严重 |
| 2 | `components/business/` 88 个 .tsx 全部平铺 | 88 个文件,无子目录 | 🔴 严重 |
| 3 | `hooks/` 18 个 .ts 平铺 | 18 个文件 | 🟡 中 |
| 4 | `lib/` 6 个 .ts 平铺 | 6 个文件 | 🟡 中 |
| 5 | **`src/` 与根目录双套组件目录** | `src/components` / `src/business` / `src/layout` / `src/utils` 全部是 stories/MDX,而根 `components/` 是源码 | 🔴 严重 |
| 6 | `app/` Next.js demo 与 `components/` 平级 | `app/` 只有 4 个文件,只是个引导页 | 🟡 中 |
| 7 | `eslint-plugin-chaos/` 顶级目录 | 内部工具,无 packages 容器 | 🟡 中 |
| 8 | 根目录污染文件 | `*.log` / `*.png` / `*.sh` / `*.tgz` 散落 | 🟢 轻 |
| 9 | `package/` 7 个 re-export 入口 | 多层 re-export 链 `components/ui/index.ts → package/ui.ts → package/index.ts` 实际冗余 | 🟡 中 |
| 10 | 缺 monorepo 预留 | 未来拆 `chaos-icons` / `chaos-i18n` / `eslint-plugin` 困难 | 🟡 中 |

### 18.2 硬约束(不可破)

| 约束 | 来源 | 影响 |
|---|---|---|
| `packageManager: "npm@11.10.1"` | `package.json` | **不能换 pnpm**(至少不能一刀切);Turbo 支持 npm workspaces,可行 |
| 私有 Verdaccio `10.91.3.253:4873` | `publishConfig` | 不能公开发布,但 monorepo 不影响发布 |
| `@/ → ./*` 路径别名 | `tsconfig.json` paths | 全仓 200+ import 依赖此别名,迁移必须保留 |
| 7 个 subpath exports | `package.json` exports | `./` `./ui` `./ui/icons` `./ui-icons` `./business` `./hooks` `./lib` `./next` 必须在迁移后保持兼容 |
| `tsup` 8 个 entry | `tsup.config.ts` | 输出产物在 `dist/*.{js,cjs,d.ts}`,迁移后 entry 路径需调整 |
| `@chaos/eslint-plugin` 符号链接 | `file:./eslint-plugin-chaos` | 必须是可被 npm 解析的相对路径 |
| Storybook `@storybook/nextjs-vite` | `.storybook/main.ts` | stories 路径需调整;`framework` 需继续支持 Next.js |
| `peerDependencies.next >= 16.0.0` | 强制 | demo `app/` 必须留 Next.js 路由 |

### 18.3 行业调研结论(支撑方案选型)

**Mantine (mantinedev/mantine, 31.3k⭐)**
- 顶层: `apps/` (文档/演示) + `packages/` (`@mantine/core` / `@mantine/hooks` / ...)
- 单包内部: `packages/@mantine/core/src/components/<ComponentName>/`
  - 每组件独立目录:`<Name>.tsx` / `<Name>.module.css` / `<Name>.test.tsx` / `index.ts` / `types.ts` / `*.ts` 助手
- `src/index.ts` 是顶层 barrel,逐个 re-export 组件

**shadcn/ui v4 (shadcn-ui/ui, 118k⭐)**
- 顶层: `apps/v4/` (Next.js 文档站) + `apps/v4/registry/` (registry 源,给用户复制) + `apps/v4/components/` (站内使用)
- 根 `components.json` 控制 shadcn CLI 输出位置
- `apps/v4/hooks/` + `apps/v4/lib/` 顶层

**Turborepo (vercel/turborepo)**
- **支持 single-package workspace** —— 意味着不切 monorepo 也能用 Turbo 做任务编排和缓存
- 单仓模式下 `turbo.json` 不写包名前缀即可
- 切 monorepo 时只需加 `pnpm-workspace.yaml` (npm 改 `workspaces` 字段)

**最终借鉴**: **Mantine 的"每组件独立目录" + shadcn 的"apps/<site>/三层结构" + Turborepo 渐进迁移**。

### 18.4 终极目标结构(单一最终态)

> 命名为 **"单仓 monorepo-ready"**:表面是单仓单包,内部按 monorepo 语义组织,未来 1 行配置即可切真 monorepo。

```text
chaos_style/
├── apps/                          ← 所有"可部署/可访问的应用"
│   ├── docs/                      ← Storybook 文档站(原 src/intro + src/*/stories)
│   │   ├── .storybook/
│   │   ├── intro/                 ← MDX 介绍(Getting-Started/Theming/...)
│   │   ├── stories/               ← 所有 *.stories.tsx
│   │   │   ├── ui/
│   │   ├── stories/business/
│   │   └── stories/layout/
│   │   └── package.json
│   └── demo/                      ← Next.js 演示(原 app/)
│       ├── app/                   ← 根 Next.js 路由(必须)
│       ├── public/
│       └── package.json
│
├── packages/                      ← 库代码(可发布到 npm/Verdaccio)
│   ├── chaos-ui/                  ← 主 UI 库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/            ← 71 个原子组件
│   │   │   │   │   ├── button/
│   │   │   │   │   │   ├── button.tsx
│   │   │   │   │   │   ├── button.stories.tsx
│   │   │   │   │   │   ├── button.test.tsx
│   │   │   │   │   │   ├── button.types.ts
│   │   │   │   │   │   ├── button.variants.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── input/
│   │   │   │   │   ├── dialog/
│   │   │   │   │   └── ...        ← 每个组件一个目录
│   │   │   │   ├── business/      ← 88 个业务组件
│   │   │   │   │   ├── data-table/
│   │   │   │   │   ├── kanban-board/
│   │   │   │   │   ├── mobile-button/   ← 24 个 mobile-* 整体迁入
│   │   │   │   │   └── ...
│   │   │   │   └── layout/
│   │   │   │       ├── app-shell/
│   │   │   │       └── ...
│   │   │   ├── hooks/             ← 18 个 hook,按类别分目录
│   │   │   │   ├── state/         ← use-toggle / use-previous / use-async / use-step / use-pagination
│   │   │   │   ├── effect/        ← use-debounce / use-throttle / use-intersection / use-click-outside / use-hotkeys / use-countdown
│   │   │   │   ├── storage/       ← use-local-storage / use-copy-to-clipboard
│   │   │   │   ├── responsive/    ← use-media-query / use-mobile
│   │   │   │   ├── i18n/          ← use-locale
│   │   │   │   └── data/          ← use-infinite-scroll
│   │   │   ├── lib/               ← 工具
│   │   │   │   ├── http/          ← api-client
│   │   │   │   ├── auth/          ← permissions
│   │   │   │   ├── i18n/          ← 已有 i18n
│   │   │   │   ├── format/        ← format / utils
│   │   │   │   └── log/           ← logger
│   │   │   ├── icons/             ← 抽离 icons.ts → icons/ 目录(可选)
│   │   │   ├── styles/            ← 集中 globals.css 拆解
│   │   │   │   ├── tokens.css     ← 设计令牌(CSS 变量)
│   │   │   │   ├── base.css       ← reset / base
│   │   │   │   └── utilities.css  ← utility classes
│   │   │   ├── entry/             ← 7 个发布入口(原 package/)
│   │   │   │   ├── index.ts       ← export { ui, business, layout, hooks, lib }
│   │   │   │   ├── ui.ts
│   │   │   │   ├── ui-icons.ts
│   │   │   │   ├── business.ts
│   │   │   │   ├── hooks.ts
│   │   │   │   ├── lib.ts
│   │   │   │   └── next.ts
│   │   │   └── index.ts          ← 主入口
│   │   ├── tsup.config.ts         ← 改指 packages/chaos-ui/src/entry/*
│   │   ├── package.json           ← "@qxyfoods/chaos-ui" 内部包
│   │   ├── tsconfig.json
│   │   ├── vitest.config.ts
│   │   └── README.md
│   │
│   └── eslint-plugin-chaos/      ← 顶级目录降级
│       ├── src/
│       ├── package.json
│       └── README.md
│
├── tooling/                       ← 开发工具配置
│   ├── eslint-config-chaos/       ← (若需要共享,可单列;P2)
│   ├── tsconfig.base.json         ← 共享 tsconfig(单仓时无需)
│   └── tailwind-preset/           ← 共享 tailwind preset
│
├── package.json                   ← 根 package.json(workspace root, P2 阶段启用)
├── pnpm-workspace.yaml            ← P2 阶段启用
├── turbo.json                     ← P1 阶段启用(支持单包模式)
├── tsconfig.base.json             ← P1 阶段启用
├── .gitignore
├── .prettierrc.json
├── .editorconfig
├── .nvmrc
├── .npmrc
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── CHANGELOG.md
├── LICENSE
├── component-spec.md
├── todo.md
└── docs/                          ← 项目级文档(架构/迁移/主题)
    ├── architecture.md
    ├── theming.md
    ├── migration.md
    ├── design-tokens.md
    ├── ai-prompts/
    └── adr/
```

### 18.5 渐进式迁移路径(三个 PR 阶段)

> **核心原则**:每个 PR 必须能 build、能 typecheck、能跑 Storybook,允许 diff 大但禁止破坏现有 import。

#### 阶段 1:目录细分(单仓内重组,0.5 版本号 bump)

**工期**:1-2 周  | **风险**:低  | **包发布**:无

**目标**:`components/ui/button.tsx` → `packages/chaos-ui/src/components/ui/button/{button.tsx, button.stories.tsx, button.test.tsx, button.types.ts, index.ts}`(单层包装)

执行步骤:
1. **清理根目录污染**
   - `qxyfoods-chaos-ui-0.1.0.tgz` → 加 `.gitignore` 排除
   - `*.log` / `*.png` / `*.sh` 移入 `scripts/` 或 `.gitignore` 排除
   - `tsconfig.tsbuildinfo` 加 `.gitignore`
2. **创建 `packages/chaos-ui/` 目录骨架**,所有源码移入
   - `components/ui/button.tsx` → `packages/chaos-ui/src/components/ui/button/button.tsx`
   - 同理迁移 71 个 ui + 88 个 business + 10 个 layout
   - 每个组件建独立目录,放入 `.tsx` + 临时 `index.ts`
3. **迁移 hooks**(按类别 5 个子目录)
4. **迁移 lib**(按类别 5 个子目录)
5. **迁移 icons**:`components/ui/icons.ts` → `packages/chaos-ui/src/icons/index.ts`
6. **创建 `packages/chaos-ui/src/entry/` 入口层**(原 `package/*.ts`)
7. **创建 `packages/chaos-ui/tsup.config.ts`**(复制原配置,改 entry 路径)
8. **创建 `packages/chaos-ui/package.json`**:name `@qxyfoods/chaos-ui`
9. **保留根 `package.json`** 作为编排层:
   - 改 `main` / `module` / `types` / `exports` 指向 `packages/chaos-ui/dist/*`
   - `scripts` 全部加 `cd packages/chaos-ui && ...` 或用 `npm-run-all2` 并行
10. **移动 `eslint-plugin-chaos/`** 到 `packages/eslint-plugin-chaos/`,改 devDep 路径
11. **`app/` 加注释**:`<!-- 这是 Next.js demo,生产用法见 apps/demo/ -->`;后续 P2 再迁
12. **删除原 `components/` `hooks/` `lib/` 空目录**
13. **`src/` 改造**:
    - `src/components/` → `apps/docs/stories/ui/`
    - `src/business/` → `apps/docs/stories/business/`
    - `src/layout/` → `apps/docs/stories/layout/`
    - `src/intro/` → `apps/docs/intro/`
    - `src/utils/` → `apps/docs/.storybook/utils/`
    - `src/llms.txt` → `apps/docs/llms.txt`(或根目录)
14. **更新 `.storybook/main.ts`** stories glob 指向 `apps/docs/stories/**`
15. **更新 `tsconfig.json`**:
    - `include` 改为 `["packages/**/*.{ts,tsx}", "apps/**/*.{ts,tsx}", ".next/types/**"]`
    - `paths: { "@/*": ["./*"] }` 保留,语义不变(根级 alias)
16. **批量重写 import**:
    - `@/components/ui/button` → `@/packages/chaos-ui/src/components/ui/button`(或保留 `@/` 别名指向新位置)
    - 推荐:**保留 `@/ = ./*` 别名**,内部用相对路径 `../../ui/button`,外部 import 路径不变
17. **执行 `npm run check` + `npm run build-storybook` + `npm test`** 全绿
18. **新增 `turbo.json`**(单包模式,P1 提前完成):
    ```json
    {
      "$schema": "https://turbo.build/schema.json",
      "tasks": {
        "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
        "build-storybook": { "dependsOn": ["^build"], "outputs": ["storybook-static/**"] },
        "lint": {},
        "typecheck": { "dependsOn": ["^build"] },
        "test": {},
        "check": { "dependsOn": ["lint", "typecheck"] }
      }
    }
    ```

**验收**:
- `npm run build:pkg` 产物与之前 100% 一致(对比 `dist/` 文件 hash)
- `npm run build-storybook` 全部 story 加载成功
- 现有 7 个 subpath imports (`@qxyfoods/chaos-ui/ui` 等) 在下游项目仍能解析
- `.dependency-cruiser.cjs` 配置更新到新路径

#### 阶段 2:启用真 workspace(0.5 → 0.6 版本号 bump)

**工期**:2-3 周  | **风险**:中  | **包发布**:多个内部包

**目标**:把 `packages/chaos-ui` 拆为 `chaos-ui` + `chaos-icons` + `chaos-hooks` + `chaos-lib` 四个子包,启用 npm workspaces。

执行步骤:
1. 评估是否引入 `pnpm`(推荐):如决策保留 npm,加 `"workspaces": ["apps/*", "packages/*"]`
2. 拆 icons 出独立包 `packages/chaos-icons/`
3. 拆 hooks 出独立包 `packages/chaos-hooks/`
4. 拆 lib 出独立包 `packages/chaos-lib/`
5. `packages/chaos-ui` 改为聚合包,只 re-export 子包
6. 升级 `turbo.json` 到包级任务:`packages/chaos-ui#build` 风格
7. 引入 `changesets`(`@changesets/cli`)做版本管理
8. CI 流水线增加 turbo 任务编排

**验收**:
- 各子包可独立 `npm run build` 成功
- 根 `npm run check` 一键跑完所有包
- 远程缓存(Vercel Remote Cache 或自托管)接入 CI
- 至少一个下游项目(qxy-mop)能 `npm install @qxyfoods/chaos-ui@0.6.0` 后跑通

#### 阶段 3:完善 monorepo 治理(0.6 → 1.0.0)

**工期**:1 月+  | **风险**:中  | **包发布**:正式

**目标**:发布 1.0.0,所有治理(版本/ADR/CODEOWNERS)到位。

执行步骤:
1. 各子包独立 README + CHANGELOG
2. `.github/CODEOWNERS` 按包指派维护人
3. `.changeset/` 配置 + `release.yml` 自动 PR + 自动 publish
4. `apps/demo` 升级为沙盒应用(可被 Vercel 一键部署演示)
5. `apps/docs` 部署到 Vercel / GitHub Pages
6. `tooling/tsconfig.base.json` 共享基础 TS 配置
7. `tooling/eslint-config-chaos` 共享 lint 配置(可选)

### 18.6 文件级迁移清单(阶段 1 详表)

> 此清单供阶段 1 执行时使用,共 200+ 文件,可用脚本批量 mv。

#### 18.6.1 UI 原子组件(71 个)

```
components/ui/accordion.tsx              → packages/chaos-ui/src/components/ui/accordion/{accordion.tsx,index.ts}
components/ui/alert-dialog.tsx           → packages/chaos-ui/src/components/ui/alert-dialog/...
components/ui/alert.tsx                  → packages/chaos-ui/src/components/ui/alert/...
components/ui/aspect-ratio.tsx           → packages/chaos-ui/src/components/ui/aspect-ratio/...
components/ui/avatar.tsx                 → packages/chaos-ui/src/components/ui/avatar/...
components/ui/badge.tsx                  → packages/chaos-ui/src/components/ui/badge/...
components/ui/breadcrumb.tsx             → packages/chaos-ui/src/components/ui/breadcrumb/...
components/ui/browse-input.tsx           → packages/chaos-ui/src/components/ui/browse-input/...
components/ui/button.tsx                 → packages/chaos-ui/src/components/ui/button/...
components/ui/calendar.tsx               → packages/chaos-ui/src/components/ui/calendar/...
components/ui/card.tsx                   → packages/chaos-ui/src/components/ui/card/...
components/ui/carousel.tsx               → packages/chaos-ui/src/components/ui/carousel/...
components/ui/checkbox.tsx               → packages/chaos-ui/src/components/ui/checkbox/...
components/ui/collapsible.tsx            → packages/chaos-ui/src/components/ui/collapsible/...
components/ui/color-picker.tsx           → packages/chaos-ui/src/components/ui/color-picker/...
components/ui/command.tsx                → packages/chaos-ui/src/components/ui/command/...
components/ui/context-menu.tsx           → packages/chaos-ui/src/components/ui/context-menu/...
components/ui/department-browse.tsx      → packages/chaos-ui/src/components/ui/department-browse/...
components/ui/dialog.tsx                 → packages/chaos-ui/src/components/ui/dialog/...
components/ui/dot.tsx                    → packages/chaos-ui/src/components/ui/dot/...
components/ui/drawer.tsx                 → packages/chaos-ui/src/components/ui/drawer/...
components/ui/dropdown-menu.tsx          → packages/chaos-ui/src/components/ui/dropdown-menu/...
components/ui/file-upload.tsx            → packages/chaos-ui/src/components/ui/file-upload/...
components/ui/form-grid.tsx              → packages/chaos-ui/src/components/ui/form-grid/...
components/ui/form-list.tsx              → packages/chaos-ui/src/components/ui/form-list/...
components/ui/form-section.tsx           → packages/chaos-ui/src/components/ui/form-section/...
components/ui/form.tsx                   → packages/chaos-ui/src/components/ui/form/...
components/ui/grid-layout.tsx            → packages/chaos-ui/src/components/ui/grid-layout/...
components/ui/hover-card.tsx             → packages/chaos-ui/src/components/ui/hover-card/...
components/ui/icons.ts                   → packages/chaos-ui/src/icons/index.ts
components/ui/index.ts                   → packages/chaos-ui/src/components/ui/index.ts(barrel)
components/ui/input-group.tsx            → packages/chaos-ui/src/components/ui/input-group/...
components/ui/input.tsx                  → packages/chaos-ui/src/components/ui/input/...
components/ui/kbd.tsx                    → packages/chaos-ui/src/components/ui/kbd/...
components/ui/kpi-panel.tsx              → packages/chaos-ui/src/components/ui/kpi-panel/...
components/ui/label.tsx                  → packages/chaos-ui/src/components/ui/label/...
components/ui/menubar.tsx                → packages/chaos-ui/src/components/ui/menubar/...
components/ui/navigation-menu.tsx        → packages/chaos-ui/src/components/ui/navigation-menu/...
components/ui/otp-field.tsx              → packages/chaos-ui/src/components/ui/otp-field/...
components/ui/page-container.tsx         → packages/chaos-ui/src/components/ui/page-container/...
components/ui/pagination.tsx             → packages/chaos-ui/src/components/ui/pagination/...
components/ui/popover.tsx                → packages/chaos-ui/src/components/ui/popover/...
components/ui/progress.tsx               → packages/chaos-ui/src/components/ui/progress/...
components/ui/radio-group.tsx            → packages/chaos-ui/src/components/ui/radio-group/...
components/ui/resizable.tsx              → packages/chaos-ui/src/components/ui/resizable/...
components/ui/scroll-area.tsx            → packages/chaos-ui/src/components/ui/scroll-area/...
components/ui/select.tsx                 → packages/chaos-ui/src/components/ui/select/...
components/ui/separator.tsx              → packages/chaos-ui/src/components/ui/separator/...
components/ui/sheet.tsx                  → packages/chaos-ui/src/components/ui/sheet/...
components/ui/sidebar.tsx                → packages/chaos-ui/src/components/ui/sidebar/...
components/ui/skeleton.tsx               → packages/chaos-ui/src/components/ui/skeleton/...
components/ui/slider.tsx                 → packages/chaos-ui/src/components/ui/slider/...
components/ui/sonner.tsx                 → packages/chaos-ui/src/components/ui/sonner/...
components/ui/split-pane.tsx             → packages/chaos-ui/src/components/ui/split-pane/...
components/ui/stepper.tsx                → packages/chaos-ui/src/components/ui/stepper/...
components/ui/switch.tsx                 → packages/chaos-ui/src/components/ui/switch/...
components/ui/table.tsx                  → packages/chaos-ui/src/components/ui/table/...
components/ui/tabs.tsx                   → packages/chaos-ui/src/components/ui/tabs/...
components/ui/tags-input.tsx             → packages/chaos-ui/src/components/ui/tags-input/...
components/ui/textarea.tsx               → packages/chaos-ui/src/components/ui/textarea/...
components/ui/timeline.tsx               → packages/chaos-ui/src/components/ui/timeline/...
components/ui/toggle-group.tsx           → packages/chaos-ui/src/components/ui/toggle-group/...
components/ui/toggle.tsx                 → packages/chaos-ui/src/components/ui/toggle/...
components/ui/tooltip.tsx                → packages/chaos-ui/src/components/ui/tooltip/...
components/ui/tree-select.tsx            → packages/chaos-ui/src/components/ui/tree-select/...
components/ui/tree-view.tsx              → packages/chaos-ui/src/components/ui/tree-view/...
components/ui/user-browse.tsx            → packages/chaos-ui/src/components/ui/user-browse/...
components/ui/virtual-list.tsx           → packages/chaos-ui/src/components/ui/virtual-list/...
components/ui/virtual-table.tsx          → packages/chaos-ui/src/components/ui/virtual-table/...
```

#### 18.6.2 业务组件(88 个,按业务域分类)

```
data 子域:
  data-table.tsx, advanced-data-table.tsx, pivot-table.tsx
chart 子域:
  chart.tsx, gauge.tsx, metric-trend.tsx, heatmap-calendar.tsx
upload 子域:
  file-upload-manager.tsx, bulk-import-wizard.tsx
approval 子域:
  approval-timeline.tsx, permission-matrix.tsx, role-assignment.tsx
marketing 子域:
  campaign-card.tsx, campaign-calendar.tsx, campaign-status-tag.tsx,
  utm-builder.tsx, audience-segment-builder.tsx, experiment-summary.tsx,
  creative-preview.tsx, budget-pacing-card.tsx
analytics 子域:
  activity-feed.tsx, advanced-search.tsx, audit-log.tsx, saved-filters.tsx,
  diff-viewer.tsx, version-history.tsx, filter-builder.tsx
chat 子域(后续,见 §2.4.1):
  chat-message, chat-input, chat-sidebar, ...
mobile 子域(24 个):
  mobile-auth-layout, mobile-bottom-nav, mobile-button, mobile-card,
  mobile-dashboard-layout, mobile-data-table, mobile-dialog,
  mobile-empty-state, mobile-filter-builder, mobile-form,
  mobile-form-field, mobile-form-wizard, mobile-input, mobile-kanban,
  mobile-kpi-card, mobile-navigation, mobile-page-header,
  mobile-pull-to-refresh, mobile-select, mobile-sheet, mobile-skeleton,
  mobile-swipe-actions, mobile-tabs, mobile-textarea
theme 子域:
  theme-toggle.tsx, language-switcher.tsx, cookie-banner.tsx
feedback 子域:
  error-boundary.tsx, loading-page.tsx, confirm-dialog.tsx,
  prompt-dialog.tsx, tour.tsx, watermark.tsx
general 子域(未归类):
  chip.tsx, code-block.tsx, combobox.tsx, command-palette.tsx,
  date-range-picker.tsx, empty-state.tsx, error-page.tsx,
  export-button.tsx, fab.tsx, form-field.tsx, form-wizard.tsx,
  inline-edit.tsx, json-viewer.tsx, kanban-board.tsx, kpi-card.tsx,
  multi-select.tsx, notification-center.tsx, page-header.tsx,
  rating.tsx, responsive-preview.tsx, segmented-control.tsx,
  stat-card.tsx, status-tag.tsx, time-picker.tsx, transfer.tsx,
  user-menu.tsx
```

每个组件落地为 `packages/chaos-ui/src/components/business/<domain>/<component>/<component>.tsx` + `index.ts`(暂不要求 stories/tests,后续阶段补)。

#### 18.6.3 layout(10 个)

```
components/layout/*.tsx → packages/chaos-ui/src/components/layout/<name>/<name>.tsx
```

#### 18.6.4 hooks(18 个,按 6 类)

```
state/     use-async, use-toggle, use-previous, use-step, use-pagination
effect/    use-debounce, use-throttle, use-intersection-observer,
           use-click-outside, use-hotkeys, use-countdown
storage/   use-local-storage, use-copy-to-clipboard
responsive/ use-media-query, use-mobile
i18n/      use-locale(含 LocaleProvider)
data/      use-infinite-scroll
```

落地:`packages/chaos-ui/src/hooks/<category>/<hook-name>/<hook-name>.ts` + `index.ts`。

#### 18.6.5 lib(6 个,按 5 类)

```
http/     api-client
auth/     permissions
i18n/     i18n(原 lib/i18n/ 整目录)
format/   format, utils
log/      logger
```

落地:`packages/chaos-ui/src/lib/<category>/<util>/<util>.ts` + `index.ts`。

#### 18.6.6 入口与配置

```
package/index.ts        → packages/chaos-ui/src/entry/index.ts
package/ui.ts           → packages/chaos-ui/src/entry/ui.ts
package/ui-icons.ts     → packages/chaos-ui/src/entry/ui-icons.ts
package/business.ts     → packages/chaos-ui/src/entry/business.ts
package/hooks.ts        → packages/chaos-ui/src/entry/hooks.ts
package/lib.ts          → packages/chaos-ui/src/entry/lib.ts
package/next.ts         → packages/chaos-ui/src/entry/next.ts
tsup.config.ts          → packages/chaos-ui/tsup.config.ts
```

#### 18.6.7 ESLint 插件降级

```
eslint-plugin-chaos/    → packages/eslint-plugin-chaos/
package.json devDeps:   "@chaos/eslint-plugin": "file:./packages/eslint-plugin-chaos"
```

#### 18.6.8 Storybook 迁移

```
src/components/**/*.stories.tsx → apps/docs/stories/ui/**/*.stories.tsx
src/business/**/*.stories.tsx   → apps/docs/stories/business/**/*.stories.tsx
src/layout/**/*.stories.tsx     → apps/docs/stories/layout/**/*.stories.tsx
src/intro/*.mdx                 → apps/docs/intro/*.mdx
src/utils/CodeBlock.tsx         → apps/docs/.storybook/utils/CodeBlock.tsx
src/utils/PropsTable.tsx        → apps/docs/.storybook/utils/PropsTable.tsx
src/llms.txt                    → apps/docs/llms.txt
.storybook/                     → apps/docs/.storybook/
```

更新 `apps/docs/.storybook/main.ts` stories glob:
```ts
stories: [
  "../intro/**/*.mdx",
  "../stories/**/*.stories.@(ts|tsx)",
],
```

#### 18.6.9 根目录清理

```
新增 .gitignore 规则:
  *.log
  *.png          (仅非 docs/ 下)
  *.tgz
  tsconfig.tsbuildinfo
  storybook-static/
  .next/
  dist/
  output/
  .playwright-mcp/
  .pnpm-store/

保留(显式跟踪):
  *.md
  *.json
  *.mjs / *.cjs / *.ts
  Dockerfile, vercel.json, .npmrc
```

### 18.7 每组件目录规范(Mantine 风格)

每个组件落地后标准结构:

```text
<component-name>/
├── <component-name>.tsx        ← 主组件(可多个变体拆 *.tsx)
├── <component-name>.types.ts   ← Props / State 类型(若复杂)
├── <component-name>.variants.ts← cva variants(若使用 class-variance-authority)
├── <component-name>.test.tsx   ← Vitest 单测
├── <component-name>.stories.tsx← Storybook 故事
├── <component-name>.mdx        ← 组件文档(可选,P0 组件)
├── helpers.ts                  ← 内部工具(若需要)
└── index.ts                    ← barrel 导出
```

**`index.ts` 标准模板**:
```ts
export { ComponentName } from "./component-name";
export { componentNameVariants } from "./component-name.variants";
export type { ComponentNameProps } from "./component-name.types";
```

### 18.8 关键决策点说明

| 决策 | 选择 | 理由 |
|---|---|---|
| 包管理器 | **保留 npm** | 硬约束;Turbo/Changesets 均支持 npm workspaces |
| Monorepo 工具 | **Turborepo** | 任务编排 + 远程缓存;支持单包起步 |
| 阶段 1 是否引入 Turbo | **是** | 即使单包也能用任务依赖和缓存,提升 CI 速度 |
| 阶段 1 是否切真 workspaces | **否** | 风险太大,等阶段 2 单独 PR |
| 阶段 1 是否拆 icons/hooks/lib 为子包 | **否** | 阶段 1 只重组,阶段 2 再拆 |
| `app/` Next.js demo 立即迁 | **否** | P2 阶段;根 `app/` 加注释标记即可 |
| `src/` stories 立即迁 | **是** | 与 `apps/docs` 概念对齐,消除双套 |
| 组件 stories 强制按组件目录内 | **阶段 1 可选,阶段 3 强制** | 第一阶段不强迁,先建空目录,stories 暂留 `apps/docs/stories/<domain>/<name>.stories.tsx` |
| `package.json` 字段 | 7 个 subpath exports **完全保留** | 下游兼容性是第一优先级 |

### 18.9 风险与回退

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| 200+ import 路径破坏 | 高 | 编译/运行失败 | 保留 `@/` 别名,内部用相对路径;阶段 1 仅 mv,不改 import |
| Storybook 路径配置错 | 中 | stories 不加载 | `.storybook/main.ts` 改完后立即 `npm run dev` 验证 |
| tsup 入口路径错 | 中 | dist 产物空 | 跑 `npm run build:pkg` 后 `npm pack --dry-run` 对比 0.1.0 |
| `@chaos/eslint-plugin` 路径断 | 中 | lint 失败 | 用 `file:./packages/eslint-plugin-chaos`,npm 解析 |
| Verdaccio 发布失败 | 低 | 下游无法升级 | 阶段 1 不发版;阶段 2 内部灰度后发布 |
| 阶段 2 npm workspaces 兼容问题 | 中 | install 失败 | 决策是否切 pnpm;若 npm 卡住,fallback 到 pnpm |

**回退策略**:
- 阶段 1 是单一大 PR,但**保留 0.1.0 目录结构作为 git branch**(branch 名 `pre-monorepo-restructure`)
- 任一阶段失败可立即 `git reset --hard pre-monorepo-restructure`
- dist 产物必须保持 0.1.0 兼容(hash diff < 5%)

### 18.10 验收清单(阶段 1 必过)

- [ ] `npm run check` 0 错误(typecheck + lint + lint:css + lint:deps)
- [ ] `npm test` 0 失败,coverage 不下降
- [ ] `npm run build-storybook` 成功,所有 stories 加载
- [ ] `npm run build:pkg` 成功,`npm pack --dry-run` 输出与 0.1.0 行为一致
- [ ] `@qxyfoods/chaos-ui` 7 个 subpath imports 在下游项目仍可解析
- [ ] `npm run dev` (Storybook) 在 6006 端口可访问
- [ ] `npm run app:dev` (Next.js demo) 仍可启动
- [ ] 根目录无 `*.log` `*.png` `*.sh` `*.tgz` 污染
- [ ] CodeGraph 索引重建成功
- [ ] AGENTS.md / CLAUDE.md 中所有路径引用已更新
- [ ] `turbo.json` 已加入,`turbo run check` 跑通

### 18.11 后续工作衔接

- 完成阶段 1 后,回到 §一 1.1 package.json,补 license/repo/keywords 等元字段
- 完成阶段 1 后,§二 缺失组件开发时,直接使用新结构 `packages/chaos-ui/src/components/business/<domain>/<name>/`
- 完成阶段 2 后,启动 §十四 Changesets 评估
- 完成阶段 3 后,启动 §十五 公开 npm 评估

---

## 附录:调研参考链接

- Mantine 仓库结构: https://github.com/mantinedev/mantine
- shadcn/ui v4 仓库结构: https://github.com/shadcn-ui/ui/tree/main/apps/v4
- Turborepo 单包模式: https://turbo.build/messages/package-task-in-single-package-workspace
- Turborepo 文档: https://turbo.build/docs
- Mantine 单组件目录规范: https://github.com/mantinedev/mantine/tree/master/packages/%40mantine/core/src/components/Button

- 主消费项目:`D:\Projects\qxyfoods\qxy-mop`
