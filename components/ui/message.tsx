"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
} from "@/components/ui/icons";

/**
 * @component Message
 * @category ui/feedback
 * @since 0.8.0
 * @description Inline soft feedback component. Softer than Alert, non-dismissible. Use for contextual hints, status messages, and inline guidance. / 内联柔和反馈组件，比 Alert 更轻柔，不可关闭。用于上下文提示、状态消息和内联引导。
 * @keywords message, feedback, inline, hint, status, notice
 * @example
 * <Message variant="info">Your changes will be auto-saved.</Message>
 * <Message variant="success" action={<Button size="sm">Undo</Button>}>Saved.</Message>
 */

type MessageVariant = "info" | "success" | "warning" | "error";

interface MessageProps extends React.ComponentProps<"div"> {
  /** Message variant / 消息变体 */
  variant?: MessageVariant;
  /** Custom icon (overrides variant default) / 自定义图标 */
  icon?: React.ReactNode;
  /** Optional action element (button, link) / 可选操作元素 */
  action?: React.ReactNode;
}

const variantIcons: Record<MessageVariant, React.ElementType> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  error: AlertCircleIcon,
};

const variantStyles: Record<MessageVariant, string> = {
  info: "bg-blue-50/60 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
  success:
    "bg-green-50/60 text-green-700 dark:bg-green-950/30 dark:text-green-300",
  warning:
    "bg-amber-50/60 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300",
  error: "bg-red-50/60 text-red-700 dark:bg-red-950/30 dark:text-red-300",
};

const iconColors: Record<MessageVariant, string> = {
  info: "text-blue-500 dark:text-blue-400",
  success: "text-green-500 dark:text-green-400",
  warning: "text-amber-500 dark:text-amber-400",
  error: "text-red-500 dark:text-red-400",
};

export function Message({
  variant = "info",
  icon,
  action,
  className,
  children,
  ...props
}: MessageProps) {
  const IconComponent = variantIcons[variant];

  return (
    <div
      data-slot="message"
      data-variant={variant}
      role="status"
      className={cn(
        "flex items-start gap-2 rounded-md px-3 py-2 text-sm",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      <span className={cn("mt-0.5 shrink-0", iconColors[variant])}>
        {icon ?? <IconComponent className="size-4" />}
      </span>
      <span className="flex-1">{children}</span>
      {action && <span className="shrink-0">{action}</span>}
    </div>
  );
}

export type { MessageProps, MessageVariant };
