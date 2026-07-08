"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatCurrency } from "@/lib/format";
import { CheckCircle2Icon, AlertTriangleIcon, BanknoteIcon } from "@/components/ui/icons";

/**
 * @component ReconciliationSummary
 * @category business/finance
 * @since 0.7.0
 * @description 对账汇总。展示对账总额、已匹配 / 未匹配金额与笔数，附匹配率进度条。
 * @param totalAmount 对账总额
 * @param matchedAmount 已匹配金额
 * @param unmatchedAmount 未匹配金额
 * @param matchedCount 已匹配笔数
 * @param unmatchedCount 未匹配笔数
 * @example
 * <ReconciliationSummary totalAmount={10000} matchedAmount={8000} unmatchedAmount={2000} matchedCount={80} unmatchedCount={20} />
 */

interface ReconciliationSummaryProps {
  totalAmount: number;
  matchedAmount: number;
  unmatchedAmount: number;
  matchedCount: number;
  unmatchedCount: number;
  className?: string;
}

function ReconciliationSummary({
  totalAmount,
  matchedAmount,
  unmatchedAmount,
  matchedCount,
  unmatchedCount,
  className,
}: ReconciliationSummaryProps) {
  const matchRate = totalAmount > 0 ? matchedAmount / totalAmount : 0;
  const totalCount = matchedCount + unmatchedCount;

  return (
    <Card data-slot="reconciliation-summary" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BanknoteIcon className="size-4 text-primary" />
          对账汇总
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground">对账总额</p>
          <p className="text-2xl font-semibold tabular-nums">
            {formatCurrency(totalAmount)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <CheckCircle2Icon className="mt-0.5 size-4 text-emerald-600" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">已匹配</p>
              <p className="text-sm font-semibold tabular-nums">
                {formatCurrency(matchedAmount)}
              </p>
              <p className="text-xs text-muted-foreground tabular-nums">
                {matchedCount} 笔
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
            <AlertTriangleIcon className="mt-0.5 size-4 text-amber-600" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">未匹配</p>
              <p className="text-sm font-semibold tabular-nums">
                {formatCurrency(unmatchedAmount)}
              </p>
              <p className="text-xs text-muted-foreground tabular-nums">
                {unmatchedCount} 笔
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">匹配率</span>
            <span className="font-medium tabular-nums">
              {(matchRate * 100).toFixed(1)}%
            </span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={Math.round(matchRate * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="对账匹配率"
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${Math.min(100, matchRate * 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground tabular-nums">
            共 {totalCount} 笔 · 已匹配 {matchedCount} · 未匹配 {unmatchedCount}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { ReconciliationSummary };
export type { ReconciliationSummaryProps };
