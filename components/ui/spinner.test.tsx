import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";
import type { SpinnerProps } from "./spinner";

describe("spinner", () => {
  it("exports Spinner", () => {
    expect(Spinner).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SpinnerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders circle variant with default label", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('[data-slot="spinner"]');
    expect(spinner).not.toBeNull();
    expect(spinner?.getAttribute("data-variant")).toBe("circle");
    expect(spinner?.getAttribute("role")).toBe("status");
    expect(spinner?.getAttribute("aria-label")).toBe("Loading");
    expect(screen.getByText("Loading")).toBeDefined();
  });

  it("renders dots variant with three dot children", () => {
    const { container } = render(<Spinner variant="dots" label="Loading dots" />);
    const spinner = container.querySelector('[data-slot="spinner"]');
    expect(spinner?.getAttribute("data-variant")).toBe("dots");
    // 3 dot spans + 1 sr-only label span
    const dotSpans = spinner?.querySelectorAll(".animate-bounce");
    expect(dotSpans?.length).toBe(3);
    expect(screen.getByText("Loading dots")).toBeDefined();
  });

  it("renders bars variant with four bar children", () => {
    const { container } = render(<Spinner variant="bars" />);
    const spinner = container.querySelector('[data-slot="spinner"]');
    expect(spinner?.getAttribute("data-variant")).toBe("bars");
    const barSpans = spinner?.querySelectorAll(".animate-pulse");
    expect(barSpans?.length).toBe(4);
  });

  it("applies size class", () => {
    const { container } = render(<Spinner size="lg" />);
    expect(
      container.querySelector('[data-slot="spinner"]')?.className,
    ).toContain("size-7");
  });

  it("applies color class", () => {
    const { container } = render(<Spinner color="destructive" />);
    expect(
      container.querySelector('[data-slot="spinner"]')?.className,
    ).toContain("text-destructive");
  });

  it("uses custom aria-label", () => {
    const { container } = render(<Spinner label="Fetching data" />);
    expect(
      container.querySelector('[data-slot="spinner"]')?.getAttribute(
        "aria-label",
      ),
    ).toBe("Fetching data");
  });

  it("merges custom className", () => {
    const { container } = render(<Spinner className="my-spinner" />);
    expect(
      container.querySelector('[data-slot="spinner"]')?.className,
    ).toContain("my-spinner");
  });

  it("applies all color variants", () => {
    const colors = [
      "primary",
      "secondary",
      "muted",
      "destructive",
      "current",
    ] as const;
    for (const color of colors) {
      const { container } = render(<Spinner color={color} />);
      expect(
        container.querySelector('[data-slot="spinner"]')?.className,
      ).toContain(`text-${color === "current" ? "current" : color}`);
    }
  });

  it("applies all size variants to circle", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { container } = render(<Spinner size={size} />);
      expect(
        container.querySelector('[data-slot="spinner"]')?.className,
      ).toContain(`size-${size === "xs" ? "3" : size === "sm" ? "4" : size === "md" ? "5" : size === "lg" ? "7" : "9"}`);
    }
  });

  it("dots variant applies bounce children with staggered delay", () => {
    const { container } = render(<Spinner variant="dots" />);
    const dots = container.querySelectorAll(".animate-bounce");
    expect(dots.length).toBe(3);
    expect((dots[0] as HTMLElement).style.animationDelay).toBe("0ms");
    expect((dots[2] as HTMLElement).style.animationDelay).toBe("300ms");
  });

  it("bars variant applies pulse children with staggered delay", () => {
    const { container } = render(<Spinner variant="bars" />);
    const bars = container.querySelectorAll(".animate-pulse");
    expect(bars.length).toBe(4);
    expect((bars[0] as HTMLElement).style.animationDelay).toBe("0ms");
    expect((bars[3] as HTMLElement).style.animationDelay).toBe("300ms");
  });

  it("renders sr-only label text in all variants", () => {
    const { container } = render(<Spinner label="Loading bars" variant="bars" />);
    expect(container.querySelector(".sr-only")?.textContent).toBe(
      "Loading bars",
    );
  });

  it("forwards arbitrary span props", () => {
    const { container } = render(
      <Spinner data-testid="my-spin" aria-describedby="desc" />,
    );
    const spin = container.querySelector('[data-slot="spinner"]');
    expect(spin?.getAttribute("aria-describedby")).toBe("desc");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/spinner");
    expect(mod.Spinner).toBeDefined();
  });
});
