import { describe, it, expect } from "vitest";
import { BudgetAllocator } from "./budget-allocator";
import type { BudgetAllocatorProps } from "./budget-allocator";

describe("budget-allocator", () => {
  it("exports BudgetAllocator", () => {
    expect(BudgetAllocator).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BudgetAllocatorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
