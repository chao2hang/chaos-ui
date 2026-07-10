import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormStepper } from "@/components/business/mobile-form-stepper";

const meta: Meta<typeof MobileFormStepper> = {
  title: "Business/MobileFormStepper",
  component: MobileFormStepper,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MobileFormStepper
      current={42}
      total={10}
      labels={["Q1", "Q2", "Q3", "Q4"]}
      onStepClick={() => {}}
    />
  ),
};
