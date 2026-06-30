import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("exports Separator", () => {
    expect(Separator).toBeDefined();
  });

  it("renders a separator with the data-slot", () => {
    const { container } = render(<Separator />);
    expect(container.querySelector('[data-slot="separator"]')).not.toBeNull();
  });

  it("defaults to horizontal orientation", () => {
    const { container } = render(<Separator />);
    const el = container.querySelector('[data-slot="separator"]') as HTMLElement;
    expect(el.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("supports vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.querySelector('[data-slot="separator"]') as HTMLElement;
    expect(el.getAttribute("data-orientation")).toBe("vertical");
  });

  it("merges custom className", () => {
    const { container } = render(<Separator className="my-2" />);
    const el = container.querySelector('[data-slot="separator"]') as HTMLElement;
    expect(el.className).toContain("my-2");
    expect(el.className).toContain("bg-border");
  });

  it("forwards html attributes", () => {
    const { container } = render(
      <Separator aria-orientation="horizontal" id="sep" />,
    );
    const el = container.querySelector('[data-slot="separator"]') as HTMLElement;
    expect(el.id).toBe("sep");
  });
});
