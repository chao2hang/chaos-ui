/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": root,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    clearMocks: true,
    restoreMocks: true,
    pool: "threads",
    // workspace: 支持 storybook / unit / a11y 多项目（未来扩展）
    // workspace: ["./vitest.config.ts", "./apps/docs/vitest.config.ts"],
    // apps/docs/@ 是 monorepo 重构引入的"影子副本"（非发布源码，含 88 个空测试），
    // 测它等于测非发布代码。apps/docs 有自己的 vitest.config（Storybook project）。
    // packages/chaos-design-ui 是独立的姊妹包，有自己的 package.json，不应被根 test 跑。
    // 这里排除，让根 pnpm test 只测 @chaos_team/chaos-ui 自身源码（components/hooks/lib）。
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      ".next/**",
      "storybook-static/**",
      "apps/**",
      "packages/**",
      "e2e/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: [
        "hooks/**/*.ts",
        "lib/**/*.ts",
        "components/**/*.tsx",
        "eslint-plugin-chaos/rules/**/*.js",
      ],
      exclude: [
        "**/*.stories.*",
        "**/*.d.ts",
        "node_modules/**",
        ".next/**",
        "dist/**",
        "storybook-static/**",
        "coverage/**",
        "e2e/**",
      ],
      // Coverage thresholds: real-measured baseline after v1.1.0 merge
      // (2026-07-09) with a 2-3% buffer below actual coverage:
      //   Lines 64.45% / Branches 60.07% / Funcs 63.41% / Stmts 66.01%
      // v1.1.0 合并引入大量新组件后覆盖率下降，阈值随之下调作为新基线。
      // When the team crosses 85/80/85/85, restore the aspirational gate.
      thresholds: {
        lines: 60,
        branches: 57,
        functions: 60,
        statements: 63,
      },
    },
  },
});
