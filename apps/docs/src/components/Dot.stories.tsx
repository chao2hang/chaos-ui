import type { Meta, StoryObj } from "@storybook/react";
import { Dot } from "@/components/ui/dot";

const meta = {
  title: "Components/Dot",
  component: Dot,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Success: Story = {
  args: { variant: "success" },
};

export const Warning: Story = {
  args: { variant: "warning" },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const WithPulse: Story = {
  args: { pulse: true, variant: "success" },
};
