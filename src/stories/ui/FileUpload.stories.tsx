import type { Meta, StoryObj } from "@storybook/react"
import { FileUpload } from "@/components/ui/file-upload"

const meta = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    maxFiles: 1,
  },
}

export const Dropzone: Story = {
  args: {
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  },
}

