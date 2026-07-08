"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/format";

/**
 * @component ChatMentionPicker
 * @category business/chat
 * @since 0.7.0
 * @description @提及选择器（键盘可导航）
 * @keywords chat, mention, picker
 * @example
 * <ChatMentionPicker users={[{ id: "1", name: "Alice" }]} />
 */

interface ChatMentionPickerProps {
  users: Array<{ id: string; name: string; avatar?: string }>;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatMentionPicker({ users, onSelect, className }: ChatMentionPickerProps) {
  const [active, setActive] = React.useState(0);
  const safeActive = Math.min(active, Math.max(0, users.length - 1));

  const choose = React.useCallback((id: string) => onSelect?.(id), [onSelect]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (users.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % users.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + users.length) % users.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const u = users[safeActive];
        if (u) choose(u.id);
      }
    },
    [choose, safeActive, users],
  );

  return (
    <div
      data-slot="chat-mention-picker"
      role="listbox"
      aria-label="Mention a user"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
    >
      <p className="px-2 py-1 text-[0.65rem] uppercase tracking-wide text-muted-foreground">People</p>
      {users.length === 0 ? (
        <p className="px-2 py-2 text-center text-xs text-muted-foreground">No users</p>
      ) : (
        <ul role="list">
          {users.map((u, idx) => {
            const isActive = idx === safeActive;
            return (
              <li key={u.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => choose(u.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                    isActive ? "bg-muted" : "",
                  )}
                >
                  <Avatar size="sm">
                    {u.avatar ? <AvatarImage src={u.avatar} alt={u.name} /> : <AvatarImage alt={u.name} />}
                    <AvatarFallback>{initials(u.name)}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{u.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { ChatMentionPicker };
export type { ChatMentionPickerProps };
