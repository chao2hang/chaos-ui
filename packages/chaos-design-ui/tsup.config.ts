import { defineConfig } from "tsup"
import { globSync } from "glob"

const uiComponents = globSync("components/ui/*.tsx", { cwd: __dirname })
  .filter((f) => !f.includes(".test."))
  .reduce(
  (acc, file) => {
    const key = file.replace(/\\/g, "/").replace(/\.tsx$/, "")
    acc[key] = file
    return acc
  },
  {} as Record<string, string>
)

const businessComponents = globSync("components/business/*.tsx", {
  cwd: __dirname,
}).filter((f) => !f.includes(".test."))
  .reduce(
  (acc, file) => {
    const key = file.replace(/\\/g, "/").replace(/\.tsx$/, "")
    acc[key] = file
    return acc
  },
  {} as Record<string, string>
)

const layoutComponents = globSync("components/layout/*.tsx", {
  cwd: __dirname,
}).filter((f) => !f.includes(".test."))
  .reduce(
  (acc, file) => {
    const key = file.replace(/\\/g, "/").replace(/\.tsx$/, "")
    acc[key] = file
    return acc
  },
  {} as Record<string, string>
)

const hooks = globSync("hooks/*.{ts,tsx}", { cwd: __dirname })
  .filter((f) => !f.includes(".test."))
  .reduce(
  (acc, file) => {
    const key = file.replace(/\\/g, "/").replace(/\.(ts|tsx)$/, "")
    acc[key] = file
    return acc
  },
  {} as Record<string, string>
)

const libFiles = globSync("lib/*.ts", { cwd: __dirname }).reduce(
  (acc, file) => {
    const key = file.replace(/\\/g, "/").replace(/\.ts$/, "")
    acc[key] = file
    return acc
  },
  {} as Record<string, string>
)

export default defineConfig({
  entry: {
    index: "index.ts",
    ...uiComponents,
    ...businessComponents,
    ...layoutComponents,
    ...hooks,
    ...libFiles,
  },
  format: ["esm"],
  dts: false, // TODO: fix React 19 type conflicts with native element event handlers
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "next",
    "next-themes",
    "next-intl",
    "next/font/google",
    "next/image",
    "next/link",
    "next/navigation",
    "next/dynamic",
    "tailwindcss",
    "@tailwindcss/postcss",
    "vitest",
    "@testing-library/react",
    "@testing-library/user-event",
    "@testing-library/jest-dom",
    "@faker-js/faker",
  ],
  esbuildOptions(options) {
    options.alias = { "@": "./" }
  },
  onSuccess: async () => {
    const { copyFileSync } = await import("node:fs")
    copyFileSync("styles.css", "dist/styles.css")
    console.log("  ✓ Copied styles.css to dist/")
  },
})