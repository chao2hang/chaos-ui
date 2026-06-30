"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component MobileInfiniteScroll
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端无限滚动
 * @keywords mobile, infinite, scroll
 * @example
 * <MobileInfiniteScroll />
 */

interface MobileInfiniteScrollProps {
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function MobileInfiniteScroll({ className }: MobileInfiniteScrollProps) {
  return (
    <div data-slot="mobile-infinite-scroll" className={cn("", className)} />
  );
}

export { MobileInfiniteScroll };
export type { MobileInfiniteScrollProps };
