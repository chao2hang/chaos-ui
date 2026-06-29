import type { Meta, StoryObj } from "@storybook/react"
import { InlineEdit } from "@/components/business/inline-edit"

const meta = {
  title: "Business/InlineEdit",
  component: InlineEdit,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof InlineEdit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "Spring launch",
    onSave: () => undefined,
  },
}

export const Multiline: Story = {
  args: {
    value: "Launch across paid social and lifecycle email.",
    multiline: true,
    onSave: () => undefined,
  },
}

export const WithValidation: Story = {
  args: {
    value: "",
    placeholder: "Click to enter campaign name",
    validate: (value) => (value.trim() ? undefined : "Name is required"),
    onSave: () => undefined,
  },
}

