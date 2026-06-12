import type { Meta, StoryObj } from "@storybook/react"
import { PivotTable } from "@/components/business/pivot-table"

const salesData = [
  { region: "华东", quarter: "Q1", amount: 12000 },
  { region: "华东", quarter: "Q2", amount: 15000 },
  { region: "华东", quarter: "Q3", amount: 18000 },
  { region: "华北", quarter: "Q1", amount: 9000 },
  { region: "华北", quarter: "Q2", amount: 11000 },
  { region: "华北", quarter: "Q3", amount: 13000 },
  { region: "华南", quarter: "Q1", amount: 8000 },
  { region: "华南", quarter: "Q2", amount: 10000 },
  { region: "华南", quarter: "Q3", amount: 12000 },
]

const meta = {
  title: "Business/PivotTable",
  component: PivotTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PivotTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "quarter",
    valueField: "amount",
    aggregation: "sum",
  },
}

export const Average: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "quarter",
    valueField: "amount",
    aggregation: "avg",
  },
}

export const Count: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "quarter",
    valueField: "amount",
    aggregation: "count",
  },
}

export const Dark: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "quarter",
    valueField: "amount",
  },
  parameters: { backgrounds: { default: "dark" } },
}
