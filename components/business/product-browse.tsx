"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { formatCurrency } from "@/lib/format";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component ProductBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, product-browse
 * @example
 * <ProductBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
 * />
 */

interface ProductBrowseItem {
  id: string;
  /** Product name. / 商品名称 */
  name: string;
  /** SKU code. / 商品编码 */
  sku?: string;
  /** Specification. / 规格 */
  spec?: string;
  /** Unit. / 单位 */
  unit?: string;
  /** Unit price. / 单价 */
  price?: number;
  disabled?: boolean;
}

interface ProductBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: ProductBrowseItem) => void;
  /** Enable multi-select (default false). / 多选 */
  multiple?: boolean;
  items?: ProductBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

function ProductBrowse({
  open,
  onOpenChange,
  onSelect,
  multiple = false,
  items = [],
  title,
  searchPlaceholder,
  emptyText,
  className,
}: ProductBrowseProps) {
  const { t } = useTranslation("ui");

  const resolvedTitle =
    title ?? t("productBrowse.title", { defaultValue: "选择商品" });
  const resolvedSearch =
    searchPlaceholder ??
    t("productBrowse.search", { defaultValue: "搜索商品" });
  const resolvedEmpty =
    emptyText ?? t("productBrowse.empty", { defaultValue: "无匹配商品" });

  const columns = React.useMemo<
    BrowseColumn<ProductBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "name",
        title: t("productBrowse.colName", { defaultValue: "商品" }),
        dataIndex: "name",
      },
      {
        key: "sku",
        title: t("productBrowse.colSku", { defaultValue: "SKU" }),
        dataIndex: "sku",
      },
      {
        key: "spec",
        title: t("productBrowse.colSpec", { defaultValue: "规格" }),
        dataIndex: "spec",
      },
      {
        key: "price",
        title: t("productBrowse.colPrice", { defaultValue: "单价" }),
        dataIndex: "price",
        render: (v) => (typeof v === "number" ? formatCurrency(v) : "-"),
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<ProductBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: multi emits each selected row; single emits chosen row.
      if (multiple) {
        for (const item of selected) onSelect(item as ProductBrowseItem);
      } else {
        onSelect(selected[0]! as ProductBrowseItem);
      }
    },
    [onSelect, multiple],
  );

  return (
    <BrowseDialog<ProductBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<ProductBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (ProductBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["name", "id", "sku", "spec"] as (keyof (ProductBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={multiple ? "multiple" : "single"}
      dataSlot="product-browse"
      title={resolvedTitle}
      description={t("productBrowse.description", {
        defaultValue: multiple ? "可多选商品" : "从列表中选择商品",
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

export { ProductBrowse };
export type { ProductBrowseProps, ProductBrowseItem };
