import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Rating } from "./rating";

describe("Rating", () => {
  it("exports Rating", () => {
    expect(Rating).toBeDefined();
  });

  it("renders the radiogroup with max star buttons", () => {
    const { container } = render(<Rating value={3} />);
    expect(container.querySelector('[data-slot="rating"]')).not.toBeNull();
    expect(screen.getByRole("radiogroup")).toBeDefined();
    // default max = 5
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(5);
  });

  it("respects custom max", () => {
    render(<Rating value={2} max={10} />);
    expect(screen.getAllByRole("radio")).toHaveLength(10);
  });

  it("marks the selected star as aria-checked", () => {
    render(<Rating value={3} />);
    const radios = screen.getAllByRole("radio");
    expect(radios[2]!.getAttribute("aria-checked")).toBe("true");
    expect(radios[0]!.getAttribute("aria-checked")).toBe("false");
  });

  it("calls onChange and updates internal value when uncontrolled via defaultValue", () => {
    const onChange = vi.fn();
    render(<Rating defaultValue={1} onChange={onChange} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[3]!);
    expect(onChange).toHaveBeenCalledWith(4);
    expect(radios[3]!.getAttribute("aria-checked")).toBe("true");
  });

  it("does not call onChange when readonly", () => {
    const onChange = vi.fn();
    render(<Rating value={2} readonly onChange={onChange} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]!);
    expect(onChange).not.toHaveBeenCalled();
    // readonly stars are disabled buttons
    expect((radios[0] as HTMLButtonElement).disabled).toBe(true);
  });

  it("applies size classes", () => {
    render(<Rating value={1} size="lg" />);
    const stars = document.querySelectorAll('[data-slot="rating"] svg');
    expect(stars.length).toBeGreaterThan(0);
    const first = stars[0] as SVGElement;
    expect(
      first.className.baseVal ?? first.getAttribute("class") ?? "",
    ).toContain("size-7");
  });

  it("allows half-star clicks when allowHalf", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Rating value={0} allowHalf onChange={onChange} />,
    );
    // each star has a left-half span (w-1/2) for half selection
    const halves = container.querySelectorAll('span[class*="w-1/2"]');
    expect(halves.length).toBe(5);
    fireEvent.click(halves[0]!);
    expect(onChange).toHaveBeenCalledWith(0.5);
  });
});
