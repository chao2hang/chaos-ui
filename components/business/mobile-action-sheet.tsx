"use client";

import { cn } from "@/lib/utils";

/**
 * @component MobileActionSheet
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端操作表
 * @keywords mobile, action, sheet
 * @example
 * <MobileActionSheet />
 */

interface MobileActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actions: Array<{ label: string; onClick: () => void; danger?: boolean }>;
  className?: string;
}

function MobileActionSheet({ className }: MobileActionSheetProps) {
  return <div data-slot="mobile-action-sheet" className={cn("", className)} />;
}

export { MobileActionSheet };
export type { MobileActionSheetProps };
