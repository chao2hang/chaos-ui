import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Flex
 * @category ui/primitives
 * @since 0.2.0
 * @description 弹性布局组件 / Flexible layout component (antd Flex equivalent)
 * @keywords flex, layout, align, justify, wrap, gap
 * @example
 * <Flex justify="center" align="center" gap="md" wrap>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 */

type FlexGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | number;

const gapMap: Record<string, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const justifyMap: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignMap: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const directionMap: Record<string, string> = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
};

interface FlexProps extends React.ComponentProps<"div"> {
  /** Flex direction / 主轴方向 */
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  /** Justify content / 主轴对齐 */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /** Align items / 交叉轴对齐 */
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  /** Gap between items / 间距 */
  gap?: FlexGap;
  /** Whether to wrap / 是否换行 */
  wrap?: boolean;
  /** Flex grow value / flex-grow 值 */
  grow?: number;
  /** Flex shrink value / flex-shrink 值 */
  shrink?: number;
  /** Flex basis / flex-basis */
  basis?: string | number;
}

function Flex({
  className,
  direction = "row",
  justify,
  align,
  gap = "md",
  wrap = false,
  grow,
  shrink,
  basis,
  style,
  ...props
}: FlexProps) {
  const gapClass =
    typeof gap === "number" ? undefined : gapMap[gap] ?? gapMap.md;
  const computedStyle: React.CSSProperties = {
    ...style,
    ...(typeof gap === "number" ? { gap: `${gap}px` } : {}),
    ...(grow !== undefined ? { flexGrow: grow } : {}),
    ...(shrink !== undefined ? { flexShrink: shrink } : {}),
    ...(basis !== undefined
      ? { flexBasis: typeof basis === "number" ? `${basis}px` : basis }
      : {}),
  };

  return (
    <div
      data-slot="flex"
      className={cn(
        "flex",
        directionMap[direction],
        gapClass,
        justify && justifyMap[justify],
        align && alignMap[align],
        wrap && "flex-wrap",
        className,
      )}
      style={computedStyle}
      {...props}
    />
  );
}

export { Flex };
export type { FlexProps };
