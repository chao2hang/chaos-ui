import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@/components/ui/divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">Above the divider</p>
      <Divider />
      <p className="text-sm">Below the divider</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-sm">Left</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};

export const WithText: Story = {
  args: {
    children: "OR",
  },
};
