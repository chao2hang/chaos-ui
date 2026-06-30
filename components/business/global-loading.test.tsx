import { describe, it, expect } from "vitest";
import {
  GlobalLoadingProvider,
  useGlobalLoading,
  GlobalLoadingContext,
} from "./global-loading";
import type {
  GlobalLoadingProviderProps,
  GlobalLoadingContextValue,
} from "./global-loading";

describe("global-loading", () => {
  it("exports GlobalLoadingProvider", () => {
    expect(GlobalLoadingProvider).toBeDefined();
  });

  it("exports useGlobalLoading", () => {
    expect(useGlobalLoading).toBeDefined();
  });

  it("exports GlobalLoadingContext", () => {
    expect(GlobalLoadingContext).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: GlobalLoadingProviderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: GlobalLoadingContextValue | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
