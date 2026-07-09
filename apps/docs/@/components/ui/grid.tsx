"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";

// ─── Types ───────────────────────────────────────────────

type ColSpan =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

interface ResponsiveCol {
  span?: ColSpan;
  offset?: number;
  order?: number;
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal gutter in px (or [horizontal, vertical]) */
  gutter?: number | [number, number];
  /** Vertical alignment */
  align?: "top" | "middle" | "bottom" | "stretch";
  /** Horizontal alignment */
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-around"
    | "space-between"
    | "space-evenly";
  /** Allow wrapping */
  wrap?: boolean;
}

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span (1–24) */
  span?: ColSpan;
  /** Number of columns to offset */
  offset?: number;
  /** Column order */
  order?: number;
  /** Responsive: < 576px */
  xs?: ResponsiveCol;
  /** Responsive: >= 576px */
  sm?: ResponsiveCol;
  /** Responsive: >= 768px */
  md?: ResponsiveCol;
  /** Responsive: >= 1024px */
  lg?: ResponsiveCol;
  /** Responsive: >= 1280px */
  xl?: ResponsiveCol;
  /** Responsive: >= 1536px */
  xxl?: ResponsiveCol;
}

// ─── Breakpoint → span/offset class helpers ──────────────

function colSpanClass(prefix: string, span?: ColSpan): string {
  if (span == null) return "";
  return `${prefix}:col-span-${span}`;
}

function colOffsetClass(prefix: string, offset?: number): string {
  if (offset == null) return "";
  return `${prefix}:col-start-[${offset + 1}]`;
}

function colOrderClass(prefix: string, order?: number): string {
  if (order == null) return "";
  return `${prefix}:order-${order}`;
}

// ─── Row ─────────────────────────────────────────────────

/**
 * @component Row
 * @category ui/layout
 * @since 0.2.0
 * @description A 24-column grid row with gutter support, vertical/horizontal alignment, and wrap control / 24 列网格行，支持间距、垂直/水平对齐和换行控制
 * @keywords grid, row, layout, 24-column, gutter, alignment
 * @example
 * <Row gutter={16} align="middle" justify="center"><Col span={12}>Content</Col></Row>
 */
function Row({
  gutter = 0,
  align = "top",
  justify = "start",
  wrap = true,
  className,
  style,
  children,
  ...props
}: RowProps) {
  const [hGutter, vGutter] = typeof gutter === "number" ? [gutter, 0] : gutter;

  const alignMap: Record<string, string> = {
    top: "items-start",
    middle: "items-center",
    bottom: "items-end",
    stretch: "items-stretch",
  };

  const justifyMap: Record<string, string> = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    "space-around": "justify-around",
    "space-between": "justify-between",
    "space-evenly": "justify-evenly",
  };

  const rowStyle: React.CSSProperties = {
    ...(hGutter > 0 && {
      marginLeft: -hGutter / 2,
      marginRight: -hGutter / 2,
    }),
    ...(vGutter > 0 && {
      rowGap: vGutter,
    }),
    ...style,
  };

  return (
    <div
      data-slot="row"
      className={cn(
        "grid grid-cols-24",
        !wrap && "flex-nowrap",
        alignMap[align],
        justifyMap[justify],
        className,
      )}
      style={rowStyle}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const childProps = child.props as Record<string, unknown>;
        return React.cloneElement(
          child as React.ReactElement<{ _gutter?: number }>,
          { ...childProps, _gutter: hGutter },
        );
      })}
    </div>
  );
}

// ─── Col ─────────────────────────────────────────────────

/**
 * @component Col
 * @category ui/layout
 * @since 0.2.0
 * @description A 24-column grid cell with responsive span, offset, and order across six breakpoints / 24 列网格单元格，支持跨六个断点的响应式跨度、偏移和排序
 * @keywords grid, column, layout, responsive, span, offset
 * @example
 * <Col span={12} md={{ span: 6 }} offset={2}>Content</Col>
 */
function Col({
  span,
  offset,
  order,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className,
  style,
  children,
  _gutter,
  ...props
}: ColProps & { _gutter?: number }) {
  const classes = [
    // base (mobile-first): apply to all breakpoints
    colSpanClass("", span),
    colOffsetClass("", offset),
    colOrderClass("", order),
    // responsive overrides
    xs && colSpanClass("xs", xs.span),
    xs && colOffsetClass("xs", xs.offset),
    xs && colOrderClass("xs", xs.order),
    sm && colSpanClass("sm", sm.span),
    sm && colOffsetClass("sm", sm.offset),
    sm && colOrderClass("sm", sm.order),
    md && colSpanClass("md", md.span),
    md && colOffsetClass("md", md.offset),
    md && colOrderClass("md", md.order),
    lg && colSpanClass("lg", lg.span),
    lg && colOffsetClass("lg", lg.offset),
    lg && colOrderClass("lg", lg.order),
    xl && colSpanClass("xl", xl.span),
    xl && colOffsetClass("xl", xl.offset),
    xl && colOrderClass("xl", xl.order),
    xxl && colSpanClass("2xl", xxl.span),
    xxl && colOffsetClass("2xl", xxl.offset),
    xxl && colOrderClass("2xl", xxl.order),
  ]
    .filter(Boolean)
    .join(" ");

  const colStyle: React.CSSProperties = {
    ...(_gutter != null &&
      _gutter > 0 && {
        paddingLeft: _gutter / 2,
        paddingRight: _gutter / 2,
      }),
    ...style,
  };

  return (
    <div
      className={cn(classes, className)}
      style={colStyle}
      data-slot="col"
      {...props}
    >
      {children}
    </div>
  );
}

export { Row, Col };
export type { RowProps, ColProps, ColSpan, ResponsiveCol };

/**
 * Grid container component — alias for a flex/grid wrapper.
 * Provided for API compatibility with story files that import `Grid`.
 */
function Grid({
  children,
  className,
  cols = 12,
  gap = "1rem",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  cols?: number;
  gap?: string | number;
}) {
  return (
    <div
      data-slot="grid"
      className={cn("grid", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap }}
      {...rest}
    >
      {children}
    </div>
  );
}

export { Grid };
