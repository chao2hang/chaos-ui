import type { Meta, StoryObj } from "@storybook/react"
import { SplitPane } from "@/components/ui/split-pane"

const meta = {
  title: "Components/SplitPane",
  component: SplitPane,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof SplitPane>

export default meta
type Story = StoryObj

export const Horizontal: Story = {
  render: () => (
    <div className="h-[300px] border rounded-lg overflow-hidden">
      <SplitPane
        first={
          <div className="flex items-center justify-center h-full bg-muted/50">
            <p className="text-sm font-medium">Left Pane</p>
          </div>
        }
        second={
          <div className="flex items-center justify-center h-full bg-muted/30">
            <p className="text-sm font-medium">Right Pane</p>
          </div>
        }
      />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-[300px] border rounded-lg overflow-hidden">
      <SplitPane
        direction="vertical"
        first={
          <div className="flex items-center justify-center h-full bg-muted/50">
            <p className="text-sm font-medium">Top Pane</p>
          </div>
        }
        second={
          <div className="flex items-center justify-center h-full bg-muted/30">
            <p className="text-sm font-medium">Bottom Pane</p>
          </div>
        }
      />
    </div>
  ),
}

export const CustomSize: Story = {
  render: () => (
    <div className="h-[300px] border rounded-lg overflow-hidden">
      <SplitPane
        defaultSize={30}
        first={
          <div className="flex items-center justify-center h-full bg-muted/50">
            <p className="text-sm font-medium">30%</p>
          </div>
        }
        second={
          <div className="flex items-center justify-center h-full bg-muted/30">
            <p className="text-sm font-medium">70%</p>
          </div>
        }
      />
    </div>
  ),
}

