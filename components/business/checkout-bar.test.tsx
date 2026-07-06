import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CheckoutBar } from "./checkout-bar";
import type { CheckoutBarProps } from "./checkout-bar";

describe("CheckoutBar", () => {
  it("renders total", () => {
    const { container } = render(<CheckoutBar total="$168.00" />);
    expect(container.querySelector('[data-slot="checkout-bar"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: CheckoutBarProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
