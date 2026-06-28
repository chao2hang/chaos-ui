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

const variantI18n = {
  default: {
    title: "emptyState.default.title" as const,
    description: "emptyState.default.description" as const,
  },
  search: {
    title: "emptyState.search.title" as const,
    description: "emptyState.search.description" as const,
  },
  error: {
    title: "emptyState.error.title" as const,
    description: "emptyState.error.description" as const,
  },
  network: {
    title: "emptyState.network.title" as const,
    description: "emptyState.network.description" as const,
  },
};

interface EmptyStateProps {
  variant?: string;
  icon?: React.ElementType;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  /** Center vertically with min-height, replacing outer flex wrapper / 垂直居中布局 */
  centered?: boolean;
  /** Fill the parent container height / 充满父容器高度 */
  fullPage?: boolean;
}

function EmptyState({
  variant = "default",
  icon: iconProp,
  title: titleProp,
  description: descProp,
  action,
  className,
  centered,
  fullPage,
}: EmptyStateProps) {
  const { t } = useTranslation("data");
  const config =
    (variantConfig as Record<string, { icon: React.ElementType }>)[variant] ??
    variantConfig.default;
  const keys =
    variantI18n[variant as keyof typeof variantI18n] ?? variantI18n.default;
  const Icon = iconProp ?? config.icon;
  const title = titleProp ?? t(keys.title, keys.title);
  const description = descProp ?? t(keys.description, keys.description);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        centered && "items-center justify-center min-h-[400px]",
        fullPage && "min-h-svh",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export { EmptyState, variantConfig };
export type { EmptyStateProps };
