"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component ColorTag
 * @category business/status
 * @since 0.5.0
 * @description Semantic color tag — replaces project-side colorTag() utility
 * with a proper component. Maps well-known color keys to consistent styles.
 * / 语义颜色标签，替代项目侧 colorTag() 工具
 * @keywords tag, color, status, badge, semantic
 * @example
 * <ColorTag color="success">正常</ColorTag>
 * <ColorTag color="warning">待审核</ColorTag>
 * <ColorTag color="error">失败</ColorTag>
 */

type ColorTagColor =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "muted";

const colorConfig: Record<ColorTagColor, { bg: string; text: string; border: string }> = {
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
};

interface ColorTagProps extends React.ComponentProps<"span"> {
  /** Color key / 颜色标识 */
  color: ColorTagColor | (string & {});
  /** Tag size / 大小 */
  size?: "sm" | "md" | "lg";
  /** Whether to show a dot indicator / 是否显示圆点 */
  dot?: boolean;
  /** Custom color config overrides / 自定义颜色配置覆盖 */
  colorConfig?: Partial<Record<string, { bg: string; text: string; border: string }>>;
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
  const config = (mergedConfig as Record<string, { bg: string; text: string; border: string }>)[color] ?? colorConfig.default;

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
