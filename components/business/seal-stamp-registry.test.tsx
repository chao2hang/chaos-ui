import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SealStampRegistry } from "./seal-stamp-registry";
import type { SealRecord, SealUsageLog } from "./seal-stamp-registry";

const seals: SealRecord[] = [
  {
    id: "s1",
    name: "Company Official Seal",
    type: "official",
    regNo: "SEAL-001",
    custodian: "Alice",
    department: "Administration",
    issueDate: "2020-01-15",
    status: "active",
    lastUsed: "2026-06-28",
    usageCount: 156,
  },
  {
    id: "s2",
    name: "Financial Seal",
    type: "financial",
    regNo: "SEAL-002",
    custodian: "Bob",
    department: "Finance",
    issueDate: "2020-01-15",
    status: "custody",
    lastUsed: "2026-06-20",
    usageCount: 89,
  },
  {
    id: "s3",
    name: "Contract Seal",
    type: "contract",
    regNo: "SEAL-003",
    custodian: "Carol",
    department: "Legal",
    issueDate: "2021-03-10",
    status: "active",
    usageCount: 45,
  },
];

const logs: SealUsageLog[] = [
  {
    id: "l1",
    sealId: "s1",
    applicant: "Dave",
    document: "Annual Report 2025",
    date: "2026-06-28",
    approver: "Alice",
    status: "completed",
  },
  {
    id: "l2",
    sealId: "s2",
    applicant: "Eve",
    document: "Bank Transfer Authorization",
    date: "2026-06-27",
    approver: "Bob",
    status: "approved",
  },
  {
    id: "l3",
    sealId: "s1",
    applicant: "Frank",
    document: "Partnership Agreement",
    date: "2026-06-26",
    approver: "Alice",
    status: "pending",
  },
];

describe("SealStampRegistry", () => {
  it("renders with data-slot", () => {
    const { container } = render(<SealStampRegistry seals={seals} />);
    expect(
      container.querySelector('[data-slot="seal-stamp-registry"]'),
    ).toBeTruthy();
  });

  it("renders title", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.getByText("Seal & Stamp Registry")).toBeTruthy();
  });

  it("renders seal count summary", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.getByText(/3 registered/)).toBeTruthy();
    expect(screen.getByText(/2 active/)).toBeTruthy();
    expect(screen.getByText(/1 in custody/)).toBeTruthy();
  });

  it("renders all seal names", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.getByText("Company Official Seal")).toBeTruthy();
    // "Financial Seal" doubles as a seal name and its type badge.
    expect(screen.getAllByText("Financial Seal").length).toBeGreaterThan(0);
    // "Contract Seal" doubles as a seal name and its type badge.
    expect(screen.getAllByText("Contract Seal").length).toBeGreaterThan(0);
  });

  it("renders type badges", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.getByText("Official Seal")).toBeTruthy();
    // "Financial Seal" doubles as a seal name and its type badge.
    expect(screen.getAllByText("Financial Seal").length).toBeGreaterThan(0);
    // "Contract Seal" doubles as a seal name and its type badge.
    expect(screen.getAllByText("Contract Seal").length).toBeGreaterThan(0);
  });

  it("renders custodian names", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
    expect(screen.getByText("Carol")).toBeTruthy();
  });

  it("renders usage counts", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.getByText("156 times")).toBeTruthy();
    expect(screen.getByText("89 times")).toBeTruthy();
    expect(screen.getByText("45 times")).toBeTruthy();
  });

  it("renders usage log table", () => {
    render(<SealStampRegistry seals={seals} usageLogs={logs} />);
    expect(screen.getByText("Recent Usage Log")).toBeTruthy();
    expect(screen.getByText("Annual Report 2025")).toBeTruthy();
    expect(screen.getByText("Bank Transfer Authorization")).toBeTruthy();
    expect(screen.getByText("Partnership Agreement")).toBeTruthy();
  });

  it("renders log status badges", () => {
    render(<SealStampRegistry seals={seals} usageLogs={logs} />);
    expect(screen.getByText("Completed")).toBeTruthy();
    expect(screen.getByText("Approved")).toBeTruthy();
    expect(screen.getByText("Pending")).toBeTruthy();
  });

  it("calls onSealClick when seal card clicked", () => {
    const onClick = vi.fn();
    const { container } = render(
      <SealStampRegistry seals={seals} onSealClick={onClick} />,
    );
    const cards = container.querySelectorAll('[data-slot="seal-card"]');
    fireEvent.click(cards[0]!);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: "s1" }));
  });

  it("calls onApplyUsage when button clicked", () => {
    const onApply = vi.fn();
    render(<SealStampRegistry seals={seals} onApplyUsage={onApply} />);
    fireEvent.click(screen.getByText("Apply for Usage"));
    expect(onApply).toHaveBeenCalled();
  });

  it("hides apply button in read-only mode", () => {
    render(
      <SealStampRegistry seals={seals} onApplyUsage={() => {}} readOnly />,
    );
    expect(screen.queryByText("Apply for Usage")).toBeNull();
  });

  it("does not render usage log when empty", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.queryByText("Recent Usage Log")).toBeNull();
  });

  it("renders status labels", () => {
    render(<SealStampRegistry seals={seals} />);
    expect(screen.getAllByText("Active").length).toBeGreaterThan(0);
    expect(screen.getByText("In Custody")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <SealStampRegistry seals={seals} className="my-seal" />,
    );
    const el = container.querySelector(
      '[data-slot="seal-stamp-registry"]',
    ) as HTMLElement;
    expect(el.className).toContain("my-seal");
  });
});
