import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "./filter-bar";
import type { FilterBarProps, FilterField } from "./filter-bar";

const baseFields: FilterField[] = [
  { key: "name", label: "姓名", type: "input", placeholder: "输入姓名" },
  {
    key: "status",
    label: "状态",
    type: "select",
    options: [
      { label: "启用", value: "1" },
      { label: "禁用", value: "0" },
    ],
  },
  { key: "code", label: "编码" },
  { key: "email", label: "邮箱" },
  { key: "phone", label: "电话" },
];

describe("filter-bar", () => {
  it("exports FilterBar", () => {
    expect(FilterBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FilterBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FilterField | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders field labels", () => {
    render(<FilterBar fields={baseFields.slice(0, 2)} onSearch={vi.fn()} />);
    // "状态" appears as both the field label and the select placeholder option;
    // assert the label element exists.
    const labels = screen.getAllByText("状态");
    expect(labels.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("姓名")).toBeDefined();
  });

  it("shows search and reset buttons", () => {
    render(<FilterBar fields={baseFields.slice(0, 2)} onSearch={vi.fn()} />);
    expect(screen.getByText("查询")).toBeDefined();
    expect(screen.getByText("重置")).toBeDefined();
  });

  it("fires onSearch with current values", () => {
    const onSearch = vi.fn();
    render(<FilterBar fields={baseFields.slice(0, 1)} onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("输入姓名");
    fireEvent.change(input, { target: { value: "张三" } });
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ name: "张三" });
  });

  it("initializes values from defaultValue and includes them in search", () => {
    const onSearch = vi.fn();
    render(
      <FilterBar
        fields={[{ key: "name", label: "姓名", defaultValue: "默认值" }]}
        onSearch={onSearch}
      />,
    );
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ name: "默认值" });
  });

  it("resets values on reset click and calls onReset", () => {
    const onSearch = vi.fn();
    const onReset = vi.fn();
    render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        onSearch={onSearch}
        onReset={onReset}
      />,
    );
    const input = screen.getByPlaceholderText("输入姓名");
    fireEvent.change(input, { target: { value: "张三" } });
    fireEvent.click(screen.getByText("重置"));
    expect(onReset).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({});
  });

  it("fires onSearch on Enter keydown in input", () => {
    const onSearch = vi.fn();
    render(
      <FilterBar fields={baseFields.slice(0, 1)} onSearch={onSearch} />,
    );
    const input = screen.getByPlaceholderText("输入姓名");
    fireEvent.change(input, { target: { value: "x" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSearch).toHaveBeenCalledWith({ name: "x" });
  });

  it("collapses to first 3 fields and shows expand button with hidden count", () => {
    render(<FilterBar fields={baseFields} onSearch={vi.fn()} collapsible />);
    expect(screen.getByText("姓名")).toBeDefined();
    // "状态" label renders for the visible select field.
    expect(screen.getAllByText("状态").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("编码")).toBeDefined();
    expect(screen.queryByText("邮箱")).toBeNull();
    expect(screen.getByText("展开 (2)")).toBeDefined();
  });

  it("expands all fields on expand click", () => {
    render(<FilterBar fields={baseFields} onSearch={vi.fn()} collapsible />);
    fireEvent.click(screen.getByText("展开 (2)"));
    expect(screen.getByText("邮箱")).toBeDefined();
    expect(screen.getByText("电话")).toBeDefined();
    expect(screen.getByText("收起")).toBeDefined();
  });

  it("disables buttons when loading", () => {
    render(
      <FilterBar fields={baseFields.slice(0, 1)} onSearch={vi.fn()} loading />,
    );
    expect((screen.getByText("查询") as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByText("重置") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders select field with options and fires search on change", () => {
    const onSearch = vi.fn();
    render(<FilterBar fields={baseFields.slice(1, 2)} onSearch={onSearch} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeDefined();
    fireEvent.change(select, { target: { value: "1" } });
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ status: "1" });
  });

  it("renders custom render field", () => {
    const fields: FilterField[] = [
      {
        key: "custom",
        label: "自定义",
        type: "custom",
        render: (value, onChange) => (
          <button
            type="button"
            data-testid="custom-btn"
            onClick={() => onChange("custom", "clicked")}
          >
            {String(value ?? "none")}
          </button>
        ),
      },
    ];
    const onSearch = vi.fn();
    render(<FilterBar fields={fields} onSearch={onSearch} />);
    fireEvent.click(screen.getByTestId("custom-btn"));
    fireEvent.click(screen.getByText("查询"));
    expect(onSearch).toHaveBeenCalledWith({ custom: "clicked" });
  });

  it("renders card layout wrapped in a Card", () => {
    const { container } = render(
      <FilterBar
        fields={baseFields.slice(0, 1)}
        onSearch={vi.fn()}
        layout="card"
      />,
    );
    expect(container.querySelector('[data-slot="card"]')).not.toBeNull();
  });
});
