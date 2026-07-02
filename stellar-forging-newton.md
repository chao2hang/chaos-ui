# Chaos UI 组件补齐实施计划

## A. 总体评估结论

**覆盖度**:约 **98.6%**。已覆盖表单/数据展示/反馈/导航/布局/通用/图表(20+类型)全场景,428+ 组件仅余 6 个缺口。

**缺口归类**:
| 类型 | 组件 | 依据 |
|------|------|------|
| 同步落地 | RichTextEditor、OrgChart | packages 有完整实现,主目录 `components/business/` 与 `index.ts` 双缺 |
| 同步+升级 | PDFViewer | packages 是 demo(`Math.random` 模拟页数),需改 `react-pdf` 真实渲染 |
| 全新实现 | CronEditor、MarkdownEditor、ColorBoard | 全项目缺失或仅有渲染器/基础版 |

## B. 架构关键发现(导出链路)

- **双包**:主项目 `@qxyfoods/chaos-ui`(1.0.0-beta.1,发布,根 `tsup.config.ts` 入口 `components/business/index.ts`)与 `packages/chaos-design-ui`(0.1.1,开发镜像,逐文件 glob,`@` alias→packages 根)。
- **依赖差异**:主项目缺 `@tiptap/*`、`@xyflow/react`、`react-pdf`(仅 packages 子包有)。
- **同步动作**:文件落到主目录 + 主 `components/business/index.ts` 加 `export *` + 根 `tsup.config.ts` 的 `external` 同步 + 主 `package.json` 加依赖。

## C. 逐组件方案

### 1. RichTextEditor(同步落地)
- 路径:`components/business/rich-text-editor.tsx`
- 依赖:`@tiptap/react`、`@tiptap/starter-kit`、`@tiptap/extension-{link,image,placeholder}` → 入 **peerDependencies**(状态型,防双实例);`tsup external` 同步。
- API:已设计完善(`value/onChange/placeholder/editable/showToolbar/minHeight/onUpload`),直接复用 packages 实现(695 行,含工具栏/链接/图片/附件弹窗)。
- a11y/性能:`"use client"`、`immediatelyRender:false`(避 SSR 崩)、`next/dynamic` 懒加载、icon 按钮 `aria-label`。
- Story:`src/stories/business/RichTextEditor.stories.tsx`;Test:`components/business/rich-text-editor.test.tsx`。
- 步骤:① 复制 packages 文件到主目录 ② 加 peer 依赖 ③ index.ts 加导出 ④ 补 story/test。

### 2. OrgChart(同步落地)
- 路径:`components/business/org-chart.tsx`
- 依赖:`@xyflow/react` → peer;`tsup external` 加。CSS `@xyflow/react/dist/style.css` 在组件内 import(tsup 不处理 CSS,需确认 `styles.css` 聚合或 Next globals 引入)。
- API:`nodes: OrgNode[]`、`edges?: OrgEdge[]`、`onNodeClick`、`className`。已实现(139 行,ReactFlow + 自定义节点)。
- 注意:`fitView`、`proOptions.hideAttribution`、固定高度 500px。
- Story/Test/步骤同上。

### 3. PDFViewer(同步+升级)
- 路径:`components/business/pdf-viewer.tsx`
- 依赖:`react-pdf` → peer(基于 pdf.js,重);`tsup external` 加。
- 方案:保留现有工具栏骨架(翻页/缩放/全屏/下载),**替换** demo 渲染为 `react-pdf` 的 `Document`/`Page`/`useDocument`。移除 `Math.random`。
- API 扩展:`src`、`title`、`onLoadSuccess?(pdf)`、`onError?`、`initialScale`、`className`。新增 loading/error 状态(用 `Skeleton`/`EmptyState`)。
- a11y:页面区域 `role="document"`、`aria-label`。
- 步骤:① 复制骨架 ② 接入 react-pdf ③ 加状态处理 ④ 配置 pdf.js worker(Next public 静态或 CDN)⑤ story/test。

### 4. ColorBoard(全新实现)
- 路径:`components/business/color-board.tsx`(组合复杂,入 business;基础 `ColorPicker` 留 ui 不动)
- 依赖:**零新增**。复用 `react-colorful`(已有 dep)+ 浏览器原生 `EyeDropper` API(自建 TS 类型声明)。
- API:`value/onChange`、`format?: "hex"|"rgb"|"hsl"`、`presets?`、`history?: boolean`(localStorage 持久化)、`enableEyeDropper?`、`enableAlpha?`、`showSwatches?`、`className`。
- 组成:色相饱和度面板 + HEX/RGB/HSL 输入 + 预设色板 + 历史色 + 吸管按钮 + 透明度滑块。基于 `Popover` 触发。
- a11y:色块 `role="button"` + `aria-label="色值 #xxx"`、吸管按钮 `aria-label`、键盘可达。
- 步骤:① 设计 Props ② 实现面板+输入 ③ 加吸管/历史/透明度 ④ story/test。

