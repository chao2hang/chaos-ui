import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "@/components/ui/kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Ctrl" },
};

export const Combination: Story = {
  render: () => (
    <div className="flex items-center gap-1 text-sm">
      <Kbd>⌘</Kbd>
      <span className="text-muted-foreground">+</span>
      <Kbd>K</Kbd>
    </div>
  ),
};

export const SingleKey: Story = {
  args: { children: "Enter" },
};
