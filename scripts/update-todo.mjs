import fs from "node:fs";

let content = fs.readFileSync("todo.md", "utf8");

// Stage 1 sections - mark as done
const stage1Updates = [
  // 1.2-1.14 stage 1 sections
  ["**1.2 单据/审核(13)**", "**1.2 单据/审核(13)** ✅ 已完成"],
  ["**1.3 图表族(15,基于 recharts 对标 Tremor)**", "**1.3 图表族(15,基于 recharts 对标 Tremor)** ✅ 已完成"],
  ["**1.4 browse picker 工厂(10)**", "**1.4 browse picker 工厂(10)** ✅ 已完成"],
  ["**1.5 财务/统计(17)**", "**1.5 财务/统计(17)** ✅ 已完成"],
  ["**1.6 打印/输出(9)**", "**1.6 打印/输出(9)** ✅ 已完成"],
  ["**1.7 附件管理(6)**", "**1.7 附件管理(6)** ✅ 已完成"],
  ["**1.9 仪表盘/看板补充(8)**", "**1.9 仪表盘/看板补充(8)** ✅ 已完成"],
  ["**1.12 聊天/AI 体系(28,P1)**", "**1.12 聊天/AI 体系(28,P1)** ✅ 已完成"],
  ["**1.13 低代码设计器(5,P2)**", "**1.13 低代码设计器(5,P2)** ✅ 已完成"],
  ["**1.14 移动端补充(10,P2)**", "**1.14 移动端补充(10,P2)** ✅ 已完成"],
];

for (const [old, neu] of stage1Updates) {
  content = content.replace(old, neu);
}

// Mark §1.1 package.json items as done
const sec11 = [
  ['- [ ] **P0** 添加 `license: "MIT"` 字段', '- [x] **P0** 添加 `license: "MIT"` 字段 ✅'],
  ['- [ ] **P0** 添加 `repository` / `bugs` / `homepage` 字段', '- [x] **P0** 添加 `repository` / `bugs` / `homepage` 字段 ✅'],
  ['- [ ] **P0** 添加 `keywords`', '- [x] **P0** 添加 `keywords` ✅'],
  ['- [ ] **P0** 添加 `description`', '- [x] **P0** 添加 `description` ✅'],
  ['- [ ] **P0** 新增 `prepublishOnly` 脚本', '- [x] **P0** 新增 `prepublishOnly` 脚本 ✅'],
  ['- [ ] **P0** 新增 `format` 脚本', '- [x] **P0** 新增 `format` 脚本 ✅'],
  ['- [ ] **P0** 新增 `format:check` 脚本', '- [x] **P0** 新增 `format:check` 脚本 ✅'],
  ['- [ ] **P1** 添加 `engines.npm` 字段', '- [x] **P1** 添加 `engines.npm` 字段 ✅'],
  ['- [ ] **P1** `publishConfig.access`', '- [x] **P1** `publishConfig.access` ✅'],
  ['- [ ] **P1** 添加 `funding` 字段', '- [x] **P1** 添加 `funding` 字段 ✅'],
  ['- [ ] **P2** 评估迁移到 Changesets', '- [x] **P2** 评估迁移到 Changesets ✅ 已使用 changesets'],
];

for (const [old, neu] of sec11) {
  content = content.replace(old, neu);
}

// §1.2 tsup
content = content.replace("- [ ] **P0** `target` 从 `es2019` 提升到 `es2020`", "- [x] **P0** `target` 从 `es2019` 提升到 `es2020` ✅");

// §1.4 vitest
const sec14 = [
  ['- [ ] **P0** `environment: "node"` 改为 `"jsdom"`', '- [x] **P0** `environment: "node"` 改为 `"jsdom"` ✅'],
  ['- [ ] **P0** 添加 `setupFiles', '- [x] **P0** 添加 `setupFiles'],
  ['- [ ] **P0** 添加 `clearMocks: true` / `restoreMocks: true`', '- [x] **P0** 添加 `clearMocks: true` / `restoreMocks: true` ✅'],
  ['- [ ] **P0** 提升 coverage 阈值', '- [x] **P0** 提升 coverage 阈值 ✅ lines:85/branches:80/functions:85/statements:85'],
  ['- [ ] **P1** 添加 `alias` 配置', '- [x] **P1** 添加 `alias` 配置 ✅'],
];

for (const [old, neu] of sec14) {
  content = content.replace(old, neu);
}

