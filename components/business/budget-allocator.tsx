"use client";
import { cn } from "@/lib/utils";

/**
 * @component BudgetAllocator
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <BudgetAllocator />
 * ```
 * 预算分配组件
 */
export interface BudgetAllocatorProps {
  className?: string;
}

function BudgetAllocator({ className }: BudgetAllocatorProps) {
  return <div data-slot="budget-allocator" className={cn("", className)} />;
}

export { BudgetAllocator };
