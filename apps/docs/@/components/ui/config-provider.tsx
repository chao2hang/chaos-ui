"use client";

import * as React from "react";

interface ConfigContextValue {
  /** Component size */
  size?: "sm" | "default" | "lg";
  /** Color theme for components */
  theme?: "light" | "dark" | "system";
  /** Locale for components */
  locale?: string;
  /** Prefix class name */
  prefixCls?: string;
  /** RTL mode */
  direction?: "ltr" | "rtl";
}

const defaultConfig: ConfigContextValue = {
  size: "default",
  theme: "system",
  locale: "en",
  direction: "ltr",
};

const ConfigContext = React.createContext<ConfigContextValue>(defaultConfig);

function useConfig(): ConfigContextValue {
  return React.useContext(ConfigContext);
}

interface ConfigProviderProps
  extends ConfigContextValue, React.ComponentProps<"div"> {
  children: React.ReactNode;
}

function ConfigProvider({
  children,
  size,
  theme,
  locale,
  prefixCls,
  direction,
  ...props
}: ConfigProviderProps) {
  const parentConfig = useConfig();

  const mergedConfig = React.useMemo<ConfigContextValue>(
    () => ({
      size: size ?? parentConfig.size,
      theme: theme ?? parentConfig.theme,
      locale: locale ?? parentConfig.locale,
      prefixCls: prefixCls ?? parentConfig.prefixCls,
      direction: direction ?? parentConfig.direction,
    }),
    [size, theme, locale, prefixCls, direction, parentConfig],
  );

  return (
    <ConfigContext.Provider value={mergedConfig}>
      <div data-slot="config-provider" dir={mergedConfig.direction} {...props}>
        {children}
      </div>
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext, useConfig };
