"use client";
import { cn } from "@/lib/utils";
/**
 * @component BillPrintTemplate
 * @category business/print
 * @since 0.7.0
 * @description 单据打印模板
 */
interface BillPrintTemplateProps {
  title: string;
  fields: Array<{ label: string; value: string }>;
  lines?: Array<Record<string, string>>;
  className?: string;
}
function BillPrintTemplate({
  title = "",
  fields = [],
  lines = [],
  className,
}: BillPrintTemplateProps) {
  return (
    <div
      data-slot="bill-print-template"
      className={cn(
        "rounded-lg border bg-white p-6 text-black print:shadow-none",
        className,
      )}
    >
      <h2 className="text-center text-lg font-bold">{title}</h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
        {fields.map((f) => (
          <div key={f.label} className="flex">
            <dt className="text-muted-foreground">{f.label}：</dt>
            <dd className="font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>
      {lines &&
        lines.length > 0 &&
        (() => {
          const first = lines[0];
          if (!first) return null;
          return (
            <table className="mt-4 w-full border-collapse text-sm">
              <thead>
                <tr>
                  {Object.keys(first).map((k) => (
                    <th
                      key={k}
                      className="bg-muted/40 border px-2 py-1 text-left"
                    >
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lines.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="border px-2 py-1">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })()}
    </div>
  );
}
export { BillPrintTemplate };
export type { BillPrintTemplateProps };
