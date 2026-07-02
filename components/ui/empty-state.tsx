"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  InboxIcon,
  SearchIcon,
  AlertTriangleIcon,
  WifiOffIcon,
} from "@/components/ui/icons";

const variantConfig = {
  default: { icon: InboxIcon },
  search: { icon: SearchIcon },
  error: { icon: AlertTriangleIcon },
  network: { icon: WifiOffIcon },
};

const defaultTexts: Record<string, { title: string; description: string }> = {
  default: { title: "No data", description: "There are no items to display." },
  search: {
    title: "No results",
    description: "Try adjusting your search or filter criteria.",
  },
  error: {
    title: "Something went wrong",
    description: "An error occurred while loading data.",
  },
  network: {
    title: "No connection",
    description: "Check your internet connection and try again.",
  },
};

export interface EmptyStateTexts {
  title?: string;
  description?: string;
}

interface EmptyStateProps {
  variant?: string;
  icon?: React.ElementType;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  centered?: boolean;
  fullPage?: boolean;
  /**
   * Override i18n strings. When provided, useTranslation is skipped.
   * / 覆盖 i18n 字符串，传入后跳过 useTranslation
   */
  texts?: EmptyStateTexts;
}

/**
 * @component EmptyState
 * @category ui/feedback
 * @since 0.2.0
 * @description Placeholder displayed when data is empty, with icon, title, description, and optional action / 数据为空时显示的占位符，含图标、标题、描述和可选操作
 * @keywords empty, state, placeholder, no-data, feedback, zero-state
 * @example
 * <EmptyState variant="search" title="No results" description="Try a different query" />
 */
function EmptyState({
  variant = "default",
  icon: iconProp,
  title: titleProp,
  description: descProp,
  action,
  className,
  centered,
  fullPage,
  texts: textsProp,
}: EmptyStateProps) {
  const hasI18n = !textsProp;
  const { t } = useTranslation("data");

  const config =
    (variantConfig as Record<string, { icon: React.ElementType }>)[variant] ??
    variantConfig.default;
  const Icon = iconProp ?? config.icon;

  const fallback = defaultTexts[variant] ??
    defaultTexts.default ?? { title: "", description: "" };

  const title =
    titleProp ??
    textsProp?.title ??
    (hasI18n
      ? t(`emptyState.${variant}.title`, fallback.title)
      : fallback.title);

  const description =
    descProp ??
    textsProp?.description ??
    (hasI18n
      ? t(`emptyState.${variant}.description`, fallback.description)
      : fallback.description);

  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        centered && "min-h-[400px] items-center justify-center",
        fullPage && "min-h-svh",
        className,
      )}
    >
      <div className="bg-muted flex size-12 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground size-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export { EmptyState, variantConfig };
// type exports handled by interface declarations above
