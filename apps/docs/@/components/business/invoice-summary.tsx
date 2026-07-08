"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CheckCircle2Icon, ClockIcon, ReceiptIcon } from "@/components/ui";

/**
 * @component InvoiceSummary
 * @category business/finance
 * @since 0.7.0
 * @description 发票汇总 — 展示发票总数、已开具/待开具数量及金额汇总。
 * @param total 发票总数
 * @param issued 已开具数量
 * @param pending 待开具数量
 * @param amount 发票金额合计
 * @example
 * <InvoiceSummary total={120} issued={80} pending={40} amount={360000} />
 */

interface InvoiceSummaryProps {
  total: number;
  issued: number;
  pending: number;
  amount: number;
  className?: string;
}

function InvoiceSummary({ total, issued, pending, amount, className }: InvoiceSummaryProps) {
  const issuedPct = total > 0 ? Math.round((issued / total) * 100) : 0;

  const cards = [
    {
      label: "发票总数",
      value: formatNumber(total),
      icon: ReceiptIcon,
      tone: "text-foreground",
    },
    {
      label: "已开具",
      value: formatNumber(issued),
      icon: CheckCircle2Icon,
      tone: "text-emerald-600",
    },
    {
      label: "待开具",
      value: formatNumber(pending),
      icon: ClockIcon,
      tone: "text-yellow-600",
    },
  ];

  return (
    <div
      data-slot="invoice-summary"
      className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)}
      role="region"
      aria-label="发票汇总"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">发票汇总</span>
        <span className="text-xs text-muted-foreground">开具率 {issuedPct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded bg-muted">
        <div className="h-full rounded bg-emerald-500" style={{ width: `${issuedPct}%` }} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <c.icon className={cn("size-3", c.tone)} />
              {c.label}
            </span>
            <span className={cn("text-xl font-semibold tabular-nums", c.tone)}>{c.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-3 text-sm">
        <span className="text-muted-foreground">金额合计</span>
        <span className="font-semibold tabular-nums">{formatCurrency(amount)}</span>
      </div>
    </div>
  );
}

export { InvoiceSummary };
export type { InvoiceSummaryProps };
