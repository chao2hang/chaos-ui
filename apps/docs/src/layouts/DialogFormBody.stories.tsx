import type { Meta, StoryObj } from "@storybook/react";
import { DialogFormBody } from "@chaos_team/chaos-ui/layout";

const meta: Meta<typeof DialogFormBody> = {
  title: "Layouts/DialogFormBody",
  component: DialogFormBody,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
