import { describe, it, expect } from "vitest";
import { FilterBar } from "./filter-bar";
import type { FilterBarProps, FilterField } from "./filter-bar";

describe("filter-bar", () => {
  it("exports FilterBar", () => {
    expect(FilterBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FilterBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FilterField | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
