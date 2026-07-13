"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component WarehouseBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, warehouse-browse
 * @example
 * <WarehouseBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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

  const resolvedTitle =
    title ?? t("warehouseBrowse.title", { defaultValue: "选择仓库" });
  const resolvedSearch =
    searchPlaceholder ??
    t("warehouseBrowse.search", { defaultValue: "搜索仓库" });
  const resolvedEmpty =
    emptyText ?? t("warehouseBrowse.empty", { defaultValue: "无匹配仓库" });

  const columns = React.useMemo<
    BrowseColumn<WarehouseBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "name",
        title: t("warehouseBrowse.colName", { defaultValue: "仓库" }),
        dataIndex: "name",
      },
      {
        key: "code",
        title: t("warehouseBrowse.colCode", { defaultValue: "编码" }),
        dataIndex: "code",
      },
      {
        key: "address",
        title: t("warehouseBrowse.colAddress", { defaultValue: "地址" }),
        dataIndex: "address",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<WarehouseBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as WarehouseBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<WarehouseBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<WarehouseBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (WarehouseBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        [
          "name",
          "id",
          "code",
          "address",
          "manager",
        ] as (keyof (WarehouseBrowseItem & Record<string, unknown>) & string)[]
      }
      selectionMode={"single"}
      dataSlot="warehouse-browse"
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

export { WarehouseBrowse };
export type { WarehouseBrowseProps, WarehouseBrowseItem };
