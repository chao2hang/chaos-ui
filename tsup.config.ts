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
  splitting: true,
  sourcemap: true,
  silent: false,
  target: "es2020",
  treeshake: { preset: "smallest" },
  external,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".js" : ".cjs",
    };
  },
});
