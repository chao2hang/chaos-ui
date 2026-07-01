import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Direction } from "./direction";

describe("Direction", () => {
  it("exports Direction", () => {
    expect(Direction).toBeDefined();
  });

  it("renders with ltr by default", () => {
    const { container } = render(
      <Direction>
        <p>Hello</p>
      </Direction>,
    );
    expect(screen.getByText("Hello")).toBeDefined();
    expect(container.querySelector('[dir="ltr"]')).not.toBeNull();
  });

  it("renders with rtl direction", () => {
    const { container } = render(
      <Direction dir="rtl">
        <p>مرحبا</p>
      </Direction>,
    );
    expect(screen.getByText("مرحبا")).toBeDefined();
    expect(container.querySelector('[dir="rtl"]')).not.toBeNull();
  });

  it("renders children", () => {
    render(
      <Direction>
        <span data-testid="child">Child content</span>
      </Direction>,
    );
    expect(screen.getByTestId("child")).toBeDefined();
  });

  it("applies direction CSS for rtl", () => {
    const { container } = render(
      <Direction dir="rtl">
        <p>Test</p>
      </Direction>,
    );
    const el = container.querySelector('[data-slot="direction"]');
    expect(el?.className).toContain("[direction:rtl]");
  });

  it("does not apply direction CSS for ltr", () => {
    const { container } = render(
      <Direction dir="ltr">
        <p>Test</p>
      </Direction>,
    );
    const el = container.querySelector('[data-slot="direction"]');
    expect(el?.className).not.toContain("[direction:rtl]");
  });

  it("has data-slot attribute", () => {
    const { container } = render(
      <Direction>
        <p>Test</p>
      </Direction>,
    );
    expect(container.querySelector('[data-slot="direction"]')).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("./direction");
    expect(mod.Direction).toBeDefined();
  });
});
