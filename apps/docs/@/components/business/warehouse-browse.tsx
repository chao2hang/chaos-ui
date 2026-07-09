"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@chaos_team/chaos-ui/ui";
import {
  CheckIcon,
  PackageIcon,
  SearchIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component WarehouseBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 仓库选择弹窗。按仓库名/编码筛选并选中。
 * / Warehouse browse dialog — filter by name/code and pick one.
 * @keywords warehouse, browse, picker, dialog
 * @example
 * <WarehouseBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ id: "W1", name: "中央仓", address: "重庆" }]}
 * />
 */

interface WarehouseBrowseItem {
  id: string;
  /** Warehouse name. / 仓库名称 */
  name: string;
  /** Warehouse code. / 仓库编码 */
  code?: string;
  /** Address. / 仓库地址 */
  address?: string;
  /** Manager. / 仓库负责人 */
  manager?: string;
  disabled?: boolean;
}

interface WarehouseBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: WarehouseBrowseItem) => void;
  items?: WarehouseBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function WarehouseBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: WarehouseBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const resolvedTitle =
    title ?? t("warehouseBrowse.title", { defaultValue: "选择仓库" });
  const resolvedSearch =
    searchPlaceholder ??
    t("warehouseBrowse.search", { defaultValue: "搜索仓库" });
  const resolvedEmpty =
    emptyText ?? t("warehouseBrowse.empty", { defaultValue: "无匹配仓库" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.code?.toLowerCase().includes(q) ||
        w.address?.toLowerCase().includes(q) ||
        w.manager?.toLowerCase().includes(q),
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
    const chosen = items.find((w) => w.id === selectedId);
    if (chosen) {
      onSelect(chosen);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="warehouse-browse"
        className={cn("sm:max-w-md", className)}
      >
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("warehouseBrowse.description", {
              defaultValue: "从列表中选择一个仓库",
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
            <li className="text-muted-foreground px-2 py-6 text-center text-sm">
              {resolvedEmpty}
            </li>
          )}
          {filtered.map((w) => {
            const isSelected = w.id === selectedId;
            return (
              <li key={w.id}>
                <button
                  type="button"
                  disabled={w.disabled}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(w.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm transition-colors outline-none",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring/50 focus-visible:ring-2",
                    isSelected && "bg-accent/50",
                    w.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <PackageIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">{w.name}</span>
                  {w.code && (
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {w.code}
                    </span>
                  )}
                  {w.manager && (
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {w.manager}
                    </span>
                  )}
                  {isSelected && <CheckIcon className="size-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            {t("dialog.closeButton", { defaultValue: "取消" })}
          </Button>
          <Button
            type="button"
            disabled={selectedId == null}
            onClick={handleConfirm}
          >
            {t("warehouseBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { WarehouseBrowse };
export type { WarehouseBrowseProps, WarehouseBrowseItem };
