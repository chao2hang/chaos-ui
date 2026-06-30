import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle, toggleVariants } from "./toggle";

describe("toggle", () => {
  it("exports Toggle", () => {
    expect(Toggle).toBeDefined();
  });

  it("exports toggleVariants", () => {
    expect(toggleVariants).toBeDefined();
  });

  it("renders a toggle button with children", () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByRole("button", { name: "Bold" })).toBeDefined();
  });

  it("reflects default pressed state as off", () => {
    const { container } = render(<Toggle>Off</Toggle>);
    expect(container.querySelector('[data-slot="toggle"]')).not.toBeNull();
  });

  it("reflects pressed state when controlled pressed=true", () => {
    const { container } = render(<Toggle pressed={true}>On</Toggle>);
    const toggle = container.querySelector('[data-slot="toggle"]') as HTMLElement;
    expect(toggle).not.toBeNull();
    fireEvent.click(toggle);
  });

  it("fires onPressedChange when clicked", () => {
    const onPressedChange = vi.fn();
    const { container } = render(
      <Toggle onPressedChange={onPressedChange}>Bold</Toggle>,
    );
    const btn = container.querySelector(
      '[data-slot="toggle"]',
    ) as HTMLElement;
    fireEvent.click(btn);
    expect(onPressedChange).toHaveBeenCalled();
    expect(onPressedChange.mock.calls.at(-1)?.[0]).toBe(true);
  });

  it("renders disabled toggle", () => {
    const onPressedChange = vi.fn();
    const { container } = render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    const toggle = container.querySelector('[data-slot="toggle"]') as HTMLElement;
    expect(toggle).not.toBeNull();
    fireEvent.click(toggle);
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it("applies outline variant class", () => {
    const { container } = render(<Toggle variant="outline">O</Toggle>);
    expect(
      container.querySelector('[data-slot="toggle"]')?.className,
    ).toContain("border");
  });

  it("applies size variants", () => {
    const sizes = ["default", "sm", "lg"] as const;
    for (const size of sizes) {
      const { container } = render(<Toggle size={size}>S</Toggle>);
      const cls = container.querySelector(
        '[data-slot="toggle"]',
      )?.className;
      const expected =
        size === "default"
          ? "h-8"
          : size === "sm"
            ? "h-7"
            : "h-9";
      expect(cls).toContain(expected);
    }
  });

  it("merges custom className", () => {
    const { container } = render(<Toggle className="my-toggle">T</Toggle>);
    expect(
      container.querySelector('[data-slot="toggle"]')?.className,
    ).toContain("my-toggle");
  });

  it("toggleVariants returns class strings", () => {
    expect(toggleVariants({ variant: "default" })).toContain("bg-transparent");
    expect(toggleVariants({ variant: "outline" })).toContain("border");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/toggle");
    expect(mod.Toggle).toBeDefined();
    expect(mod.toggleVariants).toBeDefined();
  });
});
