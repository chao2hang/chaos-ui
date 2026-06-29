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
      ],
      thresholds: {
        lines: 85,
        branches: 80,
        functions: 85,
        statements: 85,
      },
    },
  },
});
