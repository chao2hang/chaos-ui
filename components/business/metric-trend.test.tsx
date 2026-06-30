import { describe, it, expect } from "vitest";
import { Sparkline, MetricTrend } from "./metric-trend";

describe("metric-trend", () => {
  it("exports Sparkline", () => {
    expect(Sparkline).toBeDefined();
  });

  it("exports MetricTrend", () => {
    expect(MetricTrend).toBeDefined();
  });
});
