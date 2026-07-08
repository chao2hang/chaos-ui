"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "@/components/ui/icons";

/**
 * @component ChatInputToolbar
 * @category business/chat
 * @since 0.7.0
 * @description 输入框工具栏（附件、工具按钮组）
 * @keywords chat, input, toolbar
 * @example
 * <ChatInputToolbar tools={[{ id: "attach", label: "Attach" }]} />
 */

interface ChatInputToolbarProps {
  tools: Array<{ id: string; icon?: React.ReactNode; label: string }>;
  onToolClick?: (id: string) => void;
  className?: string;
}

function ChatInputToolbar({
  tools = [],
  onToolClick,
  className,
}: ChatInputToolbarProps) {
  const handleClick = React.useCallback(
    (id: string) => () => onToolClick?.(id),
    [onToolClick],
  );
  const handleKeyDown = React.useCallback(
    (id: string) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToolClick?.(id);
      }
    },
    [onToolClick],
  );

  return (
    <div
      data-slot="chat-input-toolbar"
      role="toolbar"
      aria-label="Input tools"
      className={cn("flex items-center gap-1", className)}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Attach file"
      >
        <PaperclipIcon className="size-4" aria-hidden />
      </Button>
      <div className="bg-border mx-1 h-4 w-px shrink-0" aria-hidden />
      {tools.map((t) => (
        <Button
          key={t.id}
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClick(t.id)}
          onKeyDown={handleKeyDown(t.id)}
          aria-label={t.label}
        >
          {t.icon ?? null}
          <span>{t.label}</span>
        </Button>
      ))}
    </div>
  );
}

export { ChatInputToolbar };
export type { ChatInputToolbarProps };
