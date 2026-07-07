import type { Meta, StoryObj } from "@storybook/react";
import { AudienceSegmentBuilder } from "@/components/business/audience-segment-builder";

const meta = {
  title: "Business/AudienceSegmentBuilder",
  component: AudienceSegmentBuilder,
  tags: ["autodocs"],
} satisfies Meta<typeof AudienceSegmentBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
