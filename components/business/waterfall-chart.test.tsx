import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WaterfallChart } from "./waterfall-chart";
import type { WaterfallChartProps } from "./waterfall-chart";

describe("WaterfallChart", () => {
  it("renders step labels", () => {
    render(
      <WaterfallChart
        data={[
          { label: "期初", value: 100, absolute: true },
          { label: "收入", value: 40 },
          { label: "期末", value: 110, absolute: true },
        ]}
      />,
    );
    expect(screen.getByText("期初")).toBeDefined();
    expect(screen.getByText("收入")).toBeDefined();
    expect(screen.getByText("期末")).toBeDefined();
  });

  it("renders default data when omitted", () => {
    render(<WaterfallChart />);
    expect(screen.getByText("期初")).toBeDefined();
  });

  it("exports types", () => {
    const _t: WaterfallChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
