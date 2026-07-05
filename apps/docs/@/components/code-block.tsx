"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  /** Optional language label shown in the top-right (e.g. "bash", "tsx"). */
  lang?: string;
}

/**
 * Reusable code block with a copy-to-clipboard button.
 * `install-tabs.tsx` and MDX content both reuse this component.
 * Behaviour kept identical to the original inline implementation:
 *  - copy via `navigator.clipboard.writeText`
 *  - 2s "copied" feedback with a green check icon
 *  - copy button hidden until hover (group-hover)
 */
export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {lang && (
        <span className="absolute right-12 top-2 text-[10px] uppercase text-muted-foreground">
          {lang}
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
