"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

/**
 * @component Separator
 * @category ui/primitives
 * @since 0.2.0
 * @description Horizontal or vertical visual separator line between content sections / 水平或垂直的视觉分隔线，用于分隔内容区域
 * @keywords separator, divider, line, horizontal, vertical
 * @example
 * <Separator />
 * <Separator orientation="vertical" className="h-6" />
 */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
