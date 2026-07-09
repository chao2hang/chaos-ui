"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { ChevronLeftIcon, ChevronRightIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ChatShell
 * @category business/chat
 * @since 0.7.0
 * @description 聊天页面骨架（侧边栏 + 顶栏 + 消息区 + 详情面板）
 * @keywords chat, shell
 * @example
 * <ChatShell sidebar={<ChatSidebar conversations={[]} />} header={<ChatHeader title="Chat" />}>messages</ChatShell>
 */

interface ChatShellProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  detailPanel?: React.ReactNode;
  className?: string;
}

function ChatShell({ sidebar, header, children, detailPanel, className }: ChatShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [detailOpen, setDetailOpen] = React.useState(true);

  return (
    <div
      data-slot="chat-shell"
      className={cn("flex h-full w-full overflow-hidden bg-background", className)}
    >
      {sidebar ? (
        <aside
          data-slot="chat-shell-sidebar"
          aria-label="Conversations"
          className={cn(
            "flex shrink-0 flex-col border-r border-border transition-[width] duration-200",
            sidebarOpen ? "w-64" : "w-0",
          )}
        >
          <div className={cn("h-full overflow-hidden", !sidebarOpen && "hidden")}>{sidebar}</div>
        </aside>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          data-slot="chat-shell-topbar"
          className="flex h-12 shrink-0 items-center gap-1 border-b border-border px-2"
        >
          {sidebar ? (
            <button
              type="button"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((v) => !v)}
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            >
              {sidebarOpen ? <ChevronLeftIcon className="size-4" aria-hidden /> : <ChevronRightIcon className="size-4" aria-hidden />}
            </button>
          ) : null}
          <div className="min-w-0 flex-1">{header}</div>
          {detailPanel ? (
            <button
              type="button"
              aria-label={detailOpen ? "Hide detail panel" : "Show detail panel"}
              aria-expanded={detailOpen}
              onClick={() => setDetailOpen((v) => !v)}
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            >
              {detailOpen ? <ChevronRightIcon className="size-4" aria-hidden /> : <ChevronLeftIcon className="size-4" aria-hidden />}
            </button>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-1">
          <main data-slot="chat-shell-main" className="min-w-0 flex-1 overflow-y-auto">
            {children}
          </main>
          {detailPanel ? (
            <aside
              data-slot="chat-shell-detail"
              aria-label="Details"
              className={cn(
                "shrink-0 overflow-y-auto border-l border-border transition-[width] duration-200",
                detailOpen ? "w-80" : "w-0",
              )}
            >
              <div className={cn("h-full", !detailOpen && "hidden")}>{detailPanel}</div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { ChatShell };
export type { ChatShellProps };
