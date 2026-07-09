"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

/**
 * @component DiffViewerTable
 * @category business/data
 * @since 0.9.0
 * @description Table-level diff viewer showing row-level and cell-level changes
 * between before/after datasets. Supports unified and side-by-side viewing modes
 * with a summary toolbar showing change counts.
 * @keywords diff, compare, table, changes, audit, before, after, viewer
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Column definition for DiffViewerTable. */
interface DiffColumn<T> {
  /** Column key */
  key: keyof T & string;
  /** Column title */
  title: React.ReactNode;
  /** Column width */
  width?: number | string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Custom cell renderer */
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

/** Status classification for a diff row. */
type DiffRowStatus = "added" | "removed" | "changed" | "unchanged";

/** Props for the DiffViewerTable component. */
interface DiffViewerTableProps<T extends Record<string, unknown>> {
  /** Original dataset */
  before: T[];
  /** Modified dataset */
  after: T[];
  /** Row key for matching */
  rowKey: keyof T & string;
  /** Column definitions */
  columns: DiffColumn<T>[];
  /** View mode: "unified" (single table) or "side-by-side" */
  viewMode?: "unified" | "side-by-side";
  /** Show only changed rows */
  showChangesOnly?: boolean;
  /** Show summary toolbar */
  showSummary?: boolean;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Internal types                                                            */
/* -------------------------------------------------------------------------- */

/** A computed diff row. */
interface DiffRow<T> {
  status: DiffRowStatus;
  beforeRow: T | null;
  afterRow: T | null;
  key: string | number;
  /** Set of column keys that changed (only for "changed" status). */
  changedFields: Set<string>;
}

/* -------------------------------------------------------------------------- */
/*  Diff computation                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Compute the diff between before and after arrays, matching rows by rowKey.
 */
function computeDiff<T extends Record<string, unknown>>(
  before: T[],
  after: T[],
  rowKeyField: string,
  columnKeys: string[],
): DiffRow<T>[] {
  const beforeMap = new Map<string | number, T>();
  const afterMap = new Map<string | number, T>();

  for (const row of before) {
    const key = row[rowKeyField] as string | number;
    beforeMap.set(key, row);
  }
  for (const row of after) {
    const key = row[rowKeyField] as string | number;
    afterMap.set(key, row);
  }

  const result: DiffRow<T>[] = [];
  const processedKeys = new Set<string | number>();

  // Process "after" rows in order (captures added + changed + unchanged)
  for (const row of after) {
    const key = row[rowKeyField] as string | number;
    processedKeys.add(key);

    const beforeRow = beforeMap.get(key);
    if (!beforeRow) {
      // Added
      result.push({
        status: "added",
        beforeRow: null,
        afterRow: row,
        key,
        changedFields: new Set(),
      });
    } else {
      // Check for changes
      const changedFields = new Set<string>();
      for (const colKey of columnKeys) {
        const beforeVal = (beforeRow as Record<string, unknown>)[colKey];
        const afterVal = (row as Record<string, unknown>)[colKey];
        if (beforeVal !== afterVal) {
          changedFields.add(colKey);
        }
      }

      if (changedFields.size > 0) {
        result.push({
          status: "changed",
          beforeRow,
          afterRow: row,
          key,
          changedFields,
        });
      } else {
        result.push({
          status: "unchanged",
          beforeRow,
          afterRow: row,
          key,
          changedFields: new Set(),
        });
      }
    }
  }

  // Process removed rows (in before but not in after)
  for (const row of before) {
    const key = row[rowKeyField] as string | number;
    if (!processedKeys.has(key)) {
      result.push({
        status: "removed",
        beforeRow: row,
        afterRow: null,
        key,
        changedFields: new Set(),
      });
    }
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/*  Status helpers                                                          */
/* -------------------------------------------------------------------------- */

const statusConfig: Record<
  DiffRowStatus,
  {
    label: string;
    variant: "default" | "destructive" | "secondary" | "outline";
  }
> = {
  added: { label: "Added", variant: "default" },
  removed: { label: "Removed", variant: "destructive" },
  changed: { label: "Changed", variant: "secondary" },
  unchanged: { label: "Unchanged", variant: "outline" },
};

const statusRowClass: Record<DiffRowStatus, string> = {
  added: "bg-green-50 dark:bg-green-950/20",
  removed: "bg-red-50 dark:bg-red-950/20",
  changed: "",
  unchanged: "",
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * DiffViewerTable - Table-level diff viewer showing row-level and cell-level
 * changes between before/after datasets. Supports unified (single table) and
 * side-by-side viewing modes with a summary toolbar.
 */
function DiffViewerTable<T extends Record<string, unknown>>({
  before = [],
  after = [],
  rowKey,
  columns = [],
  viewMode = "unified",
  showChangesOnly = false,
  showSummary = false,
  className,
}: DiffViewerTableProps<T>) {
  const columnKeys = React.useMemo(() => columns.map((c) => c.key), [columns]);

  /* ---- compute diff ---- */
  const diffRows = React.useMemo(
    () => computeDiff(before, after, rowKey, columnKeys),
    [before, after, rowKey, columnKeys],
  );

  /* ---- summary counts ---- */
  const counts = React.useMemo(() => {
    const c = { added: 0, removed: 0, changed: 0, unchanged: 0 };
    for (const row of diffRows) {
      c[row.status]++;
    }
    return c;
  }, [diffRows]);

  /* ---- filtered rows ---- */
  const filteredRows = React.useMemo(() => {
    if (showChangesOnly) {
      return diffRows.filter((row) => row.status !== "unchanged");
    }
    return diffRows;
  }, [diffRows, showChangesOnly]);

  /* ---- cell renderer ---- */
  const renderCellValue = (
    col: DiffColumn<T>,
    row: T | null,
  ): React.ReactNode => {
    if (!row) {
      return <span className="text-muted-foreground">{"\u2014"}</span>;
    }
    const value = (row as Record<string, unknown>)[col.key];
    if (col.render) {
      return col.render(value as T[keyof T], row);
    }
    return (value as React.ReactNode) ?? "\u2014";
  };

  /* ---- unified mode cell with before/after for changed cells ---- */
  const renderUnifiedCell = (
    col: DiffColumn<T>,
    diffRow: DiffRow<T>,
  ): React.ReactNode => {
    const displayRow = diffRow.afterRow ?? diffRow.beforeRow;
    const isChangedCell = diffRow.changedFields.has(col.key);

    if (diffRow.status === "removed") {
      const value = diffRow.beforeRow
        ? (diffRow.beforeRow as Record<string, unknown>)[col.key]
        : undefined;
      const content =
        col.render && diffRow.beforeRow
          ? col.render(value as T[keyof T], diffRow.beforeRow)
          : ((value as React.ReactNode) ?? "\u2014");
      return (
        <span className="text-muted-foreground line-through">{content}</span>
      );
    }

    if (isChangedCell && diffRow.beforeRow && diffRow.afterRow) {
      const beforeVal = (diffRow.beforeRow as Record<string, unknown>)[col.key];
      const afterVal = (diffRow.afterRow as Record<string, unknown>)[col.key];
      const beforeContent = col.render
        ? col.render(beforeVal as T[keyof T], diffRow.beforeRow)
        : ((beforeVal as React.ReactNode) ?? "\u2014");
      const afterContent = col.render
        ? col.render(afterVal as T[keyof T], diffRow.afterRow)
        : ((afterVal as React.ReactNode) ?? "\u2014");

      return (
        <div data-slot="diff-cell-changed">
          <span>{afterContent}</span>
          <span className="text-muted-foreground block text-xs line-through">
            {beforeContent}
          </span>
        </div>
      );
    }

    return renderCellValue(col, displayRow);
  };

  /* ---- side-by-side cell renderer ---- */
  const renderSideCell = (
    col: DiffColumn<T>,
    diffRow: DiffRow<T>,
    side: "before" | "after",
  ): React.ReactNode => {
    const row = side === "before" ? diffRow.beforeRow : diffRow.afterRow;
    if (!row) {
      return <span className="text-muted-foreground">{"\u2014"}</span>;
    }
    const value = (row as Record<string, unknown>)[col.key];
    if (col.render) {
      return col.render(value as T[keyof T], row);
    }
    return (value as React.ReactNode) ?? "\u2014";
  };

  /* ---- render a single table (used for both unified and side-by-side) ---- */
  const renderTable = (
    rows: DiffRow<T>[],
    cellRenderer: (col: DiffColumn<T>, diffRow: DiffRow<T>) => React.ReactNode,
    _side?: "before" | "after",
  ) => (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="w-20 px-3 py-2">Status</TableHead>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(
                "px-3 py-2",
                col.align === "center" && "text-center",
                col.align === "right" && "text-right",
              )}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + 1}
              className="text-muted-foreground py-12 text-center"
            >
              No differences found
            </TableCell>
          </TableRow>
        ) : (
          rows.map((diffRow) => {
            return (
              <TableRow
                key={`${diffRow.status}-${diffRow.key}`}
                data-status={diffRow.status}
                className={cn(statusRowClass[diffRow.status])}
              >
                <TableCell className="px-3 py-2">
                  <Badge
                    variant={statusConfig[diffRow.status].variant}
                    className="text-[10px]"
                  >
                    {statusConfig[diffRow.status].label}
                  </Badge>
                </TableCell>
                {columns.map((col) => {
                  const isChangedCell = diffRow.changedFields.has(col.key);

                  return (
                    <TableCell
                      key={col.key}
                      className={cn(
                        "px-3 py-2",
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right",
                        isChangedCell &&
                          diffRow.status === "changed" &&
                          "bg-yellow-50 dark:bg-yellow-950/20",
                      )}
                      style={col.width ? { width: col.width } : undefined}
                    >
                      {cellRenderer(col, diffRow)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );

  /* ---- render ---- */
  return (
    <div
      data-slot="diff-viewer-table"
      className={cn(
        "border-border overflow-x-auto rounded-lg border",
        className,
      )}
    >
      {/* Summary toolbar */}
      {showSummary && (
        <div
          data-slot="diff-viewer-summary"
          className="border-border bg-muted/30 flex flex-wrap items-center gap-3 border-b px-3 py-2"
        >
          <span className="text-foreground mr-2 text-sm font-medium">
            Summary
          </span>
          <Badge variant="default" className="text-xs">
            {counts.added} Added
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {counts.removed} Removed
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {counts.changed} Changed
          </Badge>
          <Badge variant="outline" className="text-xs">
            {counts.unchanged} Unchanged
          </Badge>
          <span className="text-muted-foreground ml-auto text-xs">
            {filteredRows.length} of {diffRows.length} rows shown
          </span>
        </div>
      )}

      {/* Table(s) */}
      {viewMode === "unified" ? (
        renderTable(filteredRows, renderUnifiedCell)
      ) : (
        <div
          data-slot="diff-side-by-side"
          className="divide-border grid grid-cols-2 divide-x"
        >
          <div data-slot="diff-side-before">
            <div className="border-border bg-muted/20 text-muted-foreground border-b px-3 py-1.5 text-xs font-medium">
              Before
            </div>
            {renderTable(
              filteredRows,
              (col, diffRow) => renderSideCell(col, diffRow, "before"),
              "before",
            )}
          </div>
          <div data-slot="diff-side-after">
            <div className="border-border bg-muted/20 text-muted-foreground border-b px-3 py-1.5 text-xs font-medium">
              After
            </div>
            {renderTable(
              filteredRows,
              (col, diffRow) => renderSideCell(col, diffRow, "after"),
              "after",
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { DiffViewerTable };
export type { DiffViewerTableProps, DiffColumn, DiffRowStatus };
