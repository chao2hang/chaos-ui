import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardGrid } from "./dashboard-grid";
import type { DashboardGridProps } from "./dashboard-grid";

describe("dashboard-grid", () => {
  it("renders title and stat count", () => {
    render(
      <DashboardGrid
        title="经营概览"
        stats={[
          { label: "营收", value: 1280000, delta: 0.12 },
          { label: "成本", value: 420000, delta: -0.05 },
        ]}
      />,
    );
    expect(screen.getByRole("region", { name: "经营概览" })).toBeDefined();
    expect(screen.getByText("经营概览")).toBeDefined();
    expect(screen.getByText("2 项指标")).toBeDefined();
  });

  it("renders compact value and delta percent per stat", () => {
    render(
      <DashboardGrid
        stats={[{ label: "营收", value: 1280000, delta: 0.12 }]}
      />,
    );
    expect(screen.getByText("营收")).toBeDefined();
    expect(screen.getByText("130万")).toBeDefined();
    expect(screen.getByText("12.0%")).toBeDefined();
  });

  it("infers down trend from negative delta", () => {
    render(
      <DashboardGrid
        stats={[{ label: "成本", value: 420000, delta: -0.05 }]}
      />,
    );
    expect(screen.getByText("-5.0%")).toBeDefined();
  });

  it("honors explicit trend override regardless of delta", () => {
    render(
      <DashboardGrid
        stats={[{ label: "净利润", value: 1000, delta: 0.2, trend: "down" }]}
      />,
    );
    expect(screen.getByText("20.0%")).toBeDefined();
    const stat = screen.getByText("净利润").parentElement;
    expect(stat?.querySelector(".text-destructive")).not.toBeNull();
  });

  it("omits delta row when delta undefined", () => {
    render(<DashboardGrid stats={[{ label: "纯值", value: 50 }]} />);
    expect(screen.getByText("50")).toBeDefined();
    expect(screen.queryByText(/%/)).toBeNull();
  });

  it("renders empty-state message when stats omitted", () => {
    render(<DashboardGrid />);
    expect(screen.getByText("暂无指标数据")).toBeDefined();
    expect(screen.getByText("0 项指标")).toBeDefined();
  });

  it("uses default title", () => {
    render(<DashboardGrid stats={[]} />);
    expect(screen.getByText("仪表盘")).toBeDefined();
  });

  it("renders all stats when given multiple", () => {
    render(
      <DashboardGrid
        stats={[
          { label: "A", value: 1 },
          { label: "B", value: 2 },
          { label: "C", value: 3 },
        ]}
      />,
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
    expect(screen.getByText("C")).toBeDefined();
    expect(screen.getByText("3 项指标")).toBeDefined();
  });

  it("exports DashboardGrid", () => {
    expect(DashboardGrid).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DashboardGridProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
