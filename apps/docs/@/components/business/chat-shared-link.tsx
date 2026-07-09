"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { ExternalLinkIcon, Link2Icon } from "@chaos_team/chaos-ui/ui-icons";
import { truncate } from "@chaos_team/chaos-ui/lib";

/**
 * @component ChatSharedLink
 * @category business/chat
 * @since 0.7.0
 * @description 共享链接卡片（标题、描述、外链跳转）
 * @keywords chat, shared, link
 * @example
 * <ChatSharedLink url="https://example.com" title="Example" />
 */

interface ChatSharedLinkProps {
  url: string;
  title?: string;
  description?: string;
  className?: string;
}

function ChatSharedLink({
  url,
  title,
  description,
  className,
}: ChatSharedLinkProps) {
  let host = url;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    // keep raw url as host
  }

  return (
    <a
      data-slot="chat-shared-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "border-border bg-background hover:border-primary/40 hover:bg-muted/40 flex max-w-sm items-center gap-3 rounded-lg border p-3 transition-colors",
        className,
      )}
    >
      <span
        className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md"
        aria-hidden
      >
        <Link2Icon className="text-muted-foreground size-4" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className="text-foreground truncate text-sm font-medium"
          title={title ?? url}
        >
          {title ?? truncate(url, 48)}
        </span>
        {description ? (
          <span className="text-muted-foreground line-clamp-2 text-xs">
            {description}
          </span>
        ) : null}
        <span className="text-muted-foreground/80 truncate text-[0.65rem]">
          {host}
        </span>
      </span>
      <ExternalLinkIcon
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden
      />
    </a>
  );
}

export { ChatSharedLink };
export type { ChatSharedLinkProps };
