"use client";
import { cn } from "@/lib/utils";

/**
 * @component BarListCard
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <BarListCard />
 * ```
 * 排名列表卡
 */
export interface BarListCardProps {
  className?: string;
}

function BarListCard({ className }: BarListCardProps) {
  return <div data-slot="bar-list-card" className={cn("", className)} />;
}

export { BarListCard };
