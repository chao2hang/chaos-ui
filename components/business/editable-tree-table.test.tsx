import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditableTreeTable } from "./editable-tree-table";
import type { EditableTreeTableColumn } from "./editable-tree-table";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

vi.mock("@/components/ui/icons", () => ({
  ChevronRightIcon: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-right" {...props} />
  ),
  ChevronDownIcon: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-down" {...props} />
  ),
  Loader2Icon: (props: Record<string, unknown>) => (
    <svg data-testid="loader" {...props} />
  ),
  PencilIcon: (props: Record<string, unknown>) => (
    <svg data-testid="pencil-icon" {...props} />
  ),
  CheckIcon: (props: Record<string, unknown>) => (
    <svg data-testid="check-icon" {...props} />
  ),
  XIcon: (props: Record<string, unknown>) => (
    <svg data-testid="x-icon" {...props} />
  ),
}));

type Row = Record<string, unknown> & {
  id: string;
  name: string;
  qty: number;
  unit: string;
  children?: Row[];
};

const sampleData: Row[] = [
  {
    id: "1",
    name: "Assembly A",
    qty: 10,
    unit: "pcs",
    children: [
      { id: "1-1", name: "Part X", qty: 5, unit: "pcs" },
      { id: "1-2", name: "Part Y", qty: 3, unit: "kg" },
    ],
  },
  { id: "2", name: "Assembly B", qty: 20, unit: "pcs" },
];

const editableColumns: EditableTreeTableColumn<Row>[] = [
  { key: "name", title: "Name" },
  {
    key: "qty",
    title: "Quantity",
    editable: true,
    editorType: "number",
  },
  {
    key: "unit",
    title: "Unit",
    editable: true,
    editorType: "select",
    editorOptions: [
      { value: "pcs", label: "Pieces" },
      { value: "kg", label: "Kilograms" },
      { value: "m", label: "Meters" },
    ],
  },
];

