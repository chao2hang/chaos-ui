"use client";
import * as React from "react";
import { AlertTriangleIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
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
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
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
