import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBuilder } from "./filter-builder";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

const fields = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
];

describe("filter-builder", () => {
  it("exports FilterBuilder", () => {
    expect(FilterBuilder).toBeDefined();
  });

  it("renders the where label and add-filter button", () => {
    render(<FilterBuilder fields={fields} />);
    expect(screen.getByText("filterBuilder.where")).toBeDefined();
    expect(screen.getByText("filterBuilder.addFilter")).toBeDefined();
  });

  it("shows empty hint when no filters", () => {
    render(<FilterBuilder fields={fields} />);
    expect(screen.getByText("filterBuilder.empty")).toBeDefined();
  });

  it("adds a filter row on add-filter click and fires onChange", () => {
    const onChange = vi.fn();
    render(<FilterBuilder fields={fields} onChange={onChange} />);
    fireEvent.click(screen.getByText("filterBuilder.addFilter"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const last = onChange.mock.calls[0]![0];
    expect(last.filters).toHaveLength(1);
    expect(last.filters[0]).toEqual({
      field: "name",
      operator: "eq",
      value: "",
    });
    expect(last.logic).toBe("AND");
    // empty hint replaced by active count badge text
    expect(screen.queryByText("filterBuilder.empty")).toBeNull();
    expect(screen.getByText("filterBuilder.active")).toBeDefined();
  });

  it("updates the value input and notifies onChange", () => {
    const onChange = vi.fn();
    render(<FilterBuilder fields={fields} onChange={onChange} />);
    fireEvent.click(screen.getByText("filterBuilder.addFilter"));
    onChange.mockClear();
    const input = screen.getByPlaceholderText("filterBuilder.valuePlaceholder");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    const last = onChange.mock.calls[0]![0];
    expect(last.filters[0].value).toBe("abc");
  });

  it("removes a filter row on trash click", () => {
    const onChange = vi.fn();
    const { container } = render(
      <FilterBuilder fields={fields} onChange={onChange} />,
    );
    fireEvent.click(screen.getByText("filterBuilder.addFilter"));
    expect(container.querySelectorAll("input").length).toBeGreaterThanOrEqual(
      1,
    );
    // The remove button is an icon button — find by its svg.
    const removeBtn = container.querySelector(
      'button[class*="ghost"]',
    ) as HTMLButtonElement;
    expect(removeBtn).toBeTruthy();
    fireEvent.click(removeBtn);
    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls.at(-1)![0];
    expect(last.filters).toHaveLength(0);
  });

  it("renders default logic select (AND) without crashing", () => {
    const { container } = render(<FilterBuilder fields={fields} />);
    // SelectTrigger renders; assert the structure exists.
    expect(container.querySelector('[data-slot="select-trigger"]')).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/filter-builder");
    expect(mod.FilterBuilder).toBeDefined();
  });
});
