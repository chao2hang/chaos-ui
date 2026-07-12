"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component CustomerBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, customer-browse
 * @example
 * <CustomerBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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

  const resolvedTitle =
    title ?? t("customerBrowse.title", { defaultValue: "选择客户" });
  const resolvedSearch =
    searchPlaceholder ??
    t("customerBrowse.search", { defaultValue: "搜索客户" });
  const resolvedEmpty =
    emptyText ?? t("customerBrowse.empty", { defaultValue: "无匹配客户" });

  const columns = React.useMemo<
    BrowseColumn<CustomerBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "name",
        title: t("customerBrowse.colName", { defaultValue: "客户" }),
        dataIndex: "name",
      },
      {
        key: "contact",
        title: t("customerBrowse.colContact", { defaultValue: "联系人" }),
        dataIndex: "contact",
      },
      {
        key: "phone",
        title: t("customerBrowse.colPhone", { defaultValue: "电话" }),
        dataIndex: "phone",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<CustomerBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: multi emits each selected row; single emits chosen row.
      if (multiple) {
        for (const item of selected) onSelect(item as CustomerBrowseItem);
      } else {
        onSelect(selected[0]! as CustomerBrowseItem);
      }
    },
    [onSelect, multiple],
  );

  return (
    <BrowseDialog<CustomerBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<CustomerBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (CustomerBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["name", "id", "contact", "phone"] as (keyof (CustomerBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={multiple ? "multiple" : "single"}
      dataSlot="customer-browse"
      title={resolvedTitle}
      description={t("customerBrowse.description", {
        defaultValue: multiple ? "可多选客户" : "从列表中选择一个客户",
      })}
      searchPlaceholder={resolvedSearch}
      emptyText={resolvedEmpty}
      pageSize={Math.max(items.length, 10)}
      searchDebounceMs={0}
      onChange={handleChange}
      {...(className !== undefined ? { className } : {})}
    />
  );
}

export { CustomerBrowse };
export type { CustomerBrowseProps, CustomerBrowseItem };
