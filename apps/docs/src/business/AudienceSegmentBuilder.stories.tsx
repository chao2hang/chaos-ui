import type { Meta, StoryObj } from "@storybook/react";
import { AudienceSegmentBuilder } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AudienceSegmentBuilder> = {
  title: "Business/AudienceSegmentBuilder",
  component: AudienceSegmentBuilder,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AudienceSegmentBuilder
      fields={"示例"}
      onSegmentsChange={() => {}}
      onFiltersChange={() => {}}
    />
  ),
};
