import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DistributorPicker } from "./distributor-picker";
import type { DistributorPickerProps, DistributorPickerOption } from "./distributor-picker";

const options: DistributorPickerOption[] = [
  { value: "D1", label: "华东经销A", code: "EC-A", region: "华东" },
  { value: "D2", label: "华南经销B", region: "华南" },
  { value: "D3", label: "华北经销C", code: "NC-C", region: "华北", disabled: true },
];

describe("DistributorPicker", () => {
  it("exports the component and types", () => {
    expect(DistributorPicker).toBeDefined();
    const _tc: DistributorPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks DistributorPickerOption shape", () => {
    const opt: DistributorPickerOption = { value: "D1", label: "华东" };
    expect(opt.value).toBe("D1");
  });

  it("renders the placeholder when no value", () => {
    render(<DistributorPicker options={[]} placeholder="请选择经销商" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择经销商")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<DistributorPicker options={[]} />);
    expect(screen.getByText("请选择经销商")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<DistributorPicker value="D1" options={options} />);
    expect(screen.getByText("华东经销A")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<DistributorPicker options={[]} disabled placeholder="请选择经销商" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders options with region badges in the popover", () => {
    render(<DistributorPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("华东经销A")).toBeDefined();
    expect(screen.getAllByText("华东").length).toBeGreaterThan(0);
    expect(screen.getAllByText("华南").length).toBeGreaterThan(0);
  });

  it("filters options by region", () => {
    render(<DistributorPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索经销商" }), {
      target: { value: "华南" },
    });
    expect(screen.getByText("华南经销B")).toBeDefined();
    expect(screen.queryByText("华东经销A")).toBeNull();
  });

  it("filters options by code", () => {
    render(<DistributorPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索经销商" }), {
      target: { value: "nc-c" },
    });
    expect(screen.getByText("华北经销C")).toBeDefined();
    expect(screen.queryByText("华东经销A")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<DistributorPicker options={options} emptyText="无匹配经销商" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索经销商" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配经销商")).toBeDefined();
  });

  it("calls onChange and closes the popover when an option is clicked", () => {
    const onChange = vi.fn();
    render(<DistributorPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("华南经销B"));
    expect(onChange).toHaveBeenCalledWith("D2");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("marks the selected option with aria-selected", () => {
    render(<DistributorPicker value="D1" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("option")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("华东经销A");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<DistributorPicker value="D1" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<DistributorPicker value="D1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<DistributorPicker value="D1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<DistributorPicker value="D1" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<DistributorPicker options={[]} className="custom-class" placeholder="请选择经销商" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
