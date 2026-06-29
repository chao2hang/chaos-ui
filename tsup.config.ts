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
  "recharts",
  "sonner",
  "tailwind-merge",
  "vaul",
];

export default defineConfig({
  entry: {
    index: "components/ui/index.ts",
    ui: "components/ui/index.ts",
    "ui/icons": "components/ui/icons.ts",
    "ui-icons": "components/ui/icons.ts",
    business: "components/business/index.ts",
    hooks: "hooks/index.ts",
    lib: "lib/index.ts",
    next: "package/next.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  clean: true,
  // preserve-modules: 关闭 treeshake/splitting，逐文件输出。
  // 理由：组件库需逐文件保留 "use client" 指令（treeshake+splitting 会把多模块
  // 合并进共享 chunk，丢弃文件级 "use client"，导致 Next App Router RSC 接入即崩）。
  // tree-shaking 交给消费方 bundler（Next/webpack/vite）在模块粒度做，效果优于库内预打包。
  // 参考：shadcn/ui、Radix、Mantine 均保留模块边界。
  splitting: false,
  treeshake: false,
  sourcemap: true,
  silent: false,
  target: "es2020",
  external,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".js" : ".cjs",
    };
  },
});
