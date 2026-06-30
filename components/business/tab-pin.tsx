"use client";

import { cn } from "@/lib/utils";

/**
 * @component TabPin
 * @category business/ux
 * @since 0.7.0
 * @description 标签页固定
 * @keywords tab, pin
 * @example
 * <TabPin />
 */

interface TabPinProps {
  id: string;
  label: string;
  pinned?: boolean;
  onPin?: (id: string) => void;
  className?: string;
}

function TabPin({ className }: TabPinProps) {
  return (
    <div data-slot="tab-pin" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TabPin };
export type { TabPinProps };
