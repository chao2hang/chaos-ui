import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ButtonProps } from "@/components/ui/button";
import { Button, buttonVariants } from "@/components/ui/button";

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
    // icon wrapper gets data-icon=inline-start
    expect(
      container.querySelector('[data-icon="inline-start"]'),
    ).not.toBeNull();
  });

  it("renders trailing icon (iconRight)", () => {
    const { container } = render(
      <Button iconRight={<span data-testid="ricon">▶</span>}>Next</Button>,
    );
    expect(container.querySelector('[data-testid="ricon"]')).not.toBeNull();
    expect(container.querySelector('[data-icon="inline-end"]')).not.toBeNull();
  });

  it("renders both leading and trailing icons with children", () => {
    const { container, getByText } = render(
      <Button
        icon={<span data-testid="li">L</span>}
        iconRight={<span data-testid="ri">R</span>}
      >
        Middle
      </Button>,
    );
    expect(getByText("Middle")).toBeDefined();
    expect(
      container.querySelector('[data-icon="inline-start"]'),
    ).not.toBeNull();
    expect(container.querySelector('[data-icon="inline-end"]')).not.toBeNull();
  });

  it("ButtonProps type is importable", () => {
    const _props: ButtonProps = { variant: "outline", size: "sm" };
    expect(_props.variant).toBe("outline");
  });

  it("forwards extra props (disabled)", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button", { name: "Disabled" });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it("fires onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        NoClick
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "NoClick" });
    fireEvent.click(btn);
    // Base UI disabled buttons have pointer-events:none; click won't fire handler.
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as a button element by default with type button", () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole("button", { name: "Default" });
    expect(btn.tagName).toBe("BUTTON");
  });

  it.each([
    "default",
    "outline",
    "secondary",
    "ghost",
    "destructive",
    "link",
  ] as const)("applies variant class for %s", (variant) => {
    const { container } = render(<Button variant={variant}>{variant}</Button>);
    const btn = container.querySelector('[data-slot="button"]');
    expect(btn?.className.length ?? 0).toBeGreaterThan(0);
  });

  it.each([
    "default",
    "xs",
    "sm",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
  ] as const)("applies size class for %s", (size) => {
    const { container } = render(<Button size={size}>S</Button>);
    const btn = container.querySelector('[data-slot="button"]');
    expect(btn?.className.length ?? 0).toBeGreaterThan(0);
  });

  it("merges custom className", () => {
    const { container } = render(<Button className="my-btn">x</Button>);
    expect(
      (container.querySelector('[data-slot="button"]') as HTMLElement)
        .className,
    ).toContain("my-btn");
  });

  it("buttonVariants returns class string", () => {
    const cls = buttonVariants({ variant: "outline", size: "sm" });
    expect(typeof cls).toBe("string");
    expect(cls).toContain("bg-background");
  });

  it("supports icon-only button (size=icon) without children", () => {
    const { container } = render(
      <Button size="icon" aria-label="settings">
        <span data-testid="gear">⚙</span>
      </Button>,
    );
    const btn = container.querySelector('[data-slot="button"]');
    expect(btn?.className).toContain("size-8");
  });

  it("shows spinner and disables when loading", () => {
    const { container } = render(<Button loading>Save</Button>);
    const btn = container.querySelector(
      '[data-slot="button"]',
    ) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute("data-loading")).toBe("true");
    expect(container.querySelector('[data-slot="spinner"]')).not.toBeNull();
  });
});
