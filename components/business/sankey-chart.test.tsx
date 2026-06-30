import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SankeyChart } from "./sankey-chart";
import type { SankeyChartProps } from "./sankey-chart";

describe("SankeyChart", () => {
  it("renders source and target labels", () => {
    render(
      <SankeyChart
        flows={[
          { source: "搜索", target: "下单", value: 60 },
          { source: "广告", target: "流失", value: 20 },
        ]}
      />,
    );
    expect(screen.getByText("搜索")).toBeDefined();
    expect(screen.getByText("广告")).toBeDefined();
    expect(screen.getByText("下单")).toBeDefined();
    expect(screen.getByText("流失")).toBeDefined();
  });

  it("renders default flows when omitted", () => {
    render(<SankeyChart />);
    expect(screen.getByText("搜索")).toBeDefined();
  });

  it("exports types", () => {
    const _t: SankeyChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
