import type { Meta, StoryObj } from "@storybook/react";
import { ResponsivePreview } from "@/components/business/responsive-preview";

const meta = {
  title: "Business/ResponsivePreview",
  component: ResponsivePreview,
  tags: ["autodocs"],
} satisfies Meta<typeof ResponsivePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
