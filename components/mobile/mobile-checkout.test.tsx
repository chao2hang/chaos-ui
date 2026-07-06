import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileCheckout } from "./mobile-checkout";
import type { MobileCheckoutProps } from "./mobile-checkout";

describe("MobileCheckout", () => {
  it("renders total", () => {
    render(<MobileCheckout total="¥168.00" />);
    expect(screen.getByText("¥168.00")).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileCheckoutProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
