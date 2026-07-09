import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentPicker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof DepartmentPicker> = {
  title: "Business/DepartmentPicker",
  component: DepartmentPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
