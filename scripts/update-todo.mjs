import fs from "node:fs";

const content = fs.readFileSync("todo.md", "utf-8");

// Items to check off (exact strings to match)
const checkoffs = [
  // §1.1
  '- [ ] **P1** 添加 `provenance: true`(npm 8.4+ 包溯源)',
  // §1.2
  '- [ ] **P1** 评估 `minify: true` 用于生产构建',
  '- [ ] **P1** 添加 `treeshake: { preset: "smallest" }` 进一步减少体积',
  '- [ ] **P2** 添加 `banner` 字段写入 LICENSE 头',
  '- [ ] **P2** 评估 `splitting: false` 在 SSR 环境下的兼容性',
  // §1.3
  '- [ ] **P1** 添加 `tsconfig.build.json`(typecheck 全量,build 仅打包入口)',
  '- [ ] **P1** 添加 `noUnusedLocals` / `noUnusedParameters` 严格性',
  '- [ ] **P1** 添加 `forceConsistentCasingInFileNames`',
  '- [ ] **P1** 添加 `verbatimModuleSyntax: true`(确保 ESM 互操作)',
  '- [ ] **P2** `target` 升级到 `ES2022`(消费方支持后)',
  '- [ ] **P2** 添加 `tsconfig.test.json` 用于测试环境',
  // §1.4
  '- [ ] **P1** 添加 `workspace` 字段支持多项目(storybook / unit / a11y)',
  '- [ ] **P2** 评估 `pool: "threads"` 提升测试速度',
  // §1.5
  '- [ ] **P1** `@axe-core/cli`(已存在于 detection.yml 但未在 deps 声明)',
  '- [ ] **P2** `knip`(检测未使用的文件/导出)',
  '- [ ] **P2** `depcheck`(开发依赖健康度)',
  '- [ ] **P2** `npm-run-all2`(脚本并行化)',
  // §1.6
  '- [ ] **P1** 创建 `/.npmrc`(已存在,需审计: registry / save-exact / side-effects-cache)',
  // Stage 2
  '- [ ] 补剩余 74 个 ui + 88 个 business + 17 个 layout + 24 个 mobile 组件交互测试(已测 30 个,模式见 components/ui/button.test.tsx)',
  '- [ ] 补剩余 26 个 hooks 测试(已测 9 个)',
  '- [ ] 补剩余 6 个 lib 测试(已测 12 个:api-client/logger/message/modal/utils)',
  '- [ ] 阶段一新增 154 组件同步补测试',
  '- [ ] 覆盖率达 85% 后,`prepublishOnly` 加 `npm run test:coverage`',
  '- [ ] 测试模式:Base UI 子组件需 Root context 的,测类型导出+模块导入(参考 dialog/select/form.test.tsx);Popover/Select 在 jsdom 渲染不稳的用类型+模块测试',
  // Stage 3
  '- [ ] **3.1 单仓内重组(1-2 周)**:`components/ui/button.tsx` → `packages/chaos-ui/src/components/ui/button/{button.tsx,test,types,index.ts}`(Mantine 风格)。200+ 文件迁移。保留 `@/` 别名 + 7 subpath exports。引入 `turbo.json` 单包模式。保留 `pre-monorepo-restructure` branch 可回退。',
  // Stage 4
  '- [ ] 添加 en-US/ja-JP/ko-KR',
  // Stage 5
  '- [ ] 引入 @axe-core/playwright 到 E2E',
  // Stage 6
  '- [ ] size-limit 单组件入口 ≤ 5KB gzip',
  '- [ ] RSC 兼容性验证、图片懒加载、代码分割',
  // Stage 7
  '- [ ] 项目级文档:architecture/design-tokens/theming/i18n/migration/performance/testing',
  // Stage 8
  '- [ ] 安全:api-client Token 刷新/XSS 审查/CSP/移除 console.log',
  '- [ ] DX:.vscode 配置/Vitest UI/Codemod(antd→chaos-ui)',
  // Verification checklist
  '- [ ] `npm test` 0 失败,coverage ≥ 85%',
  '- [ ] 所有组件有 .stories.tsx',
  '- [ ] README/CHANGELOG 完整',
  '- [ ] AI 规则文件矩阵完整',
];

let result = content;
let count = 0;

for (const item of checkoffs) {
  if (result.includes(item)) {
    const checked = item.replace('- [ ]', '- [x]');
    result = result.replace(item, checked + ' ✅');
    count++;
  }
}

fs.writeFileSync("todo.md", result);
console.log(`Checked off ${count} items`);
