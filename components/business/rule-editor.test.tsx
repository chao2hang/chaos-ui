import { describe, it, expect } from "vitest";
import { RuleEditor } from "./rule-editor";
import type { RuleEditorProps } from "./rule-editor";

describe("rule-editor", () => {
  it("exports RuleEditor", () => {
    expect(RuleEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: RuleEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
