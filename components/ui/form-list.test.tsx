import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormList } from "./form-list";
import type { FormListItem, FormListProps } from "./form-list";

interface Item extends FormListItem {
  label: string;
}

describe("FormList", () => {
  it("exports FormList", () => {
    expect(FormList).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: FormListItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormListProps<FormListItem> | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders existing items via renderItem", () => {
    render(
      <FormList<Item>
        defaultValue={[{ id: "1", label: "Alpha" }]}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(screen.getByText("Alpha")).toBeDefined();
  });

  it("renders the Add button with default text", () => {
    render(
      <FormList<Item>
        defaultValue={[]}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(screen.getByText("Add Item")).toBeDefined();
  });

  it("renders the Add button with custom text and variant", () => {
    render(
      <FormList<Item>
        defaultValue={[]}
        addButtonText="Add row"
        addButtonVariant="default"
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(screen.getByText("Add row")).toBeDefined();
  });

  it("adds a new item using onAdd when Add is clicked", () => {
    const onChange = vi.fn();
    const onAdd = vi.fn(() => ({ id: "new", label: "New" }));
    render(
      <FormList<Item>
        defaultValue={[]}
        onAdd={onAdd}
        onChange={onChange}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    fireEvent.click(screen.getByText("Add Item"));
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(screen.getByText("New")).toBeDefined();
    expect(onChange).toHaveBeenCalledWith([{ id: "new", label: "New" }]);
  });

  it("generates an item with id when onAdd is omitted", () => {
    const onChange = vi.fn();
    render(
      <FormList<Item>
        defaultValue={[]}
        onChange={onChange}
        renderItem={(item) => <span>{item.id}</span>}
      />,
    );
    fireEvent.click(screen.getByText("Add Item"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const added = onChange.mock.calls[0]![0];
    expect(added[0]!.id).toMatch(/^item-/);
  });

  it("removes an item when the remove button is clicked", () => {
    const onChange = vi.fn();
    const onRemove = vi.fn();
    render(
      <FormList<Item>
        defaultValue={[
          { id: "1", label: "Alpha" },
          { id: "2", label: "Beta" },
        ]}
        onChange={onChange}
        onRemove={onRemove}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    const removeBtns = screen.getAllByRole("button", { name: /remove item/i });
    fireEvent.click(removeBtns[0]!);
    expect(onRemove).toHaveBeenCalledWith(0);
    expect(onChange).toHaveBeenCalledWith([{ id: "2", label: "Beta" }]);
    expect(screen.queryByText("Alpha")).toBeNull();
    expect(screen.getByText("Beta")).toBeDefined();
  });

  it("respects maxItems by hiding Add once reached", () => {
    render(
      <FormList<Item>
        defaultValue={[{ id: "1", label: "Alpha" }]}
        maxItems={1}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(screen.queryByText("Add Item")).toBeNull();
  });

  it("respects maxItems by not adding beyond the limit via onAdd", () => {
    const onAdd = vi.fn(() => ({ id: "new", label: "New" }));
    render(
      <FormList<Item>
        defaultValue={[{ id: "1", label: "Alpha" }]}
        maxItems={2}
        onAdd={onAdd}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    fireEvent.click(screen.getByText("Add Item"));
    expect(onAdd).toHaveBeenCalledTimes(1);
    // Now at max — Add button should be gone.
    expect(screen.queryByText("Add Item")).toBeNull();
  });

  it("respects minItems by disabling removal", () => {
    render(
      <FormList<Item>
        defaultValue={[{ id: "1", label: "Alpha" }]}
        minItems={1}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /remove item/i }),
    ).toBeNull();
  });

  it("hides Add and remove buttons when disabled", () => {
    render(
      <FormList<Item>
        defaultValue={[{ id: "1", label: "Alpha" }]}
        disabled
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(screen.queryByText("Add Item")).toBeNull();
    expect(
      screen.queryByRole("button", { name: /remove item/i }),
    ).toBeNull();
  });

  it("renders a drag handle when sortable and not disabled", () => {
    render(
      <FormList<Item>
        defaultValue={[{ id: "1", label: "Alpha" }]}
        sortable
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(
      screen.getByRole("button", { name: /drag to reorder/i }),
    ).toBeDefined();
  });

  it("does not render a drag handle when disabled even if sortable", () => {
    render(
      <FormList<Item>
        defaultValue={[{ id: "1", label: "Alpha" }]}
        sortable
        disabled
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /drag to reorder/i }),
    ).toBeNull();
  });

  it("uses controlled value when provided", () => {
    render(
      <FormList<Item>
        value={[{ id: "9", label: "Controlled" }]}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    expect(screen.getByText("Controlled")).toBeDefined();
  });

  it("merges a custom className", () => {
    const { container } = render(
      <FormList<Item>
        className="my-list"
        defaultValue={[]}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    const root = container.querySelector(
      '[data-slot="form-list"]',
    ) as HTMLElement;
    expect(root.className).toContain("my-list");
  });

  it("module is importable", async () => {
    const mod = await import("./form-list");
    expect(mod.FormList).toBeDefined();
  });
});
