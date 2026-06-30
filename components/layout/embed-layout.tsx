"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component EmbedLayout
 * @category Layout
 * @since 1.0.0-beta.0
 * @description 嵌入第三方系统布局 — 全高框架，可选顶部标题栏与 flex-1 内容区。
 * @param header 可选顶部标题/操作栏。
 * @param children 主体内容区（flex-1，可滚动）。
 * @param className 根元素附加类名。
 * @example
 * ```tsx
 * <EmbedLayout header={<Header />}>
 *   <iframe src="…" title="embed" />
 * </EmbedLayout>
 * ```
 */
export interface EmbedLayoutProps {
  /** Optional top bar (title/actions) rendered inside a `<header>`. */
  header?: React.ReactNode;
  /** Main embeddable content area (flex-1, scrollable). */
  children?: React.ReactNode;
  className?: string;
}

function EmbedLayout({
  header,
  children,
  className,
}: EmbedLayoutProps) {
  return (
    <div
      data-slot="embed-layout"
      className={cn("flex h-screen w-full flex-col", className)}
    >
      {header !== undefined && header !== null && header !== false ? (
        <header className="shrink-0 border-b">{header}</header>
      ) : null}
      <main className="min-h-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export { EmbedLayout };
