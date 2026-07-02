import type { Meta, StoryObj } from "@storybook/react"
import { CronEditor } from "@/components/business/cron-editor"

const meta = {
  title: "Business/CronEditor",
  component: CronEditor,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof CronEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "0 9 * * 1-5",
    showDescription: true,
  },
}

export const EveryHour: Story = {
  args: {
    value: "0 * * * *",
    showDescription: true,
  },
}

export const ReadOnly: Story = {
  args: {
    value: "0 9 * * 1-5",
    showDescription: true,
    readOnly: true,
  },
}

export const WithoutDescription: Story = {
  args: {
    value: "*/5 * * * *",
    showDescription: false,
  },
}
