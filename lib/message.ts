/**
 * @lib message
 * @category lib/feedback
 * @since 0.3.0
 * @description 命令式消息提示 (antd App.useApp().message equivalent) / Imperative global message API
 * @keywords message, toast, notification, feedback
 * @example
 * ```ts
 * import { message } from '@chaos_team/chaos-ui';
 *
 * message.success('保存成功');
 * message.error('保存失败', { duration: 5 });
 *
 * const hide = message.loading('加载中...', { key: 'load-1' });
 * setTimeout(() => hide.success('完成'), 1000);
 * ```
 */

import { toast } from "sonner";

export type MessageType = "success" | "error" | "warning" | "info" | "loading";

export type MessagePlacement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface MessageOptions {
  /** Unique key for this message. Use the same key to update existing message. / 唯一标识,用于更新已存在的消息 */
  key?: string;
  /** Duration in seconds. 0 means won't auto close. / 自动关闭延时,单位秒,0 表示不自动关闭 */
  duration?: number;
  /** Custom description (small text below the main content) / 自定义描述 */
  description?: React.ReactNode;
  /** Action button / 操作按钮 */
  action?: { label: string; onClick: () => void };
  /** Custom icon / 自定义图标 */
  icon?: React.ReactNode;
  /** Custom className for the toast / 自定义类名 */
  className?: string;
  /** onClick handler for the toast / 点击回调 */
  onClick?: () => void;
  /** onDismiss handler / 关闭回调 */
  onDismiss?: () => void;
  /** onAutoClose handler / 自动关闭回调 */
  onAutoClose?: () => void;
}

export interface MessageGlobalConfig {
  /** Default duration in seconds / 默认延时(秒) */
  duration?: number;
  /** Maximum number of toasts visible at once / 同时显示的最大条数 */
  maxCount?: number;
  /** Placement of toasts / 弹窗位置 */
  placement?: MessagePlacement;
  /** Default richColors (sonner) / 默认是否开启丰富颜色 */
  richColors?: boolean;
  /** Default expand / 默认是否可展开 */
  expand?: boolean;
}

type ToastFn = ((
  content: React.ReactNode,
  options?: MessageOptions,
) => MessageType) & {
  success: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => string | number;
  error: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => string | number;
  warning: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => string | number;
  info: (content: React.ReactNode, options?: MessageOptions) => string | number;
  loading: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => string | number;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading?: React.ReactNode;
      success?: React.ReactNode | ((data: T) => React.ReactNode);
      error?: React.ReactNode | ((err: unknown) => React.ReactNode);
    },
  ) => Promise<T>;
  destroy: (id?: string | number) => void;
  config: (config: MessageGlobalConfig) => void;
};

function durationToMs(durationSeconds: number | undefined): number | undefined {
  if (durationSeconds === undefined) return undefined;
  // Public API is seconds (antd-compatible); sonner expects milliseconds.
  // 0 means sticky / do not auto-close.
  if (durationSeconds === 0) return 0;
  return durationSeconds * 1000;
}

function buildToastConfig(options?: MessageOptions): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  if (options?.key !== undefined) config.id = options.key;
  if (options?.duration !== undefined) {
    config.duration = durationToMs(options.duration);
  }
  if (options?.description !== undefined)
    config.description = options.description;
  if (options?.action) {
    config.action = {
      label: options.action.label,
      onClick: options.action.onClick,
    };
  }
  if (options?.icon !== undefined) config.icon = options.icon;
  if (options?.className !== undefined)
    config.classNames = { toast: options.className };
  if (options?.onClick) config.onClick = options.onClick;
  if (options?.onDismiss) config.onDismiss = options.onDismiss;
  if (options?.onAutoClose) config.onAutoClose = options.onAutoClose;
  return config;
}

let globalConfig: MessageGlobalConfig = {
  duration: 3,
  maxCount: 5,
  placement: "top-right",
  richColors: true,
  expand: false,
};

const message: ToastFn = Object.assign(
  (content: React.ReactNode, options?: MessageOptions) => {
    return toast(content as string, buildToastConfig(options));
  },
  {
    success: (content: React.ReactNode, options?: MessageOptions) =>
      toast.success(content, buildToastConfig(options)),
    error: (content: React.ReactNode, options?: MessageOptions) =>
      toast.error(content, buildToastConfig(options)),
    warning: (content: React.ReactNode, options?: MessageOptions) =>
      toast.warning(content, buildToastConfig(options)),
    info: (content: React.ReactNode, options?: MessageOptions) =>
      toast.info(content, buildToastConfig(options)),
    loading: (content: React.ReactNode, options?: MessageOptions) => {
      const config = buildToastConfig({
        ...options,
        duration: options?.duration ?? 0,
      });
      return toast.loading(content, config);
    },
    promise: <T>(
      promise: Promise<T>,
      options: {
        loading?: React.ReactNode;
        success?: React.ReactNode | ((data: T) => React.ReactNode);
        error?: React.ReactNode | ((err: unknown) => React.ReactNode);
      },
    ): Promise<T> =>
      toast.promise(promise, {
        loading: (options.loading as string) ?? "Loading...",
        success: options.success as string | ((data: T) => string),
        error: options.error as string | ((err: unknown) => string),
      }) as unknown as Promise<T>,
    destroy: (id?: string | number) => {
      if (id !== undefined) toast.dismiss(id);
      else toast.dismiss();
    },
    config: (config: MessageGlobalConfig) => {
      globalConfig = { ...globalConfig, ...config };
    },
  },
) as ToastFn;

export { message };
