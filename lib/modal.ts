/**
 * @lib modal
 * @category lib/feedback
 * @since 0.3.0
 * @description 命令式模态框 API (antd Modal.confirm/Radix Dialog equivalent) / Imperative modal API
 * @keywords modal, dialog, confirm, imperative, popup
 * @example
 * ```ts
 * import { Modal } from '@qxyfoods/chaos-ui';
 *
 * Modal.confirm({
 *   title: '确认删除?',
 *   content: '此操作不可撤销',
 *   okText: '删除',
 *   cancelText: '取消',
 *   onOk: async () => { await deleteItem(); },
 * });
 *
 * Modal.info({ title: '提示', content: '请检查输入' });
 * Modal.warning({ title: '警告', content: '余额不足' });
 * Modal.success({ title: '成功', content: '保存完成' });
 * Modal.error({ title: '错误', content: '网络异常' });
 * ```
 */

import { modalStore, type ModalKind } from "@/lib/modal-store";

export interface ModalConfirmOptions {
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okVariant?: "default" | "destructive";
  width?: string | number;
  closable?: boolean;
  maskClosable?: boolean;
  icon?: React.ReactNode;
  /** Callback when OK is clicked (supports async). If provided, the modal will show a loading state until it resolves. */
  onOk?: () => void | Promise<void>;
  /** Callback when Cancel is clicked. */
  onCancel?: () => void;
}

export type ModalAlertOptions = Omit<
  ModalConfirmOptions,
  "okVariant" | "cancelText" | "onCancel"
>;

type ModalAPI = {
  confirm: (options: ModalConfirmOptions) => void;
  info: (options: ModalAlertOptions) => void;
  warning: (options: ModalAlertOptions) => void;
  success: (options: ModalAlertOptions) => void;
  error: (options: ModalAlertOptions) => void;
  closeAll: () => void;
};

function openModal(kind: ModalKind, options: ModalConfirmOptions): void {
  const { onOk, onCancel, ...rest } = options;
  const resolve = async (value: boolean | undefined) => {
    if (value === true) {
      try {
        await onOk?.();
      } catch {
        // User can handle errors in onOk
      }
    } else if (value === false) {
      onCancel?.();
    }
  };
  modalStore.push({
    kind,
    ...rest,
    resolve,
  } as Parameters<typeof modalStore.push>[0]);
}

export const Modal: ModalAPI = {
  confirm: (options) => openModal("confirm", options),
  info: (options) => openModal("info", { ...options, cancelText: undefined }),
  warning: (options) => openModal("warning", { ...options, cancelText: undefined }),
  success: (options) => openModal("success", { ...options, cancelText: undefined }),
  error: (options) => openModal("error", { ...options, okVariant: "destructive", cancelText: undefined }),
  closeAll: () => modalStore.closeAll(),
};

export type { ModalKind };
