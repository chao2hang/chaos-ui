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
import { CheckIcon, SearchIcon, UsersIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component CustomerBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 客户选择弹窗。支持单选/多选、关键词筛选。
 * / Customer browse dialog with single/multi-select and keyword filter.
 * @keywords customer, browse, picker, dialog, multiple
 * @example
 * <CustomerBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   multiple
 *   items={[{ id: "C1", name: "Acme Co" }]}
 * />
 */

interface CustomerBrowseItem {
  id: string;
  /** Customer name. / 客户名称 */
  name: string;
  /** Contact person. / 联系人 */
  contact?: string;
  /** Phone number. / 联系电话 */
  phone?: string;
  disabled?: boolean;
}

interface CustomerBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Single-select emits the chosen item; multi-select emits the last toggled item. */
  onSelect: (item: CustomerBrowseItem) => void;
  /** Enable multi-select (default false). / 多选 */
  multiple?: boolean;
  items?: CustomerBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function CustomerBrowse({
  open,
  onOpenChange,
  onSelect,
  multiple = false,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: CustomerBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const resolvedTitle = title ?? t("customerBrowse.title", { defaultValue: "选择客户" });
  const resolvedSearch =
    searchPlaceholder ?? t("customerBrowse.search", { defaultValue: "搜索客户" });
  const resolvedEmpty =
    emptyText ?? t("customerBrowse.empty", { defaultValue: "无匹配客户" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.contact?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q),
    );
  }, [items, query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIds([]);
    }
  }, [open]);

  const toggle = (item: CustomerBrowseItem) => {
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

  const handleConfirm = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-slot="customer-browse" className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("customerBrowse.description", {
              defaultValue: multiple ? "可多选客户" : "从列表中选择一个客户",
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
          {filtered.map((c) => {
            const isSelected = selectedIds.includes(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  disabled={c.disabled}
                  aria-pressed={isSelected}
                  onClick={() => toggle(c)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none transition-colors",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
                    isSelected && "bg-accent/50",
                    c.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <UsersIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">
                    {c.name}
                    {c.contact && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        · {c.contact}
                      </span>
                    )}
                  </span>
                  {c.phone && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {c.phone}
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
            onClick={handleConfirm}
          >
            {t("customerBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CustomerBrowse };
export type { CustomerBrowseProps, CustomerBrowseItem };
