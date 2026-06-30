import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AreaChart } from "./area-chart";
import type { AreaChartProps } from "./area-chart";

describe("AreaChart", () => {
  it("renders x-axis labels from data", () => {
    render(<AreaChart data={[10, 40, 25]} labels={["一", "二", "三"]} />);
    expect(screen.getByText("一")).toBeDefined();
    expect(screen.getByText("二")).toBeDefined();
    expect(screen.getByText("三")).toBeDefined();
  });

  it("renders default labels when omitted", () => {
    render(<AreaChart />);
    expect(screen.getByText("日")).toBeDefined();
  });

  it("exports types", () => {
    const _t: AreaChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
