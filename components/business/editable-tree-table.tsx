"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { arrayToTree, type TreeNode } from "@/lib/tree";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component EditableTreeTable
 * @category business/data
 * @since 0.9.0
 * @description A tree-structured table where cells can be edited inline.
 * Supports text, number, and select editors with validation, dirty tracking,
 * and a save/cancel toolbar. Essential for BOM editing, chart of accounts
 * maintenance, and similar hierarchical data editing scenarios.
 * @keywords table, tree, editable, inline-edit, bom, spreadsheet, hierarchy
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Column definition for EditableTreeTable. */
interface EditableTreeTableColumn<T> {
  /** Column key */
  key: string;
  /** Column title */
  title: React.ReactNode;
  /** Column width */
  width?: number | string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Custom cell renderer (used for display mode) */
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  /** Enable inline editing for this column */
  editable?: boolean | ((row: T) => boolean);
  /** Editor type for inline editing */
  editorType?: "text" | "number" | "select";
  /** Options for select editor */
  editorOptions?: Array<{ label: string; value: string | number }>;
  /** Validation function - return error message or null */
  validate?: (value: unknown, row: T) => string | null;
  /** Fixed column position */
  fixed?: "left" | "right";
  /** Enable sorting */
  sortable?: boolean;
}

/** Props for the EditableTreeTable component. */
interface EditableTreeTableProps<T extends Record<string, unknown>> {
  /** Column definitions */
  columns: EditableTreeTableColumn<T>[];
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
  /** Empty state text */
  emptyText?: string;
  /** Table size */
  size?: "sm" | "md" | "lg";
  /** Expanded keys (controlled) */
  expandedKeys?: (string | number)[];
  /** Default expanded keys (uncontrolled) */
  defaultExpandedKeys?: (string | number)[];
  /** Called when data changes (dirty rows) */
  onChange?: (data: T[], dirtyRows: T[]) => void;
  /** Called to save all changes */
  onSave?: (data: T[], dirtyRows: T[]) => void | Promise<void>;
  /** Called to discard changes */
  onCancel?: () => void;
  /** Show save/cancel toolbar */
  showToolbar?: boolean;
  /** Whether in edit mode (controlled). When false, renders read-only. */
  editMode?: boolean;
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
}

/** Currently editing cell identifier. */
interface EditingCell {
  rowKey: string | number;
  columnKey: string;
}

/* -------------------------------------------------------------------------- */
/*  Pure helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Flatten a tree into a render-ready list, respecting expansion state.
 */
function flattenTree<T extends Record<string, unknown>>(
  tree: T[],
  rowKeyField: string,
  childrenField: string,
  expanded: Set<string | number>,
  depth = 0,
): FlatRow<T>[] {
  const result: FlatRow<T>[] = [];

  for (const node of tree) {
    const key = (node as Record<string, unknown>)[rowKeyField] as
      string | number;
    const children = (node as Record<string, unknown>)[childrenField] as
      T[] | undefined;
    const hasChildren = Array.isArray(children) && children.length > 0;
    const isExpanded = expanded.has(key);

    result.push({ row: node, key, depth, hasChildren, isExpanded });

    if (hasChildren && isExpanded) {
      result.push(
        ...flattenTree(
          children,
          rowKeyField,
          childrenField,
          expanded,
          depth + 1,
        ),
      );
    }
  }

  return result;
}

/**
 * Apply a map of changes to a data array, returning a new array.
 */
function applyChanges<T extends Record<string, unknown>>(
  data: T[],
  rowKeyField: string,
  childrenField: string,
  changes: Map<string, Map<string, unknown>>,
): T[] {
  return data.map((node) => {
    const key = String((node as Record<string, unknown>)[rowKeyField]);
    const children = (node as Record<string, unknown>)[childrenField] as
      T[] | undefined;
    let updated = node;

    const rowChanges = changes.get(key);
    if (rowChanges && rowChanges.size > 0) {
      updated = { ...node } as unknown as T;
      for (const [field, value] of rowChanges.entries()) {
        (updated as Record<string, unknown>)[field] = value;
      }
      updated = updated as T;
    }

    if (Array.isArray(children) && children.length > 0) {
      const updatedChildren = applyChanges(
        children,
        rowKeyField,
        childrenField,
        changes,
      );
      if (updated === node) {
        updated = { ...node } as T;
      }
      (updated as Record<string, unknown>)[childrenField] = updatedChildren;
    }

    return updated;
  });
}

/**
 * Compute which rows have changes.
 */
