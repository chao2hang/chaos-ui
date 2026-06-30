"use client";

import { cn } from "@/lib/utils";

/**
 * @component SerialNumberManager
 * @category business/bill
 * @since 0.7.0
 * @description 编号规则管理器
 * @keywords serial, number, manager
 * @example
 * <SerialNumberManager />
 */

interface SerialNumberManagerProps {
  rules: Array<{
    prefix: string;
    dateFormat: string;
    zeroFill: number;
    separator: string;
  }>;
  onChange?: (rules: unknown[]) => void;
  className?: string;
}

function SerialNumberManager({ className }: SerialNumberManagerProps) {
  return (
    <div data-slot="serial-number-manager" className={cn("", className)}>
      {null}
    </div>
  );
}

export { SerialNumberManager };
export type { SerialNumberManagerProps };
