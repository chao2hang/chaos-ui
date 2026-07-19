"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
  /** Responsive: mobile-first base / < 640px */
  xs?: ResponsiveCol;
  /** Responsive: >= 640px */
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
  const responsiveValues = { xs, sm, md, lg, xl, xxl };
  const colStyle: React.CSSProperties = {
    "--chaos-col-grid": span != null ? `span ${span} / span ${span}` : "auto",
    ...(offset != null ? { "--chaos-col-start": String(offset + 1) } : {}),
    ...(order != null ? { "--chaos-col-order": String(order) } : {}),
    ...(xs?.span != null
      ? { "--chaos-col-grid": `span ${xs.span} / span ${xs.span}` }
      : {}),
    ...(xs?.offset != null
      ? { "--chaos-col-start": String(xs.offset + 1) }
      : {}),
    ...(xs?.order != null ? { "--chaos-col-order": String(xs.order) } : {}),
    ...(Object.entries(responsiveValues)
      .filter(([key, value]) => key !== "xs" && value != null)
      .reduce<Record<string, string>>((vars, [key, value]) => {
        const prefix = key === "xxl" ? "2xl" : key;
        if (value?.span != null)
          vars[`--chaos-col-${prefix}-grid`] =
            `span ${value.span} / span ${value.span}`;
        if (value?.offset != null)
          vars[`--chaos-col-${prefix}-start`] = String(value.offset + 1);
        if (value?.order != null)
          vars[`--chaos-col-${prefix}-order`] = String(value.order);
        return vars;
      }, {}) as React.CSSProperties),
    ...(_gutter != null &&
      _gutter > 0 && {
        paddingLeft: _gutter / 2,
        paddingRight: _gutter / 2,
      }),
    ...style,
  };

  return (
    <div
      className={cn("chaos-col", className)}
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
