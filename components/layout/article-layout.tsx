"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ArticleLayout
 * @category Layout
 * @since 1.0.0-beta.0
 * @description 长文/帮助文档布局 — 居中正文、可选标题、可选粘性目录侧栏、可选页脚。
 * @param title 顶部标题节点，渲染为文章头部。
 * @param toc 目录节点，渲染为右侧粘性侧栏（窄屏隐藏）。
 * @param footer 页脚节点。
 * @param children 文章正文内容。
 * @param className 根元素附加类名。
 * @example
 * ```tsx
 * <ArticleLayout title={<h1>指南</h1>} toc={<Toc />}>
 *   <p>正文内容…</p>
 * </ArticleLayout>
 * ```
 */
export interface ArticleLayoutProps {
  /** Optional article header title rendered inside an `<header>`. */
  title?: React.ReactNode;
  /** Optional table-of-contents rendered as a sticky `<aside>`. */
  toc?: React.ReactNode;
  /** Optional article footer. */
  footer?: React.ReactNode;
  /** Article body content. */
  children?: React.ReactNode;
  className?: string;
}

function ArticleLayout({
  title,
  toc,
  footer,
  children,
  className,
}: ArticleLayoutProps) {
  const hasToc = toc !== undefined && toc !== null && toc !== false;
  return (
    <div
      data-slot="article-layout"
      className={cn("mx-auto w-full max-w-3xl px-6 py-10", className)}
    >
      <article>
        {title !== undefined && title !== null && title !== false ? (
          <header className="mb-8 border-b pb-4">{title}</header>
        ) : null}
        {hasToc ? (
          <div className="flex gap-8">
            <div className="min-w-0 flex-1">{children}</div>
            <aside
              className="hidden w-56 shrink-0 lg:block"
              aria-label="目录"
            >
              <div className="sticky top-8">{toc}</div>
            </aside>
          </div>
        ) : (
          <div className="min-w-0">{children}</div>
        )}
        {footer !== undefined && footer !== null && footer !== false ? (
          <footer className="mt-12 border-t pt-6">{footer}</footer>
        ) : null}
      </article>
    </div>
  );
}

export { ArticleLayout };
