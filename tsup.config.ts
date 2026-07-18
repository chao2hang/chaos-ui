import { defineConfig } from "tsup";

const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "next",
  "next/link",
  "next-themes",
  "@base-ui/react",
  "@dnd-kit/core",
  "@dnd-kit/sortable",
  "@dnd-kit/utilities",
  "@radix-ui/react-slot",
  "@tanstack/react-table",
  "@tanstack/react-virtual",
  "axios",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "i18next",
  "lucide-react",
  "react-colorful",
  "react-day-picker",
  "react-dropzone",
  "react-hook-form",
  "react-i18next",
  "react-pdf",
  "recharts",
  "sonner",
  "tailwind-merge",
  "vaul",
  "@tiptap/react",
  "@tiptap/starter-kit",
  "@tiptap/extension-link",
  "@tiptap/extension-image",
  "@tiptap/extension-placeholder",
  "@xyflow/react",
  "cronstrue",
  "qrcode",
  "zod",
  "@tanstack/react-query",
  "@hookform/resolvers",
  "@uiw/react-codemirror",
  "@codemirror/lang-css",
  "@codemirror/lang-html",
  "@codemirror/lang-javascript",
  "@codemirror/lang-json",
  "@codemirror/lang-sql",
  "@codemirror/theme-one-dark",
];

export default defineConfig({
  entry: {
    index: "components/ui/index.ts",
    ui: "components/ui/index.ts",
    "ui/icons": "components/ui/icons.ts",
    "ui-icons": "components/ui/icons.ts",
    business: "components/business/index.ts",
    "business-server": "components/business/server.ts",
    layout: "components/layout/index.ts",
    mobile: "components/mobile/index.ts",
    hooks: "hooks/index.ts",
    lib: "lib/index.ts",
    next: "package/next.ts",
  },
  format: ["esm", "cjs"],
  tsconfig: "tsconfig.build.json",
  dts: {
    entry: {
      index: "components/ui/index.ts",
      ui: "components/ui/index.ts",
      "ui/icons": "components/ui/icons.ts",
      "ui-icons": "components/ui/icons.ts",
      business: "components/business/index.ts",
      "business-server": "components/business/server.ts",
      layout: "components/layout/index.ts",
      hooks: "hooks/index.ts",
      lib: "lib/index.ts",
      mobile: "components/mobile/index.ts",
      next: "package/next.ts",
    },
  },
  clean: true,
  // preserve-modules: 关闭 treeshake/splitting，逐文件输出。
  // 理由：组件库需逐文件保留 "use client" 指令（treeshake+splitting 会把多模块
  // 合并进共享 chunk，丢弃文件级 "use client"，导致 Next App Router RSC 接入即崩）。
  // tree-shaking 交给消费方 bundler（Next/webpack/vite）在模块粒度做，效果优于库内预打包。
  splitting: false,
  // treeshake 交给消费方 bundler（splitting: false 时库内 treeshake 无实际效果）
  // 保留 false 以维持文件级 "use client" 指令完整性
  treeshake: false,
  // 发布物关闭 sourcemap：防源码随 tarball 泄露 + 体积从 1.6MB 降到 ~400KB。
  sourcemap: false,
  silent: false,
  target: "es2020",
  // 生产构建启用压缩，减小包体积
  minify: true,
  // LICENSE 头
  banner: {
    js: "/*\n * Chaos UI - Enterprise React Component Library\n * Copyright (c) 2026 qxyfoods\n * MIT License\n */",
  },
  external,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".js" : ".cjs",
    };
  },
});
