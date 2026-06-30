"use client";

import { cn } from "@/lib/utils";

/**
 * @component WarehouseBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 仓库选择器
 * @keywords warehouse, browse
 * @example
 * <WarehouseBrowse />
 */

interface WarehouseBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function WarehouseBrowse({ className }: WarehouseBrowseProps) {
  return (
    <div data-slot="warehouse-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { WarehouseBrowse };
export type { WarehouseBrowseProps };
