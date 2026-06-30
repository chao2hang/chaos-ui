"use client";

import { cn } from "@/lib/utils";

/**
 * @component SalesOrderBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 销售订单选择器
 * @keywords sales, order, browse
 * @example
 * <SalesOrderBrowse />
 */

interface SalesOrderBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function SalesOrderBrowse({ className }: SalesOrderBrowseProps) {
  return (
    <div data-slot="sales-order-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { SalesOrderBrowse };
export type { SalesOrderBrowseProps };
