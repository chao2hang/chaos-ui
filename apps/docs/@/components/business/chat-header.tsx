"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, RefreshCwIcon, SettingsIcon } from "@/components/ui/icons";

/**
 * @component ChatHeader
 * @category business/chat
 * @since 0.7.0
 * @description 对话顶栏
 * @keywords chat, header
 * @example
 * <ChatHeader title="Project Discussion" subtitle="3 members" />
 */

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  status?: string;
  actions?: React.ReactNode;
  className?: string;
}

function ChatHeader({ title, subtitle, status, actions, className }: ChatHeaderProps) {
  return (
    <header
      data-slot="chat-header"
      className={cn("flex h-full w-full items-center gap-2 px-2", className)}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="truncate text-sm font-semibold" title={title}>
          {title}
        </h2>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground" title={subtitle}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {status ? (
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground" aria-label={`Status: ${status}`}>
          {status}
        </span>
      ) : null}
      <div className="flex shrink-0 items-center gap-1">
        {actions ?? (
          <>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Refresh conversation">
              <RefreshCwIcon className="size-4" aria-hidden />
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Conversation settings">
              <SettingsIcon className="size-4" aria-hidden />
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="More options">
              <MoreVerticalIcon className="size-4" aria-hidden />
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export { ChatHeader };
export type { ChatHeaderProps };
