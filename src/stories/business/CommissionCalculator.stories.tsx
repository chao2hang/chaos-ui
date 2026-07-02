import type { Meta, StoryObj } from "@storybook/react";
import { CommissionCalculator } from "@/components/business/commission-calculator";
import type { CommissionTier, CommissionDeal } from "@/components/business/commission-calculator";

const meta = {
  title: "Business/CommissionCalculator",
  component: CommissionCalculator,
  tags: ["autodocs"],
} satisfies Meta<typeof CommissionCalculator>;
export default meta;
type Story = StoryObj<typeof meta>;

const tiers: CommissionTier[] = [
  { from: 0, to: 100000, rate: 3 },
  { from: 100000, to: 500000, rate: 5 },
  { from: 500000, to: Infinity, rate: 8 },
];

const deals: CommissionDeal[] = [
  { id: "d1", rep: "Alice Wang", dealNo: "SO-2026-001", customer: "Acme Corp", amount: 85000, date: "2026-06-01" },
  { id: "d2", rep: "Alice Wang", dealNo: "SO-2026-002", customer: "Globex Inc", amount: 220000, date: "2026-06-15" },
  { id: "d3", rep: "Alice Wang", dealNo: "SO-2026-003", customer: "Initech LLC", amount: 310000, date: "2026-06-28" },
  { id: "d4", rep: "Bob Li", dealNo: "SO-2026-004", customer: "Umbrella Co", amount: 680000, date: "2026-06-20", overridePct: 10 },
  { id: "d5", rep: "Bob Li", dealNo: "SO-2026-005", customer: "Stark Industries", amount: 450000, date: "2026-06-25" },
  { id: "d6", rep: "Carol Zhang", dealNo: "SO-2026-006", customer: "Wayne Ent.", amount: 125000, date: "2026-06-18" },
  { id: "d7", rep: "Carol Zhang", dealNo: "SO-2026-007", customer: "Cyberdyne", amount: 78000, date: "2026-06-22" },
];

export const Default: Story = {
  args: { tiers, deals, quota: 500000, quotaBonusRate: 1, currencySymbol: "¥" },
};

export const Editable: Story = {
  args: { ...Default.args },
};

export const NoQuota: Story = {
  args: { tiers, deals, currencySymbol: "¥" },
};

export const Empty: Story = {
  args: { tiers, deals: [] },
};

export const Usd: Story = {
  args: {
    tiers: [
      { from: 0, to: 10000, rate: 5 },
      { from: 10000, to: 50000, rate: 8 },
      { from: 50000, to: Infinity, rate: 12 },
    ],
    deals: [
      { id: "d1", rep: "John Doe", dealNo: "US-001", customer: "US Corp", amount: 8500, date: "2026-06-01" },
      { id: "d2", rep: "Jane Smith", dealNo: "US-002", customer: "Tech Inc", amount: 62000, date: "2026-06-15" },
    ],
    quota: 50000,
    quotaBonusRate: 2,
    currencySymbol: "$",
  },
};
