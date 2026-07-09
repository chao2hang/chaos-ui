"use client";

/**
 * @hook useMessage
 * @category hooks/feedback
 * @since 0.2.0
 * @description 命令式消息提示 (Hook 形式) / Imperative message API (hook form, internally uses static `message`)
 * @example
 * ```tsx
 * function MyComponent() {
 *   const message = useMessage();
 *   return <Button onClick={() => message.success('Saved!')}>Save</Button>;
 * }
 * ```
 */

import { useMemo } from "react";
import { message, type MessageOptions } from "@/lib/message";

export interface MessageInstance {
  success: (content: React.ReactNode, options?: MessageOptions) => string | number;
  error: (content: React.ReactNode, options?: MessageOptions) => string | number;
  warning: (content: React.ReactNode, options?: MessageOptions) => string | number;
  info: (content: React.ReactNode, options?: MessageOptions) => string | number;
  loading: (content: React.ReactNode, options?: MessageOptions) => string | number;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading?: React.ReactNode;
      success?: React.ReactNode | ((data: T) => React.ReactNode);
      error?: React.ReactNode | ((err: unknown) => React.ReactNode);
    },
  ) => Promise<T>;
  destroy: (id?: string | number) => void;
}

export function useMessage(): MessageInstance {
  return useMemo(
    () => ({
      success: message.success,
      error: message.error,
      warning: message.warning,
      info: message.info,
      loading: message.loading,
      promise: message.promise,
      destroy: message.destroy,
    }),
    [],
  );
}

export type { MessageOptions };
