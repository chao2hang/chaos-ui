import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditableTable, type EditableColumn } from "./editable-table";

type Row = { id: string; name: string };

describe("EditableTable", () => {
  const columns: EditableColumn<Row>[] = [
    { key: "name", title: "Name", dataIndex: "name", type: "text" },
  ];
  const data: Row[] = [{ id: "1", name: "A" }];

  it("renders and edits a cell", () => {
    const onChange = vi.fn();
    render(<EditableTable columns={columns} data={data} onChange={onChange} />);
    fireEvent.click(screen.getByText("A"));
    const input = screen.getByDisplayValue("A");
    fireEvent.change(input, { target: { value: "Alpha" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onChange).toHaveBeenCalled();
  });
});
