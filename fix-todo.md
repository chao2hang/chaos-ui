# todo.md 审计结论 + 修复清单

> 审计时间:2026-07-07
> 审计方法:对 todo.md 中 22 项 `[x]` 标记逐项用新鲜证据核实(脚本实际执行 + 文件落盘核查),不信任文件自报。

---

## 一、审计总览

|                Agent |   项数 | 已完成 |                 未完成/有问题 |
| -------------------: | -----: | -----: | ----------------------------: |
| Agent C (title 统一) |      4 |      4 |                             0 |
|   Agent A (故事补全) |      7 |      7 |                             0 |
| Agent B (注册表重生) |      8 |      8 |        **0(脚本有 bug,见下)** |
|       Agent D (验证) |      6 |      5 |        **1(注册表缺口 1 条)** |
|             **合计** | **25** | **24** | **1(衍生出 1 个 BUG 修复项)** |

**结论:todo.md 全部 25 项已勾选,但有 1 处实质性缺口未消除,需要追加 fix。**

---

## 二、逐项核实明细

### Agent C — 全部通过 ✅

- **C-1** 扫描 stories title:`awk`/`python3` 全量扫描 `src/stories/{ui,layout,business,mobile}/**/*.stories.tsx`,CSF title 顶层前缀 = `{Business, Components, Layouts, Mobile}` 四类,无残留。
- **C-2** 修正后无 `Components /` 带尾空格、无 `Feedback /` 前缀。
- **C-3** 修正后无 `Layout/` 单数前缀(`Layouts/` 复数已是统一形式)。
- **C-4** 无 `ui/`、`layout/`、`Feedback /` 等旧前缀残留。

### Agent A — 全部通过 ✅

- **A-1** `.storybook/main.ts:14` 已含 `"../src/stories/mobile/**/*.stories.@(js|jsx|mjs|ts|tsx)"`。
- **A-2 ~ A-5** 4 个 business story 文件均落盘:
  - `src/stories/business/browse-dialog.stories.tsx`(2921B, 2026-07-07 14:11)
  - `src/stories/business/expense-line-editor.stories.tsx`(1379B)
  - `src/stories/business/rating.stories.tsx`(860B)
  - `src/stories/business/search-table.stories.tsx`(2058B)
- **A-6 ~ A-8** 3 个 mobile story 文件均落盘:`mobile-form-field.stories.tsx`(1949B)、`mobile-select.stories.tsx`(978B)、`mobile-textarea.stories.tsx`(692B)。
- 7 个新 story 全部进入 `storybook-static/index.json`(CSF id 可定位):
  - `mobile-mobileformfield--default`、`mobile-mobileselect--default`、`mobile-mobiletextarea--default`
  - `business-pickers-browsedialog--default`、`business-forms-expenselineeditor--default`
  - `components-rating--default`、`business-datadisplay-searchtable--default`

### Agent B — 完成但脚本有 bug ⚠️

- **B-1 ~ B-3** 脚本 `scripts/enhanced-bootstrap.py` 1493 行,`discover_sources()` 正确遍历 `ui/layout/business/mobile` 四目录、按 category 归类。
- **B-4** `storybookId` 推导规则已就位。
- **B-6** 已执行,产物 `apps/docs/@/content/components.meta.ts` 含 494 条 ComponentMeta。
- **B-7** `apps/docs/app/page.tsx:38` 已改为 `${components.length}+` 动态值。
- **B-8** 重跑 diff 发现缺口 ≠ 0:**1 条源 → 注册表缺口**(ChatSharedLink),详见 FIX-1。

### Agent D — 5/6 通过,1 项有缺口 ❌

- **D-1** `npx tsc --noEmit` → **EXIT=0** ✅
- **D-2** `npm run lint` → **0 errors / 1970 warnings / EXIT=0** ✅(warning 主要是 story 中的 `console.log` 与 `lucide-react` 直引,已存在的非阻塞噪声,不在本审计修复范围)
- **D-3** `npm run build-storybook` → `storybook-static/` 时间戳 14:12-14:13 今日,2315 entries,mobile 分组 125 条,7 个新 story 全部编译通过 ✅
- **D-4** **3 个 diff 复跑结果**:
  - 源 → 故事:**0 真缺口**(初扫得到 25 条疑似缺口,逐一用 `imports` 关联核实,全部为分组 story:`Bills.stories.tsx` 含 `BillFooter/Header/StatusBar`、`Charts.stories.tsx` 含 `Chart`、`Grid.stories.tsx` 等。名义缺失 ≠ 真实缺失)✅
  - 源 → 注册表:**1 缺口**(`ChatSharedLink`)❌
  - 注册表 → 源:**0 orphan** ✅
