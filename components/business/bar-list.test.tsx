import { describe, it, expect } from "vitest";
import { BarList } from "./bar-list";
import type { BarListProps } from "./bar-list";

describe("bar-list", () => {
  it("exports BarList", () => {
    expect(BarList).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BarListProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
