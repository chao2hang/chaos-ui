/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    clearMocks: true,
    restoreMocks: true,
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
