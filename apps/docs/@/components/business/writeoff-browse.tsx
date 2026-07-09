"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@chaos_team/chaos-ui/lib";
import { formatCurrency, formatDate } from "@chaos_team/chaos-ui/lib";
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
  ReceiptIcon,
  SearchIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component WriteoffBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 核销单选择弹窗。按单号/对方筛选并选中。
 * / Writeoff browse dialog — filter by no/counterparty and pick one.
 * @keywords writeoff, browse, picker, dialog
 * @example
 * <WriteoffBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ id: "WO1", counterparty: "Acme", amount: 500, date: "2024-01-01" }]}
 * />
 */

interface WriteoffBrowseItem {
  id: string;
  /** Writeoff number (may equal id). / 核销单号 */
  no?: string;
  /** Counterparty. / 对方单位 */
  counterparty?: string;
  /** Amount. / 金额 */
  amount?: number;
  /** Date (ISO or yyyy-mm-dd). / 日期 */
  date?: string;
  /** Status text. / 状态 */
  status?: string;
  disabled?: boolean;
}

interface WriteoffBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: WriteoffBrowseItem) => void;
  items?: WriteoffBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function WriteoffBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: WriteoffBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const resolvedTitle =
    title ?? t("writeoffBrowse.title", { defaultValue: "选择核销单" });
  const resolvedSearch =
    searchPlaceholder ??
    t("writeoffBrowse.search", { defaultValue: "搜索核销单" });
  const resolvedEmpty =
    emptyText ?? t("writeoffBrowse.empty", { defaultValue: "无匹配核销单" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (w) =>
        w.id.toLowerCase().includes(q) ||
        w.no?.toLowerCase().includes(q) ||
        w.counterparty?.toLowerCase().includes(q),
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
        data-slot="writeoff-browse"
        className={cn("sm:max-w-md", className)}
      >
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("writeoffBrowse.description", {
              defaultValue: "从列表中选择核销单",
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
                  <ReceiptIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">
                    {w.no ?? w.id}
                    {w.counterparty && (
                      <span className="text-muted-foreground ml-1 text-xs">
                        · {w.counterparty}
                      </span>
                    )}
                  </span>
                  {w.date && (
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {formatDate(w.date)}
                    </span>
                  )}
                  {w.amount != null && (
                    <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                      {formatCurrency(w.amount)}
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
            {t("writeoffBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { WriteoffBrowse };
export type { WriteoffBrowseProps, WriteoffBrowseItem };
