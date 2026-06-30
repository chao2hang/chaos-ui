"use client";
import { cn } from "@/lib/utils";

/**
 * @component ArticleLayout
 * @category Layout
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <ArticleLayout />
 * ```
 * 长文/帮助文档布局
 */
export interface ArticleLayoutProps {
  className?: string;
}

function ArticleLayout({ className }: ArticleLayoutProps) {
  return <div data-slot="article-layout" className={cn("", className)} />;
}

export { ArticleLayout };
