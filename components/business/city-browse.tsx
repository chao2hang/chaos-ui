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
import { CheckIcon, MapPinIcon, SearchIcon } from "@/components/ui/icons";

/**
 * @component CityBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 城市选择弹窗。在 Dialog 中按关键词筛选城市并选中。
 * / City browse dialog — filter and pick a city from a list.
 * @keywords city, browse, picker, dialog
 * @example
 * <CityBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[{ code: "CQ", name: "重庆" }]}
 * />
 */

interface CityBrowseItem {
  /** City code, e.g. "CQ". / 城市编码 */
  code: string;
  /** City display name. / 城市名称 */
  name: string;
  /** Optional province/region label. / 所属省份 */
  province?: string;
  disabled?: boolean;
}

interface CityBrowseProps {
  /** Whether the dialog is open. / 是否打开 */
  open: boolean;
  /** Open state change handler. / 开关回调 */
  onOpenChange: (open: boolean) => void;
  /** Called with the selected city item. / 选中回调 */
  onSelect: (item: CityBrowseItem) => void;
  /** City list to browse (defaults to an empty list). / 候选城市 */
  items?: CityBrowseItem[];
  /** Dialog title (defaults to localized "选择城市"). / 弹窗标题 */
  title?: string;
  /** Search placeholder. / 搜索占位 */
  searchPlaceholder?: string;
  /** Empty-state text. / 空状态文案 */
  emptyText?: string;
  className?: string;
}

function CityBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: CityBrowseProps) {
  const { t } = useTranslation("ui");
  const [query, setQuery] = React.useState("");
  const [selectedCode, setSelectedCode] = React.useState<string | null>(null);

  const resolvedTitle =
    title ?? t("cityBrowse.title", { defaultValue: "选择城市" });
  const resolvedSearch =
    searchPlaceholder ?? t("cityBrowse.search", { defaultValue: "搜索城市" });
  const resolvedEmpty =
    emptyText ?? t("cityBrowse.empty", { defaultValue: "无匹配城市" });

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.province?.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Reset transient state whenever the dialog opens.
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedCode(null);
    }
  }, [open]);

  const handleConfirm = () => {
    if (selectedCode == null) return;
    const chosen = items.find((c) => c.code === selectedCode);
    if (chosen) {
      onSelect(chosen);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="city-browse"
        className={cn("sm:max-w-md", className)}
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {t("cityBrowse.description", {
              defaultValue: "从列表中选择一个城市",
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
            const isSelected = c.code === selectedCode;
            return (
              <li key={c.code}>
                <button
                  type="button"
                  disabled={c.disabled}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCode(c.code)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm transition-colors outline-none",
                    "hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring/50 focus-visible:ring-2",
                    isSelected && "bg-accent/50",
                    c.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <MapPinIcon className="size-4 shrink-0 opacity-50" />
                  <span className="flex-1 truncate">{c.name}</span>
                  {c.province && (
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {c.province}
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
            disabled={selectedCode == null}
            onClick={handleConfirm}
          >
            {t("cityBrowse.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CityBrowse };
export type { CityBrowseProps, CityBrowseItem };
