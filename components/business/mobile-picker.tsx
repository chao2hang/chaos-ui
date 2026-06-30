"use client";

import { cn } from "@/lib/utils";

/**
 * @component MobilePicker
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端选择器
 * @keywords mobile, picker
 * @example
 * <MobilePicker />
 */

interface MobilePickerProps {
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

function MobilePicker({ className }: MobilePickerProps) {
  return <div data-slot="mobile-picker" className={cn("", className)} />;
}

export { MobilePicker };
export type { MobilePickerProps };
