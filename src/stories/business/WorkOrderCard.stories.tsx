import type { Meta, StoryObj } from "@storybook/react";
import { WorkOrderCard } from "@/components/business/work-order-card";
import type { WorkOrderOperation } from "@/components/business/work-order-card";

const meta = {
  title: "Business/WorkOrderCard",
  component: WorkOrderCard,
  tags: ["autodocs"],
} satisfies Meta<typeof WorkOrderCard>;
export default meta;
type Story = StoryObj<typeof meta>;

const operations: WorkOrderOperation[] = [
  { id: "op1", seq: 10, name: "Material Preparation", workCenter: "WC-01", plannedQty: 500, completedQty: 500, operator: "Alice Wang", setupTime: 30, runTimePerUnit: 2, status: "done" },
  { id: "op2", seq: 20, name: "CNC Machining", workCenter: "CNC-03", plannedQty: 500, completedQty: 320, operator: "Bob Li", setupTime: 45, runTimePerUnit: 5, status: "running" },
  { id: "op3", seq: 30, name: "Surface Treatment", workCenter: "ST-01", plannedQty: 500, completedQty: 0, status: "pending" },
  { id: "op4", seq: 40, name: "Assembly", workCenter: "ASM-02", plannedQty: 500, completedQty: 0, status: "pending" },
  { id: "op5", seq: 50, name: "Quality Inspection", workCenter: "QC-01", plannedQty: 500, completedQty: 0, status: "pending" },
];

export const InProgress: Story = {
  args: {
    orderNo: "WO-2026-0789",
    product: "Industrial Valve DN50",
    productCode: "IV-DN50-V3",
    status: "in_progress",
    priority: "high",
    plannedStart: "2026-06-25",
    plannedEnd: "2026-07-10",
    plannedQty: 500,
    completedQty: 320,
    unit: "pcs",
    workCenter: "CNC-03",
    supervisor: "Carol Zhang",
    operations,
  },
};

export const Planned: Story = {
  args: {
    orderNo: "WO-2026-0790",
    product: "Heat Exchanger Unit",
    productCode: "HE-200",
    status: "planned",
    priority: "medium",
    plannedStart: "2026-07-15",
    plannedEnd: "2026-07-30",
    plannedQty: 50,
    completedQty: 0,
    unit: "set",
    workCenter: "ASM-01",
    supervisor: "Dave Chen",
    operations: operations.map((o) => ({ ...o, completedQty: 0, status: "pending" as const })),
  },
};

export const Completed: Story = {
  args: {
    orderNo: "WO-2026-0700",
    product: "Pressure Gauge PG-100",
    productCode: "PG-100",
    status: "completed",
    priority: "low",
    plannedStart: "2026-06-01",
    plannedEnd: "2026-06-15",
    plannedQty: 200,
    completedQty: 200,
    unit: "pcs",
    supervisor: "Eve Liu",
    operations: operations.map((o) => ({ ...o, completedQty: o.plannedQty, status: "done" as const })),
  },
};

export const Overdue: Story = {
  args: {
    orderNo: "WO-2026-0650",
    product: "Custom Flange Assembly",
    productCode: "CF-300",
    status: "on_hold",
    priority: "urgent",
    plannedStart: "2025-05-20",
    plannedEnd: "2025-06-10",
    plannedQty: 100,
    completedQty: 45,
    unit: "pcs",
    supervisor: "Frank Wu",
    operations: [
      { ...operations[0]!, completedQty: 100, status: "done" as const } as any,
      { ...operations[1]!, completedQty: 45, status: "running" as const } as any,
      { ...operations[2]!, completedQty: 0, status: "pending" as const } as any,
    ],
  },
};

export const NoOperations: Story = {
  args: {
    orderNo: "WO-2026-0800",
    product: "Simple Component",
    status: "released",
    priority: "low",
    plannedStart: "2026-07-05",
    plannedEnd: "2026-07-08",
    plannedQty: 1000,
    completedQty: 0,
  },
};
