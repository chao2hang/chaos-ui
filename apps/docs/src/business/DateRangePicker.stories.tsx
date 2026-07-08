import type { Meta, StoryObj } from "@storybook/react"
import { DateRangePicker } from "@/components/business/date-range-picker"

const meta: Meta<typeof DateRangePicker> = {
  title: "Business/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "选择日期范围",
  },
}

export const WithPresets: Story = {
  args: {
    presets: true,
    numberOfMonths: 2,
  },
}

export const SingleMonth: Story = {
  args: {
    numberOfMonths: 1,
    placeholder: "单月选择",
  },
}

export const Dark: Story = {
  args: {
    placeholder: "暗色主题",
  },
  parameters: { backgrounds: { default: "dark" } },
}
