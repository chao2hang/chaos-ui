"use client";

import { useTheme } from "@/components/ui/theme-provider";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "@/components/ui/icons";

/**
 * @component Toaster
 * @category ui/feedback
 * @since 0.2.0
 * @description Toast notification renderer using Sonner, themed with application icons and colors / 基于 Sonner 的吐司通知渲染器，使用应用图标和颜色主题化
 * @keywords toast, sonner, notification, feedback, alert, 通知, 吐司
 * @example
 * <Toaster />
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();
  const resolvedTheme = (theme ?? "system") as NonNullable<
    ToasterProps["theme"]
  >;

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      data-slot="sonner"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
