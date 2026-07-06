import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CouponCard } from "./coupon-card";
import type { CouponCardProps } from "./coupon-card";

describe("CouponCard", () => {
  it("renders value", () => {
    render(<CouponCard value="¥50" />);
    expect(screen.getByText("¥50")).toBeDefined();
  });

  it("exports types", () => {
    const _t: CouponCardProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
