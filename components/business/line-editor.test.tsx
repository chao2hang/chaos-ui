import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LineEditor } from "./line-editor";
import type {
  LineEditorProps,
  LineColumn,
  LineEditorColumn,
} from "./line-editor";

describe("LineEditor", () => {
  it("renders header columns and row data", () => {
    render(
      <LineEditor
        columns={[{ key: "name", title: "Name" }]}
        data={[{ id: "1", name: "Alice" }]}
      />,
    );
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined(); // row number
  });

  it("renders empty state when data is empty", () => {
    render(
      <LineEditor columns={[{ key: "name", title: "Name" }]} data={[]} />,
    );
    expect(screen.getByText(/暂无明细行/)).toBeDefined();
  });

  it("renders add row button and adds a row on click", () => {
    const onChange = vi.fn();
    render(
      <LineEditor
        columns={[{ key: "name", title: "Name", defaultValue: "" }]}
        data={[{ id: "1", name: "A" }]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("添加行"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const newData = onChange.mock.calls[0]![0] as Record<string, unknown>[];
    expect(newData.length).toBe(2);
    expect(newData[1]!.name).toBe("");
  });

  it("respects maxRows by disabling add button", () => {
    render(
      <LineEditor
        columns={[{ key: "name", title: "Name" }]}
        data={[{ id: "1", name: "A" }]}
        maxRows={1}
      />,
    );
    const addBtn = screen.getByText("添加行").closest("button") as HTMLButtonElement;
    expect(addBtn.disabled).toBe(true);
  });

  it("removes a row via the remove button", () => {
    const onChange = vi.fn();
    const { container } = render(
      <LineEditor
        columns={[{ key: "name", title: "Name" }]}
        data={[
          { id: "1", name: "A" },
          { id: "2", name: "B" },
        ]}
        onChange={onChange}
        minRows={1}
      />,
    );
    // Remove buttons are the icon-only ghost buttons in the operation column
    // (no text content, contain an svg).
    const removeBtn = Array.from(container.querySelectorAll("button")).find(
      (b) => {
        const text = (b.textContent || "").trim();
        return text === "" && b.querySelector("svg") !== null;
      },
    ) as HTMLButtonElement;
    expect(removeBtn).toBeTruthy();
    fireEvent.click(removeBtn);
    expect(onChange).toHaveBeenCalledTimes(1);
    const newData = onChange.mock.calls[0]![0] as Record<string, unknown>[];
    expect(newData.length).toBe(1);
  });

  it("disables remove when at minRows", () => {
    const { container } = render(
      <LineEditor
        columns={[{ key: "name", title: "Name" }]}
        data={[{ id: "1", name: "A" }]}
        minRows={1}
      />,
    );
    const removeBtn = Array.from(container.querySelectorAll("button")).find(
      (b) =>
        (b.textContent || "").trim() === "" && b.querySelector("svg") !== null,
    ) as HTMLButtonElement;
    expect(removeBtn.disabled).toBe(true);
  });

  it("recomputes computed columns on cell change", () => {
    const onChange = vi.fn();
    render(
      <LineEditor
        columns={[
          { key: "qty", title: "Qty", type: "number", editRender: (value, _row, onChange) => (
            <input
              aria-label="qty"
              value={String(value ?? "")}
              onChange={(e) => onChange(Number(e.target.value))}
            />
          ) },
          {
            key: "total",
            title: "Total",
            compute: (row) => Number(row.qty ?? 0) * 2,
          },
        ]}
        data={[{ id: "1", qty: 1, total: 2 }]}
        onChange={onChange}
      />,
    );
    const input = screen.getByLabelText("qty") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    const row = onChange.mock.calls[0]![0][0] as Record<string, unknown>;
    expect(row.qty).toBe(5);
    expect(row.total).toBe(10);
  });

  it("renders summary row summing summaryKeys", () => {
    render(
      <LineEditor
        columns={[
          { key: "name", title: "Name" },
          { key: "amount", title: "Amount", type: "number", align: "right" },
        ]}
        data={[
          { id: "1", name: "A", amount: 100 },
          { id: "2", name: "B", amount: 200 },
        ]}
        summaryKeys={["amount"]}
      />,
    );
    expect(screen.getByText("合计")).toBeDefined();
    expect(screen.getByText("300")).toBeDefined();
  });

  it("renders loading skeleton when loading=true", () => {
    const { container } = render(
      <LineEditor
        columns={[{ key: "name", title: "Name" }]}
        data={[]}
        loading
      />,
    );
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
    expect(screen.queryByText("添加行")).toBeNull();
  });

  it("hides operation column and add button when readOnly", () => {
    render(
      <LineEditor
        columns={[{ key: "name", title: "Name" }]}
        data={[{ id: "1", name: "A" }]}
        readOnly
      />,
    );
    expect(screen.queryByText("添加行")).toBeNull();
    expect(screen.queryByText(/操作/)).toBeNull();
  });

  it("renders footer when provided (readOnly path)", () => {
    render(
      <LineEditor
        columns={[{ key: "name", title: "Name" }]}
        data={[{ id: "1", name: "A" }]}
        readOnly
        footer={<span>custom-footer</span>}
      />,
    );
    expect(screen.getByText("custom-footer")).toBeDefined();
  });

  it("uses custom render function for a column", () => {
    render(
      <LineEditor
        columns={[
          {
            key: "name",
            title: "Name",
            render: (value) => <strong>R:{String(value)}</strong>,
          },
        ]}
        data={[{ id: "1", name: "Z" }]}
      />,
    );
    expect(screen.getByText("R:Z")).toBeDefined();
  });

  it("formats number type cells via toLocaleString", () => {
    render(
      <LineEditor
        columns={[{ key: "n", title: "N", type: "number" }]}
        data={[{ id: "1", n: 1234 }]}
        readOnly
      />,
    );
    // 1234.toLocaleString() -> "1,234" in en
    expect(screen.getByText("1,234")).toBeDefined();
  });

  it("renders '-' for null/undefined cell values", () => {
    render(
      <LineEditor
        columns={[{ key: "n", title: "N", type: "text" }]}
        data={[{ id: "1" }]}
        readOnly
      />,
    );
    expect(screen.getByText("-")).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: LineEditorProps | undefined = undefined;
    const _tc2: LineColumn | undefined = undefined;
    const _tc3: LineEditorColumn | undefined = undefined;
    expect(_tc1).toBeUndefined();
    expect(_tc2).toBeUndefined();
    expect(_tc3).toBeUndefined();
  });
});
