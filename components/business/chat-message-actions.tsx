"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CopyIcon, EditIcon, RefreshCwIcon, Trash2Icon } from "@/components/ui/icons";

/**
 * @component ChatMessageActions
 * @category business/chat
 * @since 0.7.0
 * @description 消息操作栏（回复、复制、删除、重新生成）
 * @keywords chat, message, actions
 * @example
 * <ChatMessageActions onCopy={() => {}} />
 */

interface ChatMessageActionsProps {
  onReply?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
  className?: string;
}

function ChatMessageActions({ onReply, onCopy, onDelete, onRegenerate, className }: ChatMessageActionsProps) {
  const actions = [
    onReply && { label: "Reply", Icon: EditIcon, handler: onReply },
    onCopy && { label: "Copy", Icon: CopyIcon, handler: onCopy },
    onRegenerate && { label: "Regenerate", Icon: RefreshCwIcon, handler: onRegenerate },
    onDelete && { label: "Delete", Icon: Trash2Icon, handler: onDelete },
  ].filter(Boolean) as { label: string; Icon: React.ComponentType<{ className?: string }>; handler: () => void }[];

  if (actions.length === 0) {
    return (
      <div data-slot="chat-message-actions" className={cn("hidden", className)} aria-hidden />
    );
  }

  return (
    <div
      data-slot="chat-message-actions"
      role="toolbar"
      aria-label="Message actions"
      className={cn("flex items-center gap-0.5", className)}
    >
      {actions.map(({ label, Icon, handler }) => (
        <Button
          key={label}
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handler}
          aria-label={label}
        >
          <Icon className="size-4" aria-hidden />
        </Button>
      ))}
    </div>
  );
}

export { ChatMessageActions };
export type { ChatMessageActionsProps };
