import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCategoryPicker } from "./product-category-picker";
import type {
  ProductCategoryPickerProps,
  ProductCategoryPickerOption,
} from "./product-category-picker";

const options: ProductCategoryPickerOption[] = [
  { value: "C1", label: "食品" },
  { value: "C2", label: "调味品", parent: "C1" },
  { value: "C3", label: "零食", parent: "C1" },
  { value: "C4", label: "日用品" },
];

describe("ProductCategoryPicker", () => {
  it("exports the component and types", () => {
    expect(ProductCategoryPicker).toBeDefined();
    const _tc: ProductCategoryPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks ProductCategoryPickerOption shape", () => {
    const opt: ProductCategoryPickerOption = { value: "C1", label: "食品" };
    expect(opt.value).toBe("C1");
  });

  it("renders the placeholder when no value", () => {
    render(<ProductCategoryPicker options={[]} placeholder="请选择商品分类" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择商品分类")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<ProductCategoryPicker options={[]} />);
    expect(screen.getByText("请选择商品分类")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<ProductCategoryPicker value="C2" options={options} />);
    expect(screen.getByText("调味品")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<ProductCategoryPicker options={[]} disabled placeholder="请选择商品分类" />);
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders the flattened tree rows when open", () => {
    render(<ProductCategoryPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("食品")).toBeDefined();
    expect(screen.getByText("调味品")).toBeDefined();
    expect(screen.getByText("零食")).toBeDefined();
    expect(screen.getByText("日用品")).toBeDefined();
  });

  it("filters the tree by label and shows ancestors for context", () => {
    render(<ProductCategoryPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索分类" }), {
      target: { value: "调味" },
    });
    expect(screen.getByText("调味品")).toBeDefined();
    expect(screen.getByText("食品")).toBeDefined();
    expect(screen.queryByText("零食")).toBeNull();
    expect(screen.queryByText("日用品")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<ProductCategoryPicker options={options} emptyText="无匹配分类" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索分类" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配分类")).toBeDefined();
  });

  it("shows the empty state when options list is empty", () => {
    render(<ProductCategoryPicker options={[]} emptyText="无匹配分类" />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("无匹配分类")).toBeDefined();
  });

  it("calls onChange and closes the popover when a treeitem is clicked", () => {
    const onChange = vi.fn();
    render(<ProductCategoryPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("调味品"));
    expect(onChange).toHaveBeenCalledWith("C2");
    expect(screen.queryByRole("tree")).toBeNull();
  });

  it("marks the selected treeitem with aria-selected", () => {
    render(<ProductCategoryPicker value="C2" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selected = screen
      .getAllByRole("treeitem")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toBeDefined();
    expect(selected?.textContent).toContain("调味品");
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<ProductCategoryPicker value="C2" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<ProductCategoryPicker value="C2" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<ProductCategoryPicker value="C2" options={options} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "清除" }), { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("hides the clear button when clearable is false", () => {
    render(<ProductCategoryPicker value="C2" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("applies the className to the combobox trigger", () => {
    render(<ProductCategoryPicker options={[]} className="custom-class" placeholder="请选择商品分类" />);
    expect(screen.getByRole("combobox").className).toContain("custom-class");
  });
});
