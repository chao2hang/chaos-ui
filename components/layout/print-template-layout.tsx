"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component PrintTemplateLayout
 * @category Layout
 * @since 1.0.0-beta.0
 * @description 打印模板布局 — 居中白色 A4 页面，含标题与正文，含 `print:` 样式以干净打印。
 * @param title 页面标题（渲染为 `<h1>`）。
 * @param children 页面正文。
 * @param className 根元素附加类名。
 * @example
 * ```tsx
 * <PrintTemplateLayout title="出库单">
 *   <InvoiceBody />
 * </PrintTemplateLayout>
 * ```
 */
export interface PrintTemplateLayoutProps {
  /** Page title rendered as an `<h1>`. */
  title?: string;
  /** Page body content. */
  children?: React.ReactNode;
  className?: string;
}

function PrintTemplateLayout({
  title,
  children,
  className,
}: PrintTemplateLayoutProps) {
  return (
    <div
      data-slot="print-template-layout"
      className={cn(
        "mx-auto w-full max-w-[210mm] bg-white p-8 text-black shadow-sm print:shadow-none print:p-0",
        className,
      )}
    >
      {title !== undefined && title !== "" ? (
        <header className="mb-6 border-b border-black/20 pb-3 print:border-black">
          <h1 className="text-xl font-bold">{title}</h1>
        </header>
      ) : null}
      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}

export { PrintTemplateLayout };
