import type { Meta, StoryObj } from "@storybook/react";
import { ContractTemplate } from "@/components/business/contract-template";

const meta = {
  title: "Business/ContractTemplate",
  component: ContractTemplate,
  tags: ["autodocs"],
} satisfies Meta<typeof ContractTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
