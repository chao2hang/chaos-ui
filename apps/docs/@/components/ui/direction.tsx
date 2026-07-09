"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component Direction
 * @category ui/utilities
 * @since 0.8.0
 * @description Sets text direction (LTR/RTL) for internationalization. Wraps children with `dir` attribute and RTL-aware CSS logical properties. / 设置文本方向（LTR/RTL）以支持国际化，包装子元素并应用 RTL 感知的 CSS 逻辑属性。
 * @keywords direction, rtl, ltr, internationalization, i18n, arabic, hebrew
 * @example
 * <Direction dir="rtl">
 *   <p>مرحبا بالعالم</p>
 * </Direction>
 */

type DirectionValue = "ltr" | "rtl";

interface DirectionProps extends React.ComponentProps<"div"> {
  /** Text direction / 文本方向 */
  dir?: DirectionValue;
}

export function Direction({
  dir = "ltr",
  className,
  children,
  ...props
}: DirectionProps) {
  return (
    <div
      data-slot="direction"
      data-dir={dir}
      dir={dir}
      className={cn(dir === "rtl" && "[direction:rtl]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export type { DirectionProps, DirectionValue };
