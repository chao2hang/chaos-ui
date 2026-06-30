import { describe, it, expect } from "vitest";
import { FormSection, formSectionVariants } from "./form-section";
import type { FormSectionProps } from "./form-section";

describe("form-section", () => {
  it("exports FormSection", () => {
    expect(FormSection).toBeDefined();
  });

  it("exports formSectionVariants", () => {
    expect(formSectionVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormSectionProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
