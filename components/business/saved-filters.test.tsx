import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SavedFilters } from "./saved-filters";
import type { SavedFilter } from "./saved-filters";

// SavedFilters uses useTranslation("data"); mock so it renders without a provider.
vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

const filters: SavedFilter[] = [
  { id: "f1", name: "Active Orders", filters: {} },
  { id: "f2", name: "Pending Approvals", filters: {}, isPinned: true },
  { id: "f3", name: "Archived", filters: {} },
];

describe("SavedFilters", () => {
  it("exports SavedFilters", () => {
    expect(SavedFilters).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SavedFilter | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders the trigger button with the default label", () => {
    render(<SavedFilters filters={[]} />);
    // default label resolves to the i18n key (since "已保存的筛选" === default)
    expect(screen.getByText("savedFilters.label")).toBeDefined();
  });

  it("renders a custom label", () => {
    render(<SavedFilters filters={[]} label="My Filters" />);
    expect(screen.getByText("My Filters")).toBeDefined();
  });

  it("opens the dropdown and lists saved filters on click", () => {
    render(<SavedFilters filters={filters} />);
    fireEvent.click(screen.getByText("savedFilters.label"));
    expect(screen.getByText("Active Orders")).toBeDefined();
    expect(screen.getByText("Pending Approvals")).toBeDefined();
    expect(screen.getByText("Archived")).toBeDefined();
  });

  it("shows the empty hint when there are no filters", () => {
    render(<SavedFilters filters={[]} />);
    fireEvent.click(screen.getByText("savedFilters.label"));
    expect(screen.getByText("savedFilters.empty")).toBeDefined();
  });

  it("marks the active filter with an apply badge", () => {
    render(<SavedFilters filters={filters} activeId="f2" />);
    fireEvent.click(screen.getByText("savedFilters.label"));
    // the "savedFilters.apply" badge is rendered next to the active filter
    expect(screen.getByText("savedFilters.apply")).toBeDefined();
  });

  it("does not render the apply badge when no activeId matches", () => {
    render(<SavedFilters filters={filters} activeId="nope" />);
    fireEvent.click(screen.getByText("savedFilters.label"));
    expect(screen.queryByText("savedFilters.apply")).toBeNull();
  });

  it("calls onApply with the filter id when a filter item is clicked", () => {
    const onApply = vi.fn();
    render(<SavedFilters filters={filters} onApply={onApply} />);
    fireEvent.click(screen.getByText("savedFilters.label"));
    fireEvent.click(screen.getByText("Active Orders"));
    expect(onApply).toHaveBeenCalledWith("f1");
  });

  it("renders the save-current button only when onSave is provided", () => {
    const { rerender } = render(<SavedFilters filters={[]} />);
    expect(screen.queryByText("savedFilters.saveCurrent")).toBeNull();
    rerender(<SavedFilters filters={[]} onSave={vi.fn()} />);
    expect(screen.getByText("savedFilters.saveCurrent")).toBeDefined();
  });

  it("opens the save form and saves a new filter with the entered name", async () => {
    const onSave = vi.fn();
    render(<SavedFilters filters={[]} onSave={onSave} />);
    fireEvent.click(screen.getByText("savedFilters.saveCurrent"));
    const input = screen.getByPlaceholderText("savedFilters.namePlaceholder");
    fireEvent.change(input, { target: { value: "My new filter" } });
    fireEvent.click(screen.getByText("savedFilters.save"));
    expect(onSave).toHaveBeenCalledWith("My new filter");
  });

  it("does not call onSave when the name is empty", () => {
    const onSave = vi.fn();
    render(<SavedFilters filters={[]} onSave={onSave} />);
    fireEvent.click(screen.getByText("savedFilters.saveCurrent"));
    // save button is disabled when name is blank
    const saveBtn = screen.getByText("savedFilters.save").closest("button")!;
    expect(saveBtn.hasAttribute("disabled")).toBe(true);
    fireEvent.click(saveBtn);
    expect(onSave).not.toHaveBeenCalled();
  });

  it("submits the save form on Enter key", () => {
    const onSave = vi.fn();
    render(<SavedFilters filters={[]} onSave={onSave} />);
    fireEvent.click(screen.getByText("savedFilters.saveCurrent"));
    const input = screen.getByPlaceholderText("savedFilters.namePlaceholder");
    fireEvent.change(input, { target: { value: "Quick Save" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSave).toHaveBeenCalledWith("Quick Save");
  });

  it("trims whitespace from the saved name", () => {
    const onSave = vi.fn();
    render(<SavedFilters filters={[]} onSave={onSave} />);
    fireEvent.click(screen.getByText("savedFilters.saveCurrent"));
    const input = screen.getByPlaceholderText("savedFilters.namePlaceholder");
    fireEvent.change(input, { target: { value: "  spaced  " } });
    fireEvent.click(screen.getByText("savedFilters.save"));
    expect(onSave).toHaveBeenCalledWith("spaced");
  });

  it("renders pin and delete buttons per filter when handlers provided", () => {
    render(
      <SavedFilters filters={filters} onPin={vi.fn()} onDelete={vi.fn()} />,
    );
    fireEvent.click(screen.getByText("savedFilters.label"));
    expect(screen.getAllByLabelText("savedFilters.pin").length).toBe(3);
    expect(screen.getAllByLabelText("savedFilters.delete").length).toBe(3);
  });

  it("calls onPin with the filter id when the pin button is clicked", () => {
    const onPin = vi.fn();
    const onApply = vi.fn(); // ensure clicking pin does not also apply
    render(<SavedFilters filters={filters} onPin={onPin} onApply={onApply} />);
    fireEvent.click(screen.getByText("savedFilters.label"));
    const pinButtons = screen.getAllByLabelText("savedFilters.pin");
    fireEvent.click(pinButtons[1]!); // f2
    expect(onPin).toHaveBeenCalledWith("f2");
    // stopPropagation prevents the parent item's onApply
    expect(onApply).not.toHaveBeenCalled();
  });

  it("calls onDelete with the filter id when the delete button is clicked", () => {
    const onDelete = vi.fn();
    const onApply = vi.fn();
    render(
      <SavedFilters filters={filters} onDelete={onDelete} onApply={onApply} />,
    );
    fireEvent.click(screen.getByText("savedFilters.label"));
    const deleteButtons = screen.getAllByLabelText("savedFilters.delete");
    fireEvent.click(deleteButtons[0]!); // f1
    expect(onDelete).toHaveBeenCalledWith("f1");
    expect(onApply).not.toHaveBeenCalled();
  });

  it("omits pin/delete buttons when their handlers are not provided", () => {
    render(<SavedFilters filters={filters} />);
    fireEvent.click(screen.getByText("savedFilters.label"));
    expect(screen.queryByLabelText("savedFilters.pin")).toBeNull();
    expect(screen.queryByLabelText("savedFilters.delete")).toBeNull();
  });

  it("applies custom className to the root", () => {
    const { container } = render(
      <SavedFilters filters={[]} className="my-filters" />,
    );
    const root = container.querySelector('[data-slot="saved-filters"]');
    expect(root?.className).toContain("my-filters");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/saved-filters");
    expect(mod.SavedFilters).toBeDefined();
  });

  // Keep waitFor referenced for future async dropdown interactions.
  void waitFor;
});
