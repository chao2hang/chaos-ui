import { describe, it, expect } from "vitest";
import { MapChart } from "./map-chart";
import type { MapChartProps } from "./map-chart";

describe("map-chart", () => {
  it("exports MapChart", () => {
    expect(MapChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: MapChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
