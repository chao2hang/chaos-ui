import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BatchGenealogyTree } from "./batch-genealogy-tree";
import type { BatchNode } from "./batch-genealogy-tree";

const tree: BatchNode = {
  batchNo: "FG-2026-001",
  product: "Final Assembly X",
  type: "finished",
  quantity: 500,
  unit: "pcs",
  date: "2026-06-28",
  operator: "Alice",
  status: "released",
  children: [
    {
      batchNo: "WIP-2026-010",
      product: "Sub-Assembly A",
      type: "wip",
      quantity: 500,
      unit: "pcs",
      date: "2026-06-25",
      operator: "Bob",
      children: [
        { batchNo: "RAW-001", product: "Steel Plate 2mm", type: "raw", quantity: 1000, unit: "kg", date: "2026-06-20", status: "released" },
        { batchNo: "RAW-002", product: "Aluminum Bar", type: "raw", quantity: 500, unit: "m", date: "2026-06-20", status: "released" },
      ],
    },
    {
      batchNo: "WIP-2026-011",
      product: "Sub-Assembly B",
      type: "wip",
      quantity: 500,
      unit: "pcs",
      date: "2026-06-26",
      operator: "Carol",
      status: "quarantine",
      children: [
        { batchNo: "RAW-003", product: "Circuit Board", type: "raw", quantity: 500, unit: "pcs", date: "2026-06-22", status: "released" },
      ],
    },
  ],
};

const simpleTree: BatchNode = {
  batchNo: "BATCH-001",
  product: "Simple Product",
  type: "finished",
  quantity: 100,
  unit: "pcs",
  date: "2026-06-28",
};

describe("BatchGenealogyTree", () => {
  it("renders with data-slot", () => {
    const { container } = render(<BatchGenealogyTree root={simpleTree} />);
    expect(container.querySelector('[data-slot="batch-genealogy-tree"]')).toBeTruthy();
  });

  it("renders title", () => {
    render(<BatchGenealogyTree root={simpleTree} />);
    expect(screen.getByText("Batch Genealogy")).toBeTruthy();
  });

  it("renders backward trace direction by default", () => {
    render(<BatchGenealogyTree root={simpleTree} />);
    expect(screen.getByText(/Backward Trace/)).toBeTruthy();
  });

  it("renders forward trace direction", () => {
    render(<BatchGenealogyTree root={simpleTree} direction="forward" />);
    expect(screen.getByText(/Forward Trace/)).toBeTruthy();
  });

  it("renders root batch number", () => {
    render(<BatchGenealogyTree root={tree} />);
    expect(screen.getByText("FG-2026-001")).toBeTruthy();
  });

  it("renders child batch numbers", () => {
    render(<BatchGenealogyTree root={tree} />);
    expect(screen.getByText("WIP-2026-010")).toBeTruthy();
    expect(screen.getByText("WIP-2026-011")).toBeTruthy();
    expect(screen.getByText("RAW-001")).toBeTruthy();
    expect(screen.getByText("RAW-002")).toBeTruthy();
    expect(screen.getByText("RAW-003")).toBeTruthy();
  });

  it("counts total nodes in tree", () => {
    render(<BatchGenealogyTree root={tree} />);
    // 1 root + 2 WIP + 3 raw = 6
    expect(screen.getByText(/6 batches/)).toBeTruthy();
  });

  it("renders type labels", () => {
    render(<BatchGenealogyTree root={tree} />);
    expect(screen.getAllByText("Finished").length).toBeGreaterThan(0);
    expect(screen.getAllByText("WIP").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Raw Material").length).toBeGreaterThan(0);
  });

  it("renders status badges", () => {
    render(<BatchGenealogyTree root={tree} />);
    expect(screen.getByText("Released")).toBeTruthy();
    expect(screen.getByText("Quarantine")).toBeTruthy();
  });

  it("calls onBatchClick when node clicked", () => {
    const onClick = vi.fn();
    const { container } = render(<BatchGenealogyTree root={tree} onBatchClick={onClick} />);
    const nodes = container.querySelectorAll('[data-slot="batch-node"]');
    fireEvent.click(nodes[0]!);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ batchNo: "FG-2026-001" }));
  });

  it("renders legend", () => {
    render(<BatchGenealogyTree root={simpleTree} />);
    expect(screen.getByText("Raw Material")).toBeTruthy();
    expect(screen.getByText("WIP")).toBeTruthy();
    expect(screen.getByText("Finished")).toBeTruthy();
    expect(screen.getByText("Scrap")).toBeTruthy();
  });

  it("renders product names", () => {
    render(<BatchGenealogyTree root={tree} />);
    expect(screen.getByText("Final Assembly X")).toBeTruthy();
    expect(screen.getByText("Sub-Assembly A")).toBeTruthy();
    expect(screen.getByText("Sub-Assembly B")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<BatchGenealogyTree root={simpleTree} className="my-tree" />);
    const el = container.querySelector('[data-slot="batch-genealogy-tree"]') as HTMLElement;
    expect(el.className).toContain("my-tree");
  });
});
