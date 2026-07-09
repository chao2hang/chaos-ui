"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatCurrency } from "@chaos_team/chaos-ui/lib";

/**
 * @component ReconciliationLineEditor
 * @category business/finance
 * @since 0.7.0
 * @description 对账明细编辑器：可编辑订单金额与扣减，自动计算 netAmount = orderAmount - deduction
 * @keywords reconciliation, line, editor
 * @example
 * ```tsx
 * <ReconciliationLineEditor
 *   rows={rows}
 *   onChange={(next) => setRows(next)}
 * />
 * ```
 */

interface ReconciliationRow {
  id: string;
  distributor: string;
  orderAmount: number;
  deduction: number;
  netAmount: number;
}

interface ReconciliationLineEditorProps {
  rows: ReconciliationRow[];
  onChange?: (rows: ReconciliationRow[]) => void;
  className?: string;
}

function ReconciliationLineEditor({
  rows = [],
  onChange,
  className,
}: ReconciliationLineEditorProps) {
  const [localRows, setLocalRows] = React.useState<ReconciliationRow[]>(rows);

  React.useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  const updateRow = (id: string, patch: Partial<ReconciliationRow>) => {
    const next = localRows.map((row) => {
      if (row.id !== id) return row;
      const orderAmount =
        patch.orderAmount !== undefined ? patch.orderAmount : row.orderAmount;
      const deduction =
        patch.deduction !== undefined ? patch.deduction : row.deduction;
      const netAmount = orderAmount - deduction;
      return { ...row, ...patch, netAmount };
    });
    setLocalRows(next);
    onChange?.(next);
  };

  const parseNumber = (value: string): number => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  };

  return (
    <div
      data-slot="reconciliation-line-editor"
      className={cn("w-full overflow-x-auto", className)}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-border bg-muted/40 border-b text-left">
            <th scope="col" className="px-3 py-2 font-medium">
              经销商
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              订单金额
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              扣减
            </th>
            <th scope="col" className="px-3 py-2 text-right font-medium">
              净额
            </th>
          </tr>
        </thead>
        <tbody>
          {localRows.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-muted-foreground px-3 py-4 text-center"
              >
                暂无对账明细
              </td>
            </tr>
          ) : (
            localRows.map((row) => (
              <tr
                key={row.id}
                data-slot="reconciliation-line-editor-row"
                className="border-border border-b last:border-0"
              >
                <td className="px-3 py-2">{row.distributor}</td>
                <td className="px-3 py-2 text-right">
                  <label htmlFor={`order-${row.id}`} className="sr-only">
                    订单金额
                  </label>
                  <input
                    id={`order-${row.id}`}
                    type="number"
                    inputMode="decimal"
                    data-slot="reconciliation-line-editor-input"
                    data-field="orderAmount"
                    aria-label="订单金额"
                    value={row.orderAmount}
                    onChange={(e) =>
                      updateRow(row.id, {
                        orderAmount: parseNumber(e.target.value),
                      })
                    }
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 w-28 rounded-md border bg-transparent px-2 py-1 text-right outline-none focus-visible:ring-3"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <label htmlFor={`deduction-${row.id}`} className="sr-only">
                    扣减
                  </label>
                  <input
                    id={`deduction-${row.id}`}
                    type="number"
                    inputMode="decimal"
                    data-slot="reconciliation-line-editor-input"
                    data-field="deduction"
                    aria-label="扣减"
                    value={row.deduction}
                    onChange={(e) =>
                      updateRow(row.id, {
                        deduction: parseNumber(e.target.value),
                      })
                    }
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 w-28 rounded-md border bg-transparent px-2 py-1 text-right outline-none focus-visible:ring-3"
                  />
                </td>
                <td
                  className="px-3 py-2 text-right tabular-nums"
                  data-slot="reconciliation-line-editor-net"
                >
                  {formatCurrency(row.netAmount)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { ReconciliationLineEditor };
export type { ReconciliationLineEditorProps, ReconciliationRow };
