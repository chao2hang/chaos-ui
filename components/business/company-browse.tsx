"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component CompanyBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, company-browse
 * @example
 * <CompanyBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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

  const resolvedTitle =
    title ?? t("companyBrowse.title", { defaultValue: "选择公司" });
  const resolvedSearch =
    searchPlaceholder ??
    t("companyBrowse.search", { defaultValue: "搜索公司" });
  const resolvedEmpty =
    emptyText ?? t("companyBrowse.empty", { defaultValue: "无匹配公司" });

  const columns = React.useMemo<
    BrowseColumn<CompanyBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "name",
        title: t("companyBrowse.colName", { defaultValue: "名称" }),
        dataIndex: "name",
      },
      {
        key: "code",
        title: t("companyBrowse.colCode", { defaultValue: "编码" }),
        dataIndex: "code",
      },
      {
        key: "taxNo",
        title: t("companyBrowse.colTaxNo", { defaultValue: "税号" }),
        dataIndex: "taxNo",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<CompanyBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as CompanyBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<CompanyBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<CompanyBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "id" as keyof (CompanyBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["name", "code", "id", "taxNo"] as (keyof (CompanyBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={"single"}
      dataSlot="company-browse"
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

export { CompanyBrowse };
export type { CompanyBrowseProps, CompanyBrowseItem };
