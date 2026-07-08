import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/components/ui/slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: [50], max: 100, step: 1 },
};

export const Range: Story = {
  args: { defaultValue: [20, 80], max: 100, step: 1 },
};

export const Disabled: Story = {
  args: { defaultValue: [30], max: 100, step: 1, disabled: true },
};
