import type { Meta, StoryObj } from "@storybook/react"
import { TimePicker } from "@/components/business/time-picker"

const meta: Meta<typeof TimePicker> = {
  title: "Business/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "选择时间",
  },
}

export const Format12h: Story = {
  args: {
    format: "12h",
    value: "2:30 PM",
  },
}

export const Step15: Story = {
  args: {
    step: 15,
    value: "14:30",
    placeholder: "15分钟间隔",
  },
}

export const Dark: Story = {
  args: {
    value: "09:00",
  },
  parameters: { backgrounds: { default: "dark" } },
}
