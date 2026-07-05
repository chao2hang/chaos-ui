"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code-block";

type PackageManager = "npm" | "pnpm" | "yarn";

const pkgManagers: { id: PackageManager; label: string }[] = [
  { id: "npm", label: "npm" },
  { id: "pnpm", label: "pnpm" },
  { id: "yarn", label: "yarn" },
];

const commands: Record<PackageManager, string> = {
  npm: "npm install @qxyfoods/chaos-ui",
  pnpm: "pnpm add @qxyfoods/chaos-ui",
  yarn: "yarn add @qxyfoods/chaos-ui",
};

const cssImport = `/* styles.css */
@import "@qxyfoods/chaos-ui/styles.css";`;

const usageCode = `import { Button } from "@qxyfoods/chaos-ui/ui";
import { useCrud } from "@qxyfoods/chaos-ui/hooks";
import { cn } from "@qxyfoods/chaos-ui/lib";

export default function App() {
  return <Button>Click me</Button>;
}`;

export function InstallTabs() {
  const [pkg, setPkg] = useState<PackageManager>("npm");

  return (
    <div className="space-y-6">
      {/* Package manager tabs */}
      <div>
        <div className="mb-3 flex gap-1">
          {pkgManagers.map((pm) => (
            <button
              key={pm.id}
              type="button"
              onClick={() => setPkg(pm.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                pkg === pm.id
                  ? "bg-brand-500 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {pm.label}
            </button>
          ))}
        </div>
        <CodeBlock code={commands[pkg]} lang="bash" />
      </div>

      {/* CSS import */}
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">
          导入样式
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            CSS Import
          </span>
        </p>
        <CodeBlock code={cssImport} lang="css" />
      </div>

      {/* Usage example */}
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">
          开始使用
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            Usage
          </span>
        </p>
        <CodeBlock code={usageCode} lang="tsx" />
      </div>
    </div>
  );
}
