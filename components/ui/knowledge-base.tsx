"use client";

import * as React from "react";
import {
  BookOpenIcon,
  SearchIcon,
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WikiArticle {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  author?: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
}

interface WikiCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
  children?: (WikiCategory | WikiArticle)[];
}

interface KnowledgeBaseProps {
  /** Wiki categories & articles / 分类与文章 */
  data: (WikiCategory | WikiArticle)[];
  /** Selected article ID (controlled) / 选中文章ID */
  selectedArticleId?: string;
  /** Called when an article is selected / 选中文章回调 */
  onSelectArticle?: (article: WikiArticle) => void;
  /** Whether to show sidebar / 是否显示侧边栏 */
  showSidebar?: boolean;
  /** Whether to show search / 是否显示搜索 */
  searchable?: boolean;
  /** Default expanded categories / 默认展开分类 */
  defaultExpandedCategories?: string[];
  /** Additional class / 额外类名 */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isWikiArticle(item: WikiCategory | WikiArticle): item is WikiArticle {
  return "content" in item || "excerpt" in item;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function KnowledgeBase({
  data,
  selectedArticleId: controlledArticle,
  onSelectArticle,
  showSidebar = true,
  searchable = true,
  defaultExpandedCategories = [],
  className,
}: KnowledgeBaseProps) {
  const [internalArticle, setInternalArticle] = React.useState<string | null>(null);
  const selectedArticleId = controlledArticle ?? internalArticle;
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
    new Set(defaultExpandedCategories),
  );

  // Flatten all articles for search
  const allArticles = React.useMemo(() => {
    const articles: WikiArticle[] = [];
    const walk = (items: (WikiCategory | WikiArticle)[]) => {
      for (const item of items) {
        if (isWikiArticle(item)) {
          articles.push(item);
        } else if (item.children) {
          walk(item.children);
        }
      }
    };
    walk(data);
    return articles;
  }, [data]);

  // Filter by search
  const filteredArticles = React.useMemo(() => {
    if (!searchQuery.trim()) return allArticles;
    const q = searchQuery.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  }, [allArticles, searchQuery]);

  // Selected article
  const selectedArticle = React.useMemo(
    () => allArticles.find((a) => a.id === selectedArticleId),
    [allArticles, selectedArticleId],
  );

  const selectArticle = (article: WikiArticle) => {
    if (!controlledArticle) setInternalArticle(article.id);
    onSelectArticle?.(article);
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Render sidebar items
  const renderSidebarItem = (
    item: WikiCategory | WikiArticle,
    depth = 0,
  ): React.ReactNode => {
    if (isWikiArticle(item)) {
      const isSelected = item.id === selectedArticleId;
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => selectArticle(item)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
            isSelected && "bg-accent font-medium text-accent-foreground",
            !isSelected && "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          )}
          style={{ paddingLeft: depth * 16 + 24 }}
        >
          <FileTextIcon className="size-3.5 shrink-0" />
          <span className="truncate">{item.title}</span>
        </button>
      );
    }

    const isExpanded = expandedCategories.has(item.id);
    return (
      <div key={item.id}>
        <button
          type="button"
          onClick={() => toggleCategory(item.id)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors",
            "hover:bg-muted/50",
          )}
          style={{ paddingLeft: depth * 16 + 8 }}
        >
          <ChevronRightIcon
            className={cn(
              "size-3.5 shrink-0 transition-transform",
              isExpanded && "rotate-90",
            )}
          />
          {item.icon ?? <FolderIcon className="size-3.5 shrink-0 text-amber-500" />}
          <span className="truncate">{item.name}</span>
        </button>
        {isExpanded &&
          item.children?.map((child) => renderSidebarItem(child, depth + 1))}
      </div>
    );
  };

  return (
    <div
      data-slot="knowledge-base"
      className={cn(
        "flex h-[500px] overflow-hidden rounded-lg border bg-background",
        className,
      )}
    >
      {/* Sidebar */}
      {showSidebar && (
        <div className="flex w-56 shrink-0 flex-col border-r bg-muted/20">
          {searchable && (
            <div className="border-b p-2">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文章..."
                  className={cn(
                    "h-8 w-full rounded-md border border-input bg-background pl-7 pr-2 text-xs",
                    "outline-none focus-visible:border-ring",
                  )}
                />
              </div>
            </div>
          )}
          <div className="flex-1 overflow-auto p-1.5">
            {searchQuery.trim()
              ? filteredArticles.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => selectArticle(a)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                      a.id === selectedArticleId && "bg-accent font-medium",
                      a.id !== selectedArticleId && "text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    <FileTextIcon className="size-3.5 shrink-0" />
                    <span className="truncate">{a.title}</span>
                  </button>
                ))
              : data.map((item) => renderSidebarItem(item))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {selectedArticle ? (
          <article>
            <h1 className="text-2xl font-bold">{selectedArticle.title}</h1>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              {selectedArticle.author && (
                <span className="flex items-center gap-1">
                  <UserIcon className="size-3" />
                  {selectedArticle.author}
                </span>
              )}
              {selectedArticle.updatedAt && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3" />
                  {selectedArticle.updatedAt}
                </span>
              )}
            </div>
            {selectedArticle.tags && selectedArticle.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-6 text-sm leading-relaxed text-foreground/85">
              {selectedArticle.content ?? selectedArticle.excerpt ?? "暂无内容"}
            </div>
          </article>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <BookOpenIcon className="size-12" />
            <p className="text-sm">选择左侧文章开始阅读</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { KnowledgeBase };
export type { KnowledgeBaseProps, WikiArticle, WikiCategory };
