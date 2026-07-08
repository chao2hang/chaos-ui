import type { Meta, StoryObj } from "@storybook/react"
import { Stepper, Step } from "@/components/ui/stepper"

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    activeStep: {
      control: { type: "number", min: 0, max: 10 },
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { activeStep: 0 },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Stepper {...args}>
        <Step>Step 1</Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
        <Step>Step 4</Step>
      </Stepper>
    </div>
  ),
}

export const Step2: Story = {
  args: { activeStep: 1 },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Stepper {...args}>
        <Step>Account</Step>
        <Step>Profile</Step>
        <Step>Confirm</Step>
      </Stepper>
    </div>
  ),
}

export const AllComplete: Story = {
  args: { activeStep: 3 },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Stepper {...args}>
        <Step>Cart</Step>
        <Step>Shipping</Step>
        <Step>Payment</Step>
        <Step>Done</Step>
      </Stepper>
    </div>
  ),
}

export const Vertical: Story = {
  args: { activeStep: 1, orientation: "vertical" },
  render: (args) => (
    <div className="w-full max-w-xs">
      <Stepper {...args}>
        <Step>Account</Step>
        <Step>Profile</Step>
        <Step>Confirm</Step>
      </Stepper>
    </div>
  ),
}

export const AllSteps: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Step 1 of 4</p>
        <Stepper activeStep={0}>
          <Step>Step 1</Step>
          <Step>Step 2</Step>
          <Step>Step 3</Step>
          <Step>Step 4</Step>
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Step 2 of 4</p>
        <Stepper activeStep={1}>
          <Step>Step 1</Step>
          <Step>Step 2</Step>
          <Step>Step 3</Step>
          <Step>Step 4</Step>
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Step 3 of 4</p>
        <Stepper activeStep={2}>
          <Step>Step 1</Step>
          <Step>Step 2</Step>
          <Step>Step 3</Step>
          <Step>Step 4</Step>
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">All Complete</p>
        <Stepper activeStep={3}>
          <Step>Step 1</Step>
          <Step>Step 2</Step>
          <Step>Step 3</Step>
          <Step>Step 4</Step>
        </Stepper>
      </div>
    </div>
  ),
}
