import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { OTPField, OTPFieldSeparator } from "@/components/ui/otp-field"

const meta = {
  title: "Components/OTPField",
  component: OTPField,
  tags: ["autodocs", "a11y"],
  argTypes: {
    length: {
      control: { type: "number", min: 1, max: 8, step: 1 },
      description: "The number of one-time-code inputs",
    },
    mask: {
      control: "boolean",
      description: "Whether entered characters are visually masked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the field is read-only",
    },
  },
} satisfies Meta<typeof OTPField>

export default meta
type Story = StoryObj<typeof meta>

function OTPInteractiveDemo() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-3">
      <OTPField length={6} value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">
        Entered code: <span className="font-medium text-foreground">{value || "empty"}</span>
      </p>
    </div>
  )
}

export const Default: Story = {
  args: { length: 6 },
}

export const Filled: Story = {
  args: { length: 6, defaultValue: "482913" },
}

export const Masked: Story = {
  args: { length: 6, mask: true },
}

export const InteractiveEntry: Story = {
  args: { length: 6 },
  render: () => <OTPInteractiveDemo />,
}

export const Disabled: Story = {
  args: { length: 6, defaultValue: "123456", disabled: true },
}

export const WithSeparator: Story = {
  args: { length: 6 },
  render: () => (
    <div className="flex items-center gap-2">
      <OTPField length={3} defaultValue="123" />
      <OTPFieldSeparator />
      <OTPField length={3} />
    </div>
  ),
}

