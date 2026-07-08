import type { Meta, StoryObj } from "@storybook/react";
import { NumberTicker } from "@/components/ui/number-ticker";

const meta: Meta<typeof NumberTicker> = {
  title: "Components/NumberTicker",
  component: NumberTicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 12345 },
};

export const FromZero: Story = {
  args: { value: 9999, start: 0 },
};
