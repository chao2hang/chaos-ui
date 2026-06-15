import type { Meta, StoryObj } from "@storybook/react"
import { PaymentForm } from "@/components/business/payment-form"

const meta = {
  title: "Business/PaymentForm",
  component: PaymentForm,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSubmitHandler: Story = {
  args: {
    onSubmit: (data) => {
      console.log("Payment submitted:", data)
    },
  },
}

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
}
