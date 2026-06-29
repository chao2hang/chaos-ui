import type { Meta, StoryObj } from "@storybook/react"
import { HeatmapCalendar } from "@/components/business/heatmap-calendar"

const start = new Date("2026-01-01")
const end = new Date("2026-04-30")
const heatmapData = Array.from({ length: 120 }, (_, index) => {
  const date = new Date(start)
  date.setDate(start.getDate() + index)
  return {
    date,
    value: index % 9 === 0 ? 0 : Math.round(Math.abs(Math.sin(index / 5)) * 18),
  }
})

const meta = {
  title: "Business/HeatmapCalendar",
  component: HeatmapCalendar,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof HeatmapCalendar>

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    data: heatmapData,
    startDate: start,
    endDate: end,
  },
}

export const Compact: Story = {
  args: {
    data: heatmapData,
    startDate: start,
    endDate: end,
    cellSize: 9,
    gap: 1,
    showLegend: false,
  },
}

export const CampaignActivity: Story = {
  render: () => (
    <div className="rounded-lg border p-4">
      <div className="mb-4">
        <p className="text-sm font-medium">Daily campaign edits</p>
        <p className="text-xs text-muted-foreground">Activity across the current planning window</p>
      </div>
      <HeatmapCalendar data={heatmapData} startDate={start} endDate={end} weekStartsOn={1} />
    </div>
  ),
}

