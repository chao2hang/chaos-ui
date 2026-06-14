import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChannelPicker } from "@/components/business/channel-picker"
import type { ChannelPickerProps, MarketingChannel } from "@/components/business/channel-picker"

function SingleChannelExample(args: ChannelPickerProps) {
  const [value, setValue] = useState<MarketingChannel | undefined>("email")

  return (
    <div className="max-w-3xl space-y-3">
      <ChannelPicker
        {...args}
        value={value}
        onChange={(next) => setValue(Array.isArray(next) ? next[0] : next)}
      />
      <p className="text-sm text-muted-foreground">Selected channel: {value ?? "none"}</p>
    </div>
  )
}

function MultiChannelExample(args: ChannelPickerProps) {
  const [value, setValue] = useState<MarketingChannel[]>(["email", "push", "ads"])

  return (
    <div className="max-w-3xl space-y-3">
      <ChannelPicker
        {...args}
        multiple
        value={value}
        onChange={(next) => setValue(Array.isArray(next) ? next : next ? [next] : [])}
      />
      <p className="text-sm text-muted-foreground">Selected channels: {value.join(", ") || "none"}</p>
    </div>
  )
}

const meta = {
  title: "Business/ChannelPicker",
  component: ChannelPicker,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ChannelPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <SingleChannelExample {...args} />,
}

export const Variants: Story = {
  render: (args) => <MultiChannelExample {...args} />,
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: ["email", "ads"],
    multiple: true,
  },
}

