import type { Meta, StoryObj } from "@storybook/react";
import { Spin } from "@/components/ui/spin";

const meta = {
  title: "Components/Spin",
  component: Spin,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Spin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { spinning: true },
};

export const WithTip: Story = {
  args: { spinning: true, tip: "Loading data…" },
};

export const Large: Story = {
  args: { spinning: true, size: "lg" },
};

export const ContentOverlay: Story = {
  args: {
    spinning: true,
    tip: "Fetching orders",
    className: "block rounded-lg border p-6",
    contentClassName:
      "min-h-32 flex items-center justify-center text-sm text-muted-foreground",
    children: "Order list will appear here once loaded.",
  },
};

export const NotSpinning: Story = {
  args: {
    spinning: false,
    className: "block rounded-lg border p-6",
    contentClassName: "min-h-32 flex items-center justify-center text-sm",
    children: "Content is ready — no spinner shown.",
  },
};
