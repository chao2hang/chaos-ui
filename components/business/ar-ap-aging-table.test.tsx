import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ArApAgingTable } from "./ar-ap-aging-table";
import type { AgingEntry } from "./ar-ap-aging-table";

const asOf = "2026-07-01";

const entries: AgingEntry[] = [
  {
    id: "1",
    partyName: "Acme Corp",
    docNo: "INV-001",
    docDate: "2026-06-15",
    dueDate: "2026-06-25",
    amount: 5000,
  },
  {
    id: "2",
    partyName: "Globex Inc",
    docNo: "INV-002",
    docDate: "2026-05-10",
    dueDate: "2026-05-20",
    amount: 3000,
  },
  {
    id: "3",
    partyName: "Initech",
    docNo: "INV-003",
    docDate: "2026-03-01",
    dueDate: "2026-03-11",
    amount: 8000,
  },
  {
    id: "4",
    partyName: "Umbrella",
    docNo: "INV-004",
    docDate: "2026-06-28",
    dueDate: "2026-07-08",
    amount: 2000,
  },
];

describe("ArApAgingTable", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <ArApAgingTable entries={entries} asOfDate={asOf} />,
    );
    expect(
      container.querySelector('[data-slot="ar-ap-aging-table"]'),
    ).toBeTruthy();
  });

  it("shows AR title by default", () => {
    render(<ArApAgingTable entries={entries} asOfDate={asOf} />);
    expect(screen.getByText("AR Aging")).toBeTruthy();
  });

  it("shows AP title when type=ap", () => {
    render(<ArApAgingTable entries={entries} asOfDate={asOf} type="ap" />);
    expect(screen.getByText("AP Aging")).toBeTruthy();
  });

  it("renders as-of date badge", () => {
    render(<ArApAgingTable entries={entries} asOfDate={asOf} />);
    expect(screen.getByText(/as of 2026-07-01/)).toBeTruthy();
  });

  it("renders all party names", () => {
    render(<ArApAgingTable entries={entries} asOfDate={asOf} />);
    expect(screen.getByText("Acme Corp")).toBeTruthy();
    expect(screen.getByText("Globex Inc")).toBeTruthy();
    expect(screen.getByText("Initech")).toBeTruthy();
    expect(screen.getByText("Umbrella")).toBeTruthy();
  });

  it("shows empty state when no entries", () => {
    render(<ArApAgingTable entries={[]} asOfDate={asOf} />);
    expect(screen.getByText(/No receivables found/)).toBeTruthy();
  });

  it("shows empty state for AP type", () => {
    render(<ArApAgingTable entries={[]} asOfDate={asOf} type="ap" />);
    expect(screen.getByText(/No payables found/)).toBeTruthy();
  });

  it("calls onRowClick when row is clicked", () => {
    const onClick = vi.fn();
    const { container } = render(
      <ArApAgingTable entries={entries} asOfDate={asOf} onRowClick={onClick} />,
    );
    const rowEls = container.querySelectorAll('[data-slot="aging-row"]');
    fireEvent.click(rowEls[0]!);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
  });

  it("renders bucket summary cards", () => {
    const { container } = render(
      <ArApAgingTable entries={entries} asOfDate={asOf} />,
    );
    const summaries = container.querySelectorAll(
      '[data-slot="aging-bucket-summary"]',
    );
    expect(summaries.length).toBe(4);
  });

  it("renders grand total", () => {
    render(<ArApAgingTable entries={entries} asOfDate={asOf} />);
    // Grand total = 5000 + 3000 + 8000 + 2000 = 18000. Appears in the header
    // summary and the table footer, so use getAllByText.
    expect(screen.getAllByText(/¥18,000\.00/).length).toBeGreaterThan(0);
  });

  it("renders footer total row", () => {
    render(<ArApAgingTable entries={entries} asOfDate={asOf} />);
    expect(screen.getAllByText("Total").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArApAgingTable entries={entries} asOfDate={asOf} className="my-aging" />,
    );
    const el = container.querySelector(
      '[data-slot="ar-ap-aging-table"]',
    ) as HTMLElement;
    expect(el.className).toContain("my-aging");
  });

  it("supports custom currency symbol", () => {
    render(
      <ArApAgingTable entries={entries} asOfDate={asOf} currencySymbol="$" />,
    );
    expect(screen.getAllByText(/\$18,000\.00/).length).toBeGreaterThan(0);
  });
});
