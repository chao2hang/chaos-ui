import type { Meta, StoryObj } from "@storybook/react"
import { FileCard } from "@/components/business/file-card"

const meta: Meta<typeof FileCard> = {
  title: "Business/FileCard",
  component: FileCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
