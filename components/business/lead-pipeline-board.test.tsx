import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeadPipelineBoard } from "./lead-pipeline-board";
import type { PipelineStage, Deal } from "./lead-pipeline-board";

const stages: PipelineStage[] = [
  { id: "s1", label: "Lead", probability: 10, color: "blue" },
  { id: "s2", label: "Qualified", probability: 30, color: "indigo" },
  { id: "s3", label: "Proposal", probability: 60, color: "amber" },
  { id: "s4", label: "Won", probability: 100, color: "emerald" },
];

const deals: Deal[] = [
  { id: "d1", customer: "Acme Corp", title: "ERP License", value: 50000, stageId: "s1", owner: "Alice", priority: "high" },
  { id: "d2", customer: "Globex Inc", title: "Cloud Migration", value: 120000, stageId: "s2", owner: "Bob", priority: "medium" },
  { id: "d3", customer: "Initech", title: "Consulting", value: 30000, stageId: "s3", owner: "Carol", priority: "low" },
  { id: "d4", customer: "Umbrella Co", title: "Hardware", value: 80000, stageId: "s4", owner: "Dave", priority: "high" },
];

describe("LeadPipelineBoard", () => {
  it("renders with data-slot", () => {
    const { container } = render(<LeadPipelineBoard stages={stages} deals={deals} />);
    expect(container.querySelector('[data-slot="lead-pipeline-board"]')).toBeTruthy();
  });

  it("renders all stage columns", () => {
    const { container } = render(<LeadPipelineBoard stages={stages} deals={deals} />);
    const cols = container.querySelectorAll('[data-slot="pipeline-column"]');
    expect(cols.length).toBe(4);
  });

  it("renders stage labels", () => {
    render(<LeadPipelineBoard stages={stages} deals={deals} />);
    expect(screen.getByText("Lead")).toBeTruthy();
    expect(screen.getByText("Qualified")).toBeTruthy();
    expect(screen.getByText("Proposal")).toBeTruthy();
    expect(screen.getByText("Won")).toBeTruthy();
  });

  it("renders all deal cards", () => {
    render(<LeadPipelineBoard stages={stages} deals={deals} />);
    expect(screen.getByText("ERP License")).toBeTruthy();
    expect(screen.getByText("Cloud Migration")).toBeTruthy();
    expect(screen.getByText("Consulting")).toBeTruthy();
    expect(screen.getByText("Hardware")).toBeTruthy();
  });

  it("shows total deal count", () => {
    render(<LeadPipelineBoard stages={stages} deals={deals} />);
    expect(screen.getByText(/Deals:/)).toBeTruthy();
    expect(screen.getByText("4")).toBeTruthy();
  });

  it("shows total pipeline value", () => {
    render(<LeadPipelineBoard stages={stages} deals={deals} />);
    // 50000 + 120000 + 30000 + 80000 = 280000
    expect(screen.getByText(/¥280,000/)).toBeTruthy();
  });

  it("shows weighted value", () => {
    render(<LeadPipelineBoard stages={stages} deals={deals} />);
    // weighted = 50000*0.1 + 120000*0.3 + 30000*0.6 + 80000*1.0 = 5000 + 36000 + 18000 + 80000 = 139000
    expect(screen.getByText(/¥139,000/)).toBeTruthy();
  });

  it("shows deal count per column", () => {
    render(<LeadPipelineBoard stages={stages} deals={deals} />);
    expect(screen.getByText("1 deals")).toBeTruthy();
  });

  it("shows empty column message", () => {
    const emptyDeals: Deal[] = [{ ...deals[0]! }];
    render(<LeadPipelineBoard stages={stages} deals={emptyDeals} />);
    // s2, s3, s4 should have "No deals"
    const emptyMsgs = screen.getAllByText("No deals");
    expect(emptyMsgs.length).toBe(3);
  });

  it("calls onDealClick when card clicked", () => {
    const onClick = vi.fn();
    const { container } = render(<LeadPipelineBoard stages={stages} deals={deals} onDealClick={onClick} />);
    const cards = container.querySelectorAll('[data-slot="deal-card"]');
    fireEvent.click(cards[0]!);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: "d1" }));
  });

  it("calls onDealMove on drop", () => {
    const onMove = vi.fn();
    const { container } = render(<LeadPipelineBoard stages={stages} deals={deals} onDealMove={onMove} />);
    const dealCard = container.querySelector('[data-slot="deal-card"]') as HTMLElement;
    const targetCol = container.querySelectorAll('[data-slot="pipeline-column"]')![1];

    // Simulate drag events
    fireEvent.dragStart(dealCard);
    fireEvent.dragOver(targetCol!, { preventDefault: () => {} });
    fireEvent.drop(targetCol!, { preventDefault: () => {} });

    expect(onMove).toHaveBeenCalledWith("d1", "s1", "s2");
  });

  it("applies custom className", () => {
    const { container } = render(<LeadPipelineBoard stages={stages} deals={deals} className="my-pipeline" />);
    const el = container.querySelector('[data-slot="lead-pipeline-board"]') as HTMLElement;
    expect(el.className).toContain("my-pipeline");
  });

  it("renders probability badge", () => {
    render(<LeadPipelineBoard stages={stages} deals={deals} />);
    expect(screen.getByText("10%")).toBeTruthy();
    expect(screen.getByText("100%")).toBeTruthy();
  });
});
