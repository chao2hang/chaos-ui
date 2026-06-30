import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DepartmentPicker } from "./department-picker";
import type { DepartmentPickerProps, DepartmentPickerOption } from "./department-picker";

const options: DepartmentPickerOption[] = [
  { value: "D1", label: "总部" },
  { value: "D2", label: "销售部", parent: "D1" },
  { value: "D3", label: "市场部", parent: "D1" },
  { value: "D4", label: "独立部门" },
];

describe("DepartmentPicker", () => {
  it("exports the component and types", () => {
    expect(DepartmentPicker).toBeDefined();
    const _tc: DepartmentPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks DepartmentPickerOption shape", () => {
    const opt: DepartmentPickerOption = { value: "D1", label: "总部" };
    expect(opt.value).toBe("D1");
  });

  it("renders the placeholder when no value", () => {
    render(<DepartmentPicker options={[]} placeholder="请选择部门" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择部门")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<DepartmentPicker options={[]} />);
    expect(screen.getByText("请选择部门")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<DepartmentPicker value="D2" options={options} />);
    expect(screen.getByText("销售部")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<DepartmentPicker options={[]} disabled placeholder="请选择部门" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders the flattened tree rows when open", () => {
    render(<DepartmentPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("总部")).toBeDefined();
    expect(screen.getByText("销售部")).toBeDefined();
    expect(screen.getByText("市场部")).toBeDefined();
    expect(screen.getByText("独立部门")).toBeDefined();
  });

  it("filters the tree by label and shows ancestors for context", () => {
    render(<DepartmentPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索部门" }), {
      target: { value: "销售" },
    });
    expect(screen.getByText("销售部")).toBeDefined();
    expect(screen.getByText("总部")).toBeDefined();
    expect(screen.queryByText("市场部")).toBeNull();
    expect(screen.queryByText("独立部门")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<DepartmentPicker options={options} emptyText="无匹配部门" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索部门" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配部门")).toBeDefined();
  });

  it("shows the empty state when options list is empty", () => {
    render(<DepartmentPicker options={[]} emptyText="无匹配部门" />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("无匹配部门")).toBeDefined();
  });

  it("calls onChange and closes the popover when a treeitem is clicked", () => {
    const onChange = vi.fn();
    render(<DepartmentPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("销售部"));
    expect(onChange).toHaveBeenCalledWith("D2");
    expect(screen.queryByRole("tree")).toBeNull();
  });

  it("marks the selected treeitem with aria-selected", () => {
    render(<DepartmentPicker value="D2" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("treeitem")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("销售部");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<DepartmentPicker value="D2" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<DepartmentPicker value="D2" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<DepartmentPicker value="D2" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<DepartmentPicker value="D2" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<DepartmentPicker options={[]} className="custom-class" placeholder="请选择部门" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
