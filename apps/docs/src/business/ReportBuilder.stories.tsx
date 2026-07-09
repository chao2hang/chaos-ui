import type { Meta, StoryObj } from "@storybook/react";
import { ReportBuilder } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ReportBuilder> = {
  title: "Business/ReportBuilder",
  component: ReportBuilder,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
