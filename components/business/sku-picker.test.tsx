import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SkuPicker } from "./sku-picker";
import type { SkuPickerProps, SkuPickerOption } from "./sku-picker";

const options: SkuPickerOption[] = [
  { value: "SKU1", label: "酱油 500ml", spec: "500ml", unit: "瓶", price: 12.5 },
  { value: "SKU2", label: "醋 1L", spec: "1L", unit: "瓶" },
  { value: "SKU3", label: "盐", disabled: true },
];

describe("SkuPicker", () => {
  it("exports the component and types", () => {
    expect(SkuPicker).toBeDefined();
    const _tc: SkuPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks SkuPickerOption shape", () => {
    const opt: SkuPickerOption = { value: "SKU1", label: "酱油" };
    expect(opt.value).toBe("SKU1");
  });

  it("renders the placeholder when no value", () => {
    render(<SkuPicker options={[]} placeholder="请选择商品" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择商品")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<SkuPicker options={[]} />);
    expect(screen.getByText("请选择商品")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<SkuPicker value="SKU1" options={options} />);
    expect(screen.getByText("酱油 500ml")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<SkuPicker options={[]} disabled placeholder="请选择商品" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders options with spec, unit and price in the popover", () => {
    render(<SkuPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("酱油 500ml")).toBeDefined();
    // spec is rendered as "· 500ml"
    expect(screen.getByText(/·\s*500ml/)).toBeDefined();
    expect(screen.getAllByText("瓶").length).toBeGreaterThan(0);
    // price 12.5 rendered as currency containing "12.50" or "12.5"
    expect(screen.getByText(/12\.50?/)).toBeDefined();
  });

  it("filters options by spec", () => {
    render(<SkuPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索商品/SKU" }), {
      target: { value: "1L" },
    });
    expect(screen.getByText("醋 1L")).toBeDefined();
    expect(screen.queryByText("酱油 500ml")).toBeNull();
  });

  it("filters options by code", () => {
    render(
      <SkuPicker
        options={[
          { value: "SKU1", label: "酱油", code: "SOY-001" },
          { value: "SKU2", label: "醋", code: "VIN-002" },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索商品/SKU" }), {
      target: { value: "vin-002" },
    });
    expect(screen.getByText("醋")).toBeDefined();
    expect(screen.queryByText("酱油")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<SkuPicker options={options} emptyText="无匹配商品" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索商品/SKU" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配商品")).toBeDefined();
  });

  it("calls onChange and closes the popover when an option is clicked", () => {
    const onChange = vi.fn();
    render(<SkuPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("醋 1L"));
    expect(onChange).toHaveBeenCalledWith("SKU2");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("marks the selected option with aria-selected", () => {
    render(<SkuPicker value="SKU1" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("option")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("酱油 500ml");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<SkuPicker value="SKU1" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<SkuPicker value="SKU1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<SkuPicker value="SKU1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<SkuPicker value="SKU1" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<SkuPicker options={[]} className="custom-class" placeholder="请选择商品" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
