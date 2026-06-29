import { describe, it, expect, vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("KanbanBoard", () => {
  it("module is importable with expected exports", async () => {
    const mod = await import("@/components/business/kanban-board");
    expect(mod.KanbanBoard).toBeDefined();
    expect(mod).toBeTruthy();
  });
});
