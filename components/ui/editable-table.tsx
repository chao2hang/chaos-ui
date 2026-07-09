"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { PlusIcon, Trash2Icon } from "./icons";

interface EditableColumn<T = Record<string, unknown>> {
  /** Column key / 列键 */
  key: string;
  /** Column title / 列标题 */
  title: React.ReactNode;
  /** Data field key / 数据字段键 */
  dataIndex: keyof T & string;
  /** Cell editor type / 单元格编辑器类型 */
  type?: "text" | "number" | "select" | "date" | "boolean";
  /** Options for select type / 下拉选项 */
  options?: { label: React.ReactNode; value: string | number }[];
  /** Column width / 列宽 */
  width?: number | string;
  /** Required field / 是否必填 */
  required?: boolean;
  /** Custom display render / 自定义显示渲染 */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Custom edit render / 自定义编辑渲染 */
  renderEdit?: (
    value: unknown,
    row: T,
    onChange: (value: unknown) => void,
  ) => React.ReactNode;
}

interface EditableTableProps<T = Record<string, unknown>> extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  /** Column definitions / 列定义 */
  columns: EditableColumn<T>[];
  /** Table data / 表格数据 */
  data?: T[];
  /** Change handler / 数据变更回调 */
  onChange?: (newData: T[]) => void;
  /** Row key field / 行键字段 */
  rowKey?: keyof T & string;
  /** Enable cell editing / 启用单元格编辑 */
  editable?: boolean;
  /** Enable add row / 启用新增行 */
  addable?: boolean;
  /** Enable delete row / 启用删除行 */
  deletable?: boolean;
  /** Add row callback / 新增行回调 */
  onRowAdd?: () => void;
  /** Delete row callback / 删除行回调 */
  onRowDelete?: (row: T, index: number) => void;
}

function EditableTable<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  className,
  columns,
  data = [],
  onChange,
  rowKey = "id",
  editable = true,
  addable = false,
  deletable = false,
  onRowAdd,
  onRowDelete,
  ...props
}: EditableTableProps<T>) {
  const [editing, setEditing] = React.useState<{
    row: number;
    col: string;
  } | null>(null);
  const [editValue, setEditValue] = React.useState<unknown>(undefined);

  const startEdit = React.useCallback(
    (rowIndex: number, colKey: string, currentValue: unknown) => {
      if (!editable) return;
      setEditing({ row: rowIndex, col: colKey });
      setEditValue(currentValue);
    },
    [editable],
  );

  const confirmEdit = React.useCallback(() => {
    if (!editing || !onChange) {
      setEditing(null);
      return;
    }
    const newData = data.map((row, idx) =>
      idx === editing.row ? { ...row, [editing.col]: editValue } : row,
    );
    onChange(newData);
    setEditing(null);
  }, [editing, editValue, data, onChange]);

  const cancelEdit = React.useCallback(() => {
    setEditing(null);
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        confirmEdit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancelEdit();
      }
    },
    [confirmEdit, cancelEdit],
  );

  const renderEditor = (col: EditableColumn<T>, value: unknown) => {
    if (col.renderEdit) {
      return col.renderEdit(value, data[editing!.row]!, (v) => setEditValue(v));
    }
    const commonProps = {
      autoFocus: true,
      value: editValue as string | number,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setEditValue(
          col.type === "number" ? Number(e.target.value) : e.target.value,
        ),
      onBlur: confirmEdit,
      onKeyDown: handleKeyDown,
      className:
        "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-7 w-full rounded-md border bg-transparent px-1.5 text-sm outline-none focus-visible:ring-3",
    };
    switch (col.type) {
      case "select":
        return (
          <select
            {...commonProps}
            className={cn(commonProps.className, "pr-6")}
          >
            <option value="">Select...</option>
            {col.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "number":
        return <input type="number" {...commonProps} />;
      case "date":
        return <input type="date" {...commonProps} />;
      case "boolean":
        return (
          <input
            type="checkbox"
            autoFocus
            checked={Boolean(editValue)}
            onChange={(e) => setEditValue(e.target.checked)}
            onBlur={confirmEdit}
            className="size-4"
          />
        );
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  const renderDisplay = (
    col: EditableColumn<T>,
    value: unknown,
    row: T,
    rowIndex: number,
  ) => {
    if (col.render) return col.render(value, row, rowIndex);
    if (col.type === "boolean") return value ? "Yes" : "No";
    if (col.type === "select") {
      const opt = col.options?.find((o) => o.value === value);
      return opt?.label ?? String(value ?? "");
    }
    return value == null ? "" : String(value);
  };

  return (
    <div
      data-slot="editable-table"
      className={cn(
        "border-border w-full overflow-x-auto rounded-lg border",
        className,
      )}
      {...props}
    >
      <table className="w-full text-sm">
        <thead className="bg-muted/30">
          <tr className="border-border border-b">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.title}
                {col.required && (
                  <span className="text-destructive ml-0.5">*</span>
                )}
              </th>
            ))}
            {deletable && <th className="w-10 px-2" />}
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (deletable ? 1 : 0)}
                className="text-muted-foreground py-6 text-center"
              >
                No data
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={String(row[rowKey] ?? rowIndex)}
                className="hover:bg-muted/30 transition-colors"
              >
                {columns.map((col) => {
                  const isEditing =
                    editing?.row === rowIndex && editing?.col === col.dataIndex;
                  const value = row[col.dataIndex];
                  return (
                    <td
                      key={col.key}
                      className="p-2 align-middle"
                      onClick={() =>
                        !isEditing && startEdit(rowIndex, col.dataIndex, value)
                      }
                    >
                      {isEditing ? (
                        renderEditor(col, value)
                      ) : (
                        <div
                          className={cn(
                            "min-h-7 px-1.5 py-1",
                            editable &&
                              "hover:bg-muted cursor-pointer rounded-md",
                          )}
                        >
                          {renderDisplay(col, value, row, rowIndex)}
                        </div>
                      )}
                    </td>
                  );
                })}
                {deletable && (
                  <td className="p-2 text-center align-middle">
                    <button
                      type="button"
                      onClick={() => onRowDelete?.(row, rowIndex)}
                      className="text-muted-foreground hover:text-destructive rounded-md p-1 transition-colors"
                      aria-label="Delete row"
                    >
                      <Trash2Icon className="size-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {addable && (
        <div className="border-border border-t p-2">
          <button
            type="button"
            onClick={onRowAdd}
            className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
          >
            <PlusIcon className="size-4" />
            Add row
          </button>
        </div>
      )}
    </div>
  );
}

export { EditableTable };
export type { EditableColumn, EditableTableProps };
