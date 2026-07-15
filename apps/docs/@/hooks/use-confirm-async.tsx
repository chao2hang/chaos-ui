"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  useSafeTranslation,
} from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { AlertCircleIcon } from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";

/**
 * @hook useConfirmAsync
 * @category hooks/feedback
 * @since 0.5.0
 * @description Imperative confirm API. Two usage modes:
 *
 * 1. **Hook mode** — requires rendering `<ConfirmDialog />` in JSX:
 *   const [confirm, ConfirmDialog] = useConfirmAsync();
 *   const ok = await confirm({ title: "Delete?" });
 *   return <>{ConfirmDialog}</>
 *
 * 2. **Provider mode** — auto-mounts via `ConfirmProvider`, no JSX needed:
 *   // In app root:
 *   <ConfirmProvider>...</ConfirmProvider>
 *   // Anywhere:
 *   const confirmed = await confirmAsync({ title: "Delete?" });
 *
 * / 命令式确认 API，支持手动挂载和 Provider 自动挂载两种模式
 * @keywords confirm, dialog, imperative, async, modal, provider
 */

interface ConfirmOptions {
  title?: string;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  okVariant?: "default" | "destructive";
  icon?: React.ReactNode;
}

// --- Context for Provider mode ---

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = React.createContext<ConfirmFn | null>(null);

/**
 * `confirmAsync` — global imperative confirm when ConfirmProvider is mounted.
 * Call from any component without rendering a dialog yourself.
 * / 全局命令式确认，需 ConfirmProvider 包裹
 * @throws Error if called outside ConfirmProvider
 */
function confirmAsync(options: ConfirmOptions): Promise<boolean> {
  // This function is replaced at runtime by the context version when used as a hook.
  // The standalone call version reads from the module-level ref.
  if (moduleLevelConfirm) {
    return moduleLevelConfirm(options);
  }
  throw new Error(
    "confirmAsync() called outside <ConfirmProvider>. " +
      "Either wrap your app with <ConfirmProvider> or use useConfirmAsync() hook.",
  );
}

// Module-level ref so confirmAsync() works without React context
let moduleLevelConfirm: ConfirmFn | null = null;

function ConfirmAsyncDialog({
  open,
  options,
  onOk,
  onCancel,
}: {
  open: boolean;
  options: ConfirmOptions;
  onOk: () => void;
  onCancel: () => void;
}) {
  const { t } = useSafeTranslation("navigation");
  const isDestructive = options.okVariant === "destructive";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onCancel();
      }}
    >
      <DialogContent
        data-slot="confirm-dialog"
        showCloseButton={false}
        className="sm:max-w-sm"
      >
        <DialogHeader>
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-full [&_svg]:size-6",
                isDestructive
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted",
              )}
            >
              {options.icon ?? <AlertCircleIcon />}
            </div>
            <div className="flex flex-col gap-1.5">
              <DialogTitle>
                {options.title ?? t("confirmDialog.title", "确认操作")}
              </DialogTitle>
              <DialogDescription>
                {options.content ??
                  t("confirmDialog.description", "此操作不可撤销，是否继续？")}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {options.cancelText ?? t("confirmDialog.cancel", "取消")}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={onOk}
          >
            {options.okText ?? t("confirmDialog.confirm", "确认")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Provider ---

interface ConfirmProviderProps {
  children: React.ReactNode;
  /** Default options merged into every call / 全局默认选项 */
  defaultOptions?: ConfirmOptions;
}

function ConfirmProvider({ children, defaultOptions }: ConfirmProviderProps) {
  const [state, setState] = React.useState<{
    open: boolean;
    options: ConfirmOptions;
    resolve: ((v: boolean) => void) | null;
  }>({ open: false, options: {}, resolve: null });

  const confirm = React.useCallback(
    (options: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        const merged = { ...defaultOptions, ...options };
        setState({ open: true, options: merged, resolve });
      }),
    [defaultOptions],
  );

  // Register module-level ref
  React.useEffect(() => {
    moduleLevelConfirm = confirm;
    return () => {
      moduleLevelConfirm = null;
    };
  }, [confirm]);

  const handleOk = React.useCallback(() => {
    state.resolve?.(true);
    setState((s) => ({ ...s, open: false }));
  }, [state.resolve]);

  const handleCancel = React.useCallback(() => {
    state.resolve?.(false);
    setState((s) => ({ ...s, open: false }));
  }, [state.resolve]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmAsyncDialog
        open={state.open}
        options={state.options}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

// --- Hook mode ---

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
    <ConfirmAsyncDialog
      open={state.open}
      options={state.options}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );

  return [confirm, ConfirmDialog];
}

// --- useConfirmContext: access Provider's confirm from components ---

function useConfirmContext(): ConfirmFn {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirmContext must be used within <ConfirmProvider>");
  }
  return ctx;
}

export { useConfirmAsync, ConfirmProvider, confirmAsync, useConfirmContext };
export type { ConfirmOptions, ConfirmProviderProps };
