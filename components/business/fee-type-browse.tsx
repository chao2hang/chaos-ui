"use client";

import { cn } from "@/lib/utils";

/**
 * @component FeeTypeBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 费用类型选择器
 * @keywords fee, type, browse
 * @example
 * <FeeTypeBrowse />
 */

interface FeeTypeBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function FeeTypeBrowse({ className }: FeeTypeBrowseProps) {
  return (
    <div data-slot="fee-type-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { FeeTypeBrowse };
export type { FeeTypeBrowseProps };
