"use client";
import { cn } from "@/lib/utils";

/**
 * @component OverviewPage
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <OverviewPage />
 * ```
 * 总览页面模板
 */
export interface OverviewPageProps {
  className?: string;
}

function OverviewPage({ className }: OverviewPageProps) {
  return <div data-slot="overview-page" className={cn("", className)} />;
}

export { OverviewPage };
