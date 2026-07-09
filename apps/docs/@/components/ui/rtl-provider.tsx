"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component RTLProvider
 * @category ui/utilities
 * @since 0.2.0
 * @description RTL (right-to-left) layout provider that sets the `dir` attribute and provides context for child components to adjust their layout / RTL（从右到左）布局 Provider，设置 `dir` 属性并提供上下文供子组件调整布局
 * @keywords rtl, ltr, direction, i18n, provider, layout
 * @example
 * <RTLProvider dir="rtl">
 *   <MyComponent />
 * </RTLProvider>
 */

interface RTLProviderProps {
  /** Text direction / 文本方向 */
  dir?: "ltr" | "rtl" | "auto";
  children?: React.ReactNode;
  className?: string;
}

interface RTLContextValue {
  dir: "ltr" | "rtl" | "auto";
  isRTL: boolean;
}

const RTLContext = React.createContext<RTLContextValue>({
  dir: "ltr",
  isRTL: false,
});

function RTLProvider({ dir = "ltr", children, className }: RTLProviderProps) {
  const value = React.useMemo<RTLContextValue>(
    () => ({ dir, isRTL: dir === "rtl" }),
    [dir],
  );

  return (
    <RTLContext.Provider value={value}>
      <div data-slot="rtl-provider" dir={dir} className={cn(className)}>
        {children}
      </div>
    </RTLContext.Provider>
  );
}

/**
 * @component useRTL
 * @category ui/utilities
 * @since 0.2.0
 * @description Hook to access the RTL context (dir, isRTL) / 访问 RTL 上下文的 Hook
 * @keywords rtl, hook, direction, ltr
 * @example
 * const { isRTL, dir } = useRTL();
 */
function useRTL(): RTLContextValue {
  return React.useContext(RTLContext);
}

export { RTLProvider, RTLContext, useRTL };
export type { RTLProviderProps, RTLContextValue };
