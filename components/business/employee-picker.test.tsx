import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmployeePicker } from "./employee-picker";
import type { EmployeePickerProps, EmployeePickerOption } from "./employee-picker";

const options: EmployeePickerOption[] = [
  { value: "E1", label: "张三", code: "001", department: "销售部" },
  { value: "E2", label: "李四", code: "002", department: "市场部" },
  { value: "E3", label: "王五", disabled: true },
];

describe("EmployeePicker", () => {
  it("exports the component and types", () => {
    expect(EmployeePicker).toBeDefined();
    const _tc: EmployeePickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks EmployeePickerOption shape", () => {
    const opt: EmployeePickerOption = { value: "E1", label: "张三" };
    expect(opt.value).toBe("E1");
  });

  it("renders the placeholder when no value", () => {
    render(<EmployeePicker options={[]} placeholder="请选择员工" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择员工")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<EmployeePicker options={[]} />);
    expect(screen.getByText("请选择员工")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<EmployeePicker value="E1" options={options} />);
    expect(screen.getByText("张三")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<EmployeePicker options={[]} disabled placeholder="请选择员工" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders options with code and department badges in the popover", () => {
    render(<EmployeePicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("张三")).toBeDefined();
    expect(screen.getByText(/001/)).toBeDefined();
    expect(screen.getAllByText("销售部").length).toBeGreaterThan(0);
    expect(screen.getAllByText("市场部").length).toBeGreaterThan(0);
  });

  it("filters options by department", () => {
    render(<EmployeePicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索员工" }), {
      target: { value: "市场" },
    });
    expect(screen.getByText("李四")).toBeDefined();
    expect(screen.queryByText("张三")).toBeNull();
  });

  it("filters options by code", () => {
    render(<EmployeePicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索员工" }), {
      target: { value: "002" },
    });
    expect(screen.getByText("李四")).toBeDefined();
    expect(screen.queryByText("张三")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<EmployeePicker options={options} emptyText="无匹配员工" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索员工" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配员工")).toBeDefined();
  });

  it("calls onChange and closes the popover when an option is clicked", () => {
    const onChange = vi.fn();
    render(<EmployeePicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("李四"));
    expect(onChange).toHaveBeenCalledWith("E2");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("marks the selected option with aria-selected", () => {
    render(<EmployeePicker value="E1" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("option")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("张三");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<EmployeePicker value="E1" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<EmployeePicker value="E1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<EmployeePicker value="E1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<EmployeePicker value="E1" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<EmployeePicker options={[]} className="custom-class" placeholder="请选择员工" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
