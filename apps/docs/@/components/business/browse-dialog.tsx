"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

/** Column definition matching the existing DataTable / SearchTable pattern. */
export interface BrowseColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T & string;
  width?: number | string;
  /** Cell renderer. `value` is typed as `T[keyof T]`. */
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
}

/** Parameters passed to the `loadData` fetcher. */
export interface BrowseLoadParams {
  keyword: string;
  page: number;
  pageSize: number;
  /** Active tree node id (when `tree` prop is provided). */
  categoryId?: string | number;
}

/** Return type of the `loadData` fetcher. */
export interface BrowseLoadResult<T> {
  rows: T[];
  total: number;
}

/** Tree node shape for the optional left-side category tree. */
export interface BrowseTreeNode {
  id: string | number;
  label: string;
  children?: BrowseTreeNode[];
  /** Optional item count badge. */
  count?: number;
}

/* ------------------------------------------------------------------ */
/*  BrowseDialog                                                        */
/* ------------------------------------------------------------------ */

export interface BrowseDialogProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Dialog open state (controlled). */
  open: boolean;
  /** Dialog open change callback. */
  onOpenChange: (open: boolean) => void;

  /* --- Core data loading --- */

  /** Async fetcher that receives search/pagination params and returns rows + total.
   *  @example
   *  loadData={async (params) => {
   *    const res = await api.search(params);
   *    return { rows: res.list, total: res.total };
   *  }}
   */
  loadData: (params: BrowseLoadParams) => Promise<BrowseLoadResult<T>>;

  /* --- Columns --- */

  /** Column definitions for the data table. */
  columns: BrowseColumn<T>[];

  /* --- Selection --- */

  /** Controlled selected items (full objects). */
  value?: T[];
  /** Uncontrolled default selected items. */
  defaultValue?: T[];
  /** Batch selection callback – fires on confirm. */
  onChange?: (items: T[]) => void;

  /** Key used to identify rows (default: `"id"`). */
  rowKey?: keyof T & string;

  /* --- Optional category tree --- */

  /** When provided, renders a left-side category tree. */
  tree?: {
    loadTree: () => Promise<BrowseTreeNode[]>;
    defaultExpandedKeys?: string[];
  };

  /* --- Display --- */

  /** Dialog title (default: "选择"). */
  title?: string;
  /** Search input placeholder (default: "搜索..."). */
  searchPlaceholder?: string;
  /** Empty-state text (default: "暂无数据"). */
  emptyText?: string;
  className?: string;

  /* --- Pagination & behaviour --- */

  /** Rows per page (default: 10). */
  pageSize?: number;
  /** Search debounce in ms (default: 300). */
  searchDebounceMs?: number;

  /* --- Selection limits --- */

  /** Maximum selectable items. */
  maxSelect?: number;
  /** Minimum required items before confirm is enabled. */
  minSelect?: number;
}

/**
 * Generic OA-style browse dialog with remote pagination, multi-select,
 * selected-chips display, and optional left-side category tree.
 *
 * @component BrowseDialog
 * @category business/picker
 * @since 0.13.0
 * @description 泛微OA风格通用浏览选择弹窗，支持远程分页加载、跨页多选保持、
 * 已选标签展示和可选的左侧分类树。
 *
 * @example
 * ```tsx
 * <BrowseDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   loadData={async (params) => {
 *     const res = await api.search(params);
 *     return { rows: res.list, total: res.total };
 *   }}
 *   columns={[
 *     { key: "name", title: "名称" },
 *     { key: "code", title: "编码" },
 *   ]}
 *   onChange={(items) => console.log(items)}
 * />
 * ```
 */
