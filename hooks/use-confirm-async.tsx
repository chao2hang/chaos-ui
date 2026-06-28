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
import { AlertCircleIcon } from "@/components/ui/icons";

/**
 * @hook useConfirmAsync
 * @category hooks/feedback
 * @since 0.5.0
 * @description Imperative confirm API: `const ok = await confirm({ title, content })`.
 * Replacement for the more complex useConfirm + ConfirmDialogContainer combo.
 * / 命令式确认 API，一行调用替代挂载渲染层
 * @keywords confirm, dialog, imperative, async, modal
 * @example
 * const [confirm, ConfirmDialog] = useConfirmAsync();
 * // in handler:
 * const ok = await confirm({ title: "确认删除?", content: "此操作不可撤销" });
 * if (ok) await api.delete(id);
 * // in JSX:
 * return <>{ConfirmDialog}</>
 */

interface ConfirmOptions {
  title?: string;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  okVariant?: "default" | "destructive";
  icon?: React.ReactNode;
}

function useConfirmAsync(): [
  (options: ConfirmOptions) => Promise<boolean>,
  () => React.ReactNode,
] {
  const [state, setState] = React.useState<{
    open: boolean;
    options: ConfirmOptions;
    resolve: ((v: boolean) => void) | null;
  }>({ open: false, options: {}, resolve: null });

  const confirm = React.useCallback(
    (options: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        setState({ open: true, options, resolve });
      }),
    [],
  );

  const handleOk = React.useCallback(() => {
    state.resolve?.(true);
    setState((s) => ({ ...s, open: false }));
  }, [state.resolve]);

  const handleCancel = React.useCallback(() => {
    state.resolve?.(false);
    setState((s) => ({ ...s, open: false }));
  }, [state.resolve]);

  const ConfirmDialog = () => (
    <Dialog open={state.open} onOpenChange={(open) => { if (!open) handleCancel(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              {state.options.icon ?? <AlertCircleIcon className="size-4" />}
            </div>
            <div className="flex flex-col gap-1.5">
              <DialogTitle>{state.options.title ?? "确认操作"}</DialogTitle>
              <DialogDescription>{state.options.content ?? "此操作不可撤销，是否继续？"}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {state.options.cancelText ?? "取消"}
          </Button>
          <Button
            variant={state.options.okVariant === "destructive" ? "destructive" : "default"}
            onClick={handleOk}
          >
            {state.options.okText ?? "确认"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [confirm, ConfirmDialog];
}

export { useConfirmAsync };
export type { ConfirmOptions };
