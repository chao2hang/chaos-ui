"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component QuickEntryGrid
 * @category business/dashboard
 * @since 0.7.0
 * @description 快捷入口网格
 * @keywords quick, entry, grid
 * @example
 * <QuickEntryGrid />
 */

interface QuickEntryGridProps {
  entries: Array<{
    id: string;
    icon?: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
  className?: string;
}

function QuickEntryGrid({ className }: QuickEntryGridProps) {
  return (
    <div data-slot="quick-entry-grid" className={cn("", className)}>
      {null}
    </div>
  );
}

export { QuickEntryGrid };
export type { QuickEntryGridProps };
