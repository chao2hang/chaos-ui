import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DonutChart } from "./donut-chart";
import type { DonutChartProps } from "./donut-chart";

describe("DonutChart", () => {
  it("renders legend labels, values and center label", () => {
    const { container } = render(
      <DonutChart
        centerLabel="100%"
        data={[
          { label: "已完成", value: 60, color: "#3b82f6" },
          { label: "进行中", value: 28, color: "#10b981" },
        ]}
      />,
    );
    expect(screen.getByText("100%")).toBeDefined();
    expect(screen.getByText("已完成")).toBeDefined();
    expect(screen.getByText("进行中")).toBeDefined();
    // one svg with two segment circles
    expect(container.querySelectorAll("circle")).toHaveLength(2);
  });

  it("renders default data when omitted", () => {
    render(<DonutChart />);
    expect(screen.getByText("待处理")).toBeDefined();
    expect(screen.getByText("已完成")).toBeDefined();
  });

  it("exposes aria-label with segment count and total", () => {
    render(
      <DonutChart data={[{ label: "A", value: 10 }, { label: "B", value: 5 }]} />,
    );
    expect(screen.getByRole("img", { name: "环形图，共 2 段，总计 15" })).toBeDefined();
  });

  it("falls back to currentColor stroke when no color given", () => {
    const { container } = render(
      <DonutChart data={[{ label: "X", value: 5 }]} />,
    );
    const seg = container.querySelector("circle");
    expect(seg?.getAttribute("stroke")).toBe("currentColor");
  });

  it("renders legend color swatch using provided color", () => {
    const { container } = render(
      <DonutChart data={[{ label: "X", value: 5, color: "#ff0000" }]} />,
    );
    const swatch = container.querySelector("ul li span");
    expect(swatch).not.toBeNull();
    expect((swatch as HTMLElement).style.backgroundColor).toBe("rgb(255, 0, 0)");
  });

  it("omits center label span when not provided", () => {
    const { container } = render(
      <DonutChart data={[{ label: "X", value: 5 }]} />,
    );
    expect(container.querySelector(".absolute.inset-0")).toBeNull();
  });

  it("handles all-zero data without dividing by zero", () => {
    const { container } = render(
      <DonutChart data={[{ label: "零", value: 0 }]} />,
    );
    expect(container.querySelector("circle")).not.toBeNull();
    expect(screen.getByText("零")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <DonutChart className="extra" data={[{ label: "X", value: 1 }]} />,
    );
    expect(container.querySelector(".extra")).not.toBeNull();
  });

  it("exports types", () => {
    const _t: DonutChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
