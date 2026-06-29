"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Affix
 * @category ui/primitives
 * @since 0.2.0
 * @description 钉住元素组件 / Affix component to pin elements on scroll
 * @keywords affix, sticky, pin, scroll, fixed
 * @example
 * <Affix offsetTop={64}>
 *   <Toolbar />
 * </Affix>
 */

interface AffixProps {
  /** Top offset in pixels / 距离顶部的偏移量 */
  offsetTop?: number;
  /** Bottom offset in pixels / 距离底部的偏移量 */
  offsetBottom?: number;
  /** Children content / 子内容 */
  children: React.ReactNode;
  /** Whether affix is active / 是否激活 */
  disabled?: boolean;
  /** Callback when affix state changes / 状态变更回调 */
  onChange?: (affixed: boolean) => void;
  /** Target container to listen scroll (default: window) / 监听滚动的容器 */
  target?: () => HTMLElement | Window;
  /** className for affix state / 固定状态类名 */
  className?: string;
  /** className for wrapper / 包裹器类名 */
  wrapperClassName?: string;
}

function Affix({
  offsetTop,
  offsetBottom,
  children,
  disabled = false,
  onChange,
  target,
  className,
  wrapperClassName,
}: AffixProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [affixed, setAffixed] = React.useState(false);
  const [placeholderStyle, setPlaceholderStyle] = React.useState<
    React.CSSProperties
  >({});
  // Hold latest target fn in a ref so the scroll effect doesn't re-bind every
  // render (target is a function whose identity changes inline).
  const targetRef = React.useRef(target);
  targetRef.current = target;

  const handleScroll = React.useCallback(() => {
    if (!wrapperRef.current || disabled) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const targetEl = targetRef.current?.() ?? window;
    let isAffixed = false;

    if (offsetTop !== undefined) {
      const targetRect =
        targetEl === window
          ? { top: 0, bottom: window.innerHeight }
          : (targetEl as HTMLElement).getBoundingClientRect();

      isAffixed = rect.top - targetRect.top < offsetTop;
    } else if (offsetBottom !== undefined) {
      const targetRect =
        targetEl === window
          ? { bottom: window.innerHeight }
          : (targetEl as HTMLElement).getBoundingClientRect();

      isAffixed = targetRect.bottom - rect.bottom < offsetBottom;
    }

    if (isAffixed !== affixed) {
      setAffixed(isAffixed);
      onChange?.(isAffixed);
      if (isAffixed) {
        // Capture the original left so the fixed element stays at its
        // horizontal position (position:fixed without left jumps to viewport 0).
        setPlaceholderStyle({
          width: rect.width,
          height: rect.height,
          left: rect.left,
        });
      } else {
        setPlaceholderStyle({});
      }
    }
  }, [affixed, disabled, offsetTop, offsetBottom, onChange]);

  React.useEffect(() => {
    const targetEl = targetRef.current?.() ?? window;
    targetEl.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      targetEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const affixStyle: React.CSSProperties = affixed
    ? offsetTop !== undefined
      ? {
          position: "fixed",
          top: offsetTop,
          left: placeholderStyle.left,
          width: placeholderStyle.width,
          zIndex: 50,
        }
      : {
          position: "fixed",
          bottom: offsetBottom,
          left: placeholderStyle.left,
          width: placeholderStyle.width,
          zIndex: 50,
        }
    : {};

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={placeholderStyle}>
      <div className={cn(affixed && className)} style={affixStyle}>
        {children}
      </div>
    </div>
  );
}

export { Affix };
export type { AffixProps };
