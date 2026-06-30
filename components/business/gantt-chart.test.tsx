import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GanttChart } from "./gantt-chart";
import type { GanttChartProps } from "./gantt-chart";

describe("GanttChart", () => {
  it("renders task names", () => {
    render(
      <GanttChart
        tasks={[
          { id: "1", name: "需求评审", start: "2026-06-01", end: "2026-06-03" },
          { id: "2", name: "开发", start: "2026-06-04", end: "2026-06-10" },
        ]}
      />,
    );
    expect(screen.getByText("需求评审")).toBeDefined();
    expect(screen.getByText("开发")).toBeDefined();
  });

  it("renders empty state for no tasks", () => {
    render(<GanttChart tasks={[]} />);
    expect(screen.getByText("无任务")).toBeDefined();
  });

  it("exports types", () => {
    const _t: GanttChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
