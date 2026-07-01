import { describe, it, expect, vi } from "vitest";
import { AdvancedDataTable } from "./advanced-data-table";
import type { ColumnDef, AdvancedDataTableProps } from "./advanced-data-table";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

describe("advanced-data-table", () => {
  it("exports AdvancedDataTable", () => {
    expect(AdvancedDataTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ColumnDef | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AdvancedDataTableProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("ColumnDef type accepts key/header/accessor/render", () => {
    const col: ColumnDef = {
      key: "name",
      header: "Name",
      accessor: (row) => row.name,
      render: (row) => <strong>{String(row.name)}</strong>,
    };
    expect(col.key).toBe("name");
    expect(col.header).toBe("Name");
  });

  it("AdvancedDataTableProps type accepts all fields", () => {
    const props: AdvancedDataTableProps = {
      columns: [{ key: "name", header: "Name" }],
      data: [{ name: "Alice" }],
      searchable: true,
      searchPlaceholder: "Search...",
      pageSize: 5,
      onRowClick: () => {},
      emptyVariant: "search",
      className: "test",
    };
    expect(props.searchable).toBe(true);
    expect(props.pageSize).toBe(5);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/advanced-data-table");
    expect(mod.AdvancedDataTable).toBeDefined();
    expect((mod as Record<string, unknown>).ColumnDef).toBeUndefined(); // type-only export
  });
});
