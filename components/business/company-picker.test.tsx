import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CompanyPicker } from "./company-picker";
import type { CompanyPickerProps, CompanyPickerOption } from "./company-picker";

const options: CompanyPickerOption[] = [
  { value: "C1", label: "Acme 食品", code: "ACME" },
  { value: "C2", label: "Best Corp" },
  { value: "C3", label: "Acme Beverages", code: "ACME-BEV", disabled: true },
];

describe("CompanyPicker", () => {
  it("exports the component and types", () => {
    expect(CompanyPicker).toBeDefined();
    const _tc: CompanyPickerProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("type-checks CompanyPickerOption shape", () => {
    const opt: CompanyPickerOption = { value: "C1", label: "Acme" };
    expect(opt.value).toBe("C1");
  });

  it("renders the placeholder when no value", () => {
    render(<CompanyPicker options={[]} placeholder="请选择公司" />);
    expect(screen.getByRole("combobox")).toBeDefined();
    expect(screen.getByText("请选择公司")).toBeDefined();
  });

  it("uses the i18n default placeholder when none provided", () => {
    render(<CompanyPicker options={[]} />);
    expect(screen.getByText("请选择公司")).toBeDefined();
  });

  it("renders the selected label when value is set", () => {
    render(<CompanyPicker value="C1" options={options} />);
    expect(screen.getByText("Acme 食品")).toBeDefined();
  });

  it("marks the combobox as disabled when disabled prop is set", () => {
    render(<CompanyPicker options={[]} disabled placeholder="请选择公司" />);
    const combo = screen.getByRole("combobox") as HTMLButtonElement;
    expect(combo.disabled).toBe(true);
  });

  it("renders options in the popover when open", () => {
    render(<CompanyPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Acme 食品")).toBeDefined();
    expect(screen.getByText("Best Corp")).toBeDefined();
    expect(screen.getByText("Acme Beverages")).toBeDefined();
  });

  it("filters options by label when typing a query", () => {
    render(<CompanyPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const search = screen.getByRole("textbox", { name: "搜索公司" });
    fireEvent.change(search, { target: { value: "acme" } });
    expect(screen.getByText("Acme 食品")).toBeDefined();
    expect(screen.getByText("Acme Beverages")).toBeDefined();
    expect(screen.queryByText("Best Corp")).toBeNull();
  });

  it("filters options by code", () => {
    render(<CompanyPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const search = screen.getByRole("textbox", { name: "搜索公司" });
    fireEvent.change(search, { target: { value: "ACME-BEV" } });
    expect(screen.getByText("Acme Beverages")).toBeDefined();
    expect(screen.queryByText("Best Corp")).toBeNull();
  });

  it("shows the empty state when no options match", () => {
    render(<CompanyPicker options={options} emptyText="无匹配公司" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("textbox", { name: "搜索公司" }), {
      target: { value: "zzzz" },
    });
    expect(screen.getByText("无匹配公司")).toBeDefined();
  });

  it("shows the empty state when options list is empty", () => {
    render(<CompanyPicker options={[]} emptyText="无匹配公司" />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("无匹配公司")).toBeDefined();
  });

  it("calls onChange and closes the popover when an option is clicked", () => {
    const onChange = vi.fn();
    render(<CompanyPicker options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Best Corp"));
    expect(onChange).toHaveBeenCalledWith("C2");
    // popover closed: options no longer in listbox role
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("marks the selected option with aria-selected", () => {
    render(<CompanyPicker value="C1" options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const selectedOption = screen
      .getAllByRole("option")
      .find((o) => o.getAttribute("aria-selected") === "true");
    expect(selectedOption).toBeDefined();
    expect(selectedOption?.textContent).toContain("Acme 食品");
  });

  it("shows a clear button only when a value is selected and clearable", () => {
    const { rerender } = render(<CompanyPicker value="C1" options={options} />);
    expect(screen.getByRole("button", { name: "清除" })).toBeDefined();

    rerender(<CompanyPicker options={options} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("hides the clear button when clearable is false", () => {
    render(<CompanyPicker value="C1" options={options} clearable={false} />);
    expect(screen.queryByRole("button", { name: "清除" })).toBeNull();
  });

  it("calls onChange(undefined) when the clear button is clicked", () => {
    const onChange = vi.fn();
    render(<CompanyPicker value="C1" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "清除" }));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Enter)", () => {
    const onChange = vi.fn();
    render(<CompanyPicker value="C1" options={options} onChange={onChange} />);
    const clear = screen.getByRole("button", { name: "清除" });
    fireEvent.keyDown(clear, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("calls onChange(undefined) when clearing via keyboard (Space)", () => {
    const onChange = vi.fn();
    render(<CompanyPicker value="C1" options={options} onChange={onChange} />);
    const clear = screen.getByRole("button", { name: "清除" });
    fireEvent.keyDown(clear, { key: " " });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("resets the search query after selecting an option", () => {
    render(<CompanyPicker options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    const search = screen.getByRole("textbox", { name: "搜索公司" }) as HTMLInputElement;
    fireEvent.change(search, { target: { value: "acme" } });
    fireEvent.click(screen.getByText("Acme 食品"));
    fireEvent.click(screen.getByRole("combobox"));
    const searchAfter = screen.getByRole("textbox", { name: "搜索公司" }) as HTMLInputElement;
    expect(searchAfter.value).toBe("");
  });

  it("applies the className to the combobox trigger", () => {
    render(<CompanyPicker options={[]} className="custom-class" placeholder="请选择公司" />);
    const combo = screen.getByRole("combobox");
    expect(combo.className).toContain("custom-class");
  });
});
