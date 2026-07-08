import type { Meta, StoryObj } from "@storybook/react";
import { ResponsivePreview } from "@/components/business/responsive-preview";

const meta: Meta<typeof ResponsivePreview> = {
  title: "Business/ResponsivePreview",
  component: ResponsivePreview,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
