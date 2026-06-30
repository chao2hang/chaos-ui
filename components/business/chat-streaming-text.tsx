"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatStreamingText
 * @category business/chat
 * @since 0.7.0
 * @description 流式文本输出（逐 chunk 显现，末尾光标）
 * @keywords chat, streaming, text
 * @example
 * <ChatStreamingText chunks={["Hello", " world"]} isStreaming />
 */

interface ChatStreamingTextProps {
  chunks: string[];
  isStreaming?: boolean;
  speed?: number;
  className?: string;
}

function ChatStreamingText({ chunks, isStreaming = false, speed = 30, className }: ChatStreamingTextProps) {
  const full = chunks.join("");
  const [shown, setShown] = React.useState(isStreaming ? 0 : full.length);

  React.useEffect(() => {
    if (!isStreaming) {
      setShown(full.length);
      return;
    }
    setShown(0);
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      if (i >= full.length) {
        setShown(full.length);
        window.clearInterval(interval);
      } else {
        setShown(i);
      }
    }, Math.max(8, speed));
    return () => window.clearInterval(interval);
  }, [full, isStreaming, speed]);

  return (
    <span
      data-slot="chat-streaming-text"
      className={cn("whitespace-pre-wrap break-words", className)}
      aria-live={isStreaming ? "polite" : "off"}
    >
      {full.slice(0, shown) || " "}
      {isStreaming && shown < full.length ? (
        <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-foreground align-middle" aria-hidden />
      ) : null}
    </span>
  );
}

export { ChatStreamingText };
export type { ChatStreamingTextProps };
