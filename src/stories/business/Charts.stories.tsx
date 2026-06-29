import type { Meta, StoryObj } from "@storybook/react"
import { LineChart, BarChart, AreaChart, PieChart, brandColors, statusColors } from "@/components/business/chart"

const sampleData = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
  { month: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
  { month: "May", revenue: 1890, expenses: 4800, profit: -2910 },
  { month: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
]

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Food", value: 300 },
  { name: "Books", value: 200 },
  { name: "Other", value: 100 },
]

const meta = {
  title: "Business/Charts",
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta

export const LineChartExample: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <LineChart data={sampleData} categories={["revenue", "expenses"]} index="month" />
    </div>
  ),
}

export const BarChartExample: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <BarChart data={sampleData} categories={["revenue", "expenses"]} index="month" />
    </div>
  ),
}

export const StackedBarChartExample: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <BarChart data={sampleData} categories={["revenue", "expenses"]} index="month" stacked />
    </div>
  ),
}

export const AreaChartExample: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <AreaChart data={sampleData} categories={["revenue", "expenses"]} index="month" />
    </div>
  ),
}

export const PieChartExample: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <PieChart data={pieData} category="value" index="name" />
    </div>
  ),
}

export const CustomColors: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <LineChart
        data={sampleData}
        categories={["revenue", "expenses", "profit"]}
        index="month"
        colors={["#2563eb", "#dc2626", "#16a34a"]}
      />
    </div>
  ),
}

export const BrandColors: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <BarChart
        data={sampleData}
        categories={["revenue", "expenses"]}
        index="month"
        colors={brandColors}
      />
    </div>
  ),
}

export const StatusColors: StoryObj = {
  render: () => (
    <div className="w-full max-w-3xl">
      <PieChart
        data={pieData}
        category="value"
        index="name"
        colors={statusColors}
      />
    </div>
  ),
}

export const AllChartTypes: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Line Chart</h3>
        <div className="w-full max-w-3xl">
          <LineChart data={sampleData} categories={["revenue", "expenses"]} index="month" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
        <div className="w-full max-w-3xl">
          <BarChart data={sampleData} categories={["revenue", "expenses"]} index="month" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Area Chart</h3>
        <div className="w-full max-w-3xl">
          <AreaChart data={sampleData} categories={["revenue", "expenses"]} index="month" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Pie Chart</h3>
        <div className="w-full max-w-3xl">
          <PieChart data={pieData} category="value" index="name" />
        </div>
      </div>
    </div>
  ),
}

