import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/ui/tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: { children: "Tag" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Default" } };
export const Primary: Story = {
  args: { color: "primary", children: "Primary" },
};
export const Success: Story = {
  args: { color: "success", children: "Success" },
};
export const Warning: Story = {
  args: { color: "warning", children: "Warning" },
};
export const Destructive: Story = {
  args: { color: "destructive", children: "Destructive" },
};
export const Closable: Story = {
  args: { closable: true, children: "Closable" },
};
