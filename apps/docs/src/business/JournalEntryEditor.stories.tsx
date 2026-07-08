import type { Meta, StoryObj } from "@storybook/react"
import { JournalEntryEditor } from "@/components/business/journal-entry-editor"

const meta: Meta<typeof JournalEntryEditor> = {
  title: "Business/JournalEntryEditor",
  component: JournalEntryEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
