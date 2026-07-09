"use client";

import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { WalletIcon } from "@/components/ui/icons";

/**
 * @component PoolTrackerTable
 * @category business/dashboard
 * @since 0.7.0
 * @description 资金池跟踪表 — tracks the total / used / available balance of
 * each fund pool and renders a usage bar so finance teams can spot pools that
 * are running low.
 * @keywords pool, tracker, table
 * @example
 * ```tsx
 * <PoolTrackerTable
 *   pools={[{ id: "p1", name: "运营池", total: 100000, used: 60000, available: 40000 }]}
 * />
 * ```
 */
interface PoolTrackerTableProps {
  /** Fund pools to track. */
  pools: Array<{
    id: string;
    name: string;
    /** Total capacity of the pool. */
    total: number;
    /** Amount currently in use. */
    used: number;
    /** Remaining available balance. */
    available: number;
  }>;
  className?: string;
}

function PoolTrackerTable({ pools = [], className }: PoolTrackerTableProps) {
  const aggregateTotal = pools.reduce((s, p) => s + p.total, 0);
  const aggregateUsed = pools.reduce((s, p) => s + p.used, 0);
  const aggregateAvailable = pools.reduce((s, p) => s + p.available, 0);

  return (
    <section
      data-slot="pool-tracker-table"
      className={cn("flex flex-col gap-3", className)}
      aria-labelledby="pool-tracker-table-title"
    >
      <h3
        id="pool-tracker-table-title"
        className="flex items-center gap-1.5 text-sm font-medium"
      >
        <WalletIcon className="text-primary size-4" aria-hidden="true" />
        <span>资金池跟踪</span>
      </h3>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <caption className="sr-only">
            资金池使用情况，合计总额 {formatNumber(aggregateTotal)}
          </caption>
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-medium">
                资金池
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                总额
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                已用
              </th>
              <th scope="col" className="px-3 py-2 text-right font-medium">
                可用
              </th>
              <th scope="col" className="px-3 py-2 text-left font-medium">
                使用率
              </th>
            </tr>
          </thead>
          <tbody>
            {pools.map((pool) => {
              const pct =
                pool.total > 0
                  ? Math.min(100, (pool.used / pool.total) * 100)
                  : 0;
              const isLow = pct >= 80;
              return (
                <tr key={pool.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{pool.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {formatNumber(pool.total)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {formatNumber(pool.used)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {formatNumber(pool.available)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="bg-muted h-2 flex-1 overflow-hidden rounded"
                        role="progressbar"
                        aria-valuenow={Math.round(pct)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${pool.name} 使用率`}
                      >
                        <div
                          className={cn(
                            "h-full rounded",
                            isLow ? "bg-destructive" : "bg-primary",
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "w-10 shrink-0 text-right tabular-nums",
                          isLow ? "text-destructive" : "text-muted-foreground",
                        )}
                      >
                        {Math.round(pct)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
            {pools.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-muted-foreground px-3 py-6 text-center"
                >
                  暂无资金池
                </td>
              </tr>
            ) : null}
          </tbody>
          {pools.length > 0 ? (
            <tfoot className="bg-muted/30 border-t font-medium">
              <tr>
                <td className="px-3 py-2">合计</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {formatNumber(aggregateTotal)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {formatNumber(aggregateUsed)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {formatNumber(aggregateAvailable)}
                </td>
                <td className="px-3 py-2" />
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </section>
  );
}

export { PoolTrackerTable };
export type { PoolTrackerTableProps };
