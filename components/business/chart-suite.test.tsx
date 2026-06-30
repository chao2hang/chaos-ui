import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartSuite } from "./chart-suite";
import type { ChartSuiteProps } from "./chart-suite";

describe("ChartSuite", () => {
  it("renders empty state when data is empty", () => {
    render(<ChartSuite type="bar" data={[]} />);
    expect(screen.getByText("暂无数据")).toBeDefined();
  });

  it("dispatches bar chart and renders labels", () => {
    render(
      <ChartSuite
        type="bar"
        data={[
          { label: "Q1", value: 30 },
          { label: "Q2", value: 60 },
        ]}
        xField="label"
        yField="value"
      />,
    );
    expect(screen.getByText("Q1")).toBeDefined();
    expect(screen.getByText("Q2")).toBeDefined();
  });

  it("dispatches pie chart and renders legend", () => {
    render(
      <ChartSuite
        type="pie"
        data={[
          { label: "A", value: 30 },
          { label: "B", value: 70 },
        ]}
        xField="label"
        yField="value"
      />,
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });

  it("exports types", () => {
    const _t: ChartSuiteProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
