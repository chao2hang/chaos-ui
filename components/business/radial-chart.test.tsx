import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadialChart } from "./radial-chart";
import type { RadialChartProps } from "./radial-chart";

describe("RadialChart", () => {
  it("renders label caption", () => {
    render(<RadialChart value={78} max={100} label="达成率" />);
    expect(screen.getByText("达成率")).toBeDefined();
  });

  it("renders default label when omitted", () => {
    render(<RadialChart />);
    expect(screen.getByText("达成率")).toBeDefined();
  });

  it("exports types", () => {
    const _t: RadialChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
