"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component ShippingWayBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, shipping-way-browse
 * @example
 * <ShippingWayBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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

  const resolvedTitle =
    title ?? t("shippingWayBrowse.title", { defaultValue: "选择运输方式" });
  const resolvedSearch =
    searchPlaceholder ??
    t("shippingWayBrowse.search", { defaultValue: "搜索运输方式" });
  const resolvedEmpty =
    emptyText ??
    t("shippingWayBrowse.empty", { defaultValue: "无匹配运输方式" });

  const columns = React.useMemo<
    BrowseColumn<ShippingWayBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "name",
        title: t("shippingWayBrowse.colName", { defaultValue: "方式" }),
        dataIndex: "name",
      },
      {
        key: "code",
        title: t("shippingWayBrowse.colCode", { defaultValue: "编码" }),
        dataIndex: "code",
      },
      {
        key: "carrier",
        title: t("shippingWayBrowse.colCarrier", { defaultValue: "承运商" }),
        dataIndex: "carrier",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<ShippingWayBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as ShippingWayBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<ShippingWayBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<ShippingWayBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (ShippingWayBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["name", "id", "code", "carrier"] as (keyof (ShippingWayBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={"single"}
      dataSlot="shipping-way-browse"
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

export { ShippingWayBrowse };
export type { ShippingWayBrowseProps, ShippingWayBrowseItem };
