"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FilterBar, type FilterField } from "./filter-bar";

/** Where primary toolbar sits relative to the filter (#58). */
export type ListPageToolbarPlacement = "end-of-filter-row" | "below-filter";

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
   * Prefer same row as filter (`toolbarPlacement="end-of-filter-row"`, default).
   * / 右侧工具条（刷新、新增等）；默认与筛选同一行
   */
  toolbar?: React.ReactNode;
  /**
   * Extra on the actions side (e.g. RecordCount), next to toolbar.
   * / 与 toolbar 同侧的附加内容（如 RecordCount）
   */
  extra?: React.ReactNode;
  /**
   * Toolbar layout (#58).
   * - `end-of-filter-row` (default): FilterBar + actions on one flex row (no full-width empty strip)
   * - `below-filter`: legacy — filter, then a separate toolbar row
   */
  toolbarPlacement?: ListPageToolbarPlacement;
  /** Table / content area */
  children?: React.ReactNode;
}

/**
 * @component ListPageShell
 * @category business/crud
 * @since 1.5.0
 * @description Lightweight composition for FilterBar + optional toolbar + table.
 * Default places toolbar on the **same row** as the filter (#58). Does not wrap
 * PageHeader/Card — consumers keep their own page chrome (e.g. PageChrome list **without** actions).
 * / 轻量列表壳：默认筛选与主操作同一行；不包 PageHeader/Card。
 * @keywords list, shell, filter, toolbar, search-table
 * @example
 * <ListPageShell
 *   filterFields={fields}
 *   onSearch={setFilters}
 *   toolbar={
 *     <>
 *       <RefreshButton onClick={refresh} loading={isFetching} />
 *       <Button size="sm">新增</Button>
 *     </>
 *   }
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
  toolbarPlacement = "end-of-filter-row",
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

  const hasActions = Boolean(toolbar || extra);
  const actions = hasActions ? (
    <div
      data-slot="list-page-shell-actions"
      className="flex shrink-0 flex-wrap items-center gap-2"
    >
      {extra ? (
        <div className="text-muted-foreground min-w-0 text-sm">{extra}</div>
      ) : null}
      {toolbar ? (
        <div className="flex flex-wrap items-center gap-2">{toolbar}</div>
      ) : null}
    </div>
  ) : null;

  const inlineRow =
    toolbarPlacement === "end-of-filter-row" && (filterNode || hasActions);

  return (
    <div
      data-slot="list-page-shell"
      data-toolbar-placement={toolbarPlacement}
      className={cn("space-y-2", className)}
      {...props}
    >
      {inlineRow ? (
        <div
          data-slot="list-page-shell-filter-row"
          className="flex flex-wrap items-end justify-between gap-3"
        >
          {filterNode ? (
            <div className="min-w-0 flex-1 basis-[min(100%,20rem)]">
              {filterNode}
            </div>
          ) : (
            <div className="min-w-0 flex-1" />
          )}
          {actions}
        </div>
      ) : (
        <>
          {filterNode}
          {hasActions ? (
            <div
              data-slot="list-page-shell-toolbar-row"
              className="flex flex-wrap items-center justify-between gap-2"
            >
              <div className="min-w-0 flex-1" />
              {actions}
            </div>
          ) : null}
        </>
      )}
      {children}
    </div>
  );
}
