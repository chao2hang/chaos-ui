"use client";
import { cn } from "@/lib/utils";

/**
 * @component SplitScreen
 * @category Layout
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <SplitScreen />
 * ```
 * 左右分屏布局
 */
export interface SplitScreenProps {
  className?: string;
}

function SplitScreen({ className }: SplitScreenProps) {
  return <div data-slot="split-screen" className={cn("", className)} />;
}

export { SplitScreen };
