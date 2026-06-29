"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { LineEditor } from "@/components/business/line-editor";
import type { LineEditorColumn } from "@/components/business/line-editor";
import { InputNumber } from "@/components/ui/input-number";
import { Input } from "@/components/ui/input";

/**
 * @component OrderLineEditor
 * @category business/bill
 * @since 0.2.0
 * @description 订单明细专版(基于 line-editor,内置 SKU/单价/数量/小计/合计) / Order detail line editor with SKU picker, price, qty, subtotal
 * @keywords order, line, editor, detail, sku, price, subtotal
 * @example
 * <OrderLineEditor
 *   data={lines}
 *   onChange={setLines}
 *   skuOptions={[{ label: 'SKU-001', value: 'sku-1', price: 10.5 }]}
 * />
 */

interface SkuOption {
  label: string;
  value: string;
  price?: number;
}

interface OrderLine {
  id?: string;
  sku?: string;
  skuLabel?: string;
  price?: number;
  qty?: number;
  subtotal?: number;
  remark?: string;
  [key: string]: unknown;
}

interface OrderLineEditorProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Line data / 明细数据 */
  data: OrderLine[];
  /** Data change callback / 数据变更回调 */
  onChange?: (data: OrderLine[]) => void;
  /** SKU options / SKU 选项 */
  skuOptions?: SkuOption[];
  /** SKU search callback / SKU 搜索回调 */
  onSkuSearch?: (keyword: string) => void;
  /** Whether editor is read-only / 是否只读 */
  readOnly?: boolean;
  /** Minimum rows / 最少行数 */
  minRows?: number;
  /** Maximum rows / 最多行数 */
  maxRows?: number;
  /** Currency symbol / 货币符号 */
  currency?: string;
}

function OrderLineEditor({
  className,
  data,
  onChange,
  skuOptions = [],
  onSkuSearch,
  readOnly = false,
  minRows = 1,
  maxRows,
  currency = "¥",
  ...props
}: OrderLineEditorProps) {
  // @ts-expect-error skeleton column types — will be fixed when fully implemented
  const columns: LineEditorColumn[] = React.useMemo(
    () => [
      {
        key: "sku",
        title: "SKU",
        width: 200,
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <select
            value={String(value ?? "")}
            onChange={(e) => {
              const selected = skuOptions.find((o) => o.value === e.target.value);
              onCellChange(e.target.value);
              // Auto-fill price when SKU is selected
              if (selected?.price !== undefined) {
                // This will be handled by the parent onChange
              }
            }}
            className="h-8 w-full rounded border border-input bg-background px-2 text-sm"
          >
            <option value="">Select SKU</option>
            {skuOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
                {opt.price !== undefined ? ` (${currency}${opt.price})` : ""}
              </option>
            ))}
          </select>
        ),
        render: (value, row) => row.skuLabel ?? value ?? "—",
      },
      {
        key: "price",
        title: `Price (${currency})`,
        width: 120,
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
        render: (value) => (value != null ? `${currency}${Number(value).toFixed(2)}` : "—"),
      },
      {
        key: "qty",
        title: "Qty",
        width: 100,
        editable: !readOnly,
        renderEditor: (value, _row, _index, onCellChange) => (
          <InputNumber
            value={value as number}
            onChange={(v) => onCellChange(v ?? 0)}
            min={0}
            precision={0}
            size="sm"
            className="w-full"
          />
        ),
        render: (value) => value ?? "—",
      },
      {
        key: "subtotal",
        title: `Subtotal (${currency})`,
        width: 120,
        editable: false,
        compute: (row) => {
          const price = Number(row.price ?? 0);
          const qty = Number(row.qty ?? 0);
          const subtotal = price * qty;
          return `${currency}${subtotal.toFixed(2)}`;
        },
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
    [skuOptions, readOnly, currency],
  );

  // Auto-fill price when SKU changes
  const handleChange = (newData: Record<string, any>[]) => {
    const enriched = newData.map((row) => {
      if (row.sku) {
        const skuOption = skuOptions.find((o) => o.value === row.sku);
        if (skuOption?.price !== undefined && row.price === undefined) {
          return { ...row, price: skuOption.price };
        }
      }
      // Compute subtotal
      const price = Number(row.price ?? 0);
      const qty = Number(row.qty ?? 0);
      return { ...row, subtotal: price * qty };
    });
    onChange?.(enriched as OrderLine[]);
  };

  const total = data.reduce(
    (sum, row) => sum + Number(row.price ?? 0) * Number(row.qty ?? 0),
    0,
  );
  const totalQty = data.reduce((sum, row) => sum + Number(row.qty ?? 0), 0);

  const footer = (
    <td colSpan={columns.length + 1} className="px-3 py-2 text-right">
      <span className="mr-6 text-muted-foreground">
        {data.length} lines · {totalQty} items
      </span>
      <span className="text-base font-semibold">
        Total: {currency}
        {total.toFixed(2)}
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
        emptyText="No items added"
      />
    </div>
  );
}

export { OrderLineEditor };
export type { OrderLineEditorProps, OrderLine, SkuOption };
