import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PivotTable } from "@/components/business/pivot-table"

interface SalesRecord extends Record<string, unknown> {
  region: string
  channel: string
  revenue: number
  orders: number
  quarter: "Q1" | "Q2"
}

const salesData: SalesRecord[] = [
  { region: "North", channel: "Email", revenue: 12800, orders: 84, quarter: "Q1" },
  { region: "North", channel: "Ads", revenue: 18500, orders: 102, quarter: "Q1" },
  { region: "North", channel: "Social", revenue: 9400, orders: 61, quarter: "Q2" },
  { region: "South", channel: "Email", revenue: 11200, orders: 72, quarter: "Q1" },
  { region: "South", channel: "Ads", revenue: 14600, orders: 88, quarter: "Q2" },
  { region: "South", channel: "Social", revenue: 7600, orders: 54, quarter: "Q2" },
  { region: "West", channel: "Email", revenue: 15400, orders: 96, quarter: "Q1" },
  { region: "West", channel: "Ads", revenue: 20100, orders: 118, quarter: "Q2" },
  { region: "West", channel: "Social", revenue: 13200, orders: 79, quarter: "Q2" },
]

const currency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

const meta = {
  title: "Business/PivotTable",
  component: PivotTable<SalesRecord>,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PivotTable<SalesRecord>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "channel",
    valueField: "revenue",
    formatValue: currency,
  },
}

export const AverageOrders: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "channel",
    valueField: "orders",
    aggregation: "avg",
    formatValue: (value) => `${value.toFixed(1)} orders`,
  },
}

export const FilteredQuarter: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "channel",
    valueField: "revenue",
    filter: (row) => row.quarter === "Q2",
    formatValue: currency,
  },
}

export const WithoutTotals: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "channel",
    valueField: "revenue",
    showRowTotal: false,
    showColumnTotal: false,
    formatValue: currency,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    rowField: "region",
    columnField: "channel",
    valueField: "revenue",
    formatValue: currency,
  },
}

