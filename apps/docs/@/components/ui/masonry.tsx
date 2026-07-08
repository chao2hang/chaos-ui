"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component Masonry
 * @category ui/layout
 * @since 0.8.0
 * @description CSS columns-based waterfall/masonry grid layout. Distributes children into responsive columns with equal spacing. / 基于 CSS columns 的瀑布流/砖石网格布局，响应式地将子元素分布到列中。
 * @keywords masonry, waterfall, grid, columns, layout, responsive
 * @example
 * <Masonry columns={3} gap={16}>
 *   {images.map(img => <img key={img.id} src={img.url} />)}
 * </Masonry>
 */

type ColumnConfig =
  | number
  | {
      default?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
    };

interface MasonryProps extends React.ComponentProps<"div"> {
  /** Number of columns or responsive breakpoint config / 列数或响应式断点配置 */
  columns?: ColumnConfig;
  /** Gap between items in pixels / 项目间距（像素） */
  gap?: number;
}

export function Masonry({
  columns = 3,
  gap = 16,
  className,
  children,
  style,
  ...props
}: MasonryProps) {
  return (
    <div
      data-slot="masonry"
      className={cn(className)}
      style={{
        columnCount: typeof columns === "number" ? columns : undefined,
        columnGap: `${gap}px`,
        ...style,
      }}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <div
          className="break-inside-avoid"
          style={{ marginBottom: `${gap}px` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export type { MasonryProps, ColumnConfig };
