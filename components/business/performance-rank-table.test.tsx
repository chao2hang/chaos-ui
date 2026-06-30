import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PerformanceRankTable } from "./performance-rank-table";
import type { PerformanceRankTableProps } from "./performance-rank-table";

describe("PerformanceRankTable", () => {
  it("renders names, amounts and headers in a table", () => {
    render(
      <PerformanceRankTable
        rows={[
          { id: "r1", rank: 1, name: "张三", amount: 980000, growth: 0.15 },
          { id: "r2", rank: 2, name: "李四", amount: 760000, growth: -0.03 },
          { id: "r3", rank: 4, name: "王五", amount: 540000 },
        ]}
      />,
    );
    expect(screen.getByText("张三")).toBeDefined();
    expect(screen.getByText("李四")).toBeDefined();
    expect(screen.getByText("王五")).toBeDefined();
    expect(screen.getByText("排名")).toBeDefined();
    expect(screen.getByText("姓名")).toBeDefined();
    expect(screen.getByText("业绩")).toBeDefined();
    expect(screen.getByText("环比")).toBeDefined();
    expect(screen.getByRole("region", { name: "业绩排名表" })).toBeDefined();
  });

  it("renders the sr-only caption", () => {
    render(<PerformanceRankTable rows={[]} />);
    expect(screen.getByText("业绩排名")).toBeDefined();
  });

  it("renders medal rows for the top three ranks", () => {
    render(
      <PerformanceRankTable
        rows={[
          { id: "r1", rank: 1, name: "金牌", amount: 100, growth: 0.1 },
          { id: "r2", rank: 2, name: "银牌", amount: 90, growth: 0.05 },
          { id: "r3", rank: 3, name: "铜牌", amount: 80, growth: 0.02 },
        ]}
      />,
    );
    expect(screen.getByText("金牌")).toBeDefined();
    expect(screen.getByText("银牌")).toBeDefined();
    expect(screen.getByText("铜牌")).toBeDefined();
  });

  it("renders a numeric rank fallback for ranks beyond the medals", () => {
    render(
      <PerformanceRankTable
        rows={[{ id: "r5", rank: 5, name: "赵六", amount: 100000 }]}
      />,
    );
    // rank number appears as a rounded badge label text "5"
    expect(screen.getByText("5")).toBeDefined();
  });

  it("shows dash for missing growth", () => {
    render(
      <PerformanceRankTable
        rows={[{ id: "r3", rank: 5, name: "赵六", amount: 100000 }]}
      />,
    );
    expect(screen.getByText("—")).toBeDefined();
  });

  it("renders formatted percent for positive growth", () => {
    render(
      <PerformanceRankTable
        rows={[{ id: "r1", rank: 1, name: "张三", amount: 980000, growth: 0.152 }]}
      />,
    );
    // 0.152 -> 15.2%
    expect(screen.getByText("15.2%")).toBeDefined();
  });

  it("renders formatted percent for negative growth", () => {
    render(
      <PerformanceRankTable
        rows={[{ id: "r2", rank: 2, name: "李四", amount: 760000, growth: -0.03 }]}
      />,
    );
    expect(screen.getByText("-3.0%")).toBeDefined();
  });

  it("renders the formatted currency amount", () => {
    render(
      <PerformanceRankTable
        rows={[{ id: "r1", rank: 1, name: "张三", amount: 980000, growth: 0.1 }]}
      />,
    );
    expect(screen.getByText("¥980,000.00")).toBeDefined();
  });

  it("renders rows inside a table with column headers", () => {
    render(
      <PerformanceRankTable
        rows={[{ id: "r1", rank: 1, name: "张三", amount: 100, growth: 0.1 }]}
      />,
    );
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(4);
  });

  it("shows empty state when no rows", () => {
    render(<PerformanceRankTable rows={[]} />);
    expect(screen.getByText("暂无排名数据")).toBeDefined();
  });

  it("treats zero growth as non-negative (up direction)", () => {
    render(
      <PerformanceRankTable
        rows={[{ id: "r1", rank: 1, name: "张三", amount: 100, growth: 0 }]}
      />,
    );
    expect(screen.getByText("0.0%")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <PerformanceRankTable rows={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: PerformanceRankTableProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
