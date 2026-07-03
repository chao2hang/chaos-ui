"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

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

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {language && (
        <span className="absolute right-12 top-2 text-[10px] uppercase text-muted-foreground">
          {language}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon-xs"
        className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
      </Button>
      <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

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
        <CodeBlock code={commands[pkg]} language="bash" />
      </div>

      {/* CSS import */}
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">
          导入样式
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            CSS Import
          </span>
        </p>
        <CodeBlock code={cssImport} language="css" />
      </div>

      {/* Usage example */}
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">
          开始使用
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            Usage
          </span>
        </p>
        <CodeBlock code={usageCode} language="tsx" />
      </div>
    </div>
  );
}
