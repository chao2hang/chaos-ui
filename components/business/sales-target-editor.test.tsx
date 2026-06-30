import { describe, it, expect } from "vitest";
import { SalesTargetEditor } from "./sales-target-editor";
import type { SalesTargetEditorProps } from "./sales-target-editor";

describe("sales-target-editor", () => {
  it("exports SalesTargetEditor", () => {
    expect(SalesTargetEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SalesTargetEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
