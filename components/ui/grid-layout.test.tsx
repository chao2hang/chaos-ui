import { describe, it, expect } from "vitest";
import { GridLayout, GridItem, gridLayoutVariants } from "./grid-layout";
import type { GridLayoutProps, GridItemProps } from "./grid-layout";

describe("grid-layout", () => {
  it("exports GridLayout", () => {
    expect(GridLayout).toBeDefined();
  });

  it("exports GridItem", () => {
    expect(GridItem).toBeDefined();
  });

  it("exports gridLayoutVariants", () => {
    expect(gridLayoutVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: GridLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: GridItemProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
