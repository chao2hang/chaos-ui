import { describe, it, expect, vi } from "vitest";
import type { Column } from "@/components/business/data-table";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("DataTable", () => {
  it("module is importable with expected exports", async () => {
    const mod = await import("@/components/business/data-table");
    expect(mod.DataTable).toBeDefined();
  });

  it("Column type accepts key/title/sortable", () => {
    const col: Column<Record<string, unknown>> = { key: "name", title: "Name", sortable: true };
    expect(col.key).toBe("name");
    expect(col.sortable).toBe(true);
  });
});
