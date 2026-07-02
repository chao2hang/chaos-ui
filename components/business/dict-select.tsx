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
import { Skeleton } from "@/components/ui/skeleton";

/**
 * @component DictSelect
 * @category business/picker
 * @since 0.2.0
 * @description 字典下拉选择(自动从后端加载字典数据,内置缓存) / Dictionary select with auto-loading and caching
 * @keywords dict, dictionary, select, picker, cache
 * @example
 * <DictSelect categoryCode="order_status" value={status} onChange={setStatus} />
 * <DictSelect options={[{ label: 'Active', value: '1' }]} value={val} onChange={setVal} />
 */

interface DictOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

type DictFetcher = (categoryCode: string) => Promise<DictOption[]>;

// Module-level cache (30min stale time)
const dictCache = new Map<string, { data: DictOption[]; timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Global fetcher registry (set via DictSelectProvider or setDictFetcher)
let globalFetcher: DictFetcher | null = null;

function setDictFetcher(fetcher: DictFetcher) {
  globalFetcher = fetcher;
}

interface DictSelectProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Dictionary category code (fetches from backend) / 字典分类编码 */
  categoryCode?: string;
  /** Inline options (bypass fetch) / 内联选项(跳过请求) */
  options?: DictOption[];
  /** Selected value / 选中值 */
  value?: string | number;
  /** Value change callback / 值变更回调 */
  onChange?: (value: string | number | undefined) => void;
  /** Placeholder / 占位文本 */
  placeholder?: string;
  /** Whether to allow clear / 是否允许清除 */
  allowClear?: boolean;
  /** Whether select is disabled / 是否禁用 */
  disabled?: boolean;
  /** Whether select is loading / 是否加载中 */
  loading?: boolean;
  /** Select size / 选择器大小 */
  size?: "sm" | "md" | "lg";
  /** Custom fetcher (overrides global) / 自定义获取函数 */
  fetcher?: DictFetcher;
  /** Additional class name / 额外类名 */
  className?: string;
}

function DictSelect({
  className,
  categoryCode,
  options: inlineOptions,
  value,
  onChange,
  placeholder = "Please select",
  allowClear = true,
  disabled = false,
  loading: externalLoading = false,
  size = "md",
  fetcher,
  ...props
}: DictSelectProps) {
  const [internalOptions, setInternalOptions] = React.useState<DictOption[]>(
    inlineOptions ?? [],
  );
  const [loading, setLoading] = React.useState(externalLoading);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (inlineOptions) {
      setInternalOptions(inlineOptions);
      return;
    }
    if (!categoryCode) return;

    const cached = dictCache.get(categoryCode);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setInternalOptions(cached.data);
      return;
    }

    const activeFetcher = fetcher ?? globalFetcher;
    if (!activeFetcher) {
      setError("No dict fetcher configured");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    activeFetcher(categoryCode)
      .then((data) => {
        if (cancelled) return;
        dictCache.set(categoryCode, { data, timestamp: Date.now() });
        setInternalOptions(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load dict");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryCode, inlineOptions, fetcher]);

  const sizeClass =
    size === "sm" ? "h-8 text-xs" : size === "lg" ? "h-11 text-base" : "h-9 text-sm";

  if (loading) {
    return (
      <div className={cn("flex items-center", className)} {...props}>
        <Skeleton className={cn("w-full", sizeClass)} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center rounded-md border border-destructive/30 bg-destructive/5 px-3 text-xs text-destructive",
          sizeClass,
          className,
        )}
        {...props}
      >
        {error}
      </div>
    );
  }

  return (
    <div data-slot="dict-select" className={cn("w-full", className)} {...props}>
      <Select
        value={value !== undefined ? String(value) : undefined}
            onValueChange={(v) => {
              if (v === null || v === undefined) return;
              // The clear option uses value="" — emit undefined (clear semantics)
              // instead of an empty string, which would collide with real empty
              // values and mislead consumers expecting null/undefined on clear.
              if (v === "") {
                onChange?.(undefined);
                return;
              }
              const original = internalOptions.find((o) => String(o.value) === v);
              onChange?.(original?.value ?? v);
            }}
        disabled={disabled}
      >
        <SelectTrigger className={cn(sizeClass, "w-full")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {allowClear && value !== undefined && (
            <SelectItem value="">—</SelectItem>
          )}
          {internalOptions.map((opt) => (
            <SelectItem
              key={String(opt.value)}
              value={String(opt.value)}
              disabled={opt.disabled}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { DictSelect, setDictFetcher };
export type { DictSelectProps, DictOption, DictFetcher };