- **D-5** 等价于 D-4 的可视化抽查,3 计数 = `{源:495, 故事:≥495(分组), 注册表:494}` — 不一致 = 1。
- **D-6** 报告见本文件第一/二节。

---

## 三、修复清单

### FIX-1: `ChatSharedLink` 注册表缺失(BUG,Agent B 收尾未捕获)

**根因:**

- `scripts/enhanced-bootstrap.py:1296-1300` 设有 `shared` 名称过滤:
  ```python
  if slug.startswith("_") or "shared" in slug or "helpers" in slug:
      content = path.read_text()
      if not re.search(r'export\s+(function|const)\s+[A-Z]', content):
          continue
  ```
- `components/business/chat-shared-link.tsx:60-61` 实际写法是 **后置命名导出**:
  ```ts
  function ChatSharedLink(...) { ... }
  export { ChatSharedLink };
  export type { ChatSharedLinkProps };
  ```
- 正则 `export\s+(function|const)\s+[A-Z]` 不命中 `export { ChatSharedLink };` → 脚本误判为子工具文件并 `continue` 跳过。
- 后果:`chat-shared-link.tsx` 是真实组件、有 `ChatSharedLink.stories.tsx`(标题 `Business/Chat/ChatSharedLink`)、在 storybook-static 中存在(`business-chat-chatsharedlink--docs`),但 `components.meta.ts` 中无对应 ComponentMeta,docs `/components` 页面看不到。

**修复步骤(2 选 1,推荐方案 A):**

**方案 A(推荐,修脚本根因):**

1. 改 `scripts/enhanced-bootstrap.py:1296-1300` 的正则,同时识别三种命名导出形态:
   ```python
   # 修改前
   if not re.search(r'export\s+(function|const)\s+[A-Z]', content):
       continue
   # 修改后(覆盖 export { X } / export function X / export const X / export default X)
   if not re.search(
       r'export\s+(?:\{[^}]*\b[A-Z][A-Za-z0-9_]*\b|default\s+[A-Z]|function\s+[A-Z]|const\s+[A-Z])',
       content,
   ):
       continue
   ```
2. 重跑 `python3 scripts/enhanced-bootstrap.py`,确认 `ChatSharedLink` 出现在 `components.meta.ts`。
3. 复跑源→注册表 diff,确认缺口 = 0。

**方案 B(临时,手动追加):**

- 在 `apps/docs/@/content/components.meta.ts` 中追加一条:
  ```ts
  {
    name: "ChatSharedLink",
    slug: "chat-shared-link",
    desc: "共享链接卡片(标题、描述、外链跳转)",
    category: "Business",
    subCategory: "Chat",
    tags: ["chat", "shared", "link"],
    storybookId: "business-chat-chatsharedlink--docs",
    sourcePath: "@/components/business/chat-shared-link.tsx",
    nameZh: "共享链接卡片",
    descZh: "Chat 模块的共享链接卡片(标题、描述、外链跳转)。",
    since: "0.7.0",
  },
  ```
- 然后用方案 A 真正修复脚本,避免下次重生又被吃掉。

**验收标准:**

- 复跑 `python3 scripts/enhanced-bootstrap.py`,产物含 `name: "ChatSharedLink"`。
- 复跑 3 个 diff 脚本:全部归零。
- `npx tsc --noEmit` 仍 EXIT=0。
- 复跑 D-4 标记完成。

---

## 四、风险与说明

1. **"源→故事 0" 看起来是 25 条名义缺失**,全部为分组 story(Bills/Charts/Grid/...)和命名大小写差异(ChatSharedLink↔chat-shared-link、MobileKpiCard↔MobileKPICard 等)。这是审计方法学问题,不是真缺口,已在 D-4 核实中说明。
2. **1970 条 lint warning** 主要是 pre-existing:`console.log`(story 调试输出)+ `lucide-react` 直引违规。不在本 audit 修复范围;若要清理,见 todo.md 之外的后续专项。
3. **storybook-static/ 为生成产物**(`AGENTS.md` 明令不可手动编辑),审计只读不写。
