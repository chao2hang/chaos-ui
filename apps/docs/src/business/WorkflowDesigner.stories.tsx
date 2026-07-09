import type { Meta, StoryObj } from "@storybook/react";
import { WorkflowDesigner } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof WorkflowDesigner> = {
  title: "Business/WorkflowDesigner",
  component: WorkflowDesigner,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
