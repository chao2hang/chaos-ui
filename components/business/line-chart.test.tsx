import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LineChart } from "./line-chart";
import type { LineChartProps } from "./line-chart";

describe("LineChart", () => {
  it("renders series name and labels", () => {
    render(
      <LineChart
        series={[{ name: "营收", values: [10, 30, 20] }]}
        labels={["Q1", "Q2", "Q3"]}
      />,
    );
    expect(screen.getByText("营收")).toBeDefined();
    expect(screen.getByText("Q1")).toBeDefined();
    expect(screen.getByText("Q3")).toBeDefined();
  });

  it("renders default series when omitted", () => {
    render(<LineChart />);
    expect(screen.getByText("营收")).toBeDefined();
  });

  it("exports types", () => {
    const _t: LineChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
