import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/ui/tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: { children: "Tag" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Default" } };
export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};
export const Success: Story = {
  args: { variant: "success", children: "Success" },
};
export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
};
export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
};
export const Closable: Story = {
  args: { closable: true, children: "Closable" },
};
