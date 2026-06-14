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
  "@hookform/resolvers",
  "@radix-ui/react-slot",
  "@tanstack/react-query",
  "@tanstack/react-virtual",
  "axios",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "date-fns",
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
  "zod",
  "zustand",
];

export default defineConfig({
  entry: {
    index: "package/index.ts",
    ui: "package/ui.ts",
    "ui/icons": "package/ui-icons.ts",
    "ui-icons": "package/ui-icons.ts",
    business: "package/business.ts",
    hooks: "package/hooks.ts",
    lib: "package/lib.ts",
    next: "package/next.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  clean: true,
  splitting: false,
  sourcemap: false,
  silent: true,
  target: "es2019",
  treeshake: true,
  external,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".js" : ".cjs",
    };
  },
});
