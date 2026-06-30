"use client";

import { cn } from "@/lib/utils";

/**
 * @component WriteoffBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 核销单选择器
 * @keywords writeoff, browse
 * @example
 * <WriteoffBrowse />
 */

interface WriteoffBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function WriteoffBrowse({ className }: WriteoffBrowseProps) {
  return (
    <div data-slot="writeoff-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { WriteoffBrowse };
export type { WriteoffBrowseProps };
