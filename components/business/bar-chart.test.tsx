import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BarChart } from "./bar-chart";
import type { BarChartProps } from "./bar-chart";

describe("BarChart", () => {
  it("renders bar labels", () => {
    render(
      <BarChart
        data={[
          { label: "Q1", value: 30 },
          { label: "Q2", value: 60 },
        ]}
      />,
    );
    expect(screen.getByText("Q1")).toBeDefined();
    expect(screen.getByText("Q2")).toBeDefined();
  });

  it("renders horizontal orientation labels", () => {
    render(
      <BarChart orientation="horizontal" data={[{ label: "Alpha", value: 5 }]} />,
    );
    expect(screen.getByText("Alpha")).toBeDefined();
  });

  it("exports types", () => {
    const _t: BarChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
