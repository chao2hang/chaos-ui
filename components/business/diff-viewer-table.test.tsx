import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DiffViewerTable } from "./diff-viewer-table";
import type { DiffColumn } from "./diff-viewer-table";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

type Row = Record<string, unknown> & {
  id: string;
  name: string;
  qty: number;
  price: number;
};

const columns: DiffColumn<Row>[] = [
  { key: "name", title: "Name" },
  { key: "qty", title: "Quantity", align: "right" },
  { key: "price", title: "Price", align: "right" },
];

const beforeData: Row[] = [
  { id: "1", name: "Widget A", qty: 10, price: 5.0 },
  { id: "2", name: "Widget B", qty: 20, price: 10.0 },
  { id: "3", name: "Widget C", qty: 30, price: 15.0 },
];

const afterData: Row[] = [
  { id: "1", name: "Widget A", qty: 10, price: 5.0 }, // unchanged
  { id: "2", name: "Widget B", qty: 25, price: 12.0 }, // changed
  { id: "4", name: "Widget D", qty: 40, price: 20.0 }, // added
];
// Widget C is removed

describe("DiffViewerTable", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    expect(
      container.querySelector('[data-slot="diff-viewer-table"]'),
    ).toBeTruthy();
  });

  it("detects added rows", () => {
    render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    // Widget D is added
    expect(screen.getByText("Widget D")).toBeTruthy();
    const addedBadges = screen.getAllByText("Added");
    expect(addedBadges.length).toBe(1);
  });

  it("detects removed rows", () => {
    render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    // Widget C is removed
    expect(screen.getByText("Widget C")).toBeTruthy();
    const removedBadges = screen.getAllByText("Removed");
    expect(removedBadges.length).toBe(1);
  });

  it("detects changed rows with cell-level diff", () => {
    render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    // Widget B is changed (qty 20->25, price 10->12)
    const changedBadges = screen.getAllByText("Changed");
    expect(changedBadges.length).toBe(1);

    // Changed cells should have the diff-cell-changed slot
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    const changedCells = container.querySelectorAll(
      '[data-slot="diff-cell-changed"]',
    );
    // Widget B has 2 changed fields (qty and price)
    expect(changedCells.length).toBe(2);
  });

  it("unchanged rows have no highlight", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    const unchangedRows = container.querySelectorAll(
      '[data-status="unchanged"]',
    );
    expect(unchangedRows.length).toBe(1);
    // Unchanged rows should NOT have background classes
    expect(unchangedRows[0]!.className).not.toContain("bg-green");
    expect(unchangedRows[0]!.className).not.toContain("bg-red");
    expect(unchangedRows[0]!.className).not.toContain("bg-yellow");
  });

  it("summary counts correct", () => {
    render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
        showSummary
      />,
    );
    // 1 added, 1 removed, 1 changed, 1 unchanged
    expect(screen.getByText("1 Added")).toBeTruthy();
    expect(screen.getByText("1 Removed")).toBeTruthy();
    expect(screen.getByText("1 Changed")).toBeTruthy();
    expect(screen.getByText("1 Unchanged")).toBeTruthy();
  });

  it("showChangesOnly filters unchanged rows", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
        showChangesOnly
      />,
    );
    // Only changed/added/removed rows should appear
    const rows = container.querySelectorAll("[data-status]");
    expect(rows.length).toBe(3); // 1 added, 1 removed, 1 changed
    const unchanged = container.querySelectorAll('[data-status="unchanged"]');
    expect(unchanged.length).toBe(0);
  });

  it("side-by-side renders two tables", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
        viewMode="side-by-side"
      />,
    );
    expect(
      container.querySelector('[data-slot="diff-side-by-side"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="diff-side-before"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="diff-side-after"]'),
    ).toBeTruthy();
  });

  it("empty before/after handled", () => {
    render(
      <DiffViewerTable before={[]} after={[]} rowKey="id" columns={columns} />,
    );
    expect(screen.getByText("No differences found")).toBeTruthy();
  });

  it("handles identical data (all unchanged)", () => {
    render(
      <DiffViewerTable
        before={beforeData}
        after={beforeData}
        rowKey="id"
        columns={columns}
        showSummary
      />,
    );
    const unchangedBadges = screen.getAllByText("Unchanged");
    expect(unchangedBadges.length).toBe(3);
    expect(screen.getByText("0 Added")).toBeTruthy();
    expect(screen.getByText("0 Removed")).toBeTruthy();
    expect(screen.getByText("0 Changed")).toBeTruthy();
  });

  it("applies correct background for added rows", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    const addedRows = container.querySelectorAll('[data-status="added"]');
    expect(addedRows.length).toBe(1);
    expect(addedRows[0]!.className).toContain("bg-green");
  });

  it("applies correct background for removed rows with strikethrough", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    const removedRows = container.querySelectorAll('[data-status="removed"]');
    expect(removedRows.length).toBe(1);
    expect(removedRows[0]!.className).toContain("bg-red");
    const strikethroughElements =
      removedRows[0]!.querySelectorAll(".line-through");
    expect(strikethroughElements.length).toBeGreaterThan(0);
  });

  it("applies yellow highlight to changed cells", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    const changedRow = container.querySelector('[data-status="changed"]');
    expect(changedRow).toBeTruthy();
    const yellowCells = changedRow!.querySelectorAll(".bg-yellow-50");
    expect(yellowCells.length).toBe(2); // qty and price changed
  });

  it("shows before/after values for changed cells in unified mode", () => {
    render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    // Widget B changed: qty 20 -> 25
    // Both old and new values should appear
    expect(screen.getByText("25")).toBeTruthy();
    expect(screen.getAllByText("20").length).toBeGreaterThanOrEqual(1);
  });

  it("hides summary toolbar when showSummary is false", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
      />,
    );
    expect(
      container.querySelector('[data-slot="diff-viewer-summary"]'),
    ).toBeNull();
  });

  it("shows summary toolbar when showSummary is true", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
        showSummary
      />,
    );
    expect(
      container.querySelector('[data-slot="diff-viewer-summary"]'),
    ).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <DiffViewerTable
        before={beforeData}
        after={afterData}
        rowKey="id"
        columns={columns}
        className="custom-diff-class"
      />,
    );
    const el = container.querySelector(
      '[data-slot="diff-viewer-table"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-diff-class");
  });
});
