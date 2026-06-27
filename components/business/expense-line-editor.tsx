"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { LineEditor } from "@/components/business/line-editor";
import type { LineEditorColumn } from "@/components/business/line-editor";
import { InputNumber } from "@/components/ui/input-number";
import { Input } from "@/components/ui/input";

/**
 * @component ExpenseLineEditor
 * @category business/bill
 * @since 0.2.0
 * @description 费用明细专版(基于 line-editor,内置摘要/金额/合计) / Expense detail line editor with summary, amount, total
 * @keywords expense, line, editor, detail, amount, total
 * @example
 * <ExpenseLineEditor
 *   data={lines}
 *   onChange={setLines}
 *   categories={[{ label: 'Travel', value: 'travel' }]}
 * />
 */

interface ExpenseLine {
  id?: string;
  category?: string;
  summary?: string;
  amount?: number;
  remark?: string;
  [key: string]: unknown;
}

interface CategoryOption {
  label: string;
  value: string;
}

interface ExpenseLineEditorProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Line data / 明细数据 */
  data: ExpenseLine[];
  /** Data change callback / 数据变更回调 */
  onChange?: (data: ExpenseLine[]) => void;
  /** Expense category options / 费用类别选项 */
  categories?: CategoryOption[];
  /** Whether editor is read-only / 是否只读 */
  readOnly?: boolean;
  /** Minimum rows / 最少行数 */
  minRows?: number;
  /** Maximum rows / 最多行数 */
  maxRows?: number;
  /** Currency symbol / 货币符号 */
  currency?: string;
}

function ExpenseLineEditor({
  className,
  data,
  onChange,
  categories = [],
  readOnly = false,
  minRows = 1,
  maxRows,
  currency = "¥",
  ...props
}: ExpenseLineEditorProps) {
  const columns: LineEditorColumn[] = React.useMemo(
    () => [
      ...(categories.length > 0
        ? [
            {
              key: "category",
              title: "Category",
              width: 150,
              editable: !readOnly,
              renderEditor: (value: any, _row: any, _index: number, onCellChange: (v: any) => void) => (
                <select
                  value={String(value ?? "")}
                  onChange={(e) => onCellChange(e.target.value)}
                  className="h-8 w-full rounded border border-input bg-background px-2 text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              ),
              render: (value: any) => {
                const cat = categories.find((c) => c.value === value);
                return cat?.label ?? value ?? "—";
              },
            } satisfies LineEditorColumn,
          ]
        : []),
      {
        key: "summary",
        title: "Summary",
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <Input
            value={String(value ?? "")}
            onChange={(e) => onCellChange(e.target.value)}
            placeholder="Enter summary"
            className="h-8"
          />
        ),
        render: (value) => value ?? "—",
      },
      {
        key: "amount",
        title: `Amount (${currency})`,
        width: 140,
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <InputNumber
            value={value as number}
            onChange={(v) => onCellChange(v ?? 0)}
            min={0}
            precision={2}
            size="sm"
            className="w-full"
          />
        ),
        render: (value) =>
          value != null ? `${currency}${Number(value).toFixed(2)}` : "—",
      },
      {
        key: "remark",
        title: "Remark",
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <Input
            value={String(value ?? "")}
            onChange={(e) => onCellChange(e.target.value)}
            placeholder="Optional"
            className="h-8"
          />
        ),
      },
    ],
    [categories, readOnly, currency],
  );

  const handleChange = (newData: Record<string, any>[]) => {
    onChange?.(newData as ExpenseLine[]);
  };

  const totalAmount = data.reduce(
    (sum, row) => sum + Number(row.amount ?? 0),
    0,
  );

  const footer = (
    <td colSpan={columns.length + 1} className="px-3 py-2 text-right">
      <span className="mr-6 text-muted-foreground">
        {data.length} items
      </span>
      <span className="text-base font-semibold">
        Total: {currency}
        {totalAmount.toFixed(2)}
      </span>
    </td>
  );

  return (
    <div className={cn("w-full", className)} {...props}>
      <LineEditor
        columns={columns}
        data={data}
        onChange={handleChange}
        readOnly={readOnly}
        minRows={minRows}
        maxRows={maxRows}
        footer={footer}
        emptyText="No expense items added"
      />
    </div>
  );
}

export { ExpenseLineEditor };
export type { ExpenseLineEditorProps, ExpenseLine, CategoryOption };
