"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatLayout
 * @category layout
 * @since 0.7.0
 * @description 对话式布局 — 左侧边栏（窄屏隐藏）、主消息区（可滚动）、底部输入区。
 * @param sidebar 左侧边栏节点（如会话列表）。
 * @param messagesArea 主消息区节点。
 * @param inputArea 底部输入区节点。
 * @param className 根元素附加类名。
 * @example
 * ```tsx
 * <ChatLayout sidebar={<ConvList />} messagesArea={<Messages />} inputArea={<Composer />} />
 * ```
 */
interface ChatLayoutProps {
  sidebar?: React.ReactNode;
  messagesArea?: React.ReactNode;
  inputArea?: React.ReactNode;
  className?: string;
}

function ChatLayout({
  sidebar,
  messagesArea,
  inputArea,
  className,
}: ChatLayoutProps) {
  const hasSidebar =
    sidebar !== undefined && sidebar !== null && sidebar !== false;
  return (
    <div
      data-slot="chat-layout"
      className={cn("flex h-dvh w-full overflow-hidden", className)}
    >
      {hasSidebar ? (
        <aside
          className="hidden w-64 shrink-0 border-r md:block"
          aria-label="会话列表"
        >
          {sidebar}
        </aside>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <main
          className="min-h-0 flex-1 overflow-y-auto"
          aria-label="消息区"
        >
          {messagesArea}
        </main>
        {inputArea !== undefined &&
        inputArea !== null &&
        inputArea !== false ? (
          <div className="shrink-0 border-t" role="region" aria-label="消息输入">
            {inputArea}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { ChatLayout };
export type { ChatLayoutProps };
