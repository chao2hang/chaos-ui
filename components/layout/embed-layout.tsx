"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component EmbedLayout
 * @category Layout
 * @since 1.0.0-beta.0
 * @description 嵌入第三方系统布局 — 填满父级高度（`h-full`），可选顶部标题栏与 flex-1 可滚动内容区。
 *   宿主（iframe / 卡片 / 抽屉）应给根节点明确高度；需要视口全高时传 `className="h-svh"` 或 `h-screen`。
 * @param header 可选顶部标题/操作栏。
 * @param children 主体内容区（flex-1，可滚动）。
 * @param className 根元素附加类名（可覆盖高度，如 `h-[360px]` / `h-svh`）。
 * @example
 * ```tsx
 * <div className="h-[480px]">
 *   <EmbedLayout header={<Header />}>
 *     <iframe src="…" title="embed" className="h-full w-full" />
 *   </EmbedLayout>
 * </div>
 * ```
 */
export interface EmbedLayoutProps {
  /** Optional top bar (title/actions) rendered inside a `<header>`. */
  header?: React.ReactNode;
  /** Main embeddable content area (flex-1, scrollable). */
  children?: React.ReactNode;
  className?: string;
}

function EmbedLayout({ header, children, className }: EmbedLayoutProps) {
  return (
    <div
      data-slot="embed-layout"
      className={cn(
        // Fill the host box — not the browser viewport. Viewport-sized embeds pass h-svh/h-screen.
        "bg-background flex h-full min-h-0 w-full flex-col",
        className,
      )}
    >
      {header !== undefined && header !== null && header !== false ? (
        <header className="bg-background shrink-0 border-b">{header}</header>
      ) : null}
      <main className="min-h-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export { EmbedLayout };
