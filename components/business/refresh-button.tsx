"use client";

import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import * as React from "react";
import { Button } from "@/components/ui";
import { RefreshCwIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface RefreshButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "children" | "icon"
> {
  /** Click handler / 点击回调 */
  onClick?: () => void;
  /**
   * When true, disables the button and spins the icon.
   * Alias of the common isFetching state from list hooks.
   * / 加载中：禁用按钮并旋转图标
   */
  loading?: boolean;
  /** Button label / 按钮文案，默认「刷新」 */
  label?: string;
  className?: string;
}

/**
 * @component RefreshButton
 * @category business/ux
 * @since 1.5.0
 * @description Standard list-page refresh control (outline + sm + refresh icon).
 * / 列表页标准刷新按钮：outline + sm + 刷新图标。
 * @keywords refresh, button, list, toolbar, isFetching
 * @example
 * <RefreshButton onClick={refresh} loading={isFetching} />
 */
export function RefreshButton({
  onClick,
  loading = false,
  disabled,
  label,
  size = "sm",
  variant = "outline",
  className,
  ...props
}: RefreshButtonProps) {
  const { t } = useTranslation("ui");
  const resolvedLabel = label ?? t("list.refresh", { defaultValue: "刷新" });
  return (
    <Button
      type="button"
      data-slot="refresh-button"
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      icon={
        <RefreshCwIcon
          className={cn("size-3.5", loading && "animate-spin")}
          aria-hidden
        />
      }
      className={className}
      {...props}
    >
      {resolvedLabel}
    </Button>
  );
}
