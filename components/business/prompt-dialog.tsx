"use client";
import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Button, Input, Label } from "@/components/ui";

interface PromptDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: React.ReactNode;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (value: string) => void | Promise<void>;
  required?: boolean;
  inputType?: "text" | "email" | "password" | "number";
}

/**
 * @component PromptDialog
 * @category business/ux
 * @since 0.2.0
 * @description Modal dialog for collecting a single text input from the user / 模态对话框，用于收集用户的单行文本输入
 * @keywords prompt, dialog, input, modal, confirm
 * @example
 * <PromptDialog open={open} onOpenChange={setOpen} onConfirm={(value) => console.log(value)} />
 */
export function PromptDialog({
  open,
  onOpenChange,
  title = "请输入",
  description,
  label,
  placeholder,
  defaultValue = "",
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  required = true,
  inputType = "text",
}: PromptDialogProps) {
  const { t } = useTranslation("navigation");
  const resolvedTitle = title === "请输入" ? t("promptDialog.title") : title;
  const resolvedConfirmText =
    confirmText === "确认" ? t("promptDialog.confirm") : confirmText;
  const resolvedCancelText =
    cancelText === "取消" ? t("promptDialog.cancel") : cancelText;
  return (
    <Dialog data-slot="prompt-dialog" open={open} onOpenChange={onOpenChange}>
      {open && (
        <PromptDialogBody
          title={resolvedTitle}
          description={description}
          {...(label !== undefined ? { label } : {})}
          {...(placeholder !== undefined ? { placeholder } : {})}
          defaultValue={defaultValue}
          confirmText={resolvedConfirmText}
          cancelText={resolvedCancelText}
          required={required}
          inputType={inputType}
          {...(onConfirm ? { onConfirm } : {})}
          onClose={() => onOpenChange?.(false)}
        />
      )}
    </Dialog>
  );
}

/**
 * @component PromptDialogBody
 * @category business/ux
 * @since 0.2.0
 * @description Internal body component for PromptDialog rendering the input form / PromptDialog 的内部表单渲染组件
 * @keywords prompt, dialog, form, input, internal
 */
function PromptDialogBody({
  title,
  description,
  label,
  placeholder,
  defaultValue,
  confirmText,
  cancelText,
  required,
  inputType,
  onConfirm,
  onClose,
}: Omit<PromptDialogProps, "open" | "onOpenChange"> & { onClose: () => void }) {
  const { t } = useTranslation("navigation");
  const resolvedTitle = title === "请输入" ? t("promptDialog.title") : title;
  const resolvedConfirmText =
    confirmText === "确认" ? t("promptDialog.confirm") : confirmText;
  const resolvedCancelText =
    cancelText === "取消" ? t("promptDialog.cancel") : cancelText;
  const [value, setValue] = React.useState(defaultValue ?? "");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handle = async () => {
    if (required && !value.trim()) {
      setError(t("promptDialog.required"));
      return;
    }
    if (!onConfirm) {
      onClose();
      return;
    }
    setPending(true);
    try {
      await onConfirm(value);
      onClose();
    } finally {
      setPending(false);
    }
  };

  return (
    <DialogContent showCloseButton={false} className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{resolvedTitle}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <div className="flex flex-col gap-1.5">
        {label && <Label>{label}</Label>}
        <Input
          type={inputType}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder={placeholder}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handle();
            }
          }}
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={pending}>
          {resolvedCancelText}
        </Button>
        <Button onClick={handle} disabled={pending}>
          {resolvedConfirmText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
