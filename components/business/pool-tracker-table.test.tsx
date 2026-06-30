import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PoolTrackerTable } from "./pool-tracker-table";
import type { PoolTrackerTableProps } from "./pool-tracker-table";

describe("pool-tracker-table", () => {
  it("exports PoolTrackerTable", () => {
    expect(PoolTrackerTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PoolTrackerTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders a row per pool with usage progressbar", () => {
    render(
      <PoolTrackerTable
        pools={[
          { id: "p1", name: "运营池", total: 100000, used: 60000, available: 40000 },
          { id: "p2", name: "备用池", total: 50000, used: 45000, available: 5000 },
        ]}
      />,
    );
    expect(screen.getByText("资金池跟踪")).toBeDefined();
    expect(screen.getByText("运营池")).toBeDefined();
    expect(screen.getByText("备用池")).toBeDefined();
    // usage percentages rendered
    expect(screen.getByText("60%")).toBeDefined();
    expect(screen.getByText("90%")).toBeDefined();
    // two progressbars exist
    expect(screen.getAllByRole("progressbar")).toHaveLength(2);
  });

  it("renders the aggregate totals footer", () => {
    render(
      <PoolTrackerTable
        pools={[
          { id: "p1", name: "池A", total: 100, used: 40, available: 60 },
          { id: "p2", name: "池B", total: 200, used: 100, available: 100 },
        ]}
      />,
    );
    expect(screen.getByText("合计")).toBeDefined();
    // total = 300, available = 160
    expect(screen.getByText("300")).toBeDefined();
    expect(screen.getByText("160")).toBeDefined();
  });

  it("shows the empty state when there are no pools", () => {
    render(<PoolTrackerTable pools={[]} />);
    expect(screen.getByText("暂无资金池")).toBeDefined();
  });
});
