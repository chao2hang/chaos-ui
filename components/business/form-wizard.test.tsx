import { describe, it, expect } from "vitest";
import { FormWizard } from "./form-wizard";
import type { WizardRenderContext } from "./form-wizard";

describe("form-wizard", () => {
  it("exports FormWizard", () => {
    expect(FormWizard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WizardRenderContext | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
