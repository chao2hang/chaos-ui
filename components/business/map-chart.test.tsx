import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MapChart } from "./map-chart";
import type { MapChartProps } from "./map-chart";

describe("MapChart", () => {
  it("renders region header and marker names", () => {
    render(
      <MapChart
        region="华东"
        data={[
          { name: "上海", value: 90 },
          { name: "杭州", value: 60 },
        ]}
      />,
    );
    expect(screen.getByText("华东")).toBeDefined();
    // city names appear in both the marker label and the legend
    expect(screen.getAllByText("上海").length).toBeGreaterThan(0);
    expect(screen.getAllByText("杭州").length).toBeGreaterThan(0);
  });

  it("exports types", () => {
    const _t: MapChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
