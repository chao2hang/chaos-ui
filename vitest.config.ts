/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: [],
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
      exclude: ["**/*.stories.*", "**/*.d.ts", "node_modules/**", ".next/**"],
      thresholds: {
        lines: 60,
        branches: 50,
        functions: 60,
        statements: 60,
      },
    },
  },
});
