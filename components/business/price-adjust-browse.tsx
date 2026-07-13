"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component PriceAdjustBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, price-adjust-browse
 * @example
 * <PriceAdjustBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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

  const resolvedTitle =
    title ?? t("priceAdjustBrowse.title", { defaultValue: "选择调价单" });
  const resolvedSearch =
    searchPlaceholder ??
    t("priceAdjustBrowse.search", { defaultValue: "搜索调价单" });
  const resolvedEmpty =
    emptyText ?? t("priceAdjustBrowse.empty", { defaultValue: "无匹配调价单" });

  const columns = React.useMemo<
    BrowseColumn<PriceAdjustBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "no",
        title: t("priceAdjustBrowse.colNo", { defaultValue: "单号" }),
        dataIndex: "no",
      },
      {
        key: "product",
        title: t("priceAdjustBrowse.colProduct", { defaultValue: "商品" }),
        dataIndex: "product",
      },
      {
        key: "date",
        title: t("priceAdjustBrowse.colDate", { defaultValue: "日期" }),
        dataIndex: "date",
      },
      {
        key: "status",
        title: t("priceAdjustBrowse.colStatus", { defaultValue: "状态" }),
        dataIndex: "status",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<PriceAdjustBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as PriceAdjustBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<PriceAdjustBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<PriceAdjustBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (PriceAdjustBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["id", "no", "product", "status"] as (keyof (PriceAdjustBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={"single"}
      dataSlot="price-adjust-browse"
      title={resolvedTitle}
      searchPlaceholder={resolvedSearch}
      emptyText={resolvedEmpty}
      pageSize={Math.max(items.length, 10)}
      searchDebounceMs={0}
      onChange={handleChange}
      {...(className !== undefined ? { className } : {})}
    />
  );
}

export { PriceAdjustBrowse };
export type { PriceAdjustBrowseProps, PriceAdjustBrowseItem };
