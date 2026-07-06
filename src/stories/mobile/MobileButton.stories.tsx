import type { Meta, StoryObj } from "@storybook/react";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobileButton",
  component: MobileButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Full width button" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-sm space-y-3 p-4">
      <MobileButton>Full width button</MobileButton>
      <MobileButton variant="outline">Outline</MobileButton>
      <MobileButton variant="secondary">Secondary</MobileButton>
      <MobileButton variant="destructive">Destructive</MobileButton>
      <MobileButton variant="ghost">Ghost</MobileButton>
    </div>
  ),
};
