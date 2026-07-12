"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import {
  BrowseDialog,
  type BrowseColumn,
} from "@/components/business/browse-dialog";

/**
 * @component CityBrowse
 * @category business/picker
 * @since 0.7.0
 * @description Domain browse adapter over `BrowseDialog` (local `items` mode).
 * Keeps the historical export name and item shape; UI shell is shared.
 * / 领域浏览适配器：内部组合 BrowseDialog，保留导出名与 item 形状。
 * @keywords browse, picker, dialog, city-browse
 * @example
 * <CityBrowse
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSelect={(item) => console.log(item)}
 *   items={[]}
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: CityBrowseItem) => void;
  items?: CityBrowseItem[];
  title?: string;
  searchPlaceholder?: string;
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

  const resolvedTitle =
    title ?? t("cityBrowse.title", { defaultValue: "选择城市" });
  const resolvedSearch =
    searchPlaceholder ?? t("cityBrowse.search", { defaultValue: "搜索城市" });
  const resolvedEmpty =
    emptyText ?? t("cityBrowse.empty", { defaultValue: "无匹配城市" });

  const columns = React.useMemo<
    BrowseColumn<CityBrowseItem & Record<string, unknown>>[]
  >(
    () => [
      {
        key: "name",
        title: t("cityBrowse.colName", { defaultValue: "城市" }),
        dataIndex: "name",
      },
      {
        key: "code",
        title: t("cityBrowse.colCode", { defaultValue: "编码" }),
        dataIndex: "code",
      },
      {
        key: "province",
        title: t("cityBrowse.colProvince", { defaultValue: "省份" }),
        dataIndex: "province",
      },
    ],
    [t],
  );

  const handleChange = React.useCallback(
    (selected: Array<CityBrowseItem & Record<string, unknown>>) => {
      if (selected.length === 0) return;
      // Historical contract: single-select emits the chosen row.
      onSelect(selected[0]! as CityBrowseItem);
    },
    [onSelect],
  );

  return (
    <BrowseDialog<CityBrowseItem & Record<string, unknown>>
      open={open}
      onOpenChange={onOpenChange}
      items={items as Array<CityBrowseItem & Record<string, unknown>>}
      columns={columns}
      rowKey={
        "code" as keyof (CityBrowseItem & Record<string, unknown>) & string
      }
      filterKeys={
        ["name", "code", "province"] as (keyof (CityBrowseItem &
          Record<string, unknown>) &
          string)[]
      }
      selectionMode={"single"}
      dataSlot="city-browse"
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

export { CityBrowse };
export type { CityBrowseProps, CityBrowseItem };
