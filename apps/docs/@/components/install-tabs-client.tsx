"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

type PackageManager = "npm" | "pnpm" | "yarn";

const pkgManagers: { id: PackageManager; label: string }[] = [
  { id: "npm", label: "npm" },
  { id: "pnpm", label: "pnpm" },
  { id: "yarn", label: "yarn" },
];

export interface PrehighlightedSnippet {
  code: string;
  /** Pre-rendered Shiki HTML for this snippet, or null if highlighting failed. */
  html: string | null;
  lang: string;
}

interface InstallTabsClientProps {
  commands: Record<PackageManager, PrehighlightedSnippet>;
  cssImport: PrehighlightedSnippet;
  usage: PrehighlightedSnippet;
}

function RenderedSnippet({ snippet }: { snippet: PrehighlightedSnippet }) {
  return (
    <div className="group relative my-2">
      <span className="text-muted-foreground absolute top-2 right-12 z-10 text-[10px] uppercase">
        {snippet.lang}
      </span>
      <CopyButton code={snippet.code} />
      {snippet.html ? (
        <div
          className="shiki-wrap overflow-x-auto rounded-lg border text-sm"
          dangerouslySetInnerHTML={{ __html: snippet.html }}
        />
      ) : (
        <pre className="bg-muted/50 overflow-x-auto rounded-lg border p-4 text-sm">
          <code>{snippet.code}</code>
        </pre>
      )}
    </div>
  );
}

/**
 * Client component that owns the package-manager tab state. Receives
 * pre-highlighted Shiki HTML from the server so highlighting happens once at
 * render time — no client-side highlighter bundle.
 */
export function InstallTabsClient({
  commands,
  cssImport,
  usage,
}: InstallTabsClientProps) {
  const [pkg, setPkg] = useState<PackageManager>("npm");

  return (
    <div className="space-y-6">
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
        <RenderedSnippet snippet={commands[pkg]} />
      </div>

      <div>
        <p className="text-foreground mb-2 text-sm font-medium">
          导入样式
          <span className="text-muted-foreground ml-2 text-xs font-normal">
            CSS Import
          </span>
        </p>
        <RenderedSnippet snippet={cssImport} />
      </div>

      <div>
        <p className="text-foreground mb-2 text-sm font-medium">
          开始使用
          <span className="text-muted-foreground ml-2 text-xs font-normal">
            Usage
          </span>
        </p>
        <RenderedSnippet snippet={usage} />
      </div>
    </div>
  );
}
