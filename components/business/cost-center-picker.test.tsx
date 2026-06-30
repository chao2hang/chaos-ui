import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CostCenterPicker } from "./cost-center-picker";
import type { CostCenterPickerProps, CostCenterPickerOption } from "./cost-center-picker";

const options: CostCenterPickerOption[] = [
  { value: "CC1", label: "华东成本中心", code: "EC" },
  { value: "CC2", label: "华南成本中心" },
  { value: "CC3", label: "华北成本中心", code: "NC", disabled: true },
];

describe("CostCenterPicker", () => {
  it("exports the component and types", () => {
    expect(CostCenterPicker).toBeDefined();
    const _tc: CostCenterPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks CostCenterPickerOption shape", () => {
    const opt: CostCenterPickerOption = { value: "CC1", label: "华东" };
    expect(opt.value).toBe("CC1");
  });

  it("renders the placeholder when no value", () => {
    render(<CostCenterPicker options={[]} placeholder="请选择成本中心" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择成本中心")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<CostCenterPicker options={[]} />);
    expect(screen.getByText("请选择成本中心")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<CostCenterPicker value="CC1" options={options} />);
    expect(screen.getByText("华东成本中心")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<CostCenterPicker options={[]} disabled placeholder="请选择成本中心" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders options in the popover when open", () => {
    render(<CostCenterPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("华东成本中心")).toBeDefined();
    expect(screen.getByText("华南成本中心")).toBeDefined();
    expect(screen.getByText("华北成本中心")).toBeDefined();
  });

  it("filters options by label when typing a query", () => {
    render(<CostCenterPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索成本中心" }), {
      target: { value: "华东" },
    });
    expect(screen.getByText("华东成本中心")).toBeDefined();
    expect(screen.queryByText("华南成本中心")).toBeNull();
  });

  it("filters options by code", () => {
    render(<CostCenterPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索成本中心" }), {
      target: { value: "nc" },
    });
    expect(screen.getByText("华北成本中心")).toBeDefined();
    expect(screen.queryByText("华东成本中心")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<CostCenterPicker options={options} emptyText="无匹配成本中心" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索成本中心" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配成本中心")).toBeDefined();
  });

  it("shows the empty state when options list is empty", () => {
    render(<CostCenterPicker options={[]} emptyText="无匹配成本中心" />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("无匹配成本中心")).toBeDefined();
  });

  it("calls onChange and closes the popover when an option is clicked", () => {
    const onChange = vi.fn();
    render(<CostCenterPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("华南成本中心"));
    expect(onChange).toHaveBeenCalledWith("CC2");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("marks the selected option with aria-selected", () => {
    render(<CostCenterPicker value="CC1" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("option")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("华东成本中心");
  });

  it("shows a clear button only when a value is selected", () => {
    const { rerender } = render(<CostCenterPicker value="CC1" options={options} />);
    expect(screen.getByRole("button", { name: "清除" })).toBeDefined();
    rerender(<CostCenterPicker options={options} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("hides the clear button when clearable is false", () => {
    render(<CostCenterPicker value="CC1" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<CostCenterPicker value="CC1" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<CostCenterPicker value="CC1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<CostCenterPicker value="CC1" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("resets the search query after selecting an option", () => {
    render(<CostCenterPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const search = screen.getByRole("textbox", { name: "搜索成本中心" }) as HTMLInputElement;
    fireEvent.change(search, { target: { value: "华东" } });
    fireEvent.click(screen.getByText("华东成本中心"));
    fireEvent.click(screen.getByRole("combobox"));
    const searchAfter = screen.getByRole("textbox", { name: "搜索成本中心" }) as HTMLInputElement;
    expect(searchAfter.value).toBe("");
  });

  it("applies the className to the combobox trigger", () => {
    render(<CostCenterPicker options={[]} className="custom-class" placeholder="请选择成本中心" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
