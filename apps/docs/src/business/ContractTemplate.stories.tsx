import type { Meta, StoryObj } from "@storybook/react";
import { ContractTemplate } from "@/components/business/contract-template";

const meta: Meta<typeof ContractTemplate> = {
  title: "Business/ContractTemplate",
  component: ContractTemplate,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
