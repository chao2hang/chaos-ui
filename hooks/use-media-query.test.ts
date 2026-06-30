import { describe, it, expect } from "vitest";
import { useMediaQuery, useIsDesktop, useIsTablet } from "./use-media-query";

describe("use-media-query", () => {
  it("exports useMediaQuery", () => {
    expect(useMediaQuery).toBeDefined();
  });
  it("exports useIsDesktop", () => {
    expect(useIsDesktop).toBeDefined();
  });
  it("exports useIsTablet", () => {
    expect(useIsTablet).toBeDefined();
  });
});
