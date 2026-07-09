"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { AreaChart } from "@/components/business/area-chart";
import {
  WalletIcon,
  TrendingDownIcon,
  SnowflakeIcon,
  CheckCircleIcon,
} from "lucide-react";

/**
 * @component ExpensePoolDetail
 * @category business
 * @since 1.2.0
 * @description 费用池详情 — 总入池/已消耗/冻结/可用 + 消耗率进度条 +
 * 交易流水列表 + 余额趋势图。适用于 M08 费用池管理。
 * / Expense pool detail — total/consumed/frozen/available + consumption
 * progress + transaction list + balance trend chart.
 * @keywords expense, pool, budget, consumed, frozen, available, trend
 * @example
 * <ExpensePoolDetail
 *   pool={{
 *     name: "Q3营销费用池",
 *     totalAmount: 1000000,
 *     consumedAmount: 650000,
 *     frozenAmount: 50000,
 *     currency: "CNY",
 *   }}
 *   transactions={[
 *     { id: "1", type: "consume", amount: -5000, description: "活动A扣减", date: "2026-07-01" },
 *     { id: "2", type: "recharge", amount: 200000, description: "Q3预算充值", date: "2026-07-15" },
 *   ]}
 *   trend={{ data: [1000000, 980000, 950000, 850000, 720000, 650000], labels: ["7/1","7/5","7/10","7/15","7/20","7/25"] }}
 * />
 */

export interface ExpensePool {
  /** Pool name / 费用池名称 */
  name: string;
  /** Total amount / 总入池金额 */
  totalAmount: number;
  /** Consumed amount / 已消耗金额 */
  consumedAmount: number;
  /** Frozen amount / 冻结金额 */
  frozenAmount: number;
  /** Currency / 货币 */
  currency?: string;
}

export interface ExpenseTransaction {
  /** Transaction ID / 流水 ID */
  id: string;
  /** Transaction type / 交易类型 */
  type: "consume" | "recharge" | "freeze" | "unfreeze" | "adjust";
  /** Amount (positive for inflow, negative for outflow) / 金额 */
  amount: number;
  /** Description / 描述 */
  description: string;
  /** Transaction date / 交易日期 */
  date: string;
  /** Operator / 操作人 */
  operator?: string;
}

export interface ExpensePoolDetailProps {
  /** Pool info / 费用池信息 */
  pool: ExpensePool;
  /** Transaction list / 交易流水 */
  transactions?: ExpenseTransaction[];
  /** Balance trend data / 余额趋势数据 */
  trend?: {
    data: number[];
    labels: string[];
  };
  /** Extra className / 额外样式 */
  className?: string;
}

const transactionTypeConfig: Record<
  ExpenseTransaction["type"],
  { label: string; color: string }
> = {
  consume: { label: "消耗", color: "text-red-600" },
  recharge: { label: "充值", color: "text-green-600" },
  freeze: { label: "冻结", color: "text-amber-600" },
  unfreeze: { label: "解冻", color: "text-blue-600" },
  adjust: { label: "调整", color: "text-purple-600" },
};

function ExpensePoolDetail({
  pool,
  transactions = [],
  trend,
  className,
}: ExpensePoolDetailProps) {
  const currency = pool.currency ?? "CNY";
  const available = pool.totalAmount - pool.consumedAmount - pool.frozenAmount;
  const consumptionRate =
    pool.totalAmount > 0
      ? Math.round((pool.consumedAmount / pool.totalAmount) * 100)
      : 0;
  const freezeRate =
    pool.totalAmount > 0
      ? Math.round((pool.frozenAmount / pool.totalAmount) * 100)
      : 0;
  const availableRate = 100 - consumptionRate - freezeRate;

  const stats = [
    {
      label: "总入池",
      value: formatCurrency(pool.totalAmount, currency),
      icon: <WalletIcon className="size-4" />,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      label: "已消耗",
      value: formatCurrency(pool.consumedAmount, currency),
      icon: <TrendingDownIcon className="size-4" />,
      color: "text-red-600",
      bg: "bg-red-500/10",
    },
    {
      label: "冻结",
      value: formatCurrency(pool.frozenAmount, currency),
      icon: <SnowflakeIcon className="size-4" />,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    {
      label: "可用",
      value: formatCurrency(available, currency),
      icon: <CheckCircleIcon className="size-4" />,
      color: "text-green-600",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <div
      data-slot="expense-pool-detail"
      className={cn("w-full space-y-4", className)}
    >
      {/* Pool name */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{pool.name}</h3>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border p-3">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded",
                  stat.bg,
                  stat.color,
                )}
              >
                {stat.icon}
              </span>
              <span className="text-muted-foreground text-xs">
                {stat.label}
              </span>
            </div>
            <p className={cn("text-base font-bold tabular-nums", stat.color)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Consumption progress bar */}
      <div className="rounded-lg border p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">消耗率</span>
          <span className="text-muted-foreground">{consumptionRate}%</span>
        </div>
        <div className="bg-muted flex h-4 overflow-hidden rounded-full">
          <div
            className="bg-red-500 transition-all"
            style={{ width: `${consumptionRate}%` }}
            title={`已消耗 ${consumptionRate}%`}
          />
          <div
            className="bg-amber-400 transition-all"
            style={{ width: `${freezeRate}%` }}
            title={`冻结 ${freezeRate}%`}
          />
          <div
            className="bg-green-500 transition-all"
            style={{ width: `${availableRate}%` }}
            title={`可用 ${availableRate}%`}
          />
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-red-500" /> 消耗{" "}
            {consumptionRate}%
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-amber-400" /> 冻结{" "}
            {freezeRate}%
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500" /> 可用{" "}
            {availableRate}%
          </span>
        </div>
      </div>

      {/* Balance trend */}
      {trend && (
        <div className="rounded-lg border p-4">
          <h4 className="mb-3 text-sm font-medium">余额趋势</h4>
          <AreaChart data={trend.data} labels={trend.labels} height={160} />
        </div>
      )}

      {/* Transaction list */}
      {transactions.length > 0 && (
        <div className="overflow-hidden rounded-lg border">
          <div className="bg-muted/30 border-b px-4 py-2.5">
            <h4 className="text-sm font-medium">交易流水</h4>
          </div>
          <div className="max-h-96 divide-y overflow-y-auto">
            {transactions.map((tx) => {
              const config = transactionTypeConfig[tx.type];
              const isInflow = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <span
                    className={cn(
                      "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium",
                      config.color,
                      "bg-current/10",
                    )}
                    style={{ backgroundColor: "currentColor", opacity: 0.1 }}
                  >
                    <span className={config.color}>{config.label}</span>
                  </span>
                  <div className="flex-1">
                    <p className="text-sm">{tx.description}</p>
                    <p className="text-muted-foreground text-xs">
                      {tx.date}
                      {tx.operator && ` · ${tx.operator}`}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-sm font-medium tabular-nums",
                      isInflow ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {isInflow ? "+" : ""}
                    {formatCurrency(tx.amount, currency)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { ExpensePoolDetail };
