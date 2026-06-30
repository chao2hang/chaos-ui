import { describe, it, expect } from "vitest";
import { ConfigProvider, useConfig, ConfigContext } from "./config-provider";
import type {
  ConfigContextValue,
  ThemeConfig,
  ScrollbarConfig,
} from "./config-provider";

describe("config-provider", () => {
  it("exports ConfigProvider", () => {
    expect(ConfigProvider).toBeDefined();
  });

  it("exports useConfig", () => {
    expect(useConfig).toBeDefined();
  });

  it("exports ConfigContext", () => {
    expect(ConfigContext).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ConfigContextValue | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ThemeConfig | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: ScrollbarConfig | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
