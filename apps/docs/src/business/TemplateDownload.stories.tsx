import type { Meta, StoryObj } from "@storybook/react"
import { TemplateDownload } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof TemplateDownload> = {
  title: "Business/TemplateDownload",
  component: TemplateDownload,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
