import { describe, it, expect } from "vitest";
import { KanbanColumn } from "./kanban-column";
import type { KanbanColumnProps } from "./kanban-column";

describe("kanban-column", () => {
  it("exports KanbanColumn", () => {
    expect(KanbanColumn).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: KanbanColumnProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
