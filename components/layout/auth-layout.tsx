"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component AuthLayout
 * @category layout
 * @since 0.3.0
 * @description Authentication page layout. Supports single-column (centered card)
 * and split-screen (brand left + form right) variants. Collapses to single
 * column on mobile. / 认证页布局，支持单栏居中和双栏（品牌+表单）模式
 * @example
 * <AuthLayout variant="split" brand={<BrandPanel />}>
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
  /** Maximum width of the form panel / 表单区最大宽度 */
  formMaxWidth?: string;
}

function AuthLayout({
  variant = "centered",
  brand,
  brandClassName,
  formMaxWidth = "420px",
  className,
  children,
  ...props
}: AuthLayoutProps) {
  if (variant === "split" || brand) {
    return (
      <div
        data-slot="auth-layout"
        data-variant="split"
        className={cn(
          "flex min-h-svh bg-background",
          className,
        )}
        {...props}
      >
        {/* Brand panel — hidden on mobile */}
        <div
          className={cn(
            "hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background border-r",
            brandClassName,
          )}
        >
          {brand ?? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold">
                C
              </div>
              <div className="text-xl font-semibold">Chaos UI</div>
              <div className="max-w-sm text-sm text-muted-foreground">
                Enterprise management platform
              </div>
            </div>
          )}
        </div>
        {/* Form panel — full width on mobile, half on desktop */}
        <div className="flex flex-1 items-center justify-center p-4 lg:p-8">
          <div className="w-full" style={{ maxWidth: formMaxWidth }}>
            {children}
          </div>
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
        "flex min-h-svh items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4",
        className,
      )}
      {...props}
    >
      <div className="w-full" style={{ maxWidth: formMaxWidth }}>
        {children}
      </div>
    </div>
  );
}

export { AuthLayout };
export type { AuthLayoutProps };
