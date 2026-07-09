import type { Meta, StoryObj } from "@storybook/react"
import { MasterEditTemplate } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MasterEditTemplate> = {
  title: "Business/MasterEditTemplate",
  component: MasterEditTemplate,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
