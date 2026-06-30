import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Gauge, RadialProgress } from "./gauge";

describe("Gauge", () => {
  it("renders the computed percentage value", () => {
    render(<Gauge value={42} />);
    expect(screen.getByText("42%")).toBeDefined();
  });

  it("clamps out-of-range values to [min, max]", () => {
    const { container, rerender } = render(<Gauge value={250} />);
    // 250 clamps to 100 -> 100%
    expect(screen.getByText("100%")).toBeDefined();
    expect(container.querySelector('[data-slot="gauge"]')).not.toBeNull();

    rerender(<Gauge value={-50} />);
    // -50 clamps to 0 -> 0%
    expect(screen.getByText("0%")).toBeDefined();
  });

  it("respects custom min/max and formats via formatValue", () => {
    const fmt = (v: number) => `${v}pts`;
    render(<Gauge value={5} min={0} max={10} formatValue={fmt} />);
    expect(screen.getByText("5pts")).toBeDefined();
  });

  it("renders a label and hides value when showValue=false", () => {
    const { rerender } = render(
      <Gauge value={10} label="CPU" showValue={false} />,
    );
    expect(screen.getByText("CPU")).toBeDefined();
    expect(screen.queryByText("10%")).toBeNull();

    rerender(<Gauge value={10} label="CPU" showValue={true} />);
    expect(screen.getByText("10%")).toBeDefined();
  });

  it("exposes meter role with aria values", () => {
    render(<Gauge value={30} min={0} max={100} />);
    const meter = screen.getByRole("meter");
    expect(meter.getAttribute("aria-valuenow")).toBe("30");
    expect(meter.getAttribute("aria-valuemin")).toBe("0");
    expect(meter.getAttribute("aria-valuemax")).toBe("100");
  });

  it("renders both track and progress svg paths", () => {
    const { container } = render(<Gauge value={50} />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });
});

describe("RadialProgress", () => {
  it("renders the rounded percentage", () => {
    render(<RadialProgress value={33} />);
    expect(screen.getByText("33%")).toBeDefined();
  });

  it("clamps value to 0..100", () => {
    const { rerender } = render(<RadialProgress value={999} />);
    expect(screen.getByText("100%")).toBeDefined();
    rerender(<RadialProgress value={-10} />);
    expect(screen.getByText("0%")).toBeDefined();
  });

  it("hides the value when showValue=false", () => {
    render(<RadialProgress value={50} showValue={false} />);
    expect(screen.queryByText("50%")).toBeNull();
  });

  it("exposes progressbar role with aria values", () => {
    render(<RadialProgress value={60} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("60");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
  });
});
