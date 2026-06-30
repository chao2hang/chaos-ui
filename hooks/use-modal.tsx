"use client";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * @hook useModal
 * @category hooks/feedback
 * @since 0.2.0
 * @description 命令式模态框 API / Imperative modal API (antd Modal.confirm equivalent)
 * @example
 * const modal = useModal();
 * modal.confirm({ title: 'Delete?', content: 'Are you sure?', onOk: handleDelete });
 */
export interface ModalOptions {
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  okVariant?: "default" | "destructive";
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  width?: string | number;
  closable?: boolean;
  maskClosable?: boolean;
}

export interface ModalInstance {
  confirm: (options: ModalOptions) => void;
  info: (options: Omit<ModalOptions, "okVariant" | "cancelText">) => void;
  warning: (options: Omit<ModalOptions, "okVariant">) => void;
  success: (options: Omit<ModalOptions, "okVariant">) => void;
  error: (options: Omit<ModalOptions, "okVariant">) => void;
}

export function useModal(): ModalInstance {
  const [modalState, setModalState] = React.useState<{
    open: boolean;
    options: ModalOptions;
  }>({ open: false, options: {} });

  const [loading, setLoading] = React.useState(false);

  const open = React.useCallback((options: ModalOptions) => {
    setModalState({ open: true, options });
  }, []);

  const close = React.useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }));
    setLoading(false);
  }, []);

  const handleOk = React.useCallback(async () => {
    const { onOk } = modalState.options;
    if (onOk) {
      try {
        setLoading(true);
        await onOk();
      } finally {
        close();
      }
    } else {
      close();
    }
  }, [modalState.options, close]);

  const handleCancel = React.useCallback(() => {
    modalState.options.onCancel?.();
    close();
  }, [modalState.options, close]);

  const confirm = React.useCallback(
    (options: ModalOptions) => open(options),
    [open],
  );

  const info = React.useCallback(
    (options: Omit<ModalOptions, "okVariant" | "cancelText">) =>
      open(options),
    [open],
  );

  const warning = React.useCallback(
    (options: Omit<ModalOptions, "okVariant">) => open(options),
    [open],
  );

  const success = React.useCallback(
    (options: Omit<ModalOptions, "okVariant">) => open(options),
    [open],
  );

  const error = React.useCallback(
    (options: Omit<ModalOptions, "okVariant">) =>
      open({ ...options, okVariant: "destructive" }),
    [open],
  );

  // Render the modal
  const modal = (
    <Dialog
      open={modalState.open}
      onOpenChange={(v) => {
        if (!v && modalState.options.maskClosable !== false) handleCancel();
      }}
    >
      <DialogContent
        style={{ maxWidth: typeof modalState.options.width === "number" ? `${modalState.options.width}px` : modalState.options.width }}
      >
        <DialogHeader>
          {modalState.options.title && (
            <DialogTitle>{modalState.options.title}</DialogTitle>
          )}
          {modalState.options.content && (
            <DialogDescription>{modalState.options.content}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          {modalState.options.cancelText !== undefined && (
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {modalState.options.cancelText ?? "Cancel"}
            </Button>
          )}
          <Button
            variant={modalState.options.okVariant === "destructive" ? "destructive" : "default"}
            onClick={handleOk}
            disabled={loading}
          >
            {loading ? "Loading..." : modalState.options.okText ?? "OK"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Attach the modal element to the instance for rendering.
  // useCallback returns a function whose type can't declare extra props in TS,
  // so we cast to attach the `.modal` render node (read by ModalRenderer).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (confirm as any).modal = modal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (info as any).modal = modal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (warning as any).modal = modal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (success as any).modal = modal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error as any).modal = modal;

  return {
    confirm,
    info,
    warning,
    success,
    error,
  };
}

/**
 * Helper component to render the modal from useModal
 * Usage:
 * const modal = useModal();
 * return (<>
 *   {modal.confirm.modal}
 *   <Button onClick={() => modal.confirm({ title: 'Hi' })}>Open</Button>
 * </>)
 */
export function ModalRenderer({ modal }: { modal: ModalInstance }) {
  // The modal element is attached to the confirm function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = (modal.confirm as any).modal;
  return <>{element}</>;
}
