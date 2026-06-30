import { describe, it, expect } from "vitest";
import { DynamicFormBuilder } from "./dynamic-form-builder";
import type { DynamicFormBuilderProps } from "./dynamic-form-builder";

describe("dynamic-form-builder", () => {
  it("exports DynamicFormBuilder", () => {
    expect(DynamicFormBuilder).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DynamicFormBuilderProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
