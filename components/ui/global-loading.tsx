"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "@/components/ui/icons";

/**
 * @component GlobalLoading
 * @category ui/feedback
 * @since 0.2.0
 * @description Full-screen or inline loading indicator with spinner and optional text / 全屏或内联加载指示器，带旋转图标和可选文字
 * @keywords loading, spinner, overlay, fullscreen, loader
 * @example
 * <GlobalLoading loading={isLoading} text="Fetching data..." />
 * <GlobalLoading loading={isLoading} fullscreen={false} />
 */

interface GlobalLoadingProps extends React.ComponentProps<"div"> {
  /** Whether loading is active / 是否正在加载 */
  loading?: boolean;
  /** Loading text / 加载文字 */
  text?: string;
  /** Use fullscreen overlay (default: true) / 使用全屏遮罩（默认 true） */
  fullscreen?: boolean;
  /** Show spinner icon (default: true) / 显示旋转图标（默认 true） */
  spinner?: boolean;
}

function GlobalLoading({
  loading,
  text = "Loading...",
  fullscreen = true,
  spinner = true,
  className,
  ...props
}: GlobalLoadingProps) {
  if (!loading) return null;

  return (
    <div
      data-slot="global-loading"
      data-fullscreen={fullscreen}
      className={cn(
        "bg-background/80 flex flex-col items-center justify-center gap-3 backdrop-blur-sm",
        fullscreen ? "fixed inset-0 z-[100]" : "min-h-20",
        className,
      )}
      {...props}
    >
      {spinner && <Loader2Icon className="text-primary size-8 animate-spin" />}
      {text && (
        <span
          data-slot="global-loading-text"
          className="text-muted-foreground text-sm"
        >
          {text}
        </span>
      )}
    </div>
  );
}

export { GlobalLoading };
export type { GlobalLoadingProps };
