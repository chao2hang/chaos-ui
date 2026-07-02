import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ReportBuilder } from "@/components/business/report-builder"
import type { ReportWidget } from "@/components/business/report-builder"

function ControlledBuilder(args: React.ComponentProps<typeof ReportBuilder>) {
  const [widgets, setWidgets] = useState<ReportWidget[]>(args.widgets ?? [])

  return (
    <div className="h-[600px]">
      <ReportBuilder
        {...args}
        widgets={widgets}
        onChange={setWidgets}
      />
    </div>
  )
}

const meta = {
  title: "Business/ReportBuilder",
  component: ReportBuilder,
  tags: ["autodocs"],
} satisfies Meta<typeof ReportBuilder>

export default meta
type Story = StoryObj<typeof meta>

/** Default empty report builder */
export const Default: Story = {
  render: (args) => <ControlledBuilder {...args} />,
}

/** Pre-populated with sample widgets */
export const WithWidgets: Story = {
  render: (args) => (
    <ControlledBuilder
      {...args}
      widgets={[
        { id: "w1", type: "table", title: "Sales Data", x: 0, y: 0, w: 6, h: 4, config: { columnCount: 5 } },
        { id: "w2", type: "chart", title: "Revenue Trend", x: 6, y: 0, w: 6, h: 4, config: { chartType: "line" } },
        { id: "w3", type: "kpi", title: "Total Revenue", x: 0, y: 4, w: 3, h: 2, config: { value: "$125,000", unit: "Q4 2024" } },
        { id: "w4", type: "text", title: "Summary", x: 3, y: 4, w: 4, h: 2, config: { text: "Revenue increased 15% YoY" } },
      ]}
    />
  ),
}

/** Read-only mode for viewing reports */
export const ReadOnly: Story = {
  render: (args) => (
    <div className="h-[600px]">
      <ReportBuilder
        {...args}
        readOnly
        widgets={[
          { id: "w1", type: "table", title: "Sales Data", x: 0, y: 0, w: 6, h: 4, config: { columnCount: 5 } },
          { id: "w2", type: "chart", title: "Revenue Trend", x: 6, y: 0, w: 6, h: 4, config: { chartType: "line" } },
          { id: "w3", type: "kpi", title: "Total Revenue", x: 0, y: 4, w: 3, h: 2, config: { value: "$125,000", unit: "Q4 2024" } },
        ]}
      />
    </div>
  ),
}

/** Dark mode variant */
export const DarkMode: Story = {
  render: (args) => (
    <div className="dark h-[600px] rounded-lg">
      <ControlledBuilder
        {...args}
        widgets={[
          { id: "w1", type: "kpi", title: "Revenue", x: 0, y: 0, w: 4, h: 2, config: { value: "$50K", unit: "MTD" } },
          { id: "w2", type: "chart", title: "Monthly Sales", x: 4, y: 0, w: 8, h: 4, config: { chartType: "bar" } },
        ]}
      />
    </div>
  ),
}
