"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

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
  /** Loading text (visible). Spinner uses the same string for a11y when set. / 可见加载文案 */
  text?: string;
  /** Use fullscreen overlay (default: true) / 使用全屏遮罩（默认 true） */
  fullscreen?: boolean;
  /** Show spinner icon (default: true) / 显示旋转图标（默认 true） */
  spinner?: boolean;
}

function GlobalLoading({
  loading,
  text,
  fullscreen = true,
  spinner = true,
  className,
  style,
  ...props
}: GlobalLoadingProps) {
  if (!loading) return null;

  const accessibleLabel = text || "Loading";

  return (
    <div
      data-slot="global-loading"
      data-fullscreen={fullscreen}
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "bg-background/80 flex flex-col items-center justify-center gap-3 backdrop-blur-sm",
        // token band — see styles.css --z-index-overlay (1040)
        fullscreen ? "fixed inset-0 z-[var(--z-index-overlay)]" : "min-h-20",
        className,
      )}
      style={style}
      {...props}
    >
      {spinner && (
        <Spinner
          size="lg"
          color="primary"
          label={accessibleLabel}
          // Decorative when visible text is present (parent has role=status)
          {...(text ? { "aria-hidden": true } : {})}
        />
      )}
      {text ? (
        <span
          data-slot="global-loading-text"
          className="text-muted-foreground text-sm"
        >
          {text}
        </span>
      ) : null}
    </div>
  );
}

export { GlobalLoading };
export type { GlobalLoadingProps };
