import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import {
  SpreadsheetEditor,
  EditableGrid,
} from "@/components/ui/spreadsheet-editor";
import type { SpreadsheetColumnDef } from "@/components/ui/spreadsheet-editor";

const columns: SpreadsheetColumnDef[] = [
  { key: "name", title: "名称", editable: true },
  { key: "price", title: "单价", type: "number", editable: true },
  {
    key: "status",
    title: "状态",
    type: "select",
    editable: true,
    options: [
      { label: "上架", value: "active" },
      { label: "下架", value: "inactive" },
    ],
  },
];

describe("SpreadsheetEditor", () => {
  it("renders with default empty row", () => {
    const { container } = render(<SpreadsheetEditor columns={columns} />);
    expect(container.querySelector("table")).not.toBeNull();
    // Should have header row + 1 data row
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });

  it("renders with provided data", () => {
    const data = [
      { id: "1", name: "商品A", price: "100" },
      { id: "2", name: "商品B", price: "200" },
    ];
    const { container } = render(
      <SpreadsheetEditor columns={columns} data={data} />,
    );
    expect(container.textContent).toContain("商品A");
    expect(container.textContent).toContain("200");
  });

  it("calls onChange when cell is edited", async () => {
    const onChange = vi.fn();
    const data = [{ id: "1", name: "", price: "" }];
    const { container } = render(
      <SpreadsheetEditor columns={columns} data={data} onChange={onChange} />,
    );

    // Click the cell to start editing
    const cells = container.querySelectorAll("tbody td");
    const nameCell = cells[1]; // second td (first is row number)
    await act(async () => {
      fireEvent.click(nameCell!);
    });

    // Type in the input
    const input = container.querySelector("input");
    if (input) {
      await act(async () => {
        fireEvent.change(input, { target: { value: "NewName" } });
        fireEvent.blur(input);
      });
    }

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0]?.[0][0]?.name).toBe("NewName");
  });

  it("adds a row when add button is clicked", async () => {
    const onChange = vi.fn();
    const data = [{ id: "1", name: "A" }];
    const { container } = render(
      <SpreadsheetEditor columns={columns} data={data} onChange={onChange} />,
    );

    const addBtn = container.querySelector("button");
    expect(addBtn).not.toBeNull();

    await act(async () => {
      if (addBtn) fireEvent.click(addBtn);
    });

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0]?.[0]).toHaveLength(2);
  });

  it("deletes a row when delete button is clicked", async () => {
    const onChange = vi.fn();
    const data = [
      { id: "1", name: "A" },
      { id: "2", name: "B" },
    ];
    const { container } = render(
      <SpreadsheetEditor columns={columns} data={data} onChange={onChange} />,
    );

    // Find delete buttons (one per row)
    const deleteBtns = Array.from(
      container.querySelectorAll("button[title='删除行']"),
    );
    expect(deleteBtns.length).toBe(2);

    await act(async () => {
      fireEvent.click(deleteBtns[0]!);
    });

    expect(onChange.mock.calls[0]?.[0]).toHaveLength(1);
  });

  it("renders column headers", () => {
    const { container } = render(<SpreadsheetEditor columns={columns} />);
    expect(container.textContent).toContain("名称");
    expect(container.textContent).toContain("单价");
    expect(container.textContent).toContain("状态");
  });

  it("can hide row numbers", () => {
    const { container } = render(
      <SpreadsheetEditor columns={columns} showRowNumbers={false} />,
    );
    const headerCells = container.querySelectorAll("thead th");
    // Without row numbers, first header is the first data column
    expect(headerCells[0]?.textContent?.trim()).toBe("名称");
  });

  it("can hide headers", () => {
    const { container } = render(
      <SpreadsheetEditor columns={columns} showHeaders={false} />,
    );
    expect(container.querySelector("thead")).toBeNull();
  });

  it("respects maxRows limit", () => {
    const data = [{ id: "1", name: "A" }];
    const { container } = render(
      <SpreadsheetEditor columns={columns} data={data} maxRows={1} />,
    );
    const addBtn = container.querySelector("button");
    expect(addBtn?.disabled).toBe(true);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/spreadsheet-editor");
    expect(mod.SpreadsheetEditor).toBeDefined();
  });

  it("exports EditableGrid as SpreadsheetEditor alias", () => {
    expect(EditableGrid).toBe(SpreadsheetEditor);
  });
});
