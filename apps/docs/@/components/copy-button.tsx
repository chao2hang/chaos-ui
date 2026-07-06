"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  code: string;
}

/**
 * Small client-only island that lives on top of a Shiki-rendered code panel
 * and copies its raw source to the clipboard on click.
 * Kept identical to the previous inline copy button: 2s "copied" feedback,
 * hidden until hover via the parent's `group` class.
 */
export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard rejected (e.g. insecure context) — silently ignore
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="absolute top-1 right-1 z-10 opacity-0 transition-opacity group-hover:opacity-100"
      onClick={handleCopy}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="size-3 text-green-500" />
      ) : (
        <Copy className="size-3" />
      )}
    </Button>
  );
}
