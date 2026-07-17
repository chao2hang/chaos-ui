import type { Meta, StoryObj } from "@storybook/react";
import {
  ReportTable,
  type ReportColumn,
  type ReportLoadResult,
} from "@/components/business/report-table";

interface OrderRow extends Record<string, unknown> {
  id: string;
  orderNo: string;
  customer: string;
  amount: number;
  status: string;
  createdAt: string;
}

const meta: Meta<typeof ReportTable> = {
  title: "Business/ReportTable",
  component: ReportTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "报表型服务端列表（对齐 Ecology WeaTable）：JSON 列元数据 + loadData 分页 + summary 合计行。复用 ProTable。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReportTable>;

const columns: ReportColumn<OrderRow>[] = [
  { key: "orderNo", title: "订单号", width: 140 },
  { key: "customer", title: "客户" },
  {
    key: "amount",
    title: "金额",
    width: 120,
    render: "money",
    align: "right",
    sortable: true,
  },
  {
    key: "status",
    title: "状态",
    width: 100,
    render: "badge",
    enumMap: {
      approved: { label: "已批准" },
      pending: { label: "待处理", color: "destructive" },
      rejected: { label: "已拒绝", color: "destructive" },
    },
  },
  { key: "createdAt", title: "创建时间", width: 160, render: "datetime" },
];

const mockRows: OrderRow[] = Array.from({ length: 25 }, (_, i) => ({
  id: `row-${i + 1}`,
  orderNo: `ORD-${String(i + 1).padStart(4, "0")}`,
  customer: `客户 ${String.fromCharCode(65 + (i % 26))}`,
  amount: Math.round(Math.random() * 10000 * 100) / 100,
  status: ["approved", "pending", "rejected"][i % 3] as string,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

const loadData = async (params: {
  page: number;
  pageSize: number;
}): Promise<ReportLoadResult<OrderRow>> => {
  await new Promise((r) => setTimeout(r, 300));
  const start = (params.page - 1) * params.pageSize;
  const rows = mockRows.slice(start, start + params.pageSize);
  return {
    rows,
    total: mockRows.length,
    summary: { amount: mockRows.reduce((s, r) => s + r.amount, 0) },
  };
};

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <ReportTable
        columns={columns}
        loadData={loadData}
        rowKey="id"
        pageSize={10}
      />
    </div>
  ),
};

export const WithSummary: Story = {
  render: () => (
    <ReportTable
      columns={columns}
      loadData={loadData}
      rowKey="id"
      pageSize={5}
    />
  ),
};

export const WithLinkColumn: Story = {
  render: () => {
    const linkColumns: ReportColumn<OrderRow>[] = [
      {
        key: "orderNo",
        title: "订单号",
        render: "link",
        href: (row) => `/order/${row.id}`,
        width: 140,
      },
      { key: "customer", title: "客户" },
      { key: "amount", title: "金额", render: "money", align: "right" },
    ];
    return (
      <ReportTable
        columns={linkColumns}
        loadData={loadData}
        rowKey="id"
        pageSize={5}
      />
    );
  },
};
