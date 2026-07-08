"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon, SearchXIcon } from "@/components/ui/icons";

/**
 * @component ChatConversationSearch
 * @category business/chat
 * @since 0.7.0
 * @description 对话搜索（输入框 + 结果列表）
 * @keywords chat, conversation, search
 * @example
 * <ChatConversationSearch query="" results={[]} />
 */

interface ChatConversationSearchProps {
  query: string;
  onQueryChange?: (q: string) => void;
  results?: Array<{ id: string; title: string; snippet: string }>;
  className?: string;
}

function ChatConversationSearch({
  query,
  onQueryChange,
  results = [],
  className,
}: ChatConversationSearchProps) {
  return (
    <div
      data-slot="chat-conversation-search"
      className={cn("flex flex-col gap-2", className)}
      role="search"
      aria-label="Search conversations"
    >
      <div className="relative">
        <SearchIcon
          className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder="Search conversations..."
          aria-label="Search query"
          className="pl-8"
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {query.trim().length === 0 ? (
          <p className="text-muted-foreground px-2 py-3 text-center text-xs">
            Type to search
          </p>
        ) : results.length === 0 ? (
          <p className="text-muted-foreground flex flex-col items-center gap-1 px-2 py-4 text-center text-xs">
            <SearchXIcon className="size-5" aria-hidden />
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <ul role="list" className="flex flex-col gap-0.5">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  className="hover:bg-muted flex w-full flex-col gap-0.5 rounded-md px-2 py-1.5 text-left"
                >
                  <span className="text-foreground truncate text-sm font-medium">
                    {r.title}
                  </span>
                  <span className="text-muted-foreground line-clamp-2 text-xs">
                    {r.snippet}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export { ChatConversationSearch };
export type { ChatConversationSearchProps };
