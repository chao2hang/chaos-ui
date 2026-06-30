import { describe, it, expect, vi } from "vitest";
import { KanbanBoard } from "@/components/business/kanban-board";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("KanbanBoard", () => {
  it("module exports KanbanBoard", () => {
    expect(KanbanBoard).toBeDefined();
  });
});
