"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  CheckIcon,
  CopyIcon,
  FileTextIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ChatCodeBlock
 * @category business/chat
 * @since 0.7.0
 * @description 代码块（带语言标签、文件名与一键复制）
 * @keywords chat, code, block
 * @example
 * <ChatCodeBlock code="console.log('hi')" language="ts" />
 */

interface ChatCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

function ChatCodeBlock({
  code,
  language,
  filename,
  className,
}: ChatCodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    void navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCopy();
      }
    },
    [handleCopy],
  );

  return (
    <div
      data-slot="chat-code-block"
      className={cn(
        "border-border bg-muted/40 overflow-hidden rounded-lg border",
        className,
      )}
    >
      <div className="border-border bg-muted/60 flex items-center justify-between gap-2 border-b px-3 py-1.5">
        <div className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-xs">
          {filename ? (
            <>
              <FileTextIcon className="size-3.5 shrink-0" aria-hidden />
              <span className="text-foreground truncate font-medium">
                {filename}
              </span>
            </>
          ) : (
            <span className="tracking-wide uppercase">
              {language ?? "text"}
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={handleCopy}
          onKeyDown={handleKeyDown}
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="size-3.5" aria-hidden />
          ) : (
            <CopyIcon className="size-3.5" aria-hidden />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

export { ChatCodeBlock };
export type { ChatCodeBlockProps };
