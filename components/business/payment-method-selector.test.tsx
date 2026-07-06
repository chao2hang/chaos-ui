import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PaymentMethodSelector } from "./payment-method-selector";
import type { PaymentMethodSelectorProps } from "./payment-method-selector";

describe("PaymentMethodSelector", () => {
  it("renders selector", () => {
    const { container } = render(<PaymentMethodSelector />);
    expect(container.querySelector('[data-slot="payment-method-selector"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: PaymentMethodSelectorProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
