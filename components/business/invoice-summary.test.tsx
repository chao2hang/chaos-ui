import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InvoiceSummary } from "./invoice-summary";
import type { InvoiceSummaryProps } from "./invoice-summary";

describe("InvoiceSummary", () => {
  it("renders counts, card labels and total amount", () => {
    render(<InvoiceSummary total={120} issued={80} pending={40} amount={360000} />);
    expect(screen.getByText("发票总数")).toBeDefined();
    expect(screen.getByText("已开具")).toBeDefined();
    expect(screen.getByText("待开具")).toBeDefined();
    expect(screen.getByText("金额合计")).toBeDefined();
    expect(screen.getByText(/开具率 67%/)).toBeDefined();
    expect(screen.getByRole("region", { name: "发票汇总" })).toBeDefined();
  });

  it("shows 0% rate when total is 0", () => {
    render(<InvoiceSummary total={0} issued={0} pending={0} amount={0} />);
    expect(screen.getByText(/开具率 0%/)).toBeDefined();
  });

  it("rounds the issued percentage to a whole number", () => {
    // 1/3 = 33.33% -> 33
    render(<InvoiceSummary total={3} issued={1} pending={2} amount={100} />);
    expect(screen.getByText(/开具率 33%/)).toBeDefined();
  });

  it("renders the formatted number values for each card", () => {
    render(<InvoiceSummary total={1200} issued={800} pending={400} amount={360000} />);
    // zh-CN grouping: 1200 -> "1,200", 800 -> "800", 400 -> "400"
    expect(screen.getByText("1,200")).toBeDefined();
    expect(screen.getByText("800")).toBeDefined();
    expect(screen.getByText("400")).toBeDefined();
  });

  it("renders the formatted currency amount", () => {
    render(<InvoiceSummary total={1} issued={1} pending={0} amount={360000} />);
    expect(screen.getByText("¥360,000.00")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <InvoiceSummary total={1} issued={0} pending={1} amount={0} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: InvoiceSummaryProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
