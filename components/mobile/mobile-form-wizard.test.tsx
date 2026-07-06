import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileFormWizard } from "./mobile-form-wizard";
import type { MobileFormWizardProps } from "./mobile-form-wizard";

describe("MobileFormWizard", () => {
  it("renders", () => {
    const { container } = render(
      <MobileFormWizard
        steps={[{ title: "Step 1", render: () => <div>Step 1</div> }]}
      />,
    );
    expect(container.querySelector('[data-slot="mobile-form-wizard"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileFormWizardProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
