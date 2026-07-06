"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const notificationVariants = cva(
  "relative flex w-96 items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-full",
  {
    variants: {
      variant: {
        default: "bg-background",
        info: "border-primary/30 bg-primary/5",
        success: "border-success/30 bg-success/5",
        warning: "border-warning/30 bg-warning/5",
        destructive: "border-destructive/30 bg-destructive/5",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface NotificationProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof notificationVariants> {
  /** Title */
  title?: React.ReactNode;
  /** Description content */
  description?: React.ReactNode;
  /** Whether the notification is visible */
  open?: boolean;
  /** Called when close button is clicked */
  onClose?: () => void;
  /** Auto-close duration in ms (0 to disable) */
  duration?: number;
  /** Icon to show */
  icon?: React.ReactNode;
}

function Notification({
  className,
  variant = "default",
  title,
  description,
  open = true,
  onClose,
  duration = 4500,
  icon,
  children,
  ...props
}: NotificationProps) {
  React.useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const defaultIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-warning"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" x2="12" y1="9" y2="13" />
            <line x1="12" x2="12.01" y1="17" y2="17" />
          </svg>
        );
      case "destructive":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-destructive"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="16" y2="12" />
            <line x1="12" x2="12.01" y1="8" y2="8" />
          </svg>
        );
    }
  };

  return (
    <div
      data-slot="notification"
      role="alert"
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      <span className="mt-0.5 shrink-0">{defaultIcon()}</span>
      <div className="min-w-0 flex-1">
        {title && (
          <div className="text-foreground text-sm font-medium">{title}</div>
        )}
        {description && (
          <div className="text-muted-foreground mt-1 text-sm">
            {description}
          </div>
        )}
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
          aria-label="Dismiss notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Notification, notificationVariants };
