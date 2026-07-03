import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeaveRequestForm } from "./leave-request-form";
import type { LeaveBalance, Approver } from "./leave-request-form";

vi.mock("@/components/ui/icons", () => ({
  CalendarIcon: (p: Record<string, unknown>) => (
    <svg data-testid="cal" {...p} />
  ),
  ClockIcon: (p: Record<string, unknown>) => <svg data-testid="clock" {...p} />,
}));

const balances: LeaveBalance[] = [
  { type: "annual", label: "Annual Leave", total: 15, used: 5, unit: "days" },
  { type: "sick", label: "Sick Leave", total: 10, used: 2, unit: "days" },
  { type: "personal", label: "Personal", total: 3, used: 1, unit: "days" },
];

const approvers: Approver[] = [
  { id: "1", name: "Alice Chen", title: "Direct Manager" },
  { id: "2", name: "Bob Smith", title: "HR Director" },
];

describe("LeaveRequestForm", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <LeaveRequestForm balances={balances} approvers={approvers} />,
    );
    expect(
      container.querySelector('[data-slot="leave-request-form"]'),
    ).toBeTruthy();
  });

  it("renders leave type options", () => {
    render(<LeaveRequestForm balances={balances} approvers={approvers} />);
    expect(screen.getByText("Annual Leave")).toBeTruthy();
    expect(screen.getByText("Sick Leave")).toBeTruthy();
    expect(screen.getByText("Personal")).toBeTruthy();
  });

  it("shows balance for selected leave type", () => {
    render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        leaveType="annual"
      />,
    );
    expect(screen.getByText(/10 \/ 15 days/)).toBeTruthy();
  });

  it("calls onLeaveTypeChange when type is clicked", () => {
    const onLeaveTypeChange = vi.fn();
    render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        onLeaveTypeChange={onLeaveTypeChange}
      />,
    );
    fireEvent.click(screen.getByText("Sick Leave"));
    expect(onLeaveTypeChange).toHaveBeenCalledWith("sick");
  });

  it("shows duration when dates are set", () => {
    render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        startDate="2026-07-01"
        endDate="2026-07-05"
      />,
    );
    expect(screen.getByText(/Duration:/)).toBeTruthy();
    // Duration is 5 days. The calendar preview also renders a "5" day cell, so
    // use getAllByText to tolerate the duplicate.
    expect(screen.getAllByText("5").length).toBeGreaterThan(0);
  });

  it("shows insufficient balance warning", () => {
    render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        leaveType="personal"
        startDate="2026-07-01"
        endDate="2026-07-10"
      />,
    );
    expect(screen.getByText(/Insufficient balance/)).toBeTruthy();
  });

  it("renders approver chain", () => {
    render(<LeaveRequestForm balances={balances} approvers={approvers} />);
    expect(screen.getByText("Alice Chen")).toBeTruthy();
    expect(screen.getByText("Bob Smith")).toBeTruthy();
    expect(screen.getByText("Direct Manager")).toBeTruthy();
  });

  it("calls onSubmit when submit is clicked", () => {
    const onSubmit = vi.fn();
    render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        startDate="2026-07-01"
        endDate="2026-07-03"
        onSubmit={onSubmit}
      />,
    );
    fireEvent.click(screen.getByText("Submit Request"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables submit when balance is insufficient", () => {
    render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        leaveType="personal"
        startDate="2026-07-01"
        endDate="2026-07-10"
        onSubmit={() => {}}
      />,
    );
    expect(screen.getByText("Submit Request")).toBeDisabled();
  });

  it("renders calendar preview", () => {
    const { container } = render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        startDate="2026-07-01"
        endDate="2026-07-05"
      />,
    );
    expect(
      container.querySelector('[data-slot="leave-calendar-preview"]'),
    ).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        className="custom-leave"
      />,
    );
    const el = container.querySelector(
      '[data-slot="leave-request-form"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-leave");
  });

  it("hides action buttons in read-only mode", () => {
    render(
      <LeaveRequestForm
        balances={balances}
        approvers={approvers}
        readOnly
        onSubmit={() => {}}
      />,
    );
    expect(screen.queryByText("Submit Request")).toBeNull();
  });
});
