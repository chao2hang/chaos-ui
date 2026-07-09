import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Dot } from "@chaos_team/chaos-ui/ui";

describe("Dot", () => {
  it("renders a span with the dot slot", () => {
    const { container } = render(<Dot />);
    const el = container.querySelector('[data-slot="dot"]');
    expect(el).toBeTruthy();
    expect(el?.tagName).toBe("SPAN");
  });

  it("applies the chosen variant and size classes", () => {
    const { container } = render(<Dot variant="primary" size="lg" />);
    const el = container.querySelector('[data-slot="dot"]') as HTMLElement;
    expect(el.className).toContain("bg-primary");
    expect(el.className).toContain("size-2.5");
  });

  it("renders pulse animation when pulse is true", () => {
    const { container } = render(<Dot pulse variant="success" />);
    const el = container.querySelector('[data-slot="dot"]') as HTMLElement;
    expect(el.className).toContain("animate-ping");
    expect(el.className).toContain("bg-success");
  });

  it("merges custom className", () => {
    const { container } = render(<Dot className="custom-dot" />);
    const el = container.querySelector('[data-slot="dot"]') as HTMLElement;
    expect(el.className).toContain("custom-dot");
  });

  it("renders all known variants without crashing", () => {
    const variants = [
      "default",
      "primary",
      "success",
      "warning",
      "destructive",
      "info",
    ] as const;
    for (const v of variants) {
      const { container } = render(<Dot variant={v} />);
      expect(container.querySelector('[data-slot="dot"]')).toBeTruthy();
    }
  });
});
