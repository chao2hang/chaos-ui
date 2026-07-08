import type { Meta, StoryObj } from "@storybook/react"
import { FeatureTour } from "@/components/business/feature-tour"

const meta: Meta<typeof FeatureTour> = {
  title: "Business/FeatureTour",
  component: FeatureTour,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
