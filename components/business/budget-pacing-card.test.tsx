import { describe, it, expect } from "vitest";
import { BudgetPacingCard } from "./budget-pacing-card";
import type {
  BudgetPacingStatus,
  BudgetPacingTexts,
  BudgetPacingCardProps,
} from "./budget-pacing-card";

describe("budget-pacing-card", () => {
  it("exports BudgetPacingCard", () => {
    expect(BudgetPacingCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BudgetPacingStatus | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: BudgetPacingTexts | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: BudgetPacingCardProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
