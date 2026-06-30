"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

/**
 * @component ChatBranch
 * @category business/chat
 * @since 0.7.0
 * @description 对话分支（在同一父消息下切换不同回复分支）
 * @keywords chat, branch
 * @example
 * <ChatBranch branches={[{ id: "a", label: "1", active: true }]} />
 */

interface ChatBranchProps {
  branches: Array<{ id: string; label: string; active?: boolean }>;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatBranch({ branches, onSelect, className }: ChatBranchProps) {
  const activeIndex = branches.findIndex((b) => b.active);
  const current = activeIndex >= 0 ? activeIndex : 0;

  const go = React.useCallback(
    (dir: -1 | 1) => {
      const next = (current + dir + branches.length) % branches.length;
      const target = branches[next];
      if (target) onSelect?.(target.id);
    },
    [branches, current, onSelect],
  );

  const handlePrev = React.useCallback(() => go(-1), [go]);
  const handleNext = React.useCallback(() => go(1), [go]);
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    },
    [go],
  );

  if (branches.length === 0) {
    return <div data-slot="chat-branch" className={cn("hidden", className)} aria-hidden />;
  }

  const active = branches[current];

  return (
    <div
      data-slot="chat-branch"
      role="group"
      aria-label={`Message branch ${current + 1} of ${branches.length}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border bg-background px-1 py-0.5 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
    >
      <button
        type="button"
        onClick={handlePrev}
        disabled={branches.length <= 1}
        aria-label="Previous branch"
        className="inline-flex size-5 items-center justify-center rounded hover:bg-muted disabled:opacity-40"
      >
        <ChevronLeftIcon className="size-3.5" aria-hidden />
      </button>
      <span className="font-medium text-foreground">{active?.label ?? "-"}</span>
      <span className="tabular-nums">{`${current + 1}/${branches.length}`}</span>
      <button
        type="button"
        onClick={handleNext}
        disabled={branches.length <= 1}
        aria-label="Next branch"
        className="inline-flex size-5 items-center justify-center rounded hover:bg-muted disabled:opacity-40"
      >
        <ChevronRightIcon className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}

export { ChatBranch };
export type { ChatBranchProps };
