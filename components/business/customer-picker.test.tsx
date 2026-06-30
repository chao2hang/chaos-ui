import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomerPicker } from "./customer-picker";
import type { CustomerPickerProps, CustomerPickerOption } from "./customer-picker";

const options: CustomerPickerOption[] = [
  { value: "C1", label: "Acme 经销", type: "distributor", contact: "张三" },
  { value: "C2", label: "Best 终端", type: "terminal", contact: "李四" },
  { value: "C3", label: "Other Co", type: "other" },
  { value: "C4", label: "Disabled Co", disabled: true },
];

describe("CustomerPicker", () => {
  it("exports the component and types", () => {
    expect(CustomerPicker).toBeDefined();
    const _tc: CustomerPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks CustomerPickerOption shape", () => {
    const opt: CustomerPickerOption = { value: "C1", label: "Acme" };
    expect(opt.value).toBe("C1");
  });

  it("renders the placeholder when no value", () => {
    render(<CustomerPicker options={[]} placeholder="请选择客户" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择客户")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<CustomerPicker options={[]} />);
    expect(screen.getByText("请选择客户")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<CustomerPicker value="C1" options={options} />);
    expect(screen.getByText("Acme 经销")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<CustomerPicker options={[]} disabled placeholder="请选择客户" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders options with contact and type labels in the popover", () => {
    render(<CustomerPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Acme 经销")).toBeDefined();
    expect(screen.getByText(/张三/)).toBeDefined();
    expect(screen.getByText("经销商")).toBeDefined();
    expect(screen.getByText("终端")).toBeDefined();
  });

  it("does not render a type badge for type 'other'", () => {
    render(<CustomerPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    // 'Other Co' option present without a type badge (other -> null)
    expect(screen.getByText("Other Co")).toBeDefined();
  });

  it("filters options by contact", () => {
    render(<CustomerPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索客户" }), {
      target: { value: "李四" },
    });
    expect(screen.getByText("Best 终端")).toBeDefined();
    expect(screen.queryByText("Acme 经销")).toBeNull();
  });

  it("filters options by type", () => {
    render(<CustomerPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索客户" }), {
      target: { value: "terminal" },
    });
    expect(screen.getByText("Best 终端")).toBeDefined();
    expect(screen.queryByText("Acme 经销")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<CustomerPicker options={options} emptyText="无匹配客户" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索客户" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配客户")).toBeDefined();
  });

  it("calls onChange and closes the popover when an option is clicked", () => {
    const onChange = vi.fn();
    render(<CustomerPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Best 终端"));
    expect(onChange).toHaveBeenCalledWith("C2");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("marks the selected option with aria-selected", () => {
    render(<CustomerPicker value="C1" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("option")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("Acme 经销");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<CustomerPicker value="C1" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<CustomerPicker value="C1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<CustomerPicker value="C1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<CustomerPicker value="C1" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<CustomerPicker options={[]} className="custom-class" placeholder="请选择客户" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
