"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatBranch
 * @category business/chat
 * @since 0.7.0
 * @description 对话分支
 * @keywords chat, branch
 * @example
 * <ChatBranch />
 */

interface ChatBranchProps {
  branches: Array<{ id: string; label: string; active?: boolean }>;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatBranch({ className }: ChatBranchProps) {
  return <div data-slot="chat-branch" className={cn("", className)} />;
}

export { ChatBranch };
export type { ChatBranchProps };
