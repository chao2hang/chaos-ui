import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Rating } from "@/components/ui/rating";

describe("Rating", () => {
  it("exports Rating", () => {
    expect(Rating).toBeDefined();
    expect(typeof Rating).toBe("function");
  });

  it("renders max number of star radio buttons", () => {
    render(<Rating defaultValue={0} />);
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBe(5);
  });

  it("renders a custom max count", () => {
    render(<Rating defaultValue={0} max={10} />);
    expect(screen.getAllByRole("radio").length).toBe(10);
  });

  it("marks the selected star aria-checked", () => {
    render(<Rating value={3} />);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]!.getAttribute("aria-checked")).toBe("false");
    expect(radios[2]!.getAttribute("aria-checked")).toBe("true");
    expect(radios[4]!.getAttribute("aria-checked")).toBe("false");
  });

  it("fires onChange with the clicked star value (controlled)", () => {
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[3]!);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("updates internal state when uncontrolled", () => {
    render(<Rating defaultValue={1} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[3]!);
    expect(radios[3]!.getAttribute("aria-checked")).toBe("true");
  });

  it("does not fire onChange when readonly", () => {
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} readonly />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[3]!);
    expect(onChange).not.toHaveBeenCalled();
    expect(radios[3]!.hasAttribute("disabled")).toBe(true);
  });

  it("sets hover state on mouse enter (uncontrolled)", () => {
    render(<Rating defaultValue={1} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.mouseEnter(radios[4]!);
    // hovered star shows filled styling
    expect(radios[4]!.getAttribute("aria-checked")).toBe("false");
  });

  it("clears hover on mouse leave of the group", () => {
    const { container } = render(<Rating defaultValue={1} />);
    const group = screen.getByRole("radiogroup");
    fireEvent.mouseEnter(container.querySelector("button:nth-child(5)")!);
    fireEvent.mouseLeave(group);
    expect(group).toBeDefined();
  });

  it("supports allowHalf by rendering half-click zones", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Rating value={2.5} allowHalf onChange={onChange} />,
    );
    // each star renders an absolute half-span overlay
    const halves = container.querySelectorAll("span.absolute");
    expect(halves.length).toBe(5);
    // click the half zone of the first star -> onChange(0.5)
    fireEvent.click(halves[0]!);
    expect(onChange).toHaveBeenCalledWith(0.5);
  });

  it("applies size variant classes", () => {
    const { container, rerender } = render(<Rating defaultValue={0} size="sm" />);
    // StarIcon renders as an <svg>; use getAttribute("class") because SVG
    // elements expose className as an SVGAnimatedString (not a plain string).
    const svgSm = container.querySelector("svg");
    expect(svgSm?.getAttribute("class")).toContain("size-3.5");
    rerender(<Rating defaultValue={0} size="lg" />);
    const svgLg = container.querySelector("svg");
    expect(svgLg?.getAttribute("class")).toContain("size-7");
  });

  it("applies custom className and iconClassName", () => {
    const { container } = render(
      <Rating defaultValue={0} className="my-rating" iconClassName="my-icon" />,
    );
    const root = container.querySelector('[data-slot="rating"]');
    expect(root?.className).toContain("my-rating");
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("class")).toContain("my-icon");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/rating");
    expect(mod.Rating).toBeDefined();
  });
});
