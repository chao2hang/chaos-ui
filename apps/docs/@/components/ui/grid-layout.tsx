import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const gridLayoutVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
      auto: "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      default: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    columns: 1,
    gap: "default",
    align: "stretch",
    justify: "start",
  },
});

interface GridLayoutProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridLayoutVariants> {
  children: React.ReactNode;
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * @component GridLayout
 * @category ui/layout
 * @since 0.2.0
 * @description A CSS grid layout with configurable columns, gap, alignment, and responsive column overrides / CSS 网格布局，支持可配置列数、间距、对齐方式和响应式列覆盖
 * @keywords grid, layout, responsive, columns, gap
 * @example
 * <GridLayout columns={3} gap="lg" responsive={{ md: 2, sm: 1 }}>
 *   <GridItem span={2}>Wide content</GridItem>
 * </GridLayout>
 */
function GridLayout({
  className,
  columns,
  gap,
  align,
  justify,
  responsive,
  children,
  ...props
}: GridLayoutProps) {
  const responsiveClasses = responsive
    ? cn(
        responsive.sm && `sm:grid-cols-${responsive.sm}`,
        responsive.md && `md:grid-cols-${responsive.md}`,
        responsive.lg && `lg:grid-cols-${responsive.lg}`,
        responsive.xl && `xl:grid-cols-${responsive.xl}`,
      )
    : "";

  return (
    <div
      data-slot="grid-layout"
      className={cn(
        gridLayoutVariants({ columns, gap, align, justify }),
        responsiveClasses,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  rowSpan?: number;
  start?: number;
  end?: number;
  children: React.ReactNode;
}

/**
 * @component GridItem
 * @category ui/layout
 * @since 0.2.0
 * @description A grid cell within GridLayout supporting column/row span and start/end positioning / GridLayout 中的网格单元格，支持列/行跨度和起止位置
 * @keywords grid, item, span, row-span, layout
 * @example
 * <GridItem span={2} rowSpan={3}>Content</GridItem>
 */
function GridItem({
  className,
  span,
  rowSpan,
  start,
  end,
  children,
  ...props
}: GridItemProps) {
  return (
    <div
      data-slot="grid-item"
      className={cn(
        span && `col-span-${span}`,
        rowSpan && `row-span-${rowSpan}`,
        start && `col-start-${start}`,
        end && `col-end-${end}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { GridLayout, GridItem, gridLayoutVariants };
export type { GridLayoutProps, GridItemProps };
