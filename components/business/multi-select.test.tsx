import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiSelect } from "./multi-select";
import type { MultiSelectOption } from "./multi-select";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

const options: MultiSelectOption[] = [
  { value: "a", label: "Apple", description: "red fruit" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry", group: "berries" },
  { value: "d", label: "Durian", disabled: true },
];

describe("MultiSelect", () => {
  it("renders the placeholder when no value", () => {
    render(<MultiSelect options={options} placeholder="Pick fruit" />);
    expect(screen.getByText("Pick fruit")).toBeDefined();
  });

  it("renders selected value badges", () => {
    render(<MultiSelect options={options} value={["a", "b"]} />);
    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.getByText("Banana")).toBeDefined();
  });

  it("shows overflow count when value exceeds maxCount", () => {
    render(
      <MultiSelect
        options={options}
        value={["a", "b", "c"]}
        maxCount={2}
      />,
    );
    expect(screen.getByText("+1")).toBeDefined();
  });

  it("removes a selected value via the badge remove button", () => {
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={["a", "b"]}
        onChange={onChange}
      />,
    );
    // Two selected badges -> two remove buttons with the same aria-label.
    const removeBtns = screen.getAllByLabelText("multiSelect.remove");
    expect(removeBtns.length).toBe(2);
    fireEvent.click(removeBtns[0]!);
    expect(onChange).toHaveBeenCalledWith(["b"]);
  });

  it("clears all via the clear-all button", () => {
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={["a"]}
        onChange={onChange}
        clearable
      />,
    );
    fireEvent.click(screen.getByLabelText("multiSelect.clearAll"));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("does not show clear-all when clearable=false", () => {
    render(
      <MultiSelect options={options} value={["a"]} clearable={false} />,
    );
    expect(screen.queryByLabelText("multiSelect.clearAll")).toBeNull();
  });

  it("opens the panel on trigger click and lists options", () => {
    render(<MultiSelect options={options} />);
    fireEvent.click(screen.getByText("multiSelect.placeholder").closest("button")!);
    expect(screen.getByText("berries")).toBeDefined();
    expect(screen.getByText("Cherry")).toBeDefined();
  });

  it("toggles a value when clicking an option in the panel", () => {
    const onChange = vi.fn();
    render(<MultiSelect options={options} onChange={onChange} />);
    fireEvent.click(screen.getByText("multiSelect.placeholder").closest("button")!);
    fireEvent.click(screen.getByText("Apple"));
    expect(onChange).toHaveBeenCalledWith(["a"]);
  });

  it("respects maxSelected by not adding beyond the limit", () => {
    const onChange = vi.fn();
    render(
      <MultiSelect
        options={options}
        value={["a"]}
        onChange={onChange}
        maxSelected={1}
      />,
    );
    // Value already has one item ("Apple" badge shown), so the placeholder is
    // not rendered; open the panel by clicking the trigger <button>.
    fireEvent.click(screen.getByRole("button", { name: /Apple/ }));
    fireEvent.click(screen.getByText("Banana"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders a disabled trigger when disabled", () => {
    render(<MultiSelect options={options} disabled />);
    const trigger = screen.getByText("multiSelect.placeholder").closest("button") as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
  });

  it("filters options by search query in the panel", () => {
    render(<MultiSelect options={options} />);
    fireEvent.click(screen.getByText("multiSelect.placeholder").closest("button")!);
    const search = screen.getByPlaceholderText("multiSelect.searchPlaceholder");
    fireEvent.change(search, { target: { value: "ban" } });
    expect(screen.getByText("Banana")).toBeDefined();
    expect(screen.queryByText("Apple")).toBeNull();
  });

  it("renders disabled option as non-interactive", () => {
    render(<MultiSelect options={options} />);
    fireEvent.click(screen.getByText("multiSelect.placeholder").closest("button")!);
    const durianBtn = screen.getByText("Durian").closest("button") as HTMLButtonElement;
    expect(durianBtn.disabled).toBe(true);
  });

  it("exports types", () => {
    const _tc1: MultiSelectOption | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("exports MultiSelect", () => {
    expect(MultiSelect).toBeDefined();
  });
});
