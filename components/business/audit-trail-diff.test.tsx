import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuditTrailDiff } from "./audit-trail-diff";
import type { AuditChangeEntry } from "./audit-trail-diff";

vi.mock("@/components/ui/icons", () => ({
  SearchIcon: (p: Record<string, unknown>) => <svg data-testid="search" {...p} />,
  FilterIcon: (p: Record<string, unknown>) => <svg data-testid="filter" {...p} />,
  UserIcon: (p: Record<string, unknown>) => <svg data-testid="user" {...p} />,
  ClockIcon: (p: Record<string, unknown>) => <svg data-testid="clock" {...p} />,
  ArrowRightIcon: (p: Record<string, unknown>) => <svg data-testid="arrow-right" {...p} />,
}));

const entries: AuditChangeEntry[] = [
  {
    id: "1", entityType: "PurchaseOrder", entityId: "PO-2026-001",
    field: "status", fieldLabel: "Status", action: "update",
    oldValue: "Draft", newValue: "Submitted",
    user: "Alice Chen", timestamp: "2026-07-01T10:00:00Z",
    section: "Header",
  },
  {
    id: "2", entityType: "PurchaseOrder", entityId: "PO-2026-001",
    field: "totalAmount", fieldLabel: "Total Amount", action: "update",
    oldValue: "5000", newValue: "7500",
    user: "Alice Chen", timestamp: "2026-07-01T10:05:00Z",
  },
  {
    id: "3", entityType: "Invoice", entityId: "INV-2026-042",
    field: "", action: "create",
    newValue: "Invoice created",
    user: "Bob Smith", timestamp: "2026-07-01T11:00:00Z",
  },
  {
    id: "4", entityType: "Vendor", entityId: "V-100",
    field: "isActive", fieldLabel: "Active", action: "delete",
    oldValue: "true", newValue: "",
    user: "Carol Wu", timestamp: "2026-07-01T14:00:00Z",
    reason: "Vendor no longer in business",
  },
];

describe("AuditTrailDiff", () => {
  it("renders with data-slot", () => {
    const { container } = render(<AuditTrailDiff entries={entries} />);
    expect(container.querySelector('[data-slot="audit-trail-diff"]')).toBeTruthy();
  });

  it("renders all entries", () => {
    const { container } = render(<AuditTrailDiff entries={entries} />);
    const rows = container.querySelectorAll('[data-slot="audit-trail-entry"]');
    expect(rows.length).toBe(4);
  });

  it("shows action badges", () => {
    render(<AuditTrailDiff entries={entries} />);
    expect(screen.getByText("Updated")).toBeTruthy();
    expect(screen.getByText("Created")).toBeTruthy();
    expect(screen.getByText("Deleted")).toBeTruthy();
  });

  it("shows old and new values for updates", () => {
    render(<AuditTrailDiff entries={entries} />);
    expect(screen.getByText("Draft")).toBeTruthy();
    expect(screen.getByText("Submitted")).toBeTruthy();
    expect(screen.getByText("5000")).toBeTruthy();
    expect(screen.getByText("7500")).toBeTruthy();
  });

  it("filters by search text", () => {
    render(<AuditTrailDiff entries={entries} />);
    const searchInput = screen.getByLabelText("Search audit trail");
    fireEvent.change(searchInput, { target: { value: "Alice" } });
    // Should show entries from Alice (2 entries)
  });

  it("filters by action type", () => {
    const { container } = render(<AuditTrailDiff entries={entries} />);
    const select = screen.getByLabelText("Filter by action");
    fireEvent.change(select, { target: { value: "delete" } });
    const rows = container.querySelectorAll('[data-slot="audit-trail-entry"]');
    expect(rows.length).toBe(1);
  });

  it("shows entity column by default", () => {
    render(<AuditTrailDiff entries={entries} />);
    expect(screen.getByText("PurchaseOrder")).toBeTruthy();
    expect(screen.getByText("Invoice")).toBeTruthy();
    expect(screen.getByText("Vendor")).toBeTruthy();
  });

  it("hides entity column when showEntity is false", () => {
    render(<AuditTrailDiff entries={entries} showEntity={false} />);
    expect(screen.queryByText("PurchaseOrder")).toBeNull();
  });

  it("shows entry count", () => {
    render(<AuditTrailDiff entries={entries} />);
    expect(screen.getByText(/Showing 4 of 4 entries/)).toBeTruthy();
  });

  it("shows empty state when no entries", () => {
    render(<AuditTrailDiff entries={[]} />);
    expect(screen.getByText("No audit entries found")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <AuditTrailDiff entries={entries} className="custom-audit" />,
    );
    const el = container.querySelector('[data-slot="audit-trail-diff"]') as HTMLElement;
    expect(el.className).toContain("custom-audit");
  });

  it("shows reason column when enabled", () => {
    render(<AuditTrailDiff entries={entries} showReason />);
    expect(screen.getByText("Vendor no longer in business")).toBeTruthy();
  });
});