describe("EditableTreeTable", () => {
  it("renders with data-slot", () => {
    const { container } = render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
      />,
    );
    expect(
      container.querySelector('[data-slot="editable-tree-table"]'),
    ).toBeTruthy();
  });

  it("renders tree data with expand/collapse", () => {
    render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
      />,
    );
    expect(screen.getByText("Assembly A")).toBeTruthy();
    expect(screen.getByText("Assembly B")).toBeTruthy();
    // Children are hidden by default
    expect(screen.queryByText("Part X")).toBeNull();
    expect(screen.queryByText("Part Y")).toBeNull();

    // Expand the first node
    const expandBtns = screen.getAllByLabelText("Expand");
    fireEvent.click(expandBtns[0]!);

    expect(screen.getByText("Part X")).toBeTruthy();
    expect(screen.getByText("Part Y")).toBeTruthy();

    // Collapse
    const collapseBtns = screen.getAllByLabelText("Collapse");
    fireEvent.click(collapseBtns[0]!);

    expect(screen.queryByText("Part X")).toBeNull();
  });

  it("click editable cell enters edit mode", () => {
    render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
      />,
    );

    // Find editable display cells - click on a qty cell
    const editableCells = screen.getAllByRole("button");
    const qtyCell = editableCells.find((el) => el.textContent?.includes("10"));
    expect(qtyCell).toBeTruthy();
    if (qtyCell) {
      fireEvent.click(qtyCell);
    }

    // Should now show an input
    const input = screen.queryByDisplayValue("10");
    expect(input).toBeTruthy();
  });

  it("Enter commits value", async () => {
    render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
      />,
    );

    // Click on qty=10 to edit
    const editableCells = screen.getAllByRole("button");
    const qtyCell = editableCells.find((el) => el.textContent?.includes("10"));
    if (qtyCell) fireEvent.click(qtyCell);

    const input = screen.getByDisplayValue("10");
    fireEvent.change(input, { target: { value: "25" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Input should be gone, value should show 25
    await waitFor(() => {
      expect(screen.queryByDisplayValue("25")).toBeNull();
    });

    // The display should now show 25
    expect(screen.getByText("25")).toBeTruthy();
  });

  it("Escape cancels edit", async () => {
    render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
      />,
    );

    const editableCells = screen.getAllByRole("button");
    const qtyCell = editableCells.find((el) => el.textContent?.includes("10"));
    if (qtyCell) fireEvent.click(qtyCell);

    const input = screen.getByDisplayValue("10");
    fireEvent.change(input, { target: { value: "99" } });
    fireEvent.keyDown(input, { key: "Escape" });

    // Input should be gone, original value should be restored
    await waitFor(() => {
      expect(screen.queryByDisplayValue("99")).toBeNull();
    });
    expect(screen.getByText("10")).toBeTruthy();
  });

  it("validation prevents commit on error", async () => {
    const columnsWithValidation: EditableTreeTableColumn<Row>[] = [
      { key: "name", title: "Name" },
      {
        key: "qty",
        title: "Quantity",
        editable: true,
        editorType: "number",
        validate: (value) => {
          const num = Number(value);
          if (isNaN(num) || num < 0) return "Must be a non-negative number";
          return null;
        },
      },
    ];

    render(
      <EditableTreeTable
        columns={columnsWithValidation}
        data={sampleData}
        rowKey="id"
      />,
    );

    const editableCells = screen.getAllByRole("button");
    const qtyCell = editableCells.find((el) => el.textContent?.includes("10"));
    if (qtyCell) fireEvent.click(qtyCell);

    const input = screen.getByDisplayValue("10");
    fireEvent.change(input, { target: { value: "-5" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Error should be shown
    await waitFor(() => {
      expect(screen.getByText("Must be a non-negative number")).toBeTruthy();
    });

    // Input should still be visible (edit not committed)
    expect(screen.getByDisplayValue("-5")).toBeTruthy();
  });

  it("dirtyRows tracked correctly", () => {
    render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
        showToolbar
      />,
    );

    // Initially no changes
    expect(screen.getByText("No changes")).toBeTruthy();

    // Edit a cell
    const editableCells = screen.getAllByRole("button");
    const qtyCell = editableCells.find((el) => el.textContent?.includes("10"));
    if (qtyCell) fireEvent.click(qtyCell);

    const input = screen.getByDisplayValue("10");
    fireEvent.change(input, { target: { value: "25" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Should show 1 unsaved change
    expect(screen.getByText("1 unsaved change")).toBeTruthy();
  });

  it("onSave called with changed data", async () => {
    const onSave = vi.fn();

    render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
        showToolbar
        onSave={onSave}
      />,
    );

    // Edit qty of row 1 from 10 to 25
    const editableCells = screen.getAllByRole("button");
    const qtyCell = editableCells.find((el) => el.textContent?.includes("10"));
    if (qtyCell) fireEvent.click(qtyCell);

    const input = screen.getByDisplayValue("10");
    fireEvent.change(input, { target: { value: "25" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Click Save
    await waitFor(() => {
      const saveBtn = screen.getByText("Save");
      fireEvent.click(saveBtn);
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    const [newData, dirtyRows] = onSave.mock.calls[0] as [Row[], Row[]];
    expect(dirtyRows).toHaveLength(1);
    expect(newData).toBeDefined();
  });

  it("onCancel fires callback", async () => {
    const onCancel = vi.fn();

    render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
        showToolbar
        onCancel={onCancel}
      />,
    );

    // Edit a cell
    const editableCells = screen.getAllByRole("button");
    const qtyCell = editableCells.find((el) => el.textContent?.includes("10"));
    if (qtyCell) fireEvent.click(qtyCell);

    const input = screen.getByDisplayValue("10");
    fireEvent.change(input, { target: { value: "25" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText("1 unsaved change")).toBeTruthy();

    // Click Cancel
    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(screen.getByText("No changes")).toBeTruthy();
  });

  it("toolbar shows in edit mode with showToolbar", () => {
    const { container } = render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
        showToolbar
        editMode
      />,
    );
    expect(
      container.querySelector('[data-slot="editable-tree-table-toolbar"]'),
    ).toBeTruthy();
  });

  it("toolbar hidden when editMode is false", () => {
    const { container } = render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
        showToolbar
        editMode={false}
      />,
    );
    expect(
      container.querySelector('[data-slot="editable-tree-table-toolbar"]'),
    ).toBeNull();
  });

  it("non-editable cells do not enter edit mode", () => {
    const readOnlyColumns: EditableTreeTableColumn<Row>[] = [
      { key: "name", title: "Name" },
      { key: "qty", title: "Quantity" },
    ];

    render(
      <EditableTreeTable
        columns={readOnlyColumns}
        data={sampleData}
        rowKey="id"
      />,
    );

    // No cells should have role="button" (not editable)
    const buttons = screen.queryAllByRole("button");
    // Only expand buttons should exist
    const expandButtons = buttons.filter(
      (el) => el.getAttribute("aria-label") === "Expand",
    );
    expect(buttons.length).toBe(expandButtons.length);
  });

  it("renders loading skeletons", () => {
    const { container } = render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
        loading
      />,
    );
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders empty state when no data", () => {
    render(
      <EditableTreeTable
        columns={editableColumns}
        data={[]}
        rowKey="id"
        emptyText="Nothing here"
      />,
    );
    expect(screen.getByText("Nothing here")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
        className="custom-editable-class"
      />,
    );
    const el = container.querySelector(
      '[data-slot="editable-tree-table"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-editable-class");
  });

  it("editable function controls per-row editability", () => {
    const columnsWithFn: EditableTreeTableColumn<Row>[] = [
      { key: "name", title: "Name" },
      {
        key: "qty",
        title: "Quantity",
        editable: (row) => row.id !== "1", // Assembly A not editable
        editorType: "number",
      },
    ];

    render(
      <EditableTreeTable
        columns={columnsWithFn}
        data={sampleData}
        rowKey="id"
      />,
    );

    // Assembly B qty (20) SHOULD have role=button
    const editableCells = screen.getAllByRole("button");
    const texts = editableCells.map((el) => el.textContent);
    const hasQty20Editable = texts.some((t) => t?.includes("20"));
    expect(hasQty20Editable).toBe(true);
  });

  it("pads the table body horizontally under flush cards (CUI-LIST-03 / #27)", () => {
    const { container } = render(
      <EditableTreeTable
        columns={editableColumns}
        data={sampleData}
        rowKey="id"
      />,
    );
    const body = container.querySelector(
      '[data-slot="editable-tree-table-body"]',
    ) as HTMLElement;
    expect(body).not.toBeNull();
    expect(body.className).toMatch(/px-\[var\(--card-spacing/);
    const tableWrap = body.querySelector(".overflow-x-auto") as HTMLElement;
    expect(tableWrap).not.toBeNull();
    expect(tableWrap.className).toMatch(/border/);
    expect(tableWrap.className).not.toMatch(/px-\[var\(--card-spacing/);
  });
});
