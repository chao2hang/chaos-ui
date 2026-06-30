import { describe, it, expect } from "vitest";
import { RegionLayout } from "./region-layout";
import type { RegionLayoutProps } from "./region-layout";

describe("region-layout", () => {
  it("exports RegionLayout", () => {
    expect(RegionLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RegionLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
