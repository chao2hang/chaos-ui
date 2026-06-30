import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FunnelChart } from "./funnel-chart";
import type { FunnelChartProps } from "./funnel-chart";

describe("FunnelChart", () => {
  it("renders stage labels and values", () => {
    render(
      <FunnelChart
        data={[
          { label: "访问", value: 1000 },
          { label: "下单", value: 300 },
        ]}
      />,
    );
    expect(screen.getByText("访问")).toBeDefined();
    expect(screen.getByText("下单")).toBeDefined();
  });

  it("exports types", () => {
    const _t: FunnelChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
