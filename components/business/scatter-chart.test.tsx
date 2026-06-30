import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScatterChart } from "./scatter-chart";
import type { ScatterChartProps } from "./scatter-chart";

describe("ScatterChart", () => {
  it("renders axis captions", () => {
    render(
      <ScatterChart
        data={[{ x: 10, y: 20 }]}
        xLabel="成本"
        yLabel="收益"
      />,
    );
    expect(screen.getByText("成本")).toBeDefined();
    expect(screen.getByText("收益")).toBeDefined();
  });

  it("renders default axis labels when omitted", () => {
    render(<ScatterChart />);
    expect(screen.getByText("X")).toBeDefined();
    expect(screen.getByText("Y")).toBeDefined();
  });

  it("exports types", () => {
    const _t: ScatterChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
