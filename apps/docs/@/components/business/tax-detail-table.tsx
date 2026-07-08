"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercent } from "@/lib/format";
import { CalculatorIcon } from "@/components/ui/icons";

/**
 * @component TaxDetailTable
 * @category business/finance
 * @since 0.7.0
 * @description 税务明细表 — itemizes the taxable amount, rate, and computed
 * tax for each line item, with a totals footer.
 * @keywords tax, detail, table
 * @example
 * ```tsx
 * <TaxDetailTable
 *   rows={[{ id: "t1", name: "商品A", amount: 1000, taxRate: 0.13, taxAmount: 130 }]}
 * />
 * ```
 */
interface TaxDetailTableProps {
  /** Taxable line items. */
  rows: Array<{
    id: string;
    name: string;
    /** Taxable amount (currency units). */
    amount: number;
    /** Tax rate as a fraction, e.g. 0.13 for 13%. */
    taxRate: number;
    /** Computed tax payable for this line. */
    taxAmount: number;
  }>;
  className?: string;
}

function TaxDetailTable({ rows = [], className }: TaxDetailTableProps) {
  const totalAmount = rows.reduce((s, r) => s + r.amount, 0);
  const totalTax = rows.reduce((s, r) => s + r.taxAmount, 0);
  const totalWithTax = totalAmount + totalTax;

  return (
    <section
      data-slot="tax-detail-table"
      className={cn("flex flex-col gap-3", className)}
      aria-labelledby="tax-detail-table-title"
    >
      <h3
        id="tax-detail-table-title"
        className="flex items-center gap-1.5 text-sm font-medium"
      >
        <CalculatorIcon className="size-4 text-primary" aria-hidden="true" />
        <span>税务明细</span>
      </h3>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <caption className="sr-only">
            税务明细，合计税额 {formatCurrency(totalTax)}
          </caption>
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-medium">项目</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">金额</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">税率</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">税额</th>
              <th scope="col" className="px-3 py-2 text-right font-medium">价税合计</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-3 py-2 font-medium">{row.name}</td>
                <td className="px-3 py-2 text-right tabular-nums">{formatCurrency(row.amount)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{formatPercent(row.taxRate)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{formatCurrency(row.taxAmount)}</td>
                <td className="px-3 py-2 text-right tabular-nums font-medium">
                  {formatCurrency(row.amount + row.taxAmount)}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                  暂无税务明细
                </td>
              </tr>
            ) : null}
          </tbody>
          {rows.length > 0 ? (
            <tfoot className="border-t bg-muted/30 font-semibold">
              <tr>
                <td className="px-3 py-2">合计</td>
                <td className="px-3 py-2 text-right tabular-nums">{formatCurrency(totalAmount)}</td>
                <td className="px-3 py-2 text-right text-muted-foreground">—</td>
                <td className="px-3 py-2 text-right tabular-nums">{formatCurrency(totalTax)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{formatCurrency(totalWithTax)}</td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </section>
  );
}

export { TaxDetailTable };
export type { TaxDetailTableProps };
