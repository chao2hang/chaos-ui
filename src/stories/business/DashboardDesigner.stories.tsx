import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DashboardDesigner } from "@/components/business/dashboard-designer"
import type { DashboardConfig } from "@/components/business/dashboard-designer"

function ControlledDesigner(args: React.ComponentProps<typeof DashboardDesigner>) {
  const [config, setConfig] = useState<DashboardConfig>(
    args.config ?? { widgets: [], filters: [] },
  )

  return (
    <div className="h-[650px]">
      <DashboardDesigner
        {...args}
        config={config}
        onChange={setConfig}
      />
    </div>
  )
}

const meta = {
  title: "Business/DashboardDesigner",
  component: DashboardDesigner,
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardDesigner>

export default meta
type Story = StoryObj<typeof meta>

/** Default empty dashboard designer */
export const Default: Story = {
  render: (args) => <ControlledDesigner {...args} />,
}

/** Pre-configured dashboard with sample KPI and chart widgets */
export const PreConfigured: Story = {
  render: (args) => (
    <ControlledDesigner
      {...args}
      config={{
        widgets: [
          { id: "k1", type: "kpi", title: "Total Revenue", x: 0, y: 0, w: 3, h: 2, config: { value: "$245K", unit: "Q4 2024" } },
          { id: "k2", type: "kpi", title: "New Users", x: 3, y: 0, w: 3, h: 2, config: { value: "1,234", unit: "This Month" } },
          { id: "k3", type: "kpi", title: "Conversion", x: 6, y: 0, w: 3, h: 2, config: { value: "3.2%", unit: "Avg" } },
          { id: "k4", type: "kpi", title: "Churn Rate", x: 9, y: 0, w: 3, h: 2, config: { value: "1.8%", unit: "Monthly" } },
          { id: "c1", type: "chart-line", title: "Revenue Trend", x: 0, y: 2, w: 8, h: 4, config: { chartType: "line" } },
          { id: "c2", type: "chart-pie", title: "Traffic Sources", x: 8, y: 2, w: 4, h: 4, config: { chartType: "pie" } },
          { id: "t1", type: "table", title: "Recent Orders", x: 0, y: 6, w: 12, h: 4, config: { columnCount: 6 } },
        ],
        filters: [
          { id: "f1", label: "Date Range", type: "date-range" },
        ],
      }}
    />
  ),
}

/** Read-only dashboard view */
export const ReadOnly: Story = {
  render: (args) => (
    <div className="h-[650px]">
      <DashboardDesigner
        {...args}
        readOnly
        config={{
          widgets: [
            { id: "k1", type: "kpi", title: "Revenue", x: 0, y: 0, w: 3, h: 2, config: { value: "$245K", unit: "Q4" } },
            { id: "c1", type: "chart-bar", title: "Monthly Sales", x: 3, y: 0, w: 9, h: 4, config: { chartType: "bar" } },
            { id: "t1", type: "table", title: "Top Products", x: 0, y: 4, w: 12, h: 4, config: { columnCount: 5 } },
          ],
          filters: [],
        }}
      />
    </div>
  ),
}

/** Dark mode variant */
export const DarkMode: Story = {
  render: (args) => (
    <div className="dark h-[650px] rounded-lg">
      <ControlledDesigner
        {...args}
        config={{
          widgets: [
            { id: "k1", type: "kpi", title: "Revenue", x: 0, y: 0, w: 4, h: 2, config: { value: "$50K", unit: "MTD" } },
            { id: "c1", type: "chart-donut", title: "Categories", x: 4, y: 0, w: 4, h: 4, config: { chartType: "donut" } },
            { id: "t1", type: "text", title: "Notes", x: 8, y: 0, w: 4, h: 2, config: { text: "Dashboard last updated 5 minutes ago" } },
          ],
          filters: [],
        }}
      />
    </div>
  ),
}
