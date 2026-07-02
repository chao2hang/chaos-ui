import type { Meta, StoryObj } from "@storybook/react";
import { ArApAgingTable } from "@/components/business/ar-ap-aging-table";
import type { AgingEntry } from "@/components/business/ar-ap-aging-table";

const meta = {
  title: "Business/ArApAgingTable",
  component: ArApAgingTable,
  tags: ["autodocs"],
} satisfies Meta<typeof ArApAgingTable>;
export default meta;
type Story = StoryObj<typeof meta>;

const arEntries: AgingEntry[] = [
  { id: "1", partyName: "Acme Corp", docNo: "INV-2026-001", docDate: "2026-06-15", dueDate: "2026-06-25", amount: 128000 },
  { id: "2", partyName: "Globex Inc", docNo: "INV-2026-002", docDate: "2026-05-10", dueDate: "2026-05-20", amount: 56000 },
  { id: "3", partyName: "Initech LLC", docNo: "INV-2026-003", docDate: "2026-03-01", dueDate: "2026-03-11", amount: 234500 },
  { id: "4", partyName: "Umbrella Co", docNo: "INV-2026-004", docDate: "2026-06-28", dueDate: "2026-07-08", amount: 89000 },
  { id: "5", partyName: "Stark Industries", docNo: "INV-2026-005", docDate: "2026-06-01", dueDate: "2026-06-11", amount: 67000 },
  { id: "6", partyName: "Wayne Enterprises", docNo: "INV-2026-006", docDate: "2026-04-15", dueDate: "2026-04-25", amount: 178000 },
];

const apEntries: AgingEntry[] = [
  { id: "1", partyName: "Supplier Alpha", docNo: "BILL-001", docDate: "2026-06-20", dueDate: "2026-06-30", amount: 45000 },
  { id: "2", partyName: "Supplier Beta", docNo: "BILL-002", docDate: "2026-05-05", dueDate: "2026-05-15", amount: 120000 },
  { id: "3", partyName: "Supplier Gamma", docNo: "BILL-003", docDate: "2026-02-10", dueDate: "2026-02-20", amount: 89000 },
];

export const Default: Story = {
  args: {
    entries: arEntries,
    asOfDate: "2026-07-01",
    type: "ar",
    currencySymbol: "¥",
  },
};

export const Payable: Story = {
  args: {
    entries: apEntries,
    asOfDate: "2026-07-01",
    type: "ap",
    currencySymbol: "¥",
  },
};

export const Usd: Story = {
  args: {
    entries: arEntries,
    asOfDate: "2026-07-01",
    type: "ar",
    currencySymbol: "$",
  },
};

export const Empty: Story = {
  args: {
    entries: [],
    asOfDate: "2026-07-01",
    type: "ar",
  },
};
