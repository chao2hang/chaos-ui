import fs from "node:fs";

const fixes = [
  {
    file: "components/business/index.ts",
    lines: [
      'export type { ErrorPageProps } from "./error-page";',
      'export type { ThemeToggleProps } from "./theme-toggle";',
    ],
  },
  {
    file: "components/layout/index.ts",
    lines: [
      'export type { PublicLayoutProps } from "./public-layout";',
      'export type { TopBarProps } from "./top-bar";',
    ],
  },
  {
    file: "components/ui/index.ts",
    lines: [
      'export { Sonner } from "./sonner";',
      'export type { SonnerProps } from "./sonner";',
    ],
  },
];

for (const { file, lines } of fixes) {
  let content = fs.readFileSync(file, "utf-8");
  for (const line of lines) {
    content = content.replace(line + "\n", "");
  }
  fs.writeFileSync(file, content);
}

console.log("Fixed barrel exports");
