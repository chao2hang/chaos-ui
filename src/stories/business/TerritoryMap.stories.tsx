import type { Meta, StoryObj } from "@storybook/react";
import { TerritoryMap } from "@/components/business/territory-map";
import type { TerritoryRegion } from "@/components/business/territory-map";

const meta = {
  title: "Business/TerritoryMap",
  component: TerritoryMap,
  tags: ["autodocs"],
} satisfies Meta<typeof TerritoryMap>;
export default meta;
type Story = StoryObj<typeof meta>;

const regions: TerritoryRegion[] = [
  { id: "r1", name: "North Region", rep: "Alice Wang", sales: 1200000, target: 1000000, customerCount: 45 },
  { id: "r2", name: "South Region", rep: "Bob Li", sales: 800000, target: 1000000, customerCount: 38 },
  { id: "r3", name: "East Region", rep: "Carol Zhang", sales: 550000, target: 800000, customerCount: 30 },
  { id: "r4", name: "West Region", rep: "Dave Chen", sales: 650000, target: 700000, customerCount: 25 },
  { id: "r5", name: "Central", rep: "Eve Liu", sales: 420000, target: 500000, customerCount: 20 },
  { id: "r6", name: "Northwest", sales: 150000, target: 400000, customerCount: 10 },
  { id: "r7", name: "Southwest", rep: "Frank Wu", sales: 380000, target: 350000, customerCount: 18 },
  { id: "r8", name: "Northeast", rep: "Grace Sun", sales: 920000, target: 900000, customerCount: 42 },
];

export const Default: Story = {
  args: { regions, title: "National Sales Territory", currencySymbol: "¥", gridCols: 4 },
};

export const Grid3: Story = {
  args: { ...Default.args, gridCols: 3 },
};

export const Usd: Story = {
  args: {
    regions: regions.map((r) => ({
      ...r,
      sales: Math.round(r.sales / 7),
      target: Math.round(r.target / 7),
    })),
    title: "US Sales Regions",
    currencySymbol: "$",
    gridCols: 4,
  },
};

export const Unassigned: Story = {
  args: {
    regions: [
      ...regions.slice(0, 3),
      { id: "r9", name: "New Territory", sales: 0, target: 500000, customerCount: 0 },
      { id: "r10", name: "Expansion Zone", sales: 50000, target: 300000, customerCount: 3 },
    ],
    title: "Territories Needing Coverage",
  },
};
