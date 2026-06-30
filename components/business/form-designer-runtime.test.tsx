import { describe, it, expect } from "vitest";
import { FormDesignerRuntime } from "./form-designer-runtime";
import type { FormDesignerRuntimeProps } from "./form-designer-runtime";

describe("form-designer-runtime", () => {
  it("exports FormDesignerRuntime", () => {
    expect(FormDesignerRuntime).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormDesignerRuntimeProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
