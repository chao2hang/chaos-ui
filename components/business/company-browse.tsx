"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

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
import { Building2Icon, CheckIcon, SearchIcon } from "@/components/ui/icons";

/**
 * @component CompanyBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 公司选择弹窗。在 Dialog 中按关键词筛选公司并选中。
 * / Company browse dialog — filter and pick a company from a list.
 * @keywords company, browse, picker, dialog
 * @example
 * <CompanyBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ id: "C1", name: "Acme" }]}
 * />
 */

interface CompanyBrowseItem {
  id: string;
  /** Company name. / 公司名称 */
  name: string;
  /** Short code. / 公司简称 */
  code?: string;
  /** Tax registration number. / 统一社会信用代码 */
  taxNo?: string;
  disabled?: boolean;
}

interface CompanyBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: CompanyBrowseItem) => void;
  items?: CompanyBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function CompanyBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: CompanyBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const resolvedTitle =
    title ?? t("companyBrowse.title", { defaultValue: "选择公司" });
  const resolvedSearch =
    searchPlaceholder ??
    t("companyBrowse.search", { defaultValue: "搜索公司" });
  const resolvedEmpty =
    emptyText ?? t("companyBrowse.empty", { defaultValue: "无匹配公司" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.code?.toLowerCase().includes(q) ||
        c.taxNo?.toLowerCase().includes(q),
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
    const chosen = items.find((c) => c.id === selectedId);
    if (chosen) {
      onSelect(chosen);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="company-browse"
        className={cn("sm:max-w-md", className)}
      >
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("companyBrowse.description", {
              defaultValue: "从列表中选择一个公司",
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
          {filtered.map((c) => {
            const isSelected = c.id === selectedId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  disabled={c.disabled}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(c.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm transition-colors outline-none",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring/50 focus-visible:ring-2",
                    isSelected && "bg-accent/50",
                    c.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <Building2Icon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">{c.name}</span>
                  {c.code && (
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {c.code}
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
            {t("companyBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CompanyBrowse };
export type { CompanyBrowseProps, CompanyBrowseItem };
