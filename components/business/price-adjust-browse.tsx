"use client";

import { cn } from "@/lib/utils";

/**
 * @component PriceAdjustBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 调价单选择器
 * @keywords price, adjust, browse
 * @example
 * <PriceAdjustBrowse />
 */

interface PriceAdjustBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function PriceAdjustBrowse({ className }: PriceAdjustBrowseProps) {
  return (
    <div data-slot="price-adjust-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PriceAdjustBrowse };
export type { PriceAdjustBrowseProps };
