import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component ErrorLayout
 * @category layout/admin
 * @since 0.2.0
 * @description Centered error page layout with muted background for 404/500 and other error states / 居中错误页面布局，用于 404/500 等错误状态展示
 * @keywords error, layout, 404, 500, centered, error-page
 * @example
 * <ErrorLayout>
 *   <h1>404 Not Found</h1>
 * </ErrorLayout>
 */
export function ErrorLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="error-layout"
      className={cn(
        "bg-muted/30 flex min-h-screen flex-col items-center justify-center p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
