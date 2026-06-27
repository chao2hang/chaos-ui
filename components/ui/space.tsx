import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Space
 * @category ui/primitives
 * @since 0.2.0
 * @description 原子级布局间距组件 / Atomic layout spacing component
 * @keywords space, layout, gap, spacing
 * @example
 * <Space direction="horizontal" size="md">
 *   <Button>A</Button>
 *   <Button>B</Button>
 * </Space>
 */

type SpaceSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

const sizeMap: Record<string, string> = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignMap: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

interface SpaceProps extends React.ComponentProps<"div"> {
  /** Direction of the layout / 布局方向 */
  direction?: "horizontal" | "vertical";
  /** Spacing size / 间距大小 */
  size?: SpaceSize;
  /** Align items / 对齐方式 */
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  /** Whether to wrap / 是否换行 */
  wrap?: boolean;
}

function Space({
  className,
  direction = "horizontal",
  size = "md",
  align,
  wrap = false,
  ...props
}: SpaceProps) {
  const isVertical = direction === "vertical";
  const gapClass =
    typeof size === "number" ? undefined : sizeMap[size] ?? sizeMap.md;
  const style: React.CSSProperties = { ...props.style };
  if (typeof size === "number") {
    style.gap = `${size}px`;
  }

  return (
    <div
      data-slot="space"
      className={cn(
        "flex",
        isVertical ? "flex-col" : "flex-row",
        gapClass,
        align && alignMap[align],
        wrap && "flex-wrap",
        className,
      )}
      style={style}
      {...props}
    />
  );
}

export { Space };
export type { SpaceProps };
