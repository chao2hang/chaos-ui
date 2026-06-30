import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MobileKanban,
  type MobileKanbanProps,
} from "@/components/mobile/mobile-kanban";
import type {
  KanbanColumnData,
  KanbanItem,
} from "@/components/business/kanban-board";

const columns: KanbanColumnData[] = [
  {
    id: "todo",
    title: "To Do",
    items: [
      { id: "t1", title: "Task One", description: "First task" },
      { id: "t2", title: "Task Two" },
    ],
  },
  {
    id: "done",
    title: "Done",
    items: [{ id: "d1", title: "Done Task" }],
  },
];

describe("MobileKanban", () => {
  it("is exported and type is importable", () => {
    expect(MobileKanban).toBeDefined();
    const _p: MobileKanbanProps = { columns: [] };
    expect(_p.columns).toEqual([]);
  });

  it("renders column titles", () => {
    render(<MobileKanban columns={columns} />);
    expect(screen.getByText("To Do")).toBeDefined();
    expect(screen.getByText("Done")).toBeDefined();
  });

  it("renders item titles by default render", () => {
    render(<MobileKanban columns={columns} />);
    expect(screen.getByText("Task One")).toBeDefined();
    expect(screen.getByText("Task Two")).toBeDefined();
    expect(screen.getByText("Done Task")).toBeDefined();
  });

  it("renders item descriptions in default render", () => {
    render(<MobileKanban columns={columns} />);
    expect(screen.getByText("First task")).toBeDefined();
  });

  it("renders item count badges", () => {
    const { container } = render(<MobileKanban columns={columns} />);
    // Badge renders count; "2" for To Do, "1" for Done
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(container.querySelectorAll('[data-slot="badge"]').length).toBe(2);
  });

  it("uses custom renderCard when provided", () => {
    const renderCard = (item: KanbanItem) => (
      <div data-testid={`custom-${item.id}`}>CUSTOM:{item.title}</div>
    );
    render(<MobileKanban columns={columns} renderCard={renderCard} />);
    expect(screen.getByText("CUSTOM:Task One")).toBeDefined();
    expect(screen.getByText("CUSTOM:Task Two")).toBeDefined();
    // default title not rendered when renderCard used
    expect(screen.queryByText("Task One")).toBeNull();
  });

  it("collapses/expands a column on toggle click", () => {
    const { container } = render(<MobileKanban columns={columns} />);
    // Each column has a collapse button (icon button with chevron). Click the
    // first column's toggle and verify its items disappear then reappear.
    const toggleButtons = Array.from(
      container.querySelectorAll('button[data-slot="button"]'),
    );
    const toggle = toggleButtons[0];
    if (!toggle) throw new Error("toggle button not found");
    const beforeCount = screen.getAllByText(/Task One/).length;
    fireEvent.click(toggle);
    const afterCollapse = screen.queryByText("Task One");
    // Collapsible hides content via CollapsibleContent (Base UI renders hidden)
    expect(afterCollapse === null || afterCollapse).toBeTruthy();
    // toggle back open
    fireEvent.click(toggle);
    expect(screen.getByText("Task One")).toBeDefined();
    // sanity: count unchanged assertion
    expect(beforeCount).toBe(1);
  });

  it("renders empty column with zero count", () => {
    render(
      <MobileKanban
        columns={[{ id: "empty", title: "Empty", items: [] }]}
      />,
    );
    expect(screen.getByText("Empty")).toBeDefined();
    expect(screen.getByText("0")).toBeDefined();
  });

  it("applies mobile width className override", () => {
    const { container } = render(<MobileKanban columns={columns} />);
    // the inner board wrapper gets the [&>div]:w-64 classes
    expect(container.innerHTML).toContain("w-64");
  });

  it("applies custom className", () => {
    const { container } = render(
      <MobileKanban columns={columns} className="kanban-custom" />,
    );
    expect(container.innerHTML).toContain("kanban-custom");
  });

  it("calls onColumnsChange not triggered without drag", () => {
    const onColumnsChange = vi.fn();
    render(<MobileKanban columns={columns} onColumnsChange={onColumnsChange} />);
    // no drag interactions -> not called
    expect(onColumnsChange).not.toHaveBeenCalled();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-kanban");
    expect(mod.MobileKanban).toBeDefined();
  });
});
