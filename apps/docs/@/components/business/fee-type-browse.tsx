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
import { CheckIcon, ReceiptIcon, SearchIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component FeeTypeBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 费用类型选择弹窗。按名称/编码筛选并选中。
 * / Fee type browse dialog — filter by name/code and pick one.
 * @keywords fee, type, browse, picker, dialog
 * @example
 * <FeeTypeBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ id: "F1", name: "运费", direction: "expense" }]}
 * />
 */

interface FeeTypeBrowseItem {
  id: string;
  /** Fee type name. / 费用类型名称 */
  name: string;
  /** Fee type code. / 编码 */
  code?: string;
  /** Direction: expense or income. / 收支方向 */
  direction?: "expense" | "income";
  disabled?: boolean;
}

interface FeeTypeBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: FeeTypeBrowseItem) => void;
  items?: FeeTypeBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function FeeTypeBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: FeeTypeBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const resolvedTitle = title ?? t("feeTypeBrowse.title", { defaultValue: "选择费用类型" });
  const resolvedSearch =
    searchPlaceholder ?? t("feeTypeBrowse.search", { defaultValue: "搜索费用类型" });
  const resolvedEmpty =
    emptyText ?? t("feeTypeBrowse.empty", { defaultValue: "无匹配费用类型" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q) ||
        f.code?.toLowerCase().includes(q),
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
    const chosen = items.find((f) => f.id === selectedId);
    if (chosen) {
      onSelect(chosen);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-slot="fee-type-browse" className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("feeTypeBrowse.description", { defaultValue: "从列表中选择一个费用类型" })}
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
          {filtered.map((f) => {
            const isSelected = f.id === selectedId;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  disabled={f.disabled}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(f.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none transition-colors",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
                    isSelected && "bg-accent/50",
                    f.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <ReceiptIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">{f.name}</span>
                  {f.direction && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {f.direction === "expense" ? "支出" : "收入"}
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
            {t("feeTypeBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { FeeTypeBrowse };
export type { FeeTypeBrowseProps, FeeTypeBrowseItem };
