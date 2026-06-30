"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatSharedLink
 * @category business/chat
 * @since 0.7.0
 * @description 共享链接
 * @keywords chat, shared, link
 * @example
 * <ChatSharedLink />
 */

interface ChatSharedLinkProps {
  url: string;
  title?: string;
  description?: string;
  className?: string;
}

function ChatSharedLink({ className }: ChatSharedLinkProps) {
  return <div data-slot="chat-shared-link" className={cn("", className)} />;
}

export { ChatSharedLink };
export type { ChatSharedLinkProps };
