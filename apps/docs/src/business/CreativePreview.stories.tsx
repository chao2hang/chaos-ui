import type { Meta, StoryObj } from "@storybook/react";
import { CreativePreview } from "@/components/business/creative-preview";

const meta = {
  title: "Business/CreativePreview",
  component: CreativePreview,
  tags: ["autodocs"],
} satisfies Meta<typeof CreativePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
