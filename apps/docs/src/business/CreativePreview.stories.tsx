import type { Meta, StoryObj } from "@storybook/react";
import { CreativePreview } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CreativePreview> = {
  title: "Business/CreativePreview",
  component: CreativePreview,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
