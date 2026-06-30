"use client";

import { cn } from "@/lib/utils";

/**
 * @component ImportErrorTable
 * @category business/print
 * @since 0.7.0
 * @description 导入错误表
 * @keywords import, error, table
 * @example
 * <ImportErrorTable />
 */

interface ImportErrorTableProps {
  errors: Array<{
    row: number;
    field?: string;
    value?: string;
    message: string;
  }>;
  className?: string;
}

function ImportErrorTable({ className }: ImportErrorTableProps) {
  return (
    <div data-slot="import-error-table" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ImportErrorTable };
export type { ImportErrorTableProps };
