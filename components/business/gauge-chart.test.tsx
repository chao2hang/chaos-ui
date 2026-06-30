import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GaugeChart } from "./gauge-chart";
import type { GaugeChartProps } from "./gauge-chart";

describe("GaugeChart", () => {
  it("renders label caption", () => {
    render(<GaugeChart value={72} max={100} label="完成率" />);
    expect(screen.getByText("完成率")).toBeDefined();
  });

  it("renders default value when omitted", () => {
    render(<GaugeChart />);
    expect(screen.getByText("64")).toBeDefined();
  });

  it("exports types", () => {
    const _t: GaugeChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
