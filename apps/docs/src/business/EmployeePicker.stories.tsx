import type { Meta, StoryObj } from "@storybook/react";
import { EmployeePicker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof EmployeePicker> = {
  title: "Business/EmployeePicker",
  component: EmployeePicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
