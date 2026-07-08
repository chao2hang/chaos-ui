"use client";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
/**
 * @component BudgetOverview
 * @category business/finance
 * @since 0.7.0
 * @description 预算概览
 */
interface BudgetOverviewProps {
total: number;
  used: number;
  remaining: number;
  categories: Array<{ name: string; budget: number; actual: number }>;
  className?: string;
}
function BudgetOverview({ total, used, remaining, categories, currency = "CNY", className }: BudgetOverviewProps & { currency?: string }) {
  const pct = total > 0 ? Math.round((used / total) * 100) : 0;
  return (
    <div data-slot="budget-overview" className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">预算总览</span>
        <span className="text-xs text-muted-foreground">已用 {pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-muted">
        <div className={cn("h-full rounded", pct > 90 ? "bg-red-500" : pct > 70 ? "bg-yellow-500" : "bg-emerald-500")} style={{ width: `${pct}%` }} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div><div className="text-xs text-muted-foreground">总预算</div><div className="font-medium">{formatCurrency(total, currency)}</div></div>
        <div><div className="text-xs text-muted-foreground">已用</div><div className="font-medium">{formatCurrency(used, currency)}</div></div>
        <div><div className="text-xs text-muted-foreground">剩余</div><div className="font-medium">{formatCurrency(remaining, currency)}</div></div>
      </div>
      <div className="flex flex-col gap-1 border-t pt-2 text-sm">
        {categories.map((c) => {
          const cp = c.budget > 0 ? Math.round((c.actual / c.budget) * 100) : 0;
          return (
            <div key={c.name} className="flex items-center gap-2">
              <span className="w-24 truncate text-muted-foreground">{c.name}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded bg-muted"><div className="h-full rounded bg-primary" style={{ width: `${cp}%` }} /></div>
              <span className="w-20 text-right tabular-nums">{formatCurrency(c.actual, currency)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export { BudgetOverview };
export type { BudgetOverviewProps };
