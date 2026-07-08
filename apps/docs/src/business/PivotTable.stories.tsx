import type { Meta, StoryObj } from "@storybook/react"
import { PivotTable } from "@/components/business/pivot-table"

const salesData = [
  { region: "华东", product: "冰箱", amount: 12000 },
  { region: "华东", product: "冰箱", amount: 15000 },
  { region: "华东", product: "空调", amount: 18000 },
  { region: "华东", product: "空调", amount: 22000 },
  { region: "华东", product: "洗衣机", amount: 9000 },
  { region: "华北", product: "冰箱", amount: 9000 },
  { region: "华北", product: "冰箱", amount: 11000 },
  { region: "华北", product: "空调", amount: 13000 },
  { region: "华北", product: "空调", amount: 17000 },
  { region: "华北", product: "洗衣机", amount: 7500 },
  { region: "华南", product: "冰箱", amount: 8000 },
  { region: "华南", product: "冰箱", amount: 10000 },
  { region: "华南", product: "空调", amount: 12000 },
  { region: "华南", product: "空调", amount: 14000 },
  { region: "华南", product: "洗衣机", amount: 6000 },
  { region: "西南", product: "冰箱", amount: 5000 },
  { region: "西南", product: "空调", amount: 7000 },
  { region: "西南", product: "洗衣机", amount: 4000 },
]

const meta: Meta<typeof PivotTable> = {
  title: "Business/PivotTable",
  component: PivotTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "product",
    valueField: "amount",
    aggregation: "sum",
  },
}

export const Heatmap: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "product",
    valueField: "amount",
    aggregation: "sum",
    heatmap: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    rowField: "region",
    columnField: "product",
    valueField: "amount",
    emptyLabel: "暂无销售数据",
  },
}

export const Dark: Story = {
  args: {
    data: salesData,
    rowField: "region",
    columnField: "product",
    valueField: "amount",
    heatmap: true,
  },
  parameters: { backgrounds: { default: "dark" } },
}