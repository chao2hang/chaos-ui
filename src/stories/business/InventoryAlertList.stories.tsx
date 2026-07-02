import type { Meta, StoryObj } from "@storybook/react";
import { InventoryAlertList } from "@/components/business/inventory-alert-list";
import type { InventoryAlertItem } from "@/components/business/inventory-alert-list";

const meta = {
  title: "Business/InventoryAlertList",
  component: InventoryAlertList,
  tags: ["autodocs"],
} satisfies Meta<typeof InventoryAlertList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: InventoryAlertItem[] = [
  { id: "1", name: "Steel Sheet A", code: "SS-A-001", currentQty: 10, safetyStock: 50, unit: "pcs", severity: "critical", message: "Below safety stock", trend: [80, 60, 45, 30, 20, 15, 10], warehouse: "WH-01", recentTransactions: [{ date: "2024-03-10", type: "out", quantity: 20, reference: "PO-1001" }, { date: "2024-03-09", type: "in", quantity: 50, reference: "GRN-500" }] },
  { id: "2", name: "Bolt M8x30", code: "BL-M8-030", currentQty: 200, safetyStock: 500, unit: "pcs", severity: "warning", trend: [600, 550, 480, 400, 320, 260, 200], warehouse: "WH-01" },
  { id: "3", name: "Lubricant Oil", code: "LB-OIL-5L", currentQty: 800, safetyStock: 100, maxStock: 500, unit: "L", severity: "info", trend: [100, 200, 400, 500, 600, 700, 800], warehouse: "WH-02" },
  { id: "4", name: "Copper Wire", code: "CW-2MM", currentQty: 150, safetyStock: 100, unit: "m", severity: "normal", trend: [120, 130, 140, 135, 145, 148, 150], warehouse: "WH-01" },
  { id: "5", name: "Aluminum Rod", code: "AR-10MM", currentQty: 5, safetyStock: 30, unit: "pcs", severity: "critical", trend: [40, 35, 28, 20, 15, 8, 5], warehouse: "WH-03" },
  { id: "6", name: "Rubber Gasket", code: "RG-25MM", currentQty: 350, safetyStock: 500, unit: "pcs", severity: "warning", trend: [500, 480, 460, 420, 400, 380, 350], warehouse: "WH-02" },
  { id: "7", name: "Stainless Plate", code: "SP-304", currentQty: 45, safetyStock: 20, unit: "pcs", severity: "normal", trend: [30, 35, 38, 40, 42, 44, 45], warehouse: "WH-01" },
  { id: "8", name: "Nylon Bush", code: "NB-15MM", currentQty: 120, safetyStock: 200, unit: "pcs", severity: "warning", trend: [250, 230, 200, 180, 160, 140, 120], warehouse: "WH-03" },
  { id: "9", name: "Epoxy Resin", code: "ER-5KG", currentQty: 60, safetyStock: 20, unit: "kg", severity: "info", trend: [30, 35, 40, 45, 50, 55, 60], warehouse: "WH-02" },
  { id: "10", name: "Carbon Brush", code: "CB-Motor", currentQty: 8, safetyStock: 25, unit: "pcs", severity: "critical", trend: [30, 25, 22, 18, 14, 10, 8], warehouse: "WH-01" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const ShowTrend: Story = {
  args: {
    items: sampleItems,
    showTrend: true,
  },
};

export const ShowTransactions: Story = {
  args: {
    items: sampleItems,
    showTransactions: true,
    showTrend: true,
  },
};

export const CriticalOnly: Story = {
  args: {
    items: sampleItems,
    activeTab: "critical",
    showTrend: true,
  },
};

export const DarkMode: Story = {
  args: {
    items: sampleItems,
    showTrend: true,
  },
  parameters: {
    backgrounds: { default: "dark" },
    theme: "dark",
  },
};
