"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component FeeTypeBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, fee-type-browse
 * @example
 * <FeeTypeBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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

  const resolvedTitle =
    title ?? t("feeTypeBrowse.title", { defaultValue: "选择费用类型" });
  const resolvedSearch =
    searchPlaceholder ??
    t("feeTypeBrowse.search", { defaultValue: "搜索费用类型" });
  const resolvedEmpty =
    emptyText ?? t("feeTypeBrowse.empty", { defaultValue: "无匹配费用类型" });

  const columns = React.useMemo<
    BrowseColumn<FeeTypeBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "name",
        title: t("feeTypeBrowse.colName", { defaultValue: "类型" }),
        dataIndex: "name",
      },
      {
        key: "code",
        title: t("feeTypeBrowse.colCode", { defaultValue: "编码" }),
        dataIndex: "code",
      },
      {
        key: "direction",
        title: t("feeTypeBrowse.colDirection", { defaultValue: "方向" }),
        dataIndex: "direction",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<FeeTypeBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as FeeTypeBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<FeeTypeBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<FeeTypeBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (FeeTypeBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["name", "id", "code", "direction"] as (keyof (FeeTypeBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={"single"}
      dataSlot="fee-type-browse"
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

export { FeeTypeBrowse };
export type { FeeTypeBrowseProps, FeeTypeBrowseItem };
