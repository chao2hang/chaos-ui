import * as React from "react";
import { cn } from "@/lib/utils";

interface BlankLayoutProps extends React.ComponentProps<"div"> {
  centered?: boolean;
  padded?: boolean;
}

/**
 * @component BlankLayout
 * @category layout/admin
 * @since 0.2.0
 * @description Minimal blank layout with optional centering and padding, ideal for login pages or standalone forms / 极简空白布局，支持可选居中和内边距，适用于登录页或独立表单
 * @keywords blank, layout, centered, padded, minimal, login
 * @example
 * <BlankLayout centered padded>
 *   <LoginForm />
 * </BlankLayout>
 */
export function BlankLayout({
  centered = false,
  padded = true,
  className,
  children,
  ...props
}: BlankLayoutProps) {
  return (
    <div
      data-slot="blank-layout"
      className={cn(
        "bg-background h-full min-h-0",
        padded && "p-4",
        centered && "flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
