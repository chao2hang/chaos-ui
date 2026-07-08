import type { Meta, StoryObj } from "@storybook/react"
import { PrintService } from "@/components/business/print-service"

const meta: Meta<typeof PrintService> = {
  title: "Business/PrintService",
  component: PrintService,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
