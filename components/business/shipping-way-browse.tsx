"use client";

import { cn } from "@/lib/utils";

/**
 * @component ShippingWayBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 运输方式选择器
 * @keywords shipping, way, browse
 * @example
 * <ShippingWayBrowse />
 */

interface ShippingWayBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function ShippingWayBrowse({ className }: ShippingWayBrowseProps) {
  return (
    <div data-slot="shipping-way-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ShippingWayBrowse };
export type { ShippingWayBrowseProps };
