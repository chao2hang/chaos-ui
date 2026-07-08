"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
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
import { CheckIcon, SearchIcon, TruckIcon } from "@/components/ui/icons";

/**
 * @component ShippingWayBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 运输方式选择弹窗。按名称/编码筛选并选中。
 * / Shipping-way browse dialog — filter by name/code and pick one.
 * @keywords shipping, way, browse, picker, dialog
 * @example
 * <ShippingWayBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ id: "S1", name: "陆运", code: "LAND" }]}
 * />
 */

interface ShippingWayBrowseItem {
  id: string;
  /** Shipping method name. / 运输方式名称 */
  name: string;
  /** Code. / 编码 */
  code?: string;
  /** Carrier/provider name. / 承运商 */
  carrier?: string;
  disabled?: boolean;
}

interface ShippingWayBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: ShippingWayBrowseItem) => void;
  items?: ShippingWayBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function ShippingWayBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: ShippingWayBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const resolvedTitle = title ?? t("shippingWayBrowse.title", { defaultValue: "选择运输方式" });
  const resolvedSearch =
    searchPlaceholder ?? t("shippingWayBrowse.search", { defaultValue: "搜索运输方式" });
  const resolvedEmpty =
    emptyText ?? t("shippingWayBrowse.empty", { defaultValue: "无匹配运输方式" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.code?.toLowerCase().includes(q) ||
        s.carrier?.toLowerCase().includes(q),
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
    const chosen = items.find((s) => s.id === selectedId);
    if (chosen) {
      onSelect(chosen);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-slot="shipping-way-browse" className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("shippingWayBrowse.description", { defaultValue: "从列表中选择运输方式" })}
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
          {filtered.map((s) => {
            const isSelected = s.id === selectedId;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={s.disabled}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(s.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none transition-colors",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
                    isSelected && "bg-accent/50",
                    s.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <TruckIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">{s.name}</span>
                  {s.code && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {s.code}
                    </span>
                  )}
                  {s.carrier && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {s.carrier}
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
            {t("shippingWayBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ShippingWayBrowse };
export type { ShippingWayBrowseProps, ShippingWayBrowseItem };