function computeDirtyRows<T extends Record<string, unknown>>(
  data: T[],
  rowKeyField: string,
  childrenField: string,
  changes: Map<string, Map<string, unknown>>,
): T[] {
  const dirty: T[] = [];

  function walk(nodes: T[]) {
    for (const node of nodes) {
      const key = String((node as Record<string, unknown>)[rowKeyField]);
      if (changes.has(key) && changes.get(key)!.size > 0) {
        dirty.push(node);
      }
      const children = (node as Record<string, unknown>)[childrenField] as
        T[] | undefined;
      if (Array.isArray(children) && children.length > 0) {
        walk(children);
      }
    }
  }

  walk(data);
  return dirty;
}

/* -------------------------------------------------------------------------- */
/*  Inline editor components                                                  */
/* -------------------------------------------------------------------------- */

function TextEditor({
  value,
  onChange,
  onCommit,
  onCancel,
}: {
  value: string;
  onChange: (v: string) => void;
  onCommit: () => void;
  onCancel: () => void;
}) {
  return (
    <Input
      data-slot="editable-cell-input"
      type="text"
      value={value}
      autoFocus
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      }}
      className="h-7 text-sm"
    />
  );
}

function NumberEditor({
  value,
  onChange,
  onCommit,
  onCancel,
}: {
  value: number | string;
  onChange: (v: number | string) => void;
  onCommit: () => void;
  onCancel: () => void;
}) {
  return (
    <Input
      data-slot="editable-cell-input"
      type="number"
      value={value}
      autoFocus
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      }}
      className="h-7 text-sm"
    />
  );
}

