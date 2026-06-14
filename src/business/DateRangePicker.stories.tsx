import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/business/date-range-picker"

const sampleRange: DateRange = {
  from: new Date(2026, 5, 1),
  to: new Date(2026, 5, 13),
}

const meta = {
  title: "Business/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>
type DateRangePickerProps = React.ComponentProps<typeof DateRangePicker>

function ControlledDateRangePicker(args: DateRangePickerProps) {
  const [value, setValue] = React.useState<DateRange | undefined>(args.value)

  return (
    <div className="flex flex-col gap-3">
      <DateRangePicker {...args} value={value} onChange={setValue} />
      <p className="text-xs text-muted-foreground">
        Range:{" "}
        <span className="font-mono">
          {value?.from?.toISOString().slice(0, 10) ?? "none"}
          {value?.to ? ` to ${value.to.toISOString().slice(0, 10)}` : ""}
        </span>
      </p>
    </div>
  )
}

export const Default: Story = {
  args: {
    value: sampleRange,
    placeholder: "Select reporting range",
  },
  render: (args) => <ControlledDateRangePicker {...args} />,
}

export const SingleMonth: Story = {
  args: {
    value: sampleRange,
    numberOfMonths: 1,
    presets: false,
    placeholder: "Choose one month",
  },
  render: (args) => <ControlledDateRangePicker {...args} />,
}

export const Empty: Story = {
  args: {
    placeholder: "No date range selected",
  },
  render: (args) => <ControlledDateRangePicker {...args} />,
}

export const Disabled: Story = {
  args: {
    value: sampleRange,
    disabled: true,
  },
}

