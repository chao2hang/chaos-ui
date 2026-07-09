"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { AlertTriangleIcon, DownloadIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ImportErrorTable
 * @category business/print
 * @since 0.7.0
 * @description 导入错误表 — displays validation errors produced during a
 * spreadsheet/CSV import, one row per offending record. Renders a summary
 * header (count + optional export), then a semantic table of errors.
 * @keywords import, error, table
 * @example
 * ```tsx
 * <ImportErrorTable
 *   errors={[{ row: 3, field: "amount", value: "abc", message: "金额必须为数字" }]}
 * />
 * ```
 */
interface ImportErrorTableProps {
  /** Validation errors, one per offending import row. */
  errors: Array<{
    /** 1-based source spreadsheet row number. */
    row: number;
    /** Field/column that failed validation, if known. */
    field?: string;
    /** The raw value that failed, if known. */
    value?: string;
    /** Human-readable reason the row was rejected. */
    message: string;
  }>;
  /** Called when the user clicks the export-errors button. */
  onExport?: () => void;
  className?: string;
}

function ImportErrorTable({
  errors,
  onExport,
  className,
}: ImportErrorTableProps) {
  const count = errors.length;

  return (
    <section
      data-slot="import-error-table"
      className={cn("flex flex-col gap-3", className)}
      aria-labelledby="import-error-table-title"
    >
      <div className="flex items-center justify-between gap-2">
        <h3
          id="import-error-table-title"
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          <AlertTriangleIcon
            className="text-destructive size-4"
            aria-hidden="true"
          />
          <span>导入错误</span>
          <span
            className="bg-destructive/10 text-destructive rounded-full px-2 py-0.5 text-xs font-semibold"
            aria-label={`共 ${count} 条错误`}
          >
            {count}
          </span>
        </h3>
        {onExport ? (
          <button
            type="button"
            onClick={onExport}
            className="hover:bg-muted inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
          >
            <DownloadIcon className="size-3.5" aria-hidden="true" />
            <span>导出错误</span>
          </button>
        ) : null}
      </div>

      {count === 0 ? (
        <p className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
          没有导入错误
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">导入错误明细，共 {count} 条</caption>
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-medium">
                  行号
                </th>
                <th scope="col" className="px-3 py-2 text-left font-medium">
                  字段
                </th>
                <th scope="col" className="px-3 py-2 text-left font-medium">
                  错误值
                </th>
                <th scope="col" className="px-3 py-2 text-left font-medium">
                  错误原因
                </th>
              </tr>
            </thead>
            <tbody>
              {errors.map((err, idx) => (
                <tr key={`${err.row}-${idx}`} className="border-t">
                  <td className="text-muted-foreground px-3 py-2 tabular-nums">
                    {err.row}
                  </td>
                  <td className="text-muted-foreground px-3 py-2">
                    {err.field ?? "—"}
                  </td>
                  <td className="max-w-[12rem] truncate px-3 py-2 font-mono text-xs">
                    {err.value ?? "—"}
                  </td>
                  <td className="text-destructive px-3 py-2">{err.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export { ImportErrorTable };
export type { ImportErrorTableProps };
