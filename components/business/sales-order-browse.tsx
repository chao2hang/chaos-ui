"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckIcon, ReceiptIcon, SearchIcon } from "@/components/ui/icons";

/**
 * @component SalesOrderBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 销售订单选择弹窗。按订单号/客户筛选并选中。
 * / Sales order browse dialog — filter by order no / customer and pick one.
 * @keywords sales, order, browse, picker, dialog
 * @example
 * <SalesOrderBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ id: "SO20240101", customer: "Acme", amount: 1200, date: "2024-01-01" }]}
 * />
 */

interface SalesOrderBrowseItem {
  id: string;
  /** Order number (may equal id). / 订单号 */
  no?: string;
  /** Customer name. / 客户名称 */
  customer?: string;
  /** Order amount. / 订单金额 */
  amount?: number;
  /** Order date (ISO or yyyy-mm-dd). / 订单日期 */
  date?: string;
  disabled?: boolean;
}

interface SalesOrderBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: SalesOrderBrowseItem) => void;
  items?: SalesOrderBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function SalesOrderBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: SalesOrderBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const resolvedTitle = title ?? t("salesOrderBrowse.title", { defaultValue: "选择销售订单" });
  const resolvedSearch =
    searchPlaceholder ?? t("salesOrderBrowse.search", { defaultValue: "搜索订单号/客户" });
  const resolvedEmpty =
    emptyText ?? t("salesOrderBrowse.empty", { defaultValue: "无匹配订单" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.no?.toLowerCase().includes(q) ||
        o.customer?.toLowerCase().includes(q),
    );
  }, [items, query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedId(null);
    }
  }, [open]);

  const handleConfirm = () => {
    if (selectedId == null) return;
    const chosen = items.find((o) => o.id === selectedId);
    if (chosen) {
      onSelect(chosen);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-slot="sales-order-browse" className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("salesOrderBrowse.description", { defaultValue: "从列表中选择销售订单" })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 border-b pb-2">
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={resolvedSearch}
            aria-label={resolvedSearch}
            className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </div>

        <ul role="list" className="max-h-72 overflow-y-auto py-1">
          {filtered.length === 0 && (
            <li className="px-2 py-6 text-center text-sm text-muted-foreground">
              {resolvedEmpty}
            </li>
          )}
          {filtered.map((o) => {
            const isSelected = o.id === selectedId;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  disabled={o.disabled}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(o.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none transition-colors",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
                    isSelected && "bg-accent/50",
                    o.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <ReceiptIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">
                    {o.no ?? o.id}
                    {o.customer && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        · {o.customer}
                      </span>
                    )}
                  </span>
                  {o.date && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(o.date)}
                    </span>
                  )}
                  {o.amount != null && (
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {formatCurrency(o.amount)}
                    </span>
                  )}
                  {isSelected && <CheckIcon className="size-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
            {t("dialog.closeButton", { defaultValue: "取消" })}
          </Button>
          <Button type="button" disabled={selectedId == null} onClick={handleConfirm}>
            {t("salesOrderBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { SalesOrderBrowse };
export type { SalesOrderBrowseProps, SalesOrderBrowseItem };
