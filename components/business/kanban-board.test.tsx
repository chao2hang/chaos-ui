import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KanbanBoard } from "@/components/business/kanban-board";
import type { KanbanColumnData, KanbanItem } from "@/components/business/kanban-board";

// @dnd-kit drag interactions are not feasible in jsdom, so we test rendering,
// counts, collapse behavior, custom card rendering, and module import.

function makeColumns(): KanbanColumnData[] {
  return [
    {
      id: "todo",
      title: "To Do",
      items: [
        { id: "t1", title: "Task 1", description: "First task" },
        { id: "t2", title: "Task 2" },
      ],
    },
    {
      id: "done",
      title: "Done",
      items: [{ id: "d1", title: "Done 1" }],
    },
  ];
}

describe("KanbanBoard", () => {
  it("renders all column titles and item counts", () => {
    render(<KanbanBoard columns={makeColumns()} />);
    expect(screen.getByText("To Do")).toBeDefined();
    expect(screen.getByText("Done")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined(); // todo count
    expect(screen.getByText("1")).toBeDefined(); // done count
  });

  it("renders default card title and description", () => {
    render(<KanbanBoard columns={makeColumns()} />);
    expect(screen.getByText("Task 1")).toBeDefined();
    expect(screen.getByText("First task")).toBeDefined();
    expect(screen.getByText("Task 2")).toBeDefined();
  });

  it("renders an empty column without crashing", () => {
    render(
      <KanbanBoard
        columns={[{ id: "empty", title: "Empty", items: [] }]}
      />,
    );
    expect(screen.getByText("Empty")).toBeDefined();
    expect(screen.getByText("0")).toBeDefined();
  });

  it("collapses and expands a column via the chevron toggle", () => {
    render(<KanbanBoard columns={makeColumns()} />);
    // Card visible initially
    expect(screen.getByText("Task 1")).toBeDefined();
    // Toggle is the icon button next to the To Do count. Find the button
    // whose only child is the chevron svg (no text).
    const todoHeader = screen.getByText("To Do").closest("div");
    const toggle = todoHeader?.parentElement?.querySelector("button") as HTMLButtonElement;
    expect(toggle).toBeTruthy();
    fireEvent.click(toggle);
    // Collapsed -> Collapsible content hidden, card title gone from view
    expect(screen.queryByText("Task 1")).toBeNull();
    // Expand again
    fireEvent.click(toggle);
    expect(screen.getByText("Task 1")).toBeDefined();
  });

  it("uses custom renderCard when provided", () => {
    render(
      <KanbanBoard
        columns={makeColumns()}
        renderCard={(item) => <div key={item.id}>CUSTOM:{item.title}</div>}
      />,
    );
    expect(screen.getByText("CUSTOM:Task 1")).toBeDefined();
    // default title not rendered as plain text node anymore
    expect(screen.queryByText("Task 1")).toBeNull();
  });

  it("calls onColumnsChange is wired (module-level export check)", () => {
    const onColumnsChange = vi.fn();
    render(
      <KanbanBoard
        columns={makeColumns()}
        onColumnsChange={onColumnsChange}
      />,
    );
    // No drag interaction; just ensure callback accepted and not called on render
    expect(onColumnsChange).not.toHaveBeenCalled();
  });

  it("renders a custom className on the board container", () => {
    const { container } = render(
      <KanbanBoard columns={makeColumns()} className="my-board" />,
    );
    const board = container.querySelector(".my-board");
    expect(board).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/kanban-board");
    expect(mod.KanbanBoard).toBeDefined();
  });

  it("exports types", () => {
    const _c: KanbanColumnData | undefined = undefined;
    const _i: KanbanItem | undefined = undefined;
    expect(_c).toBeUndefined();
    expect(_i).toBeUndefined();
  });
});
