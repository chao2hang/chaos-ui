import { describe, it, expect } from "vitest";
import { PromotionRuleCard } from "./promotion-rule-card";
import type { PromotionRuleCardProps } from "./promotion-rule-card";

describe("promotion-rule-card", () => {
  it("exports PromotionRuleCard", () => {
    expect(PromotionRuleCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PromotionRuleCardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
