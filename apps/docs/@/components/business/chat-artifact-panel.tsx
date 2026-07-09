"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, DownloadIcon, FileTextIcon } from "@/components/ui/icons";
import { ChatMarkdownRenderer } from "./chat-markdown-renderer";

/**
 * @component ChatArtifactPanel
 * @category business/chat
 * @since 0.7.0
 * @description Artifact面板（展示生成内容：标题、类型、内容、复制/下载）
 * @keywords chat, artifact, panel
 * @example
 * <ChatArtifactPanel title="Report" type="document" content="# Hello" />
 */

interface ChatArtifactPanelProps {
  title?: string;
  type?: string;
  content?: string;
  className?: string;
}

function ChatArtifactPanel({ title, type, content, className }: ChatArtifactPanelProps) {
  const [copied, setCopied] = React.useState(false);
  const text = content ?? "";

  const handleCopy = React.useCallback(() => {
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);

  const handleDownload = React.useCallback(() => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (title ?? "artifact").replace(/\s+/g, "-").toLowerCase() + ".md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [text, title]);

  const typeLabel = type ?? "document";

  return (
    <section
      data-slot="chat-artifact-panel"
      aria-label={`Artifact: ${title ?? "Untitled"}`}
      className={cn("flex h-full flex-col overflow-hidden border border-border bg-background", className)}
    >
      <header className="flex items-center gap-2 border-b border-border px-3 py-2">
        <FileTextIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="truncate text-sm font-semibold" title={title ?? "Untitled"}>
            {title ?? "Untitled artifact"}
          </h3>
          <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{typeLabel}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button type="button" variant="ghost" size="icon-sm" onClick={handleCopy} aria-label="Copy artifact">
            {copied ? <CheckIcon className="size-4 text-green-600" aria-hidden /> : <CopyIcon className="size-4" aria-hidden />}
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" onClick={handleDownload} aria-label="Download artifact">
            <DownloadIcon className="size-4" aria-hidden />
          </Button>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {text ? (
          <ChatMarkdownRenderer content={text} />
        ) : (
          <p className="text-sm text-muted-foreground">No content generated yet.</p>
        )}
      </div>
    </section>
  );
}

export { ChatArtifactPanel };
export type { ChatArtifactPanelProps };
