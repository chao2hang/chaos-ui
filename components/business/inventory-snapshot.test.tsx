import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InventorySnapshot } from "./inventory-snapshot";
import type { InventorySnapshotProps } from "./inventory-snapshot";

describe("InventorySnapshot", () => {
  it("renders item names, status labels and summary counts", () => {
    render(
      <InventorySnapshot
        items={[
          { id: "s1", name: "原料A", qty: 120, status: "normal" },
          { id: "s2", name: "原料B", qty: 5, status: "low" },
          { id: "s3", name: "原料C", qty: 0, status: "out" },
        ]}
      />,
    );
    expect(screen.getByText("原料A")).toBeDefined();
    expect(screen.getByText("原料B")).toBeDefined();
    expect(screen.getByText("原料C")).toBeDefined();
    expect(screen.getByText("共 3 项")).toBeDefined();
    expect(screen.getByRole("region", { name: "库存快照" })).toBeDefined();
  });

  it("renders correct per-status counts in the summary cards", () => {
    const { container } = render(
      <InventorySnapshot
        items={[
          { id: "s1", name: "A", qty: 10, status: "normal" },
          { id: "s2", name: "B", qty: 10, status: "normal" },
          { id: "s3", name: "C", qty: 2, status: "low" },
          { id: "s4", name: "D", qty: 0, status: "out" },
        ]}
      />,
    );
    // The summary cards live in a 3-col grid; each card renders a header text + a font-semibold count.
    // Target the cards by their distinct bg-* class so item-row status labels don't collide.
    const normalCard = container.querySelector(".bg-emerald-50");
    const lowCard = container.querySelector(".bg-yellow-50");
    const outCard = container.querySelector(".bg-red-50");
    expect(normalCard?.querySelector(".font-semibold")?.textContent).toBe("2");
    expect(lowCard?.querySelector(".font-semibold")?.textContent).toBe("1");
    expect(outCard?.querySelector(".font-semibold")?.textContent).toBe("1");
  });

  it("shows dash for out-of-stock quantity", () => {
    render(
      <InventorySnapshot
        items={[{ id: "s3", name: "原料C", qty: 0, status: "out" }]}
      />,
    );
    expect(screen.getByText("-")).toBeDefined();
  });

  it("renders formatted quantity for normal and low items", () => {
    render(
      <InventorySnapshot
        items={[
          { id: "s1", name: "A", qty: 1200, status: "normal" },
          { id: "s2", name: "B", qty: 5, status: "low" },
        ]}
      />,
    );
    // zh-CN formatting of 1200 -> "1,200"
    expect(screen.getByText("1,200")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
  });

  it("shows empty state when no items", () => {
    render(<InventorySnapshot items={[]} />);
    expect(screen.getByText("暂无库存数据")).toBeDefined();
    expect(screen.getByText("共 0 项")).toBeDefined();
  });

  it("renders items inside a list", () => {
    render(
      <InventorySnapshot
        items={[{ id: "s1", name: "A", qty: 1, status: "normal" }]}
      />,
    );
    expect(screen.getByRole("list")).toBeDefined();
  });

  it("applies a custom className", () => {
    const { container } = render(
      <InventorySnapshot items={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: InventorySnapshotProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
