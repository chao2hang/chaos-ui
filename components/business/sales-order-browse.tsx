"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { formatCurrency } from "@/lib/format";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component SalesOrderBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, sales-order-browse
 * @example
 * <SalesOrderBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
 * />
 */

interface SalesOrderBrowseItem {
  id: string;
  /** Order number (may equal id). / 订单号 */
  no?: string;
  /** Customer name. / 客户名称 */
  customer?: string;
  /** Order amount. / 订单金额 */
  amount?: number;
  /** Order date (ISO or yyyy-mm-dd). / 订单日期 */
  date?: string;
  disabled?: boolean;
}

interface SalesOrderBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: SalesOrderBrowseItem) => void;
  items?: SalesOrderBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function SalesOrderBrowse({
  open,
  onOpenChange,
  onSelect,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: SalesOrderBrowseProps) {
  const { t } = useTranslation("ui");

  const resolvedTitle =
    title ?? t("salesOrderBrowse.title", { defaultValue: "选择销售订单" });
  const resolvedSearch =
    searchPlaceholder ??
    t("salesOrderBrowse.search", { defaultValue: "搜索销售订单" });
  const resolvedEmpty =
    emptyText ?? t("salesOrderBrowse.empty", { defaultValue: "无匹配订单" });

  const columns = React.useMemo<
    BrowseColumn<SalesOrderBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "no",
        title: t("salesOrderBrowse.colNo", { defaultValue: "单号" }),
        dataIndex: "no",
      },
      {
        key: "customer",
        title: t("salesOrderBrowse.colCustomer", { defaultValue: "客户" }),
        dataIndex: "customer",
      },
      {
        key: "amount",
        title: t("salesOrderBrowse.colAmount", { defaultValue: "金额" }),
        dataIndex: "amount",
        render: (v) => (typeof v === "number" ? formatCurrency(v) : "-"),
      },
      {
        key: "date",
        title: t("salesOrderBrowse.colDate", { defaultValue: "日期" }),
        dataIndex: "date",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<SalesOrderBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as SalesOrderBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<SalesOrderBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<SalesOrderBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (SalesOrderBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["id", "no", "customer"] as (keyof (SalesOrderBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={"single"}
      dataSlot="sales-order-browse"
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

export { SalesOrderBrowse };
export type { SalesOrderBrowseProps, SalesOrderBrowseItem };
