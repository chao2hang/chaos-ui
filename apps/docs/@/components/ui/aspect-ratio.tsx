import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component AspectRatio
 * @category ui/layout
 * @since 0.2.0
 * @description Maintains a fixed aspect ratio container for embedded media and images / 保持固定宽高比的容器，用于嵌入媒体和图片
 * @keywords aspect-ratio, layout, container, media, image
 * @example
 * <AspectRatio ratio={16 / 9}>
 *   <img src="image.jpg" alt="Example" />
 * </AspectRatio>
 */
function AspectRatio({
  ratio = 16 / 9,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { ratio?: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ aspectRatio: ratio, ...style }}
      className={cn("relative w-full overflow-hidden", className)}
      {...props}
    />
  );
}

export { AspectRatio };
