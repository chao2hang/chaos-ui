"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, PlusIcon, SearchIcon } from "@/components/ui/icons";
import { initials } from "@/lib/format";

/**
 * @component ChatSidebar
 * @category business/chat
 * @since 0.7.0
 * @description 会话列表
 * @keywords chat, sidebar
 * @example
 * <ChatSidebar conversations={[{ id: "1", title: "Project" }]} />
 */

interface ChatSidebarProps {
  conversations: Array<{
    id: string;
    title: string;
    unread?: number;
    lastMessage?: string;
    time?: string;
  }>;
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatSidebar({ conversations, activeId, onSelect, className }: ChatSidebarProps) {
  const handleKeyDown = React.useCallback(
    (id: string) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(id);
      }
    },
    [onSelect],
  );

  return (
    <div data-slot="chat-sidebar" className={cn("flex h-full flex-col bg-background", className)}>
      <div className="flex items-center gap-2 border-b border-border p-2">
        <Button type="button" variant="default" size="sm" className="flex-1">
          <PlusIcon className="size-4" aria-hidden />
          New chat
        </Button>
        <Button type="button" variant="outline" size="icon-sm" aria-label="Search conversations">
          <SearchIcon className="size-4" aria-hidden />
        </Button>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Conversation list">
        {conversations.length === 0 ? (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">No conversations yet</p>
        ) : (
          <ul role="list" className="flex flex-col gap-0.5 p-1">
            {conversations.map((c) => {
              const active = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onSelect?.(c.id)}
                    onKeyDown={handleKeyDown(c.id)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors",
                      active ? "bg-muted text-foreground" : "hover:bg-muted/60",
                    )}
                  >
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
                      aria-hidden
                    >
                      {initials(c.title)}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="flex items-center justify-between gap-1">
                        <span className="truncate font-medium">{c.title}</span>
                        {c.time ? <span className="shrink-0 text-[0.65rem] text-muted-foreground">{c.time}</span> : null}
                      </span>
                      {c.lastMessage ? (
                        <span className="truncate text-xs text-muted-foreground">{c.lastMessage}</span>
                      ) : null}
                    </span>
                    {c.unread && c.unread > 0 ? (
                      <Badge variant="default" className="shrink-0" aria-label={`${c.unread} unread`}>
                        {c.unread}
                      </Badge>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
      <div className="flex items-center gap-2 border-t border-border p-2 text-xs text-muted-foreground">
        <MessageSquareIcon className="size-3.5" aria-hidden />
        <span>{conversations.length} conversations</span>
      </div>
    </div>
  );
}

export { ChatSidebar };
export type { ChatSidebarProps };
