import { describe, it, expect } from "vitest";
import { PolicyLineEditor } from "./policy-line-editor";
import type { PolicyLineEditorProps } from "./policy-line-editor";

describe("policy-line-editor", () => {
  it("exports PolicyLineEditor", () => {
    expect(PolicyLineEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PolicyLineEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
