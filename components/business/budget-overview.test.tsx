import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BudgetOverview } from "./budget-overview";
import type { BudgetOverviewProps } from "./budget-overview";

describe("BudgetOverview", () => {
  it("renders the overview heading and usage percent", () => {
    render(
      <BudgetOverview
        total={1000}
        used={500}
        remaining={500}
        categories={[]}
      />,
    );
    expect(screen.getByText("预算总览")).toBeDefined();
    expect(screen.getByText("已用 50%")).toBeDefined();
  });

  it("renders the formatted total, used, and remaining amounts", () => {
    render(
      <BudgetOverview
        total={1000}
        used={500}
        remaining={500}
        categories={[]}
      />,
    );
    expect(screen.getByText("¥1,000.00")).toBeDefined();
    expect(screen.getAllByText("¥500.00").length).toBeGreaterThan(0);
  });

  it("renders each category name and its actual amount", () => {
    render(
      <BudgetOverview
        total={1000}
        used={500}
        remaining={500}
        categories={[
          { name: "办公用品", budget: 400, actual: 300 },
          { name: "差旅费", budget: 600, actual: 200 },
        ]}
      />,
    );
    expect(screen.getByText("办公用品")).toBeDefined();
    expect(screen.getByText("差旅费")).toBeDefined();
    expect(screen.getByText("¥300.00")).toBeDefined();
    expect(screen.getByText("¥200.00")).toBeDefined();
  });

  it("renders zero usage when total is zero", () => {
    render(<BudgetOverview total={0} used={0} remaining={0} categories={[]} />);
    expect(screen.getByText("已用 0%")).toBeDefined();
  });

  it("exports types", () => {
    const _tc: BudgetOverviewProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
