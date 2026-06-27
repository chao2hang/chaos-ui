"use client";
import { toast } from "sonner";

/**
 * @hook useMessage
 * @category hooks/feedback
 * @since 0.2.0
 * @description 命令式消息提示 / Imperative message API (antd App.useApp().message equivalent)
 * @example
 * const message = useMessage();
 * message.success('Saved!');
 * message.loading('Loading...', { id: 'load1' });
 */
export interface MessageInstance {
  success: (content: React.ReactNode, options?: MessageOptions) => string | number;
  error: (content: React.ReactNode, options?: MessageOptions) => string | number;
  warning: (content: React.ReactNode, options?: MessageOptions) => string | number;
  info: (content: React.ReactNode, options?: MessageOptions) => string | number;
  loading: (content: React.ReactNode, options?: MessageOptions) => string | number;
  promise: <T>(
    promise: Promise<T>,
    options: { loading?: React.ReactNode; success?: React.ReactNode | ((data: T) => React.ReactNode); error?: React.ReactNode | ((err: unknown) => React.ReactNode) },
  ) => Promise<T>;
  destroy: (id?: string | number) => void;
}

export interface MessageOptions {
  id?: string | number;
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  dismissible?: boolean;
  description?: React.ReactNode;
  action?: { label: string; onClick: () => void };
}

function buildToastConfig(options?: MessageOptions): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  if (options?.id !== undefined) config.id = options.id;
  if (options?.duration !== undefined) config.duration = options.duration;
  if (options?.description !== undefined) config.description = options.description;
  if (options?.action) config.action = { label: options.action.label, onClick: options.action.onClick };
  return config;
}

export function useMessage(): MessageInstance {
  return {
    success: (content, options) =>
      toast.success(content, buildToastConfig(options)),
    error: (content, options) =>
      toast.error(content, buildToastConfig(options)),
    warning: (content, options) =>
      toast.warning(content, buildToastConfig(options)),
    info: (content, options) =>
      toast.info(content, buildToastConfig(options)),
    loading: (content, options) => {
      const config = buildToastConfig(options);
      config.duration = options?.duration ?? Infinity;
      return toast.loading(content, config);
    },
    promise: <T>(
      promise: Promise<T>,
      options: { loading?: React.ReactNode; success?: React.ReactNode | ((data: T) => React.ReactNode); error?: React.ReactNode | ((err: unknown) => React.ReactNode) },
    ): Promise<T> =>
      toast.promise(promise, {
        loading: (options.loading as string) ?? "Loading...",
        success: options.success as string,
        error: options.error as string,
      }) as unknown as Promise<T>,
    destroy: (id) => {
      if (id) toast.dismiss(id);
      else toast.dismiss();
    },
  };
}
