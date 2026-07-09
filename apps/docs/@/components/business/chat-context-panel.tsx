"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

/**
 * @component ChatContextPanel
 * @category business/chat
 * @since 0.7.0
 * @description 上下文面板（展示注入给模型的上下文键值对）
 * @keywords chat, context, panel
 * @example
 * <ChatContextPanel context={[{ label: "User", value: "Alice" }]} />
 */

interface ChatContextPanelProps {
  context: Array<{ label: string; value: string }>;
  className?: string;
}

function ChatContextPanel({ context = [], className }: ChatContextPanelProps) {
  return (
    <div
      data-slot="chat-context-panel"
      className={cn("flex flex-col gap-2 p-3", className)}
      aria-label="Conversation context"
    >
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        Context
      </h3>
      {context.length === 0 ? (
        <p className="text-muted-foreground text-sm">No context attached</p>
      ) : (
        <dl className="flex flex-col">
          {context.map((item, idx) => (
            <div key={item.label}>
              {idx > 0 ? <Separator className="my-2" /> : null}
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground text-[0.65rem] tracking-wide uppercase">
                  {item.label}
                </dt>
                <dd className="text-foreground text-sm break-words">
                  {item.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export { ChatContextPanel };
export type { ChatContextPanelProps };
