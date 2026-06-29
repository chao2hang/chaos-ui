# Chaos UI 全局检测计划

## 8 层检测体系

```
┌─────────────────────────────────────────────┐
│  L8  CI/CD 流水线    GitHub Actions          │
│  L7  Pre-commit 门禁 lint-staged + husky    │
│  L6  测试覆盖率门禁  vitest coverage          │
│  L5  可访问性检测    axe-core + storybook a11y│
│  L4  导入依赖检测    dependency-cruiser       │
│  L3  样式令牌检测    stylelint               │
│  L2  语义代码检测    ESLint + 自定义插件       │
│  L1  类型系统检测    TypeScript strict        │
└─────────────────────────────────────────────┘
```

## 各层详情

### L1 — TypeScript 类型检测

| 规则 | 状态 | 说明 |
|------|------|------|
| `strict: true` | 已有 | 启用所有严格模式检查 |
| `noUncheckedIndexedAccess` | 新增 | 防止索引访问返回 undefined 未处理 |
| `noFallthroughCasesInSwitch` | 新增 | 禁止 switch case 穿透 |
| `exactOptionalPropertyTypes` | 新增 | 可选属性类型精确匹配 |

### L2 — ESLint 语义检测

**内置规则：**
| 规则 | 级别 | 说明 |
|------|------|------|
| `no-restricted-imports` | error | 禁止导入 antd/@mui/element-plus/arco-design 等第三方 UI 库 |
| `no-console` | warn | 生产代码禁止 console.log |
| `import/no-cycle` | error | 禁止循环引用 |

**自定义插件 `@chaos/eslint-plugin`：**
| 规则 | 级别 | 说明 |
|------|------|------|
| `require-forward-ref` | error | UI 组件必须使用 forwardRef 包裹 |
| `no-hardcoded-chinese` | warn | 组件中不应硬编码中文字符串 |
| `no-missing-story` | warn | 组件必须有对应的 Storybook story |
| `no-raw-html-button` | error | 禁止使用原生 `<button>`，必须用 `<Button>` |

### L3 — Stylelint 样式检测

| 规则 | 级别 | 说明 |
|------|------|------|
| `color-no-hex` | error | 禁止硬编码 hex 色值 |
| `declaration-no-important` | error | 禁止 `!important` |
| `declaration-property-value-allowed-list` | error | 只允许 CSS 自定义属性作为颜色值 |
| `selector-max-id` | error | 禁止 ID 选择器 |
| `unit-allowed-list` | error | 只允许 `rem/%/vw/vh/em/px` |

### L4 — Dependency Cruiser 导入约束

| 规则 | 说明 |
|------|------|
| `no-third-party-ui` | 禁止导入 antd/@mui/element-plus/arco-design/ant-design-vue |
| `no-restricted-imports` | 禁止 import 被列入黑名单的包 |
| `layer-boundary` | business/ 只能 import ui/, lib/, hooks/；ui/ 只能 import lib/, hooks/ |
| `no-circular` | 禁止循环引用 |

### L5 — 可访问性检测

| 工具 | 说明 |
|------|------|
| Storybook a11y addon | 已有，每个 story 的 a11y 检查 |
| axe-core CLI | CI 中扫描 storybook-static/ 的 HTML |
| eslint-plugin-jsx-a11y | ESLint 规则：alt-text, label-has-associated-control, no-static-element-interactions |

### L6 — 测试覆盖率门禁

| 指标 | 阈值 |
|------|------|
| 总行覆盖率 | >= 60% |
| hooks 覆盖率 | >= 80% |
| lib 覆盖率 | >= 80% |
| ui 组件覆盖率 | >= 50% |

### L7 — Pre-commit 门禁

lint-staged 在 `git commit` 时自动触发：
- `*.{ts,tsx}` → ESLint fix + Prettier
- `*.css` → Stylelint fix
- 全量 → `tsc --noEmit`

### L8 — CI/CD 流水线

GitHub Actions 在 PR 时触发：
1. TypeScript 类型检查
2. ESLint 检查
3. Stylelint 检查
4. Dependency Cruiser 检查
5. Vitest 测试 + 覆盖率
6. Storybook 构建验证
7. Playwright E2E（可选）

---

## 下游应用接入

下游应用通过安装 `@chaos/eslint-config` 共享配置自动获得 L1-L4 检测能力：

```json
// 下游应用的 .eslintrc
{
  "extends": ["@chaos/eslint-config"]
}
```

同时安装 `@chaos/stylelint-config` 获得 L3 检测能力。
