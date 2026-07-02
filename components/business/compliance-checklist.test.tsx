import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComplianceChecklist } from "./compliance-checklist";
import type { ComplianceItem } from "./compliance-checklist";

const items: ComplianceItem[] = [
  { id: "i1", code: "ISO-4.1", description: "Quality policy documented and communicated", category: "Quality Management", status: "compliant", owner: "Alice", dueDate: "2026-06-01", evidence: "QM-POL-001", risk: "low" },
  { id: "i2", code: "ISO-6.2", description: "Quality objectives established", category: "Quality Management", status: "in_progress", owner: "Bob", dueDate: "2026-07-15", risk: "medium" },
  { id: "i3", code: "GDPR-7", description: "Data subject access request procedure", category: "Data Privacy", status: "non_compliant", owner: "Carol", dueDate: "2026-06-30", risk: "high", notes: "Need legal review" },
  { id: "i4", code: "GDPR-17", description: "Right to erasure implemented", category: "Data Privacy", status: "pending", dueDate: "2026-08-01" },
  { id: "i5", code: "SOC-1.1", description: "Access control policy", category: "Security", status: "compliant", owner: "Dave", evidence: "SEC-POL-005" },
  { id: "i6", code: "SOC-2.3", description: "Encryption at rest", category: "Security", status: "not_applicable", notes: "No on-prem storage" },
];

describe("ComplianceChecklist", () => {
  it("renders with data-slot", () => {
    const { container } = render(<ComplianceChecklist items={items} />);
    expect(container.querySelector('[data-slot="compliance-checklist"]')).toBeTruthy();
  });

  it("renders title", () => {
    render(<ComplianceChecklist items={items} title="ISO 9001 Audit" />);
    expect(screen.getByText("ISO 9001 Audit")).toBeTruthy();
  });

  it("renders compliance score", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText("Compliance Score")).toBeTruthy();
    // 2 compliant / 5 applicable (excluding not_applicable) = 40%
    expect(screen.getByText("40%")).toBeTruthy();
  });

  it("renders status summary counts", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText(/Compliant: 2/)).toBeTruthy();
    expect(screen.getByText(/Non-Compliant: 1/)).toBeTruthy();
    expect(screen.getByText(/In Progress: 1/)).toBeTruthy();
    expect(screen.getByText(/Pending: 1/)).toBeTruthy();
    expect(screen.getByText(/N\/A: 1/)).toBeTruthy();
  });

  it("renders category headers", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText("Quality Management")).toBeTruthy();
    expect(screen.getByText("Data Privacy")).toBeTruthy();
    expect(screen.getByText("Security")).toBeTruthy();
  });

  it("renders item codes", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText("ISO-4.1")).toBeTruthy();
    expect(screen.getByText("ISO-6.2")).toBeTruthy();
    expect(screen.getByText("GDPR-7")).toBeTruthy();
  });

  it("renders item descriptions", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText("Quality policy documented and communicated")).toBeTruthy();
    expect(screen.getByText("Data subject access request procedure")).toBeTruthy();
  });

  it("renders risk labels", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText("low risk")).toBeTruthy();
    expect(screen.getByText("medium risk")).toBeTruthy();
    expect(screen.getByText("high risk")).toBeTruthy();
  });

  it("renders owner names", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText(/Alice/)).toBeTruthy();
    expect(screen.getByText(/Bob/)).toBeTruthy();
    expect(screen.getByText(/Carol/)).toBeTruthy();
  });

  it("renders due dates", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText(/2026-06-01/)).toBeTruthy();
    expect(screen.getByText(/2026-07-15/)).toBeTruthy();
  });

  it("renders evidence references", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText(/QM-POL-001/)).toBeTruthy();
    expect(screen.getByText(/SEC-POL-005/)).toBeTruthy();
  });

  it("renders notes", () => {
    render(<ComplianceChecklist items={items} />);
    expect(screen.getByText("Need legal review")).toBeTruthy();
    expect(screen.getByText("No on-prem storage")).toBeTruthy();
  });

  it("calls onItemClick when item clicked", () => {
    const onClick = vi.fn();
    const { container } = render(<ComplianceChecklist items={items} onItemClick={onClick} />);
    const itemEls = container.querySelectorAll('[data-slot="compliance-item"]');
    fireEvent.click(itemEls[0]!);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: "i1" }));
  });

  it("renders status dropdowns when onStatusChange provided", () => {
    const { container } = render(<ComplianceChecklist items={items} onStatusChange={() => {}} />);
    const selects = container.querySelectorAll('select[aria-label="Status selector"]');
    expect(selects.length).toBeGreaterThan(0);
  });

  it("shows status badges in read-only mode", () => {
    render(<ComplianceChecklist items={items} readOnly />);
    expect(screen.getAllByText("Compliant").length).toBeGreaterThan(0);
  });

  it("shows empty state", () => {
    render(<ComplianceChecklist items={[]} />);
    expect(screen.getByText("No compliance items")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<ComplianceChecklist items={items} className="my-compliance" />);
    const el = container.querySelector('[data-slot="compliance-checklist"]') as HTMLElement;
    expect(el.className).toContain("my-compliance");
  });
});
