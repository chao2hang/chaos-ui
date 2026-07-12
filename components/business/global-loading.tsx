"use client";

import * as React from "react";

import { GlobalLoading } from "@/components/ui/global-loading";

/**
 * @component GlobalLoadingProvider
 * @category business/feedback
 * @since 0.7.0
 * @description 全局加载层 — 通过 context + hook 控制；内部组合 UI `GlobalLoading`，不重复实现 overlay。
 * / Global loading overlay via context + hook. Renders UI `GlobalLoading` (no second overlay stack).
 * @keywords loading, global, overlay, spinner, feedback
 * @example
 * // In root layout:
 * <GlobalLoadingProvider>
 *   <App />
 * </GlobalLoadingProvider>
 *
 * // In any component:
 * const { show, hide } = useGlobalLoading();
 * show("Saving…");
 * hide();
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
  /**
   * Optional z-index override for the overlay.
   * Default relies on UI GlobalLoading → `--z-index-overlay`.
   * / 可选覆盖层 z-index；默认走 UI token
   */
  zIndex?: number;
}

function GlobalLoadingProvider({
  children,
  defaultTip,
  zIndex,
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
      <GlobalLoading
        loading={visible}
        fullscreen
        {...(tip !== undefined ? { text: tip } : {})}
        {...(zIndex !== undefined ? { style: { zIndex } } : {})}
      />
    </GlobalLoadingContext.Provider>
  );
}

function useGlobalLoading(): GlobalLoadingContextValue {
  return React.useContext(GlobalLoadingContext);
}

export { GlobalLoadingProvider, useGlobalLoading, GlobalLoadingContext };
export type { GlobalLoadingProviderProps, GlobalLoadingContextValue };
