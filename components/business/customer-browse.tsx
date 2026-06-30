"use client";

import { cn } from "@/lib/utils";

/**
 * @component CustomerBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 客户选择器
 * @keywords customer, browse
 * @example
 * <CustomerBrowse />
 */

interface CustomerBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  multiple?: boolean;
  className?: string;
}

function CustomerBrowse({ className }: CustomerBrowseProps) {
  return (
    <div data-slot="customer-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { CustomerBrowse };
export type { CustomerBrowseProps };
