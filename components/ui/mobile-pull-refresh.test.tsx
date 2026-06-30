import { describe, it, expect } from "vitest";
import { MobilePullRefresh } from "./mobile-pull-refresh";
import type { MobilePullRefreshProps } from "./mobile-pull-refresh";

describe("mobile-pull-refresh", () => {
  it("exports MobilePullRefresh", () => {
    expect(MobilePullRefresh).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobilePullRefreshProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
