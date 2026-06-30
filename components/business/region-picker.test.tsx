import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegionPicker } from "./region-picker";
import type { RegionPickerProps, RegionPickerOption } from "./region-picker";

const options: RegionPickerOption[] = [
  { value: "R1", label: "重庆市", level: "province" },
  { value: "R2", label: "渝中区", parent: "R1", level: "district" },
  { value: "R3", label: "江北区", parent: "R1", level: "district" },
  { value: "R4", label: "成都市", level: "province" },
];

describe("RegionPicker", () => {
  it("exports the component and types", () => {
    expect(RegionPicker).toBeDefined();
    const _tc: RegionPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks RegionPickerOption shape", () => {
    const opt: RegionPickerOption = { value: "R1", label: "重庆市" };
    expect(opt.value).toBe("R1");
  });

  it("renders the placeholder when no value", () => {
    render(<RegionPicker options={[]} placeholder="请选择地区" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择地区")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<RegionPicker options={[]} />);
    expect(screen.getByText("请选择地区")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<RegionPicker value="R2" options={options} />);
    expect(screen.getByText("渝中区")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<RegionPicker options={[]} disabled placeholder="请选择地区" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders the cascading tree rows when open", () => {
    render(<RegionPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("重庆市")).toBeDefined();
    expect(screen.getByText("渝中区")).toBeDefined();
    expect(screen.getByText("江北区")).toBeDefined();
    expect(screen.getByText("成都市")).toBeDefined();
  });

  it("filters the tree by label and shows ancestors for context", () => {
    render(<RegionPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索地区" }), {
      target: { value: "江北" },
    });
    expect(screen.getByText("江北区")).toBeDefined();
    expect(screen.getByText("重庆市")).toBeDefined();
    expect(screen.queryByText("渝中区")).toBeNull();
    expect(screen.queryByText("成都市")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<RegionPicker options={options} emptyText="无匹配地区" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索地区" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配地区")).toBeDefined();
  });

  it("shows the empty state when options list is empty", () => {
    render(<RegionPicker options={[]} emptyText="无匹配地区" />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("无匹配地区")).toBeDefined();
  });

  it("calls onChange and closes the popover when a treeitem is clicked", () => {
    const onChange = vi.fn();
    render(<RegionPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("渝中区"));
    expect(onChange).toHaveBeenCalledWith("R2");
    expect(screen.queryByRole("tree")).toBeNull();
  });

  it("marks the selected treeitem with aria-selected", () => {
    render(<RegionPicker value="R2" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("treeitem")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("渝中区");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<RegionPicker value="R2" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<RegionPicker value="R2" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<RegionPicker value="R2" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<RegionPicker value="R2" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<RegionPicker options={[]} className="custom-class" placeholder="请选择地区" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
