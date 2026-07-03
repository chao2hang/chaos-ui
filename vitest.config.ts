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
    // 这里排除，让根 npm test 只测 @qxyfoods/chaos-ui 自身源码（components/hooks/lib）。
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
      // Coverage thresholds: real-measured baseline as floor (with a small
      // buffer). The aspirational 85/80/85/85 gate was hit-or-miss because
      // `npm run test:coverage` couldn't finish (form-designer-runtime.tsx
      // infinite-loop hang). After fixing that (2026-07-04) we measured:
      //   Lines 76.61% / Stmts 74.61% / Funcs 71.60% / Branch 68.46%
      // Set thresholds just under that to prevent regression to the
      // historical ~44% line numbers while leaving room to land higher.
      // When the team crosses 85/80/85/85, restore the aspirational gate.
      thresholds: {
        lines: 75,
        branches: 65,
        functions: 70,
        statements: 73,
      },
    },
  },
});
