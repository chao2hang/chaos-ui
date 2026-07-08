import type { Meta, StoryObj } from "@storybook/react";
import { RegionLayout } from "@/components/layout/region-layout";

const meta: Meta<typeof RegionLayout> = {
  title: "Layouts/RegionLayout",
  component: RegionLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
