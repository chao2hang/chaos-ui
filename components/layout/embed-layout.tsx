"use client";
import { cn } from "@/lib/utils";

/**
 * @component EmbedLayout
 * @category Layout
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <EmbedLayout />
 * ```
 * 嵌入第三方系统布局
 */
export interface EmbedLayoutProps {
  className?: string;
}

function EmbedLayout({ className }: EmbedLayoutProps) {
  return <div data-slot="embed-layout" className={cn("", className)} />;
}

export { EmbedLayout };
