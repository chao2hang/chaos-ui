import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WarehousePicker } from "./warehouse-picker";
import type { WarehousePickerProps, WarehousePickerOption } from "./warehouse-picker";

const options: WarehousePickerOption[] = [
  { value: "W1", label: "中央仓", code: "CQ-01", address: "渝北区" },
  { value: "W2", label: "华东仓", address: "上海" },
  { value: "W3", label: "华南仓", code: "GZ-03", disabled: true },
];

describe("WarehousePicker", () => {
  it("exports the component and types", () => {
    expect(WarehousePicker).toBeDefined();
    const _tc: WarehousePickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks WarehousePickerOption shape", () => {
    const opt: WarehousePickerOption = { value: "W1", label: "中央仓" };
    expect(opt.value).toBe("W1");
  });

  it("renders the placeholder when no value", () => {
    render(<WarehousePicker options={[]} placeholder="请选择仓库" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择仓库")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<WarehousePicker options={[]} />);
    expect(screen.getByText("请选择仓库")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<WarehousePicker value="W1" options={options} />);
    expect(screen.getByText("中央仓")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<WarehousePicker options={[]} disabled placeholder="请选择仓库" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders options with code badges in the popover", () => {
    render(<WarehousePicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("中央仓")).toBeDefined();
    expect(screen.getAllByText("CQ-01").length).toBeGreaterThan(0);
    expect(screen.getAllByText("GZ-03").length).toBeGreaterThan(0);
  });

  it("filters options by address", () => {
    render(<WarehousePicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索仓库" }), {
      target: { value: "上海" },
    });
    expect(screen.getByText("华东仓")).toBeDefined();
    expect(screen.queryByText("中央仓")).toBeNull();
  });

  it("filters options by code", () => {
    render(<WarehousePicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索仓库" }), {
      target: { value: "gz-03" },
    });
    expect(screen.getByText("华南仓")).toBeDefined();
    expect(screen.queryByText("中央仓")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<WarehousePicker options={options} emptyText="无匹配仓库" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索仓库" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配仓库")).toBeDefined();
  });

  it("calls onChange and closes the popover when an option is clicked", () => {
    const onChange = vi.fn();
    render(<WarehousePicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("华东仓"));
    expect(onChange).toHaveBeenCalledWith("W2");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("marks the selected option with aria-selected", () => {
    render(<WarehousePicker value="W1" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("option")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("中央仓");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<WarehousePicker value="W1" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<WarehousePicker value="W1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<WarehousePicker value="W1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<WarehousePicker value="W1" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<WarehousePicker options={[]} className="custom-class" placeholder="请选择仓库" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