function BrowseDialog<T extends Record<string, unknown> = Record<string, unknown>>({
  open,
  onOpenChange,
  loadData,
  columns,
  value,
  defaultValue: _defaultValue = [],
  onChange,
  rowKey: rowKeyProp = "id" as keyof T & string,
  tree,
  title,
  searchPlaceholder,
  emptyText,
  className,
  pageSize: pageSizeProp = 10,
  searchDebounceMs = 300,
  maxSelect,
  minSelect,
}: BrowseDialogProps<T>) {
  const { t } = useTranslation("ui");
  const rowKey = rowKeyProp;

  const resolvedTitle = title ?? t("browseDialog.title", { defaultValue: "选择" });
  const resolvedSearchPlaceholder =
    searchPlaceholder ?? t("browseDialog.search", { defaultValue: "搜索..." });
  const resolvedEmpty =
    emptyText ?? t("browseDialog.empty", { defaultValue: "暂无数据" });

  /* ---- state ---- */
  const [keyword, setKeyword] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(pageSizeProp);
  const [rows, setRows] = React.useState<T[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // Selection map: key → full row object (persists across pages)
  const selectedMapRef = React.useRef<Map<string | number, T>>(new Map());
  // Use a counter to trigger re-renders when the map changes
  const [, setTick] = React.useState(0);
  const rerender = () => setTick((n) => n + 1);

  // Tree state
  const [treeNodes, setTreeNodes] = React.useState<BrowseTreeNode[]>([]);
  const [activeCategoryId, setActiveCategoryId] = React.useState<
    string | number | undefined
  >(undefined);
  const [expandedKeys, setExpandedKeys] = React.useState<Set<string | number>>(
    new Set(tree?.defaultExpandedKeys ?? []),
  );

  const isControlled = value !== undefined;

  // Sync controlled value into the ref (so table checkboxes reflect it)
  React.useEffect(() => {
    if (isControlled && value) {
      const m = new Map<string | number, T>();
      for (const item of value) {
        m.set(String(item[rowKey]), item);
      }
      selectedMapRef.current = m;
      rerender();
    }
  }, [isControlled, value, rowKey]);

  /* ---- data fetching (debounced) ---- */
  const fetchIdRef = React.useRef(0);

  React.useEffect(() => {
    if (!open) return;

    fetchIdRef.current += 1;
    const currentFetchId = fetchIdRef.current;

    const timer = setTimeout(() => {
      setLoading(true);
      loadData({
        keyword,
        page,
        pageSize,
        ...(activeCategoryId !== undefined ? { categoryId: activeCategoryId } : {}),
      })
        .then((result) => {
          if (currentFetchId !== fetchIdRef.current) return; // stale
          setRows(result.rows);
          setTotal(result.total);
        })
        .catch(() => {
          if (currentFetchId !== fetchIdRef.current) return;
          setRows([]);
          setTotal(0);
        })
        .finally(() => {
          if (currentFetchId !== fetchIdRef.current) return;
          setLoading(false);
        });
    }, searchDebounceMs);

    return () => clearTimeout(timer);
  }, [open, keyword, page, pageSize, activeCategoryId, loadData, searchDebounceMs]);

  /* ---- tree loading ---- */
  React.useEffect(() => {
    if (open && tree) {
      tree.loadTree().then(setTreeNodes).catch(() => setTreeNodes([]));
    }
  }, [open, tree]);

  /* ---- reset on open ---- */
  React.useEffect(() => {
    if (open) {
      setKeyword("");
      setPage(1);
      setActiveCategoryId(undefined);
      if (!isControlled) {
        selectedMapRef.current = new Map();
        rerender();
      }
    }
  }, [open, isControlled]);

  /* ---- selection helpers ---- */
  const toggleRow = (row: T) => {
    const key = String(row[rowKey]);
    const map = selectedMapRef.current;
    if (map.has(key)) {
      map.delete(key);
    } else {
      if (maxSelect != null && map.size >= maxSelect) return;
      map.set(key, row);
    }
    rerender();
  };

  const toggleAllCurrentPage = () => {
    const map = selectedMapRef.current;
    const allSelected = rows.every((r) => map.has(String(r[rowKey])));
    for (const r of rows) {
      const key = String(r[rowKey]);
      if (allSelected) {
        map.delete(key);
      } else {
        if (maxSelect != null && map.size >= maxSelect) break;
        map.set(key, r);
      }
    }
    rerender();
  };

  const removeItem = (key: string | number) => {
    selectedMapRef.current.delete(String(key));
    rerender();
  };

  const handleConfirm = () => {
    const items = Array.from(selectedMapRef.current.values());
    if (minSelect != null && items.length < minSelect) return;
    onChange?.(items);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  /* ---- tree helpers ---- */
  const toggleExpand = (id: string | number) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectTreeNode = (node: BrowseTreeNode) => {
    setActiveCategoryId(node.id);
    setPage(1);
  };

  /* ---- derived values ---- */
  const selectedMap = selectedMapRef.current;
  const selectedCount = selectedMap.size;
  const allCurrentPageSelected =
    rows.length > 0 && rows.every((r) => selectedMap.has(String(r[rowKey])));
  const someCurrentPageSelected = rows.some((r) => selectedMap.has(String(r[rowKey])));
  const canConfirm =
    selectedCount >= (minSelect ?? 0) && (maxSelect == null || selectedCount <= maxSelect);

  const alignClass: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  /* ---- render ---- */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="browse-dialog"
        className={cn("sm:max-w-3xl", className)}
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
          <DialogDescription>
            {maxSelect != null
              ? t("browseDialog.descriptionMax", {
                  defaultValue: `最多可选 ${maxSelect} 项`,
                  max: maxSelect,
                })
              : t("browseDialog.description", {
                  defaultValue: "从列表中选择",
                })}
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className={cn("flex gap-0", tree && "min-h-[400px]")}>
          {/* ---- Tree panel ---- */}
          {tree && (
            <div className="w-48 shrink-0 border-r pr-2 overflow-y-auto">
              <ul className="space-y-0.5 py-1 text-sm">
                {/* "All" node */}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(undefined);
                      setPage(1);
                    }}
                    className={cn(
                      "flex w-full items-center gap-1.5 rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-muted",
                      activeCategoryId === undefined && "bg-accent font-medium",
                    )}
                  >
                    {t("browseDialog.allCategories", { defaultValue: "全部分类" })}
                  </button>
                </li>
                {treeNodes.map((node) => (
                  <TreeNodeItem
                    key={String(node.id)}
                    node={node}
                    depth={0}
                    expandedKeys={expandedKeys}
                    activeCategoryId={activeCategoryId}
                    onToggleExpand={toggleExpand}
                    onSelect={selectTreeNode}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* ---- Content area ---- */}
          <div className="flex-1 flex flex-col min-w-0 gap-3 pl-0 pl-3">
            {/* Search input */}
            <div className="flex items-center gap-2 border rounded-lg px-2">
              <SearchIcon className="size-4 shrink-0 opacity-50" />
              <Input
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(1);
                }}
                placeholder={resolvedSearchPlaceholder}
                aria-label={resolvedSearchPlaceholder}
                className="h-8 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              />
            </div>

            {/* Selected chips */}
            {selectedCount > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-xs text-muted-foreground shrink-0">
                  {t("browseDialog.selected", {
                    defaultValue: `已选 ${selectedCount} 项`,
                    count: selectedCount,
                  })}
                  :
                </span>
                {Array.from(selectedMap.values()).map((item) => {
                  const key = String(item[rowKey]);
                  const label =
                    typeof item.name === "string"
                      ? item.name
                      : typeof item.code === "string"
                        ? item.code
                        : key;
                  return (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="gap-1 cursor-default"
                    >
                      <span className="max-w-[120px] truncate">{label}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(key)}
                        className="ml-0.5 inline-flex size-3 items-center justify-center rounded-full hover:bg-muted-foreground/20"
                        aria-label={t("browseDialog.removeItem", { defaultValue: "移除" })}
                      >
                        <XIcon className="size-2.5" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* Selection column */}
                    <TableHead className="w-10">
                      <input
                        type="checkbox"
                        checked={allCurrentPageSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = someCurrentPageSelected && !allCurrentPageSelected;
                        }}
                        onChange={toggleAllCurrentPage}
                        className="size-4 rounded-[4px] border-input cursor-pointer"
                        aria-label={t("browseDialog.selectAll", { defaultValue: "全选当前页" })}
                      />
                    </TableHead>
                    {columns.map((col) => (
                      <TableHead
                        key={col.key}
                        className={alignClass[col.align || "left"]}
                        style={{ width: col.width, minWidth: col.width }}
                      >
                        {col.title}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, ri) => (
                      <TableRow key={ri}>
                        <TableCell>
                          <Skeleton className="h-4 w-4" />
                        </TableCell>
                        {columns.map((_, ci) => (
                          <TableCell key={ci}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : rows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="py-12 text-center text-muted-foreground"
                      >
                        {resolvedEmpty}
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((record, rowIndex) => {
                      const key = String(record[rowKey] || rowIndex);
                      const isSelected = selectedMap.has(key);
                      return (
                        <TableRow
                          key={key}
                          className={cn(
                            "cursor-pointer hover:bg-muted/50",
                            isSelected && "bg-accent/30",
                          )}
                          onClick={() => toggleRow(record)}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleRow(record)}
                              className="size-4 rounded-[4px] border-input cursor-pointer"
                              aria-label={t("browseDialog.selectItem", { defaultValue: "选择此项" })}
                            />
                          </TableCell>
                          {columns.map((col) => {
                            const dataKey = (col.dataIndex || col.key) as keyof T;
                            const cellValue = record[dataKey];
                            const content = col.render
                              ? col.render(cellValue, record, rowIndex)
                              : cellValue != null
                                ? String(cellValue)
                                : "-";
                            return (
                              <TableCell
                                key={col.key}
                                className={alignClass[col.align || "left"]}
                              >
                                {content}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {t("browseDialog.total", {
                  defaultValue: `共 ${total} 条`,
                  count: total,
                })}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  {t("browseDialog.prevPage", { defaultValue: "上一页" })}
                </Button>
                {Array.from(
                  { length: Math.ceil(total / pageSize) },
                  (_, i) => i + 1,
                )
                  .slice(
                    Math.max(0, page - 3),
                    Math.min(Math.ceil(total / pageSize), page + 2),
                  )
                  .map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= Math.ceil(total / pageSize)}
                  onClick={() => setPage((p) => p + 1)}
                >
                  {t("browseDialog.nextPage", { defaultValue: "下一页" })}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleCancel}>
            {t("dialog.closeButton", { defaultValue: "取消" })}
          </Button>
          <Button type="button" disabled={!canConfirm} onClick={handleConfirm}>
            {selectedCount > 0
              ? t("browseDialog.confirmWithCount", {
                  defaultValue: `确定 (${selectedCount})`,
                  count: selectedCount,
                })
              : t("browseDialog.confirm", { defaultValue: "确定" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  TreeNodeItem (internal recursive component)                        */
/* ------------------------------------------------------------------ */

interface TreeNodeItemProps {
  node: BrowseTreeNode;
  depth: number;
  expandedKeys: Set<string | number>;
  activeCategoryId: string | number | undefined;
  onToggleExpand: (id: string | number) => void;
  onSelect: (node: BrowseTreeNode) => void;
}

function TreeNodeItem({
  node,
  depth,
  expandedKeys,
  activeCategoryId,
  onToggleExpand,
  onSelect,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.has(node.id);
  const isActive = activeCategoryId === node.id;

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          onSelect(node);
          if (hasChildren) onToggleExpand(node.id);
        }}
        className={cn(
          "flex w-full items-center gap-1 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted",
          isActive && "bg-accent font-medium",
        )}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDownIcon className="size-3.5 shrink-0 opacity-50" />
          ) : (
            <ChevronRightIcon className="size-3.5 shrink-0 opacity-50" />
          )
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span className="flex-1 truncate">{node.label}</span>
        {node.count != null && (
          <span className="shrink-0 text-xs text-muted-foreground">{node.count}</span>
        )}
      </button>
      {hasChildren && isExpanded && (
        <ul className="space-y-0.5">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={String(child.id)}
              node={child}
              depth={depth + 1}
              expandedKeys={expandedKeys}
              activeCategoryId={activeCategoryId}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export { BrowseDialog };
