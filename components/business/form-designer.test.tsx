import { describe, it, expect } from "vitest";
import { FormDesigner } from "./form-designer";
import type { FormDesignerProps } from "./form-designer";

describe("form-designer", () => {
  it("exports FormDesigner", () => {
    expect(FormDesigner).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormDesignerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
