"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatDate, formatCurrency } from "@/lib/format";
import { CalendarIcon, CheckCircle2Icon, ClockIcon } from "@/components/ui";

/**
 * @component PaymentSchedule
 * @category business/finance
 * @since 0.7.0
 * @description 付款计划 — 按时间轴展示分期付款计划(日期/金额/状态)。
 * @param schedule 付款计划数组，每项含 id/date/amount/status
 * @example
 * <PaymentSchedule
 *   schedule={[
 *     { id: "p1", date: "2026-07-01", amount: 30000, status: "paid" },
 *     { id: "p2", date: "2026-08-01", amount: 30000, status: "pending" },
 *   ]}
 * />
 */

interface PaymentScheduleProps {
  schedule: Array<{ id: string; date: string; amount: number; status: string }>;
  className?: string;
}

const DEFAULT_STATUS_META: { label: string; tone: string; icon: React.ComponentType<{ className?: string }> } = {
  label: "待付款",
  tone: "text-muted-foreground",
  icon: ClockIcon,
};

const STATUS_META: Record<string, { label: string; tone: string; icon: React.ComponentType<{ className?: string }> }> = {
  paid: { label: "已付款", tone: "text-emerald-600", icon: CheckCircle2Icon },
  pending: { label: "待付款", tone: "text-yellow-600", icon: ClockIcon },
  overdue: { label: "已逾期", tone: "text-destructive", icon: CalendarIcon },
  default: { label: "待付款", tone: "text-muted-foreground", icon: ClockIcon },
};

function PaymentSchedule({ schedule, className }: PaymentScheduleProps) {
  const total = schedule.reduce((sum, p) => sum + p.amount, 0);
  const paid = schedule
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const paidPct = total > 0 ? Math.round((paid / total) * 100) : 0;

  const getStatus = (status: string) => STATUS_META[status] ?? DEFAULT_STATUS_META;

  return (
    <div
      data-slot="payment-schedule"
      className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)}
      role="region"
      aria-label="付款计划"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">付款计划</span>
        <span className="text-xs text-muted-foreground">已付 {paidPct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-muted">
        <div className="h-full rounded bg-emerald-500" style={{ width: `${paidPct}%` }} />
      </div>
      <ol className="flex flex-col" role="list">
        {schedule.map((p, idx) => {
          const meta = getStatus(p.status);
          const Icon = meta.icon;
          return (
            <li key={p.id} className="flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <span className={cn("flex size-7 items-center justify-center rounded-full border-2 bg-card", meta.tone)}>
                  <Icon className="size-3.5" />
                </span>
                {idx < schedule.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-0.5 pt-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{formatDate(p.date)}</span>
                  <span className="text-sm font-medium tabular-nums">{formatCurrency(p.amount)}</span>
                </div>
                <span className={cn("text-xs", meta.tone)}>{meta.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
      {schedule.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">暂无付款计划</p>
      )}
    </div>
  );
}

export { PaymentSchedule };
export type { PaymentScheduleProps };
