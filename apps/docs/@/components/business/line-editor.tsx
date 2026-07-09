"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

type LineColumnType = "text" | "number" | "select" | "date" | "custom";

interface LineColumn {
  /** 列标识 */
  key: string;
  /** 列标题 */
  title: string;
  /** 列宽 */
  width?: number | string;
  /** 列类型 */
  type?: LineColumnType;
  /** 是否可编辑（默认 true） */
  editable?: boolean;
  /** 是否固定（不参与滚动） */
  fixed?: boolean;
  /** 是否自动计算 */
  compute?: (
    row: Record<string, unknown>,
    allRows: Record<string, unknown>[],
  ) => unknown;
  /** 自定义渲染 */
  render?: (
    value: unknown,
    row: Record<string, unknown>,
    index: number,
  ) => React.ReactNode;
  /** 自定义编辑组件 */
  editRender?: (
    value: unknown,
    row: Record<string, unknown>,
    onChange: (val: unknown) => void,
  ) => React.ReactNode;
  /** 自定义编辑器组件 (alias, used by order/expense line editors) */
  renderEditor?: (
    value: unknown,
    row: Record<string, unknown>,
    index: number,
    onChange: (val: unknown) => void,
  ) => React.ReactNode;
  /** 对齐方式 */
  align?: "left" | "center" | "right";
  /** 默认值（新增行时） */
  defaultValue?: unknown;
}

interface LineEditorProps {
  /** 列定义 */
  columns: LineColumn[];
  /** 行数据 */
  data: Record<string, unknown>[];
  /** 数据变更回调 */
  onChange?: (data: Record<string, unknown>[]) => void;
  /** 最少行数（默认 1） */
  minRows?: number | undefined;
  /** 最多行数 */
  maxRows?: number | undefined;
  /** 行标识 key */
  rowKey?: string | undefined;
  /** 底部汇总渲染 */
  footer?: React.ReactNode | undefined;
  /** 合计行自动计算（指定哪些列需要汇总） */
  summaryKeys?: string[] | undefined;
  /** 是否只读 */
  readOnly?: boolean | undefined;
  /** 加载态 */
  loading?: boolean | undefined;
  /** 空状态文案 */
  emptyText?: string | undefined;
  className?: string | undefined;
}

/**
 * 可编辑明细行组件 —— ERP 系统的核心通用组件。
 * 支持行增删 / 行内编辑 / 自动计算 / 合计行。
 *
 * @component LineEditor
 * @category business/bills
 * @since 0.2.0
 */
function LineEditor({
  columns = [],
  data = [],
  onChange,
  minRows = 1,
  maxRows = 999,
  rowKey = "id",
  footer,
  summaryKeys = [],
  readOnly = false,
  loading = false,
  className,
}: LineEditorProps) {
  const handleCellChange = (rowIndex: number, key: string, value: unknown) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [key]: value };

    // Recompute computed columns
    for (const col of columns) {
      if (col.compute) {
        newData[rowIndex] = {
          ...newData[rowIndex],
          [col.key]: col.compute(newData[rowIndex]!, newData),
        };
      }
    }

    onChange?.(newData);
  };

  const handleAddRow = () => {
    if (data.length >= maxRows) return;
    const newRow: Record<string, unknown> = { [rowKey]: crypto.randomUUID() };
    for (const col of columns) {
      if (col.defaultValue !== undefined) {
        newRow[col.key] = col.defaultValue;
      }
    }
    onChange?.([...data, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    if (data.length <= minRows) return;
    const newData = data.filter((_, i) => i !== index);
    onChange?.(newData);
  };

  // Compute summary values
  const summary: Record<string, unknown> = {};
  if (summaryKeys) {
    for (const key of summaryKeys) {
      summary[key] = data.reduce(
        (sum, row) => sum + (Number(row[key]) || 0),
        0,
      );
    }
  }

  if (loading) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            {columns.map((col, j) => (
              <div
                key={j}
                className="bg-muted h-8 animate-pulse rounded"
                style={{ width: col.width || 120 }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  const alignClass: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const toRenderValue = (
    col: LineColumn,
    value: unknown,
    row: Record<string, unknown>,
    rowIndex: number,
  ) => {
    if (col.render) {
      return col.render(value, row, rowIndex);
    }
    if (col.editRender && !readOnly && col.editable !== false) {
      return col.editRender(value, row, (val) =>
        handleCellChange(rowIndex, col.key, val),
      );
    }
    if (col.type === "number") {
      return value != null ? Number(value).toLocaleString() : "-";
    }
    if (col.type === "custom") {
      return value != null ? String(value) : "-";
    }
    return value != null ? String(value) : "-";
  };

  return (
    <div data-slot="line-editor" className={cn("space-y-2", className)}>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* Row number */}
              <TableHead className="w-10 text-center">#</TableHead>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={alignClass[col.align || "left"]}
                  style={{ width: col.width, minWidth: col.width }}
                >
                  {col.title}
                </TableHead>
              ))}
              {!readOnly && (
                <TableHead className="w-16 text-center">操作</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (readOnly ? 1 : 2)}
                  className="text-muted-foreground py-8 text-center"
                >
                  暂无明细行，点击下方&ldquo;添加行&rdquo;开始
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={String(row[rowKey] || rowIndex)}>
                  <TableCell className="text-muted-foreground text-center text-sm">
                    {rowIndex + 1}
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={alignClass[col.align || "left"]}
                    >
                      {toRenderValue(col, row[col.key], row, rowIndex)}
                    </TableCell>
                  ))}
                  {!readOnly && (
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={data.length <= minRows}
                        onClick={() => handleRemoveRow(rowIndex)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
                        </svg>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>

          {/* Summary row */}
          {summaryKeys && summaryKeys.length > 0 && data.length > 0 && (
            <TableBody>
              <TableRow className="bg-muted/50 border-t-2 font-medium">
                <TableCell className="text-center">合计</TableCell>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={alignClass[col.align || "left"]}
                  >
                    {summaryKeys.includes(col.key)
                      ? Number(summary[col.key] || 0).toLocaleString()
                      : ""}
                  </TableCell>
                ))}
                {!readOnly && <TableCell />}
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>

      {/* Actions */}
      {!readOnly && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={data.length >= maxRows}
            onClick={handleAddRow}
          >
            添加行
          </Button>
          {footer}
        </div>
      )}

      {footer && readOnly && <div>{footer}</div>}
    </div>
  );
}

export { LineEditor };
export type { LineEditorProps, LineColumn, LineColumn as LineEditorColumn };
