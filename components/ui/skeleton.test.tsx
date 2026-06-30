import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("exports Skeleton", () => {
    expect(Skeleton).toBeDefined();
  });

  it("renders a div with the data-slot", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('[data-slot="skeleton"]')).not.toBeNull();
  });

  it("renders children content", () => {
    render(<Skeleton>loading</Skeleton>);
    expect(screen.getByText("loading")).toBeDefined();
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    const el = container.querySelector('[data-slot="skeleton"]') as HTMLElement;
    expect(el.className).toContain("animate-pulse");
    expect(el.className).toContain("h-4");
    expect(el.className).toContain("w-32");
  });

  it("forwards arbitrary html attributes", () => {
    const { container } = render(
      <Skeleton data-testid="sk" aria-label="loading row" />,
    );
    const el = container.querySelector('[data-slot="skeleton"]') as HTMLElement;
    expect(el.getAttribute("aria-label")).toBe("loading row");
  });
});
