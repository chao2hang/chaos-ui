"use client";

import * as React from "react";
import { message, type MessageOptions } from "@/lib/message";
import {
  messageCenter,
  type MessageItem,
} from "@/components/business/message-center";

/**
 * @component notify
 * @category business/feedback
 * @since 1.14.0
 * @description 反馈协调助手：统一 toast（即时消失）与 inbox（持久留痕）两个通道。
 *
 * - `notify.success/error/warning/info(content)` → toast only（委托 `message.*`）
 * - `notify.loading(content)` → toast loading（委托 `message.loading`，返回 hide 句柄）
 * - `notify.inbox({ title, body, href, alsoToast? })` → MessageCenter.push（+ 可选 toast）
 *
 * 何时用哪个见 `docs/specs/feedback-api.md` 决策表。
 * / Feedback coordinator: unifies toast (ephemeral) and inbox (persistent) channels.
 * @keywords notify, toast, inbox, feedback, message, notification
 * @example
 * ```ts
 * import { notify } from '@chaos_team/chaos-ui';
 *
 * notify.success('保存成功');              // toast only
 * notify.inbox({                          // push to MessageCenter + toast
 *   title: '审批通过',
 *   body: '报销单 #123 已审批',
 *   href: '/expense/123',
 *   alsoToast: true,
 * });
 * ```
 */

export interface NotifyInboxOptions {
  /** Message title (required). / 消息标题 */
  title: string;
  /** Message body / description. / 消息正文 */
  body?: string;
  /** Click-through href. / 点击跳转链接 */
  href?: string;
  /** Category tab key. / 分类 tab */
  category?: string;
  /** Level (info / warning / error). / 级别 */
  level?: MessageItem["level"];
  /** Also show a toast (default false). / 同时弹出 toast */
  alsoToast?: boolean;
  /** Toast type when alsoToast is true (default 'info'). / toast 类型 */
  toastType?: "success" | "error" | "warning" | "info";
}

export interface NotifyApi {
  /** Show a success toast. / 成功 toast */
  success: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => string | number;
  /** Show an error toast. / 错误 toast */
  error: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => string | number;
  /** Show a warning toast. / 警告 toast */
  warning: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => string | number;
  /** Show an info toast. / 信息 toast */
  info: (content: React.ReactNode, options?: MessageOptions) => string | number;
  /** Show a loading toast; returns a hide handle with .success/.error chaining. / 加载 toast */
  loading: (
    content: React.ReactNode,
    options?: MessageOptions,
  ) => {
    success: (msg?: React.ReactNode) => void;
    error: (msg?: React.ReactNode) => void;
    dismiss: () => void;
  };
  /** Push to MessageCenter inbox (+ optional toast). / 推送到消息中心（+ 可选 toast） */
  inbox: (options: NotifyInboxOptions) => void;
}

/** Feedback coordinator — toast + inbox in one API. */
export const notify: NotifyApi = {
  success(content, options) {
    return message.success(content, options);
  },
  error(content, options) {
    return message.error(content, options);
  },
  warning(content, options) {
    return message.warning(content, options);
  },
  info(content, options) {
    return message.info(content, options);
  },
  loading(content, options) {
    const key = options?.key ?? `notify-loading-${Date.now()}`;
    message.loading(content, { ...options, key });
    return {
      success(msg) {
        message.success(msg ?? content, { key });
      },
      error(msg) {
        message.error(msg ?? content, { key });
      },
      dismiss() {
        message.destroy(key);
      },
    };
  },
  inbox(opts) {
    const item: MessageItem = {
      id: `notify-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: opts.title,
      ...(opts.body ? { description: opts.body, body: opts.body } : {}),
      ...(opts.href ? { href: opts.href } : {}),
      ...(opts.category ? { category: opts.category } : {}),
      ...(opts.level ? { level: opts.level } : {}),
      read: false,
      timestamp: new Date().toISOString(),
    };
    messageCenter.push(item);
    if (opts.alsoToast) {
      const type = opts.toastType ?? "info";
      message[type](opts.title);
    }
  },
};
