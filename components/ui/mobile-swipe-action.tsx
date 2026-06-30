"use client";
import { cn } from "@/lib/utils";

/**
 * @component MobileSwipeAction
 * @category UI
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <MobileSwipeAction />
 * ```
 * 滑动操作
 */
export interface MobileSwipeActionProps {
  className?: string;
}

function MobileSwipeAction({ className }: MobileSwipeActionProps) {
  return <div data-slot="mobile-swipe-action" className={cn("", className)} />;
}

export { MobileSwipeAction };
