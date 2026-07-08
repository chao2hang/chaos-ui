import type { Meta, StoryObj } from "@storybook/react"
import { WriteoffFlow } from "@/components/business/writeoff-flow"

const meta: Meta<typeof WriteoffFlow> = {
  title: "Business/WriteoffFlow",
  component: WriteoffFlow,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
