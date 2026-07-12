export type DemoRow = {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
  updatedAt: string;
};

export const INITIAL_DEMO_ROWS: DemoRow[] = [
  {
    id: "ord-1001",
    name: "华东渠道合同",
    status: "active",
    updatedAt: "2026-07-10",
  },
  {
    id: "ord-1002",
    name: "新品上架申请",
    status: "draft",
    updatedAt: "2026-07-11",
  },
  {
    id: "ord-1003",
    name: "年度审计归档",
    status: "archived",
    updatedAt: "2026-06-30",
  },
  {
    id: "ord-1004",
    name: "供应商准入",
    status: "active",
    updatedAt: "2026-07-08",
  },
];

export function filterDemoRows(
  rows: DemoRow[],
  query: { name?: string; status?: string },
): DemoRow[] {
  const name = query.name?.trim().toLowerCase() ?? "";
  const status = query.status?.trim() ?? "";
  return rows.filter((row) => {
    if (name && !row.name.toLowerCase().includes(name)) return false;
    if (status && row.status !== status) return false;
    return true;
  });
}

export function deleteDemoRow(rows: DemoRow[], id: string): DemoRow[] {
  return rows.filter((row) => row.id !== id);
}

export function addDemoRow(
  rows: DemoRow[],
  input: { name: string; status?: DemoRow["status"] },
): DemoRow[] {
  const row: DemoRow = {
    id: `ord-${Date.now()}`,
    name: input.name.trim() || "未命名",
    status: input.status ?? "active",
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  return [row, ...rows];
}
