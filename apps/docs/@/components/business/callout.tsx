import * as React from "react";

import { cn } from "@/lib/utils";
import {
  InfoIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  XCircleIcon,
  type LucideIcon,
} from "@/components/ui";

/**
 * @component Callout
 * @category business/charts
 * @since 0.7.0
 * @description 标注卡片 — emphasizes a message with an icon and tone.
 * @param title Optional bold heading.
 * @param children Body content.
 * @param variant Tone: default | info | success | warning | error.
 * @param className Extra classes on the root.
 * @example
 * <Callout variant="warning" title="注意">请核对数据</Callout>
 */

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "info" | "success" | "warning" | "error";
  className?: string;
}

const VARIANTS: Record<
  NonNullable<CalloutProps["variant"]>,
  { wrap: string; icon: string; Icon: LucideIcon; label: string }
> = {
  default: {
    wrap: "bg-muted/50 text-foreground",
    icon: "text-muted-foreground",
    Icon: InfoIcon,
    label: "提示",
  },
  info: {
    wrap: "bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200",
    icon: "text-blue-500",
    Icon: InfoIcon,
    label: "信息",
  },
  success: {
    wrap: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
    icon: "text-emerald-500",
    Icon: CheckCircle2Icon,
    label: "成功",
  },
  warning: {
    wrap: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    icon: "text-amber-500",
    Icon: AlertTriangleIcon,
    label: "警告",
  },
  error: {
    wrap: "bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200",
    icon: "text-red-500",
    Icon: XCircleIcon,
    label: "错误",
  },
};

function Callout({
  title,
  children,
  variant = "default",
  className,
}: CalloutProps) {
  const v = VARIANTS[variant];
  const Icon = v.Icon;
  return (
    <div
      data-slot="callout"
      role="note"
      className={cn(
        "flex gap-3 rounded-lg border p-3 text-sm",
        v.wrap,
        className,
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", v.icon)} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {title ? (
          <p className="font-semibold leading-snug">{title}</p>
        ) : null}
        <div className={cn(title ? "mt-0.5" : "", "text-sm leading-snug")}>
          {children}
        </div>
      </div>
    </div>
  );
}

export { Callout };
export type { CalloutProps };
