import type { Meta, StoryObj } from "@storybook/react";
import { MasterDetailLayout } from "@/components/layout/master-detail-layout";

const meta: Meta<typeof MasterDetailLayout> = {
  title: "Layouts/MasterDetailLayout",
  component: MasterDetailLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
