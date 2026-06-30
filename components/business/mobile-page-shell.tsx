"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component MobilePageShell
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端页面骨架
 * @keywords mobile, page, shell
 * @example
 * <MobilePageShell />
 */

interface MobilePageShellProps {
  title?: string;
  onBack?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function MobilePageShell({ className }: MobilePageShellProps) {
  return <div data-slot="mobile-page-shell" className={cn("", className)} />;
}

export { MobilePageShell };
export type { MobilePageShellProps };
