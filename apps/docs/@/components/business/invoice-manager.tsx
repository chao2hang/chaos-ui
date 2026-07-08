"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/format";
import { ReceiptIcon, SendIcon } from "@/components/ui";

/**
 * @component InvoiceManager
 * @category business/finance
 * @since 0.7.0
 * @description 发票管理 — 展示发票列表(编号/金额/状态)，支持开具操作回调。
 * @param invoices 发票数组，每项含 id/number/amount/status
 * @param onIssue 开具发票回调，参数为发票 id
 * @example
 * <InvoiceManager
 *   invoices={[{ id: "i1", number: "INV-001", amount: 1200, status: "pending" }]}
 *   onIssue={(id) => console.log(id)}
 * />
 */

interface InvoiceManagerProps {
  invoices: Array<{
    id: string;
    number: string;
    amount: number;
    status: string;
  }>;
  onIssue?: (id: string) => void;
  className?: string;
}

const STATUS_META: Record<string, { label: string; tone: string }> = {
  pending: { label: "待开具", tone: "bg-yellow-100 text-yellow-700" },
  issued: { label: "已开具", tone: "bg-emerald-100 text-emerald-700" },
  void: { label: "已作废", tone: "bg-red-100 text-red-700" },
  draft: { label: "草稿", tone: "bg-muted text-muted-foreground" },
};

function InvoiceManager({ invoices, onIssue, className }: InvoiceManagerProps) {
  const [issuing, setIssuing] = React.useState<string | null>(null);

  const handleIssue = async (id: string) => {
    setIssuing(id);
    try {
      await onIssue?.(id);
    } finally {
      setIssuing(null);
    }
  };

  const total = invoices.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div
      data-slot="invoice-manager"
      className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)}
      role="region"
      aria-label="发票管理"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium">
          <ReceiptIcon className="size-4" />
          发票管理
        </span>
        <span className="text-xs text-muted-foreground">
          共 {invoices.length} 张 · 合计 {formatCurrency(total)}
        </span>
      </div>
      <ul className="flex flex-col divide-y" role="list">
        {invoices.map((inv) => {
          const meta = STATUS_META[inv.status] ?? {
            label: inv.status,
            tone: "bg-muted text-muted-foreground",
          };
          const canIssue = inv.status === "pending" || inv.status === "draft";
          return (
            <li key={inv.id} className="flex items-center gap-3 py-2 text-sm">
              <span className="font-mono text-xs text-muted-foreground">{inv.number}</span>
              <span className={cn("rounded px-1.5 py-0.5 text-xs", meta.tone)}>{meta.label}</span>
              <span className="ml-auto font-medium tabular-nums">{formatCurrency(inv.amount)}</span>
              {canIssue && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={issuing === inv.id}
                  onClick={() => handleIssue(inv.id)}
                  aria-label={`开具发票 ${inv.number}`}
                >
                  <SendIcon className="size-3" />
                  {issuing === inv.id ? "开具中" : "开具"}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      {invoices.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">暂无发票</p>
      )}
    </div>
  );
}

export { InvoiceManager };
export type { InvoiceManagerProps };
