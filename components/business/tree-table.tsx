"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type SortingState,
  type ColumnDef as TanstackColumnDef,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { arrayToTree, type TreeNode } from "@/lib/tree";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@/components/ui/icons";
import { Spinner } from "@/components/ui/spinner";

/**
 * @component TreeTable
 * @category business/data
 * @since 0.3.0
 * @description A table with hierarchical tree structure. Rows can be
 * expanded/collapsed to reveal child rows. Supports nested or flat data,
 * lazy loading, row selection with parent-child linkage, and column sorting.
 * @keywords table, tree, hierarchy, expand, collapse, bom, org-chart
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Column definition for TreeTable. */
interface TreeTableColumn<T> {
  /** Column key */
  key: string;
  /** Column title */
  title: React.ReactNode;
  /** Column width */
  width?: number | string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Custom cell renderer */
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  /** Fixed column position */
  fixed?: "left" | "right";
  /** Enable sorting */
  sortable?: boolean;
  /** Minimum indent depth for tree column (default: 0) */
  treeMinIndent?: boolean;
}

/** Props for the TreeTable component. */
interface TreeTableProps<T extends Record<string, unknown>> {
  /** Column definitions */
  columns: TreeTableColumn<T>[];
  /** Data source - can be nested (with children field) or flat (with parentId) */
  data: T[];
  /** Row key field */
  rowKey?: keyof T & string;
  /** Children field name for nested data (default: "children") */
  childrenKey?: string;
  /** Parent ID field for flat data (used with rowKey) */
  parentKey?: string;
  /** Loading state */
  loading?: boolean;
  /** Empty text */
  emptyText?: string;
  /** Table size */
  size?: "sm" | "md" | "lg";
  /** Enable row selection */
  selectable?: "single" | "multiple" | "none";
  /** Selected row keys */
  selectedKeys?: (string | number)[];
  /** Selection change handler */
  onSelectionChange?: (keys: (string | number)[]) => void;
  /** Initially expanded row keys */
  defaultExpandedKeys?: (string | number)[];
  /** Controlled expanded keys */
  expandedKeys?: (string | number)[];
  /** Expanded keys change handler */
  onExpandedChange?: (keys: (string | number)[]) => void;
  /** Lazy load children callback -- return a Promise with children rows */
  onExpandRow?: (row: T) => Promise<T[]>;
  /** Table caption */
  caption?: string;
  /** Enable stripe rows */
  striped?: boolean;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Internal types                                                            */
/* -------------------------------------------------------------------------- */

/** A flattened row used for rendering. */
interface FlatRow<T> {
  row: T;
  key: string | number;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  isLeaf: boolean;
  ancestors: (string | number)[];
  childKeys: (string | number)[];
}

/* -------------------------------------------------------------------------- */
/*  Tiny checkbox that supports indeterminate via native DOM property         */
/* -------------------------------------------------------------------------- */

function TreeCheckbox({
  checked,
  indeterminate,
  onChange,
  className,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      data-slot="tree-table-checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={cn(
        "border-input accent-primary size-4 shrink-0 cursor-pointer rounded border",
        className,
      )}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Pure helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Flatten a tree into a render-ready list, respecting expansion state.
 * Only rows whose ancestors are ALL expanded will appear.
 */
function flattenTree<T extends Record<string, unknown>>(
  tree: T[],
  rowKeyField: string,
  childrenField: string,
  expanded: Set<string | number>,
  depth = 0,
  ancestors: (string | number)[] = [],
): FlatRow<T>[] {
  const result: FlatRow<T>[] = [];

  for (const node of tree) {
    const key = (node as Record<string, unknown>)[rowKeyField] as
      string | number;
    const children = (node as Record<string, unknown>)[childrenField] as
      T[] | undefined;
    const hasChildren = Array.isArray(children) && children.length > 0;
    const isExpanded = expanded.has(key);
    const childKeys = hasChildren
      ? children.map(
          (c) => (c as Record<string, unknown>)[rowKeyField] as string | number,
        )
      : [];

    result.push({
      row: node,
      key,
      depth,
      hasChildren,
      isExpanded,
      isLeaf: !hasChildren,
      ancestors: [...ancestors],
      childKeys,
    });

    if (hasChildren && isExpanded) {
      result.push(
        ...flattenTree(
          children,
          rowKeyField,
          childrenField,
          expanded,
          depth + 1,
          [...ancestors, key],
        ),
      );
    }
  }

  return result;
}

/** Collect ALL descendant keys recursively (ignoring expansion). */
function getAllDescendantKeys<T extends Record<string, unknown>>(
  node: T,
  rowKeyField: string,
  childrenField: string,
): (string | number)[] {
  const children = (node as Record<string, unknown>)[childrenField] as
    T[] | undefined;
  if (!Array.isArray(children) || children.length === 0) return [];

  const keys: (string | number)[] = [];
  for (const child of children) {
    const childKey = (child as Record<string, unknown>)[rowKeyField] as
      string | number;
    keys.push(childKey);
    keys.push(...getAllDescendantKeys(child, rowKeyField, childrenField));
  }
  return keys;
}

/** Count visible (expanded-path) descendants of a node. */
function countVisibleDescendants<T extends Record<string, unknown>>(
  node: T,
  rowKeyField: string,
  childrenField: string,
  expanded: Set<string | number>,
): number {
  const children = (node as Record<string, unknown>)[childrenField] as
    T[] | undefined;
  if (!Array.isArray(children) || children.length === 0) return 0;

  const key = (node as Record<string, unknown>)[rowKeyField] as string | number;
  if (!expanded.has(key)) return 0;

  let count = children.length;
  for (const child of children) {
    count += countVisibleDescendants(
      child,
      rowKeyField,
      childrenField,
      expanded,
    );
  }
  return count;
}

/** Find a node in the tree by key. */
function findNodeByKey<T extends Record<string, unknown>>(
  tree: T[],
  key: string | number,
  rowKeyField: string,
  childrenField: string,
): T | undefined {
  for (const node of tree) {
    const nodeKey = (node as Record<string, unknown>)[rowKeyField] as
      string | number;
    if (nodeKey === key) return node;
    const children = (node as Record<string, unknown>)[childrenField] as
      T[] | undefined;
    if (Array.isArray(children) && children.length > 0) {
      const found = findNodeByKey(children, key, rowKeyField, childrenField);
      if (found) return found;
    }
  }
  return undefined;
}

/** Return a new tree with the target node children replaced. */
function replaceNodeChildren<T extends Record<string, unknown>>(
  tree: T[],
  targetKey: string | number,
  newChildren: T[],
  rowKeyField: string,
  childrenField: string,
): T[] {
  return tree.map((node) => {
    const nodeKey = (node as Record<string, unknown>)[rowKeyField] as
      string | number;
    if (nodeKey === targetKey) {
      return { ...node, [childrenField]: newChildren } as T;
    }
    const children = (node as Record<string, unknown>)[childrenField] as
      T[] | undefined;
    if (Array.isArray(children) && children.length > 0) {
      return {
        ...node,
        [childrenField]: replaceNodeChildren(
          children,
          targetKey,
          newChildren,
          rowKeyField,
          childrenField,
        ),
      } as T;
    }
    return node;
  });
}

/** Sort tree nodes recursively, applying comparator at each level. */
function sortTree<T extends Record<string, unknown>>(
  nodes: T[],
  sortKey: string,
  sortDir: "asc" | "desc",
  childrenField: string,
): T[] {
  const sorted = [...nodes].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortKey];
    const bVal = (b as Record<string, unknown>)[sortKey];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    let cmp = 0;
    if (typeof aVal === "number" && typeof bVal === "number") {
      cmp = aVal - bVal;
    } else {
      cmp = String(aVal).localeCompare(String(bVal));
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  return sorted.map((node) => {
    const children = (node as Record<string, unknown>)[childrenField] as
      T[] | undefined;
    if (Array.isArray(children) && children.length > 0) {
      return {
        ...node,
        [childrenField]: sortTree(children, sortKey, sortDir, childrenField),
      } as T;
    }
    return node;
  });
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function TreeTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = "id" as keyof T & string,
  childrenKey = "children",
  parentKey,
  loading = false,
  emptyText = "No data",
  size = "md",
  selectable = "none",
  selectedKeys: controlledSelectedKeys,
  onSelectionChange,
  defaultExpandedKeys,
  expandedKeys: controlledExpandedKeys,
  onExpandedChange,
  onExpandRow,
  caption,
  striped = false,
  className,
}: TreeTableProps<T>) {
  /* ---- build tree from props data ---- */
  const tree = React.useMemo(() => {
    if (parentKey) {
      return arrayToTree(data as unknown as TreeNode[], {
        idKey: rowKey,
        parentKey,
        childrenKey,
      });
    }
    return data;
  }, [data, parentKey, rowKey, childrenKey]);

  /* ---- mutable tree state (for lazy-loaded children) ---- */
  const [treeData, setTreeData] = React.useState<T[]>(tree as T[]);
  React.useEffect(() => {
    setTreeData(tree as T[]);
  }, [tree]);

  /* ---- expanded state ---- */
  const [internalExpanded, setInternalExpanded] = React.useState<
    Set<string | number>
  >(() => new Set(defaultExpandedKeys ?? []));
  const expandedSet = React.useMemo(() => {
    if (controlledExpandedKeys) return new Set(controlledExpandedKeys);
    return internalExpanded;
  }, [controlledExpandedKeys, internalExpanded]);

  const updateExpanded = React.useCallback(
    (next: Set<string | number>) => {
      if (!controlledExpandedKeys) {
        setInternalExpanded(next);
      }
      onExpandedChange?.(Array.from(next));
    },
    [controlledExpandedKeys, onExpandedChange],
  );

  /* ---- loading keys for lazy-load ---- */
  const [loadingKeys, setLoadingKeys] = React.useState<Set<string | number>>(
    new Set(),
  );
  const loadedKeysRef = React.useRef<Set<string | number>>(new Set());

  /* ---- sort state (manual -- we sort the tree ourselves) ---- */
  const [sorting, setSorting] = React.useState<SortingState>([]);

  /* ---- sort the tree ---- */
  const sortedTree = React.useMemo(() => {
    if (sorting.length === 0) return treeData;
    const { id: sortKey, desc } = sorting[0]!;
    return sortTree(treeData, sortKey, desc ? "desc" : "asc", childrenKey);
  }, [treeData, sorting, childrenKey]);

  /* ---- flatten for rendering ---- */
  const flatRows = React.useMemo(
    () => flattenTree(sortedTree, rowKey, childrenKey, expandedSet),
    [sortedTree, rowKey, childrenKey, expandedSet],
  );

  /* ---- selection helpers ---- */
  const selectedSet = React.useMemo(
    () => new Set(controlledSelectedKeys ?? []),
    [controlledSelectedKeys],
  );

  /** Build the flatRows list enriched with check state for selection logic. */
  const flatRowsWithCheck = React.useMemo(() => {
    if (selectable !== "multiple") return null;
    return flatRows.map((fr) => {
      const node = findNodeByKey(sortedTree, fr.key, rowKey, childrenKey);
      const allDescendants = node
        ? getAllDescendantKeys(node, rowKey, childrenKey)
        : [];
      const visibleCount = node
        ? countVisibleDescendants(node, rowKey, childrenKey, expandedSet)
        : 0;
      const checkedDescendantCount = allDescendants.filter((k) =>
        selectedSet.has(k),
      ).length;
      const isAllChecked =
        visibleCount > 0 && checkedDescendantCount === visibleCount;
      const isIndeterminate =
        checkedDescendantCount > 0 && checkedDescendantCount < visibleCount;
      return { ...fr, allDescendants, isAllChecked, isIndeterminate };
    });
  }, [
    flatRows,
    selectable,
    selectedSet,
    sortedTree,
    rowKey,
    childrenKey,
    expandedSet,
  ]);

  /* ---- tanstack table (header rendering + sort UI) ---- */
  const tanstackColumns = React.useMemo<TanstackColumnDef<T, unknown>[]>(
    () =>
      columns.map((col) => ({
        id: col.key,
        accessorKey: col.key,
        header: col.title as string,
        enableSorting: !!col.sortable,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic cell typing workaround
        cell: (info: any) => {
          const value = info.getValue();
          const original = info.row.original as T;
          const index = info.row.index as number;
          return col.render
            ? col.render(value as T[keyof T], original, index)
            : ((value as React.ReactNode) ?? "—");
        },
      })),
    [columns],
  );

  const table = useReactTable<T>({
    data: sortedTree,
    columns: tanstackColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    manualSorting: true,
  });

  /* ---- size padding ---- */
  const sizePadding =
    size === "sm" ? "px-2 py-1.5" : size === "lg" ? "px-4 py-3" : "px-3 py-2";

  /* ---- selection column flag ---- */
  const hasSelection = selectable === "single" || selectable === "multiple";
  const totalColumns = columns.length + (hasSelection ? 1 : 0);

  /* ---- expand / collapse handler ---- */
  const handleToggleExpand = React.useCallback(
    async (key: string | number, rowData: T) => {
      const isLazy = !!onExpandRow;
      const children = (rowData as Record<string, unknown>)[childrenKey] as
        T[] | undefined;
      const hasNoChildren = !Array.isArray(children) || children.length === 0;
      const needsLoad =
        isLazy && hasNoChildren && !loadedKeysRef.current.has(key);

      if (needsLoad && onExpandRow) {
        setLoadingKeys((prev) => new Set(prev).add(key));
        try {
          const loaded = await onExpandRow(rowData);
          loadedKeysRef.current.add(key);
          setTreeData((prev) =>
            replaceNodeChildren(prev, key, loaded, rowKey, childrenKey),
          );
          const next = new Set(expandedSet);
          next.add(key);
          updateExpanded(next);
        } finally {
          setLoadingKeys((prev) => {
            const s = new Set(prev);
            s.delete(key);
            return s;
          });
        }
      } else {
        const next = new Set(expandedSet);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        updateExpanded(next);
      }
    },
    [onExpandRow, childrenKey, rowKey, expandedSet, updateExpanded],
  );

  /* ---- selection handler ---- */
  const handleSelect = React.useCallback(
    (key: string | number, _rowData: T) => {
      if (selectable === "none") return;

      if (selectable === "single") {
        const next = selectedSet.has(key) ? [] : [key];
        onSelectionChange?.(next);
        return;
      }

      // Multiple selection with parent-child linkage
      const node = findNodeByKey(sortedTree, key, rowKey, childrenKey);
      const allDescendants = node
        ? getAllDescendantKeys(node, rowKey, childrenKey)
        : [];
      const isCurrentlyChecked = selectedSet.has(key);

      if (isCurrentlyChecked) {
        // Uncheck this node and all descendants
        const toRemove = new Set([key, ...allDescendants]);
        const next = Array.from(selectedSet).filter((k) => !toRemove.has(k));
        onSelectionChange?.(next);
      } else {
        // Check this node and all descendants
        const next = new Set(selectedSet);
        next.add(key);
        for (const d of allDescendants) next.add(d);
        onSelectionChange?.(Array.from(next));
      }
    },
    [
      selectable,
      selectedSet,
      onSelectionChange,
      sortedTree,
      rowKey,
      childrenKey,
    ],
  );

  /* ---- header sort click ---- */
  const handleHeaderSortClick = React.useCallback((colKey: string) => {
    setSorting((prev) => {
      const current = prev.find((s) => s.id === colKey);
      if (!current) return [{ id: colKey, desc: false }];
      if (!current.desc) return [{ id: colKey, desc: true }];
      return [];
    });
  }, []);

  /* ---- render ---- */
  return (
    <div
      data-slot="tree-table"
      className={cn(
        "border-border overflow-x-auto rounded-lg border",
        className,
      )}
    >
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/30">
              {hasSelection && (
                <TableHead className={cn("w-10", sizePadding)} />
              )}
              {headerGroup.headers.map((header) => {
                const col = columns.find((c) => c.key === header.id);
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      sizePadding,
                      col?.align === "center" && "text-center",
                      col?.align === "right" && "text-right",
                      canSort && "cursor-pointer select-none",
                      col?.fixed && "sticky z-[2] bg-inherit",
                      col?.fixed === "left" && "left-0",
                      col?.fixed === "right" && "right-0",
                    )}
                    style={col?.width ? { width: col.width } : undefined}
                    onClick={
                      canSort
                        ? () => handleHeaderSortClick(header.id)
                        : undefined
                    }
                  >
                    <span className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {canSort &&
                        (sorted === "asc" ? (
                          <ArrowUpIcon className="size-3" />
                        ) : sorted === "desc" ? (
                          <ArrowDownIcon className="size-3" />
                        ) : (
                          <ArrowUpDownIcon className="size-3 opacity-40" />
                        ))}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            /* ---- loading skeleton ---- */
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {hasSelection && (
                  <TableCell className={sizePadding}>
                    <Skeleton className="size-4" />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key} className={sizePadding}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : flatRows.length === 0 ? (
            /* ---- empty state ---- */
            <TableRow>
              <TableCell
                colSpan={totalColumns}
                className="text-muted-foreground py-12 text-center"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            /* ---- data rows ---- */
            (flatRowsWithCheck ?? flatRows).map((fr, idx) => {
              const isLoading = loadingKeys.has(fr.key);
              const isSelected = selectedSet.has(fr.key);

              // Check state for multiple selection
              const checkInfo = flatRowsWithCheck
                ? (flatRowsWithCheck[idx] as FlatRow<T> & {
                    allDescendants: (string | number)[];
                    isAllChecked: boolean;
                    isIndeterminate: boolean;
                  })
                : null;

              return (
                <TableRow
                  key={fr.key}
                  data-depth={fr.depth}
                  data-selected={isSelected || undefined}
                  className={cn(
                    striped && idx % 2 === 1 && "bg-muted/20",
                    isSelected && "bg-muted",
                  )}
                >
                  {/* Selection checkbox / radio */}
                  {hasSelection && (
                    <TableCell className={cn(sizePadding, "w-10")}>
                      {selectable === "multiple" ? (
                        <TreeCheckbox
                          checked={isSelected}
                          indeterminate={checkInfo?.isIndeterminate ?? false}
                          onChange={() => handleSelect(fr.key, fr.row)}
                        />
                      ) : (
                        <input
                          type="radio"
                          name="tree-table-selection"
                          data-slot="tree-table-radio"
                          checked={isSelected}
                          onChange={() => handleSelect(fr.key, fr.row)}
                          className="accent-primary size-4 shrink-0 cursor-pointer"
                        />
                      )}
                    </TableCell>
                  )}

                  {/* Data cells */}
                  {columns.map((col, colIdx) => {
                    const value = (fr.row as Record<string, unknown>)[col.key];
                    const cellContent = col.render
                      ? col.render(value as T[keyof T], fr.row, idx)
                      : ((value as React.ReactNode) ?? "—");

                    return (
                      <TableCell
                        key={col.key}
                        className={cn(
                          sizePadding,
                          col.align === "center" && "text-center",
                          col.align === "right" && "text-right",
                          col.fixed && "sticky z-[2] bg-inherit",
                          col.fixed === "left" && "left-0",
                          col.fixed === "right" && "right-0",
                        )}
                        style={col.width ? { width: col.width } : undefined}
                      >
                        {colIdx === 0 ? (
                          <span className="flex items-center gap-1">
                            <span
                              style={{
                                paddingLeft: fr.depth * 24,
                              }}
                              className="inline-flex shrink-0"
                            />
                            {(fr.hasChildren ||
                              (!!onExpandRow && !fr.hasChildren)) && (
                              <button
                                type="button"
                                data-slot="tree-table-expand"
                                onClick={() =>
                                  handleToggleExpand(fr.key, fr.row)
                                }
                                className="hover:bg-muted inline-flex size-5 shrink-0 items-center justify-center rounded"
                                aria-label={
                                  fr.isExpanded ? "Collapse" : "Expand"
                                }
                              >
                                {isLoading ? (
                                  <Spinner
                                    size="sm"
                                    color="muted"
                                    label="Loading"
                                  />
                                ) : fr.isExpanded ? (
                                  <ChevronDownIcon className="size-4" />
                                ) : (
                                  <ChevronRightIcon className="size-4" />
                                )}
                              </button>
                            )}
                            {!fr.hasChildren && !onExpandRow && (
                              <span className="inline-flex size-5 shrink-0" />
                            )}
                            <span className="min-w-0">{cellContent}</span>
                          </span>
                        ) : (
                          cellContent
                        )}
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
  );
}

export { TreeTable };
export type { TreeTableColumn, TreeTableProps };
