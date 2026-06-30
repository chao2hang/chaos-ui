"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component MobileTabBar
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端标签栏
 * @keywords mobile, tab, bar
 * @example
 * <MobileTabBar />
 */

interface MobileTabBarProps {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

function MobileTabBar({ className }: MobileTabBarProps) {
  return <div data-slot="mobile-tab-bar" className={cn("", className)} />;
}

export { MobileTabBar };
export type { MobileTabBarProps };
