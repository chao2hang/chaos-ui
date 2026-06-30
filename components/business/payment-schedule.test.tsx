import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentSchedule } from "./payment-schedule";
import type { PaymentScheduleProps } from "./payment-schedule";

describe("PaymentSchedule", () => {
  it("renders dates, amounts and status labels", () => {
    render(
      <PaymentSchedule
        schedule={[
          { id: "p1", date: "2026-07-01", amount: 30000, status: "paid" },
          { id: "p2", date: "2026-08-01", amount: 30000, status: "pending" },
        ]}
      />,
    );
    expect(screen.getByText("已付款")).toBeDefined();
    expect(screen.getByText("待付款")).toBeDefined();
    expect(screen.getByText(/已付 50%/)).toBeDefined();
    expect(screen.getByRole("region", { name: "付款计划" })).toBeDefined();
  });

  it("renders the overdue status label", () => {
    render(
      <PaymentSchedule
        schedule={[{ id: "p1", date: "2026-06-01", amount: 5000, status: "overdue" }]}
      />,
    );
    expect(screen.getByText("已逾期")).toBeDefined();
  });

  it("falls back to the default 待付款 label for an unknown status", () => {
    render(
      <PaymentSchedule
        schedule={[{ id: "p1", date: "2026-07-01", amount: 5000, status: "custom" }]}
      />,
    );
    // both the pending entry and the default fallback render 待付款
    expect(screen.getAllByText("待付款").length).toBeGreaterThanOrEqual(1);
  });

  it("renders 0% paid when nothing is paid but total is positive", () => {
    render(
      <PaymentSchedule
        schedule={[{ id: "p1", date: "2026-07-01", amount: 30000, status: "pending" }]}
      />,
    );
    expect(screen.getByText(/已付 0%/)).toBeDefined();
  });

  it("renders the formatted dates and currency amounts", () => {
    render(
      <PaymentSchedule
        schedule={[
          { id: "p1", date: "2026-07-01", amount: 30000, status: "paid" },
          { id: "p2", date: "2026-08-01", amount: 70000, status: "pending" },
        ]}
      />,
    );
    expect(screen.getByText("2026年7月1日")).toBeDefined();
    expect(screen.getByText("2026年8月1日")).toBeDefined();
    expect(screen.getByText("¥30,000.00")).toBeDefined();
    expect(screen.getByText("¥70,000.00")).toBeDefined();
  });

  it("renders the schedule as an ordered list", () => {
    render(
      <PaymentSchedule
        schedule={[{ id: "p1", date: "2026-07-01", amount: 30000, status: "paid" }]}
      />,
    );
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("shows empty state when no schedule", () => {
    render(<PaymentSchedule schedule={[]} />);
    expect(screen.getByText("暂无付款计划")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <PaymentSchedule schedule={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: PaymentScheduleProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
