"use client";

import { cn } from "@/lib/utils";

/**
 * @component OaBridge
 * @category business/bill
 * @since 0.7.0
 * @description OA系统桥接
 * @keywords oa, bridge
 * @example
 * <OaBridge />
 */

interface OaBridgeProps {
  billId: string;
  billType: string;
  onSubmit?: (billId: string) => Promise<void>;
  className?: string;
}

function OaBridge({ className }: OaBridgeProps) {
  return (
    <div data-slot="oa-bridge" className={cn("", className)}>
      {null}
    </div>
  );
}

export { OaBridge };
export type { OaBridgeProps };
