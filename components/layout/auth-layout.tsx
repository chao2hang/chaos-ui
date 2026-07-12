"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component AuthLayout
 * @category layout
 * @since 0.3.0
 * @description Authentication page layout. Supports single-column (centered card)
 * and split-screen (brand left + form right) variants. Collapses to single
 * column on mobile. Includes optional `footer` slot for copyright / ICP
 * filing information. / 认证页布局，支持单栏居中和双栏（品牌+表单）模式，含底部版权 slot
 * @example
 * <AuthLayout variant="split" brand={<BrandPanel />} footer={<span>© 2026 Chaos · 京ICP备xxxxx号</span>}>
 *   <LoginForm />
 * </AuthLayout>
 */

interface AuthLayoutProps extends React.ComponentProps<"div"> {
  /** Layout variant / 布局模式 */
  variant?: "centered" | "split";
  /** Brand panel content (left side in split mode) / 品牌展示区 */
  brand?: React.ReactNode;
  /** Brand panel background class (used when brand is a string or empty) / 品牌区背景样式 */
  brandClassName?: string;
  /**
   * Background style for the entire layout root.
   * Accepts preset keywords or a raw CSS background value (gradient, color, etc.).
   * / 整体布局背景样式，支持预设关键字或自定义 CSS background 值。
   * @since 1.2.0
   * @example
   * <AuthLayout background="slate" />
   * <AuthLayout background="linear-gradient(to bottom, #f0f9ff, #e0f2fe)" />
   */
  background?:
    "default" | "slate" | "slate-soft" | "primary-soft" | "dark" | string;
  /** Brand panel width ratio (default: 1/2) / 品牌区宽度比例 */
  brandWidth?: "1/3" | "1/2" | "2/3";
  /** Brand panel vertical alignment / 品牌区垂直对齐 */
  brandAlign?: "start" | "center" | "end";
  /** Brand panel horizontal alignment / 品牌区水平对齐 */
  brandJustify?: "start" | "center" | "end";
  /** Brand panel padding / 品牌区内边距 */
  brandPadding?: string;
  /** Maximum width of the form panel / 表单区最大宽度 */
  formMaxWidth?: string;
  /** Form panel vertical alignment / 表单区垂直对齐 */
  formAlign?: "start" | "center" | "end";
  /** Form panel padding / 表单区内边距 */
  formPadding?: string;
  /** Hide brand panel on screens smaller than this breakpoint / 品牌区隐藏断点 */
  brandHideBelow?: "sm" | "md" | "lg";
  /**
   * Footer content (bottom of the form panel in split mode, or below the
   * card in centered mode). Use for copyright, ICP filing, legal links.
   * / 底部内容（版权/备案/法律链接）
   */
  footer?: React.ReactNode;
  /** Footer class name / 底部样式 */
  footerClassName?: string;
}

const brandWidthMap = {
  "1/3": "lg:w-1/3",
  "1/2": "lg:w-1/2",
  "2/3": "lg:w-2/3",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

const hideBelowMap = {
  sm: "hidden sm:flex",
  md: "hidden md:flex",
  lg: "hidden lg:flex",
};

const backgroundPresetMap: Record<string, string> = {
  default: "bg-background",
  slate: "bg-slate-50 dark:bg-slate-950",
  "slate-soft": "bg-slate-50/50 dark:bg-slate-950/50",
  "primary-soft":
    "from-primary/10 via-background to-secondary/10 bg-gradient-to-br",
  dark: "bg-slate-900 dark:bg-black",
};

function AuthLayout({
  variant = "centered",
  brand,
  brandClassName,
  background = "default",
  brandWidth = "1/2",
  brandAlign = "center",
  brandJustify = "center",
  brandPadding,
  formMaxWidth = "420px",
  formAlign = "center",
  formPadding,
  brandHideBelow = "lg",
  footer,
  footerClassName,
  className,
  children,
  ...props
}: AuthLayoutProps) {
  const bgClass = backgroundPresetMap[background] ?? "";
  const bgStyle = bgClass ? undefined : { background };
  const rootClassName = bgClass || "bg-background";
  if (variant === "split" || brand) {
    const hideBelowClasses = hideBelowMap[brandHideBelow] ?? hideBelowMap.lg;
    return (
      <div
        data-slot="auth-layout"
        data-variant="split"
        className={cn("flex h-full min-h-0", rootClassName, className)}
        style={bgStyle}
        {...props}
      >
        {/* Brand panel — configurable visibility breakpoint, width, alignment */}
        <div
          className={cn(
            "from-primary/10 via-primary/5 to-background border-r bg-gradient-to-br lg:flex-col",
            hideBelowClasses,
            brandWidthMap[brandWidth],
            alignMap[brandAlign],
            justifyMap[brandJustify],
            brandClassName,
          )}
          style={brandPadding ? { padding: brandPadding } : undefined}
        >
          {brand ?? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-2xl text-2xl font-bold">
                C
              </div>
              <div className="text-xl font-semibold">Chaos UI</div>
              <div className="text-muted-foreground max-w-sm text-sm">
                Enterprise management platform
              </div>
            </div>
          )}
        </div>
        {/* Form panel — full width on mobile, configurable alignment/padding */}
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center p-4 lg:p-8",
            alignMap[formAlign],
          )}
          style={formPadding ? { padding: formPadding } : undefined}
        >
          <div className="w-full" style={{ maxWidth: formMaxWidth }}>
            {children}
          </div>
          {footer && (
            <div
              className={cn(
                "text-muted-foreground/60 w-full px-4 py-3 text-center text-xs",
                footerClassName,
              )}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Centered variant (original)
  return (
    <div
      data-slot="auth-layout"
      data-variant="centered"
      className={cn(
        "flex h-full min-h-0 flex-col items-center justify-center p-4",
        rootClassName,
        className,
      )}
      style={bgStyle}
      {...props}
    >
      <div className="w-full" style={{ maxWidth: formMaxWidth }}>
        {children}
      </div>
      {footer && (
        <div
          className={cn(
            "text-muted-foreground/60 mt-4 w-full px-4 py-3 text-center text-xs",
            footerClassName,
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

export { AuthLayout };
export type { AuthLayoutProps };
