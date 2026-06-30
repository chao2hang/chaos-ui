import { describe, it, expect } from "vitest";
import { PromotionRuleEditor } from "./promotion-rule-editor";
import type { PromotionRuleEditorProps } from "./promotion-rule-editor";

describe("promotion-rule-editor", () => {
  it("exports PromotionRuleEditor", () => {
    expect(PromotionRuleEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PromotionRuleEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
