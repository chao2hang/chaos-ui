"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
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
 * @component PriceAdjustBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 调价单选择弹窗。按单号/商品筛选并选中。
 * / Price-adjustment browse dialog — filter by no/product and pick one.
 * @keywords price, adjust, browse, picker, dialog
 * @example
 * <PriceAdjustBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ id: "PA1", product: "Soy Sauce", date: "2024-01-01" }]}
 * />
 */

interface PriceAdjustBrowseItem {
  id: string;
  /** Adjustment number (may equal id). / 调价单号 */
  no?: string;
  /** Product name. / 商品名称 */
  product?: string;
  /** Effective date (ISO or yyyy-mm-dd). / 生效日期 */
  date?: string;
  /** Status text. / 状态 */
  status?: string;
  disabled?: boolean;
}

interface PriceAdjustBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: PriceAdjustBrowseItem) => void;
  items?: PriceAdjustBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function PriceAdjustBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: PriceAdjustBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const resolvedTitle = title ?? t("priceAdjustBrowse.title", { defaultValue: "选择调价单" });
  const resolvedSearch =
    searchPlaceholder ?? t("priceAdjustBrowse.search", { defaultValue: "搜索调价单" });
  const resolvedEmpty =
    emptyText ?? t("priceAdjustBrowse.empty", { defaultValue: "无匹配调价单" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.no?.toLowerCase().includes(q) ||
        p.product?.toLowerCase().includes(q),
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
    const chosen = items.find((p) => p.id === selectedId);
    if (chosen) {
      onSelect(chosen);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-slot="price-adjust-browse" className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("priceAdjustBrowse.description", { defaultValue: "从列表中选择一个调价单" })}
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
          {filtered.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  disabled={p.disabled}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(p.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none transition-colors",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
                    isSelected && "bg-accent/50",
                    p.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <ReceiptIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">
                    {p.no ?? p.id}
                    {p.product && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        · {p.product}
                      </span>
                    )}
                  </span>
                  {p.date && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(p.date)}
                    </span>
                  )}
                  {p.status && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {p.status}
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
            {t("priceAdjustBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { PriceAdjustBrowse };
export type { PriceAdjustBrowseProps, PriceAdjustBrowseItem };
