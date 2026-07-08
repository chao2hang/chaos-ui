"use client";

import * as React from "react";
import {
  SearchIcon,
  FileTextIcon,
  UserIcon,
  PackageIcon,
  FileIcon,
  XIcon,
  ChevronRightIcon,
  Loader2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category: "documents" | "users" | "orders" | "products" | "pages" | "custom";
  categoryLabel?: string;
  url?: string;
  icon?: React.ReactNode;
}

interface GlobalSearchProps {
  /** Search results / 搜索结果 */
  results?: SearchResult[];
  /** Called when search query changes / 搜索输入变更 */
  onSearch?: (query: string) => void;
  /** Called when a result is selected / 选中结果回调 */
  onSelect?: (result: SearchResult) => void;
  /** Called when the search is closed / 关闭回调 */
  onClose?: () => void;
  /** Placeholder text / 占位文字 */
  placeholder?: string;
  /** Whether to show as a modal overlay / 是否作为模态覆盖层 */
  modal?: boolean;
  /** Whether to autofocus the input / 是否自动聚焦 */
  autoFocus?: boolean;
  /** Loading state / 加载状态 */
  loading?: boolean;
  /** Whether search is open / 是否打开 */
  open?: boolean;
  /** Min query length before search / 最小搜索长度 */
  minQueryLength?: number;
  /** Debounce delay in ms / 防抖延迟 */
  debounceMs?: number;
  /** Additional class / 额外类名 */
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons by category
// ---------------------------------------------------------------------------

const categoryIcons: Record<string, React.ReactNode> = {
  documents: <FileTextIcon className="size-4 text-blue-500" />,
  users: <UserIcon className="size-4 text-green-500" />,
  orders: <PackageIcon className="size-4 text-orange-500" />,
  products: <PackageIcon className="size-4 text-purple-500" />,
  pages: <FileIcon className="size-4 text-muted-foreground" />,
  custom: <FileIcon className="size-4 text-muted-foreground" />,
};

const defaultLabels: Record<string, string> = {
  documents: "文档",
  users: "用户",
  orders: "订单",
  products: "产品",
  pages: "页面",
  custom: "其他",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function GlobalSearch({
  results = [],
  onSearch,
  onSelect,
  onClose,
  placeholder = "搜索文档、用户、订单...",
  modal = true,
  autoFocus = true,
  loading = false,
  open: controlledOpen,
  minQueryLength = 1,
  debounceMs = 300,
  className,
}: GlobalSearchProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.length >= minQueryLength) {
      debounceRef.current = setTimeout(() => {
        onSearch?.(val);
      }, debounceMs);
    }
  };

  // Auto-focus
  React.useEffect(() => {
    if (open && autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, autoFocus]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const next = !open;
        if (!controlledOpen) setInternalOpen(next);
        if (!next) onClose?.();
      }
      if (e.key === "Escape" && open) {
        if (!controlledOpen) setInternalOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [open, controlledOpen, onClose]);

  // Keyboard navigation within results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      onSelect?.(results[selectedIndex]);
      if (!controlledOpen) setInternalOpen(false);
    }
  };

  // Group results by category
  const grouped = React.useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const r of results) {
      const cat = r.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(r);
    }
    return groups;
  }, [results]);

  if (!open && !modal) return null;

  const content = (
    <div
      data-slot="global-search"
      className={cn(
        modal && "fixed inset-0 z-50",
        className,
      )}
      onClick={modal ? () => {
        if (!controlledOpen) setInternalOpen(false);
        onClose?.();
      } : undefined}
    >
      {modal && <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />}

      <div
        className={cn(
          modal
            ? "absolute left-1/2 top-[20%] w-full max-w-xl -translate-x-1/2 rounded-xl border bg-background shadow-2xl"
            : "w-full rounded-lg border bg-background",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {loading && <Loader2Icon className="size-4 animate-spin text-muted-foreground" />}
          <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline">
            esc
          </kbd>
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange("")}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-auto p-2">
          {query.length < minQueryLength ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              输入关键词开始搜索
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              未找到相关结果
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-1">
                <div className="flex items-center gap-2 px-3 py-1 text-[10px] font-medium uppercase text-muted-foreground">
                  {categoryIcons[category]}
                  {defaultLabels[category] ?? category}
                </div>
                {items.map((item) => {
                  const globalIdx = results.findIndex((r) => r.id === item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelect?.(item);
                        if (!controlledOpen) setInternalOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        globalIdx === selectedIndex && "bg-accent",
                        globalIdx !== selectedIndex && "hover:bg-muted/50",
                      )}
                    >
                      {item.icon ?? categoryIcons[item.category] ?? <SearchIcon className="size-4" />}
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{item.title}</div>
                        {item.subtitle && (
                          <div className="truncate text-xs text-muted-foreground">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {item.categoryLabel ?? defaultLabels[item.category]}
                      </span>
                      <ChevronRightIcon className="size-3 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t px-4 py-2 text-[10px] text-muted-foreground">
          <span>↑↓ 导航</span>
          <span>↵ 选择</span>
          <span>esc 关闭</span>
        </div>
      </div>
    </div>
  );

  return modal ? open ? content : null : content;
}

export { GlobalSearch };
export type { GlobalSearchProps, SearchResult };
