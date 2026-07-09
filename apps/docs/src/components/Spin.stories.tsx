import type { Meta, StoryObj } from "@storybook/react";
import { Spin } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Spin> = {
  title: "Components/Spin",
  component: Spin,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    spinning: true,
    children: <div className="bg-muted/20 h-32 w-64 rounded border" />,
  },
};

export const WithTip: Story = {
  args: {
    spinning: true,
    tip: "Loading...",
    children: <div className="bg-muted/20 h-32 w-64 rounded border" />,
  },
};

export const NotSpinning: Story = {
  args: {
    spinning: false,
    children: (
      <div className="flex h-32 w-64 items-center justify-center rounded border">
        Content loaded
      </div>
    ),
  },
};
