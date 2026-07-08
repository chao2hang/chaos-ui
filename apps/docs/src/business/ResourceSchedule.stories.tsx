import type { Meta, StoryObj } from "@storybook/react"
import { ResourceSchedule } from "@/components/business/resource-schedule"

const meta: Meta<typeof ResourceSchedule> = {
  title: "Business/ResourceSchedule",
  component: ResourceSchedule,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
