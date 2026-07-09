"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatPercent } from "@/lib/format";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  TrophyIcon,
  MedalIcon,
  AwardIcon,
} from "@/components/ui";

/**
 * @component PerformanceRankTable
 * @category business/dashboard
 * @since 0.7.0
 * @description 业绩排名表 — 按排名展示业绩数据(姓名/金额/环比增长)，前三名带奖牌图标。
 * @param rows 排名行数组，每项含 id/rank/name/amount/growth(可选)
 * @example
 * <PerformanceRankTable
 *   rows={[
 *     { id: "r1", rank: 1, name: "张三", amount: 980000, growth: 0.15 },
 *     { id: "r2", rank: 2, name: "李四", amount: 760000, growth: -0.03 },
 *   ]}
 * />
 */

interface PerformanceRankTableProps {
  rows: Array<{
    id: string;
    rank: number;
    name: string;
    amount: number;
    growth?: number;
  }>;
  className?: string;
}

const MEDAL_ICON: Record<
  number,
  React.ComponentType<{ className?: string }>
> = {
  1: TrophyIcon,
  2: MedalIcon,
  3: AwardIcon,
};

function PerformanceRankTable({
  rows = [],
  className,
}: PerformanceRankTableProps) {
  return (
    <div
      data-slot="performance-rank-table"
      className={cn("bg-card overflow-hidden rounded-lg border", className)}
      role="region"
      aria-label="业绩排名表"
    >
      <table className="w-full text-sm">
        <caption className="sr-only">业绩排名</caption>
        <thead className="bg-muted/50 text-muted-foreground border-b text-xs">
          <tr>
            <th scope="col" className="px-4 py-2 text-left font-medium">
              排名
            </th>
            <th scope="col" className="px-4 py-2 text-left font-medium">
              姓名
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              业绩
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              环比
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((r) => {
            const isUp = (r.growth ?? 0) >= 0;
            const GrowthIcon = isUp ? ArrowUpRightIcon : ArrowDownRightIcon;
            const Medal = MEDAL_ICON[r.rank];
            return (
              <tr key={r.id} className="hover:bg-muted/30">
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-1.5">
                    {Medal ? (
                      <Medal
                        className={cn(
                          "size-4",
                          r.rank === 1
                            ? "text-yellow-500"
                            : r.rank === 2
                              ? "text-slate-400"
                              : "text-amber-700",
                        )}
                      />
                    ) : (
                      <span className="bg-muted flex size-5 items-center justify-center rounded-full text-xs tabular-nums">
                        {r.rank}
                      </span>
                    )}
                    <span className="tabular-nums">{r.rank}</span>
                  </span>
                </td>
                <td className="px-4 py-2.5 font-medium">{r.name}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">
                  {formatCurrency(r.amount)}
                </td>
                <td className="px-4 py-2.5 text-right">
                  {r.growth !== undefined ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                        isUp ? "text-emerald-600" : "text-destructive",
                      )}
                    >
                      <GrowthIcon className="size-3" />
                      {formatPercent(r.growth)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="text-muted-foreground py-6 text-center text-sm">
          暂无排名数据
        </p>
      )}
    </div>
  );
}

export { PerformanceRankTable };
export type { PerformanceRankTableProps };
