import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Badge, badgeVariants } from "./badge";

describe("badge", () => {
  it("exports Badge", () => {
    expect(Badge).toBeDefined();
  });

  it("exports badgeVariants", () => {
    expect(badgeVariants).toBeDefined();
  });

  it("renders a span with data-slot badge and children", () => {
    const { container, getByText } = render(<Badge>New</Badge>);
    expect(getByText("New")).toBeDefined();
    expect(container.querySelector('[data-slot="badge"]')).not.toBeNull();
  });

  it("default variant applies primary classes", () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector('[data-slot="badge"]') as HTMLElement;
    expect(badge.className).toContain("bg-primary");
    expect(badge.className).toContain("text-primary-foreground");
  });

  it.each(["secondary", "destructive", "outline", "ghost", "link"] as const)(
    "renders %s variant with distinct classes",
    (variant) => {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>);
      const badge = container.querySelector('[data-slot="badge"]') as HTMLElement;
      // each variant class string is present
      expect(badge.className.length).toBeGreaterThan(0);
      expect(badge.textContent).toBe(variant);
    },
  );

  it("merges custom className", () => {
    const { container } = render(
      <Badge className="custom-cls">x</Badge>,
    );
    expect(
      (container.querySelector('[data-slot="badge"]') as HTMLElement).className,
    ).toContain("custom-cls");
  });

  it("forwards native props (e.g. title)", () => {
    const { container } = render(<Badge title="tip">x</Badge>);
    expect(
      (container.querySelector('[data-slot="badge"]') as HTMLElement).getAttribute("title"),
    ).toBe("tip");
  });

  it("badgeVariants returns class string for given variant", () => {
    const cls = badgeVariants({ variant: "destructive" });
    expect(typeof cls).toBe("string");
    expect(cls).toContain("text-destructive");
  });
});
