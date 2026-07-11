"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FilterBar, type FilterField } from "./filter-bar";

export interface ListPageShellProps extends React.ComponentProps<"div"> {
  /**
   * Pre-built filter node. Takes precedence over filterFields.
   * / 直接传入的筛选区节点，优先于 filterFields
   */
  filter?: React.ReactNode;
  /** Declarative FilterBar fields (used when `filter` is omitted) */
  filterFields?: FilterField[];
  onSearch?: (values: Record<string, unknown>) => void;
  onReset?: () => void;
  filterLoading?: boolean;
  /**
   * Right-side toolbar actions (e.g. RefreshButton, primary actions).
   * / 右侧工具条（刷新、新增等）
   */
  toolbar?: React.ReactNode;
  /**
   * Left-side extra content on the toolbar row (e.g. RecordCount).
   * / 工具条左侧附加内容（如 RecordCount）
   */
  extra?: React.ReactNode;
  /** Table / content area */
  children?: React.ReactNode;
}

/**
 * @component ListPageShell
 * @category business/crud
 * @since 1.5.0
 * @description Lightweight composition for FilterBar + optional toolbar + table.
 * Does not wrap PageHeader/Card — consumers keep their own page chrome.
 * / 轻量列表壳：统一 FilterBar + 工具条 + 表格间距，不包 PageHeader/Card。
 * @keywords list, shell, filter, toolbar, search-table
 * @example
 * <ListPageShell
 *   filterFields={fields}
 *   onSearch={setFilters}
 *   toolbar={<RefreshButton onClick={refresh} loading={isFetching} />}
 *   extra={<RecordCount total={total} />}
 * >
 *   <SearchTable ... />
 * </ListPageShell>
 */
export function ListPageShell({
  filter,
  filterFields,
  onSearch,
  onReset,
  filterLoading,
  toolbar,
  extra,
  children,
  className,
  ...props
}: ListPageShellProps) {
  const filterNode =
    filter ??
    (filterFields && onSearch ? (
      <FilterBar
        fields={filterFields}
        onSearch={onSearch}
        {...(onReset ? { onReset } : {})}
        {...(filterLoading !== undefined ? { loading: filterLoading } : {})}
      />
    ) : null);

  const showToolbarRow = Boolean(toolbar || extra);

  return (
    <div
      data-slot="list-page-shell"
      className={cn("space-y-2", className)}
      {...props}
    >
      {filterNode}
      {showToolbarRow && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-muted-foreground min-w-0 text-sm">{extra}</div>
          {toolbar && (
            <div className="flex flex-wrap items-center gap-2">{toolbar}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
