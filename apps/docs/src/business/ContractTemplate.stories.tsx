import type { Meta, StoryObj } from "@storybook/react";
import { ContractTemplate } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ContractTemplate> = {
  title: "Business/ContractTemplate",
  component: ContractTemplate,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContractTemplate
      onTemplateChange={() => {}}
      onMetadataChange={() => {}}
      onSave={() => {}}
      onTabChange={() => {}}
    />
  ),
};
