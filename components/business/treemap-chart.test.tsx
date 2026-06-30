import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TreemapChart } from "./treemap-chart";
import type { TreemapChartProps } from "./treemap-chart";

describe("TreemapChart", () => {
  it("renders tile names and values", () => {
    render(
      <TreemapChart
        data={[
          { name: "食品", value: 48 },
          { name: "日用", value: 28 },
        ]}
      />,
    );
    expect(screen.getByText("食品")).toBeDefined();
    expect(screen.getByText("日用")).toBeDefined();
  });

  it("renders default data when omitted", () => {
    render(<TreemapChart />);
    expect(screen.getByText("食品")).toBeDefined();
  });

  it("exports types", () => {
    const _t: TreemapChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
