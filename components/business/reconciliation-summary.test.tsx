import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReconciliationSummary } from "./reconciliation-summary";
import type { ReconciliationSummaryProps } from "./reconciliation-summary";

describe("ReconciliationSummary", () => {
  it("renders the totals and matched/unmatched amounts", () => {
    render(
      <ReconciliationSummary
        totalAmount={10000}
        matchedAmount={8000}
        unmatchedAmount={2000}
        matchedCount={80}
        unmatchedCount={20}
      />,
    );
    expect(screen.getByText("对账汇总")).toBeDefined();
    expect(screen.getByText("¥10,000.00")).toBeDefined();
    expect(screen.getByText("¥8,000.00")).toBeDefined();
    expect(screen.getByText("¥2,000.00")).toBeDefined();
    expect(screen.getByText("已匹配")).toBeDefined();
    expect(screen.getByText("未匹配")).toBeDefined();
  });

  it("renders the match rate progressbar with the computed percentage", () => {
    render(
      <ReconciliationSummary
        totalAmount={10000}
        matchedAmount={8000}
        unmatchedAmount={2000}
        matchedCount={80}
        unmatchedCount={20}
      />,
    );
    expect(screen.getByText("80.0%")).toBeDefined();
    const bar = screen.getByRole("progressbar", { name: "对账匹配率" });
    expect(bar.getAttribute("aria-valuenow")).toBe("80");
  });

  it("renders the summary counts line", () => {
    render(
      <ReconciliationSummary
        totalAmount={10000}
        matchedAmount={8000}
        unmatchedAmount={2000}
        matchedCount={80}
        unmatchedCount={20}
      />,
    );
    expect(screen.getByText("共 100 笔 · 已匹配 80 · 未匹配 20")).toBeDefined();
  });

  it("handles a zero total without dividing by zero", () => {
    render(
      <ReconciliationSummary
        totalAmount={0}
        matchedAmount={0}
        unmatchedAmount={0}
        matchedCount={0}
        unmatchedCount={0}
      />,
    );
    expect(screen.getByText("0.0%")).toBeDefined();
  });

  it("clamps the match rate progress bar to 100% when matched exceeds total", () => {
    render(
      <ReconciliationSummary
        totalAmount={1000}
        matchedAmount={1500}
        unmatchedAmount={0}
        matchedCount={15}
        unmatchedCount={0}
      />,
    );
    // rate = 1500/1000 = 1.5 -> display 150.0%, but bar width clamped to 100%
    expect(screen.getByText("150.0%")).toBeDefined();
    const bar = screen.getByRole("progressbar", { name: "对账匹配率" });
    expect(bar.getAttribute("aria-valuenow")).toBe("150");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });

  it("renders the matched and unmatched counts in their cards", () => {
    render(
      <ReconciliationSummary
        totalAmount={10000}
        matchedAmount={8000}
        unmatchedAmount={2000}
        matchedCount={80}
        unmatchedCount={20}
      />,
    );
    expect(screen.getByText("80 笔")).toBeDefined();
    expect(screen.getByText("20 笔")).toBeDefined();
  });

  it("computes totalCount from matched + unmatched counts", () => {
    render(
      <ReconciliationSummary
        totalAmount={5000}
        matchedAmount={3000}
        unmatchedAmount={2000}
        matchedCount={30}
        unmatchedCount={12}
      />,
    );
    expect(screen.getByText("共 42 笔 · 已匹配 30 · 未匹配 12")).toBeDefined();
  });

  it("applies the className to the root card", () => {
    const { container } = render(
      <ReconciliationSummary
        totalAmount={100}
        matchedAmount={100}
        unmatchedAmount={0}
        matchedCount={1}
        unmatchedCount={0}
        className="my-extra-class"
      />,
    );
    const root = container.querySelector(
      '[data-slot="reconciliation-summary"]',
    ) as HTMLElement;
    expect(root).not.toBeNull();
    expect(root.className).toContain("my-extra-class");
  });

  it("exposes the ReconciliationSummaryProps type", () => {
    const props: ReconciliationSummaryProps = {
      totalAmount: 1,
      matchedAmount: 1,
      unmatchedAmount: 0,
      matchedCount: 1,
      unmatchedCount: 0,
    };
    expect(props.totalAmount).toBe(1);
  });
});
