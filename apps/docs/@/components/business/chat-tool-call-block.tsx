"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  Loader2Icon,
  XCircleIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ChatToolCallBlock
 * @category business/chat
 * @since 0.7.0
 * @description AI工具调用展示（调用中/成功/失败，可展开查看输入输出）
 * @keywords chat, tool, call, block
 * @example
 * <ChatToolCallBlock toolName="search" status="success" toolInput={{ q: "x" }} />
 */

interface ChatToolCallBlockProps {
  toolName: string;
  toolInput?: unknown;
  toolOutput?: unknown;
  status: "calling" | "success" | "error";
  className?: string;
}

function safeStringify(value: unknown): string {
  try {
    if (value === undefined) return "";
    if (typeof value === "string") return value;
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function ChatToolCallBlock({
  toolName,
  toolInput,
  toolOutput,
  status,
  className,
}: ChatToolCallBlockProps) {
  const [open, setOpen] = React.useState(false);
  const inputText = toolInput !== undefined ? safeStringify(toolInput) : "";
  const outputText = toolOutput !== undefined ? safeStringify(toolOutput) : "";

  const statusMeta = {
    calling: {
      Icon: Loader2Icon,
      label: "Calling",
      color: "text-blue-600 dark:text-blue-400",
      spin: true,
    },
    success: {
      Icon: CheckCircle2Icon,
      label: "Success",
      color: "text-green-600 dark:text-green-400",
      spin: false,
    },
    error: {
      Icon: XCircleIcon,
      label: "Error",
      color: "text-red-600 dark:text-red-400",
      spin: false,
    },
  }[status];
  const { Icon, label, color, spin } = statusMeta;

  const hasDetail = inputText !== "" || outputText !== "";

  return (
    <div
      data-slot="chat-tool-call-block"
      className={cn("border-border bg-muted/30 rounded-lg border", className)}
    >
      <button
        type="button"
        onClick={() => hasDetail && setOpen((v) => !v)}
        aria-expanded={open}
        disabled={!hasDetail}
        className="hover:bg-muted/50 flex w-full items-center gap-1.5 px-3 py-2 text-xs disabled:cursor-default"
      >
        {hasDetail ? (
          <ChevronRightIcon
            className={cn("size-3.5 transition-transform", open && "rotate-90")}
            aria-hidden
          />
        ) : (
          <span className="size-3.5" aria-hidden />
        )}
        <Icon
          className={cn("size-3.5", spin && "animate-spin", color)}
          aria-hidden
        />
        <span className="text-foreground font-mono font-medium">
          {toolName}
        </span>
        <span className={cn("ml-auto", color)}>{label}</span>
      </button>
      {open && hasDetail ? (
        <div className="border-border border-t px-3 py-2">
          {inputText ? (
            <div className="mb-2">
              <p className="text-muted-foreground mb-1 text-[0.65rem] font-medium tracking-wide uppercase">
                Input
              </p>
              <pre className="bg-muted overflow-x-auto rounded p-2 font-mono text-[0.7rem] leading-relaxed">
                <code>{inputText}</code>
              </pre>
            </div>
          ) : null}
          {outputText ? (
            <div>
              <p className="text-muted-foreground mb-1 text-[0.65rem] font-medium tracking-wide uppercase">
                Output
              </p>
              <pre className="bg-muted overflow-x-auto rounded p-2 font-mono text-[0.7rem] leading-relaxed">
                <code>{outputText}</code>
              </pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { ChatToolCallBlock };
export type { ChatToolCallBlockProps };
