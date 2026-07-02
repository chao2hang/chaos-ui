"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MaximizeIcon, MinimizeIcon } from "@/components/ui/icons";

/**
 * @component FullscreenToggle
 * @category ui/utility
 * @since 0.7.0
 * @description 全屏切换按钮 — 使用 Fullscreen API 进入/退出全屏。
 * / Fullscreen toggle button — uses the Fullscreen API.
 * @keywords fullscreen, toggle, maximize, minimize, expand
 * @example
 * <FullscreenToggle targetRef={containerRef} />
 */
interface FullscreenToggleProps {
  /** Ref to the element to fullscreen (defaults to document.documentElement)
   * / 目标元素 ref，默认为 document.documentElement */
  targetRef?: React.RefObject<HTMLElement | null>;
  /** Button size / 按钮大小 */
  size?: "default" | "sm" | "xs" | "icon" | "icon-sm" | "icon-xs";
  /** Variant / 按钮样式 */
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

function FullscreenToggle({
  targetRef,
  size = "icon-sm",
  variant = "ghost",
  className,
}: FullscreenToggleProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleChange = () =>
      setIsFullscreen(document.fullscreenElement !== null);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggle = () => {
    const el = targetRef?.current ?? document.documentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggle}
      className={cn(className)}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      data-slot="fullscreen-toggle"
    >
      {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
    </Button>
  );
}

export { FullscreenToggle };
export type { FullscreenToggleProps };
