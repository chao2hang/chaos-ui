"use client";

import { cn } from "@/lib/utils";

/**
 * @component ProductBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 商品选择器
 * @keywords product, browse
 * @example
 * <ProductBrowse />
 */

interface ProductBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  multiple?: boolean;
  className?: string;
}

function ProductBrowse({ className }: ProductBrowseProps) {
  return (
    <div data-slot="product-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ProductBrowse };
export type { ProductBrowseProps };