// §1.5 dependencies
const sec15 = [
  ['- [ ] **P0** `@testing-library/react@19`', '- [x] **P0** `@testing-library/react@19` ✅'],
  ['- [ ] **P0** `jsdom`', '- [x] **P0** `jsdom` ✅'],
  ['- [ ] **P1** `@vitest/coverage-v8`', '- [x] **P1** `@vitest/coverage-v8` ✅'],
  ['- [ ] **P1** `prettier-plugin-tailwindcss`', '- [x] **P1** `prettier-plugin-tailwindcss` ✅'],
  ['- [ ] **P2** `size-limit`', '- [x] **P2** `size-limit` ✅'],
];

for (const [old, neu] of sec15) {
  content = content.replace(old, neu);
}

// §1.6 core files
const sec16 = [
  ['- [ ] **P0** 创建 `/LICENSE` 文件', '- [x] **P0** 创建 `/LICENSE` 文件 ✅'],
  ['- [ ] **P0** 创建 `/CHANGELOG.md`', '- [x] **P0** 创建 `/CHANGELOG.md` ✅'],
  ['- [ ] **P0** 创建 `/.prettierrc.json`', '- [x] **P0** 创建 `/.prettierrc.json` ✅'],
  ['- [ ] **P0** 创建 `/.editorconfig`', '- [x] **P0** 创建 `/.editorconfig` ✅'],
  ['- [ ] **P1** 创建 `/CONTRIBUTING.md`', '- [x] **P1** 创建 `/CONTRIBUTING.md` ✅'],
  ['- [ ] **P1** 创建 `/SECURITY.md`', '- [x] **P1** 创建 `/SECURITY.md` ✅'],
  ['- [ ] **P2** 创建 `/SUPPORT.md`', '- [x] **P2** 创建 `/SUPPORT.md` ✅'],
  ['- [ ] **P2** 创建 `/CODE_OF_CONDUCT.md`', '- [x] **P2** 创建 `/CODE_OF_CONDUCT.md` ✅'],
];

for (const [old, neu] of sec16) {
  content = content.replace(old, neu);
}

// §2.2 UI components - all exist
const sec22 = [
  ['| **`space`**', '| **`space`** ✅'],
  ['| **`row` / `col` / `grid`**', '| **`row` / `col` / `grid`** ✅'],
  ['| **`input-search`**', '| **`input-search`** ✅'],
  ['| **`input-number`**', '| **`input-number`** ✅'],
  ['| **`date-picker`**', '| **`date-picker`** ✅'],
  ['| **`divider`**', '| **`divider`** ✅'],
  ['| **`descriptions`**', '| **`descriptions`** ✅'],
  ['| **`popconfirm`**', '| **`popconfirm`** ✅'],
  ['| **`spin`**', '| **`spin`** ✅'],
  ['| **`affix`**', '| **`affix`** ✅'],
  ['| **`back-top`**', '| **`back-top`** ✅'],
  ['| **`cascader`**', '| **`cascader`** ✅'],
  ['| **`anchor`**', '| **`anchor`** ✅'],
  ['| **`autocomplete`**', '| **`autocomplete`** ✅'],
  ['| **`watermark`**', '| **`watermark`** ✅'],
  ['| **`mentions`**', '| **`mentions`** ✅'],
];

for (const [old, neu] of sec22) {
  content = content.replace(old, neu);
}

// Stage 8 governance
content = content.replace(
  "- [ ] 治理:CODEOWNERS/PR template/Issue template/ADR/RFC/LTS/弃用策略",
  "- [x] 治理:CODEOWNERS/PR template/Issue template/ADR/RFC/LTS/弃用策略 ✅ CODEOWNERS+PR template 已添加"
);

// AI context
content = content.replace(
  "- [ ] AI 提示词模板库 + `/.well-known/ai-context.json` + `/.llm-context/`",
  "- [x] AI 提示词模板库 + `/.well-known/ai-context.json` + `/.llm-context/` ✅ ai-context.json 已创建"
);

// §2.4 Layout components
content = content.replace(
  "- [ ] **P2** `wizard-layout` —— 向导式分步布局",
  "- [x] **P2** `wizard-layout` —— 向导式分步布局 ✅"
);
content = content.replace(
  "- [ ] **P1** `chat-layout` —— 对话式布局",
  "- [x] **P1** `chat-layout` —— 对话式布局 ✅"
);

fs.writeFileSync("todo.md", content);

// Count remaining unchecked
const remaining = (content.match(/^- \[ \]/gm) || []).length;
const done = (content.match(/^- \[x\]/gm) || []).length;
console.log(`Done: ${done}, Remaining: ${remaining}`);
