"use client";

import * as React from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ColumnDef {
  /** Column key / 列标识 */
  key: string;
  /** Column header / 列表头 */
  title: string;
  /** Column width (px) / 列宽 */
  width?: number;
  /** Min column width (px) / 最小列宽 */
  minWidth?: number;
  /** Whether the column is editable / 是否可编辑 */
  editable?: boolean;
  /** Column type for formatting / 列数据类型 */
  type?: "text" | "number" | "select";
  /** Select options (when type="select") / 下拉选项 */
  options?: { label: string; value: string }[];
  /** Data validation / 数据校验 */
  validator?: (value: string, row: RowData) => string | null;
}

interface RowData {
  /** Row unique id / 行唯一标识 */
  id: string;
  /** Row data / 行数据 */
  [key: string]: string | number | undefined;
}

interface CellCoords {
  row: number;
  col: number;
}

interface SpreadsheetEditorProps {
  /** Column definitions / 列定义 */
  columns: ColumnDef[];
  /** Row data (controlled) / 行数据（受控） */
  data?: RowData[];
  /** Default row data (uncontrolled) / 默认行数据 */
  defaultData?: RowData[];
  /** Called when data changes / 数据变更回调 */
  onChange?: (data: RowData[]) => void;
  /** Called when a cell value changes / 单元格值变更回调 */
  onCellChange?: (rowId: string, columnKey: string, value: string) => void;
  /** Whether to show add/delete row controls / 是否显示行操作按钮 */
  showRowControls?: boolean;
  /** Whether to show column headers / 是否显示列头 */
  showHeaders?: boolean;
  /** Whether to show row numbers / 是否显示行号 */
  showRowNumbers?: boolean;
  /** Whether to allow adding rows / 是否允许添加行 */
  allowAddRow?: boolean;
  /** Whether to allow deleting rows / 是否允许删除行 */
  allowDeleteRow?: boolean;
  /** Max rows / 最大行数 */
  maxRows?: number;
  /** Min rows / 最小行数 */
  minRows?: number;
  /** Row height (px) / 行高 */
  rowHeight?: number;
  /** Additional class / 额外类名 */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function generateId(): string {
  return `row_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function SpreadsheetEditor({
  columns,
  data: controlledData,
  defaultData = [],
  onChange,
  onCellChange,
  showRowControls = true,
  showHeaders = true,
  showRowNumbers = true,
  allowAddRow = true,
  allowDeleteRow = true,
  maxRows = 1000,
  minRows = 0,
  rowHeight = 36,
  className,
}: SpreadsheetEditorProps) {
  const [internalData, setInternalData] = React.useState<RowData[]>(
    () => {
      if (defaultData.length > 0) return defaultData;
      // Generate one empty row by default if no data
      return [{ id: generateId() }];
    },
  );

  const rows = controlledData ?? internalData;

  const updateRows = React.useCallback(
    (newRows: RowData[]) => {
      if (!controlledData) setInternalData(newRows);
      onChange?.(newRows);
    },
    [controlledData, onChange],
  );

  const updateCell = React.useCallback(
    (rowId: string, columnKey: string, value: string) => {
      const newRows = rows.map((row) =>
        row.id === rowId ? { ...row, [columnKey]: value } : row,
      );
      updateRows(newRows);
      onCellChange?.(rowId, columnKey, value);
    },
    [rows, updateRows, onCellChange],
  );

  // Selection state
  const [selectedCell, setSelectedCell] = React.useState<CellCoords | null>(null);
  const [editingCell, setEditingCell] = React.useState<CellCoords | null>(null);
  const [editValue, setEditValue] = React.useState("");
  const [pasteStatus, setPasteStatus] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const tableRef = React.useRef<HTMLTableElement>(null);

  // Column widths
  const [colWidths, setColWidths] = React.useState<Record<string, number>>({});
  const [resizing, setResizing] = React.useState<string | null>(null);

  // Undo/Redo history (simple)
  const [history, setHistory] = React.useState<RowData[][]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);

  const pushHistory = React.useCallback(
    (newRows: RowData[]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newRows);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex],
  );

  const undo = React.useCallback(() => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      const snapshot = history[idx]!;
      setHistoryIndex(idx);
      if (!controlledData) setInternalData(snapshot);
      onChange?.(snapshot);
    }
  }, [historyIndex, history, controlledData, onChange]);

  const redo = React.useCallback(() => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      const snapshot = history[idx]!;
      setHistoryIndex(idx);
      if (!controlledData) setInternalData(snapshot);
      onChange?.(snapshot);
    }
  }, [historyIndex, history, controlledData, onChange]);

  // Focus input when entering edit mode
  React.useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  // Global paste handler
  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!selectedCell || editingCell) return;
      const text = e.clipboardData?.getData("text");
      if (!text) return;

      const rows_data = text.split(/\r?\n/).filter((r) => r.trim());
      if (rows_data.length === 0) return;

      const newRows = [...rows.map((r) => ({ ...r }))];
      let pasteCount = 0;

      for (let i = 0; i < rows_data.length; i++) {
        const rowIdx = selectedCell.row + i;
        if (rowIdx >= newRows.length) break;

        const cells = rows_data[i]!.split("\t");
        for (let j = 0; j < cells.length; j++) {
          const colIdx = selectedCell.col + j;
          if (colIdx >= columns.length) break;

          const col = columns[colIdx]!;
          if (col.editable === false) continue;

          newRows[rowIdx] = {
            ...newRows[rowIdx]!,
            [col.key]: cells[j],
          } as typeof newRows[number];
          pasteCount++;
        }
      }

      if (pasteCount > 0) {
        pushHistory(newRows);
        updateRows(newRows);
        setPasteStatus(`已粘贴 ${pasteCount} 个单元格`);
        setTimeout(() => setPasteStatus(""), 2000);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [selectedCell, editingCell, rows, columns, updateRows, pushHistory]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;

    // Ctrl+Z / Ctrl+Y
    if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      undo();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
      e.preventDefault();
      redo();
      return;
    }

    const { row, col } = selectedCell;

    const move = (dr: number, dc: number) => {
      e.preventDefault();
      const newRow = Math.max(0, Math.min(rows.length - 1, row + dr));
      const newCol = Math.max(0, Math.min(columns.length - 1, col + dc));
      setSelectedCell({ row: newRow, col: newCol });
      setEditingCell(null);
    };

    switch (e.key) {
      case "ArrowUp":
        move(-1, 0);
        break;
      case "ArrowDown":
        move(1, 0);
        break;
      case "ArrowLeft":
        move(0, -1);
        break;
      case "ArrowRight":
        move(0, 1);
        break;
      case "Tab":
        move(0, e.shiftKey ? -1 : 1);
        break;
      case "Enter":
        if (editingCell) {
          // Commit edit and move down
          commitEdit();
          move(1, 0);
        } else {
          // Start editing
          startEditing(row, col);
        }
        break;
      case "Escape":
        setEditingCell(null);
        break;
      case "F2":
        e.preventDefault();
        startEditing(row, col);
        break;
      case "Delete":
      case "Backspace":
        if (!editingCell) {
          updateCell(rows[row]!.id, columns[col]!.key, "");
        }
        break;
    }
  };

  const startEditing = (row: number, col: number) => {
    const val = rows[row]?.[columns[col]!.key];
    setEditingCell({ row, col });
    setEditValue(val != null ? String(val) : "");
  };

  const commitEdit = () => {
    if (!editingCell) return;
    const { row, col } = editingCell;
    const colDef = columns[col]!;
    const oldVal = rows[row]?.[colDef.key] ?? "";
    const newVal = editValue;

    if (String(oldVal) !== newVal) {
      pushHistory(rows);
      updateCell(rows[row]!.id, colDef.key, newVal);
    }
    setEditingCell(null);
  };

  // Row operations
  const addRow = () => {
    if (rows.length >= maxRows) return;
    const newRow: RowData = { id: generateId() };
    const newRows = [...rows, newRow];
    pushHistory(newRows);
    updateRows(newRows);
    // Select first cell of new row
    setSelectedCell({ row: newRows.length - 1, col: 0 });
  };

  const deleteRow = (rowIdx: number) => {
    if (rows.length <= minRows) return;
    const newRows = rows.filter((_, i) => i !== rowIdx);
    pushHistory(newRows);
    updateRows(newRows);
    setSelectedCell((prev) => {
      if (!prev) return null;
      if (prev.row >= newRows.length) {
        return { row: Math.max(0, newRows.length - 1), col: prev.col };
      }
      return prev;
    });
  };

  // Column resize
  const startResize = (e: React.MouseEvent, colKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startWidth = colWidths[colKey] ?? columns.find((c) => c.key === colKey)?.width ?? 120;
    setResizing(colKey);

    const onMouseMove = (me: MouseEvent) => {
      const delta = me.clientX - startX;
      const newWidth = Math.max(60, startWidth + delta);
      setColWidths((prev) => ({ ...prev, [colKey]: newWidth }));
    };

    const onMouseUp = () => {
      setResizing(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const getColWidth = (col: ColumnDef): number => {
    return colWidths[col.key] ?? col.width ?? 120;
  };

  return (
    <div
      data-slot="spreadsheet-editor"
      className={cn("w-full overflow-auto rounded-lg border", className)}
    >
      {/* Toolbar */}
      {showRowControls && (
        <div className="flex items-center gap-1 border-b bg-muted/30 px-2 py-1">
          {allowAddRow && (
            <button
              type="button"
              onClick={addRow}
              disabled={rows.length >= maxRows}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs",
                "border border-input bg-background hover:bg-muted",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
              title="添加行"
            >
              <PlusIcon className="size-3" />
              添加行
            </button>
          )}
          <span className="ml-1 text-xs text-muted-foreground">
            {rows.length} / {maxRows} 行
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {columns.length} 列 · Tab/方向键导航 · F2 编辑 · Ctrl+V 粘贴
          </span>
          {pasteStatus && (
            <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {pasteStatus}
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto">
        <table
          ref={tableRef}
          data-slot="spreadsheet-table"
          className="w-full border-collapse"
          onKeyDown={handleKeyDown}
          role="grid"
        >
          {/* Column headers */}
          {showHeaders && (
            <thead>
              <tr className="bg-muted/50">
                {showRowNumbers && (
                  <th
                    className="sticky left-0 z-10 border-b border-r bg-muted/50 px-2 py-1 text-center text-xs font-medium text-muted-foreground"
                    style={{ width: 48, minWidth: 48 }}
                  >
                    #
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="relative border-b border-r px-2 py-1 text-left text-xs font-medium text-muted-foreground select-none"
                    style={{ width: getColWidth(col), minWidth: col.minWidth ?? 60 }}
                  >
                    <span className="truncate">{col.title}</span>
                    {/* Resize handle */}
                    <div
                      className={cn(
                        "absolute right-0 top-0 h-full w-1 cursor-col-resize",
                        "hover:bg-primary/30",
                        resizing === col.key && "bg-primary/50",
                      )}
                      onMouseDown={(e) => startResize(e, col.key)}
                    />
                  </th>
                ))}
                {allowDeleteRow && <th className="w-8 border-b px-1" />}
              </tr>
            </thead>
          )}

          <tbody>
            {rows.map((row, rowIdx) => {
              const isSelected = selectedCell?.row === rowIdx;
              return (
                <tr
                  key={row.id}
                  className={cn(
                    "transition-colors",
                    isSelected && "bg-accent/30",
                  )}
                >
                  {/* Row number */}
                  {showRowNumbers && (
                    <td
                      className={cn(
                        "sticky left-0 z-10 border-b border-r bg-background px-2 py-1 text-center text-xs text-muted-foreground select-none",
                        isSelected && "bg-accent/30",
                      )}
                      style={{ width: 48, height: rowHeight }}
                    >
                      {rowIdx + 1}
                    </td>
                  )}

                  {/* Cells */}
                  {columns.map((col, colIdx) => {
                    const isEditing =
                      editingCell?.row === rowIdx && editingCell?.col === colIdx;
                    const isCellSelected =
                      selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
                    const cellValue = row[col.key];
                    const editable = col.editable !== false;
                    const validationError = col.validator
                      ? col.validator(String(cellValue ?? ""), row)
                      : null;

                    return (
                      <td
                        key={col.key}
                        className={cn(
                          "relative border-b border-r px-2 py-0 transition-colors",
                          isCellSelected && !isEditing && "ring-2 ring-primary ring-inset",
                          validationError && "bg-red-50 dark:bg-red-950/20",
                        )}
                        style={{
                          width: getColWidth(col),
                          height: rowHeight,
                        }}
                        onClick={() => {
                          setSelectedCell({ row: rowIdx, col: colIdx });
                          if (editable && col.type !== "select") {
                            setEditingCell({ row: rowIdx, col: colIdx });
                            setEditValue(cellValue != null ? String(cellValue) : "");
                          }
                        }}
                        onDoubleClick={() => {
                          if (editable && col.type !== "select") {
                            setEditingCell({ row: rowIdx, col: colIdx });
                            setEditValue(cellValue != null ? String(cellValue) : "");
                          }
                        }}
                      >
                        {isEditing ? (
                          col.type === "select" && col.options ? (
                            <select
                              value={String(cellValue ?? "")}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                if (String(cellValue) !== newVal) {
                                  pushHistory(rows);
                                  updateCell(row.id, col.key, newVal);
                                }
                                setEditingCell(null);
                              }}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => {
                                if (e.key === "Escape") setEditingCell(null);
                              }}
                              autoFocus
                              className="h-full w-full bg-transparent text-sm outline-none"
                            >
                              <option value="">—</option>
                              {col.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              ref={inputRef}
                              type={col.type === "number" ? "number" : "text"}
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={commitEdit}
                              onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                  setEditingCell(null);
                                } else if (e.key === "Enter") {
                                  commitEdit();
                                  if (rowIdx < rows.length - 1) {
                                    setSelectedCell({ row: rowIdx + 1, col: colIdx });
                                    setEditingCell({ row: rowIdx + 1, col: colIdx });
                                    const nextVal =
                                      rows[rowIdx + 1]?.[columns[colIdx]!.key];
                                    setEditValue(
                                      nextVal != null ? String(nextVal) : "",
                                    );
                                  } else {
                                    setEditingCell(null);
                                    setSelectedCell({ row: rowIdx, col: colIdx });
                                  }
                                } else if (e.key === "Tab") {
                                  e.preventDefault();
                                  commitEdit();
                                  const nextCol = e.shiftKey
                                    ? Math.max(0, colIdx - 1)
                                    : Math.min(columns.length - 1, colIdx + 1);
                                  setSelectedCell({ row: rowIdx, col: nextCol });
                                  setEditingCell({ row: rowIdx, col: nextCol });
                                  const nextVal = rows[rowIdx]?.[columns[nextCol]!.key];
                                  setEditValue(
                                    nextVal != null ? String(nextVal) : "",
                                  );
                                }
                              }}
                              className="h-full w-full bg-transparent text-sm outline-none"
                            />
                          )
                        ) : (
                          <div
                            className={cn(
                              "flex h-full items-center text-sm",
                              cellValue == null && "text-muted-foreground/40",
                            )}
                          >
                            {col.type === "select" && col.options
                              ? col.options.find((o) => o.value === cellValue)
                                  ?.label ?? (
                                  <span className="text-muted-foreground/40">
                                    {cellValue ?? "—"}
                                  </span>
                                )
                              : cellValue ?? (
                                  <span className="text-muted-foreground/40">—</span>
                                )}
                          </div>
                        )}
                        {validationError && (
                          <div className="absolute left-0 top-full z-20 whitespace-nowrap rounded bg-red-500 px-1.5 py-0.5 text-xs text-white">
                            {validationError}
                          </div>
                        )}
                      </td>
                    );
                  })}

                  {/* Delete row button */}
                  {allowDeleteRow && (
                    <td className="border-b px-1 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteRow(rowIdx);
                        }}
                        disabled={rows.length <= minRows}
                        className={cn(
                          "rounded p-0.5 text-muted-foreground/40 hover:text-red-500",
                          "disabled:cursor-not-allowed disabled:opacity-30",
                        )}
                        title="删除行"
                      >
                        <Trash2Icon className="size-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { SpreadsheetEditor };
export type { SpreadsheetEditorProps, ColumnDef as SpreadsheetColumnDef, RowData, CellCoords };
