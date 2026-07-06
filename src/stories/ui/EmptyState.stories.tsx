import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default" },
};

export const NoSearchResults: Story = {
  args: { variant: "search" },
};

export const Error: Story = {
  args: { variant: "error" },
};

export const Network: Story = {
  args: { variant: "network" },
};

export const WithAction: Story = {
  args: {
    variant: "default",
    action: <Button variant="default">Create item</Button>,
  },
};

export const CustomTexts: Story = {
  args: {
    variant: "default",
    title: "No orders yet",
    description: "Once customers start ordering, you'll see them here.",
  },
};

export const Centered: Story = {
  args: { variant: "default", centered: true },
};
