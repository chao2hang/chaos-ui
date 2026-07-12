"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { formatCurrency } from "@/lib/format";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component WriteoffBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, writeoff-browse
 * @example
 * <WriteoffBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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

  const resolvedTitle =
    title ?? t("writeoffBrowse.title", { defaultValue: "选择核销单" });
  const resolvedSearch =
    searchPlaceholder ??
    t("writeoffBrowse.search", { defaultValue: "搜索核销单" });
  const resolvedEmpty =
    emptyText ?? t("writeoffBrowse.empty", { defaultValue: "无匹配核销单" });

  const columns = React.useMemo<
    BrowseColumn<WriteoffBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "no",
        title: t("writeoffBrowse.colNo", { defaultValue: "单号" }),
        dataIndex: "no",
      },
      {
        key: "counterparty",
        title: t("writeoffBrowse.colCounterparty", { defaultValue: "对方" }),
        dataIndex: "counterparty",
      },
      {
        key: "amount",
        title: t("writeoffBrowse.colAmount", { defaultValue: "金额" }),
        dataIndex: "amount",
        render: (v) => (typeof v === "number" ? formatCurrency(v) : "-"),
      },
      {
        key: "status",
        title: t("writeoffBrowse.colStatus", { defaultValue: "状态" }),
        dataIndex: "status",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<WriteoffBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as WriteoffBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<WriteoffBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<WriteoffBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (WriteoffBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["id", "no", "counterparty", "status"] as (keyof (WriteoffBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={"single"}
      dataSlot="writeoff-browse"
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

export { WriteoffBrowse };
export type { WriteoffBrowseProps, WriteoffBrowseItem };
