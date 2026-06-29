import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  it("applies variant classes", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const btn = container.querySelector('[data-slot="button"]');
    expect(btn?.className).toContain("bg-destructive");
  });

  it("applies size classes", () => {
    const { container } = render(<Button size="lg">Big</Button>);
    const btn = container.querySelector('[data-slot="button"]');
    expect(btn?.className).toContain("h-9");
  });

  it("renders leading icon", () => {
    const { container } = render(
      <Button icon={<span data-testid="icon">★</span>}>Star</Button>,
    );
    expect(container.querySelector('[data-testid="icon"]')).not.toBeNull();
  });

  it("ButtonProps type is importable", () => {
    // Compile-time check: ButtonProps is exported and usable.
    const _props: ButtonProps = { variant: "outline", size: "sm" };
    expect(_props.variant).toBe("outline");
  });

  it("forwards extra props (disabled)", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button", { name: "Disabled" });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });
});
