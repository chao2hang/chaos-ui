import { describe, it, expect } from "vitest";
import {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  ChartContainer,
  ChartTooltip,
  defaultColors,
  brandColors,
  statusColors,
} from "./chart";

describe("chart", () => {
  it("exports LineChart", () => {
    expect(LineChart).toBeDefined();
  });

  it("exports BarChart", () => {
    expect(BarChart).toBeDefined();
  });

  it("exports AreaChart", () => {
    expect(AreaChart).toBeDefined();
  });

  it("exports PieChart", () => {
    expect(PieChart).toBeDefined();
  });

  it("exports ChartContainer", () => {
    expect(ChartContainer).toBeDefined();
  });

  it("exports ChartTooltip", () => {
    expect(ChartTooltip).toBeDefined();
  });

  it("exports defaultColors", () => {
    expect(defaultColors).toBeDefined();
  });

  it("exports brandColors", () => {
    expect(brandColors).toBeDefined();
  });

  it("exports statusColors", () => {
    expect(statusColors).toBeDefined();
  });
});
