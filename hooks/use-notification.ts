"use client";
import * as React from "react";
import { toast } from "sonner";

/**
 * @hook useNotification
 * @category hooks/feedback
 * @since 0.2.0
 * @description 命令式通知 API / Imperative notification API (antd App.useApp().notification equivalent)
 * @example
 * const notification = useNotification();
 * notification.open({ title: 'New Order', description: 'Order #123 received' });
 */
export interface NotificationOptions {
  id?: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
}

export interface NotificationInstance {
  open: (options: NotificationOptions) => string | number;
  success: (options: Omit<NotificationOptions, "type">) => string | number;
  error: (options: Omit<NotificationOptions, "type">) => string | number;
  warning: (options: Omit<NotificationOptions, "type">) => string | number;
  info: (options: Omit<NotificationOptions, "type">) => string | number;
  close: (id?: string | number) => void;
  closeAll: () => void;
}

export function useNotification(): NotificationInstance {
  const open = React.useCallback((options: NotificationOptions) => {
    const { type = "info", title, description, duration, id, action } = options;
    const config: Record<string, unknown> = {};
    if (id !== undefined) config.id = id;
    if (description !== undefined) config.description = description;
    if (duration !== undefined) config.duration = duration;
    if (action) config.action = { label: action.label, onClick: action.onClick };

    switch (type) {
      case "success":
        return toast.success(title, config);
      case "error":
        return toast.error(title, config);
      case "warning":
        return toast.warning(title, config);
      default:
        return toast.info(title, config);
    }
  }, []);

  return {
    open,
    success: (options) => open({ ...options, type: "success" }),
    error: (options) => open({ ...options, type: "error" }),
    warning: (options) => open({ ...options, type: "warning" }),
    info: (options) => open({ ...options, type: "info" }),
    close: (id) => {
      if (id) toast.dismiss(id);
      else toast.dismiss();
    },
    closeAll: () => toast.dismiss(),
  };
}