### 5. MarkdownEditor(全新实现)
- 路径:`components/business/markdown-editor.tsx`
- 依赖:**零新增**。复用 `ChatMarkdownRenderer`(`components/business/chat-markdown-renderer.tsx`)做预览 + `Textarea` + `lucide-react` 工具栏图标。
- API:`value/onChange`、`placeholder`、`mode?: "split"|"editor"|"preview"`、`toolbar?: boolean`、`tools?`(可配置工具集)、`height`、`className`。
- 组成:工具栏(粗体/斜体/标题/链接/代码/列表/引用/图片 插入) + `Textarea` + 实时预览(复用渲染器)。工具栏通过操作 textarea 选区插入语法。
- a11y:工具栏 `role="toolbar"`、按钮 `aria-label`、textarea `aria-label`。
- 步骤:① 设计 Props ② 实现工具栏插入逻辑 ③ 接入渲染器预览 ④ 三种模式切换 ⑤ story/test。

### 6. CronEditor(全新实现)
- 路径:`components/business/cron-editor.tsx`
- 依赖:**新增 `cronstrue`**(纯函数,转人类可读描述,约 30KB)→ 入 **dependencies**(非状态型,可放 dep)。`tsup external` 无需加(dep 非外部)。
- API:`value: string`(5 段 cron)、`onChange`、`preset?: "every5min"|"weekdays"|...`、`showDescription?: boolean`、`readOnly`、`className`。
- 组成:`SegmentedControl` 切分钟/小时/日/月/周 Tab + `Select`/`Input` 选值(每 N、指定、范围、通配)+ `cronstrue.toString()` 渲染中文描述 + 预设快捷项。
- a11y:Tab `role="tablist"`、输入 `aria-label`。
- 步骤:① 设计 Props 与 cron 段模型 ② 实现 5 段编辑器 ③ 接 cronstrue 描述 ④ 预设 ⑤ story/test。

## D. 优先级排序(成本低→高)

| 序 | 组件 | 理由 |
|----|------|------|
| 1 | RichTextEditor | 同步,实现完整,仅复制+加依赖+导出 |
| 2 | OrgChart | 同步,实现完整,仅复制+加依赖+导出 |
| 3 | PDFViewer | 同步骨架+升级 react-pdf,中等 |
| 4 | ColorBoard | 全新但零新依赖,复用 react-colorful |
| 5 | MarkdownEditor | 全新但零新依赖,复用渲染器 |
| 6 | CronEditor | 全新+新依赖 cronstrue+自建 5 段 UI,最复杂 |

## E. 风险与注意事项

1. **API 冻结期(beta.1)**:6 个组件统一标 `@since 1.0.0`。beta 阶段新增非破坏性变更,但 API 须一次稳定——建议每个组件 PR 前做一次 API review,落地后不再改 Props 签名(仅增量)。
2. **peerDependencies 管理**:`@tiptap/*`(5 子包)、`@xyflow/react`、`react-pdf` 入 peer 会增加消费方安装成本。**建议**:在 README 的"可选组件依赖矩阵"中说明哪些组件需要哪些 peer,并在 `peerDependenciesMeta` 中**不**标 optional(强制安装以防运行时崩溃)。`cronstrue` 入 dep(库内打包)。
3. **packages 与主目录同步后链路**:packages `index.ts` 已导出前 3 项(指向 packages 内文件),主目录 `index.ts` 需补 `export * from "./rich-text-editor"` 等。**注意**:两套文件会 drift,建议同步落地后建立单向同步脚本(主目录→packages),或在 CI 加 `diff` 校验。packages 侧若不再作为开发主线,可考虑废弃 packages 镜像,统一以主目录为源。
4. **tsup external 同步**:根 `tsup.config.ts` 的 `external` 数组必须补齐 `@tiptap/react`、`@tiptap/starter-kit`、`@tiptap/extension-link`、`@tiptap/extension-image`、`@tiptap/extension-placeholder`、`@xyflow/react`、`react-pdf`,否则构建会把它们打进 bundle(破坏 peer 语义 + 体积暴涨)。
5. **CSS 资源**:`@xyflow/react/dist/style.css` 与 `react-pdf` 的 worker 需在 Next 侧配置(worker 放 `public/` 或 CDN,`styles.css` 聚合到包 `styles.css`)。
6. **RSC**:`"use client"` 全部保留;tsup `splitting:false` 已保证文件级指令不被合并;消费方用 `next/dynamic` 懒加载 RichTextEditor/PDFViewer/OrgChart 三重型组件。
