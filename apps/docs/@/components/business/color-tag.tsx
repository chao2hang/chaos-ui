"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";

/**
 * @component ColorTag
 * @category business/status
 * @since 0.5.0
 * @description Semantic color tag — replaces project-side colorTag() utility
 * with a proper component. Maps well-known color keys to consistent styles.
 * Includes antd migration colors (blue, red, orange, gold, cyan, green, processing).
 * / 语义颜色标签，替代项目侧 colorTag() 工具，含 antd 迁移色
 * @keywords tag, color, status, badge, semantic
 * @example
 * <ColorTag color="success">Active</ColorTag>
 * <ColorTag color="processing">Processing</ColorTag>
 * <ColorTag color="gold">VIP</ColorTag>
 */

type ColorTagColor =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted"
  // antd migration colors / antd 迁移色
  | "blue"
  | "red"
  | "orange"
  | "gold"
  | "cyan"
  | "green"
  | "processing";

const colorConfig: Record<
  ColorTagColor,
  { bg: string; text: string; border: string }
> = {
  default: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-muted",
  },
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
  success: {
    bg: "bg-green-50 dark:bg-green-950",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-900",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-900",
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-900",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-900",
  },
  muted: {
    bg: "bg-muted/50",
    text: "text-muted-foreground",
    border: "border-muted",
  },
  // antd migration colors
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-900",
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-900",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-900",
  },
  gold: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-900",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950",
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-200 dark:border-cyan-900",
  },
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-950",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-900",
  },
  processing: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-900",
  },
};

interface ColorTagProps extends React.ComponentProps<"span"> {
  /** Color key / 颜色标识 */
  color: ColorTagColor | (string & {});
  /** Tag size / 大小 */
  size?: "sm" | "md" | "lg";
  /** Whether to show a dot indicator / 是否显示圆点 */
  dot?: boolean;
  /** Custom color config overrides / 自定义颜色配置覆盖 */
  colorConfig?: Partial<
    Record<string, { bg: string; text: string; border: string }>
  >;
}

const sizeConfig: Record<string, string> = {
  sm: "px-1.5 py-0.5 text-xs gap-1",
  md: "px-2 py-0.5 text-xs gap-1.5",
  lg: "px-2.5 py-1 text-sm gap-1.5",
};

function ColorTag({
  className,
  color,
  size = "md",
  dot = false,
  colorConfig: customConfig,
  children,
  ...props
}: ColorTagProps) {
  const mergedConfig = { ...colorConfig, ...customConfig };
  const config =
    (
      mergedConfig as Record<
        string,
        { bg: string; text: string; border: string }
      >
    )[color] ?? colorConfig.default;

  return (
    <span
      data-slot="color-tag"
      className={cn(
        "inline-flex items-center rounded-md border font-medium",
        config.bg,
        config.text,
        config.border,
        sizeConfig[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("size-1.5 rounded-full", config.text)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { ColorTag, colorConfig };
export type { ColorTagProps, ColorTagColor };
