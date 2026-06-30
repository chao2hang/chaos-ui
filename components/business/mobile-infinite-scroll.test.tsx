import { describe, it, expect } from "vitest";
import { MobileInfiniteScroll } from "./mobile-infinite-scroll";
import type { MobileInfiniteScrollProps } from "./mobile-infinite-scroll";

describe("mobile-infinite-scroll", () => {
  it("exports MobileInfiniteScroll", () => {
    expect(MobileInfiniteScroll).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MobileInfiniteScrollProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
