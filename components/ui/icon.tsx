"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/**
 * @component Icon
 * @category ui/primitives
 * @since 0.8.0
 * @description Thin wrapper over Lucide icons providing consistent sizing, color tokens, and animation props. / Lucide 图标的薄包装器，提供统一尺寸、颜色标记和动画属性。
 * @keywords icon, lucide, wrapper, sizing, animation, spin, pulse
 * @example
 * <Icon icon={StarIcon} size="md" />
 * <Icon icon={Loader2} size="sm" spin />
 * <Icon icon={BellIcon} size="lg" className="text-primary" pulse />
 */

type IconSize = "inherit" | "sm" | "md" | "lg" | "xl";

interface IconProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Lucide icon component to render / 要渲染的 Lucide 图标组件 */
  icon: LucideIcon;
  /** Preset size / 预设尺寸 (default: "inherit") */
  size?: IconSize;
  /** Apply spinning animation / 应用旋转动画 */
  spin?: boolean;
  /** Apply pulse animation / 应用脉冲动画 */
  pulse?: boolean;
}

const sizeMap: Record<IconSize, { width: string; height: string }> = {
  inherit: { width: "1em", height: "1em" },
  sm: { width: "0.875rem", height: "0.875rem" },
  md: { width: "1.25rem", height: "1.25rem" },
  lg: { width: "1.5rem", height: "1.5rem" },
  xl: { width: "2rem", height: "2rem" },
};

export function Icon({
  icon: IconComponent,
  size = "inherit",
  spin,
  pulse,
  className,
  ...props
}: IconProps) {
  const dims = sizeMap[size];
  return (
    <span
      data-slot="icon"
      className={cn(
        "inline-flex items-center justify-center",
        spin && "animate-spin",
        pulse && "animate-pulse",
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      <IconComponent style={{ width: dims.width, height: dims.height }} />
    </span>
  );
}

export type { IconProps, IconSize };
