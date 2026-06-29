export default {
  // L1: TypeScript 类型检测
  typecheck: {
    command: "npx tsc --noEmit",
    description: "TypeScript 类型检查 —— 编译时类型安全",
  },
  // L2: ESLint 语义检测
  eslint: {
    command: "npm run lint",
    description: "ESLint 语义检查 —— forwardRef、中文硬编码、原生元素、Story 覆盖",
  },
  // L3: Stylelint 样式检测
  stylelint: {
    command: "npm run lint:css",
    description: "Stylelint 样式检查 —— 禁止 hex 颜色、!important、裸元素选择器",
  },
  // L4: Dependency Cruiser 导入约束
  deps: {
    command: "npm run lint:deps",
    description: "Dependency Cruiser —— 禁止第三方 UI 库、层级违规、循环引用",
  },
  // L5: Storybook 构建验证
  storybook: {
    command: "npm run build-storybook",
    description: "Storybook 构建验证 —— 确保所有 story 可编译",
  },
  // L6: 测试 + 覆盖率
  test: {
    command: "npm run test:coverage",
    description: "Vitest 测试覆盖率 —— 全局 >=60%，hooks/lib >=80%",
  },
  // 一键全检
  all: {
    command: "npm run check && npm run build-storybook && npm run test:coverage",
    description: "全量检测 —— L1-L6 一次性执行",
  },
};
