"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
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
import { CheckIcon, PackageIcon, SearchIcon } from "@/components/ui/icons";

/**
 * @component ProductBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 商品选择弹窗。支持单选/多选、关键词与规格筛选。
 * / Product browse dialog with single/multi-select and keyword filter.
 * @keywords product, browse, picker, dialog, multiple
 * @example
 * <ProductBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   multiple
 *   items={[{ id: "P1", name: "Soy Sauce", spec: "500ml", price: 12.5 }]}
 * />
 */

interface ProductBrowseItem {
  id: string;
  /** Product name. / 商品名称 */
  name: string;
  /** SKU code. / 商品编码 */
  sku?: string;
  /** Specification. / 规格 */
  spec?: string;
  /** Unit. / 单位 */
  unit?: string;
  /** Unit price. / 单价 */
  price?: number;
  disabled?: boolean;
}

interface ProductBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Single-select emits the chosen item; multi-select emits the last toggled item. */
  onSelect: (item: ProductBrowseItem) => void;
  /** Enable multi-select (default false). / 多选 */
  multiple?: boolean;
  items?: ProductBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function ProductBrowse({
  open,
  onOpenChange,
  onSelect,
  multiple = false,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: ProductBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const resolvedTitle = title ?? t("productBrowse.title", { defaultValue: "选择商品" });
  const resolvedSearch =
    searchPlaceholder ?? t("productBrowse.search", { defaultValue: "搜索商品" });
  const resolvedEmpty =
    emptyText ?? t("productBrowse.empty", { defaultValue: "无匹配商品" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.spec?.toLowerCase().includes(q),
    );
  }, [items, query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIds([]);
    }
  }, [open]);

  const toggle = (item: ProductBrowseItem) => {
    if (multiple) {
      setSelectedIds((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id],
      );
    } else {
      setSelectedIds([item.id]);
    }
    onSelect(item);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-slot="product-browse" className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("productBrowse.description", {
              defaultValue: multiple ? "可多选商品" : "从列表中选择商品",
            })}
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
            const isSelected = selectedIds.includes(p.id);
            return (
              <li key={p.id}>
                <button
                  type="button"
                  disabled={p.disabled}
                  aria-pressed={isSelected}
                  onClick={() => toggle(p)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none transition-colors",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
                    isSelected && "bg-accent/50",
                    p.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <PackageIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">
                    {p.name}
                    {p.spec && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        · {p.spec}
                      </span>
                    )}
                  </span>
                  {p.unit && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {p.unit}
                    </span>
                  )}
                  {p.price != null && (
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {formatCurrency(p.price)}
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
          <Button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={() => onOpenChange(false)}
          >
            {t("productBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ProductBrowse };
export type { ProductBrowseProps, ProductBrowseItem };
