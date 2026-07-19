export type DemoStatus =
  "active" | "draft" | "archived" | "pending" | "confirmed" | "closed";

export type DemoRow = {
  id: string;
  /** Compatibility field used by the original template helpers. */
  name: string;
  status: DemoStatus;
  updatedAt: string;
  period: string;
  distributorId: string;
  distributor: string;
  orderAmount: number;
  deduction: number;
  netAmount: number;
  signedAt?: string;
};

export const INITIAL_DEMO_ROWS: DemoRow[] = [
  {
    id: "rec-202607-013-01",
    name: "华东一部经销商",
    status: "pending",
    updatedAt: "2026-07-18",
    period: "2026-07",
    distributorId: "13",
    distributor: "华东一部经销商",
    orderAmount: 12500,
    deduction: 1200,
    netAmount: 11300,
  },
  {
    id: "rec-202607-013-02",
    name: "渝北区域经销商",
    status: "confirmed",
    updatedAt: "2026-07-18",
    period: "2026-07",
    distributorId: "13",
    distributor: "渝北区域经销商",
    orderAmount: 18600,
    deduction: 800,
    netAmount: 17800,
    signedAt: "2026-07-18",
  },
  {
    id: "rec-202607-009-01",
    name: "西南商超渠道",
    status: "pending",
    updatedAt: "2026-07-17",
    period: "2026-07",
    distributorId: "9",
    distributor: "西南商超渠道",
    orderAmount: 9800,
    deduction: 300,
    netAmount: 9500,
  },
  {
    id: "rec-202607-009-02",
    name: "成都核心经销商",
    status: "closed",
    updatedAt: "2026-07-16",
    period: "2026-07",
    distributorId: "9",
    distributor: "成都核心经销商",
    orderAmount: 22600,
    deduction: 2400,
    netAmount: 20200,
  },
  {
    id: "rec-202607-005-01",
    name: "川南餐饮渠道",
    status: "pending",
    updatedAt: "2026-07-16",
    period: "2026-07",
    distributorId: "5",
    distributor: "川南餐饮渠道",
    orderAmount: 7200,
    deduction: 200,
    netAmount: 7000,
  },
  {
    id: "rec-202607-005-02",
    name: "重庆主城经销商",
    status: "confirmed",
    updatedAt: "2026-07-15",
    period: "2026-07",
    distributorId: "5",
    distributor: "重庆主城经销商",
    orderAmount: 15400,
    deduction: 1400,
    netAmount: 14000,
    signedAt: "2026-07-15",
  },
  {
    id: "rec-202607-001-01",
    name: "黔北流通渠道",
    status: "closed",
    updatedAt: "2026-07-14",
    period: "2026-07",
    distributorId: "1",
    distributor: "黔北流通渠道",
    orderAmount: 11300,
    deduction: 1300,
    netAmount: 10000,
  },
  {
    id: "rec-202606-021-01",
    name: "华东重点经销商",
    status: "confirmed",
    updatedAt: "2026-07-02",
    period: "2026-06",
    distributorId: "21",
    distributor: "华东重点经销商",
    orderAmount: 26800,
    deduction: 1800,
    netAmount: 25000,
    signedAt: "2026-07-02",
  },
  {
    id: "rec-202606-018-01",
    name: "云贵区域经销商",
    status: "closed",
    updatedAt: "2026-07-01",
    period: "2026-06",
    distributorId: "18",
    distributor: "云贵区域经销商",
    orderAmount: 13400,
    deduction: 400,
    netAmount: 13000,
  },
  {
    id: "rec-202606-008-01",
    name: "西北省区经销商",
    status: "confirmed",
    updatedAt: "2026-06-30",
    period: "2026-06",
    distributorId: "8",
    distributor: "西北省区经销商",
    orderAmount: 20500,
    deduction: 1500,
    netAmount: 19000,
    signedAt: "2026-06-30",
  },
];

export function filterDemoRows(
  rows: DemoRow[],
  query: {
    name?: string;
    status?: string;
    period?: string;
    distributor?: string;
  },
): DemoRow[] {
  const name = query.name?.trim().toLowerCase() ?? "";
  const status = query.status?.trim() ?? "";
  const period = query.period?.trim() ?? "";
  const distributor = query.distributor?.trim().toLowerCase() ?? "";

  return rows.filter((row) => {
    if (name && !row.name.toLowerCase().includes(name)) return false;
    if (status && row.status !== status) return false;
    if (period && row.period !== period) return false;
    if (
      distributor &&
      !`${row.distributorId} ${row.distributor}`
        .toLowerCase()
        .includes(distributor)
    ) {
      return false;
    }
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
  const name = input.name.trim() || "未命名";
  const row: DemoRow = {
    id: `ord-${Date.now()}`,
    name,
    status: input.status ?? "active",
    updatedAt: new Date().toISOString().slice(0, 10),
    period: "2026-07",
    distributorId: "NEW",
    distributor: name,
    orderAmount: 0,
    deduction: 0,
    netAmount: 0,
  };
  return [row, ...rows];
}

export function confirmDemoRow(
  rows: DemoRow[],
  id: string,
  signedAt = new Date().toISOString().slice(0, 10),
): DemoRow[] {
  return rows.map((row) =>
    row.id === id
      ? { ...row, status: "confirmed", signedAt, updatedAt: signedAt }
      : row,
  );
}

const CNY_FORMATTER = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(value: number): string {
  return CNY_FORMATTER.format(value);
}
