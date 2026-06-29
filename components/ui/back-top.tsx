"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * @component BackTop
 * @category ui/primitives
 * @since 0.2.0
 * @description 回到顶部按钮 / Back to top button
 * @keywords back-top, scroll, top, up
 * @example
 * <BackTop />
 * <BackTop visibilityHeight={300} />
 */

interface BackTopProps {
  /** Visibility threshold (px scrolled before showing) / 显示阈值 */
  visibilityHeight?: number;
  /** Scroll target (default: window) / 滚动目标 */
  target?: () => HTMLElement | Window;
  /** Click callback / 点击回调 */
  onClick?: () => void;
  /** Custom children / 自定义内容 */
  children?: React.ReactNode;
  /** Button className / 按钮类名 */
  className?: string;
  /** Visibility duration (ms) / 显隐动画时长 */
  duration?: number;
  /** Position / 位置 */
  position?: {
    right?: number;
    bottom?: number;
  };
}

function BackTop({
  visibilityHeight = 400,
  target,
  onClick,
  children,
  className,
  duration = 300,
  position = { right: 24, bottom: 48 },
}: BackTopProps) {
  const [visible, setVisible] = React.useState(false);

  const scrollToTop = () => {
    const targetEl = target?.() ?? window;
    if (targetEl === window) {
      const start = window.scrollY;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start * (1 - easeOut));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    } else {
      (targetEl as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
    }
    onClick?.();
  };

  const handleScroll = React.useCallback(() => {
    const targetEl = target?.() ?? window;
    const scrollTop =
      targetEl === window
        ? window.scrollY
        : (targetEl as HTMLElement).scrollTop;
    setVisible(scrollTop > visibilityHeight);
  }, [visibilityHeight, target]);

  React.useEffect(() => {
    const targetEl = target?.() ?? window;
    targetEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => targetEl.removeEventListener("scroll", handleScroll);
  }, [handleScroll, target]);

  if (!visible) return null;

  return (
    <div
      data-slot="back-top"
      className={cn("fixed z-50 transition-opacity", className)}
      style={{
        right: position.right,
        bottom: position.bottom,
      }}
    >
      {children ?? (
        <Button
          variant="default"
          size="icon"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="shadow-lg"
        >
          <ArrowUp className="size-4" />
        </Button>
      )}
    </div>
  );
}

export { BackTop };
export type { BackTopProps };
