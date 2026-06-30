import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Transfer } from "@/components/business/transfer";
import type { TransferItem } from "@/components/business/transfer";

// Transfer uses useTranslation("transfer"); mock so it renders without a provider.
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

const data: TransferItem[] = [
  { key: "a", label: "A" },
  { key: "b", label: "B" },
  { key: "c", label: "C", disabled: true },
];

function getMoveToTarget(container: HTMLElement): HTMLButtonElement {
  return Array.from(container.querySelectorAll("button")).find(
    (b) => b.getAttribute("aria-label") === "transfer.moveToTarget",
  ) as HTMLButtonElement;
}

function getMoveToSource(container: HTMLElement): HTMLButtonElement {
  return Array.from(container.querySelectorAll("button")).find(
    (b) => b.getAttribute("aria-label") === "transfer.moveToSource",
  ) as HTMLButtonElement;
}

function getSelectAll(container: HTMLElement): HTMLButtonElement {
  return container.querySelector(
    'button[aria-label="transfer.selectAll"]',
  ) as HTMLButtonElement;
}

describe("Transfer", () => {
  it("exports Transfer", () => {
    expect(Transfer).toBeDefined();
  });

  it("renders source and target panels", () => {
    const { container } = render(
      <Transfer dataSource={[{ key: "a", label: "A" }, { key: "b", label: "B" }]} targetKeys={[]} />,
    );
    expect(container.querySelector('[data-slot="transfer"]')).not.toBeNull();
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });

  it("renders custom titles", () => {
    render(
      <Transfer
        dataSource={data}
        targetKeys={[]}
        titles={["左边", "右边"]}
      />,
    );
    expect(screen.getByText("左边")).toBeDefined();
    expect(screen.getByText("右边")).toBeDefined();
  });

  it("renders noData placeholder when source is empty", () => {
    render(
      <Transfer
        dataSource={[{ key: "a", label: "A" }]}
        targetKeys={["a"]}
      />,
    );
    // The "transfer.noData" appears for the empty source panel.
    const noDataEls = screen.getAllByText("transfer.noData");
    expect(noDataEls.length).toBeGreaterThan(0);
  });

  it("renders item description when provided", () => {
    render(
      <Transfer
        dataSource={[{ key: "a", label: "A", description: "desc-a" }]}
        targetKeys={[]}
      />,
    );
    expect(screen.getByText("desc-a")).toBeDefined();
  });

  it("uses custom render function for items", () => {
    render(
      <Transfer
        dataSource={[{ key: "a", label: "A" }]}
        targetKeys={[]}
        render={(item) => <span>{`rendered-${item.label}`}</span>}
      />,
    );
    expect(screen.getByText("rendered-A")).toBeDefined();
  });

  it("select-all toggles all source items at once", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Transfer
        dataSource={[{ key: "a", label: "A" }, { key: "b", label: "B" }]}
        targetKeys={[]}
        onChange={onChange}
      />,
    );
    const selectAllBtn = getSelectAll(container);
    fireEvent.click(selectAllBtn);
    const moveToTarget = getMoveToTarget(container);
    expect(moveToTarget.disabled).toBe(false);
    fireEvent.click(moveToTarget);
    expect(onChange).toHaveBeenCalledWith(["a", "b"]);
  });

  it("move-to-target button is disabled when nothing selected", () => {
    const { container } = render(
      <Transfer dataSource={data} targetKeys={[]} />,
    );
    expect(getMoveToTarget(container).disabled).toBe(true);
  });

  it("moves a single item via checkbox + move button", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Transfer
        dataSource={[{ key: "a", label: "A" }, { key: "b", label: "B" }]}
        targetKeys={[]}
        onChange={onChange}
      />,
    );
    // Click the checkbox for item A (first source-panel checkbox).
    const checkboxA = container.querySelector(
      '[data-slot="checkbox"]',
    ) as HTMLElement;
    expect(checkboxA).not.toBeNull();
    fireEvent.click(checkboxA);
    fireEvent.click(getMoveToTarget(container));
    expect(onChange).toHaveBeenCalledWith(["a"]);
  });

  it("moves an item from target back to source", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Transfer
        dataSource={[{ key: "a", label: "A" }]}
        targetKeys={["a"]}
        onChange={onChange}
      />,
    );
    // Target panel is the second panel; its checkbox is the last one.
    const checkboxes = container.querySelectorAll('[data-slot="checkbox"]');
    const checkboxTarget = checkboxes[checkboxes.length - 1] as HTMLElement;
    fireEvent.click(checkboxTarget);
    const moveToSource = getMoveToSource(container);
    expect(moveToSource.disabled).toBe(false);
    fireEvent.click(moveToSource);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("omits move-to-source button in oneWay mode", () => {
    const { container } = render(
      <Transfer dataSource={data} targetKeys={["a"]} oneWay />,
    );
    expect(getMoveToSource(container)).toBeUndefined();
  });

  it("disables move-to-target when disabled prop is set", () => {
    const { container } = render(
      <Transfer dataSource={data} targetKeys={[]} disabled />,
    );
    expect(getMoveToTarget(container).disabled).toBe(true);
  });

  it("filters source items via search input", () => {
    const { container } = render(
      <Transfer
        dataSource={[
          { key: "apple", label: "Apple" },
          { key: "banana", label: "Banana" },
        ]}
        targetKeys={[]}
      />,
    );
    const inputs = container.querySelectorAll("input");
    // First input is the source search box.
    fireEvent.change(inputs[0]!, { target: { value: "app" } });
    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.queryByText("Banana")).toBeNull();
  });

  it("hides search inputs when searchable is false", () => {
    render(
      <Transfer dataSource={data} targetKeys={[]} searchable={false} />,
    );
    // The search placeholder text should not be rendered.
    expect(screen.queryByPlaceholderText("transfer.search")).toBeNull();
  });

  it("uses custom filterOption", () => {
    render(
      <Transfer
        dataSource={[{ key: "a", label: "A" }]}
        targetKeys={[]}
        filterOption={() => false}
      />,
    );
    // Both source panel renders noData (target panel also empty).
    expect(screen.getAllByText("transfer.noData").length).toBeGreaterThan(0);
    expect(screen.queryByText("A")).toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/transfer");
    expect(mod.Transfer).toBeDefined();
  });
});
