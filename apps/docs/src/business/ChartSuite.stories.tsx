import type { Meta, StoryObj } from "@storybook/react"
import { ChartSuite } from "@/components/business/chart-suite"

const meta: Meta<typeof ChartSuite> = {
  title: "Business/ChartSuite",
  component: ChartSuite,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
