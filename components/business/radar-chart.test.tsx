import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadarChart } from "./radar-chart";
import type { RadarChartProps } from "./radar-chart";

describe("RadarChart", () => {
  it("renders axis labels and series name", () => {
    render(
      <RadarChart
        axes={["速度", "质量", "成本"]}
        series={[{ name: "本期", values: [80, 60, 40] }]}
      />,
    );
    expect(screen.getByText("速度")).toBeDefined();
    expect(screen.getByText("质量")).toBeDefined();
    expect(screen.getByText("成本")).toBeDefined();
    expect(screen.getByText("本期")).toBeDefined();
  });

  it("renders default axes when omitted", () => {
    render(<RadarChart />);
    expect(screen.getByText("创新")).toBeDefined();
  });

  it("exports types", () => {
    const _t: RadarChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
