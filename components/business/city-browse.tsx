"use client";

import { cn } from "@/lib/utils";

/**
 * @component CityBrowse
 * @category business/picker
 * @since 0.7.0
 * @description 城市选择器
 * @keywords city, browse
 * @example
 * <CityBrowse />
 */

interface CityBrowseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (item: unknown) => void;
  className?: string;
}

function CityBrowse({ className }: CityBrowseProps) {
  return (
    <div data-slot="city-browse" className={cn("", className)}>
      {null}
    </div>
  );
}

export { CityBrowse };
export type { CityBrowseProps };
