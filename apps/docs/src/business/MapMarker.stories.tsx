import type { Meta, StoryObj } from "@storybook/react";
import { MapMarker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MapMarker> = {
  title: "Business/MapMarker",
  component: MapMarker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