function SelectEditor({
  value,
  onChange,
  onCommit,
  onCancel,
  options,
}: {
  value: string | number;
  onChange: (v: string) => void;
  onCommit: () => void;
  onCancel: () => void;
  options: Array<{ label: string; value: string | number }>;
}) {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  // native-select-exception: tree table cell editor density
  return (
    <select
      ref={selectRef}
      data-slot="editable-cell-select"
      value={String(value)}
      onChange={(e) => {
        onChange(e.target.value);
        onCommit();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      }}
      className="border-input bg-background focus:ring-ring h-7 rounded border px-1 text-sm focus:ring-1 focus:outline-none"
    >
      {options.map((opt) => (
        <option key={String(opt.value)} value={String(opt.value)}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * EditableTreeTable - A tree-structured table with inline cell editing.
 * Each column can declare itself as editable with a specific editor type
 * (text, number, select). Tracks dirty state, validates changes, and
 * provides a save/cancel toolbar when in edit mode.
 */
function EditableTreeTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = "id" as keyof T & string,
  childrenKey = "children",
  parentKey,
  loading = false,
  emptyText = "No data",
  size = "md",
  expandedKeys: controlledExpandedKeys,
  defaultExpandedKeys,
  onChange,
  onSave,
  onCancel,
  showToolbar = false,
  editMode = true,
  className,
}: EditableTreeTableProps<T>) {
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

  /* ---- expanded state ---- */
  const [internalExpanded, setInternalExpanded] = React.useState<
    Set<string | number>
  >(() => new Set(defaultExpandedKeys ?? []));

  const expandedSet = React.useMemo(() => {
    if (controlledExpandedKeys) return new Set(controlledExpandedKeys);
    return internalExpanded;
  }, [controlledExpandedKeys, internalExpanded]);

  /* ---- flatten for rendering ---- */
  const flatRows = React.useMemo(
    () => flattenTree(tree as TreeNode[], rowKey, childrenKey, expandedSet),
    [tree, rowKey, childrenKey, expandedSet],
  );

  /* ---- editing state ---- */
  const [editing, setEditing] = React.useState<EditingCell | null>(null);
  const [editValue, setEditValue] = React.useState<unknown>("");
  const [editError, setEditError] = React.useState<string | null>(null);

  /* ---- changes tracking: Map<rowKey, Map<colKey, newValue>> ---- */
  const [changes, setChanges] = React.useState<
    Map<string, Map<string, unknown>>
  >(new Map());

  /** Compute the effective value for a cell (considering pending changes). */
  const getCellValue = React.useCallback(
    (rowKeyValue: string | number, colKey: string, row: T): unknown => {
      const rowChanges = changes.get(String(rowKeyValue));
      if (rowChanges?.has(colKey)) {
        return rowChanges.get(colKey);
      }
      return (row as Record<string, unknown>)[colKey];
    },
    [changes],
  );

  /** Check if a specific cell has been modified. */
  const isCellDirty = React.useCallback(
    (rowKeyValue: string | number, colKey: string): boolean => {
      return changes.get(String(rowKeyValue))?.has(colKey) ?? false;
    },
    [changes],
  );

  /** Compute dirty rows from current changes. */
  const dirtyRows = React.useMemo(
    () => computeDirtyRows(data, rowKey, childrenKey, changes),
    [data, rowKey, childrenKey, changes],
  );

  /** Total number of dirty rows. */
  const dirtyCount = dirtyRows.length;

  /** Check if a column is editable for a given row. */
  const isColumnEditable = React.useCallback(
    (col: EditableTreeTableColumn<T>, row: T): boolean => {
      if (!editMode) return false;
      if (!col.editable) return false;
      if (typeof col.editable === "function") return col.editable(row);
      return true;
    },
    [editMode],
  );

  /** Start editing a cell. */
  const startEditing = React.useCallback(
    (rowKeyValue: string | number, col: EditableTreeTableColumn<T>, row: T) => {
      if (!isColumnEditable(col, row)) return;

      const currentValue = getCellValue(rowKeyValue, col.key, row);
      setEditing({ rowKey: rowKeyValue, columnKey: col.key });
      setEditValue(currentValue ?? "");
      setEditError(null);
    },
    [isColumnEditable, getCellValue],
  );

  /** Notify parent of changes. */
  const notifyChange = React.useCallback(
    (nextChanges: Map<string, Map<string, unknown>>) => {
      if (!onChange) return;
      const newData = applyChanges(data, rowKey, childrenKey, nextChanges);
      const dirty = computeDirtyRows(data, rowKey, childrenKey, nextChanges);
      onChange(newData, dirty);
    },
    [onChange, data, rowKey, childrenKey],
  );

  /** Commit the current edit. */
  const commitEdit = React.useCallback(() => {
    if (!editing) return;

    const { rowKey: rk, columnKey: ck } = editing;
    const col = columns.find((c) => c.key === ck);
    const flatRow = flatRows.find((fr) => fr.key === rk);

    if (!col || !flatRow) {
      setEditing(null);
      return;
    }

    // Run validation
    if (col.validate) {
      const error = col.validate(editValue, flatRow.row as unknown as T);
      if (error) {
        setEditError(error);
        return;
      }
    }

    const originalValue = (flatRow.row as Record<string, unknown>)[ck];
    const stringValue = String(rk);

    setChanges((prev) => {
      const next = new Map(prev);
      const rowMap = new Map(next.get(stringValue) ?? []);

      // If value equals original, remove the change record
      if (editValue === originalValue) {
        rowMap.delete(ck);
        if (rowMap.size === 0) {
          next.delete(stringValue);
        } else {
          next.set(stringValue, rowMap);
        }
      } else {
        rowMap.set(ck, editValue);
        next.set(stringValue, rowMap);
      }

      // Notify parent of changes
      notifyChange(next);

      return next;
    });

    setEditing(null);
    setEditError(null);
  }, [editing, columns, flatRows, editValue, notifyChange]);

  /** Cancel the current edit. */
  const cancelEdit = React.useCallback(() => {
    setEditing(null);
    setEditError(null);
  }, []);

  /** Save all changes. */
  const handleSave = React.useCallback(async () => {
    const newData = applyChanges(data, rowKey, childrenKey, changes);
    const dirty = computeDirtyRows(data, rowKey, childrenKey, changes);
    await onSave?.(newData, dirty);
    setChanges(new Map());
  }, [changes, data, rowKey, childrenKey, onSave]);

  /** Cancel all edits. */
  const handleCancel = React.useCallback(() => {
    setChanges(new Map());
    setEditing(null);
    setEditError(null);
    onCancel?.();
  }, [onCancel]);

  /** Toggle expand/collapse. */
  const handleToggleExpand = React.useCallback((key: string | number) => {
    setInternalExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  /* ---- size padding ---- */
  const sizePadding =
    size === "sm" ? "px-2 py-1.5" : size === "lg" ? "px-4 py-3" : "px-3 py-2";

  /* ---- render editor for a cell ---- */
  const renderEditor = (
    col: EditableTreeTableColumn<T>,
    row: T,
    rowKeyValue: string | number,
  ) => {
    const isEditing =
      editing?.rowKey === rowKeyValue && editing?.columnKey === col.key;
    const cellValue = getCellValue(rowKeyValue, col.key, row);
    const dirty = isCellDirty(rowKeyValue, col.key);

    if (!isEditing) {
      // Display mode
      const displayContent = col.render
        ? col.render(
            cellValue as T[keyof T],
            row,
            flatRows.findIndex((fr) => fr.key === rowKeyValue),
          )
        : ((cellValue as React.ReactNode) ?? "\u2014");

      return (
        <div
          data-slot="editable-cell-display"
          data-dirty={dirty || undefined}
          className={cn(
            "group/cell relative min-h-[1.5rem] rounded px-1 py-0.5 transition-colors",
            isColumnEditable(col, row) && "hover:bg-muted/50 cursor-pointer",
            dirty && "bg-warning/10",
          )}
          onClick={() => startEditing(rowKeyValue, col, row)}
          role={isColumnEditable(col, row) ? "button" : undefined}
          tabIndex={isColumnEditable(col, row) ? 0 : undefined}
          onKeyDown={(e) => {
            if (
              isColumnEditable(col, row) &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              startEditing(rowKeyValue, col, row);
            }
          }}
        >
          {displayContent}
          {isColumnEditable(col, row) && !dirty && (
            <PencilIcon className="text-muted-foreground absolute top-0.5 right-0.5 size-3 opacity-0 transition-opacity group-hover/cell:opacity-100" />
          )}
        </div>
      );
    }

    // Edit mode
    const editorType = col.editorType ?? "text";

    return (
      <div data-slot="editable-cell-editor">
        {editorType === "text" && (
          <TextEditor
            value={String(editValue ?? "")}
            onChange={(v) => setEditValue(v)}
            onCommit={commitEdit}
            onCancel={cancelEdit}
          />
        )}
        {editorType === "number" && (
          <NumberEditor
            value={editValue as number | string}
            onChange={(v) => setEditValue(v)}
            onCommit={commitEdit}
            onCancel={cancelEdit}
          />
        )}
        {editorType === "select" && (
          <SelectEditor
            value={editValue as string | number}
            onChange={(v) => setEditValue(v)}
            onCommit={commitEdit}
            onCancel={cancelEdit}
            options={col.editorOptions ?? []}
          />
        )}
        {editError && (
          <p
            data-slot="editable-cell-error"
            className="text-destructive mt-0.5 text-xs"
          >
            {editError}
          </p>
        )}
      </div>
    );
  };

  /* ---- render ---- */
  return (
    <div
      data-slot="editable-tree-table"
      className={cn(
        "border-border overflow-x-auto rounded-lg border",
        className,
      )}
    >
      {/* Toolbar */}
      {showToolbar && editMode && (
        <div
          data-slot="editable-tree-table-toolbar"
          className="border-border bg-background sticky bottom-0 z-10 flex items-center justify-between border-t px-3 py-2"
        >
          <span className="text-muted-foreground text-sm">
            {dirtyCount > 0
              ? `${dirtyCount} unsaved change${dirtyCount > 1 ? "s" : ""}`
              : "No changes"}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={dirtyCount === 0}
              icon={<XIcon className="size-3.5" />}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={dirtyCount === 0}
              icon={<CheckIcon className="size-3.5" />}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            {columns.map((col) => (
              <TableHead
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
                {col.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={sizePadding}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : flatRows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-muted-foreground py-12 text-center"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            flatRows.map((fr, idx) => (
              <TableRow key={fr.key} data-depth={fr.depth}>
                {columns.map((col, colIdx) => {
                  const value = getCellValue(
                    fr.key,
                    col.key,
                    fr.row as unknown as T,
                  );
                  const isEditable = isColumnEditable(
                    col,
                    fr.row as unknown as T,
                  );

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
                            style={{ paddingLeft: fr.depth * 24 }}
                            className="inline-flex shrink-0"
                          />
                          {fr.hasChildren && (
                            <button
                              type="button"
                              data-slot="editable-tree-table-expand"
                              onClick={() => handleToggleExpand(fr.key)}
                              className="hover:bg-muted inline-flex size-5 shrink-0 items-center justify-center rounded"
                              aria-label={fr.isExpanded ? "Collapse" : "Expand"}
                            >
                              {fr.isExpanded ? (
                                <ChevronDownIcon className="size-4" />
                              ) : (
                                <ChevronRightIcon className="size-4" />
                              )}
                            </button>
                          )}
                          {!fr.hasChildren && (
                            <span className="inline-flex size-5 shrink-0" />
                          )}
                          <span className="min-w-0 flex-1">
                            {isEditable
                              ? renderEditor(
                                  col,
                                  fr.row as unknown as T,
                                  fr.key,
                                )
                              : col.render
                                ? col.render(
                                    value as T[keyof T],
                                    fr.row as unknown as T,
                                    idx,
                                  )
                                : ((value as React.ReactNode) ?? "\u2014")}
                          </span>
                        </span>
                      ) : isEditable ? (
                        renderEditor(col, fr.row as unknown as T, fr.key)
                      ) : col.render ? (
                        col.render(
                          value as T[keyof T],
                          fr.row as unknown as T,
                          idx,
                        )
                      ) : (
                        ((value as React.ReactNode) ?? "\u2014")
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { EditableTreeTable };
export type { EditableTreeTableProps, EditableTreeTableColumn };
