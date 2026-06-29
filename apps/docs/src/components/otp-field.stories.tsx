import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { OTPField, OTPFieldSeparator } from "@/components/ui/otp-field"

const meta = {
  title: "Components/OTPField",
  component: OTPField,
  tags: ["autodocs"],
  argTypes: {
    length: {
      control: { type: "number" },
      description: "Number of input cells",
    },
    mask: {
      control: "boolean",
      description: "Mask entered characters as a password",
    },
  },
} satisfies Meta<typeof OTPField>

export default meta
type Story = StoryObj<typeof meta>

const Controlled = ({ length = 6, mask = false }: { length?: number; mask?: boolean }) => {
  const [value, setValue] = useState("")
  return (
    <div className="flex flex-col items-start gap-3">
      <OTPField length={length} value={value} onValueChange={setValue} mask={mask} />
      <p className="text-xs text-muted-foreground">Value: {value || "(empty)"}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const FourDigits: Story = {
  render: () => <Controlled length={4} />,
}

export const Masked: Story = {
  render: () => <Controlled mask />,
}

export const WithSeparator: Story = {
  name: "With Separator",
  render: () => (
    <div className="flex items-center gap-2">
      <OTPField length={3} />
      <OTPFieldSeparator />
      <OTPField length={3} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">6-digit code</p>
        <Controlled length={6} />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">4-digit PIN</p>
        <Controlled length={4} />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Password (masked)</p>
        <Controlled length={6} mask />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">Two groups of 3</p>
        <div className="flex items-center gap-2">
          <OTPField length={3} />
          <OTPFieldSeparator />
          <OTPField length={3} />
        </div>
      </div>
    </div>
  ),
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark flex flex-col gap-4">
      <Controlled length={6} />
      <Controlled length={6} mask />
    </div>
  ),
}
