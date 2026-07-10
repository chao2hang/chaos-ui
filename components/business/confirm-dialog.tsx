"use client";
import * as React from "react";
import { AlertTriangleIcon } from "@/components/ui/icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Button } from "@/components/ui";

interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm?: () => void | Promise<void>;
  loading?: boolean;
  icon?: React.ReactNode;
}

/**
 * @component ConfirmDialog
 * @category business/ux
 * @since 0.2.0
 * @description Confirmation dialog with title, description, and confirm/cancel actions, supporting destructive variant / 确认对话框，支持标题、描述和确认/取消操作，支持危险操作样式
 * @keywords confirm, dialog, modal, destructive, prompt
 * @example
 * <ConfirmDialog open={true} title="Delete?" onConfirm={async () => {}} />
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title = "确认操作",
  description = "此操作不可撤销，是否继续？",
  confirmText = "确认",
  cancelText = "取消",
  variant = "default",
  onConfirm,
  loading,
  icon,
}: ConfirmDialogProps) {
  const { t } = useTranslation("navigation");
  const [pending, setPending] = React.useState(false);

  const resolvedTitle = title === "确认操作" ? t("confirmDialog.title") : title;
  const resolvedDescription =
    description === "此操作不可撤销，是否继续？"
      ? t("confirmDialog.description")
      : description;
  const resolvedConfirmText =
    confirmText === "确认" ? t("confirmDialog.confirm") : confirmText;
  const resolvedCancelText =
    cancelText === "取消" ? t("confirmDialog.cancel") : cancelText;

  const handle = async () => {
    if (!onConfirm) {
      onOpenChange?.(false);
      return;
    }
    setPending(true);
    try {
      await onConfirm();
      onOpenChange?.(false);
    } finally {
      setPending(false);
    }
  };

  const isLoading = loading || pending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="confirm-dialog"
        showCloseButton={false}
        className="sm:max-w-sm"
      >
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-full">
              {icon ?? <AlertTriangleIcon className="size-4" />}
            </div>
            <div className="flex flex-col gap-1.5">
              <DialogTitle>{resolvedTitle}</DialogTitle>
              <DialogDescription>{resolvedDescription}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={isLoading}
          >
            {resolvedCancelText}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handle}
            disabled={isLoading}
          >
            {resolvedConfirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ConfirmOptions {
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

/**
 * @component useConfirm
 * @category business/ux
 * @since 0.2.0
 * @description Hook returning a Promise-based confirm function for programmatic confirmation dialogs / 返回 Promise 确认函数的 Hook，用于编程式调用确认对话框
 * @keywords confirm, hook, promise, dialog, prompt
 * @example
 * const [confirm, close] = useConfirm();
 * const ok = await confirm({ title: "Delete?" });
 */
export function useConfirm(): [
  (options: ConfirmOptions) => Promise<boolean>,
  () => void,
] {
  const [state, setState] = React.useState<{
    open: boolean;
    options: ConfirmOptions;
    resolve?: (v: boolean) => void;
  }>({ open: false, options: {} });

  const confirm = React.useCallback(
    (options: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        setState({ open: true, options, resolve });
      }),
    [],
  );

  const close = React.useCallback(
    (result: boolean) => {
      state.resolve?.(result);
      setState((s) => {
        const { resolve: _resolve, ...rest } = s;
        void _resolve;
        return { ...rest, open: false };
      });
    },
    [state],
  );

  return [confirm, close as () => void] as const;
}

/**
 * @component ConfirmDialogContainer
 * @category business/ux
 * @since 0.2.0
 * @description Container component that wires ConfirmDialog with useConfirm hook state / 将 ConfirmDialog 与 useConfirm 状态连接的容器组件
 * @keywords confirm, dialog, container, hook, bridge
 * @example
 * <ConfirmDialogContainer state={state} onClose={(result) => console.log(result)} />
 */
export function ConfirmDialogContainer({
  state,
  onClose,
}: {
  state: { open: boolean; options: ConfirmOptions };
  onClose: (result: boolean) => void;
}) {
  return (
    <ConfirmDialog
      open={state.open}
      onOpenChange={(open) => {
        if (!open) onClose(false);
      }}
      onConfirm={() => onClose(true)}
      {...state.options}
    />
  );
}
