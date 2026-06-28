"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Descriptions
 * @category ui/primitives
 * @since 0.2.0
 * @description 描述列表组件 / Description list component (antd Descriptions equivalent)
 * @keywords descriptions, detail, info, display, list, compact
 * @example
 * <Descriptions title="User Info" column={2} items={[
 *   { label: "Name", value: "John" },
 *   { label: "Age", value: 30 },
 * ]} />
 * <Descriptions variant="compact" column={3} items={[...]} />
 */

interface DescriptionItem {
  /** Label text / 标签文本 */
  label: React.ReactNode;
  /** Value content / 值内容 */
  value: React.ReactNode;
  /** Span (how many columns this item spans) / 跨列数 */
  span?: number;
}

interface DescriptionsProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Title of the descriptions / 标题 */
  title?: React.ReactNode;
  /** Extra content (usually actions) / 额外内容 */
  extra?: React.ReactNode;
  /** Number of columns / 列数 */
  column?: number | { xs: number; sm: number; md: number; lg: number; xl: number };
  /** Layout direction / 布局方向 */
  layout?: "horizontal" | "vertical";
  /** Border style / 边框样式 */
  bordered?: boolean;
  /** Size / 大小 */
  size?: "sm" | "default" | "lg";
  /** Display variant / 显示变体 */
  variant?: "default" | "compact" | "inline";
  /** Colon after label / 标签后冒号 */
  colon?: boolean;
  /** Items to display / 描述项列表 */
  items?: DescriptionItem[];
  /** Content alignment / 内容对齐 */
  contentStyle?: React.CSSProperties;
  /** Label alignment / 标签对齐 */
  labelStyle?: React.CSSProperties;
}

const sizeMap: Record<string, string> = {
  sm: "text-xs px-2 py-1.5",
  default: "text-sm px-3 py-2",
  lg: "text-base px-4 py-3",
};

const compactSizeMap: Record<string, string> = {
  sm: "text-xs px-1.5 py-1",
  default: "text-xs px-2 py-1.5",
  lg: "text-sm px-3 py-2",
};

function Descriptions({
  className,
  title,
  extra,
  column = 3,
  layout = "horizontal",
  bordered = true,
  size = "default",
  variant = "default",
  colon = true,
  items = [],
  contentStyle,
  labelStyle,
  ...props
}: DescriptionsProps) {
  const cols = typeof column === "number" ? column : 3;
  const resolvedSize = variant === "compact" ? compactSizeMap[size] : sizeMap[size];

  // Inline variant: label and value on same line
  if (variant === "inline") {
    return (
      <div
        data-slot="descriptions"
        className={cn("w-full", className)}
        {...props}
      >
        {(title || extra) && (
          <div className="mb-3 flex items-center justify-between">
            {title && (
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
            )}
            {extra && <div>{extra}</div>}
          </div>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex gap-1.5">
              <span className="font-medium text-muted-foreground">
                {item.label}{colon && ":"}
              </span>
              <span className="text-foreground">{item.value ?? "—"}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="descriptions"
      className={cn("w-full", className)}
      {...props}
    >
      {(title || extra) && (
        <div className="mb-3 flex items-center justify-between">
          {title && (
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
          )}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div
        className={cn(
          "grid",
          bordered && "overflow-hidden rounded-lg border border-border",
        )}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item, index) => {
          const span = Math.min(item.span ?? 1, cols);
          return (
            <React.Fragment key={index}>
              <div
                className={cn(
                  resolvedSize,
                  "font-medium text-muted-foreground",
                  bordered
                    ? "border-b border-r border-border bg-muted/30"
                    : "pb-1",
                  layout === "vertical" && "border-r-0",
                  colon && "after:content-[\":\"]",
                )}
                style={{
                  gridColumn: span > 1 ? `span ${span}` : undefined,
                  ...labelStyle,
                }}
              >
                {item.label}
              </div>
              {layout === "horizontal" && (
                <div
                  className={cn(
                    resolvedSize,
                    "text-foreground",
                    bordered
                      ? "border-b border-border"
                      : "pb-2",
                  )}
                  style={contentStyle}
                >
                  {item.value ?? "—"}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function DescriptionsItem({
  label,
  children,
  span = 1,
  className,
}: {
  label?: React.ReactNode;
  children?: React.ReactNode;
  span?: number;
  className?: string;
}) {
  return (
    <div
      data-slot="descriptions-item"
      className={cn("contents", className)}
      style={{ gridColumn: `span ${span}` }}
    >
      <span className="font-medium text-muted-foreground">
        {label}
      </span>
      <span className="text-foreground">{children ?? "—"}</span>
    </div>
  );
}

export { Descriptions, DescriptionsItem };
export type { DescriptionsProps, DescriptionItem };
