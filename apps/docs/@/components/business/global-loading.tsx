"use client";

import * as React from "react";

import { Spinner } from "@chaos_team/chaos-ui/ui";

/**
 * @component GlobalLoading
 * @category business/feedback
 * @since 0.7.0
 * @description 全局加载层 — 通过 context + hook 控制，无需在每处手动渲染。
 * / Global loading overlay — controlled via context + hook, no manual rendering needed.
 * @keywords loading, global, overlay, spinner, feedback
 * @example
 * // In root layout:
 * <GlobalLoadingProvider>
 *   <App />
 * </GlobalLoadingProvider>
 *
 * // In any component:
 * const { show, hide } = useGlobalLoading();
 * show(); // show overlay
 * hide(); // hide overlay
 */

interface GlobalLoadingContextValue {
  /** Whether the overlay is visible / 是否显示 */
  visible: boolean;
  /** Show the overlay (optionally with a tip) / 显示加载层 */
  show: (tip?: string) => void;
  /** Hide the overlay / 隐藏加载层 */
  hide: () => void;
}

const GlobalLoadingContext = React.createContext<GlobalLoadingContextValue>({
  visible: false,
  show: () => {},
  hide: () => {},
});

interface GlobalLoadingProviderProps {
  children: React.ReactNode;
  /** Default tip text / 默认提示文本 */
  defaultTip?: string;
  /** z-index of the overlay / 遮罩层 z-index */
  zIndex?: number;
}

function GlobalLoadingProvider({
  children,
  defaultTip,
  zIndex = 9999,
}: GlobalLoadingProviderProps) {
  const [visible, setVisible] = React.useState(false);
  const [tip, setTip] = React.useState<string | undefined>(defaultTip);

  const show = React.useCallback(
    (t?: string) => {
      setTip(t ?? defaultTip);
      setVisible(true);
    },
    [defaultTip],
  );

  const hide = React.useCallback(() => {
    setVisible(false);
  }, []);

  const value = React.useMemo(
    () => ({ visible, show, hide }),
    [visible, show, hide],
  );

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
      {visible && (
        <div
          data-slot="global-loading"
          className="bg-background/80 fixed inset-0 flex items-center justify-center backdrop-blur-sm"
          style={{ zIndex }}
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-3">
            <Spinner size="xl" />
            {tip && <p className="text-muted-foreground text-sm">{tip}</p>}
          </div>
        </div>
      )}
    </GlobalLoadingContext.Provider>
  );
}

function useGlobalLoading(): GlobalLoadingContextValue {
  return React.useContext(GlobalLoadingContext);
}

export { GlobalLoadingProvider, useGlobalLoading, GlobalLoadingContext };
export { GlobalLoadingProvider as GlobalLoading };
export type { GlobalLoadingProviderProps, GlobalLoadingContextValue };
