"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { XIcon, CheckCircleIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon } from "@/components/ui/icons";

type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationProps extends Omit<React.ComponentProps<"div">, "title"> {
  type?: NotificationType;
  closable?: boolean;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  banner?: boolean;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  info: <InfoIcon className="size-4" />,
  success: <CheckCircleIcon className="size-4" />,
  warning: <AlertTriangleIcon className="size-4" />,
  error: <AlertCircleIcon className="size-4" />,
};

const typeStyles: Record<NotificationType, string> = {
  info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900",
  success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900",
  warning: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-900",
  error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900",
};

const iconColor: Record<NotificationType, string> = {
  info: "text-blue-600 dark:text-blue-300",
  success: "text-green-600 dark:text-green-300",
  warning: "text-amber-600 dark:text-amber-300",
  error: "text-red-600 dark:text-red-300",
};

function Notification({
  type = "info",
  closable = true,
  title,
  icon,
  onClose,
  banner = false,
  className,
  children,
  ...props
}: NotificationProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div
      data-slot="notification"
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border p-3 text-sm",
        typeStyles[type],
        banner && "rounded-none border-x-0",
        className,
      )}
      {...props}
    >
      <span className={cn("mt-0.5 shrink-0", iconColor[type])}>
        {icon ?? iconMap[type]}
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <div className="mb-1 font-medium">{title}</div>
        )}
        <div>{children}</div>
      </div>
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 rounded-md p-0.5 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

export { Notification };
export type { NotificationType, NotificationProps };
