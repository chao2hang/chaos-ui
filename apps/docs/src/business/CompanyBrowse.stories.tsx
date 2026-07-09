import type { Meta, StoryObj } from "@storybook/react";
import { CompanyBrowse } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CompanyBrowse> = {
  title: "Business/CompanyBrowse",
  component: CompanyBrowse,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
