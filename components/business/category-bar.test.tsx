import { describe, it, expect } from "vitest";
import { CategoryBar } from "./category-bar";
import type { CategoryBarProps } from "./category-bar";

describe("category-bar", () => {
  it("exports CategoryBar", () => {
    expect(CategoryBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CategoryBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
