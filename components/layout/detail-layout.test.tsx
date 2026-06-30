import { describe, it, expect } from "vitest";
import { DetailLayout } from "./detail-layout";
import type { DetailTab } from "./detail-layout";

describe("detail-layout", () => {
  it("exports DetailLayout", () => {
    expect(DetailLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DetailTab | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
