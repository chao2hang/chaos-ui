"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component MobileListItem
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端列表项
 * @keywords mobile, list, item
 * @example
 * <MobileListItem />
 */

interface MobileListItemProps {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function MobileListItem({ className }: MobileListItemProps) {
  return <div data-slot="mobile-list-item" className={cn("", className)} />;
}

export { MobileListItem };
export type { MobileListItemProps };
