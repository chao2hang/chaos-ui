import { describe, it, expect } from "vitest";
import { BudgetOverview } from "./budget-overview";
import type { BudgetOverviewProps } from "./budget-overview";

describe("budget-overview", () => {
  it("exports BudgetOverview", () => {
    expect(BudgetOverview).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BudgetOverviewProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
