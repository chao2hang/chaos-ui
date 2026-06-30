import { describe, it, expect } from "vitest";
import { GanttChart } from "./gantt-chart";
import type { GanttChartProps } from "./gantt-chart";

describe("gantt-chart", () => {
  it("exports GanttChart", () => {
    expect(GanttChart).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: GanttChartProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
