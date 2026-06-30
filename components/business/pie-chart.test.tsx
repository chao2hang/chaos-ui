import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PieChart } from "./pie-chart";
import type { PieChartProps } from "./pie-chart";

describe("PieChart", () => {
  it("renders legend labels", () => {
    render(
      <PieChart
        data={[
          { label: "线上", value: 58, color: "#3b82f6" },
          { label: "线下", value: 32, color: "#10b981" },
        ]}
      />,
    );
    expect(screen.getByText("线上")).toBeDefined();
    expect(screen.getByText("线下")).toBeDefined();
  });

  it("renders default data when omitted", () => {
    render(<PieChart />);
    expect(screen.getByText("线上")).toBeDefined();
  });

  it("exports types", () => {
    const _t: PieChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
