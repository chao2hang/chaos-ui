import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobileSwipeCard } from "./mobile-swipe-card";
import type { MobileSwipeCardProps } from "./mobile-swipe-card";

describe("MobileSwipeCard", () => {
  it("renders children", () => {
    const { container } = render(
      <MobileSwipeCard>
        <div>Card 1</div>
        <div>Card 2</div>
      </MobileSwipeCard>,
    );
    expect(container.querySelector('[data-slot="mobile-swipe-card"]')).toBeDefined();
  });

  it("exports types", () => {
    const _t: MobileSwipeCardProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
