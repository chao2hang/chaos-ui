import type { Meta, StoryObj } from "@storybook/react";
import { CreativePreview } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CreativePreview> = {
  title: "Business/CreativePreview",
  component: CreativePreview,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CreativePreview
      title={"示例"}
      eyebrow={"示例"}
      body={"示例"}
      imageUrl={"https://placehold.co/400x300/e2e8f0/64748b?text=Image"}
      cta={"示例"}
    />
  ),
};
