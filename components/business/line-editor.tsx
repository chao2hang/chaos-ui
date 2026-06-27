"use client";

import * as React from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * @component LineEditor
 * @category business/bill
 * @since 0.2.0
 * @description 可编辑明细行通用组件 / Editable detail line editor with add/remove/compute
 * @keywords line, editor, detail, table, editable, add, remove
 * @example
 * <LineEditor
 *   columns={[{ key: 'name', title: 'Name', editable: true }, { key: 'amount', title: 'Amount', compute: (row) => row.qty * row.price }]}
 *   data={rows}
 *   onChange={setRows}
 * />
 */

interface LineEditorColumn {
  key: string;
  title: React.ReactNode;
  width?: number | string;
  editable?: boolean;
  fixed?: boolean;
  compute?: (row: Record<string, any>) => React.ReactNode;
  render?: (value: any, row: Record<string, any>, index: number) => React.ReactNode;
  renderEditor?: (value: any, row: Record<string, any>, index: number, onChange: (value: any) => void) => React.ReactNode;
}

interface LineEditorProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Column definitions / 列定义 */
  columns?: LineEditorColumn[];
  /** Data rows / 数据行 */
  data?: Record<string, any>[];
  /** Data change callback / 数据变更回调 */
  onChange?: (data: Record<string, any>[]) => void;
  /** Row key field / 行 key 字段 */
  rowKey?: string;
  /** Minimum rows / 最少行数 */
  minRows?: number;
  /** Maximum rows / 最多行数 */
  maxRows?: number | undefined;
  /** Whether rows are draggable / 是否可拖拽排序 */
  draggable?: boolean;
  /** Footer content (summary row) / 底部内容(合计行) */
  footer?: React.ReactNode | undefined;
  /** Whether editor is read-only / 是否只读 */
  readOnly?: boolean;
  /** Empty state text / 空状态文本 */
  emptyText?: string | undefined;
}

function LineEditor({
  className,
  columns = [],
  data = [],
  onChange,
  rowKey = "id",
  minRows = 1,
  maxRows,
  draggable = false,
  footer,
  readOnly = false,
  emptyText = "No data",
  ...props
}: LineEditorProps) {
  const [rows, setRows] = React.useState<Record<string, any>[]>(data);
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const updateRows = (newRows: Record<string, any>[]) => {
    setRows(newRows);
    onChange?.(newRows);
  };

  const handleAddRow = () => {
    if (maxRows && rows.length >= maxRows) return;
    const newRow: Record<string, any> = { [rowKey]: `row_${Date.now()}` };
    columns.forEach((col) => {
      if (!(col.key in newRow)) newRow[col.key] = "";
    });
    updateRows([...rows, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length <= minRows) return;
    updateRows(rows.filter((_, i) => i !== index));
  };

  const handleCellChange = (index: number, key: string, value: any) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index]!, [key]: value };
    updateRows(newRows);
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newRows = [...rows];
    const [dragged] = newRows.splice(dragIndex, 1);
    newRows.splice(index, 0, dragged!);
    setRows(newRows);
    setDragIndex(index);
  };
  const handleDragEnd = () => {
    setDragIndex(null);
    onChange?.(rows);
  };

  return (
    <div
      data-slot="line-editor"
      className={cn("w-full overflow-x-auto", className)}
      {...props}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {draggable && !readOnly && <th className="w-8 px-2 py-2" />}
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2 text-left font-medium text-muted-foreground"
                style={{ width: col.width }}
              >
                {col.title}
              </th>
            ))}
            {!readOnly && <th className="w-12 px-2 py-2" />}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (draggable ? 2 : 1)}
                className="py-8 text-center text-muted-foreground"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={row[rowKey] ?? index}
                className="border-b border-border transition-colors hover:bg-muted/20"
                draggable={draggable && !readOnly}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                {draggable && !readOnly && (
                  <td className="cursor-grab px-2 py-2 text-muted-foreground">
                    <GripVertical className="size-4" />
                  </td>
                )}
                {columns.map((col) => {
                  const value = row[col.key];
                  const computed = col.compute ? col.compute(row) : value;
                  return (
                    <td key={col.key} className="px-3 py-2">
                      {readOnly || !col.editable ? (
                        col.render ? col.render(value, row, index) : (computed ?? "—")
                      ) : col.renderEditor ? (
                        col.renderEditor(value, row, index, (v) => handleCellChange(index, col.key, v))
                      ) : (
                        <input
                          type="text"
                          value={value ?? ""}
                          onChange={(e) => handleCellChange(index, col.key, e.target.value)}
                          className="w-full rounded border border-transparent bg-transparent px-1 py-0.5 outline-none focus:border-input focus:bg-background"
                        />
                      )}
                    </td>
                  );
                })}
                {!readOnly && (
                  <td className="px-2 py-2">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemoveRow(index)}
                      disabled={rows.length <= minRows}
                      aria-label="Remove row"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="border-t border-border bg-muted/30 font-medium">
              {footer}
            </tr>
          </tfoot>
        )}
      </table>
      {!readOnly && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddRow}
          disabled={maxRows !== undefined && rows.length >= maxRows}
          className="mt-2"
        >
          <Plus className="size-4" /> Add Row
        </Button>
      )}
    </div>
  );
}

export { LineEditor };
export type { LineEditorProps, LineEditorColumn };
