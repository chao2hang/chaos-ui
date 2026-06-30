"use client";

import { cn } from "@/lib/utils";
import { ExternalLinkIcon, Link2Icon } from "@/components/ui/icons";
import { truncate } from "@/lib/format";

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

function ChatSharedLink({ url, title, description, className }: ChatSharedLinkProps) {
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
        "flex max-w-sm items-center gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/40 hover:bg-muted/40",
        className,
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted" aria-hidden>
        <Link2Icon className="size-4 text-muted-foreground" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-foreground" title={title ?? url}>
          {title ?? truncate(url, 48)}
        </span>
        {description ? (
          <span className="line-clamp-2 text-xs text-muted-foreground">{description}</span>
        ) : null}
        <span className="truncate text-[0.65rem] text-muted-foreground/80">{host}</span>
      </span>
      <ExternalLinkIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    </a>
  );
}

export { ChatSharedLink };
export type { ChatSharedLinkProps };
