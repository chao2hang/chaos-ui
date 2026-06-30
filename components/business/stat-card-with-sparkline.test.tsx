import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCardWithSparkline } from "./stat-card-with-sparkline";
import type { StatCardWithSparklineProps } from "./stat-card-with-sparkline";

describe("StatCardWithSparkline", () => {
  it("renders label and value", () => {
    render(
      <StatCardWithSparkline
        label="日活"
        value="12,480"
        trend={8}
        sparklineData={[5, 8, 6, 10]}
      />,
    );
    expect(screen.getByText("日活")).toBeDefined();
    expect(screen.getByText("12,480")).toBeDefined();
  });

  it("renders without a trend", () => {
    render(<StatCardWithSparkline label="访客" value={5000} />);
    expect(screen.getByText("访客")).toBeDefined();
  });

  it("exports types", () => {
    const _t: StatCardWithSparklineProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
