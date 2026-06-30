"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatArtifactPanel
 * @category business/chat
 * @since 0.7.0
 * @description Artifact面板
 * @keywords chat, artifact, panel
 * @example
 * <ChatArtifactPanel />
 */

interface ChatArtifactPanelProps {
  title?: string;
  type?: string;
  content?: string;
  className?: string;
}

function ChatArtifactPanel({ className }: ChatArtifactPanelProps) {
  return <div data-slot="chat-artifact-panel" className={cn("", className)} />;
}

export { ChatArtifactPanel };
export type { ChatArtifactPanelProps };
