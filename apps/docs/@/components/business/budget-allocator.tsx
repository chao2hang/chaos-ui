"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { formatCurrency } from "@chaos_team/chaos-ui/lib";
import { MinusIcon, PlusIcon } from "@chaos_team/chaos-ui/ui";

/**
 * @component BudgetAllocator
 * @category Business
 * @since 1.0.0-beta.0
 * @description 预算分配组件 — 按类别滑块分配预算总额，实时显示分配占比与剩余额度。
 * @param total 预算总额（必填，默认 0）
 * @param categories 待分配预算类别，每项含名称、已分配额度与可选上限
 * @param currency 货币代码，默认 CNY
 * @param onChange 分配变更回调，参数为最新类别数组
 * @example
 * ```tsx
 * <BudgetAllocator
 *   total={100000}
 *   categories={[
 *     { id: "mkt", name: "市场", amount: 30000, cap: 60000 },
 *     { id: "rnd", name: "研发", amount: 50000, cap: 80000 },
 *   ]}
 * />
 * ```
 */
interface BudgetAllocatorProps {
  /** 预算总额 */
  total?: number;
  /** 待分配类别 */
  categories?: Array<{
    id: string;
    name: string;
    amount: number;
    cap?: number;
  }>;
  /** 货币代码 */
  currency?: string;
  /** 分配变更回调 */
  onChange?: (categories: Array<{ id: string; name: string; amount: number; cap?: number }>) => void;
  className?: string;
}

function BudgetAllocator({
  total = 0,
  categories = [],
  currency = "CNY",
  onChange,
  className,
}: BudgetAllocatorProps) {
  const [items, setItems] = React.useState(categories);

  React.useEffect(() => {
    setItems(categories);
  }, [categories]);

  const allocated = items.reduce((sum, c) => sum + c.amount, 0);
  const remaining = Math.max(0, total - allocated);
  const allocatedPct = total > 0 ? Math.round((allocated / total) * 100) : 0;

  const update = (id: string, next: number) => {
    const clamped = Math.max(0, next);
    setItems((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, amount: c.cap !== undefined ? Math.min(clamped, c.cap) : clamped } : c,
      );
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <div
      data-slot="budget-allocator"
      className={cn("flex flex-col gap-4 rounded-lg border bg-card p-4", className)}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">预算分配</span>
        <span className="text-xs text-muted-foreground">已分配 {allocatedPct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-muted">
        <div
          className={cn(
            "h-full rounded transition-all",
            allocatedPct > 100 ? "bg-red-500" : allocatedPct > 90 ? "bg-yellow-500" : "bg-emerald-500",
          )}
          style={{ width: `${Math.min(100, allocatedPct)}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-xs text-muted-foreground">总额</div>
          <div className="font-medium tabular-nums">{formatCurrency(total, currency)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">剩余</div>
          <div className="font-medium tabular-nums">{formatCurrency(remaining, currency)}</div>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((c) => {
          const pct = total > 0 ? Math.round((c.amount / total) * 100) : 0;
          const overCap = c.cap !== undefined && c.amount > c.cap;
          return (
            <li key={c.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="truncate text-muted-foreground">{c.name}</span>
                <span className={cn("tabular-nums", overCap && "text-destructive")}>
                  {formatCurrency(c.amount, currency)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label={`减少 ${c.name} 预算`}
                  onClick={() => update(c.id, c.amount - 1000)}
                >
                  <MinusIcon />
                </Button>
                <input
                  type="range"
                  min={0}
                  max={Math.max(total, c.cap ?? total, 1)}
                  step={1000}
                  value={c.amount}
                  onChange={(e) => update(c.id, Number(e.target.value))}
                  aria-label={`${c.name} 预算滑块`}
                  className="h-1.5 flex-1 cursor-pointer accent-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label={`增加 ${c.name} 预算`}
                  onClick={() => update(c.id, c.amount + 1000)}
                >
                  <PlusIcon />
                </Button>
              </div>
              <div className="h-1 overflow-hidden rounded bg-muted">
                <div className="h-full rounded bg-primary" style={{ width: `${Math.min(100, pct)}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      {items.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">暂无分配类别</p>
      )}
    </div>
  );
}

export { BudgetAllocator };
export type { BudgetAllocatorProps };
