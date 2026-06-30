import { describe, it, expect } from "vitest";
import { WizardLayout } from "./wizard-layout";
import type { WizardLayoutProps } from "./wizard-layout";

describe("wizard-layout", () => {
  it("exports WizardLayout", () => {
    expect(WizardLayout).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WizardLayoutProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
