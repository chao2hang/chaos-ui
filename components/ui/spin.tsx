"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

/**
 * @component Spin
 * @category ui/primitives
 * @since 0.2.0
 * @description 局部加载包裹组件 / Spin wrapper for partial loading (antd Spin equivalent)
 * @keywords spin, loading, wrapper, overlay, partial
 * @example
 * <Spin spinning={loading} tip="Loading...">
 *   <Content />
 * </Spin>
 */

interface SpinProps {
  /** Whether spinning / 是否加载中 */
  spinning?: boolean;
  /** Loading tip text / 加载提示文本 */
  tip?: React.ReactNode;
  /** Spinner size / 大小 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Delay before showing spinner (ms) / 延迟显示 */
  delay?: number;
  /** Wrapped content / 包裹的内容 */
  children?: React.ReactNode;
  /** Custom indicator / 自定义指示器 */
  indicator?: React.ReactNode;
  /** Wrapper className / 包裹器类名 */
  className?: string;
  /** Content wrapper className / 内容包裹器类名 */
  contentClassName?: string;
}

function Spin({
  spinning = true,
  tip,
  size = "md",
  delay = 0,
  children,
  indicator,
  className,
  contentClassName,
}: SpinProps) {
  const [show, setShow] = React.useState(spinning && delay === 0);

  React.useEffect(() => {
    if (spinning && delay > 0) {
      // Hide during the delay window, then show after it elapses.
      setShow(false);
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }
    setShow(spinning);
  }, [spinning, delay]);

  if (!children) {
    return (
      <div
        data-slot="spin"
        className={cn("inline-flex flex-col items-center gap-2", className)}
      >
        {indicator ?? <Spinner size={size} />}
        {tip && <span className="text-sm text-muted-foreground">{tip}</span>}
      </div>
    );
  }

  return (
    <div
      data-slot="spin"
      className={cn("relative", className)}
    >
      <div
        className={cn(
          "transition-opacity",
          show && "opacity-30 pointer-events-none",
          contentClassName,
        )}
      >
        {children}
      </div>
      {show && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
          {indicator ?? <Spinner size={size} />}
          {tip && (
            <span className="text-sm text-muted-foreground">{tip}</span>
          )}
        </div>
      )}
    </div>
  );
}

export { Spin };
export type { SpinProps };
