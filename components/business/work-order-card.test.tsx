import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WorkOrderCard } from "./work-order-card";
import type { WorkOrderOperation } from "./work-order-card";

const operations: WorkOrderOperation[] = [
  { id: "op1", seq: 10, name: "Material Prep", workCenter: "WC-01", plannedQty: 100, completedQty: 100, operator: "Alice", status: "done" },
  { id: "op2", seq: 20, name: "CNC Machining", workCenter: "WC-02", plannedQty: 100, completedQty: 60, operator: "Bob", status: "running" },
  { id: "op3", seq: 30, name: "Assembly", workCenter: "WC-03", plannedQty: 100, completedQty: 0, status: "pending" },
  { id: "op4", seq: 40, name: "QC Inspection", workCenter: "QC-01", plannedQty: 100, completedQty: 0, status: "pending" },
];

describe("WorkOrderCard", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <WorkOrderCard
        orderNo="WO-2026-001"
        product="Widget A"
        status="in_progress"
        plannedStart="2026-07-01"
        plannedEnd="2026-07-10"
        plannedQty={100}
        completedQty={60}
      />,
    );
    expect(container.querySelector('[data-slot="work-order-card"]')).toBeTruthy();
  });

  it("renders order number", () => {
    render(
      <WorkOrderCard orderNo="WO-2026-001" product="Widget A" status="released" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={0} />,
    );
    expect(screen.getByText("WO-2026-001")).toBeTruthy();
  });

  it("renders product name", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="Precision Gear" status="planned" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={0} />,
    );
    expect(screen.getByText("Precision Gear")).toBeTruthy();
  });

  it("renders status badge for each status", () => {
    const { rerender } = render(
      <WorkOrderCard orderNo="WO-001" product="P" status="planned" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={0} />,
    );
    expect(screen.getByText("Planned")).toBeTruthy();

    rerender(<WorkOrderCard orderNo="WO-001" product="P" status="in_progress" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={50} />);
    expect(screen.getByText("In Progress")).toBeTruthy();

    rerender(<WorkOrderCard orderNo="WO-001" product="P" status="completed" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={100} />);
    expect(screen.getByText("Completed")).toBeTruthy();

    rerender(<WorkOrderCard orderNo="WO-001" product="P" status="on_hold" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={50} />);
    expect(screen.getByText("On Hold")).toBeTruthy();
  });

  it("renders priority badge", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="released" priority="urgent" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={0} />,
    );
    expect(screen.getByText("Urgent")).toBeTruthy();
  });

  it("renders progress percentage", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="in_progress" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={60} />,
    );
    expect(screen.getByText("60.0% complete")).toBeTruthy();
    expect(screen.getByText(/60 \/ 100/)).toBeTruthy();
  });

  it("shows remaining quantity", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="in_progress" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={60} />,
    );
    expect(screen.getByText(/40 pcs remaining/)).toBeTruthy();
  });

  it("renders planned dates", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="planned" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={0} />,
    );
    expect(screen.getByText("2026-07-01")).toBeTruthy();
    expect(screen.getByText("2026-07-10")).toBeTruthy();
  });

  it("renders operations", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="in_progress" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={60} operations={operations} />,
    );
    expect(screen.getByText("Material Prep")).toBeTruthy();
    expect(screen.getByText("CNC Machining")).toBeTruthy();
    expect(screen.getByText("Assembly")).toBeTruthy();
    expect(screen.getByText("QC Inspection")).toBeTruthy();
  });

  it("shows operation progress count", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="in_progress" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={60} operations={operations} />,
    );
    expect(screen.getByText(/Operations \(1\/4\)/)).toBeTruthy();
  });

  it("shows currently running operation", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="in_progress" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={60} operations={operations} />,
    );
    expect(screen.getByText(/Running: CNC Machining/)).toBeTruthy();
  });

  it("calls onClick when card is clicked", () => {
    const onClick = vi.fn();
    const { container } = render(
      <WorkOrderCard orderNo="WO-001" product="P" status="planned" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={0} onClick={onClick} />,
    );
    const card = container.querySelector('[data-slot="work-order-card"]') as HTMLElement;
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  it("shows overdue indicator for past-date non-completed orders", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="in_progress" plannedStart="2025-01-01" plannedEnd="2025-06-01" plannedQty={100} completedQty={50} />,
    );
    expect(screen.getByText("Overdue")).toBeTruthy();
  });

  it("does not show overdue for completed orders", () => {
    render(
      <WorkOrderCard orderNo="WO-001" product="P" status="completed" plannedStart="2025-01-01" plannedEnd="2025-06-01" plannedQty={100} completedQty={100} />,
    );
    expect(screen.queryByText("Overdue")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(
      <WorkOrderCard orderNo="WO-001" product="P" status="planned" plannedStart="2026-07-01" plannedEnd="2026-07-10" plannedQty={100} completedQty={0} className="my-wo" />,
    );
    const el = container.querySelector('[data-slot="work-order-card"]') as HTMLElement;
    expect(el.className).toContain("my-wo");
  });
});
