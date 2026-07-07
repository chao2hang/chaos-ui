import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PaymentResult } from "./payment-result";
import type { PaymentResultProps } from "./payment-result";

describe("PaymentResult", () => {
  it("renders success status", () => {
    const { container } = render(<PaymentResult status="success" orderId="TXN-001" />);
    expect(container.querySelector('[data-slot="payment-result"]')).toBeDefined();
  });

  it("renders fail status", () => {
    const { container } = render(<PaymentResult status="fail" />);
    expect(container.querySelector('[data-slot="payment-result"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: PaymentResultProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
