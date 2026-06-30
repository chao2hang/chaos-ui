import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OverviewPage } from "./overview-page";
import type { OverviewPageProps } from "./overview-page";

describe("OverviewPage", () => {
  it("exports OverviewPage", () => {
    expect(OverviewPage).toBeDefined();
  });

  it("exports types", () => {
    const _tc: OverviewPageProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders title, subtitle, KPIs and activities", () => {
    render(
      <OverviewPage
        title="经营总览"
        subtitle="2026年6月"
        kpis={[{ label: "营收", value: 1280000, delta: 0.12 }]}
        activities={[{ id: "a1", text: "新增订单 120", time: "今天" }]}
      />,
    );
    expect(screen.getByText("经营总览")).toBeDefined();
    expect(screen.getByText("2026年6月")).toBeDefined();
    expect(screen.getByText("营收")).toBeDefined();
    expect(screen.getByText("新增订单 120")).toBeDefined();
    expect(screen.getByText("今天")).toBeDefined();
  });

  it("renders custom children", () => {
    render(
      <OverviewPage title="总览">
        <p>自定义图表区</p>
      </OverviewPage>,
    );
    expect(screen.getByText("自定义图表区")).toBeDefined();
  });

  it("shows empty states when no data", () => {
    render(<OverviewPage title="总览" />);
    expect(screen.getByText("暂无自定义内容")).toBeDefined();
    expect(screen.getByText("暂无活动")).toBeDefined();
  });

  it("renders region with aria-label derived from title", () => {
    render(<OverviewPage title="仪表盘" kpis={[]} activities={[]} />);
    expect(screen.getByRole("region", { name: "仪表盘总览" })).toBeDefined();
  });

  it("renders default title when none provided", () => {
    render(<OverviewPage />);
    expect(screen.getByText("总览")).toBeDefined();
  });

  it("omits subtitle when not provided", () => {
    render(<OverviewPage title="总览" />);
    expect(screen.queryByText("2026年6月")).toBeNull();
  });

  it("renders a positive delta with + sign", () => {
    render(
      <OverviewPage
        title="总览"
        kpis={[{ label: "增长", value: 100, delta: 0.15 }]}
      />,
    );
    expect(screen.getByText("+15.0%")).toBeDefined();
  });

  it("renders a negative delta without + sign", () => {
    render(
      <OverviewPage
        title="总览"
        kpis={[{ label: "下滑", value: 100, delta: -0.08 }]}
      />,
    );
    expect(screen.getByText("-8.0%")).toBeDefined();
  });

  it("renders zero delta as positive", () => {
    render(
      <OverviewPage
        title="总览"
        kpis={[{ label: "持平", value: 100, delta: 0 }]}
      />,
    );
    expect(screen.getByText("+0.0%")).toBeDefined();
  });

  it("omits delta row when delta is undefined", () => {
    render(<OverviewPage title="总览" kpis={[{ label: "纯值", value: 100 }]} />);
    expect(screen.queryByText(/%/)).toBeNull();
  });

  it("renders KPI unit alongside the value", () => {
    render(
      <OverviewPage
        title="总览"
        kpis={[{ label: "订单", value: 50, unit: "单" }]}
      />,
    );
    expect(screen.getByText("单")).toBeDefined();
  });

  it("renders activity without time when time omitted", () => {
    render(
      <OverviewPage
        title="总览"
        activities={[{ id: "a1", text: "无时间的活动" }]}
      />,
    );
    expect(screen.getByText("无时间的活动")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/overview-page");
    expect(mod.OverviewPage).toBeDefined();
  });
});
