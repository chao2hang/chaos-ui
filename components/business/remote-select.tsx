"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * @component RemoteSelect
 * @category business/picker
 * @since 0.6.0
 * @description 远程搜索下拉基类。消费方注入 fetcher（按 keyword 查询），
 * 内置防抖 + loading + 可选缓存。DictSelect 等业务下拉可基于它收敛。
 * / Remote search select base with debounced fetcher + loading + optional cache.
 * @keywords remote, search, select, picker, async, debounce, dict
 * @example
 * <RemoteSelect
 *   fetcher={(keyword) => api.searchUsers(keyword)}
 *   value={userId}
 *   onChange={setUserId}
 * />
 */

export interface RemoteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * Fetcher receives the raw search keyword and returns options.
 * Matching (incl. pinyin / fuzzy) is backend-owned — keyword is passed through.
 * / 按 keyword 查询；拼音等匹配由后端完成
 */
export type RemoteFetcher = (keyword: string) => Promise<RemoteOption[]>;

export interface RemoteSelectProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  /** Async fetcher (receives keyword, returns options). / 异步查询函数 */
  fetcher: RemoteFetcher;
  /** Selected value / 选中值 */
  value?: string | number;
  /** Value change callback / 值变更回调 */
  onChange?: (value: string | number) => void;
  /** Initial options (before first search). / 初始选项 */
  initialOptions?: RemoteOption[];
  /** Debounce ms (default 300). / 防抖毫秒 */
  debounceMs?: number;
  /** Cache keyword→options results (default true). / 缓存查询结果 */
  cache?: boolean;
  /** Search input placeholder / 搜索框占位 */
  searchPlaceholder?: string;
  /** Trigger placeholder / 选择器占位 */
  placeholder?: string;
  /** Min keyword length to trigger fetch (default 0). / 最小触发字数 */
  minKeywordLength?: number;
  /** Disabled / 禁用 */
  disabled?: boolean;
  /** Size / 尺寸 */
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RemoteSelect({
  className,
  fetcher,
  value,
  onChange,
  initialOptions = [],
  debounceMs = 300,
  cache = true,
  searchPlaceholder = "搜索...",
  placeholder = "请选择",
  minKeywordLength = 0,
  disabled = false,
  size = "md",
  ...props
}: RemoteSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [options, setOptions] = React.useState<RemoteOption[]>(initialOptions);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Module-level cache keyed by keyword (shared across instances when cache=true).
  const cacheRef = React.useRef<Map<string, RemoteOption[]>>(new Map());

  // Debounced fetch on keyword change.
  React.useEffect(() => {
    if (!open) return;
    if (keyword.length < minKeywordLength) {
      setOptions(initialOptions);
      return;
    }

    if (cache && cacheRef.current.has(keyword)) {
      setOptions(cacheRef.current.get(keyword)!);
      return;
    }

    const handle = setTimeout(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);
      fetcher(keyword)
        .then((data) => {
          if (cancelled) return;
          if (cache) cacheRef.current.set(keyword, data);
          setOptions(data);
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err instanceof Error ? err.message : "查询失败");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }, debounceMs);

    return () => clearTimeout(handle);
  }, [
    keyword,
    open,
    fetcher,
    debounceMs,
    cache,
    minKeywordLength,
    initialOptions,
  ]);

  // Cache the selected option so the trigger label survives searches that
  // replace `options` (the selected item may no longer be in the result list).
  const selectedOptionRef = React.useRef<RemoteOption | undefined>(undefined);
  const selectedFromOptions = options.find(
    (o) => String(o.value) === String(value),
  );
  // Prefer the freshly-found option (keeps label in sync if it changes),
  // fall back to the cached one when it's no longer in `options`.
  const selected = selectedFromOptions ?? selectedOptionRef.current;
  if (selectedFromOptions) selectedOptionRef.current = selectedFromOptions;

  // SelectTrigger only supports "sm" | "default"; map our size prop.
  const triggerSize = size === "sm" ? "sm" : "default";

  return (
    <div
      data-slot="remote-select"
      className={cn("w-full", className)}
      {...props}
    >
      <Select
        value={value !== undefined ? String(value) : undefined}
        onValueChange={(v) => {
          if (v != null) {
            // Cache the chosen option so its label persists after later searches.
            const chosen = options.find((o) => String(o.value) === String(v));
            if (chosen) selectedOptionRef.current = chosen;
            onChange?.(v);
          }
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger size={triggerSize} className="w-full">
          <SelectValue placeholder={placeholder}>
            {selected?.label ?? placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[var(--anchor-width)]">
          <div className="p-2" onClick={(e) => e.stopPropagation()}>
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8"
              autoFocus
            />
          </div>
          {error && (
            <div className="text-destructive px-3 py-2 text-xs">{error}</div>
          )}
          {loading ? (
            <div className="p-2">
              <Skeleton className="h-6 w-full" />
            </div>
          ) : options.length === 0 ? (
            <div className="text-muted-foreground px-3 py-6 text-center text-sm">
              {keyword ? "无匹配项" : "输入关键词搜索"}
            </div>
          ) : (
            options.map((opt) => (
              <SelectItem
                key={String(opt.value)}
                value={String(opt.value)}
                disabled={opt.disabled}
              >
                {opt.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
