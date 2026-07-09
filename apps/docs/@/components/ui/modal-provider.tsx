"use client";

/**
 * @component ModalProvider
 * @category ui/feedback
 * @since 0.3.0
 * @description Mounts the global modal host at app root. Required for `Modal.confirm()` static API to work.
 * Must be mounted inside the React tree (e.g. in app/layout.tsx).
 * @keywords modal, dialog, confirm, provider, imperative
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { ModalProvider } from '@chaos_team/chaos-ui';
 * import { MessageProvider } from '@chaos_team/chaos-ui/next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ModalProvider />
 *         <MessageProvider />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

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
import {
  useImperativeModals,
  modalStore,
  type ImperativeModalConfig,
} from "@/lib/modal-store";
import { cn } from "@/lib/utils";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  AlertCircleIcon,
} from "@/components/ui/icons";

/**
 * Context for modal API — allows child components to access
 * the modal provider's openModal method.
 */
const ModalContext = React.createContext<{
  openModal?: (config: { title?: React.ReactNode; content?: React.ReactNode }) => void;
} | null>(null);

const kindIcons: Record<string, React.ReactNode> = {
  confirm: <AlertCircleIcon className="text-primary size-5" />,
  info: <InfoIcon className="size-5 text-blue-500" />,
  warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
  success: <CircleCheckIcon className="size-5 text-emerald-500" />,
  error: <OctagonXIcon className="text-destructive size-5" />,
};

const kindOkText: Record<string, string> = {
  confirm: "确认",
  info: "知道了",
  warning: "知道了",
  success: "好的",
  error: "知道了",
};

function ImperativeModal({ config }: { config: ImperativeModalConfig }) {
  const [loading, setLoading] = React.useState(false);

  const handleOk = React.useCallback(async () => {
    setLoading(true);
    try {
      if (config.resolve) {
        await config.resolve(true);
      }
    } finally {
      setLoading(false);
      modalStore.close(config.id, true);
    }
  }, [config]);

  const handleCancel = React.useCallback(() => {
    config.resolve?.(false);
    modalStore.close(config.id, false);
  }, [config]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        // User dismiss via mask/esc — treat as cancel
        config.resolve?.(false);
        modalStore.close(config.id, false);
      }
    },
    [config],
  );

  const showCancel = config.kind === "confirm";
  const icon = config.icon ?? kindIcons[config.kind];
  const defaultOkText = kindOkText[config.kind] ?? "OK";
  const canDismiss = config.maskClosable !== false;

  return (
    <Dialog
      open
      onOpenChange={handleOpenChange}
      disablePointerDismissal={!canDismiss}
    >
      <DialogContent
        className={cn("sm:max-w-[425px]")}
        style={{
          maxWidth:
            typeof config.width === "number"
              ? `${config.width}px`
              : config.width,
        }}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            {config.title ?? ""}
          </DialogTitle>
          {config.content && (
            <DialogDescription>{config.content}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          {showCancel && (
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {config.cancelText ?? "取消"}
            </Button>
          )}
          <Button
            variant={
              config.okVariant === "destructive" ? "destructive" : "default"
            }
            onClick={handleOk}
            disabled={loading}
          >
            {loading ? "处理中..." : (config.okText ?? defaultOkText)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ModalProvider() {
  const modals = useImperativeModals();

  return (
    <div data-slot="modal-provider">
      {modals.map((config) => (
        <ImperativeModal key={config.id} config={config} />
      ))}
    </div>
  );
}

export { ModalContext };
