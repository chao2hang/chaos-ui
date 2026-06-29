import type { Meta, StoryObj } from "@storybook/react"
import { RegionLayout } from "@/components/layout/region-layout"

const meta: Meta<typeof RegionLayout> = {
  title: "layout/RegionLayout",
  component: RegionLayout,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof RegionLayout>

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-full min-h-[80px] items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
    {children}
  </div>
)

export const LeftMain: Story = {
  args: {
    left: <Placeholder>左侧面板</Placeholder>,
    main: <Placeholder>主内容区</Placeholder>,
    leftWidth: 240,
  },
  decorators: [(S) => <div className="h-[300px] overflow-hidden rounded-lg border"><S /></div>],
}

export const FullLayout: Story = {
  args: {
    top: <Placeholder>Header</Placeholder>,
    left: <Placeholder>Sidebar</Placeholder>,
    main: <Placeholder>Main Content</Placeholder>,
    right: <Placeholder>Panel</Placeholder>,
    bottom: <Placeholder>Footer</Placeholder>,
    leftWidth: 200,
    rightWidth: 280,
  },
  decorators: [(S) => <div className="h-[400px] overflow-hidden rounded-lg border"><S /></div>],
}
