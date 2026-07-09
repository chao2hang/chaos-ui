"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatCommandMenu
 * @category business/chat
 * @since 0.7.0
 * @description 斜杠命令菜单（键盘可导航）
 * @keywords chat, command, menu
 * @example
 * <ChatCommandMenu commands={[{ id: "summarize", label: "Summarize" }]} />
 */

interface ChatCommandMenuProps {
  commands: Array<{ id: string; label: string; description?: string }>;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatCommandMenu({
  commands = [],
  onSelect,
  className,
}: ChatCommandMenuProps) {
  const [active, setActive] = React.useState(0);
  const safeActive = Math.min(active, Math.max(0, commands.length - 1));

  const choose = React.useCallback((id: string) => onSelect?.(id), [onSelect]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (commands.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % commands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + commands.length) % commands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = commands[safeActive];
        if (cmd) choose(cmd.id);
      } else if (e.key === "Escape") {
        e.preventDefault();
      }
    },
    [choose, commands, safeActive],
  );

  return (
    <div
      data-slot="chat-command-menu"
      role="listbox"
      aria-label="Slash commands"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "border-border bg-popover focus-visible:ring-ring/40 flex w-full max-w-sm flex-col overflow-hidden rounded-lg border p-1 shadow-md focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
    >
      <p className="text-muted-foreground px-2 py-1 text-[0.65rem] tracking-wide uppercase">
        Commands
      </p>
      {commands.length === 0 ? (
        <p className="text-muted-foreground px-2 py-2 text-center text-xs">
          No commands
        </p>
      ) : (
        <ul role="list">
          {commands.map((cmd, idx) => {
            const isActive = idx === safeActive;
            return (
              <li key={cmd.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => choose(cmd.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <span className="text-primary font-mono">/{cmd.id}</span>
                  <span className="flex-1 truncate">{cmd.label}</span>
                  {cmd.description ? (
                    <span className="text-muted-foreground/80 shrink-0 text-xs">
                      {cmd.description}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { ChatCommandMenu };
export type { ChatCommandMenuProps };
